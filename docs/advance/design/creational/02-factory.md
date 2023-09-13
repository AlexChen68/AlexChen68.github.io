---
title: 工厂模式
date: 2023-03-03
---

## 简单工厂模式（Simple Factory）

定义一个工厂类，可以根据传入的参数不同创建不同类实例，被创建的实例通常都有相同的父类。简单工厂模式在 java 中得到了大量的使用，它属于创建型的设计模式，但是它不属于 GOF23 设计模式中的一种。

工厂模式提供公共的接口，客户端直接使用公共接口来创建对象，客户端这边不关心对象是怎么创建的，其中包含 3 个角色：**工厂角色，抽象产品角色，具体产品角色**。

- 工厂角色是简单工厂模式的核心，负责产品实例的内部逻辑；
- 抽象产品角色是所有具体产品角色的父类，封装了公共的方法；
- 具体产品角色是工厂角色创建的目标对象。

因为简单工厂模式将对象的创建和使用分离，使得系统更加符合单一职责原则。

### 伪代码

```java
public interface Mobile {
    void produce();
}

public class IphoneMobile implements Mobile{
    public void produce() {
        System.out.println("生产苹果手机");
    }
}

public class HuaweiMobile implements Mobile{
    public void produce() {
        System.out.println("生产华为手机");
    }
}

public class FoxconnFactory {
    public Mobile getMobile(String mobileType){
        if("iphone".equals(mobileType)){
            return new IphoneMobile();
        }else if("huawei".equals(mobileType)){
            return new HuaweiMobile();
        }
        return null;
    }
}

public class SimpleFactoryTest {
    public static void main(String[] args) {
        FoxconnFactory foxconnFactory = new FoxconnFactory();
        Mobile mobile = foxconnFactory.getMobile("iphone");
        mobile.produce();
        Mobile huawei = foxconnFactory.getMobile("huawei");
        huawei.produce();
    }
}
```

### 小结

简单工厂适用场景：

1. 工厂类创建的对象比较少；
2. 客户端只需要传入某个参数，对如何创建对象不关心。

优点：

1. 只需要传入参数就可以获取到需要的对象，客户端使用简单；
2. 通过反射或者配置文件，可以在不修改任何代码的情况下更换或者新增产品类，提供系统的灵活性；
3. 让创建和使用进行分离。

缺点：

1. 工厂类的职责比较重，如果新增一些类，需要修改工厂类判断逻辑，违背了开闭原则；
2. 增加类的个数，增加系统的复杂性和理解难度。

## 工厂方法模式 (Factory Method)

定义了一个创建对象的接口，但由工厂子类决定要实例化哪个类。

工厂方法把实例化操作推迟到工厂的子类。

### 伪代码

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

### 小结

适用场景：
1. 在任何需要生成**复杂对象**的地方，都可以使用工厂方法模式。直接用 `new`可以完成的**不需要用工厂模式**个人理解，重点就是这个复杂（构造函数有很多参数）和是否可以直接用 `new`。
2. 客户端只知道传入工厂类的参数，对于如何创建对象并不关心。
3. 工厂类负责创建的对象比较少，由于创建的对象较少，不会造成工厂方法中的业务逻辑太过复杂。

优点：

1. 用户只需要关心所需产品的对应工厂，无需关心细节；
1. 完全支持开闭原则，提高可扩展性。所谓的开闭原则就是对扩展开放，对修改关闭，再说白点就是实现工厂方法以后要进行扩展时不需要修改原有代码，只需要增加一个工厂实现类和产品实现类就可以。这样的好处可以降低因为修改代码引进错误的风险。

缺点：

1. 加入一种产品，会创建一个具体工厂类和具体产品类，因此，类的个数容易过多，增加复杂度；
1. 抽象工厂和抽象产品增加了系统的抽象性和理解难度。

## 抽象工厂 (Abstract Factory)

抽象工厂模式创建的是**对象家族**，也就是很多对象而不是一个对象，并且这些对象是相关的，也就是说必须一起创建出来。而工厂方法模式只是用于创建一个对象，这和抽象工厂模式有很大不同。

### 伪代码

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

### 小结

适用场景：

1. 如果希望一个系统独立于它的产品的**创建**，**组合**和**表示**的时候，换句话说，希望一个系统只是知道产品的接口，而不关心实现的时候；
1. 如果一个系统要由多个产品系列中的一个来配置的时候，换句话说，就是可以动态的切换**产品簇**的时候；
1. 如果要强调一系列相关产品的接口，以便联合使用它们的时候。

优点：

1. 分离接口和实现；
2. 使得切换产品簇变得容易。

缺点：

1. 抽象工厂添加新的产品，所有具体工厂都需要添加，违反开闭原则（一种方法是仅实现一个方法，根据参数再判断具体实现，这种方法不安全，因为返回的参数必须是所有产品的父类）；
2. 容易造成类层次复杂。

---

## 参考资料

- [Java 全栈知识体系](https://pdai.tech/md/dev-spec/pattern/1_overview.html)
- [设计模式也可以这么简单](https://javadoop.com/post/design-pattern)
- [工厂模式三兄弟 (Factory Pattern)](https://bytesfly.github.io/blog/#/DesignPattern/factory-pattern)