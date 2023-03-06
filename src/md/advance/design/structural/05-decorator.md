---
title: 装饰模式
category: 设计模式
date: 2023-02-19
description: 装饰模式
---

设计模式之装饰模式
<!-- more -->

## 装饰模式（Decorator Pattern）

如何让系统中的类可以进行扩展但是又不会导致类数目的急剧增加？`根据“合成复用原则”，在实现功能复用时，我们要多用关联，少用继承。`

`装饰模式是一种用于替代继承的技术`，它通过一种无须定义子类的方式来给对象`动态`增加职责，使用对象之间的`关联关系`取代类之间的`继承关系`。在装饰模式中引入了装饰类，在装饰类中既可以调用待装饰的原有类的方法，还可以增加新的方法，以扩充原有类的功能。

> `装饰模式(Decorator Pattern)`：动态地给一个对象增加一些额外的职责，就增加对象功能来说，装饰模式比生成子类实现更为灵活。装饰模式是一种对象结构型模式。

## 类图

![装饰模式类图](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/decorator_pattern.png)

在装饰模式类图中包含如下几个角色：

- `Component`（抽象构件）：它是具体构件和抽象装饰类的共同父类，声明了在具体构件中实现的业务方法，它的引入可以使客户端以一致的方式处理未被装饰的对象以及装饰之后的对象，实现客户端的透明操作。
- `ConcreteComponent`（具体构件）：它是抽象构件类的子类，用于定义具体的构件对象，实现了在抽象构件中声明的方法，装饰器可以给它增加额外的职责（方法）。
- `Decorator`（抽象装饰类）：它也是抽象构件类的子类，用于给具体构件增加职责，但是具体职责在其子类中实现。它维护一个指向抽象构件对象的引用，通过该引用可以调用装饰之前构件对象的方法，并通过其子类扩展该方法，以达到装饰的目的。
- `ConcreteDecorator`（具体装饰类）：它是抽象装饰类的子类，负责向构件添加新的职责。每一个具体装饰类都定义了一些新的行为，它可以调用在抽象装饰类中定义的方法，并可以增加新的方法用以扩充对象的行为。

由于具体构件类和装饰类都实现了相同的抽象构件接口，因此装饰模式以对客户透明的方式动态地给一个对象附加上更多的责任，换言之，客户端并不会觉得对象在装饰前和装饰后有什么不同。装饰模式可以在不需要创造更多子类的情况下，将对象的功能加以扩展。

## 伪代码

装饰模式的核心在于抽象装饰类的设计，其典型代码如下所示：

```java
public interface Component {
    void operation();
}

public class Decorator implements Component {
    // 维持一个对抽象构件对象的引用
    private Component component;

    public Decorator(Component component) {
        this.component = component;
    }

    @Override
    public void operation() {
        component.operation();
    }
}
```

值得注意的是：

- 在`Decorator`中并未真正实现`operation()`方法，而只是调用原有`component`对象的`operation()`方法，它没有真正实施装饰，而是提供一个统一的接口，将具体装饰过程交给子类完成。
- 由于在抽象装饰类`Decorator`中注入的是`Component`类型的对象，因此可以将一个具体构件对象注入其中，再通过具体装饰类来进行装饰；此外，我们还可以将一个已经装饰过的`Decorator`子类的对象再注入其中进行`多次装饰`，从而对原有功能的多次扩展。

在`Decorator`的子类即具体装饰类中将继承`operation()`方法并根据需要进行扩展，典型的具体装饰类代码如下：

```java
public class ConcreteDecorator extends Decorator {

    public ConcreteDecorator(Component component) {
        super(component);
    }

    @Override
    public void operation() {
        // 调用原有业务方法
        super.operation();
        // 调用新增业务方法
        addedBehavior();
    }

    // 新增业务方法
    public void addedBehavior() {

    }
}
```

具体装饰类中可以调用到抽象装饰类的`operation()`方法，同时可以定义新的业务方法，如`addedBehavior()`

