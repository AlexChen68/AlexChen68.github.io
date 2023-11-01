---
title: Map - HashMap 源码分析
date: 2022-09-30
order: 6
---

# HashMap

## 概述

`HashMap` 是 java 中 Map 接口基于哈希表的实现，用于存储 key-value 键值对的数据结构，提供平均时间复杂度为 O(1) 的、基于 key 级别的 get/put 等操作。

**哈希表**（又成散列表）是一种根据关键码值 (Key-value) 而直接进行访问的数据结构，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做**散列函数**，存放记录的数组叫做散列表。

不同的 key，经过哈希函数转换后，可能得到同一个地址，这种情况称为**哈希冲突**。在 Java 的 HashMap 中，解决冲突的方式是使用**链表法**：通过将数组的每个元素对应一个链表，我们将相同的 `hash(key) % size` 放到对应下标的链表中即可。

当进行查询时，需要进行两步：

1. 对 key 进行散列函数计算 `hash(key) % size`，得到数组中的索引 index，这一步的时间复杂度为 O(1)；
2. 通过 index 查询到的链表中，通过匹配 key 值，得到对应的 value，这一步的时间复杂度是 O(n);

可以优化的地方在第二步，通过使用比普通链表更优的数据结构（比如：跳表、红黑树等），可以进一步提高 HashMap 的性能。事实上，从 JDK 1.8 开始，就使用了”数组 + 链表 + 红黑树“的数据结构。

## 类图

![HashMap 类图](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/java/hashmap_class.png ':size=60%')

`HashMap` 实现了三个接口：
* `java.io.Serializable` 序列化接口
* `java.lang.Cloneable` 可克隆接口
* `java.util.Map` 键值对接口

继承了抽象的 Map 接口 `AbstracMap`，这个抽象类提供了 Map 的一些基本实现。

## 属性

类属性

```java
// 默认初始容量 - 必须是 2 的幂
static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;

// 最大容量，必须是 2 的幂，且小于 1 << 30
static final int MAXIMUM_CAPACITY = 1 << 30;

// 默认负载因子
static final float DEFAULT_LOAD_FACTOR = 0.75f;

// 链表树化成红黑树的阈值长度（必须大于 2 并且应该至少为 8）
static final int TREEIFY_THRESHOLD = 8;

//红黑树转换为链表的阈值长度。应小于 TREEIFY_THRESHOLD，并且最多 6 以在移除时进行收缩检测
static final int UNTREEIFY_THRESHOLD = 6;

// HashMap 允许树化的最小 key-value 键值对数，应至少为 4 * TREEIFY_THRESHOLD 以避免调整大小和树化阈值之间的冲突
static final int MIN_TREEIFY_CAPACITY = 64;

```

实例属性

```java
// 底层存储的数组，该表在首次使用时初始化，并根据需要调整大小。分配时，长度始终是 2 的幂
transient Node<K,V>[] table;

// 调用 `#entrySet()` 方法后的缓存
transient Set<Map.Entry<K,V>> entrySet;

// 键值对数量
transient int size;

// 此 HashMap 已在结构上修改的次数
transient int modCount;

// 阀值，当 size 超过 threshold 时，会进行扩容（容量 * 负载因子）
int threshold;

// 哈希表的负载因子
final float loadFactor;
```

负载 = 数组容量 / 键值对数量（由于有哈希冲突，数组的一个位置可能存在多个元素，因此键值对数量会大于数组容量），当负载因子大于设定的负载因子（默认为 0.75）时，就需要进行扩容。

## 内部类

### Node<K, V>

实现了 Map.Entry 接口，该接口定义在 `java.util.Map` 接口中，Map 中有个 `Set<Map.Entry<K, V>> entrySet()` 方法，可以返回映射的 Set 集合，Entry 表示 Map 中的一个实体 (key-value)。

```java
static class Node<K,V> implements Map.Entry<K,V> {
    // 哈希值
    final int hash;
    // 键
    final K key;
    // 值
    V value;
    // 下一个结点
    Node<K,V> next;

    Node(int hash, K key, V value, Node<K,V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }

    public final K getKey()        { return key; }
    public final V getValue()      { return value; }
    public final String toString() { return key + "=" + value; }

    public final int hashCode() {
        return Objects.hashCode(key) ^ Objects.hashCode(value);
    }

    public final V setValue(V newValue) {
        V oldValue = value;
        value = newValue;
        return oldValue;
    }

