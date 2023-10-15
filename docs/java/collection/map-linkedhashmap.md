---
title: Map - LinkedHashMap 源码分析
date: 2022-09-30
tag: Collection
order: 7
---

## 概述

`HashMap` 是哈希表的无序实现，`LinkedHashMap` 在 `HashMap` 的基础之上，提供了顺序访问的特性。而这里的顺序，包括两种：
1. 按照 key-value 的插入顺序进行访问;
2. 按照 key-value 的访问顺序进行访问（LRU 算法）。

## 类图

![LinkedHashMap 类图](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/java/linkedhashmap_class.png ':size=60%')

`LinkedHashMap` 实现 `java.util.Map` 接口，继承了 `java.util.HashMap` 类。

## 属性

实例属性

```java
// 头结点（越老的节点，放在越前面。所以头节点，指向链表的开头）
transient LinkedHashMap.Entry<K,V> head;

// 尾结点（越新的节点，放在越后面。所以尾节点，指向链表的结尾）
transient LinkedHashMap.Entry<K,V> tail;

/**
 * 是否按访问顺序排序，默认为 false
 * true ：按照 key-value 的访问顺序进行访问
 * false ：按照 key-value 的插入顺序进行访问
 */
final boolean accessOrder;
```

## 内部类

`LinkedHashMap` 的 `Entry<K,V>` 继承自 `HashMap` 的 `Node<K,V>` 

```java
static class Entry<K,V> extends HashMap.Node<K,V> {
    // 前一个结点；后一个结点
    Entry<K,V> before, after;
    // 构造方法
    Entry(int hash, K key, V value, Node<K,V> next) {
        super(hash, key, value, next);
    }
}
```

## 构造方法

`LinkedHashMap` 的构造和 `HashMap` 的差不多，只是在 `HashMap` 的构造方法上多加了 `accessOrder = false` ，说明默认使用按插入顺序排序。

```java
public LinkedHashMap(int initialCapacity, float loadFactor) {
    super(initialCapacity, loadFactor);
    accessOrder = false;
}

public LinkedHashMap(int initialCapacity) {
    super(initialCapacity);
    accessOrder = false;
}

public LinkedHashMap() {
    super();
    accessOrder = false;
}

public LinkedHashMap(Map<? extends K, ? extends V> m) {
    super();
    accessOrder = false;
    putMapEntries(m, false);
}
```

另外，`LinkedHashMap` 增加了一个构造方法，可以指定 `accessOrder` 来决定使用哪种排序：

```java
public LinkedHashMap(int initialCapacity,
                     float loadFactor,
                     boolean accessOrder) {
    super(initialCapacity, loadFactor);
    this.accessOrder = accessOrder;
}
```

## 添加键值对

`LinkedHashMap` 添加键值对使用从 `HashMap` 继承来的 `put(K key, V value)` 方法，在设置值时，如果对应位置没有结点，则会调用 `newNode(int hash, K key, V value, Node<K,V> e)` 方法去创建结点；由于 `LinkedHashMap` 使用了自定义的结点 `Entry<K, V>`，因此重写了 `newNode` 方法如下：

```java
Node<K,V> newNode(int hash, K key, V value, Node<K,V> e) {
    // 创建结点
    LinkedHashMap.Entry<K,V> p =
            new LinkedHashMap.Entry<K,V>(hash, key, value, e);
    // 将结点加入末尾
    linkNodeLast(p);
    return p;
}

private void linkNodeLast(LinkedHashMap.Entry<K,V> p) {
    // 记录原尾节点到 last 中
    LinkedHashMap.Entry<K,V> last = tail;
    // 设置 tail 指向 p ，变更新的尾节点
    tail = p;
    // 如果原尾节点 last 为空，说明 head 也为空，所以 head 也指向 p
    if (last == null)
        head = p;
    // last <=> p ，相互指向
    else {
        p.before = last;
        last.after = p;
    }
}
```

## 回调操作

在 `HashMap` 内部，当访问、添加、删除结点后，会执行对应的回调操作方法 `afterNodeAccess(Node<K,V> e)`、`afterNodeInsertion(boolean evict)`、`afterNodeRemoval(Node<K,V> e)`，这三个方法的默认实现为空，`LinkedHashMap` 通过重写这三个方法，自定义扩展需要逻辑。

