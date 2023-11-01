---
title: Map - TreeMap 源码分析
date: 2022-09-30
order: 8
---

# TreeMap

## 概述

`TreeMap` 是一个可以按照 key 的顺序排序的 Map 实现类，它底层使用红黑树实现。

红黑树是一种二叉查找树，左子结点的值都小于父结点，右子结点的值都大于父结点；红黑树会进行自平衡，避免树的高度过高，导致查找性能下降。因此，红黑树能提供 `logN` 的时间复杂度。

## 类图

![TreeMap 类图](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/java/treemap_class.png)

- `TreeMap`  继承了 `java.util.AbstracMap` 类，这个类提供了 Map 的基本实现；
- 实现了 `java.util.NavigableMap` 接口，这个接口又继承自 `java.util.SortedMap` 接口，表明 `TreeMap` 是一个可排序的 Map 接口；
- 实现了 `java.io.Serializable` 接口；
- 实现了 `java.io.Cloneable` 接口。

## 属性

```java
// key 排序器
private final Comparator<? super K> comparator;

// 红黑树的根结点
private transient Entry<K,V> root;

// key-value 键值对数量
private transient int size = 0;

// 修改次数
private transient int modCount = 0;
```

`Comparator<? super K>` 是一个函数式接口，可以通过重写其 `compare` 方法实现自定义的排序逻辑。

## 内部类

`Entry<K,V>` 继承了 Map 的 `Entry<K, V>`，其包含了基本的键值属性，以及用于构建红黑树的左结点、右结点、父结点指针和一个颜色标识位（true 为黑、false 为红）。

```java
static final class Entry<K,V> implements Map.Entry<K,V> {
    K key;
    V value;
    Entry<K,V> left;
    Entry<K,V> right;
    Entry<K,V> parent;
    boolean color = BLACK;
}
```

## 构造方法

1. 无参构造

```java
public TreeMap() {
    // 不使用自定义排序
    comparator = null;
}
```

2. 指定 `comparator`

```java
public TreeMap(Comparator<? super K> comparator) {
    this.comparator = comparator;
}
```

3. 指定相同泛型的 `Map`

```java
public TreeMap(Map<? extends K, ? extends V> m) {
    comparator = null;
    // 将旧键值对添加到 TreeMap 中
    putAll(m);
}
```

4. 指定相同泛型的 `SortedMap`

```java
public TreeMap(SortedMap<K, ? extends V> m) {
    // 设置 comparator 与 原 SortedMap 相同
    comparator = m.comparator();
    try {
        // 使用 m 构造红黑树
        buildFromSorted(m.size(), m.entrySet().iterator(), null, null);
    } catch (java.io.IOException cannotHappen) {
    } catch (ClassNotFoundException cannotHappen) {
    }
}
```

`buildFromSorted(int size, Iterator<?> it, ObjectInputStream str, V defaultVal)` 方法，可以将已排序的 Map 转换为 红黑树，因为 m 是有序的，所以可以以 m 的中间为红黑树的根结点，m 的左边为左子树，m 的右边为右子树。