    public final boolean equals(Object o) {
        if (o == this)
            return true;
        if (o instanceof Map.Entry) {
            Map.Entry<?,?> e = (Map.Entry<?,?>)o;
            if (Objects.equals(key, e.getKey()) &&
                Objects.equals(value, e.getValue()))
                return true;
        }
        return false;
    }
}
```

### TreeNode<K, V>

红黑树结点 `TreeNode<K, V>`，它继承了 `LinkedHashMap.Entry<K,V>`，而 `LinkedHashMap.Entry<K,V>` 又继承了 `HashMap.Node<K,V>`。因此， `table` 数组中的 `Node<K, V>` 元素可以使用红黑树替换，来表现更优秀的查询性能。

```java
// HashMap.java
static final class TreeNode<K,V> extends LinkedHashMap.Entry<K,V> {
    TreeNode<K,V> parent;  // red-black tree links
    TreeNode<K,V> left;
    TreeNode<K,V> right;
    TreeNode<K,V> prev;    // needed to unlink next upon deletion
    boolean red;
}

// LinkedHashMap.java
static class Entry<K,V> extends HashMap.Node<K,V> {
    Entry<K,V> before, after;
    Entry(int hash, K key, V value, Node<K,V> next) {
        super(hash, key, value, next);
    }
}
```

## 构造方法

### 指定容量和负载因子

```java
public HashMap(int initialCapacity, float loadFactor) {
    // 容量不能小于 0
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " +
                                           initialCapacity);
    // 指定容量限定不能超过最大容量
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    // 检查负载因子有效性
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " +
                                           loadFactor);
    // 设置 loadFactor 属性
    this.loadFactor = loadFactor;
    // 计算 threshold 阀值，阈值为大于容量的最小 2 的 N 次方
    this.threshold = tableSizeFor(initialCapacity);
}

// 返回大于 cap 的最小 2 的 N 次方，该算法让最高位的 1 后面的位全变为 1，最后再加 1
// >>> 表示无符号右移
// a |= b 等效于 a = a | b
static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

### 指定容量

```java
public HashMap(int initialCapacity) {
    // 指定容量，使用默认负载因子
    this(initialCapacity, DEFAULT_LOAD_FACTOR);
}
```

### 无参构造

```java
public HashMap() {
    // 设置为初始负载因子 0.75，其他的为默认
    this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
}
```

### 指定 Map

```java
public HashMap(Map<? extends K, ? extends V> m) {
    this.loadFactor = DEFAULT_LOAD_FACTOR;
    // 批量将 map 键值对放入 table 中
    putMapEntries(m, false);
}
```

```java
final void putMapEntries(Map<? extends K, ? extends V> m, boolean evict) {
    // 获取待添加数量
    int s = m.size();
    if (s > 0) {
        // table 为 null，延迟初始化的证明
        if (table == null) { // pre-size
            // 计算需要初始化的 table 数组大小
            float ft = ((float)s / loadFactor) + 1.0F;
            // 限定不超过最大容量
            int t = ((ft < (float)MAXIMUM_CAPACITY) ?
                     (int)ft : MAXIMUM_CAPACITY);
            // 如果大于阈值，设定新的阈值
            if (t > threshold)
                threshold = tableSizeFor(t);
        }
        // 如果 table 非空
        else if (s > threshold)
            // 如果超过阈值，需要扩容
            resize();
        // 遍历 m，挨个插入到 HashMap 中
        for (Map.Entry<? extends K, ? extends V> e : m.entrySet()) {
            K key = e.getKey();
            V value = e.getValue();
            putVal(hash(key), key, value, false, evict);
        }
    }
}
```

* 这些构造方法的 `table` 数组属性都没有初始化，采用了延迟初始化的策略

* 为什么要求容量是 2 的幂次？

  HashMap 容量取 2 的 n 次方，主要与 hash 寻址有关。在 put(key,value) 时，putVal() 方法中通过 i = (n - 1) & hash 来计算 key 的散列地址。其实，i = (n - 1) & hash 是一个%操作。也就是说，HashMap 是通过%运算来获得 key 的散列地址的。但是，%运算的速度并没有&的操作速度快。而&操作能代替%运算，必须满足一定的条件，也就是 a%b=a&(b-1) 仅当 b 是 2 的 n 次方的时候方能成立。这也就是为什么 HashMap 的容量需要保持在 2 的 n 次方了。

## 哈希函数

对于哈希函数来说，有两个方面特别重要：

