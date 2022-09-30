---
title: Spring 核心容器
order: 2
icon: blog
article: true
date: 2022-09-30
tag:
  - IoC
  - DI
category: Spring
isOriginal: true
description: Spring 核心容器
---


## Spring 容器概述

Spring 控制反转(IOC)容器也称为依赖注入 (DI)。

这是一个过程：对象仅通过构造函数参数、工厂方法的参数或在对象实例被构造或从工厂方法返回后设置的属性来定义它们的依赖关系，然后容器在创建 bean 时注入这些依赖项。这个过程基本上是 bean 本身通过使用类的直接构造或诸如服务定位器模式之类的机制来控制其依赖关系的实例化或位置的逆过程（因此称为控制反转）。

**控制反转**是一种思想，而**依赖注入**是一种**设计模式**，依赖注入是实现控制反转的一种方式，但是控制反转还有其他实现方式，比如 ServiceLocator。

`org.springframework.context.ApplicationContext`接口代表 Spring IoC 容器，负责实例化、配置和组装 bean。容器通过读取配置元数据来获取关于要实例化、配置和组装哪些对象的指令。配置元数据通过 XML、Java 注释或 Java 代码维护，配置了组成应用程序的对象以及这些对象之间丰富的相互依赖关系。

## Bean 概述

Spring IoC 容器管理一个或多个 bean。这些 bean 是使用提供给容器的配置元数据创建的（例如，以 XML `<bean/>`定义的形式）。

在容器本身中，这些 bean 定义表示为`BeanDefinition` 对象，其中包含（以及其他信息）以下元数据：

- 一个包限定的类名：通常是被定义的 bean 的实际实现类。
- Bean 行为配置元素，它说明 bean 在容器中的行为方式（范围、生命周期回调等）。
- 对 bean 完成工作所需的其他 bean 的引用。这些引用也称为协作者或依赖项。
- 要在新创建的对象中设置的其他配置设置——例如，池的大小限制或在管理连接池的 bean 中使用的连接数。

## 配置元数据

配置元数据告诉 Spring 容器如何实例化、配置和组装应用程序中的对象。配置元数据有三种主要的配置形式：

- **传统的 Xml 文件配置**：这种方式配置繁琐，不易维护，扩展性差，现在主要用来配置第三方类库或者一些配置工具类，因为第三方类不支持Spring注解。
- **基于 Java 的配置类**：这种方式适用性强，扩展性高，十分灵活，但是不适合大量配置，可读性较差，适用少量配置的情况。
- **基于 Java 注解的配置**：这种方式配置方便，容易维护，但是对于不能使用注解的第三方类库，只能使用上面两种方式。

<!-- tabs:start -->

### **Xml 配置**

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

### **Java 配置类**

1. 创建一个配置类， 添加`@Configuration`注解声明为配置类
2. 创建方法，方法上加上`@Bean`，该方法用于创建实例并返回，该实例创建后会交给spring管理，方法名建议与实例名相同（首字母小写）。注：实例类不需要加任何注解

```java
@Configuration
public class BeansConfig {

    /**
     * 注册名称为 userDao 的 Bean ”UserDaoImpl“
     */
    @Bean("userDao")
    public UserDaoImpl userDao() {
        return new UserDaoImpl();
    }

    /**
     * 注册名称为 userService 的 Bean ”UserServiceImpl“
     */
    @Bean("userService")
    public UserServiceImpl userService() {
        UserServiceImpl userService = new UserServiceImpl();
        userService.setUserDao(userDao());
        return userService;
    }
}
```

### **Java 注解配置**

通过在类上加注解的方式，来声明一个类交给Spring管理，Spring会自动扫描带有@Component，@Controller，@Service，@Repository这四个注解的类，然后帮我们创建并管理，前提是需要先配置Spring的注解扫描器。

