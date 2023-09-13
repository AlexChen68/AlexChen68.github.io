---
title: Java 泛型机制
order: 5
date: 2023-04-13
---

## 为什么会引入泛型

引入泛型的意义在于：

- 适用于多种数据类型执行相同的代码（代码复用）
- 泛型中的类型在使用时指定，不需要强制类型转换（类型安全，编译器会检查类型）

## 泛型的基本使用

- 泛型接口和泛型类

在接口和类的名称后面，通过 `<Name1, Name2, ...>` 的格式定义一至多个泛型类型，在该接口或者类中都可以该类型。

```java
public interface List<E> extends Collection<E> {

}
```
```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable {

}
```

多元泛型：

```java
public class HashMap<K,V> extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable {

}
```

- 泛型方法

在返回值前面通过 `<Name1, Name2, ...>` 的格式定义一个或多个泛型类型，可以在该方法的作用域范围类使用。

```java
public static <T> boolean addAll(Collection<? super T> c, T... elements) {
      boolean result = false;
      for (T element : elements)
          result |= c.add(element);
      return result;
  }
```

## 泛型的上限和下限

在使用泛型的时候，我们可以为传入的泛型类型实参进行上下边界的限制，如：类型实参只准传入某种类型的父类或某种类型的子类。

泛型的定义可以使用如下三种方式：

- `<?>` 无限制通配符
- `<? extends E>` extends 关键字声明了类型的上界，表示参数化的类型可能是所指定的类型，或者是此类型的子类
- `<? super E>` super 关键字声明了类型的下界，表示参数化的类型可能是指定的类型，或者是此类型的父类

《Effictive Java》中对泛型的使用原则：为了获得最大限度的灵活性，要在表示 生产者或者消费者 的输入参数上使用通配符，使用的规则就是：生产者有上限、消费者有下限

1. 如果参数化类型表示一个 T 的生产者，使用 `<? extends T>`;
2. 如果它表示一个 T 的消费者，就使用 `<? super T>`；
3. 如果既是生产又是消费，那使用通配符就没什么意义了，因为你需要的是精确的参数类型。

## 泛型的类型擦除

> Java 泛型这个特性是从 JDK 1.5 才开始加入的，因此为了兼容之前的版本，Java 泛型的实现采取了“伪泛型”的策略，即 Java 在语法上支持泛型，但是在编译阶段会进行所谓的“类型擦除”（Type Erasure），将所有的泛型表示（尖括号中的内容）都替换为具体的类型（其对应的原生态类型），就像完全没有泛型一样。理解类型擦除对于用好泛型是很有帮助的，尤其是一些看起来“疑难杂症”的问题，弄明白了类型擦除也就迎刃而解了。

Java 编译器是通过先检查代码中泛型的类型，然后在进行类型擦除，再进行编译。

**泛型的类型擦除原则**是：

- 消除类型参数声明，即删除`<>`及其包围的部分。

- 根据类型参数的上下界推断并替换所有的类型参数为原生态类型：如果类型参数是无限制通配符或没有上下界限定则替换为 Object，如果存在上下界限定则根据子类替换原则取类型参数的最左边限定类型（即父类）。

- 为了保证类型安全，必要时插入强制类型转换代码。

- 自动产生“桥接方法”以保证擦除类型后的代码仍然具有泛型的“多态性”。

## 注意事项

- 基本类型不能作为泛型类型
- 泛型类型不能实例化
- 类型擦除会造成多态的冲突，而 JVM 解决方法就是桥接方法。
- 泛型类中的*静态方法*和*静态变量*不可以使用泛型类所声明的泛型类型参数
- 不能抛出也不能捕获泛型类的对象，因为类型擦除后，异常类型都是 Object，同样不也能再 catch 子句中使用泛型变量；但是在异常声明中可以使用类型变量，例如：`<T extends Throwable>`

---

## 参考资料

- [Java 基础五大机制 —— 泛型机制解析（一）](https://blog.csdn.net/qq_37080455/article/details/127851686)
- [Java 基础 - 泛型机制详解](https://pdai.tech/md/java/basic/java-basic-x-generic.html)