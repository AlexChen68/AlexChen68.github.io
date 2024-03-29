---
title: Spring IOC 容器
date: 2022-09-15
order: 1
---

# Spring IOC 容器

## Spring 容器概述

Spring 控制反转 (IOC) 容器也称为依赖注入 (DI)。

这是一个过程：对象仅通过构造函数参数、工厂方法的参数或在对象实例被构造或从工厂方法返回后设置的属性来定义它们的依赖关系，然后容器在创建 bean 时注入这些依赖项。这个过程基本上是 bean 本身通过使用类的直接构造或诸如服务定位器模式之类的机制来控制其依赖关系的实例化或位置的逆过程（因此称为控制反转）。

> **控制反转**是一种思想，而**依赖注入**是一种**设计模式**，依赖注入是实现控制反转的一种方式，但是控制反转还有其他实现方式，比如 ServiceLocator。

`org.springframework.context.ApplicationContext`接口代表 Spring IoC 容器，负责实例化、配置和组装 bean。容器通过读取配置元数据来获取关于要实例化、配置和组装哪些对象的指令。配置元数据通过 XML、Java 注释或 Java 代码维护，配置了组成应用程序的对象以及这些对象之间丰富的相互依赖关系。

## Bean 概述

Spring IoC 容器管理一个或多个 bean。这些 bean 是使用提供给容器的配置元数据创建的（例如，以 XML `<bean/>`定义的形式）。

在容器本身中，这些 bean 定义表示为 `BeanDefinition` 对象，其中包含（以及其他信息）以下元数据：

- 一个包限定的类名：通常是被定义的 bean 的实际实现类。
- Bean 行为配置元素，它说明 bean 在容器中的行为方式（范围、生命周期回调等）。
- 对 bean 完成工作所需的其他 bean 的引用。这些引用也称为协作者或依赖项。
- 要在新创建的对象中设置的其他配置设置——例如，池的大小限制或在管理连接池的 bean 中使用的连接数。

## 配置元数据

配置元数据告诉 Spring 容器如何实例化、配置和组装应用程序中的对象。配置元数据有三种主要的配置形式：

- **传统的 Xml 文件配置**：这种方式配置繁琐，不易维护，扩展性差，现在主要用来配置第三方类库或者一些配置工具类，因为第三方类不支持 Spring 注解。
- **基于 Java 的配置类**：这种方式适用性强，扩展性高，十分灵活，但是不适合大量配置，可读性较差，适用少量配置的情况。
- **基于 Java 注解的配置**：这种方式配置方便，容易维护，但是对于不能使用注解的第三方类库，只能使用上面两种方式。

::: tabs

@tab Java 配置类

1. 创建一个配置类，添加 `@Configuration`注解声明为配置类
2. 创建方法，方法上加上 `@Bean`，该方法用于创建实例并返回，该实例创建后会交给 spring 管理，方法名建议与实例名相同（首字母小写）。注：实例类不需要加任何注解

```java
@Configuration
public class BeansConfig {

    /**
     * 注册名称为 userDao 的 Bean”UserDaoImpl“
     */
    @Bean("userDao")
    public UserDaoImpl userDao() {
        return new UserDaoImpl();
    }

    /**
     * 注册名称为 userService 的 Bean”UserServiceImpl“
     */
    @Bean("userService")
    public UserServiceImpl userService() {
        UserServiceImpl userService = new UserServiceImpl();
        userService.setUserDao(userDao());
        return userService;
    }
}
```

@tab Java 注解配置

通过在类上加注解的方式，来声明一个类交给 Spring 管理，Spring 会自动扫描带有@Component，@Controller，@Service，@Repository 这四个注解的类，然后帮我们创建并管理，前提是需要先配置 Spring 的注解扫描器。

- **优点**：开发便捷，通俗易懂，方便维护。
- **缺点**：具有局限性，对于一些第三方资源，无法添加注解。只能采用 XML 或 JavaConfig 的方式配置

