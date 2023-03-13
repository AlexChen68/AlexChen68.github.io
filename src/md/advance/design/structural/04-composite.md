---
title: 组合模式
category: 设计模式
date: 2023-02-19
description: 组合模式
---

设计模式之组合模式
<!-- more -->

## 组合模式 (Composite Pattern)

`组合模式(Composite Pattern)`：组合多个对象形成树形结构以表示具有“整体—部分”关系的层次结构。组合模式对单个对象（即叶子对象）和组合对象（即容器对象）的使用具有一致性，组合模式又可以称为“整体—部分”(Part-Whole) 模式，它是一种对象结构型模式。

## 类图

![组合模式类图](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/compostie_pattern.png)

在组合模式类图中包含如下几个角色：

- `Component`（抽象构件）：它可以是接口或抽象类，为叶子构件和容器构件对象声明接口，在该角色中可以包含所有子类共有行为的声明和实现。在抽象构件中定义了访问及管理它的子构件的方法，如增加子构件、删除子构件、获取子构件等。
- `Leaf`（叶子构件）：它在组合结构中表示叶子节点对象，叶子节点没有子节点，它实现了在抽象构件中定义的行为。对于那些访问及管理子构件的方法，可以通过异常等方式进行处理。
- `Composite`（容器构件）：它在组合结构中表示容器节点对象，容器节点包含子节点，其子节点可以是叶子节点，也可以是容器节点，它提供一个集合用于存储子节点，实现了在抽象构件中定义的行为，包括那些访问及管理子构件的方法，在其业务方法中可以递归调用其子节点的业务方法。

> 组合模式的关键是定义了一个`抽象构件类`，它既可以代表叶子，又可以代表容器，而客户端针对该抽象构件类进行编程，无须知道它到底表示的是叶子还是容器，可以对其进行统一处理。同时容器对象与抽象构件类之间还建立一个聚合关联关系，在容器对象中既可以包含叶子，也可以包含容器，以此实现递归组合，形成一个树形结构。

## 伪代码

对于客户端而言，一般针对抽象构件编程，而无须关心其具体子类是容器构件还是叶子构件。抽象构建类典型代码如下：

```java
public abstract class Component {
    public abstract void add(Component c); //增加成员

    public abstract void remove(Component c); //删除成员

    public abstract Component getChild(int i); //获取成员

    public abstract void operation();  //业务方法
}
```

如果继承抽象构件的是叶子构件，则其典型代码如下所示：

```java
public class Leaf extends Component {
    @Override
    public void add(Component c) {
        //异常处理或错误提示 
    }

    @Override
    public void remove(Component c) {
        //异常处理或错误提示 
    }

    @Override
    public Component getChild(int i) {
        //异常处理或错误提示 
        return null;
    }

    @Override
    public void operation() {
        //叶子构件具体业务方法的实现
    }
}
```

如果继承抽象构件的是容器构件，则其典型代码如下所示：

```java
public class Composite extends Component {

    private List<Component> list = new ArrayList<>();

    @Override
    public void add(Component c) {
        list.add(c);
    }

    @Override
    public void remove(Component c) {
        list.remove(c);
    }

    @Override
    public Component getChild(int i) {
        return (Component) list.get(i);
    }

    @Override
    public void operation() {
        //容器构件具体业务方法的实现
        //递归调用成员构件的业务方法
        for (Object obj : list) {
            ((Component) obj).operation();
        }
    }
}
```

客户端对抽象构件类进行编程

```java
public class Client {
    public static void main(String[] args) {
        Component component;
        component = new Leaf();
        //component = new Composite();

        // 无须知道到底是叶子还是容器
        // 可以对其进行统一处理
        component.operation();
    }
}
```

## 简化

### 透明组合模式

透明组合模式中，抽象构件 Component 中声明了所有用于管理成员对象的方法，包括 add()、remove() 以及 getChild() 等方法，这样做的好处是确保所有的构件类都有相同的接口。在客户端看来，叶子对象与容器对象所提供的方法是一致的，客户端可以相同地对待所有的对象。透明组合模式也是组合模式的标准形式。

也可以将叶子构件的`add()`、`remove()`等方法的实现代码移至`Component`中，由`Component`提供统一的默认实现，这样子类就不必强制去实现管理子 Component。代码如下所示：

```java
public abstract class Component {
    public void add(Component c) {
        throw new RuntimeException("不支持的操作");
    }

    public void remove(Component c) {
        throw new RuntimeException("不支持的操作");
    }

    public Component getChild(int i) {
        throw new RuntimeException("不支持的操作");
    }

    public abstract void operation();  //业务方法
}
```

透明组合模式的缺点是不够安全，因为叶子对象和容器对象在本质上是有区别的。叶子对象不可能有下一个层次的对象，即不可能包含成员对象，因此为其提供 add()、remove() 以及 getChild() 等方法是没有意义的，这在编译阶段不会出错，但在运行阶段如果调用这些方法可能会出错（如果没有提供相应的错误处理代码）。

### 安全组合模式

安全组合模式中，在抽象构件 Component 中没有声明任何用于管理成员对象的方法，而是在 Composite 类中声明并实现这些方法。

此时 Component 就应该这样定义了

```java
public abstract class Component {
    // 业务方法
    public abstract void operation();
}
```

安全组合模式的缺点是不够透明，因为叶子构件和容器构件具有不同的方法，且容器构件中那些用于管理成员对象的方法没有在抽象构件类中定义，因此客户端不能完全针对抽象编程，必须有区别地对待叶子构件和容器构件。在实际应用中，安全组合模式的使用频率也非常高，在 Java AWT 中使用的组合模式就是安全组合模式。

## 应用实例

`Java SE`中的`AWT`和`Swing`包的设计就基于组合模式，在这些界面包中为用户提供了大量的容器构件（如`Container`）和成员构件（如`Checkbox`、`Button`和`TextComponent`等），其结构如下图所示：

![Swing](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/compostie_pattern_1.png)

`Component`类是抽象构件，`Checkbox`、`Button`和`TextComponent`是叶子构件，而`Container`是容器构件，在`AWT`中包含的叶子构件还有很多。在一个容器构件中可以包含叶子构件，也可以继续包含容器构件，这些叶子构件和容器构件一起组成了复杂的`GUI`界面。除此以外，在`XML解析`、`组织结构树处理`、`文件系统设计`等领域，组合模式都得到了广泛应用。

## 总结

### 主要优点

- 组合模式可以清楚地定义分层次的复杂对象，表示对象的全部或部分层次，它让客户端忽略了层次的差异，方便对整个层次结构进行控制。
- 客户端可以一致地使用一个组合结构或其中单个对象，不必关心处理的是单个对象还是整个组合结构，简化了客户端代码。
- 组合模式为树形结构的面向对象实现提供了一种灵活的解决方案，通过叶子对象和容器对象的递归组合，可以形成复杂的树形结构，但对树形结构的控制却非常简单。

### 适用场景
- 在具有整体和部分的层次结构中，希望通过一种方式忽略整体与部分的差异，客户端可以一致地对待它们。
- 在一个使用面向对象语言开发的系统中需要处理一个树形结构。
- 在一个系统中能够分离出叶子对象和容器对象，而且它们的类型不固定，需要增加一些新的类型。

---

## 参考资料

- [字节飞扬](https://bytesfly.github.io/blog/#/DesignPattern/composite-pattern)
- [Java 全栈知识体系](https://pdai.tech/md/dev-spec/pattern/11_compsite.html)