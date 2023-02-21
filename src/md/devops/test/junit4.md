---
title: 单元测试 - Junit4
date: 2023-02-21
category: 单元测试
---

> JUint 是 Java 编程语言的单元测试框架，用于编写和运行可重复的自动化测试。
> 本文主要介绍 JUnit4。

<!-- more -->

## 什么是 JUnit？

JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。

## JUnit 特点？

JUnit 是一个开放的资源框架，用于编写和运行测试。

提供注解来识别测试方法。提供断言来测试预期结果。JUnit 测试允许你编写代码更快，并能提高质量。JUnit 优雅简洁。没那么复杂，花费时间较少。JUnit测试可以自动运行并且检查自身结果并提供即时反馈。所以也没有必要人工梳理测试结果的报告。JUnit测试可以被组织为测试套件，包含测试用例，甚至其他的测试套件。JUnit在一个条中显示进度。如果运行良好则是绿色；如果运行失败，则变成红色。

## 如何使用

JUint 主要通过注解的形式，指定需要测试类运行环境、测试的方法，并提供断言工具来判断是否符合预期。

其 Maven 依赖：

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
```

## 常用注解介绍

### @Test

定义被标注的方法是一个测试方法，即需要测试。

:::warning
测试方法必须是public void，即公共、无返回数据。可以抛出异常（方法的预期可以是异常）。
:::

**指定超时时间**：方法执行超过这个时间，则会测试失败。例如：

```java
@Test(timeout = 1000)
public void testCase1() throws InterruptedException {
    TimeUnit.SECONDS.sleep(5000);
    System.out.println("in timeout exception");
}
```

**预期返回异常**：抛出指定的异常，测试通过；否则失败。例如：

```java
@Test(expected = ArithmeticException.class)
public void exceptionTest() {
    System.out.println("in exception success test");
    int a = 0;
    int b = 1 / a;
}
```

### @Ignore

执行单元测试时，会忽略使用该注解标注的方法；在运行结果中，junit会统计忽略的用例数，来提醒你。

:::tip
如果和 @Test 一起使用，会失效，即会加入单元测试中。
:::

### @BeforeClass

使用 @BeforeClass 标注的方法，会在其他测试方法执行前执行，通常用来做测试前的初始化操作；

在一次完整的单元测试生命周期中，**只会运行一次这个方法**，因此这个方法必须使用 `public static void` 修饰。

### @AfterClass

与 @BeforeClass 类似，不过是在其他测试方法执行后执行，通常用于处理一些测试后续工作，例如清理数据，恢复现场；

同样，在一次完整的单元测试生命周期中，**只会运行一次这个方法**，因此这个方法必须使用 `public static void` 修饰。

### @Before

@Before 与 @BeforeClass 类似但不同，它会在**每一个**测试用例方法执行**前**都执行一遍，主要用于一些独立于用例之间的准备工作；

因此这个方法必须使用 `public void` 修饰，且不能使用 `static` 修饰。

### @After

@After 与 @AfterClass 类似但不同，它会在**每一个**测试用例方法执行**后**都执行一遍，主要用于一些独立于用例之间的清理工作；

因此这个方法必须使用 `public void` 修饰，且不能使用 `static` 修饰。

### @Runwith

@Runwith 需要放在测试类名之前，通过指定**测试运行器**用来指定单元测试的运行环境，确定这个类怎么运行的，默认使用 `JUnit4.class`，常见的测试运行器如下：

1. @RunWith(Parameterized.class) 参数化运行器，配合 `@Parameters` 使用 junit 的参数化功能；
2. @RunWith(Suite.class) @SuiteClasses({ATest.class,BTest.class,CTest.class}) 测试集运行器配合使用测试集功能；
3. @RunWith(JUnit4.class) junit4的默认运行器
4. @RunWith(JUnit38ClassRunner.class) 用于兼容junit3.8的运行器
5. 一些其它运行器具备更多功能。例如@RunWith(SpringJUnit4ClassRunner.class)集成了spring的一些功能

### @Parameters

当使用 `@RunWith(Parameterized.class)` 标注测试类使用参数化运行器时，需要通过 `@Parameters` 指定参数列表方法，
该方法必须是一个使用 `public static` 修饰，返回类型为集合的无参方法，返回的集合为需要进行的测试数据列表。

例如：

```java
@Parameterized.Parameters
public static Collection primeNumbers() {
    return Arrays.asList(new Object[][]{
            {2, true},
            {6, false},
            {19, true},
            {22, false},
            {23, true}
    });
}
```

完整代码: [Click Here](https://github.com/AlexChen68/daydayup/blob/main/junit4/src/test/java/PrimeNumberCheckerTest.java)

## 单元测试用法

### 生命周期

由上述注解，我们知道了各类注解的作用，使用一个案例可以清晰的看出他们的执行顺序：

```java
@BeforeClass
public static void beforeClass() {
    System.out.println("in before class");
}

@AfterClass
public static void afterClass() {
    System.out.println("in after class");
}

@Before
public void before() {
    System.out.println("in before");
}

@After
public void after() {
    System.out.println("in after");
}

@Test
public void testCase1() {
    System.out.println("in test case 1");
}

