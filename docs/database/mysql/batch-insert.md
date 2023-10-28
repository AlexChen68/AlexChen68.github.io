---
title: Mysql 批量插入
date: 2023-05-26
order: 101
---

# Mysql 批量插入

> 本文探讨如何在 mysql 中批量插入大量数据，以及各种方式的性能比较。

## 在 Mysql 中批量插入数据的几种方式

我们将实验以下几种在 mysql 中批量插入数据的方式：

1. for 循环插入
2. for 循环插入 + 开启事物
3. MybatisPlus 批量插入 `saveBatch()`

先说结论：

> 插入速度：MybatisPlus 批量插入 `saveBatch()` > for 循环插入 + 开启事物 >> for 循环插入

## 准备工作

首先，我们新建一个 SpringBoot 工程，添加如下依赖和配置：

`pom.xml`: springboot 版本由其 `spring-boot-starter-parent` 版本决定
```xml
<dependencies>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.3.1</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-configuration-processor</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>cn.hutool</groupId>
        <artifactId>hutool-all</artifactId>
        <version>5.8.15</version>
    </dependency>
</dependencies>
```

`application.yml`: 其中的 `rewriteBatchedStatements=true` 为是否开启数据库批处理的设置，true 为开启；`sql/schema.sql` 是添加到数据库 DDL，会在启动时执行
```yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/daydayup?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true
    username: root
    password: root
  sql:
    init:
      mode: always
      schema-locations: classpath*:sql/schema.sql

```

`sql/schema.sql`: daydayup 是创建的数据库

```sql
USE daydayup;

CREATE TABLE IF NOT EXISTS ecs
(
    id    BIGINT  NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    name  VARCHAR(64) NOT NUll COMMENT '名称',
    cpu   INT     NOT NUll COMMENT 'cpu 核数 (核)',
    memory VARCHAR(50) NULL DEFAULT NULL COMMENT '内存大小 (G)',
    create_time DATETIME NOT NUll DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    create_by VARCHAR(50) NOT NULL COMMENT '创建人',
    tenant_id BIGINT NOT NULL DEFAULT 1 COMMENT '所属租户',
    PRIMARY KEY (id)
) ENGINE=INNODB;
```

接着，我们创建 MysqlPlus 访问数据库需要的文件，包括实体类、Service 接口和实现类、Mapper 接口：

`Ecs` 实体类：

```java
@Data
@TableName(value = "ecs")
public class Ecs {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String name;

    private Integer cpu;

    private Integer memory;

    private LocalDateTime createTime;

    private String createBy;

    private Long tenantId;
}
```

`Mapper` 接口：

```java
@Mapper
public interface EcsMapper extends BaseMapper<Ecs> {

}
```

`Service` 接口和实现类：

```java
// EcsService.java
public interface EcsService extends IService<Ecs> {

}

// EcsServiceImpl.java
@Repository
@Transactional(rollbackFor = Exception.class)
public class EcsServiceImpl extends ServiceImpl<EcsMapper, Ecs> implements EcsService {

}
```

有了上面的 `EcsService`，我们就可以通过它调用 `IService` 封装好的针对单个表的 CRUD 基本操作了，在 `ServiceImpl` 默认实现了 `IService` 定义的 CRUD 方法，并通过泛型来约束指定的实体类型。

## 开始测试

接下来通过 Junit5 测试框架，编写通过不同方式先 mysql 批量插入数据的测试案例。

首先，先新建测试类，配置为使用 SpringBoot 测试，并引入 `EcsService` 和 `SqlSessionFactory`（主要是为了测试原生 mybatis 提交事物的方式），并提供一个构建 Ecs 测试实例的方法。

```java
@SpringBootTest
@ExtendWith(SpringExtension.class)
class EcsServiceTest {

    @Resource
    EcsService service;

    @Resource
    SqlSessionFactory sqlSessionFactory;

    Ecs buildEcs() {
        Ecs ecs = new Ecs();
        ecs.setName(IdUtil.fastUUID());
        int cpu = 1 << RandomUtil.randomInt(8);
        ecs.setCpu(cpu);
        ecs.setMemory(cpu * 2);
        ecs.setCreateTime(LocalDateTime.now());
        ecs.setCreateBy(RandomUtil.randomString(5));
        ecs.setTenantId(RandomUtil.randomLong(10));
        return ecs;
    }
}
```

接下来就可以进入插入测试环节了。

### For 循环依次单个插入（无事务）

我们通过指定不同的数据量，在 for 循环中，依次调用 `service.save()` 方法，并打印耗时（忽略 buildEcs() 的耗时）

```java
@ParameterizedTest
@ValueSource(ints = {1000, 5000, 10000})
void insertForeach(int total) {
    long start = System.currentTimeMillis();
    for (int i = 0; i < total; i++) {
        service.save(buildEcs());
    }
    long end = System.currentTimeMillis();
    System.out.println(StrUtil.format("insertForeach: {}, cost time {} ms", total, end - start));
}
```

执行结果：

```bash
insertForeach: 1000, cost time 5570 ms
insertForeach: 5000, cost time 25299 ms
insertForeach: 10000, cost time 49449 ms
```

