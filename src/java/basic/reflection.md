---
title: Java 反射机制
order: 6
category: Java
date: 2023-04-13
---

## Java 反射机制简介

反射 (Reflection)，是指 Java 程序具有在*运行期***分析类以及修改其本身状态或行为的能力**。
通俗点说就是：通过反射我们可以动态地获取一个类的所有属性和方法，还可以操作这些方法和属性。

## 类加载机制

一个类从被加载到虚拟机内存中开始，到从内存中卸载，整个生命周期需要经过七个阶段：加载（Loading）、验证（Verification）、准备（Preparation）、解析（Resolution）、初始化（Initialization）、使用（Using）和卸载（Unloading），其中验证、准备、解析三个部分统称为连接（Linking）。

![类加载过程](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/java/类加载过程.jepg)

更具体的，可以参考 [JVM 类加载过程](../jvm/load)

## 反射相关的类

- Class 类
- Field 类
- Method 类
- Constructor 类

### Class 类

Class 类，Class 类也是一个实实在在的类，存在于 JDK 的 java.lang 包中。

Class 类的实例表示 java 应用运行时的类 (class ans enum) 或接口 (interface and annotation)。

Class 类可以通过如下三种方式获得：

1. 类名.class
2. 实例.getClass()
3. Class.forName("类名")

```java
// 方式一
Class<ReflectDemo> clazz1 = ReflectDemo.class;

// 方式二
ReflectDemo demo = new ReflectDemo();
Class<? extends ReflectDemo> clazz2 = demo.getClass();

// 方式三
Class<?> clazz3 = Class.forName("tech.alexchen.java.basic.reflection.ReflectDemo");
```

:::tip
**数组**同样也被映射为 class 对象的一个类，所有具有相同元素类型和维数的数组都共享该 Class 对象。

**基本类型** boolean，byte，char，short，int，long，float，double 和关键字 void 同样表现为 class 对象。
:::

Class 类定义：

```java
public final class Class<T> implements java.io.Serializable,
                              GenericDeclaration,
                              Type,
                              AnnotatedElement {
    private static final int ANNOTATION= 0x00002000;
    private static final int ENUM      = 0x00004000;
    private static final int SYNTHETIC = 0x00001000;

    private static native void registerNatives();
    static {
        registerNatives();
    }

    /*
     * Private constructor. Only the Java Virtual Machine creates Class objects.   //私有构造器，只有 JVM 才能调用创建 Class 对象
     * This constructor is not used and prevents the default constructor being
     * generated.
     */
    private Class(ClassLoader loader) {
        // Initialize final field for classLoader.  The initialization value of non-null
        // prevents future JIT optimizations from assuming this final field is null.
        classLoader = loader;
    }
}
```

到这我们也就可以得出以下几点信息：

- Class 类也是类的一种，与 class 关键字是不一样的。
- 手动编写的类被编译后会产生一个 Class 对象，其表示的是创建的类的类型信息，而且这个 Class 对象保存在同名.class 的文件中 (字节码文件)
- 每个通过关键字 class 标识的类，在内存中有且只有一个与之对应的 Class 对象来描述其类型信息，无论创建多少个实例对象，其依据的都是用一个 Class 对象。
- Class 类只存私有构造函数，因此对应 Class 对象只能有 JVM 创建和加载
- Class 类的对象作用是运行时提供或获得某个对象的类型信息，这点对于反射技术很重要 (关于反射稍后分析)。

### Constructor 类

用 new 的形式创建一个类的对象实际上是在调用它的构造方法，反射机制中可以通过 Constructor 对象来创建一个类的对象。

Constructor 对象可以通过 Class 对象的 `getConstructor(Class<?>... parameterTypes)` 的相关方法获得，需要注意的是，一个类可能有多个构造方法，那么需要在调用 getConstructor 方法的时候，传入与构造方法相匹配的参数的 Class 对象，才能获得对应参数的构造方法；如果不传入参数，那么获取的自然就是无参方法了。

常用的方法如下：

- `Constructor<?>[] getConstructors()`: 获取访问权限是 public 的构造方法数组
- `Constructor<?>] getDeclaredConstructors()`: 获取全部的构造方法数组
- `Constructor<T> getConstructor(Class<?>... parameterTypes)`: 获取与传入参数类型相匹配的、且访问权限是 public 的构造方法
- `Constructor<T> getDeclaredConstrutor(Class<?>... parameterTypes)`: 获取与传入参数类型相匹配的构造方法

