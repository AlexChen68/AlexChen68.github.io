---
title: 命令模式
date: 2023-02-19
description: 命令模式
---

设计模式之命令模式
<!-- more -->

## 设计模式（Command Pattern）

命令模式可以将请求发送者和接收者完全解耦，发送者与接收者之间没有直接引用关系，发送请求的对象只需要知道如何发送请求，而不必知道如何完成请求。

> 命令模式 (Command Pattern)：将一个请求封装为一个对象，从而让我们可用不同的请求对客户进行参数化；对请求排队或者记录请求日志，以及支持可撤销的操作。命令模式是一种对象行为型模式，其别名为动作 (Action) 模式或事务 (Transaction) 模式。

## 类图

![命令模式类图](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/advance/command_pattern.png)

命令模式类图中包含如下几个角色：

- Command: 抽象命令
- ConcreteCommand: 命令实现类
- Receiver: 命令接收者，也就是命令真正的执行者
- Invoker: 通过它来调用命令
- Client: 可以设置命令与命令的接收者

## 伪代码

抽象命令类和具体命令

```java
public interface Command {

    void execute();
}

public class ConcreteCommand implements Command {

    // 请求的接收者
    Receiver receiver;

    public ConcreteCommand(Receiver receiver) {
        this.receiver = receiver;
    }

    @Override
    public void execute() {
        // 接收者的业务操作
        receiver.action();
    }
}
```

`ConcreteCommand` 维护了一个命令接收者 `Receiver`，由 `Receiver` 执行真正的业务操作

```java
public class Receiver {

    public void action() {
        System.out.println("Receiver#action()");
    }
}
```

请求发送者即调用者而言，将针对抽象命令类进行编程，可以通过构造注入或者设值注入的方式在运行时传入具体命令类对象，并在业务方法中调用命令对象的 `execute()` 方法

```java
public class Invoker {

    private ConcreteCommand command;

    public Invoker(ConcreteCommand command) {
        this.command = command;
    }

    public void call() {
        command.execute();
    }
}
```

## 应用实例

java JUC 包中的 `Runable` 接口

## 总结

命令模式是一种使用频率非常高的设计模式，它可以将请求发送者与接收者解耦，请求发送者通过命令对象来间接引用请求接收者，使得系统具有更好的灵活性和可扩展性。在基于 GUI 的软件开发，无论是在电脑桌面应用还是在移动应用中，命令模式都得到了广泛的应用。

### 主要优点

命令模式的主要优点如下：

- 降低系统的耦合度。由于请求者与接收者之间不存在直接引用，因此请求者与接收者之间实现完全解耦，相同的请求者可以对应不同的接收者，同样，相同的接收者也可以供不同的请求者使用，两者之间具有良好的独立性。
- 新的命令可以很容易地加入到系统中。由于增加新的具体命令类不会影响到其他类，因此增加新的具体命令类很容易，无须修改原有系统源代码，甚至客户类代码，满足“开闭原则”的要求。
- 可以比较容易地设计一个命令队列或宏命令（组合命令）。
- 为请求的撤销 (Undo) 和恢复 (Redo) 操作提供了一种设计和实现方案。

### 主要缺点

命令模式的主要缺点如下：

使用命令模式可能会导致某些系统有过多的具体命令类。因为针对每一个对请求接收者的调用操作都需要设计一个具体命令类，因此在某些系统中可能需要提供大量的具体命令类，这将影响命令模式的使用。

### 适用场景

在以下情况下可以考虑使用命令模式：

- 系统需要将请求调用者和请求接收者解耦，使得调用者和接收者不直接交互。请求调用者无须知道接收者的存在，也无须知道接收者是谁，接收者也无须关心何时被调用。
- 系统需要在不同的时间指定请求、将请求排队和执行请求。一个命令对象和请求的初始调用者可以有不同的生命期，换言之，最初的请求发出者可能已经不在了，而命令对象本身仍然是活动的，可以通过该命令对象去调用请求接收者，而无须关心请求调用者的存在性，可以通过请求日志文件等机制来具体实现。
- 系统需要支持命令的撤销 (Undo) 操作和恢复 (Redo) 操作。
- 系统需要将一组操作组合在一起形成宏命令。

## 参考资料

- [请求发送者与接收者解耦——命令模式](https://blog.csdn.net/lovelion/article/details/8806677)
- [行为型 - 命令模式 (Command)](https://pdai.tech/md/dev-spec/pattern/18_command.html)
 