从结果可以看出，即使是数据量如此小的情况下，所花费的时间也难以接收，主要的原因就是，每次调用 `service.save(buildEcs())` 插入数据时，都需要与数据库进行连接，大量的时间花费在了数据库连接上面，这种方式是不可取的。

### For 循环依次单个插入（开启事务）

在上面案例的基础上，我们关闭 sqlSession 的自动提交事务，改为在全部都插入后手动提交事务，并且提高了测试的数据量

```java
@ParameterizedTest
@ValueSource(ints = {10000, 50000, 100000, 500000})
void insertForeachWithTransactional(int total) {
    SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
    EcsMapper mapper = sqlSession.getMapper(EcsMapper.class);
    long start = System.currentTimeMillis();
    for (int i = 0; i < total; i++) {
        mapper.insert(buildEcs());
    }
    sqlSession.commit();
    sqlSession.close();
    long end = System.currentTimeMillis();
    System.out.println(StrUtil.format("insertBatchForeach: {}, cost time {} ms", total, end - start));
}
```

执行结果：

```bash
insertBatchForeach: 10000, cost time 587 ms
insertBatchForeach: 50000, cost time 1426 ms
insertBatchForeach: 100000, cost time 2915 ms
insertBatchForeach: 500000, cost time 13910 ms
```

从结果可以看到，开启了事务之后，插入的速度提高了好几个量级，原因是共用了一个 SqlSession，省去对资源相关操作的耗能、减少了对事务处理的等待时间，从而极大地提高了执行效率。

但是要注意，mysql 有一个参数 `max_allowed_packet` 控制通信的 packet 大小，因此你不能总是将数据一股脑通过一次连接传输至 mysql，比较好的办法是，每 n 条数据就提交一下，分批次地插入，MybatisPlus 的 `saveBatch` 方法就是这样工作的。

### MybatisPlus 的 `saveBatch` 批量插入

MybatisPlus 的 `saveBatch` 方法，可以指定 `batchSize`(插入批次数量) 参数，如果不指定，默认为 1000。

```java
// com.baomidou.mybatisplus.extension.service.IService.java
/**
 * 默认批次提交数量
 */
int DEFAULT_BATCH_SIZE = 1000;
```

此外，使用 `saveBatch` 方法，还有一个前提是需要开启事务，如果不开启事务，则会报如下 log 中的错误

```java
// com.baomidou.mybatisplus.extension.toolkit.SqlHelper.java#executeBatch()
boolean transaction = TransactionSynchronizationManager.isSynchronizationActive();

if (!transaction) {
    log.warn("SqlSession [" + sqlSession + "] Transaction not enabled");
}
```

> 开启事务的方法是：
> 1. 启动类添加 `@EnableTransactionManagement` 注解；
> 2. Service 的实现类添加 `@Transactional(rollbackFor = Exception.class)` 注解。

**接下来我们来测试 `saveBatch` 的插入速度，我们选择和方式二同样的数据量，并使用默认的插入批次数量 1000：**

```java
@ParameterizedTest
@ValueSource(ints = {10000, 50000, 100000, 500000})
void insertBatchDefault(int total) {
    List<Ecs> data = new ArrayList<>();
    for (int i = 0; i < total; i++) {
        data.add(buildEcs());
    }
    long start = System.currentTimeMillis();
    service.saveBatch(data);
    long end = System.currentTimeMillis();
    System.out.println(StrUtil.format("insertBatchDefault: {}, cost time {} ms", total, end - start));
}
```

执行结果：

```bash
insertBatchDefault: 10000, cost time 954 ms
insertBatchDefault: 50000, cost time 1488 ms
insertBatchDefault: 100000, cost time 2758 ms
insertBatchDefault: 500000, cost time 13429 ms
```

可以看到，和方式二的速度差别不到，甚至略慢一点，这是因为默认每 1000 条数据就提交，相比于方式二全部一次提交自然会多一些资源的操作开销，但是可以避免因为数据量太小而被 mysql 拒绝处理的风险；当然了，我们可以手动调节这个插入批次数量，具体可依 mysql 服务器配置而调节。

比如，我将上述代码的插入批次数量从默认的 1000 改为 5000，执行结果：

```bash
insertBatchCustom: 10000, cost time 574 ms
insertBatchCustom: 50000, cost time 1382 ms
insertBatchCustom: 100000, cost time 2435 ms
insertBatchCustom: 500000, cost time 12360 ms
```

再改为 500000，执行结果：

```bash
insertBatchCustom: 10000, cost time 566 ms
insertBatchCustom: 50000, cost time 1553 ms
insertBatchCustom: 100000, cost time 2852 ms
insertBatchCustom: 500000, cost time 15672 ms
```

从结果可以大致看出，选择一个合适的插入批次数量，可以适当地提高插入效率。

## 总结

影响 mysql 插入性能的因素：

- 数据库连接次数过多会极大地影响插入性能，使用事务批量提交可以有效提升性能；
- 数据库对于单次连接的通信包大小有限额，应当选择合适的数据量批次提交。