---
title: Spring Boot 缓存 Cache 入门
category: Redis
author: 芋道源码
date: 2023-02-12
description: Spring Boot 缓存 Cache 入门
---

本文介绍了 Spring Cache 框架的缓存注解以及使用中会遇到的问题

<!-- more -->

## 什么是 Spring Cache？

Spring 3.1 引入了激动人心的基于注释（annotation）的缓存（cache）技术，它本质上不是一个具体的缓存实现方案（例如 EHCache 或者 OSCache），而是一个对缓存使用的抽象，通过在既有代码中添加少量它定义的各种 annotation，即能够达到缓存方法的返回对象的效果。

Spring 的缓存技术还具备相当的灵活性，不仅能够使用 SpEL（Spring Expression Language）来定义缓存的 key 和各种 condition，还提供开箱即用的缓存临时存储方案，也支持和主流的专业缓存例如 EHCache 集成。

其特点总结如下：

- 通过少量的配置 annotation 注释即可使得既有代码支持缓存；
- 支持开箱即用 Out-Of-The-Box，即不用安装和部署额外第三方组件即可使用缓存；
- 支持 Spring Express Language，能使用对象的任何属性或者方法来定义缓存的 key 和 condition；
- 支持 AspectJ，并通过其实现任何方法的缓存支持；
- 支持自定义 key 和自定义缓存管理者，具有相当的灵活性和扩展性。

总的来说，它是一个基于 Spring 框架的 Cache 门面框架，我们可以使用它提供的注解来进行缓存的操作，而与缓存服务器的连接和操作由所配置的缓存客户端去实现。

## Spring Cache 注解

在入门 Spring Cache 之前，我们先了解下其提供的所有注解：

- @Cacheable
- @CachePut
- @CacheEvict
- @CacheConfig
- @Caching
- @EnableCaching

### @Cacheable

@Cacheable 注解，添加在方法上，缓存方法的执行结果。执行过程如下：

1. 首先，判断方法执行结果的缓存。如果有，则直接返回该缓存结果。
2. 然后，执行方法，获得方法结果。
3. 之后，根据是否满足缓存的条件。如果满足，则缓存方法结果到缓存。
4. 最后，返回方法结果。

@Cacheable 注解的常用属性，如下：

- cacheNames 属性：缓存名。必填。[] 数组，可以填写多个缓存名。

- values 属性：和 cacheNames 属性相同，是它的别名。

- key 属性：缓存的 key 。允许空。如果为空，则默认方法的所有参数进行组合。如果非空，则需要按照 SpEL(Spring Expression Language) 来配置。例如说，@Cacheable(value = "users", key = "#id") ，使用方法参数 id 的值作为缓存的 key 。

- condition 属性：基于方法入参，判断要缓存的条件。允许空。如果为空，则不进行入参的判断。如果非空，则需要按照 SpEL(Spring Expression Language) 来配置。例如说，@Cacheable(condition="#id > 0") ，需要传入的 id 大于零。

- unless 属性：基于方法返回，判断不缓存的条件。允许空。如果为空，则不进行入参的判断。如果非空，则需要按照 SpEL(Spring Expression Language) 来配置。例如说，@Cacheable(unless="#result == null") ，如果返回结果为 null ，则不进行缓存。
要注意，condition 和 unless 都是条件属性，差别在于前者针对入参，后者针对结果。

@Cacheable 注解的不常用属性，如下：

- keyGenerator 属性：自定义 key 生成器 KeyGenerator Bean 的名字。允许空。如果设置，则 key 失效。

- cacheManager 属性：自定义缓存管理器 CacheManager Bean 的名字。允许空。一般不填写，除非有多个 CacheManager Bean 的情况下。

- cacheResolver 属性：自定义缓存解析器 CacheResolver Bean 的名字。允许空。

- sync 属性，在获得不到缓存的情况下，是否同步执行方法。默认为 false ，表示无需同步。如果设置为 true ，则执行方法时，会进行加锁，保证同一时刻，有且仅有一个方法在执行，其它线程阻塞等待。通过这样的方式，避免重复执行方法。注意，该功能的实现，需要参考第三方缓存的具体实现。

### @CachePut

@CachePut 注解，添加在方法上，缓存方法的执行结果。不同于 @Cacheable 注解，它的执行过程如下：

1. 首先，执行方法，获得方法结果。也就是说，无论是否有缓存，都会执行方法。
2. 然后，根据是否满足缓存的条件。如果满足，则缓存方法结果到缓存。
3. 最后，返回方法结果。
一般来说，使用方式如下：

@Cacheable：搭配读操作，实现缓存的被动写。
@CachePut：配置写操作，实现缓存的主动写。
@Cacheable 注解的属性，和 @Cacheable 注解的属性，基本一致，只少一个 sync 属性。

### @CacheEvict

@CacheEvict 注解，添加在方法上，删除缓存。

相比 @CachePut 注解，它额外多了两个属性：

- allEntries 属性，是否删除缓存名( cacheNames )下，所有 key 对应的缓存。默认为 false ，只删除指定 key 的缓存。

- beforeInvocation 属性，是否在方法执行前删除缓存。默认为 false ，在方法执行后删除缓存。

### @CacheConfig

@CacheConfig 注解，添加在类上，共享如下四个属性的配置：

- cacheNames
- keyGenerator
- cacheManager
- cacheResolver