```java
/**
 * size – 要从迭代器或流中读取的键（或键值对）的数量
 * it – 如果非空，则根据从此迭代器读取的条目或键创建新条目。
 * str – 如果非空，则从键创建新条目，并可能从该流中以序列化形式读取的值。
 * efaultVal – 如果非 null，则此默认值用于映射中的每个值。
 * 			   如果为 null，则从迭代器或流中读取每个值，如上所述。
 */
private void buildFromSorted(int size, Iterator<?> it,
                             java.io.ObjectInputStream str,
                             V defaultVal)
    throws  java.io.IOException, ClassNotFoundException {
    // 设置 key-value 键值对的数量
    this.size = size;
    // computeRedLevel(size) 方法，计算红黑树的高度；使用 m 构造红黑树，返回根节点
    root = buildFromSorted(0, 0, size-1, computeRedLevel(size),
                           it, str, defaultVal);
}


// 计算红黑树的高度
private static int computeRedLevel(int sz) {
    int level = 0;
    for (int m = sz - 1; m >= 0; m = m / 2 - 1)
        level++;
    return level;
}

/**
 * 递归的“辅助方法”，它完成了前一种方法的实际工作。
 * 相同命名的参数具有相同的定义。下面记录了其他参数。
 * 假设在调用此方法之前已经设置了 TreeMap 的比较器和大小字段。 （它忽略这两个字段。）
 * 参数：
 * level - 树的当前级别。初始调用应为 0。
 * lo - 此子树的第一个元素索引。初始值应为 0。
 * hi 这个子树的最后一个元素索引。初始值应为 size-1。
 * redLevel – 节点应为红色的级别。对于这种大小的树，必须等于 computeRedLevel。
 */
private final Entry<K,V> buildFromSorted(int level, int lo, int hi,
                                         int redLevel,
                                         Iterator<?> it,
                                         java.io.ObjectInputStream str,
                                         V defaultVal)
    throws  java.io.IOException, ClassNotFoundException {
	// 0. 递归结束条件
    if (hi < lo) return null;
	// 1. 计算中间索引
    int mid = (lo + hi) >>> 1;
	// 2.1 创建左子树
    Entry<K,V> left  = null;
    if (lo < mid)
        // 2.1 递归创建左子树
        left = buildFromSorted(level+1, lo, mid - 1, redLevel,
                               it, str, defaultVal);
    // extract key and/or value from iterator or stream
    // 获取 key-value 键值对
    K key;
    V value;
    // 3.1.1 迭代器非空，使用迭代器
    if (it != null) {
        if (defaultVal==null) {
            // 使用 it 迭代器，获得下一个值，并读取 key 和 value
            Map.Entry<?,?> entry = (Map.Entry<?,?>)it.next();
            key = (K)entry.getKey();
            value = (V)entry.getValue();
        } else {
            key = (K)it.next();
            // default 不为空，设置 default 为 value
            value = defaultVal;
        }
    } else { // use stream
        // 3.1.2 使用 stream
        key = (K) str.readObject();
        value = (defaultVal != null ? defaultVal : (V) str.readObject());
    }
	// 3.2 创建中间结点（父结点）
    Entry<K,V> middle =  new Entry<>(key, value, null);

    // 3.3 如果到树的最大高度，则设置为红节点
    if (level == redLevel)
        middle.color = RED;
	// 3.4 如果左子树非空，和父结点链接
    if (left != null) {
        middle.left = left;
        left.parent = middle;
    }

    if (mid < hi) {
        // 4.1 递归构建右子树
        Entry<K,V> right = buildFromSorted(level+1, mid+1, hi, redLevel,
                                           it, str, defaultVal);
        // 4.2 右子树和父结点链接
        middle.right = right;
        right.parent = middle;
    }
	// 5. 返回当前父结点
    return middle;
}
```

基于**有序**的 `it` 迭代器或者 `str` 输入流，将其的中间点作为根节点，其左边作为左子树，其右边作为右子树。因为是基于递归实现，所以中间点是基于 `lo` 和 `hi` 作为 `it` 或 `str` 的“数组”范围。

## Map 方法

### 添加键值对

1. 添加单个键值对

```java
public V put(K key, V value) {
    // 获取根结点
    Entry<K,V> t = root;
    // 如果根结点为空，创建根结点
    if (t == null) {
        // 类型检查（类型可能为空）
        compare(key, key); // type (and possibly null) check
		// 创建根结点
        root = new Entry<>(key, value, null);
        size = 1;
        modCount++;
        return null;
    }
    // compare(a, b) 比较器的比较结果，负数表示小于，0 表示等于，正数表示大于
    int cmp;
    // 用了记录父结点
    Entry<K,V> parent;
    // split comparator and comparable paths
    Comparator<? super K> cpr = comparator;
    // 如果比较器不为空
    if (cpr != null) {
        do {
            // 父结点从根结点开始
            parent = t;
            // 比较 key 和 父结点 key，比较结果为 cmp
            cmp = cpr.compare(key, t.key);
            if (cmp < 0)
                // 说明 key 小于 父结点 key，说明该结点应该添加在左子树中
                t = t.left;
            else if (cmp > 0)
                // 说明 key 大于 父结点 key，说明该结点应该添加在右子树中
                t = t.right;
            else
                // 等于的话，更新父结点的值
                return t.setValue(value);
        } while (t != null);
    }
    // 如果没有自定义 comparator，则使用 key 自身比较器来比较
    else {
        // 如果 key 为空，则抛出异常
        if (key == null)
            throw new NullPointerException();
        @SuppressWarnings("unchecked")
            Comparable<? super K> k = (Comparable<? super K>) key;
        do {
            // 同上
            parent = t;
            cmp = k.compareTo(t.key);
            if (cmp < 0)
                t = t.left;
            else if (cmp > 0)
                t = t.right;
            else
                return t.setValue(value);
        } while (t != null);
    }
    // 当上面的 t == null，即遍历到叶子结点后，仍然没有查询到该结点，说明需要添加新结点
    // 创建 key-value 的 Entry 节点 
    Entry<K,V> e = new Entry<>(key, value, parent);
    // t 指向左子树或者右子树后为空，因此需要添加在 t 的父结点，即 parent 上
    if (cmp < 0)
        // 小于，挂左子树
        parent.left = e;
    else
        // 大于，挂右子树
        parent.right = e;
    // 插入结点后，红黑树需要进行自平衡，防止树的层级过高
    fixAfterInsertion(e);
    size++;
    modCount++;
    return null;
}

final int compare(Object k1, Object k2) {
    return comparator==null ? 
        // 如果没有比较器，使用 key 自身的 compareTo 方法比较
        ((Comparable<? super K>)k1).compareTo((K)k2)
        // 如果有比较器，则使用它比较
        : comparator.compare((K)k1, (K)k2);
}
```

