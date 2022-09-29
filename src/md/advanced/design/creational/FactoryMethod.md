---
title: 工厂方法模式
date: 2022-09-27
tag:
  - 设计模式
category:
  - 设计模式
isOriginal: true
description: 工厂方法模式
---

设计模式之工厂方法
<!-- more -->

### 工厂方法(Factory Method)

**定义**

> 定义了一个创建对象的接口，但由工厂子类决定要实例化哪个类。工厂方法把实例化操作推迟到工厂的子类。

**适用场景**

1. 在任何需要生成**复杂对象**的地方，都可以使用工厂方法模式。直接用**new**可以完成的**不需要用工厂模式**个人理解，重点就是这个复杂 （构造函数有很多参数）和 是否可以 直接用new。
2. 客户端只知道传入工厂类的参数，对于如何创建对象并不关心。
3. 工厂类负责创建的对象比较少，由于创建的对象较少，不会造成工厂方法中的业务逻辑太过复杂。

**优点**

1. 用户只需要关心所需产品的对应工厂，无需关心细节；
1. 完全支持开闭原则，提高可扩展性。所谓的开闭原则就是对扩展开放，对修改关闭，再说白点就是实现工厂方法以后要进行扩展时不需要修改原有代码，只需要增加一个工厂实现类和产品实现类就可以。这样的好处可以降低因为修改代码引进错误的风险。

**缺点**

1. 加入一种产品，会创建一个具体工厂类和具体产品类，因此，类的个数容易过多，增加复杂度；
1. 抽象工厂和抽象产品增加了系统的抽象性和理解难度。

**代码示例**

```java
public interface FoodFactory {
    Food makeFood(String name);
}
public class ChineseFoodFactory implements FoodFactory {

    @Override
    public Food makeFood(String name) {
        if (name.equals("A")) {
            return new ChineseFoodA();
        } else if (name.equals("B")) {
            return new ChineseFoodB();
        } else {
            return null;
        }
    }
}
public class AmericanFoodFactory implements FoodFactory {

    @Override
    public Food makeFood(String name) {
        if (name.equals("A")) {
            return new AmericanFoodA();
        } else if (name.equals("B")) {
            return new AmericanFoodB();
        } else {
            return null;
        }
    }
}
```