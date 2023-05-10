---
title: Java 8 新特性之 Optional
category: Java 8
date: 2023-01-02
---

## 1. 什么是 Optional？

Optional 类 Java 8 引入的一个很有趣的特性。Optional 类主要解决的问题是臭名昭著的空指针异常（NullPointerException）。

本质上，这是一个包含有可选值的包装类，这意味着 Optional 类既可以含有对象也可以为空。

```java
public final class Optional<T> {

  // 通用的空对象，调用 empty() 时都会返回它
  private static final Optional<?> EMPTY = new Optional<>();

  // 用来存储实际的值
  private final T value;

  // 构造方法私有，只能通过 of() 和 ofNullable 创建
  private Optional() {
    this.value = null;
  }
}
```

## 2. 创建 Optional 对象

### empty

> 创建一个空的 Optional 对象返回

```java
Optional<String> empty = Optional.empty();
```

### of

> 为非 null 的值创建一个 Optional。

of 方法通过工厂方法创建 Optional 类。需要注意的是，创建对象时传入的参数不能为 null。如果传入参数为 null，则抛出 NullPointerException。

```java
Optional<String> optional = Optional.of("hello world");
```

### ofNullable

> 为指定的值创建一个 Optional，如果指定的值为 null，则返回一个空的 Optional。

ofNullable 与 of 方法相似，唯一的区别是可以接受参数为 null 的情况。

```java
Optional<String> nullOptional = Optional.ofNullable(null);
```

## 3. 使用 Optional 类

### isPresent

> 如果值存在返回 true，否则返回 false。

```java
Optional<String> nullOptional = Optional.ofNullable(null);
Optional<String> optional = Optional.of("hello world");

System.out.println(nullOptional.isPresent()); // false
System.out.println(optional.isPresent()); // true
```

### get

> 如果 Optional 有值则将其返回，否则抛出 NoSuchElementException。

```java
Optional<String> nullOptional = Optional.ofNullable(null);
Optional<String> optional = Optional.of("hello world");

System.out.println(optional.get()); // hello world
System.out.println(nullOptional.get()); // java.util.NoSuchElementException: No value present
```

### ifPresent

> 如果 Optional 实例有值则为其调用 consumer，否则不做处理

`Consumer` 是一个函数式接口，接收一个参数，不返回任何值；可以使用 lambda 表达式简化。

```java
@FunctionalInterface
public interface Consumer<T> {

    void accept(T t);
}
```

```java
Optional<String> optional = Optional.of("hello world");
optional.ifPresent((value) -> {
    System.out.println(value); // hello world
});
```

### orElse

> 如果有值则将其返回，否则返回指定的其它值。

```java
Optional<String> nullOptional = Optional.ofNullable(null);
System.out.println(nullOptional.orElse("there is no value!")); // there is no value!
```

### orElseGet

> orElseGet 与 orElse 类似，区别在于 orElseGet 传入一个 Supplier 函数来生成默认值。

```java
@FunctionalInterface
public interface Supplier<T> {

    /**
     * Gets a result.
     *
     * @return a result
     */
    T get();
}
```

```java
Optional<String> nullOptional = Optional.ofNullable(null);
System.out.println(nullOptional.orElseGet(() -> {
    return "default value";
})); // default value
```

### orElseThrow

> orElseThrow 与 orElseGet 的不同之处在于，不返回默认值，而是抛出由 Supplier 函数创建的异常。

```java
Optional<String> nullOptional = Optional.ofNullable(null);
try {
    nullOptional.orElseThrow(() -> new RuntimeException("there is no value present!"));
} catch (Exception e) {
    System.out.println(e.getMessage()); // there is no value present!
} 
```

### map

> map 接收一个函数，通过其 apply 方法，将 optional 的值修改为另一个值，并通过 Optional.ofNullable 创建一个新的 Optional 对象返回。

```java
@FunctionalInterface
public interface Function<T, R> {

  R apply(T t);
}
```

```java
Optional<String> optional = Optional.of("hello world");
Optional<String> newOptional = optional.map((value) -> "new " + value);
System.out.println(newOptional.get()); // new hello world
```

### flatMap

> 如果有值并且满足断言条件返回包含该值的 Optional，否则返回空 Optional。
> flatMap 和 map 的区别是：map 函数式接口返回的是值，而 flatMap 的函数式接口返回的是 Optional 对象。

```java
Optional<String> optional = Optional.of("hello world");
optional = optional.flatMap((value) -> {
    if (value != null && value.contains("hello")) {
        return Optional.of("valid");
    } else {
        return Optional.ofNullable(null);
    }
});
System.out.println(optional.get()); // valid
```