### 查找键值对

根据 key 获取 value，不存在则返回 null，本质是通过 `getEntry(Object key)` 获取该键对应的结点。

```java
public V get(Object key) {
    Entry<K,V> p = getEntry(key);
    return (p==null ? null : p.value);
}

// 根据 key 获取对应的结点
final Entry<K,V> getEntry(Object key) {
    // Offload comparator-based version for sake of performance
    // 如果自定义了 comparator 比较器，则基于 comparator 比较来查找
    if (comparator != null)
        return getEntryUsingComparator(key);
    // // 如果 key 为空，抛出异常
    if (key == null)
        throw new NullPointerException();
    @SuppressWarnings("unchecked")
    // key 强转为 Comparable
    Comparable<? super K> k = (Comparable<? super K>) key;
    // 获取根结点
    Entry<K,V> p = root;
    // 遍历红黑树，根据 key 比较的结果，判断在左子树还是右子树，进而递归寻找直到匹配到或者遍历完
    while (p != null) {
        int cmp = k.compareTo(p.key);
        if (cmp < 0)
            // 小于根结点，在左子树中遍历
            p = p.left;
        else if (cmp > 0)
            // 大于根结点，在右子树中遍历
            p = p.right;
        else
            return p;
    }
    // 未找到，返回 null
    return null;
}

// 使用比较器，根据 key 获取结点
final Entry<K,V> getEntryUsingComparator(Object key) {
    @SuppressWarnings("unchecked")
        K k = (K) key;
    Comparator<? super K> cpr = comparator;
    // 同上，只是使用了指定的 comparator 比较
    if (cpr != null) {
        Entry<K,V> p = root;
        while (p != null) {
            int cmp = cpr.compare(k, p.key);
            if (cmp < 0)
                p = p.left;
            else if (cmp > 0)
                p = p.right;
            else
                return p;
        }
    }
    return null;
}
```

用于判断是否包含指定 key 的方法 `containsKey(Object key)` 也是使用了 `getEntry(key)` 方法。

```java
public boolean containsKey(Object key) {
    return getEntry(key) != null;
}
```

`containsValue(Object value)` 用于查找是否包含指定 value 值，其查找步骤为：

* 找到第一个结点（值最小的，在最左边的结点）；
* 判断是否与指定 value 匹配；
* 不匹配则找到该结点的后续者，先判断其右子树，再判断其父结点；
* 依次按照值从小到大的顺序遍历匹配，直到找到或者遍历完毕。

```java
public boolean containsValue(Object value) {
    for (Entry<K,V> e = getFirstEntry(); e != null; e = successor(e))
        if (valEquals(value, e.value))
            return true;
    return false;
}

final Entry<K,V> getFirstEntry() {
    Entry<K,V> p = root;
    if (p != null)
        while (p.left != null)
            p = p.left;
    return p;
}

// 获取 t 的后继结点（即右子树的最小值）
static <K,V> TreeMap.Entry<K,V> successor(Entry<K,V> t) {
    // t 为 null，返回 null
    if (t == null)
        return null;
    else if (t.right != null) {
        // t 的右子树不为空，遍历获取右子树中最小的结点
        Entry<K,V> p = t.right;
        while (p.left != null)
            p = p.left;
        return p;
    } else {
        // t 的右子树为空，获取 t 的父结点
        Entry<K,V> p = t.parent;
        // ch 指向 当前结点 t
        Entry<K,V> ch = t;
        // 如果 t 是其父结点的右子树，
        while (p != null && ch == p.right) {
            // p 指向更上一级，直到不是右子树
            ch = p;
            p = p.parent;
        }
        // 返回后继结点
        return p;
    }
}
```

