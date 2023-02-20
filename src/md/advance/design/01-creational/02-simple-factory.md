---
title: 简单工厂模式
date: 2022-09-27
category: 设计模式
description: 简单工厂模式
---

设计模式之简单工厂
<!-- more -->



### 简单工厂(Simple Factory)

**定义**

> 定义一个工厂类，可以根据传入的参数不同创建不同类实例，被创建的实例通常都有相同的父类。 简单工厂模式在java中得到了大量的使用，它属于创建型的设计模式，但是它不属于GOF23设计模式中的一种。
>
> 工厂模式提供公共的接口，客户端直接使用公共接口来创建对象，客户端这边不关心对象是怎么创建的，其中包含3个角色：工厂角色，抽象产品角色，具体产品角色。
> 工厂角色是简单工厂模式的核心，负责产品实例的内部逻辑；
> 抽象产品角色是所有具体产品角色的父类，封装了公共的方法；
> 具体产品角色是工厂角色创建的目标对象。
>
> 因为简单工厂模式将对象的创建和使用分离，使得系统更加符合单一职责原则。

**适用场景**

1. 工厂类创建的对象比较少；
2. 客户端只需要传入某个参数，对如何创建对象不关心。

**优点**

1. 只需要传入参数就可以获取到需要的对象，客户端使用简单；
2. 通过反射或者配置文件，可以在不修改任何代码的情况下更换或者新增产品类，提供系统的灵活性；
3. 让创建和使用进行分离。

**缺点**

1. 工厂类的职责比较重，如果新增一些类，需要修改工厂类判断逻辑，违背了开闭原则；
2. 增加类的个数，增加系统的复杂性和理解难度。

**代码示例**

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