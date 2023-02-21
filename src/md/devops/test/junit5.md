---
title: 单元测试 - JUnit5
date: 2023-02-21
category: 单元测试
---

JUnit 5 是 JUnit 的下一代，目标是为JVM上的开发人员端测试创建一个最新的基础。

这包括专注于Java 8及更高版本，以及启用许多不同风格的测试。

<!-- more -->

## JUnit5 简介

JUnit5 由三个子项目中的不同模块组成：

> JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage

- **JUnit Platform** 是基于 JVM 的运行测试的基础框架在，它定义了开发运行在这个测试框架上的 TestEngine API。此外该平台提供了一个控制台启动器，可以从命令行启动平台，可以为Gradle 和 Maven 构建插件，同时提供基于 JUnit 4 的 Runner。

- **JUnit Jupiter** 是在 JUnit 5 中编写测试和扩展的新编程模型和扩展模型的组合。Jupiter子项目提供了一个 TestEngine 在平台上运行基于 Jupiter 的测试。

- **JUnit Vintage** 提供了一个 TestEngine 在平台上运行基于 JUnit 3 和 JUnit 4 的测试。

![JUnit5](https://pdai.tech/images/develop/ut/dev-ut-1.png)

## 常用注解
JUnit Jupiter 支持以下注解来配置测试和扩展框架。
除非另有说明，否则所有核心注解都位于模块 `junit-jupiter-api` 的 `org.junit.jupiter.api` 包中。

| 注解                 | 描述                                                         |
| :------------------- | :----------------------------------------------------------- |
| `@Test`              | 表示方法是测试方法。与 JUnit 4 的注解不同，此注解不声明任何属性，因为 JUnit Jupiter 中的测试扩展基于它们自己的专用注解运行。 |
| `@ParameterizedTest` | 表示方法是[参数化测试](https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests)。 |
| `@RepeatedTest`      | 表示方法是重复测试的[测试](https://junit.org/junit5/docs/current/user-guide/#writing-tests-repeated-tests)模板。 |
| `@TestFactory`       | 表示方法是[动态测试工厂](https://junit.org/junit5/docs/current/user-guide/#writing-tests-dynamic-tests)。 |
| `@DisplayName`       | 声明测试类或测试方法的自定义[显示名称](https://junit.org/junit5/docs/current/user-guide/#writing-tests-display-names)。此类批注不会*继承*。 |
| `@BeforeEach`        | 类似于 JUnit 4 的 `@Before`，被标注的方法应在当前类中的每个测试方法**之前**执行; |
| `@AfterEach`         | 类似于 JUnit 4 的 `@After`，被标注的方法应在当前类中的每个测试方法**之后**执行; |
| `@BeforeAll`         | 类似于 JUnit 4 的 `@BeforeClass`，被标注的方法应在当前类中的每个测试方法**之前**执行; |
| `@AfterAll`          | 类似于 JUnit 4 的 `@AfterClass`，被标注的方法应在当前类中的每个测试方法**之后**执行; |
| `@Nested`            | 表示带注解的类是嵌套的非静态测试类，`@BeforeAll`和 `@AfterAll`方法**不能**直接在@Nested测试类中使用，除非修改测试实例生命周期。 |
| `@Tag`               | 用于在类或方法级别声明用于过滤测试的标记。                   |
| `@Disabled`          | 类似于 JUnit 4 的`@Ignore`，用于禁用测试类或测试方法。       |
| `@Timeout`           | 用于在测试、测试工厂、测试模板或生命周期方法的执行超过给定持续时间时使其失败。 |
| `@ExtendWith`        | 用于以声明方式注册自定义扩展。                               |
| `@TempDir`           | 用于在生命周期方法或测试方法中通过字段注入或参数注入提供临时目录;位于包 `org.junit.jupiter.api.io` 中。 |

## 编写单元测试

### Maven 依赖

最新的 Maven 依赖：[Click Here](https://junit.org/junit5/docs/current/user-guide/#running-tests)

```xml
<dependencies>
    <!-- Only needed to run tests in a version of IntelliJ IDEA that bundles older versions -->
    <dependency>
        <groupId>org.junit.platform</groupId>
        <artifactId>junit-platform-launcher</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-engine</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.junit.vintage</groupId>
        <artifactId>junit-vintage-engine</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.junit</groupId>
            <artifactId>junit-bom</artifactId>
            <version>5.9.2</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

### 生命周期

JUnit5 有一套与 JUnit4 相对应的生命周期注解，具体见 [常用注解](#常用注解)。

代码示例：

```java
@BeforeAll
static void initAll() {
    System.out.println("initAll");
}

@BeforeEach
void init() {
    System.out.println("init");
}

@Test
void succeedingTest() {
    System.out.println("succeedingTest");
}

@Test
void failingTest() {
    System.out.println("failingTest");
    fail("a failing test");
}

@Test
@Disabled("for demonstration purposes")
void skippedTest() {
    // not executed
    System.out.println("skippedTest");
}

@Test
void abortedTest() {
    System.out.println("abortedTest");
    assumeTrue("abc".contains("Z"));
    fail("test should have been aborted");
}

@AfterEach
void tearDown() {
    System.out.println("tearDown");
}

@AfterAll
static void tearDownAll() {
    System.out.println("tearDownAll");
}
```

执行结果：

```java
initAll

init
succeedingTest
tearDown

init
failingTest
tearDown

org.opentest4j.AssertionFailedError: a failing test
	at org.junit.jupiter.api.AssertionUtils.fail(AssertionUtils.java:38)
	at org.junit.jupiter.api.Assertions.fail(Assertions.java:135)
	at StandardTests.failingTest(StandardTests.java:30)
    // ...

for demonstration purposes

init
abortedTest
tearDown

org.opentest4j.TestAbortedException: Assumption failed: assumption is not true
	at org.junit.jupiter.api.Assumptions.throwAssumptionFailed(Assumptions.java:316)
	at org.junit.jupiter.api.Assumptions.assumeTrue(Assumptions.java:115)
	at org.junit.jupiter.api.Assumptions.assumeTrue(Assumptions.java:66)
	at StandardTests.abortedTest(StandardTests.java:43)
	// ...

tearDownAll
```

### 断言测试

:::tip
一般的断言，无非是检查一个实例的属性（比如，判空与判非空等），或者对两个实例进行比较（比如，检查两个实例对象是否相等）等。

无论哪种检查，断言方法都可以接受一个字符串作为最后一个可选参数，它会在断言失败时提供必要的描述信息。

如果提供出错信息的过程比较复杂，它也可以被包装在一个 lambda 表达式中，这样，只有到真正失败的时候，消息才会真正被构造出来。
:::

在 JUnit5 中，提供了强大的断言类 `Assertions`，通过该类中的 `assert*` 的方法，可以推断出该方法的断言条件；

相比于 JUnit4，提供了几个特殊的断言方法。

- **fail()**: 显式地使单元测试失败；
- **assertThrows(Class\<T\> expectedType, Executable executable)**: 断言 `executable` 的操作抛出 `expectedType` 指定的异常；
- **assertTimeout(Duration timeout, Executable executable)**: 断言 `executable` 的操作超过 `timeout` 指定的时间，会在测试方法执行完毕后才断言失败；
- **assertTimeoutPreemptively(Duration timeout, Executable executable)**: 断言 `executable` 的操作超过 `timeout` 指定的时间，会在测试方法超时时立即断言失败。

## 参考资料

- [JUnit5 官方文档](https://junit.org/junit5/docs/current/user-guide/#overview)
- [Java 全栈知识体系](https://pdai.tech/md/develop/ut/dev-ut-x-junit5.html)