```java
Class<People> clazz = People.class;
// 获取无参构造方法
Constructor<People> constructor = clazz.getConstructor();
```

通过 Constructor 对象，我们可以直接通过其 `newInstance()` 方法创建实例；如果构造方法是私有的，还可以通过 `setAccessible(true)` 改变其可访问范围，然后再创建实例。

```java
// People.class
// 设置无参构造函数为私有的
private People() {}

// 构造实例
constructor.setAccessible(true);  // 设置允许访问
People people = constructor.newInstance();
```

### Field 类

Field 提供有关类或接口的单个字段的信息，以及对它的动态访问权限。反射的字段可能是一个类（静态）字段或实例字段。

Filed 可以通过 Class 的 `getFileds` 相关方法获得，包括：

- `getFields()`: 获取所有被 public 修饰的属性
- `getField(String name)`: 获取指定名称的、被 public 修饰的属性
- `getDeclaredFields()`: 获取所有定义的属性
- `getDeclaredField(String name)`: 获取指定名称的属性

通过 Field 对象，我们获取属性的信息，也可以对属性进行赋值，但是需要先获取到实例对象，并指定为哪个具体的实例对象赋值。

```java
// 获取无参构造函数（这里使用无参构造函数为共有了，符合一般使用习惯）
Constructor<People> constructor = clazz.getDeclaredConstructor();
People people = constructor.newInstance();

// 获取指定名称的属性
Field nameField = clazz.getDeclaredField("name");

// name 字段是私有的（按照规范，通常属性都是私有的），需要先设置为允许访问
nameField.setAccessible(true);
nameField.set(people, "zhangsan");
```

### Method 类

Method 提供关于类或接口上单独某个方法（以及如何访问该方法）的信息，所反映的方法可能是类方法或实例方法（包括抽象方法）。

同样，Class 提供了获取 Method 的方法：

- `getDeclaredMethod(String name, Class<?>... parameterTypes)`: 返回一个指定参数的 Method 对象，该对象反映此 Class 对象所表示的类或接口的指定已声明方法。
- `getDeclaredMethods()`: 返回 Method 对象的一个数组，这些对象反映此 Class 对象表示的类或接口声明的所有方法，包括公共、保护、默认（包）访问和私有方法，但不包括继承的方法。
- `getMethod(String name, Class<?>... parameterTypes)`: 返回一个 Method 对象，它反映此 Class 对象所表示的类或接口的指定公共成员方法。
- `getMethods()`: 返回一个包含某些 Method 对象的数组，这些对象反映此 Class 对象所表示的类或接口（包括那些由该类或接口声明的以及从超类和超接口继承的那些的类或接口）的公共 member 方法。

再获取到 Method 对象后，可以使用 Method 类的 `invoke(Object obj, Object... args)` 方法来动态调用类的方法，第一个参数代表调用的对象，第二个参数传递的调用方法的参数。

### 反射机制执行流程

![反射机制执行流程](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/java/反射机制执行流程.png)

## 总结

最后，用几句话总结反射的实现原理：

1. 反射类及反射方法的获取，都是通过从列表中搜寻查找匹配的方法，所以查找性能会随类的大小方法多少而变化；
2. 每个类都会有一个与之对应的 Class 实例，从而每个类都可以获取 method 反射方法，并作用到其他实例身上；
3. 反射也是考虑了线程安全的，放心使用；
4. 反射使用软引用 relectionData 缓存 class 信息，避免每次重新从 jvm 获取带来的开销；
5. 反射调用多次生成新代理 Accessor, 而通过字节码生存的则考虑了卸载功能，所以会使用独立的类加载器；
6. 当找到需要的方法，都会 copy 一份出来，而不是使用原来的实例，从而保证数据隔离；
7. 调度反射方法，最终是由 jvm 执行 invoke0() 执行；

## 参考资料

- [Java 基础 - 反射机制详解](https://pdai.tech/md/java/basic/java-basic-x-reflection.html)
- [Java 反射机制是什么？](https://www.zhihu.com/question/585913105/answer/2948150246)
