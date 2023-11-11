---
title: 分布式事务中间件 Seata
date: 2023-06-13
order: 5
---

# 分布式事务中间件 Seata

> 本文使用的 seata 版本：1.5.2

## 什么是分布式事务？

事务是一个程序执行单元，里面的所有操作要么全部执行成功，要么全部执行失败。在分布式系统中，这些操作可能是位于不同的服务中，那么如果也能保证这些操作要么全部执行成功要么全部执行失败呢？这便是分布式事务要解决的问题。

## Seata 简介

Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。

Seata 为用户提供了 `AT`、`TCC`、`SAGA` 和 `XA` 四种事务模式，打造一站式的分布式解决方案。


- [Seata 官网链接](https://seata.io/zh-cn/index.html)

## seata 入门

### 启动 seata server

Server 端存储模式（store.mode）现有 file、db、redis 三种（后续将引入 raft,mongodb），file 模式无需改动，直接启动即可，下面专门讲下 db 和 redis 启动步骤。

:::warning 注：
- file 模式为单机模式，全局事务会话信息内存中读写并持久化本地文件 root.data，性能较高（默认）。
- db 模式为高可用模式，全局事务会话信息通过 db 共享，相应性能差些。
- redis 模式 Seata-Server 1.3 及以上版本支持，性能较高，存在事务信息丢失风险，请提前配置合适当前场景的 redis 持久化配置。
:::

:::danger 重要‼️
**本文主要介绍使用 Nacos 作为数据中心和配置中心启动 seata server，采用 db 模式启动的方式。**
:::

#### 下载 seata-server

从 [seata-release](https://github.com/seata/seata/releases) 下载需要的版本压缩包解压。

示例：

```bash
wget https://github.com/seata/seata/releases/download/v1.5.2/seata-server-1.5.2.zip
unzip seata-server-1.5.2.zip
```

解压后目录如下所示：

![20231111091001](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/20231111091001.png)

#### 配置 seata-server

seata-server 可以向注册中心注册，也可以将其配置参数存储到配置中心中。

- 注册中心类型可选范围为：file、nacos、eureka、redis、zk、consul、etcd3、sofa，通常选择 nacos 配置中心作为注册中心；
- 配置中心类型可选择范围为：file、nacos、apollo、zk、consul、etcd3。

打开 seata-server 的目录，进入 `conf` 目录，可以通过修改 `application.yml` 配置文件来改变 seata-server 的注册和配置方式。

配置参数说明：

- `seata.registry`：注册中心的类型及其对应的配置参数;
- `seata.config`：配置中心的类型及其对应的配置参数;
- `seata.store.mode`：事务管理过程中的相关信息的存储方式，存储模式有三种：`file`、`db`、`redis`。
   - 若选择为 store.mode=file，Seata 的事务相关信息会存储在内存中，并持久化到本地 root.data 文件中，性能比较高。 
   - 若选择为 store.mode=db。Seata 的事务相关信息会存储在数据库中。使用数据库模式可以支持多个 seata-server 启动，实现 seata-server 高可用。

如果你都使用 file，那么你直接就可以启动它了，但通常我们会使用 nacos + db 的方式部署，这样可以实现高可用。

这里我们使用 nacos + db 的方式进行配置，`application.yml` 示例配置：

```yml
server:
  port: 7091

spring:
  application:
    name: seata-server

logging:
  config: classpath:logback-spring.xml
  file:
    path: ${user.home}/logs/seata
  extend:
    logstash-appender:
      destination: 127.0.0.1:4560
    kafka-appender:
      bootstrap-servers: 127.0.0.1:9092
      topic: logback_to_logstash

console:
  user:
    username: seata
    password: seata

seata:
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      namespace:              #此处不填写，将会默认使用 DEFAULT_GROUP
      group: SEATA_GROUP
      username: nacos         #nacos 的账户（请自行修改）
      password: nacos         #nacos 的密码（请自行修改）
      data-id: seata-server.yml #对应文章后边在 nacos 中添加的配置
  registry:
    # support: nacos, eureka, redis, zk, consul, etcd3, sofa
    type: nacos
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group: SEATA_GROUP
      namespace:              #此处不填写，将会默认使用 DEFAULT_GROUP
      cluster: default
      username: nacos         #nacos 的账户（请自行修改）
      password: nacos         #nacos 的密码（请自行修改）
  # store:
    # support: file 、 db 、 redis
    # mode: file
#  server:
#    service-port: 8091 #If not configured, the default is '${server.port} + 1000'
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
    tokenValidityInMilliseconds: 1800000
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```

:::warning 注意：
上面的配置中，config 配置类型为 nacos，即 seata-server 的配置存储在了 nacos 名为 `seata-server.yml` 的配置中，因此注释掉了 `seata.store` 配置，选择在 nacos 的配置中配置存储方式。
:::

配置完成后，后面还需要启动 nacos，在 nacos 中添加 `seata-server.yml` 的配置。

#### 初始化数据库表结构

当 `seata.store` 的配置为 `db` 时，需要配置数据库连接信息，并且初始化数据表。

初始化数据表操作可以从安装目录的 `/script/server/db` 子目录下，获取对应数据库类型的 sql 文件，在数据库执行来初始化 seata-server 运行时需要的数据表。


#### 集成 Nacos 配置中心

Nacos 新增配置文件 `seata-server.yml`，seata-server 的配置参数可以参考 [官方文档-seata 参数配置](http://seata.io/zh-cn/docs/user/configurations)，也可以从 seata-server 目录下 `/script/config-center/config.txt` 文件中选取需要的配置（config.txt 包含了 server 和 client 的全部配置，适当选择配置）。

`seata-server.yml` 示例配置：

```yml
service:
  vgroupMapping:
    zeus-tx-group: default
store:
  mode: db
  db:
    datasource: druid
    dbType: mysql
    driverClassName: com.mysql.jdbc.Driver
    url: jdbc:mysql://zeus-mysql:3306/seata_server?useUnicode=true
    user: root
    password: root
    minConn: 5
    maxConn: 30
    globalTable: global_table
    branchTable: branch_table
    distributedLockTable: distributed_lock
    queryLimit: 100
    lockTable: lock_table
    maxWait: 5000
```

:::tip 说明：
`service.vgroupMapping` 为事务分组配置，`zeus-tx-group` 为自定义的事务组名称，`default` 为 nacos 集群，与 seata-server 的 配置相对应。
:::

![seata-2023-11-11-09-59-05](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/seata-2023-11-11-09-59-05.png)

#### 启动 Server

首先进入 seata-server 目录下的 `bin` 目录，然后调用 `seata-server.sh` 启动 server：

```bash
./seata-server.sh -h 127.0.0.1 -p 8091
```

各启动参数含义：

> -h: 注册到注册中心的 ip
> 
> -p: Server rpc 监听端口
> 
> -m: 全局事务会话信息存储模式，file、db、redis，**优先读取启动参数** (Seata-Server 1.3 及以上版本支持 redis)
> 
> -n: Server node，当有多个 Server 时，需区分各自节点，用于生成不同区间的 transactionId，以免冲突
> 
> -e: 多环境配置参考 http://seata.io/en-us/docs/ops/multi-configuration-isolation.html

查看 nacos 的服务列表，是否成功注册到 nacos。

![nacos-seata-server](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/nacos-seata-server.png)

:::warning 
注意：seata 启动会占用两个端口，8091 和 7091。其中 8091 是注册到 nacos 中的服务端端口，7091 是其客户端端口，如下图所示。
:::

![seata-2023-11-11-10-11-13](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/seata-2023-11-11-10-11-13.png)

### 集成 seata client

#### 引入依赖

SpringBoot 使用：

```xml
<dependency>
   <groupId>io.seata</groupId>
   <artifactId>seata-spring-boot-starter</artifactId>
   <version>1.5.2</version>
</dependency>
```

SpringCloud 使用：

```xml
<dependency>
   <groupId>com.alibaba.cloud</groupId>
   <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
</dependency>
```

#### 业务数据库添加 undo_log 表

```sql
-- for AT mode you must to init this sql for you business database. the seata server not need it.
CREATE TABLE IF NOT EXISTS `undo_log`
(
    `branch_id`     BIGINT       NOT NULL COMMENT 'branch transaction id',
    `xid`           VARCHAR(128) NOT NULL COMMENT 'global transaction id',
    `context`       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',
    `rollback_info` LONGBLOB     NOT NULL COMMENT 'rollback info',
    `log_status`    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    `log_created`   DATETIME(6)  NOT NULL COMMENT 'create datetime',
    `log_modified`  DATETIME(6)  NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8 COMMENT ='AT transaction mode undo table';
```

#### 客户端 增加 seata 配置

```yml
seata:
  enabled: true
  tx-service-group: zeus_tx_group
  service:
    vgroupMapping:
      zeus_tx_group: default
  registry:
    type: nacos
    nacos:
      application: seata-server
      server-addr: zeus-nacos:8848
      group : "SEATA_GROUP"
      namespace: ""
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: ${MYSQL_USER:root}
    password: ${MYSQL_PWD:root}
    url: jdbc:mysql://${MYSQL_HOST:127.0.0.1}:${MYSQL_PORT:3306}/${MYSQL_DB:seata_order}?characterEncoding=utf8&serverTimezone=GMT%2B8&zeroDateTimeBehavior=convertToNull
```

#### 使用全局事务

在主服务中，第一个开启事务的需要添加 seata 全局事务注解

```java
@GlobalTransactional(rollbackFor = Exception.class)
```

## 参考资料

- [Seata 官方手册](https://seata.io/zh-cn/docs/v1.5/ops/deploy-guide-beginner)
- [若依微服务 + seata1.5.2 版本分布式事务（安装配置 nacos+ 部署）](https://blog.csdn.net/yyongsheng/article/details/131248364)