### 删除键值对

`TreeMap` 的删除涉及红黑树的结点删除，相对而言更加复杂，先查询该结点，如果不存在，则返回 null；存在则从红黑树删除结点并返回旧值，其中从红黑树删除结点 `deleteEntry(Entry<K,V> p)`  的可能有的情况如下：

1. 既有左结点又有右结点：找到待删除结点的后继结点（右子树的最小值，符合比该结点左边的都大，替换该结点后，比该结点的右边都小），用后继结点替换待删除结点；
2. 只有左结点或者右结点：使用待删除结点的不为空的那一个结点为替换结点，去替换待删除结点，即待删除结点的父结点指向替换结点（类似链表的删除）；
3. 待删除结点无子结点：直接将父结点对其的指向置为 null 即可；

```java
public V remove(Object key) {
    // 查询该结点
    Entry<K,V> p = getEntry(key);
    // 未找到，返回 null
    if (p == null)
        return null;

    V oldValue = p.value;
    // 从红黑树删除该结点
    deleteEntry(p);
    // 返回旧值
    return oldValue;
}

private void deleteEntry(Entry<K,V> p) {
    // 增加修改次数
    modCount++;
    // 减少 key-value 键值对数
    size--;

    // 情况一：如果删除的节点 p 既有左子节点，又有右子节点
    if (p.left != null && p.right != null) {
        // 获取 p 的后继结点
        Entry<K,V> s = successor(p);
        // 修改 p 的 key-value 为 s 的 key-value 键值对
        p.key = s.key;
        p.value = s.value;
        // p 指向 s，等效于将 s 结点删除了
        p = s;
    }

    // Start fixup at replacement node, if it exists.
    // 情况二：只有一个子结点
    // 获取待删除结点的左子树或者右子树为替换结点（左子树为空则获取右子树）
    Entry<K,V> replacement = (p.left != null ? p.left : p.right);
	
    if (replacement != null) {
        // Link replacement to parent
        replacement.parent = p.parent;
        if (p.parent == null)
            root = replacement;
        else if (p == p.parent.left)
            p.parent.left  = replacement;
        else
            p.parent.right = replacement;

        // Null out links so they are OK to use by fixAfterDeletion.
        p.left = p.right = p.parent = null;

        // Fix replacement
        if (p.color == BLACK)
            fixAfterDeletion(replacement);
    } 
    // 情况三：没有子结点
    else if (p.parent == null) {
        // 如果 p 没有子结点，也没有父结点，则删除后，树为空树
        root = null;
    } else { //  No children. Use self as phantom replacement and unlink.
        // 没有子结点，则取消其与其父结点的链接即可
        if (p.color == BLACK)
            // 如果 p 的颜色是黑色，则执行自平衡
            fixAfterDeletion(p);
        if (p.parent != null) {
            // 如果 p 是父节点的左子节点，则置空父节点的左子节点
            if (p == p.parent.left)
                p.parent.left = null;
            // 如果 p 是父节点的右子节点，则置空父节点的右子节点
            else if (p == p.parent.right)
                p.parent.right = null;
            // 置空 p 对父节点的指向
            p.parent = null;
        }
    }
}
```

## NavigableMap 方法

`NavigableMap` 是 `SortedMap` 的扩展，增加了通过指定 key 导航与其相近结点的方法，方法 lowerEntry、floorEntry、ceilingEntry 和 higherEntry 分别返回与键关联的 `Map.Entry` 对象小于、小于或等于、大于或等于和大于给定键，如果没有这样的键则返回 null；类似地，方法 lowerKey、floorKey、ceilingKey 和 higherKey 仅返回关联的键。所有这些方法都是为定位而不是遍历条目而设计的。

另外，此接口还定义了方法 firstEntry、pollFirstEntry、lastEntry 和 pollLastEntry，它们返回或者删除最小和最大的结点（如果存在），否则返回 null。