- **优点**：开发便捷，通俗易懂，方便维护。
- **缺点**：具有局限性，对于一些第三方资源，无法添加注解。只能采用XML或JavaConfig的方式配置

**举例**：

1. 对类添加 `@Component` 相关的注解，比如 `@Controller`，@Service，`@Repository`
2. 设置 `ComponentScan` 的 basePackage:
   1. `<context:component-scan base-package='tech.pdai.springframework'>`；
   2. 或者`@ComponentScan("tech.pdai.springframework")`注解；
   3. 或者 `new AnnotationConfigApplicationContext("tech.pdai.springframework")`指定扫描的 basePackage。

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

<!-- tabs:end -->

## 使用容器

`ApplicationContext` 是一个容器高级工厂的接口，能够维护不同 bean 及其依赖项的注册表，可以通过实例化不同实现类去使用不同的配置方式。

通过使用 `getBean(String name, Class<T> requiredType)`，可以从容器获取 bean 的实例。

<!-- tabs:start -->

### **读取 XML 文件获取 Context**

`ClassPathXmlApplicationContext` 是 `ApplicationContext` 的实现类，通过它可以从 XML 文件读取 Bean 配置。

```java
// 从 spring.xml 中加载配置，实例化 Context
ApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");

// 从容器中获取 SysUserService 的实例
SysUserService userService = context.getBean("userService", SysUserService.class);
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

### **读取 Java 配置获取 Context**

`AnnotationConfigApplicationContext` 是 `ApplicationContext` 的实现类，在构造时可以指定配置类的 Class 对象来确定加载的配置，例如：

```java
// 从 BeansConfig 中加载配置，实例化 Context
AnnotationConfigApplicationContext context = 
                new AnnotationConfigApplicationContext(BeansConfig.class);

// 从容器中获取 SysUserService 的实例
SysUserService userService = context.getBean("userService", SysUserService.class);
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

### **扫描注解获取 Context**

`AnnotationConfigApplicationContext` 还可以指定要扫描的包路径，扫描该包下全部类上的注解，从而读取配置。例如：

```java
// 扫描 tech.alexchen.spring 包的类上的注解，加载配置，实例化 Context
AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext("tech.alexchen.spring");

// 从容器中获取 SysUserService 的实例
SysUserService userService = context.getBean("userService", SysUserService.class);
```

<!-- tabs:end -->

## 依赖注入

依赖注入有三种常见的注入方式：

1. 基于构造函数的依赖注入

2. 基于 Setter 的依赖注入

3. 注解注入（接口注入）

<!-- tabs:start -->

### **构造方法注入(XML)**

**在XML配置方式中**，`<constructor-arg>`是通过构造函数参数注入，比如下面的 xml:

```xml
<bean id="userService" class="tech.pdai.springframework.service.UserServiceImpl">
    <constructor-arg name="userDao" ref="userDao"/>
</bean>
```

本质上是new UserServiceImpl(userDao)创建对象, 所以对应的service类是这样的：

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

### **构造方法注入（注解）**

**在注解和Java配置方式下**（推荐方式）

```java
// 添加 Service 注解，表明该类交由 Spring 容器管理
@Service
public class UserServiceImpl {

    private final UserDaoImpl userDao;

	// 表示通过构造方法注入
    @Autowired // 这里@Autowired也可以省略
    public UserServiceImpl(final UserDaoImpl userDaoImpl) {
        this.userDao = userDaoImpl;
    }

    public List<User> findUserList() {
        return this.userDao.findUserList();
    }

}

```

### **Setter 方法注入(XML)**

**在XML配置方式中**，property 都是 setter 方式注入，比如下面的 xml:

```xml
<bean id="userService" class="tech.pdai.springframework.service.UserServiceImpl">
    <property name="userDao" ref="userDao"/>
</bean>
```

>  本质上包含两步：
>  1. 第一步，需要new UserServiceImpl()创建对象, 所以需要默认构造函数
>  2. 第二步，调用setUserDao()函数注入userDao的值, 所以需要setUserDao()函数