上面介绍的装饰模式就是透明 (Transparent) 装饰模式，也即标准装饰模式。

但是在实际使用过程中，由于新增行为可能需要单独调用（即`客户端想自己单独调用装饰类中新增的方法来控制是否以及如何增强`），因此这种形式的装饰模式也经常出现，这种装饰模式被称为`半透明(Semi-transparent)装饰模式`

半透明装饰模式中的具体装饰类对应的实现，即变为如下：

```java
public class ConcreteDecorator extends Decorator {

    public ConcreteDecorator(Component component) {
        super(component);
    }

    //@Override
    //public void operation() {
        // 调用原有业务方法
        // super.operation();
        // 调用新增业务方法
        //addedBehavior();
    //}

    // 新增业务方法
    public void addedBehavior() {

    }
}
```

**注意 `半透明装饰模式`中的`ConcreteDecorator`类继承了父装饰类`Decorator`的`operation()`方法但并没有重写`operation()`方法，并新增了业务方法`addedBehavior()`，但这两个方法是完全独立的，没有任何调用关系。**

即 `半透明装饰模式`中的`ConcreteDecorator`中的`operation()`并没有对注入的`Component`进行增强，只是增加了额外的方法`addedBehavior()`，这样一来是否增强`Component`就取决于客户端是否调用`addedBehavior()`方法。

## 应用实例

`Java`中的`java.io`包下 io 流的设计就充分使用了装饰模式。

举个具体的例子，`BufferedInputStream`就是一个具体装饰者，它能为一个原本没有缓冲 (`buffer`) 功能的`InputStream`增加缓冲的功能。下面的代码应该司空见惯。

```java
BufferedInputStream reader = new BufferedInputStream(new FileInputStream(new File("/tmp/1.txt")));
```

`FileInputStream`本没有缓冲功能，每次调用`read`方法，都会发起系统调用读数据。用`BufferedInputStream`来装饰它，那么每次调用`read`方法，会向操作系统多读一定量数据进入内存的`buf[]`，这样就提高了读的效率，避免频繁发起系统调用。

BufferedInputStream`构造器中注入了`InputStream

```java
public BufferedInputStream(InputStream in, int size) {
    super(in);
    if (size <= 0) {
        throw new IllegalArgumentException("Buffer size <= 0");
    }
    buf = new byte[size];
}
```

`BufferedInputStream`继承了父装饰器`FilterInputStream`，维持了对`InputStream`的引用

```java
public class FilterInputStream extends InputStream {

  protected volatile InputStream in;

  protected FilterInputStream(InputStream in) {
      this.in = in;
  }
}
```

`BufferedInputStream`重写了`read()`从而实现对引用的`InputStream`增强。

## 总结

装饰模式降低了系统的耦合度，可以动态增强对象的功能。

### 主要优点

- 对于扩展一个对象的功能，装饰模式比继承更加灵活性，不会导致类的个数急剧增加。
- 可以对一个对象进行多次装饰，通过使用不同的具体装饰类以及这些装饰类的排列组合，可以创造出很多不同行为的组合，得到功能更为强大的对象。
- 具体构件类与具体装饰类可以独立变化，用户可以根据需要增加新的具体构件类和具体装饰类，原有类库代码无须改变，符合“开闭原则”。

### 适用场景

- 在不影响其他对象的情况下，以动态、透明的方式给单个对象添加职责。
- 当不能采用继承的方式对系统进行扩展或者采用继承不利于系统扩展和维护时可以使用装饰模式。不能采用继承的情况主要有两类：第一类是系统中存在大量独立的扩展，为支持每一种扩展或者扩展之间的组合将产生大量的子类，使得子类数目呈爆炸性增长；第二类是因为类已定义为不能被继承（如`Java`语言中的`final`类）。

## 参考资料

- [字节飞扬](https://bytesfly.github.io/blog/#/DesignPattern/decorator-pattern)
- [Java 全栈知识体系](https://pdai.tech/md/dev-spec/pattern/12_decorator.html)