### filter

> 如果有值并且满足断言条件返回包含该值的 Optional，否则返回空 Optional。

`filter` 方法接收一个 `Predicate` 参数，这是一个断言函数式接口，其 test 方法返回断言的结果。

如果断言成功，返回原来的 Optional 对象；如果断言失败，返回空的 Optional 对象。

```java
@FunctionalInterface
public interface Predicate<T> {

  boolean test(T t);

}
```

```java
Optional<String> nullOptional = Optional.ofNullable(null);
Optional<String> optional = Optional.of("hello world");

nullOptional = nullOptional.filter((value) -> value != null && value.length() > 6);
optional = optional.filter((value) -> value != null && value.length() > 6);

System.out.println(nullOptional.orElse("The value is less than 6 characters")); // The value is less than 6 characters
System.out.println(optional.orElse("The value is less than 6 characters")); // hello world
```

## 4. Optional 应用场景

1. 场景一：判断空再赋值

```java
User user = userDao.getUser(id);
if (user!= null) {
    user.setName("张三");
}
// 使用 Optional 和函数式编程，一行搞定，而且像说话一样
Optional.ofNullable(user).ifPresent(p -> user.setName("李四"));
```

2. 场景二：空值判断抛异常

```java
public void test1() throws Exception {
    Student student = new Student(null, 3);
    if (student == null || isEmpty(student.getName())) {
        throw new Exception();
    }
    String name = student.getName();
    // 业务省略...

    // 使用 Optional 改造
    Optional.ofNullable(student).filter(s -> !isEmpty(s.getName())).orElseThrow(() -> new Exception());
}

public static boolean isEmpty(CharSequence str) {
    return str == null || str.length() == 0;
}
```

3. 场景三：多值判断抛异常

```java
public static String getChampionName(Competition comp) throws IllegalArgumentException {
    if (comp != null) {
        CompResult result = comp.getResult();
        if (result != null) {
            User champion = result.getChampion();
            if (champion != null) {
                return champion.getName();
            }
        }
    }
    throw new IllegalArgumentException("The value of param comp isn't available.");
}

public static String getChampionName(Competition comp) throws IllegalArgumentException {
    return Optional.ofNullable(comp)
            .map(Competition::getResult)  // 相当于 c -> c.getResult()，下同
            .map(CompResult::getChampion)
            .map(User::getName)
            .orElseThrow(()->new IllegalArgumentException("The value of param comp isn't available."));
}
```

4. 场景四：类型之间的转换，并且当没有值的时候返回一个默认值

```java
int timeout = Optional.ofNullable(RedisProperties.getTimeout())
                      .map(x -> Long.valueOf(x.toMillis()).intValue())
                      .orElse(10000);
```

## 5. 使用 Optional 的用法和争议

其实到底该不该用 Optional，业界还是有不少争议的，一方面是 Optional 能强迫开发者处理 null 值，但另一方面是 Optional 又非常容易滥用，特别是一些开发者拿到 Optional 之后就直接调用 `get()` 或 `ifPresent()` 方法，这样几乎没解决任何问题，还加重了编码负担。

因此，我的建议是，在你不知道该不该使用 Optional 的场景，那就先别用。

下面是一些使用 Optional 的场景参考，如下：

1. Optional 一般用于返回值

> Optional 大多用于返回值，不推荐用在成员变量或方法参数中。

2. Optional 本身不判 null

> 永远都不要给 Optional 赋值 null，也不要判断 Optional 本身是否为 null，这是因为 Optional 本来就是解决 null 的，再引入 null 就没意思了，这应该成为业界共识。

3. 集合不使用 Optional

> 因为集合有 `Collections.emptyList()` 等更好的处理方法了，没必要再使用 Optional。

4. 函数式处理值

> 从上面的用法介绍中就能发现，Optional 提供了很多 lambda 函数式处理的方法，如 filter、map 等，这些是使用 Optional 时比较推荐使用的，因为 Optional 能帮你自动处理 null 值情况，避免 NPE 异常。

5. 多层属性获取

> 前面举过这个代码样例，我觉得这是 Optional 使用收益最明显的一个场景。

6. 不返回 null 胜过返回 Optional

> 返回 Optional 给调用方，会强制调用方处理 null 情况，会给调用方增加一些的编码负担，特别是复用度很高的函数。
> 
> 但如果调用方大多数情况下都不期望获取到 null，那应该实现一个这样的方法，要么返回值，要么抛出异常。

## 参考资料

- [Optional 使用场景](https://zhuanlan.zhihu.com/p/600254778)
- [Optional 用法与争议点](https://www.jianshu.com/p/5b9b4f0aa2ce)