**举例**：

1. 对类添加 `@Component` 相关的注解，比如 `@Controller`，`@Service`，`@Repository`
2. 设置 `ComponentScan` 的 `basePackage`:
   1. `<context:component-scan base-package='tech.alexchen.xxx'>`；
   2. 或者 `@ComponentScan("tech.alexchen.xxx")`注解；
   3. 或者 `new AnnotationConfigApplicationContext("tech.alexchen.xxx")`指定扫描的 basePackage。

```java
@Service
public class UserServiceImpl {

    /**
     * 注入 UserDaoImpl
     */
    @Autowired
    private UserDaoImpl userDao;
  
    public List<User> findUserList() {
        return userDao.findUserList();
    }
}
```

@tab Xml 配置

1. 配置 spring.xml 文件
2. 声明命名空间和配置 bean

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">  
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>
    <!-- more bean definitions go here -->
</beans>
```

`id`属性是标识单个 bean 定义的字符串；

`class`属性定义 bean 的类型并使用完全限定的类名。

:::

## 使用容器

`ApplicationContext` 是一个容器高级工厂的接口，能够维护不同 bean 及其依赖项的注册表，可以通过实例化不同实现类去使用不同的配置方式。

通过使用 `getBean(String name， Class<T> requiredType)`，可以从容器获取 bean 的实例。

::: tabs

@tab 读取 XML 文件获取 Context

`ClassPathXmlApplicationContext` 是 `ApplicationContext` 的实现类，通过它可以从 XML 文件读取 Bean 配置。

```java
// 从 spring.xml 中加载配置，实例化 Context
ApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");

// 从容器中获取 SysUserService 的实例
SysUserService userService = context.getBean("userService"， SysUserService.class);
```

`ClassPathXmlApplicationContext` 可以同时从多个文件中加载配置，在构造函数中传入多个文件的路径即可；也可以通过在一个 Xml 文件中引入其他的 Xml 文件，最后加载这一个配置文件，例如，在 spring.xml 中，通过 `import` 标签引入其他三个配置文件：

```xml
// spring.xml
<beans>
    <import resource="services.xml"/>
    <import resource="resources/messageSource.xml"/>
    <import resource="/resources/themeSource.xml"/>

    <bean id="bean1" class="..."/>
    <bean id="bean2" class="..."/>
</beans>
```

@tab 读取 Java 配置获取 Context

`AnnotationConfigApplicationContext` 是 `ApplicationContext` 的实现类，在构造时可以指定配置类的 Class 对象来确定加载的配置，例如：

```java
// 从 BeansConfig 中加载配置，实例化 Context
AnnotationConfigApplicationContext context = 
                new AnnotationConfigApplicationContext(BeansConfig.class);

// 从容器中获取 SysUserService 的实例
SysUserService userService = context.getBean("userService"， SysUserService.class);
```

BeansConfig

```java
@Configuration
public class BeansConfig {

    @Bean("userDao")
    public UserDaoImpl userDao() {
        return new UserDaoImpl();
    }
}
```

@tab 扫描注解获取 Context

`AnnotationConfigApplicationContext` 还可以指定要扫描的包路径，扫描该包下全部类上的注解，从而读取配置。例如：

```java
// 扫描 tech.alexchen.spring 包的类上的注解，加载配置，实例化 Context
AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext("tech.alexchen.spring");

// 从容器中获取 SysUserService 的实例
SysUserService userService = context.getBean("userService"， SysUserService.class);
```

:::

## 依赖注入

依赖注入有三种常见的注入方式：构造函数、Setter 方法和注解注入（接口注入）。

### 基于构造函数的依赖注入

::: tabs

@tab 构造方法注入（注解）

**在注解和 Java 配置方式下**（推荐方式）

```java
// 添加 Service 注解，表明该类交由 Spring 容器管理
@Service
public class UserServiceImpl {