@Test
public void testCase2() {
    System.out.println("in test case 2");
}
```

执行结果：

```java
in before class
in before
in test case 1
in after
in before
in test case 2
in after
in after class
```

由结果可以看出，@BeforeClass 和 @AfterClass 只会执行一次，分别在最开始和最后执行；

@Before 和 @After 会在每个用 @Test 标注的方法前后执行一次。

### 断言测试

JUnit 提供了一系列断言方法在 `org.junit.Assert` 中，当断言成立时，测试通过，否则失败。

例如，断言一个布尔值：

```java
@Test
public void testAssertTrue() {
    // 断言结果为 true，否则抛出 java.lang.AssertionError 异常，并展示错误信息 "failure - should be true"，测试未通过
    assertTrue("failure - should be true", true);
}

@Test
public void testAssertFalse() {
    assertFalse("failure - should be false", false);
}
```

断言是否为 null：

```java
@Test
public void testAssertNull() {
    assertNull("should be null", null);
}

@Test
public void testAssertNotNull() {
    assertNotNull("should not be null", new Object());
}
```

断言数组相等：

```java
@Test
    public void testAssertArrayEquals() {
        byte[] expected = "trial".getBytes();
        byte[] actual = "trial".getBytes();
        assertArrayEquals("failure - byte arrays not same", expected, actual);
    }
```

更多案例: [Click Here](https://github.com/junit-team/junit4/wiki/Assertions)

### 超时测试

如果一个测试的运行时间过长时，我们可以认为其测试未通过，因此需要一种方式来指定测试最多可以执行多长时间；

JUnit 可以在 `@Test` 注解中，设置 `timeout` 属性指定单个测试方法超时时间，例如：

```java
@Test(timeout = 1000)
public void testCase1() throws InterruptedException {
    TimeUnit.SECONDS.sleep(3000);
    System.out.println("in timeout exception");
}
```

执行结果（未通过）：

```java
org.junit.runners.model.TestTimedOutException: test timed out after 1000 milliseconds

	at java.lang.Thread.sleep(Native Method)
	at java.lang.Thread.sleep(Thread.java:342)
	at java.util.concurrent.TimeUnit.sleep(TimeUnit.java:386)
	at TimeoutTest.testCase1(TimeoutTest.java:13)
```

如果有很多测试方法，一个个地指定超时时间很麻烦，而且不好修改，此时可以通过设定**超时规则**，并应用到测试类的所有测试用例。

看看下面的例子：

```java
private final CountDownLatch latch = new CountDownLatch(1);

@Rule
public Timeout globalTimeout = Timeout.seconds(3); // 3 seconds max per method tested

@Test
public void testSleepForTooLong() throws Exception {
    TimeUnit.SECONDS.sleep(5); // sleep for 5 seconds
}

@Test
public void testBlockForever() throws Exception {
    latch.await(); // will block
}
```

执行结果：

```java
org.junit.runners.model.TestTimedOutException: test timed out after 3 seconds
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer.parkAndCheckInterrupt(AbstractQueuedSynchronizer.java:836)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer.doAcquireSharedInterruptibly(AbstractQueuedSynchronizer.java:997)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer.acquireSharedInterruptibly(AbstractQueuedSynchronizer.java:1304)
	at java.util.concurrent.CountDownLatch.await(CountDownLatch.java:231)
	at HasGlobalTimeoutTest.testBlockForever(HasGlobalTimeoutTest.java:27)

org.junit.runners.model.TestTimedOutException: test timed out after 3 seconds
	at java.lang.Thread.sleep(Native Method)
	at java.lang.Thread.sleep(Thread.java:342)
	at java.util.concurrent.TimeUnit.sleep(TimeUnit.java:386)
	at HasGlobalTimeoutTest.testSleepForTooLong(HasGlobalTimeoutTest.java:22)
```

可以看到，两个测试方法都会在执行超过 3 秒时抛异常且未通过测试。

### 套件测试

**套件测试**是指捆绑了几个单元测试用例并运行起来，在JUnit中，@RunWith 和 @Suite 这两个注解是用来运行套件测试。

我们来试一下，先创建两个测试类，然后在第三个测试类中，使用 @RunWith 和 @Suite 同时运行这两个测试类：

```java
// JunitTest1.java
public class JunitTest1 {

    @Test
    public void printMessage(){
        System.out.println("in JunitTest1");
    }
}

// JunitTest2.java
public class JunitTest2 {

    @Test
    public void printMessage(){
        System.out.println("in JunitTest2");
    }
}

// JunitSuiteTest.java
@RunWith(Suite.class)
@Suite.SuiteClasses({
        JunitTest1.class, //此处类的配置顺序会影响执行顺序
        JunitTest2.class
})
public class JunitSuiteTest {

    /**
     * 这里的 test 不会生效了
     */
    @Test
    public void printMessage(){
        System.out.println("Suite Test");
    }
}
```

执行结果：

```java
in JunitTest1
in JunitTest2
```

:::warning
使用了 @Suite.SuiteClasses 注解的测试类，其本身被 @Test 标注的方法会失效，无法成为一个测试方法。
:::

## 参考资料

- [JUnit4 官方文档](https://junit.org/junit4/)
- [Java 全栈知识体系](https://pdai.tech/md/develop/ut/dev-ut-x-junit.html)