所以对应的service类是这样的：

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

### **Setter 方法注入（注解）**

在注解和Java配置方式下**

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

### **接口注入（注解）**

以@Autowired（自动注入）注解注入为例，修饰符有三个属性：Constructor，byType，byName。默认按照byType注入。

- **constructor**：通过构造方法进行自动注入，spring会匹配与构造方法参数类型一致的bean进行注入，如果有一个多参数的构造方法，一个只有一个参数的构造方法，在容器中查找到多个匹配多参数构造方法的bean，那么spring会优先将bean注入到多参数的构造方法中。
- **byName**：被注入bean的id名必须与set方法后半截匹配，并且id名称的第一个单词首字母必须小写，这一点与手动set注入有点不同。
- **byType**：查找所有的set方法，将符合符合参数类型的bean注入。

示例：

```java
@Service
public class UserServiceImpl {

    // 通过在属性中添加注解注入
    @Autowired
    private UserDaoImpl userDao;

}
```

<!-- tabs:end -->

### 为什么推荐构造器注入方式？

推荐使用构造器注入的方式，这种方式**能够保证注入的组件不可变，并且确保需要的依赖不为空**。此外，构造器注入的依赖总是能够在返回客户端（组件）代码的时候保证完全初始化的状态，即：

- **依赖不可变**：其实说的就是final关键字。
- **依赖不为空**（省去了我们对其检查）：当要实例化 UserServiceImpl 的时候，由于自己实现了有参数的构造函数，所以不会调用默认构造函数，那么就需要 Spring 容器传入所需要的参数，所以就两种情况：1、有该类型的参数->传入，OK 。2：无该类型的参数->报错。
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
userService.findUserList(); // -> NullPointerException, 潜在的隐患
```

**循环依赖的问题**：使用 field 注入可能会导致循环依赖，即 A 里面注入B，B 里面又注入 A：

如果使用构造器注入，在 spring 项目启动的时候，就会抛出：BeanCurrentlyInCreationException：Requested bean is currently in creation: Is there an unresolvable circular reference？从而提醒你避免循环依赖，如果是 field 注入的话，启动的时候不会报错，在使用那个 bean 的时候才会报错。



### 容器依赖注入的过程

- 使用`ApplicationContext`描述所有 bean 的配置元数据创建和初始化。配置元数据可以由 XML、Java 代码或注释指定。
- 对于每个 bean，它的依赖关系以属性、构造函数参数或静态工厂方法的参数的形式表示（如果您使用它而不是普通的构造函数）。这些依赖项在实际创建 bean 时提供给 bean。
- 每个属性或构造函数参数都是要设置的值的实际定义，或者是对容器中另一个 bean 的引用。
- 作为值的每个属性或构造函数参数都从其指定格式转换为该属性或构造函数参数的实际类型。默认情况下，Spring 可以将以字符串格式提供的值转换为所有内置类型，例如`int`, `long`, `String`,`boolean`等。

### Bean 作用域

Spring 中的 Bean 有六种作用域：

| 作用域                                                       | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [singleton](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-singleton) | （默认）将单个 bean 定义限定为每个 Spring IoC 容器的单个对象实例。 |
| [prototype](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-prototype) | 将单个 bean 定义限定为任意数量的对象实例。                   |
| [request](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-request) | 将单个 bean 定义限定为单个 HTTP 请求的生命周期。也就是说，每个 HTTP 请求都有自己的 bean 实例。 |
| [session](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-session) | 将单个 bean 定义限定为 `Session` 的生命周期内有效。          |
| [application](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-application) | 将单个 bean 定义限定为 `ServletContext` 的生命周期内有效。   |
| [websocket](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket-stomp-websocket-scope) | 将单个 bean 定义限定为 `WebSocket` 的生命周期内有效。        |