- 性能足够高。因为基本 HashMap 所有的操作，都需要用到哈希函数。
- 对于计算出来的哈希值足够离散，保证哈希冲突的概率更小。

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

具体步骤为：

1. 定义 int 变量 h，当 key 为 null 时，返回的哈希值就为 0；
2. key 不为 null 时，调用 key 的 hashCode 函数，并赋值给 h；
3. h 和 h 的无符号右移 16 位的值进行异或运算，得到最终的哈希值。

![HashMap 的 hash 函数](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/java/hashmap_hash.png)

## 数组扩容

HashMap 内部的数组 `table` ，在初始化的时候是不创建的，而是在首次添加键值对时，通过 `resize()` 初始化。在 `resize()` 方法中，如果数组已经创建，则会对其进行 2 倍容量的扩展。

```java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    // 1. 计算新的容量和扩容阀值，并创建新的 table 数组
    // 1.1 如果数组不为空
    if (oldCap > 0) {
        // 超过最大容量，则直接设置 threshold 阀值为 Integer.MAX_VALUE，不再允许扩容
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        // newCap = oldCap << 1，目的是两倍扩容；当前容量大于默认容量
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                 oldCap >= DEFAULT_INITIAL_CAPACITY)
            // newThr 设置为 oldThr 的 2 倍
            newThr = oldThr << 1; // double threshold
    }
    // 1.2 数组为空，需要初始化；【非默认构造方法】oldThr 大于 0，则使用 oldThr 作为新的容量
    else if (oldThr > 0) // initial capacity was placed in threshold
        // 新的容量设置为旧的阈值（初始化时为大于容量的最小 2 的 N 次方）
        newCap = oldThr;
    else {
        //1.3【默认构造方法】oldThr 等于 0，则使用 DEFAULT_INITIAL_CAPACITY 作为新的容量，
        // 使用 DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY 作为新的容量
        newCap = DEFAULT_INITIAL_CAPACITY;// 16
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);// 0.75 * 16 = 12
    }
    // 1.4 如果上述的逻辑，未计算新的阀值，则使用 newCap * loadFactor 作为新的阀值
    if (newThr == 0) {
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    // 赋值新阈值
    threshold = newThr;
    // 2. 扩容数组：
    @SuppressWarnings({"rawtypes","unchecked"})
    // 2.1 创建 newCap 大小的结点数组，并赋值给 table
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;
    // 2.2 如果旧 table 不为空，则需要复制数据
    if (oldTab != null) {
        // 遍历旧数组
        for (int j = 0; j < oldCap; ++j) {
            // 缓存结点
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                // 2.2.1 旧数组数据置为 null
                oldTab[j] = null;
                // 2.2.2 如果结点链表只有一个元素，直接赋值给新数组即可
                if (e.next == null)
                    newTab[e.hash & (newCap - 1)] = e;
                // 2.2.3 如果结点是红黑树，调用红黑树的 split 方法，将数据赋值到新数组中
                else if (e instanceof TreeNode)
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                // 2.2.4 如果结点是链表
                else { // preserve order
                    // HashMap 是成倍扩容，这样原来位置的链表的节点们，会被分散到新的 table 的两个位置中去
                    // 通过 e.hash & oldCap 计算，根据结果分到高位、和低位的位置中。
                    // 1. 如果结果为 0 时，则放置到低位
                    // 2. 如果结果非 1 时，则放置到高位
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        // next 指向下一个节点
                        next = e.next;
                        // 满足低位
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        // 满足高位
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    // 设置低位到新的 newTab 的 j 位置上
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    // 设置高位到新的 newTab 的 j + oldCap 位置上
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab;
}
```

