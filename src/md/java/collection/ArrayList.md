---
title: ArrayList
icon: blog
article: true
date: 2022-09-30
tag:
  - Collection
category:
  - Java 集合
isOriginal: true
description: ArrayList
---

##  概述

ArrayList ，基于 `[]` 数组实现的，支持**自动扩容**的动态数组。

## 类图

![ArrayList类图](https://cdn.jsdelivr.net/gh/AlexChen68/images@master/blog/ArrayList-class.png)

`ArrayList` **实现**了 4 个接口，分别是：

* `java.lang.Cloneable` 接口，表示 ArrayList 支持克隆。
* `java.util.RandomAccess` 接口，表示 ArrayList 支持**快速**的随机访问。
* `java.io.Serializable` 接口，表示 ArrayList 支持序列化的功能。
* `java.util.List` 接口，提供数组的添加、删除、修改、迭代遍历等操作。

同时还**继承**了 `java.util.AbstractList` 抽象类，`AbstractList` 类提供了一些集合的默认实现。

## 属性

类属性

```java
// 默认初始容量
private static final int DEFAULT_CAPACITY = 10;

// 用于空实例的共享空数组实例（数组不指定容量时使用）
private static final Object[] EMPTY_ELEMENTDATA = {};

// 用于默认大小的空实例的共享空数组实例。我们将其与 EMPTY_ELEMENTDATA 区分开来，以了解添加第一个元素时要膨胀多少
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

// 要分配的数组的最大大小。一些 VM 在数组中保留一些标题字。尝试分配更大的数组可能会导致 OutOfMemoryError：请求的数组大小超过 VM 限制
private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;
```

实例属性

```java
// 存储 ArrayList 元素的数组缓冲区。 ArrayList 的容量就是这个数组缓冲区的长度。当添加第一个元素时，任何具有 elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA 的空 ArrayList 都将扩展为 DEFAULT_CAPACITY。
transient Object[] elementData;

// ArrayList 的大小（它包含的元素数量）
private int size;
```

## 构造方法

1. 无参构造时：使用默认空数组属性 `DEFAULTCAPACITY_EMPTY_ELEMENTDATA`

```java
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}
```

2. 指定容量构造：如果容量大于 0，直接创建指定容量的对象数组；如果初始化容量为 0 时，使用 `EMPTY_ELEMENTDATA` 空数组，在向集合添加元素时，再进行扩容。

```java
public ArrayList(int initialCapacity) {
    if (initialCapacity > 0) {
        // 初始化容量大于 0 时，创建 Object 数组
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        // 初始化容量等于 0 时，使用 EMPTY_ELEMENTDATA 对象
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        throw new IllegalArgumentException("Illegal Capacity: " + initialCapacity);
    }
}
```

3. 按照集合的迭代器返回的顺序构造一个包含指定集合元素的列表：

```java
public ArrayList(Collection<? extends E> c) {
    // 先将指定集合转换为 Object 数组（实际上在 JDK9之前，数组 a 的实际类型为原集合的类型）
    Object[] a = c.toArray();
    if ((size = a.length) != 0) {
        // 由于 a 的类型不一致，需要先判断；不一致时需要先转为 Object 数组再赋值
        if (c.getClass() == ArrayList.class) {
            elementData = a;
        } else {
            elementData = Arrays.copyOf(a, size, Object[].class);
        }
    } else {
        // 指定集合为空，使用空数组
        elementData = EMPTY_ELEMENTDATA;
    }
}
```

在 `ArrayList` 未指定容量或集合时，其初始化完成后，内部数组为 `DEFAULTCAPACITY_EMPTY_ELEMENTDATA`空数组，这样是为了节省内存；之所以使用 `DEFAULTCAPACITY_EMPTY_ELEMENTDATA` 和 `EMPTY_ELEMENTDATA` 两个空数组，是为了区别扩容，前者用于未指定容量时使用，首次扩容时会扩容至 10，而后者用于指定容量为 0 时使用，首次扩容时会按照 **1.5 倍**扩容从 0 开始而不是 10。

## 方法

### 添加元素

1. 添加单个元素到数组末尾 `add(E e)`

```java
public boolean add(E e) {
    // 
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;
    return true;
}
```

2. 添加单个元素到指定顺序 `add(int index, E element)`

```java
public void add(int index, E element) {
    rangeCheckForAdd(index);
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    System.arraycopy(elementData, index, elementData, index + 1, size - index);
    elementData[index] = element;
    size++;
}
```

其中，`System.arraycopy` 方法，作用为将指定源数组中的数组从指定位置开始复制到目标数组的指定位置，这是一个 `native` 方法。

```java
public static native void arraycopy(Object src,  int  srcPos, Object dest, int destPos,int length);
```

当向数组添加元素前，都执行了 `ensureCapacityInternal(int minCapacity)` 方法，来确保数组有足够的容量容纳新添加的元素，具体代码如下：

```java
// 计算需要扩容的容量
private static int calculateCapacity(Object[] elementData, int minCapacity) {
    // 当数组为默认空数组，即初始化时未指定容量时
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        // 待扩容的最小数组容量 和 默认容量 10 两者取大者
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    // 否则扩容至指定容量
    return minCapacity;
}

// 计算需要扩容的容量并扩容
private void ensureCapacityInternal(int minCapacity) {
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}

// 执行数组扩容
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;
    // overflow-conscious code
    if (minCapacity - elementData.length > 0)
        // 数组扩容
        grow(minCapacity);
}
```

3. 数组扩容 `grow(int minCapacity)`

```java
// 增加容量以确保它至少可以容纳最小容量参数指定的元素数量
private void grow(int minCapacity) {
    // 保存旧容量
    int oldCapacity = elementData.length;
    // 新容量 = 1.5 倍旧容量
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    // 指定容量大于 1.5 倍旧容量，则扩容至指定容量
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    // 判断是否超出最大可扩容容量
    if (newCapacity - MAX_ARRAY_SIZE > 0)
     // 扩容至整型最大值 或 最大可扩容量 MAX_ARRAY_SIZE
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    // 扩容
    elementData = Arrays.copyOf(elementData, newCapacity);
}

// 计算超大扩容容量：最小容量超过最大可扩容量，扩容至整型最大值，否则扩容至最大可扩容量
private static int hugeCapacity(int minCapacity) {
    if (minCapacity < 0) // overflow
        throw new OutOfMemoryError();
    // MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8
    return (minCapacity > MAX_ARRAY_SIZE) ? Integer.MAX_VALUE : MAX_ARRAY_SIZE;
}
```

4. 批量添加多个元素 `addAll(Collection<? extends E> c)`，在明确知道需要添加多少元素的前提下，使用本方法可减少扩容次数。

```java
public boolean addAll(Collection<? extends E> c) {
  	// 转成 a 数组
    Object[] a = c.toArray();
		// 如果 a 数组大小为 0 ，返回 ArrayList 数组无变化
    int numNew = a.length;
    // 扩容至确保可以容纳添加后的元素
    ensureCapacityInternal(size + numNew);  // Increments modCount
    // 将 a 复制到 elementData 从 s 开始位置
    System.arraycopy(a, 0, elementData, size, numNew);
    size += numNew;
    return numNew != 0;
		
}
```

5. 批量添加多个元素 `addAll(int index, Collection<? extends E> c)`

```java
public boolean addAll(int index, Collection<? extends E> c) {
	// 校验位置是否在数组范围内
    rangeCheckForAdd(index);
	// 转成 a 数组
    Object[] a = c.toArray();
    int numNew = a.length;
    // 扩容至确保可以容纳添加后的元素
    ensureCapacityInternal(size + numNew);  // Increments modCount
	// 如果插入的位置已经有元素了，则需要计算需要挪动的位置数，并将其后移
    int numMoved = size - index;
    if (numMoved > 0)
    	// 后移并插入数组
        System.arraycopy(elementData, index, elementData, index + numNew,
                         numMoved);
	// 插入数组
    System.arraycopy(a, 0, elementData, index, numNew);
    size += numNew;
    return numNew != 0;
}
```

### 删除元素

1. 删除指定位置的单个元素 `remove(int index)`

```java
// 移除此列表中指定位置的元素。将任何后续元素向左移动（从它们的索引中减去 1）
public E remove(int index) {
    // 检查索引是否超出数组范围
    rangeCheck(index);

    modCount++;
    // 获取指定位置元素
    E oldValue = elementData(index);
	// 判断需要左移的元素个数
    int numMoved = size - index - 1;
    if (numMoved > 0)
        // 移动
        System.arraycopy(elementData, index+1, elementData, index,
                         numMoved);
    // 将新的末尾置为 null，帮助 GC
    elementData[--size] = null; // clear to let GC do its work
    // 返回删除的元素值
    return oldValue;
}
```

2. 删除单个指定元素 `remove(Object o)`

```java
// 从此列表中删除第一次出现的指定元素（如果存在）。如果列表不包含该元素，则它不变
public boolean remove(Object o) {
    if (o == null) {
        for (int index = 0; index < size; index++)
            // 如果要删除的元素为 null，使用 == 判断
            if (elementData[index] == null) {
                // 删除元素
                fastRemove(index);
                return true;
            }
    } else {
        for (int index = 0; index < size; index++)
            // 如果要删除的元素不为 null，使用 equals 判断
            if (o.equals(elementData[index])) {
                fastRemove(index);
                return true;
            }
    }
    return false;
}

// 从数组删除元素
private void fastRemove(int index) {
    modCount++;
    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,
                         numMoved);
    elementData[--size] = null; // clear to let GC do its work
}
```

3. 删除指定集合中的所有元素 `removeAll(Collection<?> c)`

> 注意其中的 `complement` 参数，当需要删除元素时，`complement` 为 false，表示在集合 c 中，就不执行后续代码（保留元素）；当需要保留元素时，`complement` 为 true，表示在集合 c 中，就执行后续代码（保留元素）。
> 
> 在 `finally` 块中， 如果 contains 方法发生异常，则将 es 从 r 位置的数据写入到 es 从 w 开始的位置。这样，保证我们剩余未遍历到的元素，能够挪到从从 w 开始的位置，避免多出来一些元素。最后对移动后空出位置的值设为 null，帮助 GC

```java
// 从此列表中删除包含在指定集合中的所有元素
public boolean removeAll(Collection<?> c) {
    // 断言指定集合不为null
    Objects.requireNonNull(c);
    return batchRemove(c, false);
}

// 批量删除元素
private boolean batchRemove(Collection<?> c, boolean complement) {
    final Object[] elementData = this.elementData;
    int r = 0, w = 0;
    boolean modified = false;
    try {
        // 遍历数组元素
        for (; r < size; r++)
            // 继续遍历 elementData 数组，如何符合条件（由传入参数 complement 确定），则进行移除
            if (c.contains(elementData[r]) == complement)
                // 移除的方式，通过将当前值 e 写入到 w 位置，然后 w 跳到下一个位置。
                // 例如：complement 为 false，即当前元素不在待删除列表里面，则当前元素写入 w 位置，w 代表剩余元素的索引
                // 如果当前元素在待删除元素里面，则不会执行下面语句看，即表示元素不在存在于 elementData 中
                elementData[w++] = elementData[r];
    } finally {
        // 保持与 AbstractCollection 的行为兼容性，即使 c.contains() 抛出异常
        // 如果 contains 方法发生异常，则将 elementData 从 r 位置的数据写入到 elementData 从 w 开始的位置
        if (r != size) {
            System.arraycopy(elementData, r,
                             elementData, w,
                             size - r);
            w += size - r;
        }
        // 如果有元素被删除了
        if (w != size) {
            // 将数组 [w, size-1) 位置赋值为 null,帮助 GC
            for (int i = w; i < size; i++)
                elementData[i] = null;
            modCount += size - w;
            // 更改 size 大小为 w（剩余元素个数）
            size = w;
            modified = true;
        }
    }
    return modified;
}
```

4. 删除一定范围的元素 `removeRange(int fromIndex, int toIndex)`

```java
// 从此列表中删除索引在fromIndex （包括）和toIndex （不包括）之间的所有元素。将任何后续元素向左移动
protected void removeRange(int fromIndex, int toIndex) {
    modCount++;
    // 计算需要移动的元素个数
    int numMoved = size - toIndex;
    // 移动数组
    System.arraycopy(elementData, toIndex, elementData, fromIndex,
                     numMoved);

    // 将空出位置的值至为 null，帮助 GC
    int newSize = size - (toIndex-fromIndex);
    for (int i = newSize; i < size; i++) {
        elementData[i] = null;
    }
    size = newSize;
}
```

### 查找元素

1. 查找指定索引的元素 `get(int index)`

```java
// 返回此列表中指定位置的元素。
public E get(int index) {
    // 判断 index 是否越界
    rangeCheck(index);
    return elementData(index);
}

// 返回数组指定位置的元素（类型转换）
E elementData(int index) {
    return (E) elementData[index];
}
```

2. 查找某个元素首次出现的索引 `indexOf(Object o)`

```java
// 返回此列表中指定元素第一次出现的索引，如果此列表不包含该元素，则返回 -1
public int indexOf(Object o) {
    if (o == null) {
        // 如果要查找的元素为 null，使用 == 判断
        for (int i = 0; i < size; i++)
            if (elementData[i]==null)
                return i;
    } else {
        // 如果要查找的元素不为 null，使用 equals 判断
        for (int i = 0; i < size; i++)
            if (o.equals(elementData[i]))
                return i;
    }
    // 未查找到，返回 -1
    return -1;
}
```

3. 判断集合是否包含指定元素 `contains(Object o)`

```java
// 如果此列表包含指定元素，则返回true
public boolean contains(Object o) {
    // 调用 indexOf 方法，如果存在，则 indexOf 的结果应该大于等于 0
    return indexOf(o) >= 0;
}
```

4. 查找指定元素最后出现的位置 `lastIndexOf(Object o)`

```java
// 返回此列表中指定元素最后一次出现的索引，如果此列表不包含该元素，则返回 -1
public int lastIndexOf(Object o) {
    if (o == null) {
        // 从数组末尾开始遍历，如果要查找的元素为 null，使用 == 判断
        for (int i = size-1; i >= 0; i--)
            if (elementData[i]==null)
                return i;
    } else {
        // 从数组末尾开始遍历，如果要查找的元素不为 null，使用 equals 判断
        for (int i = size-1; i >= 0; i--)
            if (o.equals(elementData[i]))
                return i;
    }
    // 未查找到，返回 -1
    return -1;
}
```

### 更新元素

设置指定位置的元素 `set(int index, E element)`

```java
public E set(int index, E element) {
    // 检查 index 是否越界
    rangeCheck(index);
	// 获得 index 位置的原元素
    E oldValue = elementData(index);
    // 修改 index 位置为新元素
    elementData[index] = element;
    // 返回 index 位置的原元素
    return oldValue;
}
```

### 清空数组

清空数组 `clear()`

```java
public void clear() {
    modCount++;

    // 数组元素全部置为 null
    for (int i = 0; i < size; i++)
        elementData[i] = null;
	// 修改 size 为 0
    size = 0;
}
```

### 转换为数组

1. 将 ArrayList 转换成 `Object` 数组 `toArray()`

```java
public Object[] toArray() {
    return Arrays.copyOf(elementData, size);
}

// Arrays.java
public static <T> T[] copyOf(T[] original, int newLength) {
    return (T[]) copyOf(original, newLength, original.getClass());
}
```

2. 还有一个可泛型的数组转换方法 `toArray(T[] a)`

```java
public <T> T[] toArray(T[] a) {
    if (a.length < size)
        // a 数组长度不够时，重新创建一个新 T 类型的新数组，并放入全部集合元素
        return (T[]) Arrays.copyOf(elementData, size, a.getClass());
    // 长度足够时，直接拷贝进 a 数组中
    System.arraycopy(elementData, 0, a, 0, size);
    if (a.length > size)
        // 如果 a 数组未全部填充，剩余部分补充 null， 帮助 GC
        a[size] = null;
    return a;
}
```

### 判断相等

继承自 `AbstractList` 类重写后的 `equals(Object o)` 方法

```java
public boolean equals(Object o) {
    // 是同一个对象
    if (o == this)
        return true;
    // 如果不为 List 类型，直接不相等
    if (!(o instanceof List))
        return false;

    ListIterator<E> e1 = listIterator();
    ListIterator<?> e2 = ((List<?>) o).listIterator();
    // 同时使用迭代器遍历两个集合，比较对应的元素
    while (e1.hasNext() && e2.hasNext()) {
        E o1 = e1.next();
        Object o2 = e2.next();
        // 不同时为 null，或者不相等时返回 false
        if (!(o1==null ? o2==null : o1.equals(o2)))
            return false;
    }
    // 两个集合元素数量必须相同，即同时遍历完毕
    return !(e1.hasNext() || e2.hasNext());
}
```

### 序列化

1. 序列化 `writeObject(java.io.ObjectOutputStream s)`

```java
private void writeObject(java.io.ObjectOutputStream s) throws java.io.IOException{
    // 获得当前的数组修改次数
    int expectedModCount = modCount;
    // 写入非静态属性、非 transient 属性
    s.defaultWriteObject();

    // 写入 size ，主要为了与 clone 方法的兼容
    s.writeInt(size);

    // 逐个写入 elementData 数组的元素，只写入[0, size-1]的元素，因为其扩容后，有一定预留空间
    for (int i=0; i<size; i++) {
        s.writeObject(elementData[i]);
    }
	// 如果修改次数发生变化，则抛出异常
    if (modCount != expectedModCount) {
        throw new ConcurrentModificationException();
    }
}
```

2. 反序列化 `readObject(java.io.ObjectInputStream s)`

```java
private void readObject(java.io.ObjectInputStream s) 
    throws java.io.IOException, ClassNotFoundException {
    // 内部数组置为空数组
    elementData = EMPTY_ELEMENTDATA;

    // 读取非静态熟悉、非 transient 属性
    s.defaultReadObject();

    // 读取 size
    s.readInt(); // ignored

    if (size > 0) {
        // 根据 size 大小扩容
        int capacity = calculateCapacity(elementData, size);
        // unknown
        SharedSecrets.getJavaOISAccess().checkArray(s, Object[].class, capacity);
        // 扩容至确保可以容纳添加后的元素
        ensureCapacityInternal(size);
		// 创建 a 数组，与 elementData 同一数组
        Object[] a = elementData;
        // 逐个读取数组元素的数据，写入
        for (int i=0; i<size; i++) {
            // 赋值 a，即赋值 elementData
            a[i] = s.readObject();
        }
    }
}
```

### 克隆

克隆数组 `clone()`

```java
public Object clone() {
    try {
        // 调用父类，进行克隆
        ArrayList<?> v = (ArrayList<?>) super.clone();
        // 拷贝一个新的数组，不会与原数组进行共享
        v.elementData = Arrays.copyOf(elementData, size);
        // 设置数组修改次数为 0
        v.modCount = 0;
        return v;
    } catch (CloneNotSupportedException e) {
        // this shouldn't happen, since we are Cloneable
        throw new InternalError(e);
    }
}
```

### 创建子数组

创建子数组 `subList(int fromIndex, int toIndex)`

```java
// 返回类型为 List
public List<E> subList(int fromIndex, int toIndex) {
    // 索引下标越界检查
    subListRangeCheck(fromIndex, toIndex, size);
    // 创建一个 SubList 对象
    return new SubList(this, 0, fromIndex, toIndex);
}

// sublist 是 ArrayList 的内部类，它继承了 AbstractList 
private class SubList extends AbstractList<E> implements RandomAccess {
    private final AbstractList<E> parent;
    private final int parentOffset;
    private final int offset;
    int size;

    SubList(AbstractList<E> parent,
            int offset, int fromIndex, int toIndex) {
        this.parent = parent;
        this.parentOffset = fromIndex;
        this.offset = offset + fromIndex;
        this.size = toIndex - fromIndex;
        this.modCount = ArrayList.this.modCount;
    }
    // 。。。
}
```

### 迭代器

1. iterator 迭代器

```java
public Iterator<E> iterator() {
    // Itr 为 ArrayList 的内部类
    return new Itr();
}
```

> `Itr` 为 `ArrayList` 的内部类，它继承了 `Iterator` 接口，实现了迭代器该有的方法

`Itr` 的源码：

```java
private class Itr implements Iterator<E> {
    // 下一个访问元素的位置，从下标 0 开始
    int cursor;
    // 上一次访问元素的位置，初始化时为 -1
    int lastRet = -1;
    // 创建迭代器时，数组修改次数，修改次数不一致时，表示数组发生了变化，会抛异常
    int expectedModCount = modCount;
    
    Itr() {}

    // 判断是否还可以迭代
    public boolean hasNext() {
        // cursor 如果等于 size ，说明已经到数组末尾，无法继续迭代了
        return cursor != size;
    }

    // 获取下一个元素
    @SuppressWarnings("unchecked")
    public E next() {
        // 校验是否数组发生了变化
        checkForComodification();
        // i 记录当前 cursor 的位置
        int i = cursor;
        // 越界抛异常
        if (i >= size)
            throw new NoSuchElementException();
        Object[] elementData = ArrayList.this.elementData;
        // 判断如果超过 elementData 大小，说明可能被修改了，抛出 ConcurrentModificationException 异常
        if (i >= elementData.length)
            throw new ConcurrentModificationException();
        // cursor 加一，指向下一个位置
        cursor = i + 1;
        // lastRet 指向当前位置，并返回当前元素
        return (E) elementData[lastRet = i];
    }

    // 删除当前元素
    public void remove() {
        // 如果 lastRet 小于 0，说明没有指向任何元素，抛出 IllegalStateException 异常
        if (lastRet < 0)
            throw new IllegalStateException();
        // 检查数组是否发生了变化
        checkForComodification();

        try {
            // 删除 lastRet 位置的元素
            ArrayList.this.remove(lastRet);
            // 由于当前元素被删除了，后面的元素前移了，因此指针也需要前移
            cursor = lastRet;
            // 将 lastRet 置为 -1！
            lastRet = -1;
            // 记录新的数组的修改次数：因为此处修改了数组，如果不修改下，后续迭代肯定会报错
            expectedModCount = modCount;
        } catch (IndexOutOfBoundsException ex) {
            throw new ConcurrentModificationException();
        }
    }

    // 消费剩余未迭代的元素
    @Override
    @SuppressWarnings("unchecked")
    public void forEachRemaining(Consumer<? super E> consumer) {
        // 要求参数非空
        Objects.requireNonNull(consumer);
        // 获得当前数组大小
        final int size = ArrayList.this.size;
        // 记录当前 cursor
        int i = cursor;
        if (i >= size) {
            return;
        }
        final Object[] elementData = ArrayList.this.elementData;
        if (i >= elementData.length) {
            throw new ConcurrentModificationException();
        }
        // 从待迭代的位置开始，对每个元素进行函数操作
        while (i != size && modCount == expectedModCount) {
            consumer.accept((E) elementData[i++]);
        }
        // cursor = size
        cursor = i;
        // lastRet 指向数组末尾
        lastRet = i - 1;
        // 检查数组是否发生了变化
        checkForComodification();
    }

    final void checkForComodification() {
        if (modCount != expectedModCount)
            throw new ConcurrentModificationException();
    }
}
```

2. ListIterator 迭代器

> `ListIterator` 迭代器 是为 List 设计的功能更强大的迭代器，`ListIterator` 继承了 `Itr` ，并提供了更多的方法。

```java
// ArrayList.java

public ListIterator<E> listIterator(int index) {
    rangeCheckForAdd(index);
    return new ListItr(index);
}

public ListIterator<E> listIterator() {
    return new ListItr(0);
}
```

```java
// ArrayList.java#ListItr

private class ListItr extends Itr implements ListIterator<E> {
    ListItr(int index) {
        super();
        cursor = index;
    }

    // 是否有前一个
    public boolean hasPrevious() {
        return cursor != 0;
    }

    // 下一个位置
    public int nextIndex() {
        return cursor;
    }

    // 前一个位置
    public int previousIndex() {
        return cursor - 1;
    }

    // 前一个元素
    @SuppressWarnings("unchecked")
    public E previous() {
        // 检查数组是否发生了变化
        checkForComodification();
        // i 指向
        int i = cursor - 1;
        if (i < 0)
            throw new NoSuchElementException();
        Object[] elementData = ArrayList.this.elementData;
        if (i >= elementData.length)
            throw new ConcurrentModificationException();
        // cursor 指向上一个位置
        cursor = i;
        // lastRet 指向当前位置，返回当前位置的元素
        return (E) elementData[lastRet = i];
    }

    // 设置当前元素
    public void set(E e) {
        if (lastRet < 0)
            throw new IllegalStateException();
        // 检查数组是否发生了变化
        checkForComodification();

        try {
            // 赋值
            ArrayList.this.set(lastRet, e);
        } catch (IndexOutOfBoundsException ex) {
            throw new ConcurrentModificationException();
        }
    }

    // 添加元素到当前位置
    public void add(E e) {
        // 检查数组是否发生了变化
        checkForComodification();
        try {
            // 添加元素到当前位置
            int i = cursor;
            ArrayList.this.add(i, e);
            // cursor 指向下一个位置，因为当前位置添加了新的元素，所以需要后挪
            cursor = i + 1;
            // lastRet 标记为 -1 ，因为当前元素并未访问
            lastRet = -1;
            expectedModCount = modCount;
        } catch (IndexOutOfBoundsException ex) {
            throw new ConcurrentModificationException();
        }
    }
}
```

## 参考资料

* [芋道源码](https://www.iocoder.cn/)
* [Java 程序员进阶之路](https://tobebetterjavaer.com/collection/gailan.html)
* [Java全栈知识体系](https://pdai.tech/md/java/collection/java-collection-all.html)
