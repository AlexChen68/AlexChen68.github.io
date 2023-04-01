---
title: Set - LinkedHashSet 源码分析
date: 2022-09-30
tag: Collection
category: Java Collection
description: LinkedHashSet 源码分析
order: 4
---

## 概述

`LinkedHashSet` 继承自 `HashSet`，不同的是内部使用的 `HashMap` 为 `LinkedHashMap`，通过`LinkedHashMap` 可以按照插入顺序排序和访问顺序排序的特性，实现集合中元素的有序访问。

## 类图

![LinkedHashSet 类图](https://cdn.staticaly.com/gh/alexchen68/image-hosting@master/blog/java/linkedhashset_class.png ':size=60%')

## 构造方法

`LinkedHashSet` 通过调用父类 `HashSet` 提供的专用构造方法，将内部的 `HashMap` 初始化为 `LinkedHashMap`，利用其特性来实现元素的可排序。

```java
// LinkedHashSet.java
public LinkedHashSet(int initialCapacity, float loadFactor) {
    super(initialCapacity, loadFactor, true);
}

public LinkedHashSet(int initialCapacity) {
    super(initialCapacity, .75f, true);
}

public LinkedHashSet() {
    super(16, .75f, true);
}

public LinkedHashSet(Collection<? extends E> c) {
    super(Math.max(2*c.size(), 11), .75f, true);
    addAll(c);
}
```

`HashSet` 中用 `LinkedHashMap` 初始化内部 HashMap 的方法：

```java
// HashSet.java
HashSet(int initialCapacity, float loadFactor, boolean dummy) {
    map = new LinkedHashMap<>(initialCapacity, loadFactor);
}
```