在 2.2.4 中，如何确定链表扩容后的位置，可以参考这篇文章 [HashMap 扩容机制](https://www.cnblogs.com/liaozhiwei/p/15644325.html)

## Map 操作

### 添加键值对

**1.  添加单个键值对**

```java
// 键不存在时，添加键值对；键存在时，更新 key 对应的 value
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

// 仅在键存在时，添加键值对
public V putIfAbsent(K key, V value) {
    return putVal(hash(key), key, value, true, true);
}

final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    // table 数组
    Node<K,V>[] tab;
    // 对应位置的 node 结点
    Node<K,V> p; 
    // n 为数组长度，i 为键值对在数组中的索引
    int n, i;
    if ((tab = table) == null || (n = tab.length) == 0)
        // 如果 table 未初始化，或者容量为 0，则进行扩容
        n = (tab = resize()).length;
    // 索引 i = (n - 1) & hash，赋值 p 为 i 位置的结点
    if ((p = tab[i = (n - 1) & hash]) == null)
        // 如果结点为空，则新建一个，并写入数组中
        tab[i] = newNode(hash, key, value, null);
    // 如果对应位置的 Node 节点非空，则可能存在哈希冲突
    else {
        // 用于存储 key 对应的旧结点
        Node<K,V> e; 
        // 缓存 key
        K k;
        // 如果当前结点的哈希值等于 hash 参数，且当前结点的 key 等于参数的 key，则表明当前结点 p 就是要找的结点
        if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        // 如果当前结点 p 是红黑树结点
        else if (p instanceof TreeNode)
            // 调用红黑树的 putTreeVal 
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        // 如果找到的 p 是 Node 节点，则说明是链表，需要遍历查找
        else {
             // 从链表第一个结点往下找
            for (int binCount = 0; ; ++binCount) {
               	// 如果下一个结点是 null 了还没找到，说明 key 不在 HashMap 中，新增结点即可
                if ((e = p.next) == null) {
                    // 创建新的 Node 节点
                    p.next = newNode(hash, key, value, null);
                    // 链表的长度如果数量达到 TREEIFY_THRESHOLD（8）时，则将链表转换为红黑树
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        treeifyBin(tab, hash);
                    break;
                }
                // 如果 e 匹配键值对，退出循环
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                // p 指向下一个结点
                p = e;
            }
        }
        // 如果 e 不为 null，表示存在旧的键值对了，则需要更新 value 值
        if (e != null) { // existing mapping for key
            V oldValue = e.value;
            // onlyIfAbsent 为 true 时，不需要更新值，反之，需要更新旧值
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            // 节点被访问的回调
            afterNodeAccess(e);
            // 返回旧值
            return oldValue;
        }
    }
    // 修改次数加 1
    ++modCount;
    // 如果数组 size 超过扩容阈值，则需要扩容
    if (++size > threshold)
        resize();
    // 添加节点后的回调
    afterNodeInsertion(evict);
    // 返回 null
    return null;
}
```

**2. 添加多个键值对**

```java
public void putAll(Map<? extends K, ? extends V> m) {
    putMapEntries(m, true);
}

final void putMapEntries(Map<? extends K, ? extends V> m, boolean evict) {
    // 获取待添加数量
    int s = m.size();
    if (s > 0) {
        // table 为 null，延迟初始化的证明
        if (table == null) { // pre-size
            // 计算需要初始化的 table 数组大小
            float ft = ((float)s / loadFactor) + 1.0F;
            // 限定不超过最大容量
            int t = ((ft < (float)MAXIMUM_CAPACITY) ?
                     (int)ft : MAXIMUM_CAPACITY);
            // 如果大于阈值，设定新的阈值
            if (t > threshold)
                threshold = tableSizeFor(t);
        }
        // 如果 table 非空
        else if (s > threshold)
            // 如果超过阈值，需要扩容
            resize();
        // 遍历 m，挨个插入到 HashMap 中
        for (Map.Entry<? extends K, ? extends V> e : m.entrySet()) {
            K key = e.getKey();
            V value = e.getValue();
            putVal(hash(key), key, value, false, evict);
        }
    }
}
```

### 查找键值对

1. **根据 key 查询 value**

```java
public V get(Object key) {
    Node<K,V> e;
    // hash(key) 哈希值
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
    // 查找 hash 对应 table 位置的 p 节点
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) {
        // 如果找到的 first 节点，就是要找的，则则直接使用即可
        if (first.hash == hash && // always check first node
            ((k = first.key) == key || (key != null && key.equals(k))))
            return first;
        if ((e = first.next) != null) {
            // 如果找到的 first 节点，是红黑树 Node 节点，则直接在红黑树中查找
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
            // 如果找到的 e 是 Node 节点，则说明是链表，需要遍历查找
            do {
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}
```

2. **判断是否包含 key**

```java
public boolean containsKey(Object key) {
    return getNode(hash(key), key) != null;
}
```

3. **判断是否包含 value**

```java
public boolean containsValue(Object value) {
    Node<K,V>[] tab; V v;
    if ((tab = table) != null && size > 0) {
        // 遍历 table 数组
        for (Node<K,V> e : tab) {
            // 处理链表或者红黑树节点
            for (; e != null; e = e.next) {
                // 如果值相等，则返回 true
                if ((v = e.value) == value ||
                    (value != null && value.equals(v)))
                    return true;
            }
        }
    }
    // 找不到，返回 false
    return false;
}
```

4. **获得 key 对应的 value，如果不存在，则返回 `defaultValue` 默认值**

```java
public V getOrDefault(Object key, V defaultValue) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? defaultValue : e.value;
}
```

### 链表转为树

大部分情况下，链表的长度不会大于 8，也就不会转换为红黑树，到达 8 的概率不到千万分之一；另一方面，在树化的方法中，当 table 容量小于 MIN_TREEIFY_CAPACITY(64) 时，会先进行扩容，扩容后链表的位置会分裂进而同一个位置的数量会减小。

```java
final void treeifyBin(Node<K,V>[] tab, int hash) {
    int n, index; Node<K,V> e;
    // <1> 如果 table 容量小于 MIN_TREEIFY_CAPACITY(64) ，则选择扩容
    if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
        resize();
    // <2> 将 hash 对应位置进行树化
    else if ((e = tab[index = (n - 1) & hash]) != null) {
        // 顺序遍历链表，逐个转换成 TreeNode 节点
        TreeNode<K,V> hd = null, tl = null;
        do {
            TreeNode<K,V> p = replacementTreeNode(e, null);
            if (tl == null)
                hd = p;
            else {
                p.prev = tl;
                tl.next = p;
            }
            tl = p;
        } while ((e = e.next) != null);
        // 树化
        if ((tab[index] = hd) != null)
            hd.treeify(tab);
    }
}
```

### 清空 Map

```java
public void clear() {
    Node<K,V>[] tab;
    // 增加修改次数
    modCount++;
    if ((tab = table) != null && size > 0) {
        // 设置大小为 0
        size = 0;
        // 设置每个位置为 null
        for (int i = 0; i < tab.length; ++i)
            tab[i] = null;
    }
}
```

### 序列化

```java
private void writeObject(java.io.ObjectOutputStream s)
    throws IOException {
    // 获得 HashMap table 数组大小
    int buckets = capacity();
    // Write out the threshold, loadfactor, and any hidden stuff
    // 写入非静态属性、非 transient 属性
    s.defaultWriteObject();
    // 写入 table 数组大小
    s.writeInt(buckets);
    // 写入 key-value 键值对数量
    s.writeInt(size);
    // 写入具体的 key-value 键值对
    internalWriteEntries(s);
}

// 获取 table 数组大小
final int capacity() {
    return (table != null) ? table.length :
        (threshold > 0) ? threshold :
        DEFAULT_INITIAL_CAPACITY;
}

// 写入具体的 key-value 键值对
void internalWriteEntries(java.io.ObjectOutputStream s) throws IOException {
    Node<K,V>[] tab;
    if (size > 0 && (tab = table) != null) {
        // 遍历 table 数组
        for (Node<K,V> e : tab) {
            // 遍历链表或红黑树
            for (; e != null; e = e.next) {
                // 写入 key
                s.writeObject(e.key);
                // 写入 value
                s.writeObject(e.value);
            }
        }
    }
}
```

### 反序列化

```java
private void readObject(java.io.ObjectInputStream s)
    throws IOException, ClassNotFoundException {
    // 读取非静态属性、非 transient 属性
    s.defaultReadObject();
    // 重新初始化
    reinitialize();
    // 校验 loadFactor 参数
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new InvalidObjectException("Illegal load factor: " +
                                         loadFactor);
    // 读取 HashMap table 数组大小
    s.readInt(); 
    // 读取 key-value 键值对数量 size
    int mappings = s.readInt(); 
    // 校验 size 参数
    if (mappings < 0)
        throw new InvalidObjectException("Illegal mappings count: " +
                                         mappings);
    else if (mappings > 0) { 
        // range of 0.25...4.0
        float lf = Math.min(Math.max(0.25f, loadFactor), 4.0f);
        float fc = (float)mappings / lf + 1.0f;
        // 计算容量
        int cap = ((fc < DEFAULT_INITIAL_CAPACITY) ?
                   DEFAULT_INITIAL_CAPACITY :
                   (fc >= MAXIMUM_CAPACITY) ?
                   MAXIMUM_CAPACITY :
                   tableSizeFor((int)fc));
        // 计算 threshold 阀值
        float ft = (float)cap * lf;
        threshold = ((cap < MAXIMUM_CAPACITY && ft < MAXIMUM_CAPACITY) ?
                     (int)ft : Integer.MAX_VALUE);
        SharedSecrets.getJavaObjectInputStreamAccess().checkArray(s, Map.Entry[].class, cap);
        // 创建 table 数组
        @SuppressWarnings({"rawtypes","unchecked"})
        Node<K,V>[] tab = (Node<K,V>[])new Node[cap];
        table = tab;

        // 遍历读取 key-value 键值对
        for (int i = 0; i < mappings; i++) {
            // 读取 key
            @SuppressWarnings("unchecked")
            K key = (K) s.readObject();
            // 读取 value
            @SuppressWarnings("unchecked")
            V value = (V) s.readObject();
            // 添加 key-value 键值对
            putVal(hash(key), key, value, false, false);
        }
    }
}

// 重置为初始默认状态。由 clone 和 readObject 调用
void reinitialize() {
    table = null;
    entrySet = null;
    keySet = null;
    values = null;
    modCount = 0;
    threshold = 0;
    size = 0;
}
```

## 总结

`HashMap` 是一种散列表的数据结构，底层采用数组 + 链表 + 红黑树来实现，使用 Node 数组（Node<K,V>[] table）存储数据，在数组的具体索引位置，如果存在多个节点，则可能是以链表或红黑树的形式存在。

`HashMap` 默认容量为 16(`1 << 4`)，每次超过阀值时，按照两倍大小进行自动扩容，所以容量总是 2^N 次方。并且，底层的 `table` 数组是延迟初始化，在首次添加 key-value 键值对才进行初始化。

`HashMap` 根据 key 计算哈希值得到数组中位置的过程：

- 调用 key 的 `hashCode()` 方法，得到哈希值 h；
- 将 h 与 h >>> 16 进行**异或**运算得到新哈希值 h；
- 在 h 和 (length-1) 进行**与**运算，得到 key 在哈希桶数组中位置。

`HashMap` 每个槽位在满足如下两个条件时，可以进行树化成红黑树，避免槽位是链表数据结构时，链表过长，导致查找性能过慢：

- 条件一，HashMap 的 `table` 数组大于等于 64。
- 条件二，槽位链表长度大于等于 8 时。选择 8 作为阀值的原因是，参考 [泊松概率函数 (Poisson distribution)](http://en.wikipedia.org/wiki/Poisson_distribution) ，概率不足千万分之一。
- 在槽位的红黑树的节点数量小于等于 6 时，会退化回链表。

## 参考资料

* [芋道源码](https://www.iocoder.cn/)
* [Java8—HashMap 之 tableSizeFor()](https://www.jianshu.com/p/cbe3f22793be?u_atoken=389c0186-45bc-4ba6-97f1-8bbb7a3e4341&u_asession=015cDlaaOXLfbDL5uptAIcb3E81XckrpHezfGiGtqOUvuVi96ixk9Q4F0fhWtg7-mSX0KNBwm7Lovlpxjd_P_q4JsKWYrT3W_NKPr8w6oU7K-yznd_ThP1xiul9bL2S04InHmbkqVcEgdObpAroqY1_GBkFo3NEHBv0PZUm6pbxQU&u_asig=05Lp3qL_cCDfZcsRdAuiHlpEiDTnR6JoXH6mpQhKQT9rEhLlu7YRt05038ORm4miM2Pmxw4NvfxEd3eh7Nhq8OIbKP3iiCG_RJoEFESGSjFZ_KXXoNMnGnGmEIOIsGgBnOvGdZS_04ClqxMbGyxdBEegM9iatjONN7hXA86TwyPBX9JS7q8ZD7Xtz2Ly-b0kmuyAKRFSVJkkdwVUnyHAIJzbOZ5aj1FYacQjaymGdaRP1_XmSZ1WpEB5T6z6oX2yCY6xbSxAaWh9ph0bRUFW-6vO3h9VXwMyh6PgyDIVSG1W_kkdfGvHZi4IzMzfbBrJC2nWtBrWI9OIMXDMZFVpvEDkhKEvUTiPAwMFaRQHosGdHlI13pYgjOazBqUFWsMvbYmWspDxyAEEo4kbsryBKb9Q&u_aref=%2BtDWq%2FOl84O3riXs%2BFgR3Q2khd4%3D)
* [胖君-hash 方法原理](https://www.zhihu.com/question/20733617/answer/111577937)