### @Caching

@Caching 注解，添加在方法上，可以组合使用多个 @Cacheable、@CachePut、@CacheEvict 注解。不太常用，可以暂时忽略。

### @EnableCaching

`@EnableCaching` 注解，标记开启 Spring Cache 功能，所以一定要添加。代码如下：

```java
// EnableCaching.java

boolean proxyTargetClass() default false;

AdviceMode mode() default AdviceMode.PROXY;

int order() default Ordered.LOWEST_PRECEDENCE;

```

## Spring Boot 中使用 Spring Cache 门面

在 Spring Boot 里，提供了 spring-boot-starter-cache 库，实现 Spring Cache 的自动化配置，通过 CacheAutoConfiguration 配置类。

Spring Cache Maven 依赖如下：

```xml
<!-- 实现对 Caches 的自动化配置 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

在 Java 后端开发中，常见的缓存工具和框架列举如下：

- 本地缓存：Guava LocalCache、Ehcache、Caffeine 。

  Ehcache 的功能更加丰富，Caffeine 的性能要比 Guava LocalCache 好。

- 分布式缓存：Redis、Memcached、Tair 。

  Redis 最为主流和常用。

那么，在这些缓存方案当中，spring-boot-starter-cache 怎么知道使用哪种呢？在默认情况下，Spring Boot 会按照如下顺序，自动判断使用哪种缓存方案，创建对应的 CacheManager 缓存管理器。

```java
// CacheConfigurations.java

private static final Map<CacheType, Class<?>> MAPPINGS;

static {
	Map<CacheType, Class<?>> mappings = new EnumMap<>(CacheType.class);
	mappings.put(CacheType.GENERIC, GenericCacheConfiguration.class);
	mappings.put(CacheType.EHCACHE, EhCacheCacheConfiguration.class);
	mappings.put(CacheType.HAZELCAST, HazelcastCacheConfiguration.class);
	mappings.put(CacheType.INFINISPAN, InfinispanCacheConfiguration.class);
	mappings.put(CacheType.JCACHE, JCacheCacheConfiguration.class);
	mappings.put(CacheType.COUCHBASE, CouchbaseCacheConfiguration.class);
	mappings.put(CacheType.REDIS, RedisCacheConfiguration.class);
	mappings.put(CacheType.CAFFEINE, CaffeineCacheConfiguration.class);
	mappings.put(CacheType.SIMPLE, SimpleCacheConfiguration.class);
	mappings.put(CacheType.NONE, NoOpCacheConfiguration.class);
	MAPPINGS = Collections.unmodifiableMap(mappings);
}
```

因为自动判断可能和我们希望使用的缓存方案不同，此时我们可以手动配置 spring.cache.type 指定类型。

目前最常使用的是 Ehcache 本地缓存，和 Redis 分布式缓存。

Ehcache Maven 依赖：

```xml
<!-- Ehcache 依赖 -->
<dependency>
    <groupId>net.sf.ehcache</groupId>
    <artifactId>ehcache</artifactId>
</dependency>
```

Redis Maven 依赖如下，Spring Boot 默认使用 lettuce 作为 Redis 客户端, 如果你想使用 Jedis，可以像下面这样替换：

```xml
<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-data-redis</artifactId>
<exclusions>
    <!-- 去掉对 Lettuce 的依赖，因为 Spring Boot 优先使用 Lettuce 作为 Redis 客户端 -->
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

目前，Spring Data Redis 暂时只支持 Jedis、Lettuce 的内部封装，而 Redisson 是由 `redisson-spring-data` 来提供。

## Cache 注解失效场景 <Badge text="重要" type="warning" />

Cache 本质上是基于面向**切面**的思想做的，实际上就是使用Java动态代理，创建实例的时候注入的是代理对象，在代理对象里调用实际的对象，这样就可以在实际的方法执行前，处理一下缓存的逻辑：没有找到缓存就往下执行，执行完把结果加入到缓存中；找到缓存则直接返回缓存的结果，不调用执行实际的方法。

因此会有两种失效场景：

1. Cache 注解添加在接口中的方法上

由于 Cache 基于 AOP，也就是 Java 动态代理，是通过继承类去代理，而代理类无法继承一个接口，因此会失效。

2. 一个方法 A 调同一个类里的另一个有缓存注解的方法 B，这样是不走缓存的

原因就是上面说的，使用 Cache 注解添加缓存实际上就是使用动态代理做的，在代理的方法前后做缓存的相应处理。这样一来，单独的去调方法 B 是有缓存的，但是如果调方法 A，A 里面再去调 B 方法，哪怕 B 方法配置了缓存，也是不会生效的。

解决方法：
1. 不使用注解的方式，直接取 Ehcache 的 `CacheManger` 对象，把需要缓存的数据放到里面，类似于使用 Map，缓存的逻辑自己控制;
2. 把方法 A 和方法 B 放到两个不同的类里面，例如：如果两个方法都在 service 接口里，把方法 B 放到另一个 service 里面，这样 A 方法里调 B 方法，就可以使用 B 方法的缓存。

## 参考资料

- [芋道 Spring Boot 缓存 Cache 入门](http://www.iocoder.cn/Spring-Boot/Cache/)
- [Spring @Cacheable 缓存不生效的问题](https://www.cnblogs.com/zhaoyue1215/p/9267584.html)