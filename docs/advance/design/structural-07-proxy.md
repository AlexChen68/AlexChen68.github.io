---
title: 结构型 - 代理模式
date: 2023-02-19
description: 代理模式
---

设计模式之代理模式
<!-- more -->

## 代理模式（Proxy Pattern）

> 代理模式 (`Proxy Pattern`)：给某一个对象提供一个代理或占位符，并由代理对象来控制对原对象的访问。

代理模式是一种对象结构型模式。在代理模式中引入了一个新的代理对象，代理对象在客户端对象和目标对象之间起到中介的作用，它去掉客户不能看到的内容和服务或者增添客户需要的额外的新服务。

## 类图

![代理模式类图](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/advance/proxy_pattern.png)

代理模式包含如下三个角色：

Subject（抽象主题角色）：它声明了真实主题和代理主题的共同接口，这样一来在任何使用真实主题的地方都可以使用代理主题，客户端通常需要针对抽象主题角色进行编程。

Proxy（代理主题角色）：它包含了对真实主题的引用，从而可以在任何时候操作真实主题对象；在代理主题角色中提供一个与真实主题角色相同的接口，以便在任何时候都可以替代真实主题；代理主题角色还可以控制对真实主题的使用，负责在需要的时候创建和删除真实主题对象，并对真实主题对象的使用加以约束。通常，在代理主题角色中，客户端在调用所引用的真实主题操作之前或之后还需要执行其他操作，而不仅仅是单纯调用真实主题对象中的操作。

RealSubject（真实主题角色）：它定义了代理角色所代表的真实对象，在真实主题角色中实现了真实的业务操作，客户端可以通过代理主题角色间接调用真实主题角色中定义的操作。

## 伪代码

代理模式的类图比较简单，但是在真实的使用和实现过程中要复杂很多，特别是代理类的设计和实现。

抽象主题类声明了真实主题类和代理类的公共方法，它可以是接口、抽象类或具体类，客户端针对抽象主题类编程，一致性地对待真实主题和代理主题，典型的抽象主题类代码如下：

```java
public interface Subject {

    void operation();
}
```

真实主题类实现了抽象主题类，提供了业务方法的具体实现，其典型代码如下：

```java
public class RealSubject implements Subject{

    public void operation() {
        System.out.println("RealSubject.operation()");
    }
}
```

代理类也是抽象主题类的子类，它维持一个对真实主题对象的引用，调用在真实主题中实现的业务方法，在调用时可以在原有业务方法的基础上附加一些新的方法来对功能进行扩充或约束，最简单的代理类实现代码如下：

```java
public class StaticProxy implements Subject {

    private Subject subject;

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public void operation() {
        System.out.println("静态代理");
        subject.operation();
    }
}
```

客户端调用，这里演示的是静态代理

```java
public class Client {

    public static void main(String[] args) {
        // 具体代理类
        RealSubject realSubject = new RealSubject();

        // 静态代理
        StaticProxy staticProxy = new StaticProxy();
        staticProxy.setSubject(realSubject);
        staticProxy.operation();
    }
}

//执行结果：

静态代理
RealSubject.operation()
```

像上面代理类所实现的接口和所代理的方法都在代码中写死，被称之为静态代理。如果要为不同类的不同方法生成静态代理，代理类的数量将会发生爆炸。Java 中也提供了对动态代理的支持。所谓动态代理 (`Dynamic Proxy`)，是指系统运行时动态生成代理类。

我们来看看一个在 java 中使用动态代理的方式：

```java
public class Client {

    public static void main(String[] args) {
        // 具体代理类
        RealSubject realSubject = new RealSubject();
        // 动态代理
        Subject dynamicProxy = (Subject)Proxy.newProxyInstance(realSubject.getClass().getClassLoader(),
                realSubject.getClass().getInterfaces(),
                // InvocationHandler 的实现类
                (p, method, params) -> {
                    System.out.println("动态代理");
                    return method.invoke(realSubject, params);
                });
        dynamicProxy.operation();
    }
}

//执行结果：

动态代理
RealSubject.operation()
```

JDK 中提供的动态代理只能代理一个或者多个**接口**，如果需要动态代理具体类或者抽象类，可以使用 `CGLib(Code Generation Library)` 等工具。`CGLib` 是一个功能较为强大、性能也较好的代码生成包，在许多 `AOP` 框架中得到广泛应用。

## 应用实例

代理模式的应用十分广泛，在 Spring 框架中，就是利用动态代理实现了 `AOP` 框架。

## 总结

代理模式是常用的结构型设计模式之一，它为对象的间接访问提供了一个解决方案，可以对对象的访问进行控制。代理模式类型较多，其中远程代理、虚拟代理、保护代理等在软件开发中应用非常广泛。

### 主要优点

- 能够协调调用者和被调用者，在一定程度上降低了系统的耦合度。
- 客户端可以针对抽象主题角色进行编程，增加和更换代理类无须修改源代码，符合开闭原则，系统具有较好的灵活性和可扩展性。

此外，不同类型的代理模式也具有独特的优点，例如：
- 远程代理为位于两个不同地址空间对象的访问提供了一种实现机制，可以将一些消耗资源较多的对象和操作移至性能更好的计算机上，提高系统的整体运行效率。
- 虚拟代理通过一个消耗资源较少的对象来代表一个消耗资源较多的对象，可以在一定程度上节省系统的运行开销。
- 缓冲代理为某一个操作的结果提供临时的缓存存储空间，以便在后续使用中能够共享这些结果，优化系统性能，缩短执行时间。
- 保护代理可以控制对一个对象的访问权限，为不同用户提供不同级别的使用权限。

### 主要缺点

- 由于在客户端和真实主题之间增加了代理对象，因此有些类型的代理模式可能会造成请求的处理速度变慢，例如保护代理。
- 实现代理模式需要额外的工作，而且有些代理模式的实现过程较为复杂，例如远程代理。

### 适用场景

代理模式的类型较多，不同类型的代理模式有不同的优缺点，它们应用于不同的场合：

- 当客户端对象需要访问远程主机中的对象时可以使用远程代理。
- 当需要用一个消耗资源较少的对象来代表一个消耗资源较多的对象，从而降低系统开销、缩短运行时间时可以使用虚拟代理，例如一个对象需要很长时间才能完成加载时。
- 当需要为某一个被频繁访问的操作结果提供一个临时存储空间，以供多个客户端共享访问这些结果时可以使用缓冲代理。通过使用缓冲代理，系统无须在客户端每一次访问时都重新执行操作，只需直接从临时缓冲区获取操作结果即可。
- 当需要控制对一个对象的访问，为不同用户提供不同级别的访问权限时可以使用保护代理。
- 当需要为一个对象的访问（引用）提供一些额外的操作时可以使用智能引用代理。

## 参考资料

- [字节飞扬](https://bytesfly.github.io/blog/#/DesignPattern/proxy-pattern)
- [Java 全栈知识体系](https://pdai.tech/md/dev-spec/pattern/14_proxy.html)