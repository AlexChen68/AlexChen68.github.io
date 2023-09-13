---
title: 类加载器和双亲委派机制
date: 2023-04-13
---

## 类加载过程

一个类从被加载到虚拟机内存中开始，到从内存中卸载，整个生命周期需要经过七个阶段：加载（Loading）、验证（Verification）、准备（Preparation）、解析（Resolution）、初始化（Initialization）、使用（Using）和卸载（Unloading），其中验证、准备、解析三个部分统称为连接（Linking）。

![类加载过程](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/java/类加载过程.jpeg)

《虚拟机规范》严格规定了有且只有六种情况必须立即对类进行“初始化”：Java 

- 1）遇到 new、getstatic、putstatic 或 invokestatic 这四条字节码指令时，如果类型没有进行过初始化，则需要先触发其初始化阶段。
- 2）使用 java.lang.reflect 包的方法对类型进行反射调用的时候，如果类型没有进行过初始化，则需要先触发其初始化。
- 3）当初始化类的时候，如果发现其父类还没有进行过初始化，则需要先触发其父类的初始化。
- 4）当虚拟机启动时，用户需要指定一个要执行的主类（包含 main() 方法的那个类），虚拟机会先初始化这个主类。
- 5）当使用 JDK 7 新加入的动态语言支持时，如果一个 java.lang.invoke.MethodHandle 实例最后的解析结果为 REF_getStatic、REF_putStatic、REF_invokeStatic、REF_newInvokeSpecial 四种类型的方法句柄，并且这个方法句柄对应的类没有进行过初始化，则需要先触发其初始化。
- 6）当一个接口中定义了 JDK 8 新加入的默认方法（被 default 关键字修饰的接口方法）时，如果有这个接口的实现类发生了初始化，那该接口要在其之前被初始化。

这六种场景中的行为称为对一个类型进行主动引用。

接下来我们来详细学习 Java 虚拟机中类加载的全过程，即加载、验证、准备、解析和初始化。

### 加载

加载是 JVM 加载的起点，具体什么时候开始加载，《Java 虚拟机规范》中并没有进行强制约束，可以交给虚拟机的具体实现来自由把握。

在加载过程，JVM 要做三件事情：

![JVM 类加载之加载](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/java/JVM类加载之加载.webp)

### 验证

---

## 参考资料

- [【JVM 进阶之路】之：类加载过程](https://zhuanlan.zhihu.com/p/375698188)