### 获取接近的键值对

1. 获取**小于** key 的结点

```java
public Map.Entry<K,V> lowerEntry(K key) {
    return exportEntry(getLowerEntry(key));
}

static <K,V> Map.Entry<K,V> exportEntry(TreeMap.Entry<K,V> e) {
    return (e == null) ? null :
        new AbstractMap.SimpleImmutableEntry<>(e);
}

final Entry<K,V> getLowerEntry(K key) {
    // 定义当前结点 p，初始值为根结点
    Entry<K,V> p = root;
    // 二叉查找遍历红黑树
    while (p != null) {
        /// 比较 key 和 p
        int cmp = compare(key, p.key);
        // key 大于 p，说明在 p 的右边，则需要遍历右子树
        if (cmp > 0) {
            // 右子树不为空，遍历右子树
            if (p.right != null)
                p = p.right;
            // 右子树为空，说明树中不存在该 key，p 是比它小的最近的结点，则直接返回 p
            else
                return p;
        // key 小于等于 p，说明在 p 的左边，则需要遍历左子树
        } else {
            // 左子树不为空，则遍历左子树
            if (p.left != null) {
                p = p.left;
            // 左子树为空，说明树中不存在该 key，返回 p 结点的前继结点
            } else {
                Entry<K,V> parent = p.parent;
                Entry<K,V> ch = p;
                // p 的前继结点应满足：p 在前继结点的右子树上且其离 p 最近
                while (parent != null && ch == parent.left) {
                    ch = parent;
                    parent = parent.parent;
                }
                return parent;
            }
        }
    }
    // 极端情况，树中不存在比 key 小的结点，返回 null
    return null;
}
```

2. 获取**小于等于** key 的结点

```java
public Map.Entry<K,V> floorEntry(K key) {
    return exportEntry(getFloorEntry(key));
}

final Entry<K,V> getFloorEntry(K key) {
    // 定义当前结点 p，初始值为根结点
    Entry<K,V> p = root;
    // 二叉查找遍历红黑树
    while (p != null) {
        // 比较 key 和 p
        int cmp = compare(key, p.key);
        // key 大于 p，说明在 p 的右边，则需要遍历右子树
        if (cmp > 0) {
            // 右子树不为空，遍历右子树
            if (p.right != null)
                p = p.right;
            // 右子树为空，说明树中不存在该 key，p 是比它小的最近的结点，则直接返回 p
            else
                return p;
        // key 小于 p，说明在 p 的左边，则需要遍历左子树
        } else if (cmp < 0) {
            // 左子树不为空，则遍历左子树
            if (p.left != null) {
                p = p.left;
            // 左子树为空，说明树中不存在该 key，返回 p 结点的前继结点
            } else {
                Entry<K,V> parent = p.parent;
                Entry<K,V> ch = p;
                // p 的前继结点应满足：p 在前继结点的右子树上且其离 p 最近
                while (parent != null && ch == parent.left) {
                    ch = parent;
                    parent = parent.parent;
                }
                return parent;
            }
        // key 等于 p，直接返回 p
        } else
            return p;

    }
    // 极端情况，树中不存在比 key 小的结点，返回 null
    return null;
}
```

3. 大于 key 的结点

```java
public Map.Entry<K,V> higherEntry(K key) {
    return exportEntry(getHigherEntry(key));
}

final Entry<K,V> getHigherEntry(K key) {
    // 定义当前结点 p，初始值为根结点
    Entry<K,V> p = root;
    // 二叉查找遍历红黑树
    while (p != null) {
        // 比较 key 和 p
        int cmp = compare(key, p.key);
        // key 小于 p，说明在 p 的左边，则需要遍历左子树
        if (cmp < 0) {
            // 左子树不为空，则遍历左子树
            if (p.left != null)
                p = p.left;
            // 左子树为空，说明树中不存在该 key，p 是比它大的最近的结点，则直接返回 p
            else
                return p;
        // key 大于等于 p，说明在 p 的右边，则需要遍历右子树
        } else {
            // 右子树不为空，则遍历右子树
            if (p.right != null) {
                p = p.right;
            // 右子树为空，说明树中不存在该 key，返回 p 结点的后继结点
            } else {
                Entry<K,V> parent = p.parent;
                Entry<K,V> ch = p;
                // p 的后继结点应满足：p 在后继结点的左子树上且离 p 最近
                while (parent != null && ch == parent.right) {
                    ch = parent;
                    parent = parent.parent;
                }
                return parent;
            }
        }
    }
    // 极端情况，树中不存在比 key 大的结点，返回 null
    return null;
}
```

