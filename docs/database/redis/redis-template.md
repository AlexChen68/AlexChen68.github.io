---
title: SpringBoot 使用 Redis
date: 2023-06-07
order: 201
---

# SpringBoot 使用 Redis

## spring-boot-starter-data-redis

`spring-data-redis` 是 Spring 封装的简化 Redis 操作的框架，主要通过提供模板方法来统一抽象 Redis 的数据操作；`spring-boot-starter-data-redis` 是其自动配置模块，其依赖为：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

通过 `spring-boot-starter-data-redis` 的自动配置，SpringBoot 会自动识别 Redis 连接客户端的类型，进行相应的配置。

其默认的 Redis 客户端为 `Lettuce`，可以通过排除 Lettuce 的依赖，同时引入其他 Redis 客户端来替换为其他客户端，示例：

```xml
 <!-- Spring Data Redis （排除 lettuce，使用 Jedis） -->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
   <exclusions>
         <exclusion>
            <groupId>io.lettuce</groupId>
            <artifactId>lettuce-core</artifactId>
         </exclusion>
   </exclusions>
</dependency>
<!-- 引入 Jedis 的依赖，这样 Spring Boot 实现对 Jedis 的自动化配置 -->
<dependency>
   <groupId>redis.clients</groupId>
   <artifactId>jedis</artifactId>
</dependency>
```

## Redis 配置文件

在 `application.yml` 中，可以对 Redis 进行配置，例如：

```yaml
spring:
  # 对应 RedisProperties 类
  redis:
    host: 127.0.0.1
    port: 6379
    password: # Redis 服务器密码，默认为空。生产中，一定要设置 Redis 密码！
    database: 0 # Redis 数据库号，默认为 0。
    timeout: 0 # Redis 连接超时时间，单位：毫秒。
    # 对应 RedisProperties.Jedis 内部类
    jedis:
      pool:
        max-active: 8 # 连接池最大连接数，默认为 8。使用负数表示没有限制。
        max-idle: 8 # 默认连接数最小空闲的连接数，默认为 8。使用负数表示没有限制。
        min-idle: 0 # 默认连接池最小空闲的连接数，默认为 0。允许设置 0 和 正数。
        max-wait: -1 # 连接池最大阻塞等待时间，单位：毫秒。默认为 -1，表示不限制。
```

其对应的属性文件为 `org.springframework.data.redis.support.collections.RedisProperties`。

## RedisTemplate

`RedisTemplate` 是 Spring 抽离出的 Redis 操作模板方法，这样不需要关心 Redis 客户端实现，使用一套方法即可不同客户端操作 Redis。

`RedisTemplate` 的主要属性：

```java
public class RedisTemplate<K, V> extends RedisAccessor implements RedisOperations<K, V>, BeanClassLoaderAware {

   // 用于指定不同 key 和 value 的序列化和反序列化的方式
	@SuppressWarnings("rawtypes") private @Nullable RedisSerializer keySerializer = null;
	@SuppressWarnings("rawtypes") private @Nullable RedisSerializer valueSerializer = null;
	@SuppressWarnings("rawtypes") private @Nullable RedisSerializer hashKeySerializer = null;
	@SuppressWarnings("rawtypes") private @Nullable RedisSerializer hashValueSerializer = null;
	private RedisSerializer<String> stringSerializer = RedisSerializer.string();

   //  Lua 脚本执行器
	private @Nullable ScriptExecutor<K> scriptExecutor;

   // 各种具体数据结构的操作类
	private final ValueOperations<K, V> valueOps = new DefaultValueOperations<>(this);
	private final ListOperations<K, V> listOps = new DefaultListOperations<>(this);
	private final SetOperations<K, V> setOps = new DefaultSetOperations<>(this);
	private final StreamOperations<K, ?, ?> streamOps = new DefaultStreamOperations<>(this,
			ObjectHashMapper.getSharedInstance());
	private final ZSetOperations<K, V> zSetOps = new DefaultZSetOperations<>(this);
	private final GeoOperations<K, V> geoOps = new DefaultGeoOperations<>(this);
	private final HyperLogLogOperations<K, V> hllOps = new DefaultHyperLogLogOperations<>(this);
	private final ClusterOperations<K, V> clusterOps = new DefaultClusterOperations<>(this);
}
```

`RedisTemplate` 的主要属性中，前面四个 `RedisSerializer` 类型的属性用于指定不同 key 和 value 的序列化和反序列化的方式；`scriptExecutor` 是一个 Lua 脚本执行器；其他 `xxxOperations<K, V>` 类型的属性是针对 Redis 不同数据结构而设计的操作接口实现类，比如 `SetOperations` 定义了操作 Redis Set 数据类型的操作方法，而 `DefaultSetOperations` 是它的默认实现类。

需要注意的是，`RedisTemplate` 本身还具有操作 Redis 的通用操作方法，这些 `Operations` 通常是用来操作具体的数据结构时才使用。

## 序列化

Redis 的 key 和 value 在写入到 Redis 和从 Redis 读取的时候，都需要先序列化成二进制数组，然后再反序列化为原来的数据结构，这个序列化和序列化都需要序列化器（RedisSerializer）去实现。

SpringDataRedis 中的 `RedisSerializer<T>` 就是序列化器的接口，它定义一个序列化和反序列化的接口，并通过静态方法提供了几个默认实现（`JdkSerializationRedisSerializer`,`GenericJackson2JsonRedisSerializer`,`StringRedisSerializer` 等等）。

```java
public interface RedisSerializer<T> {

	/**
	 * Serialize the given object to binary data.
	 *
	 * @param t object to serialize. Can be {@literal null}.
	 * @return the equivalent binary data. Can be {@literal null}.
	 */
	@Nullable
	byte[] serialize(@Nullable T t) throws SerializationException;

	/**
	 * Deserialize an object from the given binary data.
	 *
	 * @param bytes object binary representation. Can be {@literal null}.
	 * @return the equivalent object instance. Can be {@literal null}.
	 */
	@Nullable
	T deserialize(@Nullable byte[] bytes) throws SerializationException;
}
```

我们可以通过自定义配置 RedisTemplate Bean，来对其进行全局的默认设置，示例：

```java
@Bean
public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
   RedisTemplate<Object, Object> template = new RedisTemplate<>();
   template.setConnectionFactory(redisConnectionFactory);
   // 使用 fastjson2 来进行序列化
   GenericFastJsonRedisSerializer fastJsonRedisSerializer = new GenericFastJsonRedisSerializer();
   template.setKeySerializer(RedisSerializer.string());
   template.setValueSerializer(fastJsonRedisSerializer);
   template.setHashKeySerializer(RedisSerializer.string());
   template.setHashValueSerializer(fastJsonRedisSerializer); 
   return template;
}
```

我们这里设置了采用 FastJson2 的序列化实现，来对 value 进行序列化，需要引入 FastJson2 的 pom 依赖：

```xml
<dependency>
   <groupId>com.alibaba.fastjson2</groupId>
   <artifactId>fastjson2</artifactId>
</dependency>
```

