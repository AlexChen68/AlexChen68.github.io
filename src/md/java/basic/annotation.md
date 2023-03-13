---
title: Java 注解机制
date: 2022-09-30
category: Java
tag: annotaion
order: 5
---


<!-- more -->

## 简介

注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。

**注解的优点**：

1. 通过使用注解，你可以将元数据保存在 Java 源代码中。
2. 简单易读的代码。
3. 编译器类型检查。
4. 使用 annotation API 为自己的注解构造处理工具。

在 `java.lang` 包中，**内置**了一些注解：

- `@Override`:表示当前的方法定义将覆盖基类的方法。如果你不小心拼写错误，或者方法签名被错误拼写的时候，编译器就会发出错误提示。
- `@Deprecated`:如果使用该注解的元素被调用，编译器就会发出警告信息。
- `@SuppressWarnings`:关闭不当的编译器警告信息。
- `@SafeVarargs`:在 Java 7 中加入用于禁止对具有泛型 varargs 参数的方法或构造函数的调用方发出警告。
- `@FunctionalInterface`:Java 8 中加入用于表示类型声明为函数式接口。

此外，在 `java.lang.annotaion` 包下还有几种**元注解**用于创造新的注解：

- `@Target` 定义你的注解可以应用在哪里(例如是方法还是字段)。
- `@Retention` 定义了注解在哪里可用，在源代码中(SOURCE)，class 文件(CLASS)中或者是在运行时(RUNTIME)。
- `@Inherited` 用于标明注解可继承。
- `@Documented` 用于标明是否生成 javadoc 文档。

:::tip
注解是不可以**继承**的，编译后会自动继承 `java.lang.annotation.Annotation` 接口
:::

## 元注解

1. `@Target`

`@Target` 的作用：描述注解的使用范围，即注明被修饰的注解可以用在什么地方，其包含一个类型为 ElementType 数组的 value 属性 `ElementType[] value();`

`ElementType` 的枚举如下：

```java
public enum ElementType {
 
    TYPE, // 类、接口、枚举类
 
    FIELD, // 成员变量（包括：枚举常量）
 
    METHOD, // 成员方法
 
    PARAMETER, // 方法参数
 
    CONSTRUCTOR, // 构造方法
 
    LOCAL_VARIABLE, // 局部变量
 
    ANNOTATION_TYPE, // 注解类
 
    PACKAGE, // 可用于修饰：包
 
    TYPE_PARAMETER, // 类型参数，JDK 1.8 新增
 
    TYPE_USE // 使用类型的任何地方，JDK 1.8 新增
}
```

2. `@Retention`

`@Retention` 的作用: 描述注解保留的时间范围，即被描述的注解在它所修饰的类中可以被保留到何时，共有三种策略，定义在 `RetentionPolicy` 枚举中:

```java
public enum RetentionPolicy {
 
    SOURCE,    // 源文件保留
    CLASS,       // 编译期保留，默认值
    RUNTIME   // 运行期保留，可通过反射去获取注解信息
}
```
3. `@Documented`

`@Documented` 的作用：描述在使用 javadoc 工具为类生成帮助文档时是否要保留其注解信息。

这个很好理解，加了这个元注解的注解，会出现在 javadoc 生成的文档中。

4. `@Inherited`

`@Inherited` 的作用：被它修饰的注解将具有继承性。

如果某个类使用了被 `@Inherited` 修饰的注解，则其子类将自动具有该注解。

5. `@Repeatable` (Java8)

允许在同一申明类型(类，属性，或方法)的多次使用同一个注解。

例如：

```java
@Repeatable(Authorities.class)
public @interface Authority {
     String role();
}

public @interface Authorities {
    Authority[] value();
}

public class RepeatAnnotationUseNewVersion {
    @Authority(role="Admin")
    @Authority(role="Manager")
    public void doSomeThing(){ }
}
```

6. `@Native` (Java8)

使用 @Native 注解修饰成员变量，则表示这个变量可以被本地代码引用，常常被代码生成工具使用。

## 自定义注解

如下是一个注解的定义。注解的定义看起来很像接口的定义。事实上，它们和其他 Java 接口一样，也会被编译成 class 文件。

示例，定义一个日志注解：

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Log {

    /**
     * 描述
     * @return {String}
     */
    String value() default "";

    /**
     * spel 表达式
     * @return 日志描述
     */
    String expression() default "";
}
```

## 反射获取注解信息

使用注解，可以将一些元信息存储在源代码中，通常，我们会在另外的地方，通过 Java 反射机制获取注解中的信息。

在 Java 的反射包 `java.lang.reflect` 的 `AnnotatedElement` 接口中，提供了获取注解对象的方法；

我们可以通过先获取 `class` 或者 `method` 对象（它们都实现了 `AnnotatedElement` 接口），再从中获取到注解对象，进行从注解对象中获取注解的元数据。

以上面的 `@Log` 注解为例：

```java
public class ReflectDemo {

    @Log(value = "反射测试")
    public void annotationTest() {
        //
    }
    public static void main(String[] args) throws NoSuchMethodException {
        // 获取 Class 对象
        Class<ReflectDemo> serviceClass = ReflectDemo.class;
        // 获取 Method 对象
        Method method = serviceClass.getMethod("annotationTest");
        // 获取 Log 注解对象
        Log annotation = method.getAnnotation(Log.class);
        System.out.println(annotation.value());
    }
}
```

:::warning
只有注解被定义为 **RUNTIME** 后，该注解才能是运行时可见，当 class 文件被装载时被保存在 class 文件中的 Annotation 才会被虚拟机读取。
:::

## 自定义注解结合 AOP

SpringBoot AOP 最常见的实践就是使用自定义的日志注解，通过切面编程将操作日志进行统一处理。

其伪代码如下：

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SysLog {

    String value() default "";
}
```

```java
@Slf4j
@Aspect
@AllArgsConstructor
public class SysLogAspect {

    private final ApplicationEventPublisher publisher;

    @Around("@annotation(sysLog)")
    public Object around(ProceedingJoinPoint point, SysLog sysLog) {
        // 获取切点信息
        String className = point.getTarget().getClass().getName();
        String methodName = point.getSignature().getName();
        log.debug("[类名]:{},[方法]:{}", className, methodName);

        Object result;
        SysLogInfo logInfo = new SysLogInfo();
        logInfo.setTitle(sysLog.value());
        // 执行切点代码
        Long startTime = System.currentTimeMillis();
        try {
            result = point.proceed();
        } catch (Throwable e) {
            logInfo.setLogType(LogTypeEnum.ERROR.getTypeId());
            logInfo.setException(e.getMessage());
            throw new RuntimeException(e);
        } finally {
            Long endTime = System.currentTimeMillis();
            logInfo.setTime(endTime - startTime);
            // 发布事件，由 SysLogListener 异步处理
            publisher.publishEvent(new SysLogEvent(logInfo));
        }
        return result;
    }
}
```

---

## 参考资料

- [注解机制详解 - Java 全栈知识体系]([https://](https://pdai.tech/md/java/basic/java-basic-x-annotation.html))