4. 大于等于 key 的结点

```java
public Map.Entry<K,V> ceilingEntry(K key) {
    return exportEntry(getCeilingEntry(key));
}

final Entry<K,V> getCeilingEntry(K key) {
    // 定义当前结点 p，初始值为根结点
    Entry<K,V> p = root;
    // 二叉查找遍历红黑树
    while (p != null) {
        // 比较 key 和 p
        int cmp = compare(key, p.key);
        // key 小于 p，说明在 p 的左边，则需要遍历左子树
        if (cmp < 0) {
            // 左子树不为空，则遍历左子树
            if (p.left != null)
                p = p.left;
            // 左子树为空，说明树中不存在该 key，p 是比它大的最近的结点，则直接返回 p
            else
                return p;
        // key 大于 p，说明在 p 的右边，则需要遍历右子树
        } else if (cmp > 0) {
            // 右子树不为空，则遍历右子树
            if (p.right != null) {
                p = p.right;
            // 右子树为空，说明树中不存在该 key，返回 p 结点的后继结点
            } else {
                Entry<K,V> parent = p.parent;
                Entry<K,V> ch = p;
                // p 的后继结点应满足：p 在后继结点的左子树上且离 p 最近
                while (parent != null && ch == parent.right) {
                    ch = parent;
                    parent = parent.parent;
                }
                return parent;
            }
        // key 等于 p，直接返回 p
        } else
            return p;
    }
    // 极端情况，树中不存在比 key 大的结点，返回 null
    return null;
}
```

其他的 `lowerKey`、`floorKey`、`higherKey`、`ceilingKey`只是在对应方法上加了判断 null 和取值的操作而已。

### 获取首尾的键值对

1. 获取首个结点

`firstEntry()` 会返回 TreeMap 中的第一个 `Entry` 结点（根据 TreeMap 的键排序函数），

```java
public Map.Entry<K,V> firstEntry() {
    return exportEntry(getFirstEntry());
}

final Entry<K,V> getFirstEntry() {
    Entry<K,V> p = root;
    if (p != null)
        while (p.left != null)
            p = p.left;
    return p;
}
```

而 `pollFirstEntry()` 不仅会返回第一个 `Entry` 结点，还会从树中删除它。

```java
public Map.Entry<K,V> pollFirstEntry() {
    Entry<K,V> p = getFirstEntry();
    Map.Entry<K,V> result = exportEntry(p);
    if (p != null)
        deleteEntry(p);
    return result;
}
```

2. 获取最后一个结点

`lastEntry()` 会返回 TreeMap 中的最后一个 `Entry` 结点（根据 TreeMap 的键排序函数），

```java
public Map.Entry<K,V> lastEntry() {
    return exportEntry(getLastEntry());
}

final Entry<K,V> getLastEntry() {
    Entry<K,V> p = root;
    if (p != null)
        while (p.right != null)
            p = p.right;
    return p;
}
```

同样地，`pollLastEntry()` 不仅会返回最后一个结点，还会从树中删除它。

```java
public Map.Entry<K,V> pollLastEntry() {
    Entry<K,V> p = getLastEntry();
    Map.Entry<K,V> result = exportEntry(p);
    if (p != null)
        deleteEntry(p);
    return result;
}
```

## 总结

- TreeMap 按照 key 的**顺序**的 Map 实现类，底层采用**红黑树**来实现存储。
- TreeMap 因为采用树结构，所以无需初始考虑像 HashMap 考虑**容量**问题，也不存在扩容问题。
- TreeMap 的 **key** 不允许为空 ( `null` )，可能是因为红黑树是一颗二叉查找树，需要对 key 进行排序。
- TreeMap 的查找、添加、删除 key-value 键值对的**平均**时间复杂度为 `O(logN)` 。原因是，TreeMap 采用红黑树，操作都需要经过二分查找，而二分查找的时间复杂度是 `O(logN)` 。
- 相比 HashMap 来说，TreeMap 不仅仅支持指定 key 的查找，也支持 key **范围**的查找。当然，这也得益于 TreeMap 数据结构能够提供的有序特性。

## 参考资料

[芋道源码](https://www.iocoder.cn/)
