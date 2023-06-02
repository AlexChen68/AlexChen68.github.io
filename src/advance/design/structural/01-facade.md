---
title: 外观模式
date: 2022-09-27
category: 设计模式
description: 外观模式
---

设计模式之外观模式
<!-- more -->

## 外观模式 (Facade) 

外观模式中，一个子系统的外部与其内部的通信通过一个统一的外观类进行，外观类将客户类与子系统的内部复杂性分隔开，使得客户类只需要与外观角色打交道，而不需要与子系统内部的很多对象打交道。

> 外观模式 (`Facade Pattern`)：为子系统中的一组接口提供一个统一的入口。外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用

外观模式又称为门面模式，它是一种对象结构型模式。外观模式是`迪米特法则`的一种具体实现，通过引入一个新的外观角色可以降低原有系统的复杂度，同时降低客户类与子系统的耦合度。

## 类图

![外观模式类图](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/advance/facade_pattern.png)

外观模式包含如下两个角色：

- **Facade（外观角色）**：在客户端可以调用它的方法，在外观角色中可以知道相关的（一个或者多个）子系统的功能和责任；在正常情况下，它将所有从客户端发来的请求委派到相应的子系统去，传递给相应的子系统对象处理。
- **SubSystem（子系统角色）**：在软件系统中可以有一个或者多个子系统角色，每一个子系统可以不是一个单独的类，而是一个类的集合，它实现子系统的功能；每一个子系统都可以被客户端直接调用，或者被外观角色调用，它处理由外观类传过来的请求；子系统并不知道外观的存在，对于子系统而言，外观角色仅仅是另外一个客户端而已。

## 模式改进

在标准的外观模式中，如果需要增加、删除或更换与外观类交互的子系统类，必须修改外观类或客户端的源代码，这将违背开闭原则，因此可以通过引入**抽象外观类**来对系统进行改进，在一定程度上可以解决该问题。在引入抽象外观类之后，客户端可以针对抽象外观类进行编程，对于新的业务需求，不需要修改原有外观类，而对应增加一个新的具体外观类，由新的具体外观类来关联新的子系统对象。

## 伪代码

外观模式中所指的子系统是一个广义的概念，它可以是一个类、一个功能模块、系统的一个组成部分或者一个完整的系统。子系统类通常是一些业务类，实现了一些具体的、独立的业务功能，其典型代码如下：

以日志门面为例，先定义日志和日志工厂接口

```java
public interface Logger {

    String getName();
    void trace(String logInfo);
    void debug(String logInfo);
    void info(String logInfo);
    void warn(String logInfo);
    void error(String logInfo);
}

public interface ILoggerFactory {

    Logger getLogger(String name);

}
```

提供一个自定义的日志实现

```java
public class CustomLogger implements Logger {

    String name;

    public CustomLogger(Class clazz) {
        this.name = clazz.getName();
    }

    public CustomLogger(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void trace(String logInfo) {
        System.out.println("trace: " + logInfo);
    }

    @Override
    public void debug(String logInfo) {
        System.out.println("debug: " + logInfo);
    }

    @Override
    public void info(String logInfo) {
        System.out.println("info: " + logInfo);
    }

    @Override
    public void warn(String logInfo) {
        System.out.println("warn: " + logInfo);
    }

    @Override
    public void error(String logInfo) {
        System.out.println("error: " + logInfo);
    }
}

public class CustomLoggerFactory implements ILoggerFactory {

    private Map<String, Logger> loggerCache;

    public CustomLoggerFactory() {
        this.loggerCache = new HashMap<>();
    }

    @Override
    public Logger getLogger(String name) {
        if (name == null) {
            throw new IllegalArgumentException("name argument cannot be null");
        }
        Logger logger = loggerCache.get(name);
        if (logger != null) {
            return logger;
        }
        CustomLogger customLogger = new CustomLogger(name);
        loggerCache.put(name, customLogger);
        return customLogger;
    }
}
```

提供一个日志门面，用于获取日志记录器实例，这里演示固定了实现，实际上 slf4j 框架会通过类加载器去寻找实现类，具体使用哪个日志实现框架由所引入的依赖决定

```java
public final class LoggerFactory {

    public static  Logger getLogger(Class clazz) {
        return getLogger(clazz.getName());
    }

    public static Logger getLogger(String name) {
        ILoggerFactory iLoggerFactory = getILoggerFactory();
        return iLoggerFactory.getLogger(name);
    }

    public static ILoggerFactory getILoggerFactory() {
        // slf4j 是通过类加载器去寻找 ILoggerFactory 的实现类的
        // 这里演示只返回固定的实现类了
        return new CustomLoggerFactory();
    }
}
```

实际调用时，只需要使用 `LoggerFactory` 即可获取 `Logger` 实例

```java
public static void main(String[] args) {
   Logger logger = LoggerFactory.getLogger(Client.class);
   logger.info("log test");
}
```

## 应用实例

最典型的例子，slf4j(`Simple logging facade for Java`) 日志门面，提供了日志的操作方法，具体的日志框架依据引入的依赖决定。

## 总结

外观模式并不给系统增加任何新功能，它仅仅是简化调用接口。在几乎所有的软件中都能够找到外观模式的应用。所有涉及到与多个业务对象交互的场景都可以考虑使用外观模式进行重构。

### 优点

外观模式的主要优点如下：

- 它对客户端屏蔽了子系统组件，减少了客户端所需处理的对象数目，并使得子系统使用起来更加容易。通过引入外观模式，客户端代码将变得很简单，与之关联的对象也很少。
- 它实现了子系统与客户端之间的松耦合关系，这使得子系统的变化不会影响到调用它的客户端，只需要调整外观类即可。
- 一个子系统的修改对其他子系统没有任何影响，而且子系统内部变化也不会影响到外观对象。

### 缺点

外观模式的主要缺点如下：

- 不能很好地限制客户端直接使用子系统类，如果对客户端访问子系统类做太多的限制则减少了可变性和灵活性。
- 如果设计不当，增加新的子系统可能需要修改外观类的源代码，违背了开闭原则。

### 适用场景

- 当要为访问一系列复杂的子系统提供一个简单入口时可以使用外观模式。
- 客户端程序与多个子系统之间存在很大的依赖性。引入外观类可以将子系统与客户端解耦，从而提高子系统的独立性和可移植性。
- 在层次化结构中，可以使用外观模式定义系统中每一层的入口，层与层之间不直接产生联系，而通过外观类建立联系，降低层之间的耦合度。

##  参考资料

- [深入浅出外观模式](https://blog.csdn.net/lovelion/article/details/8259789)
- [Java 全栈知识体系](https://pdai.tech/md/dev-spec/pattern/8_facade.html)
- [外观模式 (Facade Pattern)——提供统一的入口](https://bytesfly.github.io/blog/#/DesignPattern/facade-pattern)
- [设计模式也可以这么简单](https://javadoop.com/post/design-pattern#toc_13)