    private final UserDaoImpl userDao;

	// 表示通过构造方法注入
    @Autowired // 这里@Autowired 也可以省略
    public UserServiceImpl(final UserDaoImpl userDaoImpl) {
        this.userDao = userDaoImpl;
    }

    public List<User> findUserList() {
        return this.userDao.findUserList();
    }

}

```

@tab 构造方法注入 (XML)

**在 XML 配置方式中**，`<constructor-arg>`是通过构造函数参数注入，比如下面的 xml:

```xml
<bean id="userService" class="tech.pdai.springframework.service.UserServiceImpl">
    <constructor-arg name="userDao" ref="userDao"/>
</bean>
```

本质上是 new UserServiceImpl(userDao) 创建对象，所以对应的 service 类是这样的：

```java
public class UserServiceImpl {

    private final UserDaoImpl userDao;

    // 构造方法参数和 constructor-arg 对应上
    public UserServiceImpl(UserDaoImpl userDaoImpl) {
        this.userDao = userDaoImpl;
    }

    public List<User> findUserList() {
        return this.userDao.findUserList();
    }

}
```

:::

### 基于 Setter 的依赖注入

::: tabs

@tab Setter 方法注入（注解）

**在注解和 Java 配置方式下**（推荐方式）

```java
public class UserServiceImpl {

    private UserDaoImpl userDao;

    // 通过注解指定 setter 方法
    @Autowired
    public void setUserDao(UserDaoImpl userDao) {
        this.userDao = userDao;
    }
}

```

@tab Setter 方法注入 (XML)

**在 XML 配置方式中**，property 都是 setter 方式注入，比如下面的 xml:

```xml
<bean id="userService" class="tech.pdai.springframework.service.UserServiceImpl">
    <property name="userDao" ref="userDao"/>
</bean>
```

> 本质上包含两步：
>
> 1. 第一步，需要 new UserServiceImpl() 创建对象，所以需要默认构造函数
> 2. 第二步，调用 setUserDao() 函数注入 userDao 的值，所以需要 setUserDao() 函数

所以对应的 service 类是这样的：

```java
public class UserServiceImpl {

    private UserDaoImpl userDao;

    public UserServiceImpl() {}

    // 需要有 Setter 方法
    public void setUserDao(UserDaoImpl userDao) {
        this.userDao = userDao;
    }
}

```

:::

### 注解注入（接口注入）

::: tabs

@tab 接口注入（注解)

以@Autowired（自动注入）注解注入为例，修饰符有三个属性：Constructor，byType，byName。默认按照 byType 注入。

- **constructor**：通过构造方法进行自动注入，spring 会匹配与构造方法参数类型一致的 bean 进行注入，如果有一个多参数的构造方法，一个只有一个参数的构造方法，在容器中查找到多个匹配多参数构造方法的 bean，那么 spring 会优先将 bean 注入到多参数的构造方法中。
- **byName**：被注入 bean 的 id 名必须与 set 方法后半截匹配，并且 id 名称的第一个单词首字母必须小写，这一点与手动 set 注入有点不同。
- **byType**：查找所有的 set 方法，将符合参数类型的 bean 注入。

示例：

```java
@Service
public class UserServiceImpl {

    // 通过在属性中添加注解注入
    @Autowired
    private UserDaoImpl userDao;

}
```

:::

### :star: 为什么推荐构造器注入方式？

推荐使用构造器注入的方式，这种方式**能够保证注入的组件不可变，并且确保需要的依赖不为空**。此外，构造器注入的依赖总是能够在返回客户端（组件）代码的时候保证完全初始化的状态，即：

- **依赖不可变**：其实说的就是 final 关键字。
- **依赖不为空**（省去了我们对其检查）：当要实例化 UserServiceImpl 的时候，由于自己实现了有参数的构造函数，所以不会调用默认构造函数，那么就需要 Spring 容器传入所需要的参数，所以就两种情况：1、有该类型的参数->传入，OK。2：无该类型的参数->报错。
- **完全初始化的状态**：这个可以跟上面的依赖不为空结合起来，向构造器传参之前，要确保注入的内容不为空，那么肯定要调用依赖组件的构造方法完成实例化。而在 Java 类加载实例化的过程中，构造方法是最后一步（之前如果有父类先初始化父类，然后自己的成员变量，最后才是构造方法），所以返回来的都是初始化之后的状态。

所以通常是这样的：

```java
@Service
public class UserServiceImpl {

