---
title: JDK 工具篇 - 并发集合容器
date: 2023-03-09
order: 21
---

# JDK 工具篇 - 并发集合容器

## 同步容器与并发容器

我们知道在 java.util 包下提供了一些容器类，而 Vector 和 Hashtable 是线程安全的容器类，但是这些容器实现同步的方式是通过对方法加锁 (sychronized) 方式实现的，这样读写均需要锁操作，导致性能低下。

而即使是 Vector 这样线程安全的类，在面对多线程下的复合操作的时候也是需要通过客户端加锁的方式保证原子性。如下面例子说明：

```java
public class TestVector {
	private Vector<String> vector;

	//方法一
	public  Object getLast(Vector vector) {
	    int lastIndex = vector.size() - 1;
	    return vector.get(lastIndex);
	}
	
	//方法二
	public  void deleteLast(Vector vector) {
	    int lastIndex = vector.size() - 1;
	    vector.remove(lastIndex);
	}
	
	//方法三
	public  Object getLastSysnchronized(Vector vector) {
		synchronized(vector){
			int lastIndex = vector.size() - 1;
			return vector.get(lastIndex);
		}
	}

	//方法四
	public  void deleteLastSysnchronized(Vector vector) {
		synchronized (vector){
			int lastIndex = vector.size() - 1;
			vector.remove(lastIndex);
		}
	}
}
```

如果方法一和方法二为一个组合的话。那么当方法一获取到了`vector`的 size 之后，方法二已经执行完毕，这样就导致程序的错误。

如果方法三与方法四组合的话。通过锁机制保证了在`vector`上的操作的原子性。

并发容器是 Java 5 提供的在多线程编程下用于代替同步容器，针对不同的应用场景进行设计，提高容器的并发访问性，同时定义了线程安全的复合操作。

## 并发容器类介绍

整体架构 (列举常用的容器类)

![列举常用的容器类](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/java/并发容器.png)

下面分别介绍一些常用的并发容器类和接口，因篇幅原因，这里只介绍这些类的用途和基本的原理，不做过多的源码解析。

### 并发 Map

#### ConcurrentMap 接口

ConcurrentMap 接口继承了 Map 接口，在 Map 接口的基础上又定义了四个方法：

```java
public interface ConcurrentMap<K, V> extends Map<K, V> {

    //插入元素
    V putIfAbsent(K key, V value);

    //移除元素
    boolean remove(Object key, Object value);

    //替换元素
    boolean replace(K key, V oldValue, V newValue);

    //替换元素
    V replace(K key, V value);
    
}
```

`putIfAbsent`: 与原有 put 方法不同的是，putIfAbsent 方法中如果插入的 key 相同，则不替换原有的 value 值；

`remove`: 与原有 remove 方法不同的是，新 remove 方法中增加了对 value 的判断，如果要删除的 key-value 不能与 Map 中原有的 key-value 对应上，则不会删除该元素;

`replace(K,V,V)`: 增加了对 value 值的判断，如果 key-oldValue 能与 Map 中原有的 key-value 对应上，才进行替换操作；

`replace(K,V)`: 与上面的 replace 不同的是，此 replace 不会对 Map 中原有的 key-value 进行比较，如果 key 存在则直接替换；

#### ConcurrentHashMap 类

ConcurrentHashMap 同 HashMap 一样也是基于散列表的 map，但是它提供了一种与 Hashtable 完全不同的加锁策略，提供更高效的并发性和伸缩性。

ConcurrentHashMap 在 JDK 1.7 和 JDK 1.8 中有一些区别。这里我们分开介绍一下。

**JDK 1.7**

ConcurrentHashMap 在 JDK 1.7 中，提供了一种粒度更细的加锁机制来实现在多线程下更高的性能，这种机制叫**分段锁 (Lock Striping)**。

> 提供的优点是：在并发环境下将实现更高的吞吐量，而在单线程环境下只损失非常小的性能。

可以这样理解分段锁，就是**将数据分段，对每一段数据分配一把锁**。当一个线程占用锁访问其中一个段数据的时候，其他段的数据也能被其他线程访问。

有些方法需要跨段，比如 size()、isEmpty()、containsValue()，它们可能需要锁定整个表而不仅仅是某个段，这需要按顺序锁定所有段，操作完毕后，又按顺序释放所有段的锁。如下图：

![分段锁机制](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/java/分段锁机制.png)

ConcurrentHashMap 是由 Segment 数组结构和 HashEntry 数组结构组成。Segment 是一种可重入锁 ReentrantLock，HashEntry 则用于存储键值对数据。

一个 ConcurrentHashMap 里包含一个 Segment 数组，Segment 的结构和 HashMap 类似，是一种数组和链表结构，一个 Segment 里包含一个 HashEntry 数组，每个 HashEntry 是一个链表结构的元素，每个 Segment 守护着一个 HashEntry 数组里的元素，当对 HashEntry 数组的数据进行修改时，必须首先获得它对应的 Segment 锁。

**JDK 1.8**

而在 JDK 1.8 中，ConcurrentHashMap 主要做了两个优化：

- 同 HashMap 一样，链表也会在长度达到 8 的时候转化为红黑树，这样可以提升大量冲突时候的查询效率；
- 以某个位置的头结点（链表的头结点或红黑树的 root 结点）为锁，配合自旋+CAS 避免不必要的锁开销，进一步提升并发性能。

对 ConcurrentHashMap 源码感兴趣的朋友可以看看这两篇文章：

- https://yasinshaw.com/articles/27
- https://yasinshaw.com/articles/30

#### ConcurrentNavigableMap 接口与 ConcurrentSkipListMap 类

ConcurrentNavigableMap 接口继承了 NavigableMap 接口，这个接口提供了针对给定搜索目标返回最接近匹配项的导航方法。

ConcurrentNavigableMap 接口的主要实现类是 ConcurrentSkipListMap 类。从名字上来看，它的底层使用的是跳表（SkipList）的数据结构。关于跳表的数据结构这里不做太多介绍，它是一种”空间换时间“的数据结构，可以使用 CAS 来保证并发安全性。

### 并发 Queue

JDK 并没有提供线程安全的 List 类，因为对 List 来说，**很难去开发一个通用并且没有并发瓶颈的线程安全的 List**。因为即使简单的读操作，拿 contains() 这样一个操作来说，很难想到搜索的时候如何避免锁住整个 list。

所以退一步，JDK 提供了对队列和双端队列的线程安全的类：ConcurrentLinkedQueue 和 ConcurrentLinkedDeque。因为队列相对于 List 来说，有更多的限制。这两个类是使用 CAS 来实现线程安全的。

### 并发 Set

JDK 提供了 ConcurrentSkipListSet，是线程安全的有序的集合。底层是使用 ConcurrentSkipListMap 实现。

谷歌的 guava 框架实现了一个线程安全的 ConcurrentHashSet：

```java
Set<String> s = Sets.newConcurrentHashSet();
```

## 参考资料

* [并发容器集合](http://concurrent.redspider.group/article/03/15.html)<Badge text="原文" type="tip"/>
* [Java 集合-ConcurrentHashMap 原理分析](https://www.cnblogs.com/ITtangtang/p/3948786.html)
* [同步容器与并发容器类简介](https://blog.csdn.net/u012777670/article/details/82313750)
* [ConcurrentLinkedQueue 的实现原理分析](http://ifeve.com/concurrentlinkedqueue/)
* [ConcurrentHashMap 的 put 源码解析](https://yasinshaw.com/articles/27)
* [从 ConcurrentHashMap 能学到哪些并发编程技巧？](https://yasinshaw.com/articles/30)

