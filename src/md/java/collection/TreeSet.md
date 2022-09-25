##  概述

`TreeSet` 是基于 `TreeMap` 的 `Set` 集合实现类，利用了 `TreeMap` 的键不允许重复、无序的特点，将元素存储在 TreeMap 的键中，而值使用固定的 Object 对象填充。

## 类图

![TreeSet类图](../../../public/images/java/collection/TreeSet-class.png ':size=60%')

`TreeSet` 实现了三个接口：

* `java.util.NavigableSet` 可导航 Set 集合，定义了获取给定元素最接近元素的方法；
* `java.io.Serializable` 序列化接口；
* `java.lang.Cloneable` 可克隆接口；

并继承了 `java.util.AbstractSet` 抽象类，其实现了基本的集合方法。

## 属性

**类属性**

```java
// 用于填充 value 的通用 Object 对象
private static final Object PRESENT = new Object();
```

**实例属性**

```java
private transient NavigableMap<E,Object> m;
```

## 构造方法

`TreeSet` 内部维护了一个 `NavigableMap` 类型的属性，默认使用 `TreeMap`

```java
TreeSet(NavigableMap<E,Object> m) {
    this.m = m;
}

public TreeSet() {
    this(new TreeMap<>());
}

public TreeSet(Comparator<? super E> comparator) {
    this(new TreeMap<>(comparator));
}

public TreeSet(Collection<? extends E> c) {
    this();
    // 批量添加
    addAll(c);
}

public TreeSet(SortedSet<E> s) {
    this(s.comparator());
    // 批量添加
    addAll(s);
}
```

### 方法

### 添加元素

添加单个元素调用 `TreeMap` 的 put 方法，使用 `PRESENT` 填充值。

```java
public boolean add(E e) {
    return m.put(e, PRESENT)==null;
}
```

批量添加元素

```java
public  boolean addAll(Collection<? extends E> c) {
    // 特殊优化
    if (m.size()==0 && c.size() > 0 &&
            c instanceof SortedSet &&
            m instanceof TreeMap) {
        SortedSet<? extends E> set = (SortedSet<? extends E>) c;
        TreeMap<E,Object> map = (TreeMap<E, Object>) m;
        Comparator<?> cc = set.comparator();
        Comparator<? super E> mc = map.comparator();
        if (cc==mc || (cc != null && cc.equals(mc))) {
            // TreeMap 针对 TreeSet 的优化方法
            map.addAllForTreeSet(set, PRESENT);
            return true;
        }
    }
    // 普通情况
    return super.addAll(c);
}
```

### 删除元素

删除元素调用 `TreeMap` 的 remove 方法。

```java
public boolean remove(Object o) {
    return m.remove(o)==PRESENT;
}
```

### 查找元素

判断是否包含给定元素，调用 `TreeMap` 的 `containsKey` 方法。

```java
public boolean contains(Object o) {
    return m.containsKey(o);
}
```

## 查找接近的元素

`TreeMap` 是继承自 `NavigableMap` 的可导航映射类，实现了查询小于、小于或等于、大于、大于或等于给定键的导航方法，`TreeSet` 则通过调用内部的 `NavigableMap` 的对应方法，实现查找接近元素的操作。

#### 严格小于给定元素的最大元素

```java
public E lower(E e) {
    return m.lowerKey(e);
}
```

### 小于或等于给定元素的最大元素

```java
public E floor(E e) {
    return m.floorKey(e);
}
```

### 严格大于给定元素的最小元素

```java
public E higher(E e) {
    return m.higherKey(e);
}
```

### 大于或等于给定元素的最小元素

```java
public E ceiling(E e) {
    return m.ceilingKey(e);
}
```

## 获取首位元素

同样是通过调用 `TreeMap` 的对应方法实现对应操作。

### 获取首个元素

```java
public E first() {
    return m.firstKey();
}
```

### 获取首个元素并移除

```java
public E pollFirst() {
    Map.Entry<E,?> e = m.pollFirstEntry();
    return (e == null) ? null : e.getKey();
}
```

### 获取末尾元素

```java
public E last() {
    return m.lastKey();
}
```

### 获取末尾元素并移除

```java
public E pollLast() {
    Map.Entry<E,?> e = m.pollLastEntry();
    return (e == null) ? null : e.getKey();
}
```

## 获取一定范围的子集合

### 获取小于给定元素的子集合

```java
// 不包含给定元素
public SortedSet<E> headSet(E toElement) {
    return headSet(toElement, false);
}

// inclusive 为 true 时包含给定元素
public NavigableSet<E> headSet(E toElement, boolean inclusive) {
    return new TreeSet<>(m.headMap(toElement, inclusive));
}
```

### 获取中间范围的子集合

```java
// 不包含给定元素
public SortedSet<E> subSet(E fromElement, E toElement) {
    return subSet(fromElement, true, toElement, false);
}

// fromInclusive 为 true 时包含 fromElement
// toInclusive 为 true 时包含 toElement
public NavigableSet<E> subSet(E fromElement, boolean fromInclusive,
                              E toElement,   boolean toInclusive) {
    return new TreeSet<>(m.subMap(fromElement, fromInclusive,
                                   toElement,   toInclusive));
}
```

### 获取大于给定元素的子集合

```java
// 不包含给定元素
public SortedSet<E> tailSet(E fromElement) {
    return tailSet(fromElement, true);
}

// inclusive 为 true 时包含给定元素
public NavigableSet<E> tailSet(E fromElement, boolean inclusive) {
    return new TreeSet<>(m.tailMap(fromElement, inclusive));
}
```

## 总结

`TreeSet` 是基于 `TreeMap` 的 Set 实现类，其利用了 TreeMap 键的不可重复、可排序的特性。