### 访问回调

访问回调方法 `afterNodeAccess(Node<K,V> e)` 中，必要要设置 `accessOrder` 为 true 才会执行后面的逻辑，即表示该 Map 通过访问顺序排序。其主要步骤为：

1. 访问一个结点后，将其从链表移出；
2. 将该结点放入链表的末尾。

这样做的目的是将最常访问的元素，放在链表的末尾（原理为 LRU 算法）

```java
void afterNodeAccess(Node<K,V> e) { // move node to last
    LinkedHashMap.Entry<K,V> last;
    // 要求 accessOrder 为 true；last 缓存旧尾结点；要求 e 不是尾结点
    if (accessOrder && (last = tail) != e) {
        // p 执行当前结点 e
        // b 指向前一个结点 
        // a 指向后一个结点
        LinkedHashMap.Entry<K,V> p =
            (LinkedHashMap.Entry<K,V>)e, b = p.before, a = p.after;
        // 移出 p
        p.after = null;
        if (b == null)
            head = a;
        else
            b.after = a;
        if (a != null)
            a.before = b;
        else
            last = b;
        // 将 p 挂在链表尾部
        if (last == null)
            head = p;
        else {
            p.before = last;
            last.after = p;
        }
        // 尾结点指向 p
        tail = p;
        ++modCount;
    }
}
```

另外，在 `HashMap` 的 `get` 和 `getOrDefault` 方法中，没有调用 `afterNodeAccess` 方法，`LinkedHashMap` 重写了这两个方法，在查询结点后，增加了根据 `accessOrder` 参数决定是否执行 `afterNodeAccess` 的判断。

```java
public V get(Object key) {
     Node<K,V> e;
     if ((e = getNode(hash(key), key)) == null)
         return null;
     // 增加的内容
     if (accessOrder)
         afterNodeAccess(e);
     return e.value;
 }

 public V getOrDefault(Object key, V defaultValue) {
    Node<K,V> e;
    if ((e = getNode(hash(key), key)) == null)
        return defaultValue;
     // 增加的内容
    if (accessOrder)
        afterNodeAccess(e);
    return e.value;
}
```

### 添加回调

添加回调方法 `afterNodeInsertion(boolean evict)` 中，如果满足一下条件，会从链表中删除最老的结点（最不常访问）：

1. `evict` 参数为 true，在 HashMap 中调用 `afterNodeInsertion` 时传参都是 true；
2. 链表不为空；
3. `removeEldestEntry(Map.Entry<K,V> eldest)` 的结果为 true，默认实现返回 false，这意味着想要使用 LRU 缓存必须重写该方法，使得一定情况下返回 true。

```java
// evict 参数表示是否需要移除数据
void afterNodeInsertion(boolean evict) { // possibly remove eldest
    LinkedHashMap.Entry<K,V> first;
    // 满足条件时删除最老的结点（最不常访问）
    if (evict && (first = head) != null && removeEldestEntry(first)) {
        K key = first.key;
        // 删除头结点
        removeNode(hash(key), key, null, false, true);
    }
}

// LinkedHashMap 默认不移除最老的数据
protected boolean removeEldestEntry(Map.Entry<K,V> eldest) {
    return false;
}
```

### 删除回调

删除回调方法 `afterNodeRemoval(Node<K,V> e)`，用于在 HashMap 删除键值对后，从链表中删除对应的结点

```java
void afterNodeRemoval(Node<K,V> e) {
    LinkedHashMap.Entry<K,V> p =
        (LinkedHashMap.Entry<K,V>)e, b = p.before, a = p.after;
    p.before = p.after = null;
    if (b == null)
        head = a;
    else
        b.after = a;
    if (a == null)
        tail = b;
    else
        a.before = b;
}
```

## 总结

`LinkedHashMap` 在 `HashMap` 的基础上，在内部增加了一个双向链表，用于保存插入元素的顺序，解决了 `HashMap` 不能随时保持遍历顺序和插入顺序一致的问题；同时通过 `accessOrder` 参数和回调函数，支持通过访问顺序排序。

## 参考资料

* [芋道源码](https://www.iocoder.cn/)
* [LinkedHashMap源码解析](https://blog.csdn.net/hequnwang10/article/details/124732318)