    // 属性设置为 final，可以提高性能
    private final UserDaoImpl userDao;

    // 使用构造器注入，且参数设置为 final
    public UserServiceImpl(final UserDaoImpl userDaoImpl) {
        this.userDao = userDaoImpl;
    }

}
```

如果使用 setter 注入，缺点显而易见，对于 IOC 容器以外的环境，除了使用反射来提供它需要的依赖之外，**无法复用该实现类**。而且将一直是个潜在的隐患，因为你不调用将一直无法发现 `NullPointerException` 的存在。

```java
// 这里只是模拟一下，正常来说我们只会暴露接口给客户端，不会暴露实现。
UserServiceImpl userService = new UserServiceImpl();
userService.findUserList(); // -> NullPointerException，潜在的隐患
```

**循环依赖的问题**：使用 field 注入可能会导致循环依赖，即 A 里面注入 B，B 里面又注入 A：

如果使用构造器注入，在 spring 项目启动的时候，就会抛出：BeanCurrentlyInCreationException：Requested bean is currently in creation: Is there an unresolvable circular reference？从而提醒你避免循环依赖，如果是 field 注入的话，启动的时候不会报错，在使用那个 bean 的时候才会报错。

### 容器依赖注入的过程

- 使用 `ApplicationContext`描述所有 bean 的配置元数据创建和初始化。配置元数据可以由 XML、Java 代码或注解指定。
- 对于每个 bean，它的依赖关系以属性、构造函数参数或静态工厂方法的参数的形式表示（如果您使用它而不是普通的构造函数）。这些依赖项在实际创建 bean 时提供给 bean。
- 每个属性或构造函数参数都是要设置的值的实际定义，或者是对容器中另一个 bean 的引用。
- 作为值的每个属性或构造函数参数都从其指定格式转换为该属性或构造函数参数的实际类型。默认情况下，Spring 可以将以字符串格式提供的值转换为所有内置类型，例如 `int`， `long`， `String`，`boolean`等。

## Bean 作用域

Spring 中的 Bean 有六种作用域：

| 作用域                                                                                                                     | Description                                                                                    |
| :------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| [singleton](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-singleton)     | （默认）将单个 bean 定义限定为每个 Spring IoC 容器的单个对象实例。                             |
| [prototype](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-prototype)     | 将单个 bean 定义限定为任意数量的对象实例。                                                     |
| [request](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-request)         | 将单个 bean 定义限定为单个 HTTP 请求的生命周期。也就是说，每个 HTTP 请求都有自己的 bean 实例。 |
| [session](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-session)         | 将单个 bean 定义限定为 `Session` 的生命周期内有效。                                          |
| [application](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-application) | 将单个 bean 定义限定为 `ServletContext` 的生命周期内有效。                                   |
| [websocket](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket-stomp-websocket-scope)     | 将单个 bean 定义限定为 `WebSocket` 的生命周期内有效。                                        |

### Singleton 作用域

单例 bean 在全局只有一个共享的实例，所有依赖单例 bean 的场景中，容器返回的都是同一个实例。

换句话说，当您定义一个 bean 并且它的作用域是一个单例时，Spring IoC 容器只会根据 bean 的定义来创建该 bean 的唯一实例。这些唯一的实例会缓存到容器中，后续针对单例 bean 的请求和引用，都会从这个缓存中拿到这个唯一实例。下图显示了单例作用域的工作原理：

![Singleton 作用域](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/spring/spring_core_ioc_singleton.png)

Spring 的单例 bean 概念不同于设计模式 (GoF) 之中所定义的单例模式。设计模式中的单例模式是将一个对象的作用域硬编码的，一个 ClassLoader 只能有唯一的一个实例。而 Spring 的单例作用域是以容器为前提的，每个容器每个 bean 只能有一个实例。这意味着，如果在单个 Spring 容器中为特定类定义一个 bean，则 Spring 容器会根据 bean 定义创建唯一的 bean 实例。单例作用域是 Spring 的默认作用域。下面的例子是在 XML 中配置单例模式 Bean 的例子：

```xml
<bean id="accountService" class="com.something.DefaultAccountService"/>

