---
title: 行为型 - 状态模式
date: 2023-02-19
description: 状态模式
---

设计模式之状态模式
<!-- more -->

## 状态模式

状态模式用于解决系统中复杂对象的状态转换以及不同状态下行为的封装问题。当系统中某个对象存在多个状态，这些状态之间可以进行转换，而且对象在不同状态下行为不相同时可以使用状态模式。状态模式将一个对象的状态从该对象中分离出来，封装到专门的状态类中，使得对象状态可以灵活变化，对于客户端而言，无须关心对象状态的转换以及对象所处的当前状态，无论对于何种状态的对象，客户端都可以一致处理。

> 状态模式 (State Pattern)：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。其别名为状态对象 (Objects for States)，状态模式是一种对象行为型模式。

 在状态模式类图中包含如下几个角色：

- Context（环境类）：环境类又称为上下文类，它是拥有多种状态的对象。由于环境类的状态存在多样性且在不同状态下对象的行为有所不同，因此将状态独立出去形成单独的状态类。在环境类中维护一个抽象状态类 State 的实例，这个实例定义当前状态，在具体实现时，它是一个 State 子类的对象。
- State（抽象状态类）：它用于定义一个接口以封装与环境类的一个特定状态相关的行为，在抽象状态类中声明了各种不同状态对应的方法，而在其子类中实现类这些方法，由于不同状态下对象的行为可能不同，因此在不同子类中方法的实现可能存在不同，相同的方法可以写在抽象状态类中。
- ConcreteState（具体状态类）：它是抽象状态类的子类，每一个子类实现一个与环境类的一个状态相关的行为，每一个具体状态类对应环境的一个具体状态，不同的具体状态类其行为有所不同。

## 类图

![状态模式类图](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/advance/state_pattern.png)

## 伪代码

我们来实现一个开关，它有开启和关闭两种状态，并且可以切换

```java
public interface State {

    void on(Switch s);

    void off(Switch s);
}

public class OnState implements State {
    @Override
    public void on(Switch s) {
        System.out.println("已经是打开的");
    }

    @Override
    public void off(Switch s) {
        s.setState(s.getOffState());
        System.out.println("关闭成功");
    }
}

public class OffState implements State {
    @Override
    public void on(Switch s) {
        System.out.println("打开成功");
        s.setState(s.getOnState());
    }

    @Override
    public void off(Switch s) {
        System.out.println("已经是关闭的");
    }
}
```

```java
public class Switch {

    private State state;
    private OnState onState;
    private OffState offState;

    private String name;

    public Switch(String name) {
        this.name = name;
        this.onState = new OnState();
        this.offState = new OffState();
        this.state = offState;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public OnState getOnState() {
        return onState;
    }

    public OffState getOffState() {
        return offState;
    }

    public void on() {
        state.on(this);
    }

    public void off() {
        state.off(this);
    }
}
```

客户端调用

```java
public class Client {

    public static void main(String[] args) {
        Switch s = new Switch("lamp");
        s.on();
        s.on();
        s.off();
        s.off();
    }
}
```

结果

```java
打开成功
已经是打开的
关闭成功
已经是关闭的
```

这里我们是在 `state` 的实现类中去改变的状态，还有一种方法是在 `context`，即本例中的 `switch` 中去改变状态。

## 应用实例

在商品订单系统中，使用状态模式来控制订单状态的变化

## 总结

### 主要优点

- 封装了转换规则。
- 枚举可能的状态，在枚举状态之前需要确定状态种类。
- 将所有与某个状态有关的行为放到一个类中，并且可以方便地增加新的状态，只需要改变对象状态即可改变对象的行为。
- 允许状态转换逻辑与状态对象合成一体，而不是某一个巨大的条件语句块。
- 可以让多个环境对象共享一个状态对象，从而减少系统中对象的个数。

### 主要缺点

- 状态模式的使用必然会增加系统类和对象的个数。
- 状态模式的结构与实现都较为复杂，如果使用不当将导致程序结构和代码的混乱。
- 状态模式对"开闭原则"的支持并不太好，对于可以切换状态的状态模式，增加新的状态类需要修改那些负责状态转换的源代码，否则无法切换到新增状态，而且修改某个状态类的行为也需修改对应类的源代码。

### 适用环境

- 代码中包含大量与对象状态有关的条件语句。
- 行为随状态改变而改变的场景。(银行系统中账号状态的管理/OA 系统中公文状态的管理/酒店系统中，房间状态的管理/线程对象各状态之间的切换)

在行为受状态约束的时候使用状态模式，而且状态不超过 5 个。

## 参考资料

- [处理对象的多种状态及其相互转换](https://blog.csdn.net/lovelion/article/details/8523062)
- [JAVA 设计模式之状态模式](https://blog.csdn.net/carefree31441/article/details/103387094)
- [行为型 - 状态 (State)](https://pdai.tech/md/dev-spec/pattern/21_state.html)