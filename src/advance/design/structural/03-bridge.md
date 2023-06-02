---
title: 桥接模式
category: 设计模式
date: 2023-02-19
description: 桥接模式
---

设计模式之桥接模式
<!-- more -->

## 桥接模式 (Bridge Pattern)

桥接模式用一种巧妙的方式处理**多层继承**存在的问题，用抽象关联取代了传统的多层继承，将类之间的静态继承关系转换为动态的对象组合关系，使得系统更加灵活，并易于扩展，同时有效控制了系统中类的个数。

> 桥接模式 (Bridge Pattern)：将抽象部分与它的实现部分分离，使它们都可以独立地变化。它是一种对象结构型模式。

## 类图

![桥接模式类图](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/advance/bridge_pattern.png)

- Abstraction: 定义抽象类的接口
- Implementor: 定义实现类接口

两者的组合或者说调用，都是通过接口，因此 `Abstraction` 的子类和 `Implementor` 的子类可以自由搭配。

## 代码示例

我们以 jdbc 连接为例，通过 `Driver` 和 `Connection` 两个接口，来体会桥接的妙处。

先定义两个接口，他们的关系是，通过 `Driver` 可以获取 `Connection`
```java
public interface Driver {

    Connection connection(String url);

    boolean acceptsURL(String url) throws SQLException;
}

public interface Connection {

    void prepareStatement();
}
```

接着定义它们的实现类，先看 `Driver` 的实现类

```java
public abstract class AbstractDriver implements Driver {

    @Override
    public Connection connection(String url) {
        if (StrUtil.containsAnyIgnoreCase(url, ConnectionType.LOADBALANCE_CONNECTION.getPrefix())) {
            return new LoadBalancedConnection();
        } else if (StrUtil.containsAnyIgnoreCase(url, ConnectionType.JDBC_CONNECTION.getPrefix())) {
            return new JdbcConnection();
        }
        return null;
    }
}

public class JdbcDriver extends AbstractDriver {

    @Override
    public boolean acceptsURL(String url) throws SQLException {
        System.out.println("JdbcDriver");
        return StrUtil.containsAnyIgnoreCase(url, ConnectionType.JDBC_CONNECTION.getPrefix());
    }
}

public class DruidDriver extends AbstractDriver {

    @Override
    public boolean acceptsURL(String url) throws SQLException {
        System.out.println("DruidDriver");
        return StrUtil.containsAnyIgnoreCase(url, ConnectionType.LOADBALANCE_CONNECTION.getPrefix());
    }
}

// 为了通过 jdbc 连接的前缀，区分不同的驱动和连接，使用了一个前缀枚举类
@Getter
@AllArgsConstructor
public enum ConnectionType {

    JDBC_CONNECTION("jdbc:mysql:"),
    LOADBALANCE_CONNECTION("jdbc:mysql:loadbalance:");
    String prefix;

}
```

再看 `Connection` 的实现类

```java
public class JdbcConnection implements Connection {

    @Override
    public void prepareStatement() {
        System.out.println("JdbcConnection");
    }
}

public class LoadBalancedConnection implements Connection{


    @Override
    public void prepareStatement() {
        System.out.println("LoadBalancedConnection");
    }
}
```

最后，创建一个工厂类 `DriverManager`，来简化一些创建操作

```java
public abstract class DriverManager {

    private static CopyOnWriteArrayList<Driver> registeredDrivers = new CopyOnWriteArrayList<>();
    public static void registerDriver(Driver driver) {
        registeredDrivers.addIfAbsent(driver);
    }

    @SneakyThrows
    public static Driver getDriver(String url) {
        for (Driver driver : registeredDrivers) {
            if (driver.acceptsURL(url)) {
                return driver;
            }
        }
        throw new SQLException("No suitable driver");
    }
    public static Connection getConnection(String url) {
       return getDriver(url).connection(url);
    }
}
```

客户端调用

```java
public class Client {

    public static void main(String[] args) {
        DriverManager.registerDriver(new JdbcDriver());
//        DriverManager.registerDriver(new DruidDriver());
        Connection connection = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/demo");
//        Connection connection = DriverManager.getConnection("jdbc:mysql:loadbalance://127.0.0.1:3306/demo");
        connection.prepareStatement();
    }
}
```
调用结果
```java
JdbcDriver
JdbcConnection
```

从 `DriverManager` 的调用可以看出，`Driver` 和 `Connection` 可以根据需要变换实现类，尽管 `Connection` 是由 `Driver` 创建的，具体能不能创建该 `Connection` 由 `Driver` 提供方法去判断，上述例子中的 `acceptsURL()` 方法即为判断方法。

## 应用实例

jdbc 连接中的桥接模式

![jdbc 连接中的桥接模式](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/advance/bridge_pattern_jdbc.png)

## 总结

桥接模式是设计 Java 虚拟机和实现 JDBC 等驱动程序的核心模式之一，应用较为广泛。

在软件开发中如果一个类或一个系统有多个变化维度时，都可以尝试使用桥接模式对其进行设计。

桥接模式为多维度变化的系统提供了一套完整的解决方案，并且降低了系统的复杂度。

### 优点

- 分离抽象接口及其实现部分。
- 桥接模式可以取代多层继承方案，多层继承方案违背了“单一职责原则”，复用性较差，且类的个数非常多，桥接模式是比多层继承方案更好的解决方法，它极大减少了子类的个数。
- 桥接模式提高了系统的可扩展性，在两个变化维度中任意扩展一个维度，都不需要修改原有系统，符合“开闭原则”。

### 适用场景
- 一个类存在两个（或多个）独立变化的维度，且这两个（或多个）维度都需要独立进行扩展。
- 对于那些不希望使用继承或因为多层继承导致系统类的个数急剧增加的系统，桥接模式尤为适用。

---

## 参考资料

- [Java 全栈知识体系](https://pdai.tech/md/dev-spec/pattern/10_bridge.html)
- [JDBC 之桥接模式](https://www.jianshu.com/p/34ea945175f8)
- [字节飞扬](https://bytesfly.github.io/blog/#/DesignPattern/bridge-pattern)