<!-- the following is equivalent, though redundant (singleton scope is the default) -->
<bean id="accountService" class="com.something.DefaultAccountService" scope="singleton"/>
```

### Prototype 作用域

非单例的、原型 bean 指的是每次请求 bean 实例时，返回的都是新的对象实例。也就是说，每次注入到另外的 bean 或者通过调用 getBean() 方法来获得的 bean 都是全新的实例。基于线程安全性的考虑，当 bean 对象有状态时使用原型作用域，而无状态时则使用单例作用域。

下图显示了原型作用域的工作原理：

![Prototype 作用域](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/spring/spring_ioc_prototype.png)

(数据访问对象 (DAO) 通常不配置为原型，因为典型的 DAO 不具有任何会话状态。我们可以更容易重用单例图的核心。 )

用下面的例子来说明 Spring 的原型作用域：

```xml
<bean id="accountService" class="com.something.DefaultAccountService" scope="prototype"/>
```

与其他作用域相比，Spring 不会完整地管理原型 bean 的生命周期。Spring 容器只会初始化、配置和装载这些 bean，然后传递给 Client。但是之后就不会再有该原型实例的进一步记录。也就是说，初始化生命周期回调方法在所有作用域的 bean 是都会调用的，但是销毁生命周期回调方法在原型 bean 是不会调用的。所以，客户端代码必须注意清理原型 bean 以及释放原型 bean 所持有的资源。可以通过使用自定义的 bean post-processor(Bean 的后置处理器) 来让 Spring 释放掉原型 bean 所持有的资源。

在某些方面，Spring 容器关于原型作用域的 bean 就是取代了 Java 的 new 操作符。所有的生命周期的控制都由客户端来处理 (有关 Spring 容器中 bean 的生命周期的详细信息，请参阅生命周期回调) 。

## 自定义 Bean 的特性

Spring Framework 提供了许多可用于自定义 bean 特性的接口。本节将它们分组如下：

- 生命周期回调
- Aware 接口

### 生命周期回调

在 Spring 中，有三种方法实现对 Bean 的生命周期的管理：

1. 实现 `InitializingBean` 接口和 `DisposableBean` 接口
2. 通过 JSR-250 规范的注解 `@PostConstruct` 和 `@PreDestroy` 指定 Bean 的生命周期方法
3. 使用 Spring Bean 配置 `init-method` 和 `destroy-method` 定义对象元数据

#### 实现 Spring 接口 (不推荐)

你可以实现 InitializingBean 和 DisposableBean 接口，让容器里管理 Bean 的生命周期。容器会在调用 afterPropertiesSet() 之后和 destroy() 之前会允许 bean 在初始化和销毁 bean 时执行某些操作。

- 指定 Bean 的初始化过程

```java
public class AnotherExampleBean implements InitializingBean {

    @Override
    public void afterPropertiesSet() {
        // do some initialization work
    }
}
```

- 指定销毁过程

```java
public class AnotherExampleBean implements DisposableBean {

    @Override
    public void destroy() {
        // do some destruction work (like releasing pooled connections)
    }
}

