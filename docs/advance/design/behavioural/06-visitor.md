---
title: 访问者模式
date: 2023-02-19
description: 访问者模式
---

设计模式之访问者模式
<!-- more -->

## 访问者模式 (Visitor Pattern)

访问者模式是一种较为复杂的行为型设计模式，它包含访问者和被访问元素两个主要组成部分，这些被访问的元素通常具有不同的类型，且不同的访问者可以对它们进行不同的访问操作。例如处方单中的各种药品信息就是被访问的元素，而划价人员和药房工作人员就是访问者。访问者模式使得用户可以在不修改现有系统的情况下扩展系统的功能，为这些不同类型的元素增加新的操作。

在使用访问者模式时，被访问元素通常不是单独存在的，它们存储在一个集合中，这个集合被称为“对象结构”，访问者通过遍历对象结构实现对其中存储的元素的逐个操作。

> 访问者模式 (Visitor Pattern):提供一个作用于某对象结构中的各元素的操作表示，它使我们可以在不改变各元素的类的前提下定义作用于这些元素的新操作。访问者模式是一种对象行为型模式。

## 类图

![访问者模式类图](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/advance/visitor_pattern.png)

在访问者模式类图中包含如下几个角色：

- Vistor（抽象访问者）：抽象访问者为对象结构中每一个具体元素类 `ConcreteElement` 声明一个访问操作，从这个操作的名称或参数类型可以清楚知道需要访问的具体元素的类型，具体访问者需要实现这些操作方法，定义对这些元素的访问操作。
- ConcreteVisitor（具体访问者）：具体访问者实现了每个由抽象访问者声明的操作，每一个操作用于访问对象结构中一种类型的元素。
- Element（抽象元素）：抽象元素一般是抽象类或者接口，它定义一个 `accept()` 方法，该方法通常以一个抽象访问者作为参数。
- ConcreteElement（具体元素）：具体元素实现了 `accept()` 方法，在 `accept()` 方法中调用访问者的访问方法以便完成对一个元素的操作。
- ObjectStructure（对象结构）：对象结构是一个元素的集合，它用于存放元素对象，并且提供了遍历其内部元素的方法。它可以结合组合模式来实现，也可以是一个简单的集合对象，如一个 List 对象或一个 Set 对象。

## 伪代码

先定义抽象元素和抽象访问者，元素需要实现一个 `accept` 方法来接待访问，访问者需要不同类型的元素，分别实现 `visit` 逻辑

```java
public interface Element {
    // 要求元素可以接待来访者
    void accept(Visitor visitor);
}

public interface Visitor {

    void visit(Order order);

    void visit(Item item);
}
```

```java
@Data
public class Item implements Element {

    private String info;

    public Item(String info) {
        this.info = info;
    }

    @Override
    public void accept(Visitor visitor) {
        // 访问自己
        visitor.visit(this);
    }
}

@Data
public class Order implements Element {

    private List<Item> items;
    private String info;

    public Order(String info) {
        this.info = info;
        this.items = new ArrayList<>();
    }

    public Order(List<Item> items) {
        this.items = items;
    }

    public void addItem(Item item) {
        items.add(item);
    }
    @Override
    public void accept(Visitor visitor) {
        // 先访问自己
        visitor.visit(this);
        // 嵌套的每个元素也都接待来访者
        for (Item item : items) {
            item.accept(visitor);
        }
    }
}

public class ConcreteVisitor implements Visitor {

    @Override
    public void visit(Order order) {
        System.out.println("order: " + order.getInfo());
    }

    @Override
    public void visit(Item item) {
        System.out.println("item: " + item.getInfo());
    }
}
```

客户端调用

```java
public class Client {

    public static void main(String[] args) {
        Visitor visitor = new ConcreteVisitor();
        Order order = new Order("order_a");
        order.addItem(new Item("item_a1"));
        order.addItem(new Item("item_a2"));
        order.addItem(new Item("item_a3"));

        order.accept(visitor);
    }
}
```
 
`order` 在接受 `visitor` 的访问后，先让 `visitor` 访问其自己，而后让其一次访问内部维护的 `item` 列表，因此 `visitor` 需要有访问不同类型元素的方法。

## 应用实例

javax.lang.model.element.Element and javax.lang.model.element.ElementVisitorjavax.lang.model.type.TypeMirror and javax.lang.model.type.TypeVisitor
原文链接：https://pdai.tech/md/dev-spec/pattern/20_visitor.html

## 总结

由于访问者模式的使用条件较为苛刻，本身结构也较为复杂，因此在实际应用中使用频率不是特别高。

当系统中存在一个较为复杂的对象结构，且不同访问者对其所采取的操作也不相同时，可以考虑使用访问者模式进行设计。在 XML 文档解析、编译器的设计、复杂集合对象的处理等领域访问者模式得到了一定的应用。


### 主要优点

访问者模式的主要优点如下：

- 增加新的访问操作很方便。使用访问者模式，增加新的访问操作就意味着增加一个新的具体访问者类，实现简单，无须修改源代码，符合“开闭原则”。
- 将有关元素对象的访问行为集中到一个访问者对象中，而不是分散在一个个的元素类中。类的职责更加清晰，有利于对象结构中元素对象的复用，相同的对象结构可以供多个不同的访问者访问。
- 让用户能够在不修改现有元素类层次结构的情况下，定义作用于该层次结构的操作。

### 主要缺点

访问者模式的主要缺点如下：

- 增加新的元素类很困难。在访问者模式中，每增加一个新的元素类都意味着要在抽象访问者角色中增加一个新的抽象操作，并在每一个具体访问者类中增加相应的具体操作，这违背了“开闭原则”的要求。
- 破坏封装。访问者模式要求访问者对象访问并调用每一个元素对象的操作，这意味着元素对象有时候必须暴露一些自己的内部操作和内部状态，否则无法供访问者访问。

### 适用场景

在以下情况下可以考虑使用访问者模式：

- 一个对象结构包含多个类型的对象，希望对这些对象实施一些依赖其具体类型的操作。在访问者中针对每一种具体的类型都提供了一个访问操作，不同类型的对象可以有不同的访问操作。
- 需要对一个对象结构中的对象进行很多不同的并且不相关的操作，而需要避免让这些操作“污染”这些对象的类，也不希望在增加新操作时修改这些类。访问者模式使得我们可以将相关的访问操作集中起来定义在访问者类中，对象结构可以被多个不同的访问者类所使用，将对象本身与对象的访问操作分离。
- 对象结构中对象对应的类很少改变，但经常需要在此对象结构上定义新的操作。

## 参考资料

- [操作复杂对象结构——访问者模式](https://blog.csdn.net/lovelion/article/details/7433567)
- [行为型 - 访问者 (Visitor)-pdai](https://pdai.tech/md/dev-spec/pattern/20_visitor.html)