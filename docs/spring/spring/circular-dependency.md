---
title: Spring 三级缓存解决循环依赖
date: 2023-05-18
order: 2
---

# Spring 三级缓存解决循环依赖

## Spring 循环依赖问题

什么是循环依赖呢？可以把它拆分成循环和依赖两个部分来看，循环是指计算机领域中的循环，执行流程形成闭合回路；依赖就是完成这个动作的前提准备条件，和我们平常说的依赖大体上含义一致。放到 Spring 中来看就一个或多个 Bean 实例之间存在直接或间接的依赖关系，构成循环调用，循环依赖可以分为直接循环依赖和间接循环依赖。

直接循环依赖的简单依赖场景：Bean A 依赖于 Bean B，然后 Bean B 又反过来依赖于 Bean A（Bean A -> Bean B -> Bean A）；

间接循环依赖的一个依赖场景：Bean A 依赖于 Bean B，Bean B 依赖于 Bean C，Bean C 依赖于 Bean A，中间多了一层，但是最终还是形成循环（Bean A -> Bean B -> Bean C -> Bean A）。

## 循环依赖的类型

第一种是**自依赖**，自己依赖自己从而形成循环依赖，一般情况下不会发生这种循环依赖，因为它很容易被我们发现。

![1.png](https://i.loli.net/2021/07/17/LGgVfXmPKU3EwcS.png)

第二种是**直接依赖**，发生在两个对象之间，比如：Bean A 依赖于 Bean B，然后 Bean B 又反过来依赖于 Bean A，如果比较细心的话肉眼也不难发现。

![2.png](https://i.loli.net/2021/07/17/yNlpDUtmQT2RXnu.png)

第三种是**间接依赖**，这种依赖类型发生在 3 个或者以上的对象依赖的场景，间接依赖最简单的场景：Bean A 依赖于 Bean B，Bean B 依赖于 Bean C，Bean C 依赖于 Bean A，可以想象当中间依赖的对象很多时，是很难发现这种循环依赖的，一般都是借助一些工具排查。

![3.png](https://i.loli.net/2021/07/17/OH3JobWDSPqrYZE.png)

## Spring 三级缓存

```java
/** Cache of singleton objects: bean name --> bean instance */
private final Map<String, Object> singletonObjects = new ConcurrentHashMap<String, Object>(256);
 
/** Cache of early singleton objects: bean name --> bean instance */
private final Map<String, Object> earlySingletonObjects = new HashMap<String, Object>(16);

/** Cache of singleton factories: bean name --> ObjectFactory */
private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<String, ObjectFactory<?>>(16);
```

**第一层缓存（singletonObjects）**：单例对象缓存池，已经实例化并且属性赋值，这里的对象是**成熟对象**；

**第二层缓存（earlySingletonObjects）**：单例对象缓存池，已经实例化但尚未属性赋值，这里的对象是**半成品对象**；

**第三层缓存（singletonFactories）**: 单例工厂的缓存

## Spring 对几种循环依赖场景支持情况

在介绍 Spring 对几种循环依赖场景的处理方式之前，先来看看在 Spring 中循环依赖会有哪些场景，大部分常见的场景总结如下图所示：

![4.png](https://i.loli.net/2021/07/17/qu4Y6s8nBi1NvRa.png)

有句话说得好，源码之下无秘密，下面就通过源码探究这些场景 Spring 是否支持，以及支持的原因或者不支持的原因，话不多说，下面进入正题。

### 第 ① 种场景——单例 Bean 的 setter 注入

这种使用方式也是最常用的方式之一，假设有两个 Service 分别为 OrderService（订单相关业务逻辑）和 TradeService（交易相关业务逻辑），代码如下：

```Java
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
public class OrderService {

  @Autowired
  private TradeService tradeService;

  public void testCreateOrder() {
    // omit business logic ...
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
public class TradeService {

  @Autowired
  private OrderService orderService;

  public void testCreateTrade() { 
    // omit business logic ...
   }

}
```

这种循环依赖场景，程序是可以正常运行的，从代码上看确实是有循环依赖了，也就是说 Spring 是支持这种循环依赖场景的，这里我们察觉不到循环依赖的原因是 Spring 已经默默地解决了。

假设没有做任何处理，按照正常的创建逻辑来执行的话，流程是这样的：容器先创建 OrderService，发现依赖于 TradeService，再创建 OrderService，又发现依赖于 TradeService ... ，发生无限死循环，最后发生栈溢出错误，程序停止。为了支持这种常见的循环依赖场景，Spring 将创建对象分为如下几个步骤：

1. 实例化一个新对象（在堆中），但此时尚未给对象属性赋值
2. 给对象赋值
3. 调用 BeanPostProcessor 的一些实现类的方法，在这个阶段，Bean 已经创建并赋值属性完成。这时候容器中所有实现 BeanPostProcessor 接口的类都会被调用（e.g. AOP）
4. 初始化（如果实现了 InitializingBean，就会调用这个类的方法来完成类的初始化）
5. 返回创建出来的实例

为此，Spring 引入了三级缓存来处理这个问题（三级缓存定义在 org.springframework.beans.factory.support.DefaultSingletonBeanRegistry 中），第一级缓存 singletonObjects 用于存放完全初始化好的 Bean，从该缓存中取出的 Bean 可以直接使用，第二级缓存 earlySingletonObjects 用于存放提前暴露的单例对象的缓存，存放原始的 Bean 对象（属性尚未赋值），用于解决循环依赖，第三级缓存 singletonFactories 用于存放单例对象工厂的缓存，存放 Bean 工厂对象，用于解决循环依赖。上述实例使用三级缓存的处理流程如下所示：

![5.png](https://i.loli.net/2021/07/17/jPUQ6Sfs8mpBtLg.png)

如果你看过三级缓存的定义源码的话，可能也有这样的疑问：为什么第三级的缓存的要定义成 Map<String, ObjectFactory<?>>，不能直接缓存对象吗？这里不能直接保存对象实例，因为这样就无法对其做增强处理了。详情可见类 org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#doCreateBean 方法部分源码如下：

![6.png](https://i.loli.net/2021/07/17/ribwoNKSgs7L3Jn.png)

### 第 ② 种场景——多例 Bean 的 setter 注入

这种方式平常使用得相对较少，还是使用前文的两个 Service 作为示例，唯一不同的地方是现在都声明为多例了，示例代码如下：

```Java
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class OrderService {

  @Autowired
  private TradeService tradeService;

  public void testCreateOrder() {
    // omit business logic ...
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class TradeService {

  @Autowired
  private OrderService orderService;

  public void testCreateTrade() { 
    // omit business logic ...
   }

}
```

如果你在 Spring 中运行以上代码，是可以正常启动成功的，原因是在类 org.springframework.beans.factory.support.DefaultListableBeanFactory 的 preInstantiateSingletons() 方法预实例化处理时，过滤掉了多例类型的 Bean，方法部分代码如下：

![7.png](https://i.loli.net/2021/07/17/jO3nk4vrZ9yhXSi.png)

但是如果此时有其它单例类型的 Bean 依赖到这些多例类型的 Bean 的时候，就会报如下所示的循环依赖错误了。

![8.png](https://i.loli.net/2021/07/17/MDVst5Er2UXCRzm.png)

### 第 ③ 种场景——代理对象的 setter 注入

这种场景也会经常碰到，有时候为了实现异步调用会在 XXXXService 类的方法上添加 @Async 注解，让方法对外部变成异步调用（前提要是要在启用类上添加启用注解哦 @EnableAsync），示例代码如下：

```Java
/**
 * @author mghio
 * @since 2021-07-17
 */
@EnableAsync
@SpringBootApplication
public class BlogMghioCodeApplication {

  public static void main(String[] args) {
    SpringApplication.run(BlogMghioCodeApplication.class, args);
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class OrderService {

  @Autowired
  private TradeService tradeService;

  @Async
  public void testCreateOrder() {
    // omit business logic ...
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class TradeService {

  @Autowired
  private OrderService orderService;

  public void testCreateTrade() { 
    // omit business logic ...
   }

}
```

在标有 @Async 注解的场景下，在添加启用异步注解（@EnableAsync）后，代理对象会通过 AOP 自动生成。以上代码运行会抛出 BeanCurrentlyInCreationException 异常。运行的大致流程如下图所示：

![9.png](https://i.loli.net/2021/07/17/UMEi1GCOo3FDmKB.png)

源码在 org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory 类的方法 doCreateBean 中，会判断第二级缓存 earlySingletonObjects 中的对象是否等于原始对象，方法判断部分的源码如下：

![10.png](https://i.loli.net/2021/07/17/685tnVsEjD7aqWh.png)

二级缓存存放的对象是 AOP 生成出来的代理对象，和原始对象不相等，所以抛出了循环依赖错误。如果细看源码的话，会发现如果二级缓存是空的话会直接返回（因为比较的对象都没有，根本无法校验了），就不会报循环依赖的错误了，默认情况下，Spring 是按照文件全路径递归搜索，按路径 + 文件名 排序，排序靠前先加载，所以我们只要调整这两个类名称，让方法标有 @Async 注解的类排序在后面即可。

### 第 ④ 种场景——构造器注入

构造器注入的场景很少，到目前为止我所接触过的公司项目和开源项目中还没遇到使用构造器注入的，虽然用得不多，但是需要知道 Spring 为什么不支持这种场景的循环依赖，构造器注入的示例代码如下：

```Java
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
public class OrderService {

  private TradeService tradeService;

  public OrderService(TradeService tradeService) {
    this.tradeService = tradeService;
  }

  public void testCreateOrder() {
    // omit business logic ...
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
public class TradeService {

  private OrderService orderService;

  public TradeService(OrderService orderService) {
    this.orderService = orderService;
  }

  public void testCreateTrade() {
    // omit business logic ...
  }

}
```

构造器注入无法加入到第三级缓存当中，Spring 框架中的三级缓存在此场景下无用武之地，所以只能抛出异常，整体流程如下（虚线表示无法执行，为了直观也把下一步画出来了）:

![11.png](https://i.loli.net/2021/07/17/k3f7VgNIyQjnUwG.png)

### 第 ⑤ 种场景——DependsOn 循环依赖

这种 DependsOn 循环依赖场景很少，一般情况下不怎么使用，了解一下会导致循环依赖的问题即可，@DependsOn 注解主要是用来指定实例化顺序的，示例代码如下：

```Java
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@DependsOn("tradeService")
public class OrderService {

  @Autowired
  private TradeService tradeService;

  public void testCreateOrder() {
    // omit business logic ...
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@DependsOn("orderService")
public class TradeService {

  @Autowired
  private OrderService orderService;

  public void testCreateTrade() {
    // omit business logic ...
  }

}
```

通过上文，我们知道，如果这里的类没有标注 @DependsOn 注解的话是可以正常运行的，因为 Spring 支持单例 setter 注入，但是加了示例代码的 @DependsOn 注解后会报循环依赖错误，原因是在类 org.springframework.beans.factory.support.AbstractBeanFactory 的方法 doGetBean() 中检查了 dependsOn 的实例是否有循环依赖，如果有循环依赖则抛出循环依赖异常，方法判断部分代码如下：

![12.png](https://i.loli.net/2021/07/17/DdnyNJAe15rpkjZ.png)

## 参考资料

- [Spring 的循环依赖问题](https://www.cnblogs.com/mghio/p/15024461.html)