```

#### @PostConstruct 和 @PreDestroy 注解

CommonAnnotationBeanPostProcessor 不仅仅识别 @Resource 注解，还识别 JSR-250 生命周期注解 javax.annotation.PostConstruct 和 javax.annotation.PreDestroy，在 Spring 2.5 中引入了这些注解，它们提供了另一个代初始化回调 和销毁回调。如果 CommonAnnotationBeanPostProcessor 在 Spring ApplicationContext 中注册，它会在相应的 Spring bean 生命周期中调用相应的方法，就像是 Spring 生命周期接口方法，或者是明确声明的回调函数那样。在以下示例中，缓存在初始化时预先填充并在销毁时清除：

```java
public class CachingMovieLister {

    @PostConstruct
    public void populateMovieCache() {
        // populates the movie cache upon initialization...
    }

    @PreDestroy
    public void clearMovieCache() {
        // clears the movie cache upon destruction...
    }
}
```

#### `init-method` 和 `destroy-method`

`init-method` 用来指定初始化回调方法

```xml
<bean id="exampleInitBean" class="examples.ExampleBean" init-method="init"/>
```

`destroy-method` 用来指定销毁回调方法

```xml
<bean id="exampleInitBean" class="examples.ExampleBean" destroy-method="cleanup"/>
```

#### 组合生命周期策略

为同一个 bean 配置的多个生命周期机制具有不同的初始化方法，如下所示：

1. 包含 @PostConstruct 注解的方法
2. 在 InitializingBean 接口中的 afterPropertiesSet() 方法
3. 自定义的 init() 方法

Destroy 方法以相同的顺序调用：

1. 包含 @PreDestroy 注解的方法
2. 在 DisposableBean 接口中的 destroy() 方法
3. 自定义的 destroy() 方法

### Aware 接口

Spring 提供了一系列 `Aware` 回调接口，让 bean 告诉容器，它们需要一些具体的基础配置信息。例如，实现 `ApplicationContextAware` 接口的 Bean，可以通过重写 `setApplicationContext()` 方法，获取当前的 `ApplicationContext`实例。一些重要的 `Aware` 接口如下表：

| Name                               | Injected Dependency                                                                                         | Explained in…                                                                                                                               |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `ApplicationContextAware`        | 声明 `ApplicationContext`.                                                                                | [`ApplicationContextAware` 和 `BeanNameAware`](http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/core.html#beans-factory-aware) |
| `ApplicationEventPublisherAware` | `ApplicationContext` 的事件发布者。                                                                       | [`ApplicationContext` 的附加功能](http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/core.html#context-introduction)               |
| `BeanClassLoaderAware`           | 用于加载 bean 类的类加载器                                                                                    | [实例化 Bean](http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/core.html#beans-factory-class)                                      |
| `BeanFactoryAware`               | 声明 `BeanFactory`.                                                                                       | [`ApplicationContextAware` 和 `BeanNameAware`](http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/core.html#beans-factory-aware) |
| `BeanNameAware`                  | 声明 bean 的名称。                                                                                            | [`ApplicationContextAware` 和 `BeanNameAware`](http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/core.html#beans-factory-aware) |
| `LoadTimeWeaverAware`            | 定义的 weaver 用于在加载时处理类定义。                                                                      | [在 Spring 框架中使用 AspectJ 的加载时织入](http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/core.html#aop-aj-ltw)                     |
| `MessageSourceAware`             | 用于解析消息的已配置策略 (支持参数化和国际化)                                                                | [`ApplicationContext` 的附加功能](http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/core.html#context-introduction)               |
| `NotificationPublisherAware`     | Spring JMX 通知发布者                                                                                       | [Notifications](http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/integration.html#jmx-notifications)                               |
| `ResourceLoaderAware`            | 配置的资源加载器                                                                                            | [资源 (Resources)](http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/core.html#resources)                                            |
| `ServletConfigAware`             | 当前 `ServletConfig` 容器运行。仅在 Web 下的 Spring `ApplicationContext` 中有效 `ApplicationContext`. | [Spring MVC](http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/web.html#mvc)                                                        |
| `ServletContextAware`            | 容器运行的当前 `ServletContext`. 仅在 Web 下的 Spring `ApplicationContext` 中有效。                     | [Spring MVC](http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/web.html#mvc)                                                        |

## 容器的扩展

### BeanPostProcessor 自定义 Bean

`BeanPostProcessor` 接口定义了可以实现的回调方法，以提供您自己的 (或覆盖容器的默认) 实例化逻辑，依赖解析逻辑等。
如果要在 Spring 容器完成实例化，配置和初始化 bean 之后实现某些自定义逻辑，则可以插入一个或多个自定义 BeanPostProcessor 实现。

`BeanPostProcessor` 接口定义：

```java
public interface BeanPostProcessor {

