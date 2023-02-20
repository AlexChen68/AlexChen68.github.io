---
title: 抽象工厂模式
date: 2022-09-27
category: 设计模式
description: 抽象工厂模式
---

抽象工厂模式创建的是对象家族，也就是很多对象而不是一个对象，并且这些对象是相关的，也就是说必须一起创建出来。而工厂方法模式只是用于创建一个对象，这和抽象工厂模式有很大不同。
<!-- more -->

### 抽象工厂(Abstract Factory)

> 抽象工厂模式创建的是对象家族，也就是很多对象而不是一个对象，并且这些对象是相关的，也就是说必须一起创建出来。而工厂方法模式只是用于创建一个对象，这和抽象工厂模式有很大不同。

**适用场景**

1. 如果希望一个系统独立于它的产品的创建，组合和表示的时候，换句话说，希望一个系统只是知道产品的接口，而不关心实现的时候；
1. 如果一个系统要由多个产品系列中的一个来配置的时候，换句话说，就是可以动态的切换产品簇的时候；
1. 如果要强调一系列相关产品的接口，以便联合使用它们的时候。

**优点**

1. 分离接口和实现；
2. 使得切换产品簇变得容易。

**缺点**

1. 抽象工厂添加新的产品，所有具体工厂都需要添加，违反开闭原则（一种方法是仅实现一个方法，根据参数再判断具体实现，这种方法不安全，因为返回的参数必须是所有产品的父类）；
2. 容易造成类层次复杂。

**代码示例**

```java
abstract class Monitor {}

class LGMonitor extends Monitor{}

class SamsungMonitor extends Monitor{}

abstract class Mainframe {}

class AsusMainframe extends Mainframe{}

class HpMainframe extends Mainframe{}

/**
 * 工厂生产电脑需要主机和显示器，组合了两个工厂方法，形成抽象工厂
 */
abstract class AbstractComputerFactory {
    abstract Monitor createMonitor();
    abstract Mainframe createMainframe();
}

class ComputerFactory1 extends AbstractComputerFactory {

    @Override
    Monitor createMonitor() {
        return new LGMonitor();
    }

    @Override
    Mainframe createMainframe() {
        return new AsusMainframe();
    }
}

class ComputerFactory2 extends AbstractComputerFactory {

    @Override
    Monitor createMonitor() {
        return new SamsungMonitor();
    }

    @Override
    Mainframe createMainframe() {
        return new HpMainframe();
    }
}
```