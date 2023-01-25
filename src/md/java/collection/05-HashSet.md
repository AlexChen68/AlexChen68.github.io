---
title: HashSet 源码分析
icon: blog
article: true
date: 2022-09-30
tag:
  - Collection
category:
  - Java 集合
isOriginal: true
description: HashSet 源码分析
---

## 概述

`HashSet` 是不可重复集合 `Set` 接口的子类， 它存取无序，不可以存放重复的元素，不可以用下标对元素进行操作。

`HashSet` 是基于 `HashMap` 实现的，底层采用 `HashMap` 来保存元素，利用了 `HashMap` **key** 不可重复的特性，而值使用一个固定的 Object 对象填充。

## 类图

![HashSet类图](https://cdn.jsdelivr.net/gh/alexchen68/images@master/blog/java/hashset_class.png)

`HashSet` 实现了三个接口：

* `java.util.Set` 无序不可重复集合接口
* `java.io.Serializable` 序列化接口
* `java.lang.Cloneable` 可克隆接口

并继承了 `java.util.AbstractSet` 抽象类，其实现了基本的集合方法。

## 属性

**类属性**

`PRESENT` 是一个固定的 Object 对象，用来填充内部 `HashMap` 的 value。

```java
private static final Object PRESENT = new Object();
```

**实例属性**

```java
private transient HashMap<E,Object> map;
```

## 构造方法

`HashSet` 的构造方法主要创建 HashMap 对象，因此其可选参数 `initialCapacity`、`loadFactor` 都是 HashMap 的属性；另外可指定初始集合，在创建完 Map 后，将集合元素批量插入。

```java
public HashSet() {
    map = new HashMap<>();
}

// 指定 HashMap 容量
public HashSet(int initialCapacity) {
    map = new HashMap<>(initialCapacity);
}

// 指定 HashMap 容量和负载因子
public HashSet(int initialCapacity, float loadFactor) {
    map = new HashMap<>(initialCapacity, loadFactor);
}

// 指定初始集合
public HashSet(Collection<? extends E> c) {
    map = new HashMap<>(Math.max((int) (c.size()/.75f) + 1, 16));
    addAll(c);
}
```

##  方法

### 添加元素

添加元素本质上是往 map 中插入元素，值都用叫 PRESENT 的固定 Object 对象填充；

批量添加的方法继承自 `AbstractCollection`，通过循环调用 add 实现批量插入。

```java
// HashSet.java
public boolean add(E e) {
    return map.put(e, PRESENT)==null;
}

// 继承自 AbstractCollection.java
public boolean addAll(Collection<? extends E> c) {
    boolean modified = false;
    for (E e : c)
        if (add(e))
            modified = true;
    return modified;
}
```

### 删除元素

删除元素即调用 HashMap 的 `remove` 方法将元素从 map 中移除。

```java
public boolean remove(Object o) {
    return map.remove(o)==PRESENT;
}
```

### 查询元素

判断 Set 集合中是否包含指定元素，本质也是调用 HashMap 的 `containsKey` 方法。

```java
public boolean contains(Object o) {
    return map.containsKey(o);
}
```

### 克隆

```java
public Object clone() {
    try {
        // 调用父方法，克隆创建 newSet 对象
        HashSet<E> newSet = (HashSet<E>) super.clone();
        // 将内部 map 克隆，设置给 newSet 的 map 属性
        newSet.map = (HashMap<E, Object>) map.clone();
        return newSet;
    } catch (CloneNotSupportedException e) {
        throw new InternalError(e);
    }
}
```

### 序列化

```java
private void writeObject(java.io.ObjectOutputStream s)
    throws java.io.IOException {
    // Write out any hidden serialization magic
    // 写入非静态属性、非 transient 属性
    s.defaultWriteObject();

    // Write out HashMap capacity and load factor
    // 写入 map table 数组大小
    s.writeInt(map.capacity());
    // 写入 map 加载因子
    s.writeFloat(map.loadFactor());

    // Write out size
    // 写入 map 大小
    s.writeInt(map.size());

    // Write out all elements in the proper order.
    // 遍历 map ，逐个 key 序列化
    for (E e : map.keySet())
        s.writeObject(e);
}
```

### 反序列化

```java
private void readObject(java.io.ObjectInputStream s)
    throws java.io.IOException, ClassNotFoundException {
    // 读取非静态属性、非 transient 属性
    s.defaultReadObject();

    // 读取 HashMap table 数组大小
    int capacity = s.readInt();
    // 校验 capacity 参数
    if (capacity < 0) {
        throw new InvalidObjectException("Illegal capacity: " + capacity);
    }

    // 获得加载因子 loadFactor
    float loadFactor = s.readFloat();
    // 校验 loadFactor 参数
    if (loadFactor <= 0 || Float.isNaN(loadFactor)) {
        throw new InvalidObjectException("Illegal load factor: " + loadFactor);
    }

    // 读取 key-value 键值对数量 size
    int size = s.readInt();
    // 校验 size 参数
    if (size < 0) {
        throw new InvalidObjectException("Illegal size: " + size);
    }

    // 计算容量
    capacity = (int) Math.min(size * Math.min(1 / loadFactor, 4.0f),
            HashMap.MAXIMUM_CAPACITY);
    SharedSecrets.getJavaObjectInputStreamAccess().checkArray(s, Map.Entry[].class, HashMap.tableSizeFor(capacity));

    // 创建 LinkedHashMap 或 HashMap 对象
    map = (((HashSet<?>)this) instanceof LinkedHashSet ?
           new LinkedHashMap<>(capacity, loadFactor) :
           new HashMap<>(capacity, loadFactor));

    // 遍历读取 key 键，添加到 map 中
    for (int i=0; i<size; i++) {
        @SuppressWarnings("unchecked")
            E e = (E) s.readObject();
        map.put(e, PRESENT);
    }
}
```

## 总结

`HashSet` 内部维护了一个 HashMap 属性，利用其 key 不可重复的特性，将所以 key 的 value 设置为一个固定的 Object 对象，来实现 Set 的基本要求：无序，不可随机访问，元素不重复。