   // 在实例被初始化之前，
   @Nullable
   default Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
      return bean;
   }

   @Nullable
   default Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
      return bean;
   }

}
```

### BeanFactoryPostProcessor 自定义元数据配置

`org.springframework.beans.factory.config.BeanFactoryPostProcessor` 这个接口的语义与 `BeanPostProcessor` 类似，但有一处不同，BeanFactoryPostProcessor 操作 bean 的元数据配置（例如：BeanDefinition）。

也就是说，Spring IoC 容器允许 `BeanFactoryPostProcessor` 读取配置元数据，并可能在容器实例化除 `BeanFactoryPostProcessor` 实例之外的任何 bean 之前更改它。

`BeanFactoryPostProcessor` 接口定义：

```java
@FunctionalInterface
public interface BeanFactoryPostProcessor {

	/**
	 * Modify the application context's internal bean factory after its standard
	 * initialization. All bean definitions will have been loaded, but no beans
	 * will have been instantiated yet. This allows for overriding or adding
	 * properties even to eager-initializing beans.
	 * @param beanFactory the bean factory used by the application context
	 * @throws org.springframework.beans.BeansException in case of errors
	 */
	void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException;

}
```

::: tip
如果想修改实际的 bean 实例 (也就是说，从元数据配置中创建的对象) 那么需要使用 BeanPostProcessor(前面在使用 BeanPostProcessor 自定义 Bean 中进行了描述使用 BeanPostProcessor 自定义 Bean) 来替代。

在 BeanFactoryPostProcessor (例如使用 BeanFactory.getBean()) 中使用这些 bean 的实例虽然在技术上是可行的，但这么来做会将 bean 过早实例化，这违反了标准的容器生命周期。同时也会引发一些副作用，例如绕过 bean 的后置处理。

BeanFactoryPostProcessor 会在整个容器内起作用，所有它仅仅与正在使用的容器相关。如果在一个容器中定义了 BeanFactoryPostProcessor，那么它只会处理那个容器中的 bean。
:::

### 使用 FactoryBean 自定义初始化逻辑

`FactoryBean` 是 Spring 提供的一个工厂对象接口，你可以用自己的工厂对象实现该接口，FactoryBean 接口提供下面三个方法：

- Object getObject(): 返回这个工厂创建的对象实例。这个实例可能是共享的，这取决于这个工厂返回的是单例还是原型实例。
- boolean isSingleton(): 如果 FactoryBean 返回单例，那么这个方法就返回 true，否则返回 false。
- Class getObjectType(): 返回由 getObject() 方法返回的对象类型，如果事先不知道的类型则会返回 null。

该工厂对象也需要注入容器中，当使用 `ApplicationContext` 的 `getBean()` 方法获取 Bean 实例时，通过 `getBean("myBean")` 获得的是 myBean 对象，也是 `FactoryBean` 的 `getObject()` 返回的对象；
如果是获取自定义的 FactoryBean 对象，需要增加一个 `&`，即通过 `getBean("&myBean")` 获取。

