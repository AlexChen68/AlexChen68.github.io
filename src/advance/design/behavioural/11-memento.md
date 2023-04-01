---
title: 备忘录模式
category: 设计模式
date: 2023-02-19
description: 备忘录模式
---

设计模式之备忘录模式
<!-- more -->

## 备忘录模式（Memento Pattern）

备忘录模式提供了一种状态恢复的实现机制，使得用户可以方便地回到一个特定的历史步骤，当新的状态无效或者存在问题时，可以使用暂时存储起来的备忘录将状态复原，当前很多软件都提供了撤销 (Undo) 操作，其中就使用了备忘录模式。

> 备忘录模式 (Memento Pattern)：在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样可以在以后将对象恢复到原先保存的状态。它是一种对象行为型模式，其别名为 Token。

## 类图

![备忘录模式类图](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/memento_pattern.png)

在备忘录模式类图中包含如下几个角色：

- Originator（原发器）：它是一个普通类，可以创建一个备忘录，并存储它的当前内部状态，也可以使用备忘录来恢复其内部状态，一般将需要保存内部状态的类设计为原发器。

- Memento（备忘录）：存储原发器的内部状态，根据原发器来决定保存哪些内部状态。备忘录的设计一般可以参考原发器的设计，根据实际需要确定备忘录类中的属性。需要注意的是，除了原发器本身与负责人类之外，备忘录对象不能直接供其他类使用，原发器的设计在不同的编程语言中实现机制会有所不同。

- Caretaker（负责人）：负责人又称为管理者，它负责保存备忘录，但是不能对备忘录的内容进行操作或检查。在负责人类中可以存储一个或多个备忘录对象，它只负责存储对象，而不能修改对象，也无须知道对象的实现细节。

## 伪代码

实现了一个简单计算器程序，可以输入两个值，然后计算这两个值的和。备忘录模式允许将这两个值存储起来，然后在某个时刻用存储的状态进行恢复。

```java
@Data
@AllArgsConstructor
public class Originator {

    private String state;

    public Memento backup() {
        return new Memento(this.state);
    }

    public void restore(Memento memento) {
        this.state = memento.getState();
    }
}

public class Memento {

    private String state;

    protected Memento(String state) {
        this.state = state;
    }

    protected String getState() {
        return state;
    }

}

public class Caretaker {

    private Map<String, Memento> cache;

    public Caretaker() {
        this.cache = new HashMap<>();
    }

    public void saveMemento(String name, Memento memento) {
        if (memento == null) {
            throw new IllegalArgumentException("Memento cant be null");
        }
        cache.put(name, memento);
    }

    public Memento getMemento(String name) {
        return cache.get(name);
    }
}
```

:::warning
注意：在设计备忘录类时需要考虑其封装性，除了 Originator 类，不允许其他类来调用备忘录类 Memento 的构造函数与相关方法，如果不考虑封装性，允许其他类调用 setState() 等方法，将导致在备忘录中保存的历史状态发生改变，通过撤销操作所恢复的状态就不再是真实的历史状态，备忘录模式也就失去了本身的意义。
:::

```java
public class Client {

    public static void main(String[] args) {
        Caretaker caretaker = new Caretaker();
        Originator originator = new Originator("java");
        caretaker.saveMemento("1", originator.backup());
        System.out.println(originator.getState());

        originator.setState("python");
        caretaker.saveMemento("2", originator.backup());
        System.out.println(originator.getState());

        originator.setState("go");
        System.out.println(originator.getState());

        originator.restore(caretaker.getMemento("1"));
        System.out.println(originator.getState());
    }
}
```

```java
java
python
go
java
```

## 应用实例

`java.io.Serializable`

## 总结

备忘录模式在很多软件的使用过程中普遍存在，但是在应用软件开发中，它的使用频率并不太高，因为现在很多基于窗体和浏览器的应用软件并没有提供撤销操作。如果需要为软件提供撤销功能，备忘录模式无疑是一种很好的解决方案。在一些字处理软件、图像编辑软件、数据库管理系统等软件中备忘录模式都得到了很好的应用。

### 主要优点

备忘录模式的主要优点如下：

- 它提供了一种状态恢复的实现机制，使得用户可以方便地回到一个特定的历史步骤，当新的状态无效或者存在问题时，可以使用暂时存储起来的备忘录将状态复原。
- 备忘录实现了对信息的封装，一个备忘录对象是一种原发器对象状态的表示，不会被其他代码所改动。备忘录保存了原发器的状态，采用列表、堆栈等集合来存储备忘录对象可以实现多次撤销操作。

### 主要缺点

备忘录模式的主要缺点如下：

资源消耗过大，如果需要保存的原发器类的成员变量太多，就不可避免需要占用大量的存储空间，每保存一次对象的状态都需要消耗一定的系统资源。

### 适用场景

在以下情况下可以考虑使用备忘录模式：

- 保存一个对象在某一个时刻的全部状态或部分状态，这样以后需要时它能够恢复到先前的状态，实现撤销操作。
- 防止外界对象破坏一个对象历史状态的封装性，避免将对象历史状态的实现细节暴露给外界对象。

---

## 参考资料

- [撤销功能的实现——备忘录模式](https://blog.csdn.net/lovelion/article/details/7526747)
- [行为型 - 备忘录 (Memento)](https://pdai.tech/md/dev-spec/pattern/25_memento.html)