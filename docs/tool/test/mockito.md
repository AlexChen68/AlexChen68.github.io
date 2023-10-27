---
title: Mock 测试 - Mockito
date: 2023-02-22
---

介绍 Mock 测试，以及 Java Mock 框架 Mockito 的使用。
<!-- more -->

## 什么是 Mock 测试

Mock 测试就是在测试过程中，对于某些不容易构造（如 HttpServletRequest 必须在Servlet 容器中才能构造出来）或者不容易获取比较复杂的对象（如 JDBC 中的ResultSet 对象），用一个虚拟的对象（Mock 对象）来创建以便测试的测试方法。

Mock 最大的功能是帮你把单元测试的耦合分解开，如果你的代码对另一个类或者接口有依赖，它能够帮你模拟这些依赖，并帮你验证所调用的依赖的行为。

我们通过使用 Mock 技术可以让开发不停滞，Mock技术的作用是将服务与服务之间的依赖在测试自测阶段隔离开，让开发人员在自己的应用内部通过模拟的方式把需要依赖外部的接口给构造出来，从而保证不被外界的开发进度所影响。

## 什么是 Mcokito 

**Mockito** 是最流行的 Java moc k框架之一。

**Mockito** 让您可以使用干净简单的 API 编写漂亮的测试。

**Mockito** 的可读性非常好，不会让你感动迷惑，产生的验证错误也很明确。

## 使用 Mcokito

### Maven 依赖

这里介绍 JUnit5 + Mockito 的 Maven 依赖。

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
    <!-- JUnit 参数化测试（可选） -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-params</artifactId>
        <scope>test</scope>
    </dependency>
    <!-- 支持 JUnit5 的 mockito -->
    <dependency>
        <groupId>org.mockito</groupId>
        <artifactId>mockito-junit-jupiter</artifactId>
        <version>4.5.1</version>
        <scope>test</scope>
    </dependency>
</dependencies>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.junit</groupId>
            <artifactId>junit-bom</artifactId>
            <version>5.8.2</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

### Mockito 常用方法

在 `Mockito` 的 `org.mockito` 包下的 `Mockito` 类中，提供了大量的静态方法，可以用来构建需要模拟的类，以及控制模拟类的方法返回预期的结果等等。

常用的方法有：

1. `mock(Class<T> classToMock)`: 返回一个指定类型的模拟实例对象

```java
//创建 mock 对象
List mockedList = mock(List.class);
```

此外，还可以通过注解的方式，设置测试类的成员变量自动 Mock：

```java
@ExtendWith(MockitoExtension.class)
public class MockAnnotationTest {

    @Mock
    private Random random;

    @Test
    public void test() {
        when(random.nextInt()).thenReturn(100);
        System.out.println(random.nextInt());
    }
}
```

:::tip
这里要注意，在 **JUnit5** 中，需要使用 `@ExtendWith(MockitoExtension.class)` 来启用 `@Mock` 模拟注解。
:::

2. `when(T methodCall) + thenXXX()`: 指定调用某个方法时，接下来执行的操作，这种操作在 Mockito 中叫做测试桩

```java
@Test
void test() {
    // 你可以mock具体的类型,不仅只是接口
    LinkedList mockedList = mock(LinkedList.class);

    // 测试桩
    when(mockedList.get(0)).thenReturn("first");
    when(mockedList.get(1)).thenThrow(new RuntimeException());

    // 输出“first”
    System.out.println(mockedList.get(0));

    // 抛出异常
    System.out.println(mockedList.get(1));
}
```

:::tip
当测试的方法，返回值为 void 时，不再使用 `OngoingStubbing` 接口的 `thenXXX()`，而是使用 `MOckito` 类 的 `doXXX()`；

例如: `doThrow(new RuntimeException("异常")).when(mockService).hello()`。

更多的方法可以查看 `org.mockito.Mockito` 类。
:::

3. `verify()`: 验证某些方法是否被执行

```java
@Test
void test() {
    // mock creation 创建mock对象
    List mockedList = mock(List.class);

    //using mock object 使用mock对象
    mockedList.add("one");
    mockedList.clear();

    //verification 验证
    verify(mockedList).add("one");
    verify(mockedList).clear();
}
```

:::tip
`verify` 方法的完整定义：`public static <T> T verify(T mock)`，可以看出，`verify` 返回输入的 Mock 对象，
可以通过继续调用需要验证的方法来验证该方法是否在之前的测试中被执行了。
:::

4. `spy(T object)`: 通过真实的构造方法创建 Mock 对象

`spy()` 方法和 `mock()` 方法类似，不过 `mock()` 的参数是 `class`，而 `syp()` 的参数是 `object`。

同样的，`@Spy` 注解与 `@Mock` 注解类似；`@Spy` 不指定构造方法时，默认使用无参构造方法。

:::warning
通过 `spy` 方式创建的对象，调用其方法时使用其自己真实的逻辑实现，只有通过打桩后，才会返回打桩后指定的结果。

看看下面这个例子：

```java
@Test
public void test_spy() {

    ExampleService spyExampleService = spy(new ExampleService());

    // 默认会走真实方法
    Assert.assertEquals(3, spyExampleService.add(1, 2));

    // 打桩后，不会走了
    when(spyExampleService.add(1, 2)).thenReturn(10);
    Assert.assertEquals(10, spyExampleService.add(1, 2));

    // 但是参数比匹配的调用，依然走真实方法
    Assert.assertEquals(3, spyExampleService.add(2, 1));

}
```
:::

### 参数匹配器

Mockito 以自然的 java 风格来验证参数值: 使用 `equals()` 函数。
有时，当需要额外的灵活性时你可能需要使用参数匹配器，也就是 argument matchers :

```java
@Test
void test() {
    List mockedList = mock(List.class);

    // 使用内置的anyInt()参数匹配器
    when(mockedList.get(anyInt())).thenReturn("element");

    // 获取任一位置的元素，都返回 "element"
    System.out.println(mockedList.get(999));

    // 你也可以验证参数匹配器
    verify(mockedList).get(anyInt());
}
```

在 `org.mockito` 包下的 `ArgumentMatchers` 类中，提供了多种参数匹配器；你也可以通过 `argThat()` 方法，指定一个参数匹配器的实现类，实现自定义的匹配逻辑。

更多的参数匹配器信息，可以查看官方文档 [Click Here](http://site.mockito.org/mockito/docs/current/org/mockito/ArgumentMatcher.html)。

## 参考资料

- [Mockito 中文版文档](https://github.com/hehonghui/mockito-doc-zh#0)
- [Mockito - Java 全栈知识体系](https://pdai.tech/md/develop/ut/dev-ut-x-mockito.html)