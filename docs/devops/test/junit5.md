---
title: 单元测试 - JUnit5
date: 2023-02-21
---

> JUnit 5 是 JUnit 的下一代，目标是为JVM上的开发人员端测试创建一个最新的基础。
> 
> 这包括专注于Java 8及更高版本，以及启用许多不同风格的测试。

<!-- more -->

## JUnit5 简介

JUnit5 由三个子项目中的不同模块组成：

> JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage

- `JUnit Platform` 是基于 JVM 的运行测试的基础框架在，它定义了开发运行在这个测试框架上的 TestEngine API。此外该平台提供了一个控制台启动器，可以从命令行启动平台，可以为Gradle 和 Maven 构建插件，同时提供基于 JUnit 4 的 Runner。

- `JUnit Jupiter` 是在 JUnit 5 中编写测试和扩展的新编程模型和扩展模型的组合。Jupiter子项目提供了一个 TestEngine 在平台上运行基于 Jupiter 的测试。

- `JUnit Vintage` 提供了一个 TestEngine 在平台上运行基于 JUnit 3 和 JUnit 4 的测试。

![JUnit5](https://pdai.tech/images/develop/ut/dev-ut-1.png)

## 常用注解
JUnit Jupiter 支持以下注解来配置测试和扩展框架。
除非另有说明，否则所有核心注解都位于模块 `junit-jupiter-api` 的 `org.junit.jupiter.api` 包中。

| 注解                 | 描述                                                         |
| :------------------- | :----------------------------------------------------------- |
| `@Test`              | 表示方法是测试方法。与 JUnit 4 的注解不同，此注解不声明任何属性，因为 JUnit Jupiter 中的测试扩展基于它们自己的专用注解运行。 |
| `@ParameterizedTest` | 表示方法是[参数化测试](#参数化测试)。 |
| `@RepeatedTest`      | 表示方法是[重复测试](#重复测试)。 |
| `@TestFactory`       | 表示方法是[动态测试工厂](#动态测试)。 |
| `@DisplayName`       | 声明测试类或测试方法的自定义显示名称。此类批注不会*继承*。|
| `@BeforeEach`        | 类似于 JUnit 4 的 `@Before`，被标注的方法应在当前类中的每个测试方法**之前**执行; |
| `@AfterEach`         | 类似于 JUnit 4 的 `@After`，被标注的方法应在当前类中的每个测试方法**之后**执行; |
| `@BeforeAll`         | 类似于 JUnit 4 的 `@BeforeClass`，被标注的方法应在当前类中的每个测试方法**之前**执行; |
| `@AfterAll`          | 类似于 JUnit 4 的 `@AfterClass`，被标注的方法应在当前类中的每个测试方法**之后**执行; |
| `@Nested`            | 表示带注解的类是嵌套的非静态测试类，`@BeforeAll`和 `@AfterAll`方法**不能**直接在 `@Nested` 测试类中使用，除非修改测试实例生命周期。 |
| `@Tag`               | 用于在类或方法级别声明用于过滤测试的标记。                   |
| `@Disabled`          | 类似于 JUnit 4 的 `@Ignore`，用于禁用测试类或测试方法。       |
| `@Timeout`           | 用于在测试、测试工厂、测试模板或生命周期方法的执行超过给定持续时间时使其失败。 |
| `@ExtendWith`        | 用于以声明方式注册自定义扩展。                               |
| `@TempDir`           | 用于在生命周期方法或测试方法中通过字段注入或参数注入提供临时目录;位于包 `org.junit.jupiter.api.io` 中。 |

## 编写单元测试

### Maven 依赖

最新的 Maven 依赖：[Click Here](https://junit.org/junit5/docs/current/user-guide/#running-tests)

```xml
<dependencies>
    <!-- junit 平台，包含了 junit-platform-engine -->
    <dependency>
        <groupId>org.junit.platform</groupId>
        <artifactId>junit-platform-launcher</artifactId>
        <scope>test</scope>
    </dependency>
    <!-- 新的 Junit 引擎，包含了 junit-jupiter-api（JUnit5 主要使用的包）-->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-engine</artifactId>
        <scope>test</scope>
    </dependency>
    <!-- 兼容旧 Junit 的引擎，包含 junit4 -->
    <dependency>
        <groupId>org.junit.vintage</groupId>
        <artifactId>junit-vintage-engine</artifactId>
        <scope>test</scope>
    </dependency>
    <!-- JUnit 参数化测试 -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-params</artifactId>
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

- `fail()`: 显式地使单元测试失败；
- `assertThrows(Class\<T\> expectedType, Executable executable)`: 断言 `executable` 的操作抛出 `expectedType` 指定的异常；
- `assertTimeout(Duration timeout, Executable executable)`: 断言 `executable` 的操作超过 `timeout` 指定的时间，会在测试方法执行完毕后才断言失败；
- `assertTimeoutPreemptively(Duration timeout, Executable executable)`: 断言 `executable` 的操作超过 `timeout` 指定的时间，会在测试方法超时时立即断言失败。

### 嵌套测试

嵌套测试给测试编写者更多的能力，来表达几组测试之间的关系；

```java
@DisplayName("A stack")
public class NestedTest {

    Stack stack;

    @Test
    @DisplayName("is instantiated with new Stack()")
    void isInstantiatedWithNew() {
        new Stack<>();
    }

    @Nested
    @DisplayName("when new")
    class WhenNew {
        @BeforeEach
        void createNewStack() {
            stack = new Stack<>();
        }

        @Test
        @DisplayName("is empty")
        void isEmpty() {
            assertTrue(stack.isEmpty());
        }

        @Test
        @DisplayName("throws EmptyStackException when popped")
        void throwsExceptionWhenPopped() {
            assertThrows(EmptyStackException.class, () -> stack.pop());
        }

        @Test
        @DisplayName("throws EmptyStackException when peeked")
        void throwsExceptionWhenPeeked() {
            assertThrows(EmptyStackException.class, () -> stack.peek());
        }

        @Nested
        @DisplayName("after pushing an element")
        class AfterPushing {
            String anElement = "an element";

            @BeforeEach
            void pushAnElement() {
                stack.push(anElement);
            }

            @Test
            @DisplayName("it is no longer empty")
            void isNotEmpty() {
                assertFalse(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when popped and is empty")
            void returnElementWhenPopped() {
                assertEquals(anElement, stack.pop());
                assertTrue(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when peeked but remains not empty")
            void returnElementWhenPeeked() {
                assertEquals(anElement, stack.peek());
                assertFalse(stack.isEmpty());
            }
        }
    }
}
```

执行结果：

![嵌套测试执行结果](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/devops/junit5_nested.png)

### 重复测试

@RepeatedTest 表示该测试方法可以重复执行测试，它有两个属性：

- `value`: 指定重复执行的次数；
- `name`: 自定义显示名称，支持以下占位符
    - `{displayName}`: 测试方法的显示名称
    - `{currentRepetition}`: 当前重复次数
    - `{totalRepetitions}`: 重复的总次数

代码示例：

```java
//   @RepeatedTest(value = 3, name = "{displayName} {currentRepetition}/{totalRepetitions}")
@RepeatedTest(value = 3, name = LONG_DISPLAY_NAME)
@DisplayName("RepeatTest")
void customDisplayName(TestInfo testInfo, RepetitionInfo repetitionInfo) {
    int currentRepetition = repetitionInfo.getCurrentRepetition();
    int totalRepetitions = repetitionInfo.getTotalRepetitions();
    String methodName = testInfo.getTestMethod().get().getName();

    System.out.println(String.format("About to execute repetition %d of %d for %s", //
            currentRepetition, totalRepetitions, methodName));
}
```

执行结果：
![重复测试执行结果](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/devops/junit5_repeat.png)

### 参数化测试

JUnit5 在 `org.junit.jupiter.params.provider` 包中提供了很多 **resource** 注解：

- @ValueSource

@ValueSource 可以通过指定原生类型数组，为测试提供一组参数，每次测试使用一个参数，例如一个 int 数组参数可以设置为：

```java
@ParameterizedTest
@ValueSource(ints = {1, 2, 3})
void testWithValueSource(int argument) {
    assertNotNull(argument);
}
```

- @EnumSource

@EnumSource 用来指定一个枚举类作为参数，可以通过 `names` 属性指定需要参与测试的枚举值，如果不指定，则默认全部参与测试：

```java
@ParameterizedTest
@EnumSource(TimeUnit.class)
void testWithEnumSource(TimeUnit timeUnit) {
    assertNotNull(timeUnit);
}
@ParameterizedTest
@EnumSource(value = TimeUnit.class, names = { "DAYS", "HOURS" })
void testWithEnumSourceInclude(TimeUnit timeUnit) {
    assertTrue(EnumSet.of(TimeUnit.DAYS, TimeUnit.HOURS).contains(timeUnit));
}
```

此外，还可以通过指定 `mode` 属性来设置一个匹配模式，用来排除一些枚举值，或者使用正则表达式获取匹配的枚举，具体可参考注解的属性注释。

- @MethodSource

@MethodSource 用来指定其他的测试方法，来为参数化测试提供参数。指定的方法必须是返回 `Stream`，`Iterable`，`Iterator`或者参数数组 的无参函数，而且是静态的（除非测试类用@TestInstance(Lifecycle.PER_CLASS)注解）。

```java
@ParameterizedTest
@MethodSource("stringProvider")
void testWithSimpleMethodSource(String argument) {
    assertNotNull(argument);
}
static Stream<String> stringProvider() {
    return Stream.of("foo", "bar");
}
```

- @CsvSource

指定一个 CSV 文件作为参数数组。

- @ArgumentsSource

指定一个 `ArgumentsProvider` 的实现类作为参数数组的提供者。

```java
@ParameterizedTest
@ArgumentsSource(MyArgumentsProvider.class)
void testWithArgumentsSource(String argument) {
    assertNotNull(argument);
}
static class MyArgumentsProvider implements ArgumentsProvider {
    @Override
    public Stream< ? extends Arguments > provideArguments(ExtensionContext context) {
        return Stream.of("foo", "bar").map(Arguments::of);
    }
}
```

### 动态测试

除了这些标准测试外，JUnit Jupiter 还引入了一种全新的测试编程模型。这种新的测试是动态测试，它是由 `@TestFactory` 注解的工厂方法在运行时生成的。

与 @Test 方法相比，@TestFactory 方法本身不是测试用例，而是测试用例的工厂。因此，动态测试是工厂的产物。从技术上讲，@TestFactory 方法必须返回 `DynamicNode` 实例的 Stream，Collection，Iterable 或 Iterator。 DynamicNode 的可实例化的子类是 `DynamicContainer` 和 Dynam`icTest。 `DynamicContainer` 实例由一个显示名称和一个动态子节点列表组成，可以创建任意嵌套的动态节点层次结构。然后，DynamicTest 实例将被延迟执行，从而实现测试用例的动态甚至非确定性生成。

任何由 @TestFactory 返回的 Stream 都要通过调用 `stream.close()` 来正确关闭，使得使用诸如 `Files.lines()` 之类的资源变得安全。

与 @Test 方法一样，@TestFactory 方法不能是 private 或 static，并且可以选择声明参数，以便通过 `ParameterResolvers` 解析。

DynamicTest 是运行时生成的测试用例。它由显示名称和 `Executable` 组成。 `Executable` 是 `@FunctionalInterface`，这意味着动态测试的实现可以作为 lambda 表达式或方法引用来提供。

```java
import org.junit.jupiter.api.DynamicNode;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.junit.jupiter.api.function.ThrowingConsumer;

import java.util.*;
import java.util.function.Function;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.DynamicContainer.dynamicContainer;
import static org.junit.jupiter.api.DynamicTest.dynamicTest;

/**
 * Dynamic Test.
 */
public class DynamicsTest {

    // This will result in a JUnitException!
    @TestFactory
    List<String> dynamicTestsWithInvalidReturnType() {
        return Arrays.asList("Hello");
    }

    @TestFactory
    Collection<DynamicTest> dynamicTestsFromCollection() {
        return Arrays.asList(
                dynamicTest("1st dynamic test", () -> assertTrue(true)),
                dynamicTest("2nd dynamic test", () -> assertEquals(4, 2 * 2))
        );
    }

    @TestFactory
    Iterable<DynamicTest> dynamicTestsFromIterable() {
        return Arrays.asList(
                dynamicTest("3rd dynamic test", () -> assertTrue(true)),
                dynamicTest("4th dynamic test", () -> assertEquals(4, 2 * 2))
        );
    }

    @TestFactory
    Iterator<DynamicTest> dynamicTestsFromIterator() {
        return Arrays.asList(
                dynamicTest("5th dynamic test", () -> assertTrue(true)),
                dynamicTest("6th dynamic test", () -> assertEquals(4, 2 * 2))
        ).iterator();
    }

    @TestFactory
    Stream<DynamicTest> dynamicTestsFromStream() {
        return Stream.of("A", "B", "C")
                .map(str -> dynamicTest("test" + str, () -> { /* ... */ }));
    }

    @TestFactory
    Stream<DynamicTest> dynamicTestsFromIntStream() {
        // Generates tests for the first 10 even integers.
        return IntStream.iterate(0, n -> n + 2).limit(10)
                .mapToObj(n -> dynamicTest("test" + n, () -> assertTrue(n % 2 == 0)));
    }

    @TestFactory
    Stream<DynamicTest> generateRandomNumberOfTests() {
        // Generates random positive integers between 0 and 100 until
        // a number evenly divisible by 7 is encountered.
        Iterator<Integer> inputGenerator = new Iterator<Integer>() {
            Random random = new Random();
            int current;

            @Override
            public boolean hasNext() {
                current = random.nextInt(100);
                return current % 7 != 0;
            }

            @Override
            public Integer next() {
                return current;
            }
        };
        // Generates display names like: input:5, input:37, input:85, etc.
        Function<Integer, String> displayNameGenerator = (input) -> "input:" + input;
        // Executes tests based on the current input value.
        ThrowingConsumer<Integer> testExecutor = (input) -> assertTrue(input % 7 != 0);
        // Returns a stream of dynamic tests.
        return DynamicTest.stream(inputGenerator, displayNameGenerator, testExecutor);
    }

    @TestFactory
    Stream<DynamicNode> dynamicTestsWithContainers() {
        return Stream.of("A", "B", "C")
                .map(input -> dynamicContainer("Container " + input, Stream.of(
                        dynamicTest("not null", () -> assertNotNull(input)),
                        dynamicContainer("properties", Stream.of(
                                dynamicTest("length > 0", () -> assertTrue(input.length() > 0)),
                                dynamicTest("not empty", () -> assertFalse(input.isEmpty()))
                        ))
                )));
    }
}
```

## 参考资料

- [JUnit5 官方文档](https://junit.org/junit5/docs/current/user-guide/#overview)
- [Java 全栈知识体系](https://pdai.tech/md/develop/ut/dev-ut-x-junit5.html)