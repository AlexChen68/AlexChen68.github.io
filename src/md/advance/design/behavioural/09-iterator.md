---
title: 迭代器模式
category: 设计模式
date: 2023-02-19
description: 迭代器模式
---

设计模式之迭代器模式
<!-- more -->

## 迭代器模式 (Iterator Pattern)

在软件开发中，我们经常需要使用聚合对象来存储一系列数据。聚合对象拥有两个职责：一是存储数据；二是遍历数据。从依赖性来看，前者是聚合对象的基本职责；而后者既是可变化的，又是可分离的。因此，可以将遍历数据的行为从聚合对象中分离出来，封装在一个被称之为“迭代器”的对象中，由迭代器来提供遍历聚合对象内部数据的行为，这将简化聚合对象的设计，更符合“单一职责原则”的要求。

> 迭代器模式 (Iterator Pattern)：提供一种方法来访问聚合对象，而不用暴露这个对象的内部表示，其别名为游标 (Cursor)。迭代器模式是一种对象行为型模式。

## 类图

![迭代器模式类图](https://cdn.staticaly.com/gh/AlexChen68/images@master/blog/advance/iterator_pattern.png)

在迭代器模式结构图中包含如下几个角色：

- Iterator（抽象迭代器）：它定义了访问和遍历元素的接口，声明了用于遍历数据元素的方法，例如：用于获取第一个元素的 first() 方法，用于访问下一个元素的 next() 方法，用于判断是否还有下一个元素的 hasNext() 方法，用于获取当前元素的 currentItem() 方法等，在具体迭代器中将实现这些方法。
- ConcreteIterator（具体迭代器）：它实现了抽象迭代器接口，完成对聚合对象的遍历，同时在具体迭代器中通过游标来记录在聚合对象中所处的当前位置，在具体实现时，游标通常是一个表示位置的非负整数。
- Aggregate（抽象聚合类）：它用于存储和管理元素对象，声明一个 createIterator() 方法用于创建一个迭代器对象，充当抽象迭代器工厂角色。
- ConcreteAggregate（具体聚合类）：它实现了在抽象聚合类中声明的 createIterator() 方法，该方法返回一个与该具体聚合类对应的具体迭代器 ConcreteIterator 实例。

## 伪代码

定义抽象迭代器和抽象聚合类

```java
public interface Aggregate {

    Iterator createIterator();
}

public interface Iterator<E> {

    boolean hasNext();

    E next();
}
```

定义具体聚合类和具体迭代器

```java
public class ConcreteAggregate implements Aggregate {

    private Integer[] items;

    public ConcreteAggregate(Integer[] items) {
        this.items = items;
    }

    @Override
    public Iterator createIterator() {
        return new ConcreteIterator<Integer>(items);
    }
}

public class ConcreteIterator<T> implements Iterator<T> {

    private T[] items;
    private int position = 0;

    public ConcreteIterator(T[] items) {
        this.items = items;
    }

    @Override
    public boolean hasNext() {
        return position < items.length;
    }

    @Override
    public T next() {
        return items[position++];
    }
}
```

客户端调用

```java
public class Client {

    public static void main(String[] args) {
        Integer[] array = new Integer[]{1, 3, 5, 7, 9};
        ConcreteAggregate aggregate = new ConcreteAggregate(array);
        Iterator iterator = aggregate.createIterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
```
输出

```java
1
3
5
7
9
```

## 应用实例

在 java 的集合框架中，`Collection` 接口继承了 `Iterable` 接口，而 `Iterable` 接口提供了一个获取迭代器的方法

```java
public interface Iterable<T> {

  Iterator<T> iterator();
}
```

## 总结

迭代器模式是一种使用频率非常高的设计模式，通过引入迭代器可以将数据的遍历功能从聚合对象中分离出来，聚合对象只负责存储数据，而遍历数据由迭代器来完成。

### 主要优点

迭代器模式的主要优点如下：

- 它支持以不同的方式遍历一个聚合对象，在同一个聚合对象上可以定义多种遍历方式。在迭代器模式中只需要用一个不同的迭代器来替换原有迭代器即可改变遍历算法，我们也可以自己定义迭代器的子类以支持新的遍历方式。
- 迭代器简化了聚合类。由于引入了迭代器，在原有的聚合对象中不需要再自行提供数据遍历等方法，这样可以简化聚合类的设计。
- 在迭代器模式中，由于引入了抽象层，增加新的聚合类和迭代器类都很方便，无须修改原有代码，满足“开闭原则”的要求。

### 主要缺点

迭代器模式的主要缺点如下：

- 由于迭代器模式将存储数据和遍历数据的职责分离，增加新的聚合类需要对应增加新的迭代器类，类的个数成对增加，这在一定程度上增加了系统的复杂性。
- 抽象迭代器的设计难度较大，需要充分考虑到系统将来的扩展，例如 JDK 内置迭代器 Iterator 就无法实现逆向遍历，如果需要实现逆向遍历，只能通过其子类 ListIterator 等来实现，而 ListIterator 迭代器无法用于操作 Set 类型的聚合对象。在自定义迭代器时，创建一个考虑全面的抽象迭代器并不是件很容易的事情。

### 适用场景

在以下情况下可以考虑使用迭代器模式：

- 访问一个聚合对象的内容而无须暴露它的内部表示。将聚合对象的访问与内部数据的存储分离，使得访问聚合对象时无须了解其内部实现细节。
- 需要为一个聚合对象提供多种遍历方式。
- 为遍历不同的聚合结构提供一个统一的接口，在该接口的实现类中为不同的聚合结构提供不同的遍历方式，而客户端可以一致性地操作该接口。

## 参考资料

- [遍历聚合对象中的元素——迭代器模式](https://blog.csdn.net/lovelion/article/details/9992243)
- [行为型 - 迭代器 (Iterator)](https://pdai.tech/md/dev-spec/pattern/23_iterator.html)