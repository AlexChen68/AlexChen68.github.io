---
title: List - LinkedList 源码分析
date: 2022-09-30
tag: Collection
order: 2
---

## 概述

`LinkedList` 同时实现了 `List` 接口和 `Deque` 接口，它既可以当成顺序容器，又可以作为双端队列使用，同时还可以看作一个栈（Stack）。栈和队列还有一个更好的选择是 `ArrayDeque`，它有比 `LinkedList` 更好的性能。(本文基于 JDK1.8)

## 类图

![LinkedList类图](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/java/linkedlist_class.png ':size=60%')

`LinkedList` 实现了四个接口：

* `java.util.List` List 接口
* `java.io.Serializable` 序列化接口
* `java.lang.Cloneable` 可克隆接口
* `java.util.Deque` 双端队列接口

另外，`LinkedList` 继承了 `java.util.AbstractSequentialList` 抽象类，它是 `AbstracList` 的子类，实现了只能**连续**访问“数据存储” 等随机操作的方法，官方推荐对于支持随机访问数据的继承 `AbstractList` 抽象类，不支持的继承 `AbstractSequentialList` 抽象类。

## 属性

LinkedList 有三个被 `transient` 修饰的属性，如下所示：

```java
// 链表长度
transient int size = 0;

// 头结点
transient Node<E> first;

// 尾结点
transient Node<E> last;
```

`Node<E>` 为内部类：

```java
private static class Node<E> {
    // 元素
    E item;
    // 前一个结点
    Node<E> next;
    // 后一个结点
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}
```

- 对于第一个节点来说，prev 为 null；
- 对于最后一个节点来说，next 为 null；
- 其余的节点呢，prev 指向前一个，next 指向后一个。

## 构造方法

```java
public LinkedList() {
}

// 按照集合的迭代器返回的顺序构造一个包含指定集合元素的列表
public LinkedList(Collection<? extends E> c) {
    this();
    // 将集合 c 的元素全部添加到链表中
    addAll(c);
}
```

## 链表操作

> 在 LinkedList 内部，提供了在链表头部、中间以及尾部操作数据的基本方法，例如 `linkFirst`、`linkBefore`、`linkLast` 等等，再通过这些基本方法的调用，来实现满足不同数据结构定义的操作。

### 添加元素

```java
// 链接 e 作为第一个元素
private void linkFirst(E e) {
    // 获取头结点
    final Node<E> f = first;
    // 创建新结点，prev 指向 null，next 指向当前头结点
    final Node<E> newNode = new Node<>(null, e, f);
    // 新结点作为新的头结点
    first = newNode;
    // 如果原头结点为 null，则原链表为空
    if (f == null)
        // 新结点也是尾结点
        last = newNode;
    else
        // 原头结点的 prev 指向新结点
        f.prev = newNode;
    size++;
    modCount++;
}

// 在非空节点 succ 之前插入元素 e
void linkBefore(E e, Node<E> succ) {
    // succ 不可以为空
    // 获取 succ 的 前一个结点
    final Node<E> pred = succ.prev;
    // 创建新结点，prev 指向 succ 的前一个结点，next 指向 succ
    final Node<E> newNode = new Node<>(pred, e, succ);
    // succ 的 prev 指向新结点
    succ.prev = newNode;
    // 判断 succ 是不是头结点
    if (pred == null)
        // succ 是头结点，头结点指向新结点
        first = newNode;
    else
        // succ 前一个结点的 next 指向新结点
        pred.next = newNode;
    size++;
    modCount++;
}

// 在链表末尾添加元素
void linkLast(E e) {
    // 获取尾结点
    final Node<E> l = last;
    // 创建新结点，pre 当前的尾结点，next 为 null
    final Node<E> newNode = new Node<>(l, e, null);
    // 新结点称为尾结点
    last = newNode;
    // 判断原来的尾结点是否为 null，即判断整个链表是否为空
    if (l == null)
        // 链表为空，新加入的结点是第一个结点，头结点也指向它
        first = newNode;
    else
        // 链表不为空，前序结点的 next 指向新加入的结点
        l.next = newNode;
    size++;
    modCount++;
}
```

### 删除元素

```java
// 删除非空的头结点 f
private E unlinkFirst(Node<E> f) {
    // assert f == first && f != null;
    final E element = f.item;
    // 获取 f 的下一个结点
    final Node<E> next = f.next;
    // 将 f 结点属性置为 null，帮助 GC
    f.item = null;
    f.next = null; // help GC
    // 头结点指向 f 的下一个结点
    first = next;
    // 如果下一个结点为 null，表示链表空了，则尾结点也置为 null
    if (next == null)
        last = null;
    else
        // 否则，将下一个结点的 prev 置为 null，表示其前面没有结点
        next.prev = null;
    size--;
    modCount++;
    return element;
}

// 删除非空的结点 x
E unlink(Node<E> x) {
    // assert x != null;
    final E element = x.item;
    // 分别获取 x 的 prev 结点和 next 结点
    final Node<E> next = x.next;
    final Node<E> prev = x.prev;

    // 前面没结点
    if (prev == null) {
        first = next;
    } else {
        // 前面结点和后面结点链接
        prev.next = next;
        x.prev = null;
    }

    // 后面没结点
    if (next == null) {
        last = prev;
    } else {
        // 后面结点和前面结点链接
        next.prev = prev;
        x.next = null;
    }

    x.item = null;
    size--;
    modCount++;
    return element;
}

// 删除非空的尾结点 l
private E unlinkLast(Node<E> l) {
    // assert l == last && l != null;
    final E element = l.item;
    // 获取尾结点的前一个结点
    final Node<E> prev = l.prev;
    // 尾结点属性置为 null，帮助 GC
    l.item = null;
    l.prev = null; // help GC
    // 前一个结点成为新的尾结点
    last = prev;
    // 如果前面结点为 null，表示链表空了
    if (prev == null)
        first = null;
    else
        // 新尾结点的 next 置为 null
        prev.next = null;
    size--;
    modCount++;
    return element;
}
```

### 查询元素

1. 返回指定元素索引处的（非空）节点

```java
Node<E> node(int index) {
    // assert isElementIndex(index);

    // 如果 index 小于 size 的一半，就正序遍历，获得第 index 个节点
    if (index < (size >> 1)) {
        Node<E> x = first;
        for (int i = 0; i < index; i++)
            x = x.next;
        return x;
    } else {
        // 如果 index 大于 size 的一半，就倒序遍历，获得第 index 个节点
        Node<E> x = last;
        for (int i = size - 1; i > index; i--)
            x = x.prev;
        return x;
    }
}
```

## 集合操作

> 当 LinkedList 作为 List 使用时常用的方法

### 添加元素

1. 将指定元素附加到此列表的末尾

```java
public boolean add(E e) {
    linkLast(e);
    return true;
}
```

2. 在此列表中的指定位置插入指定元素

```java
public void add(int index, E element) {
    checkPositionIndex(index);

    if (index == size)
        linkLast(element);
    else
        linkBefore(element, node(index));
}
```

3. 按照指定集合的迭代器返回的顺序

```java
public boolean addAll(Collection<? extends E> c) {
    return addAll(size, c);
}
```

4. 将指定集合中的所有元素插入此列表，从指定位置开始

```java
public boolean addAll(int index, Collection<? extends E> c) {
    checkPositionIndex(index);
	// 将 c 转为 Object 数组 a
    Object[] a = c.toArray();
    int numNew = a.length;
    if (numNew == 0)
        return false;

    // 获得第 index 位置的节点 succ ，和其前一个节点 pred
    Node<E> pred, succ;
    if (index == size) {
        succ = null;
        pred = last;
    } else {
        succ = node(index);
        pred = succ.prev;
    }

    // 遍历 a 数组，创建结点依次添加到 pred 后面
    for (Object o : a) {
        @SuppressWarnings("unchecked") E e = (E) o;
        Node<E> newNode = new Node<>(pred, e, null);
        // 如果 pred 为 null ，说明 first 也为 null ，则直接将 first 指向新节点
        if (pred == null)
            first = newNode;
        else
            // pred 下一个指向新节点
            pred.next = newNode;
        // 修改 pred 指向新节点
        pred = newNode;
    }

    // 修改 succ 和 pred 的指向
    if (succ == null) {
        last = pred;
    } else {
        pred.next = succ;
        succ.prev = pred;
    }

    size += numNew;
    modCount++;
    return true;
}
```

### 删除元素

1. 移除此列表中指定位置的元素

```java
public E remove(int index) {
    checkElementIndex(index);
    return unlink(node(index));
}
```

2. 从此列表中删除第一次出现的指定元素（如果存在）

```java
public boolean remove(Object o) {
    if (o == null) {
        // 从头遍历，匹配到值为 null 的元素后删除 
        for (Node<E> x = first; x != null; x = x.next) {
            if (x.item == null) {
                unlink(x);
                return true;
            }
        }
    } else {
        // 从头遍历，匹配到值为 o 的元素后删除 
        for (Node<E> x = first; x != null; x = x.next) {
            if (o.equals(x.item)) {
                unlink(x);
                return true;
            }
        }
    }
    return false;
}
```

### 更新元素

1. 将此列表中指定位置的元素替换为指定元素

```java
public E set(int index, E element) {
   checkElementIndex(index);
    // 找到索引为 index 的结点，进行替换
   Node<E> x = node(index);
   E oldVal = x.item;
   x.item = element;
   return oldVal;
}
```

### 查询元素

1. 返回此列表中指定位置的元素

```java
public E get(int index) {
    checkElementIndex(index);
    return node(index).item;
}
```

2. 返回此列表中指定元素第一次出现的索引

```java
public int indexOf(Object o) {
    int index = 0;
    if (o == null) {
        for (Node<E> x = first; x != null; x = x.next) {
            if (x.item == null)
                return index;
            index++;
        }
    } else {
        for (Node<E> x = first; x != null; x = x.next) {
            if (o.equals(x.item))
                return index;
            index++;
        }
    }
    return -1;
}
```

3. 返回此列表中指定元素最后一次出现的索引

```java
public int lastIndexOf(Object o) {
    int index = size;
    if (o == null) {
        // 从尾结点遍历，第一次匹配到值为 null 的元素后结束
        for (Node<E> x = last; x != null; x = x.prev) {
            index--;
            if (x.item == null)
                return index;
        }
    } else {
        // 从尾结点遍历，第一次匹配到值为 o 的元素后结束
        for (Node<E> x = last; x != null; x = x.prev) {
            index--;
            if (o.equals(x.item))
                return index;
        }
    }
    return -1;
}
```

4. 如果此列表包含指定元素，则返回true 

```java
public boolean contains(Object o) {
    return indexOf(o) != -1;
}
```

5. 清除列表

```java
public void clear() {
    // Clearing all of the links between nodes is "unnecessary", but:
    // - helps a generational GC if the discarded nodes inhabit
    //   more than one generation
    // - is sure to free memory even if there is a reachable Iterator
    for (Node<E> x = first; x != null; ) {
        Node<E> next = x.next;
        x.item = null;
        x.next = null;
        x.prev = null;
        x = next;
    }
    first = last = null;
    size = 0;
    modCount++;
}
```
### 转为数组

```java
public Object[] toArray() {
    // 创建 Object 数组
    Object[] result = new Object[size];
    int i = 0;
    // 从头结点开始遍历，每个结点的值写入数组
    for (Node<E> x = first; x != null; x = x.next)
        result[i++] = x.item;
    // 返回数组
    return result;
}

public <T> T[] toArray(T[] a) {
    // 如果 a 数组空间不足，给重新分配 a 数组空间
    if (a.length < size)
        a = (T[])java.lang.reflect.Array.newInstance(
                            a.getClass().getComponentType(), size);
    int i = 0;
    Object[] result = a;
    // 顺序遍历链表，复制到 a 中
    for (Node<E> x = first; x != null; x = x.next)
        result[i++] = x.item;
    // 如果 a 空间有剩余，手动置为 null，帮助 GC
    if (a.length > size)
        a[size] = null;
    return a;
}
```

### 迭代器

获取 `iterator` 迭代器（通过继承 `AbstractSequentialList` 获得），实际还是获取 `listIterator` 迭代器

```java
// AbstractSequentialList.java
public Iterator<E> iterator() {
    return listIterator();
}

// AbstractList.java
public ListIterator<E> listIterator() {
    return listIterator(0);
}

// AbstractSequentialList.java
public abstract ListIterator<E> listIterator(int index);

```

`listIterator` 源码：

```java
// LinkedList.java

private class ListItr implements ListIterator<E> {

    /**
     * 最后返回的节点
     */
    private Node<E> lastReturned;
    /**
     * 下一个节点
     */
    private Node<E> next;
    /**
     * 下一个访问元素的位置，从下标 0 开始。
     *
     * 主要用于 {@link #nextIndex()} 中，判断是否遍历结束
     */
    private int nextIndex;
    /**
     * 创建迭代器时，数组修改次数。
     *
     * 在迭代过程中，如果数组发生了变化，会抛出 ConcurrentModificationException 异常。
     */
    private int expectedModCount = modCount;

    ListItr(int index) {
        // assert isPositionIndex(index);
        // 获得下一个节点
        next = (index == size) ? null : node(index);
        // 下一个节点的位置
        nextIndex = index;
    }

    public boolean hasNext() {
        return nextIndex < size;
    }

    public E next() {
        // 校验是否数组发生了变化
        checkForComodification();
        // 如果已经遍历到结尾，抛出 NoSuchElementException 异常
        if (!hasNext())
            throw new NoSuchElementException();

        // lastReturned 指向，记录最后访问节点
        lastReturned = next;
        // next 指向，下一个节点
        next = next.next;
        // 下一个节点的位置 + 1
        nextIndex++;
        // 返回 lastReturned
        return lastReturned.item;
    }

    public boolean hasPrevious() {
        return nextIndex > 0;
    }

    public E previous() {
        // 校验是否数组发生了变化
        checkForComodification();
        // 如果已经遍历到结尾，抛出 NoSuchElementException 异常
        if (!hasPrevious())
            throw new NoSuchElementException();

        // 修改 lastReturned 和 next 的指向。此时，lastReturned 和 next 是相等的。
        lastReturned = next = (next == null) ? last : next.prev;
        // 下一个节点的位置 - 1
        nextIndex--;
        // 返回 lastReturned
        return lastReturned.item;
    }

    public int nextIndex() {
        return nextIndex;
    }

    public int previousIndex() {
        return nextIndex - 1;
    }

    public void remove() {
        // 校验是否数组发生了变化
        checkForComodification();
        // 如果 lastReturned 为空，抛出 IllegalStateException 异常，因为无法移除了。
        if (lastReturned == null)
            throw new IllegalStateException();

        // 获得 lastReturned 的下一个
        Node<E> lastNext = lastReturned.next;
        // 移除 lastReturned 节点
        unlink(lastReturned);
        // 此处，会分成两种情况
        if (next == lastReturned) // 说明发生过调用 `#previous()` 方法的情况，next 指向下一个节点，而 nextIndex 是无需更改的
            next = lastNext;
        else
            nextIndex--; // nextIndex 减一。

        // 设置 lastReturned 为空
        lastReturned = null;
        // 增加数组修改次数
        expectedModCount++;
    }

    public void set(E e) {
        // 如果 lastReturned 为空，抛出 IllegalStateException 异常，因为无法修改了。
        if (lastReturned == null)
            throw new IllegalStateException();
        // 校验是否数组发生了变化
        checkForComodification();
        // 修改 lastReturned 的 item 为 e
        lastReturned.item = e;
    }

    public void add(E e) {
        // 校验是否数组发生了变化
        checkForComodification();
        // 设置 lastReturned 为空
        lastReturned = null;
        // 此处，会分成两种情况
        if (next == null) // 如果 next 已经遍历到尾，则 e 作为新的尾节点，进行插入。算是性能优化
            linkLast(e);
        else // 插入到 next 的前面
            linkBefore(e, next);
        // nextIndex 加一。
        nextIndex++;
        // 增加数组修改次数
        expectedModCount++;
    }

    public void forEachRemaining(Consumer<? super E> action) {
        Objects.requireNonNull(action);
        // 遍历剩余链表
        while (modCount == expectedModCount && nextIndex < size) {
            // 执行 action 逻辑
            action.accept(next.item);
            // lastReturned 指向 next
            lastReturned = next;
            //  next 指向下一个节点
            next = next.next;
            // nextIndex 加一。
            nextIndex++;
        }
        // 校验是否数组发生了变化
        checkForComodification();
    }

    final void checkForComodification() {
        if (modCount != expectedModCount)
            throw new ConcurrentModificationException();
    }

}
```



## 双端队列操作

`LinkedList` 实现了 `Deque` 接口（支持两端元素插入和移除的线性集合），该接口定义了访问双端队列两端元素的方法。

该接口定义了访问双端队列两端元素的方法。提供了插入、删除和检查元素的方法。这些方法中的每一个都以两种形式存在：一种在操作失败时抛出异常，另一种返回特殊值（ null 或 false ，具体取决于操作）。后一种形式的插入操作是专门为容量受限的 `Deque` 实现而设计的；在大多数实现中，插入操作不会失败。

Deque 方法总结：

|      | 头部操作（抛异常） | 头部操作（特殊值） | 尾部操作（抛异常） | 尾部操作（特殊值） |
| ---- | ------------------ | ------------------ | ------------------ | ------------------ |
| 插入 | addFirst(e)        | offerFirst(e)      | addLast(e)         | offerLast(e)       |
| 删除 | removeFirst()      | pollFirst()        | removeLast()       | pollLast()         |
| 检查 | getFirst()         | peekFirst()        | getLast()          | peekLast()         |

该接口扩展了 `Queue` 接口。当双端队列用作队列时，会产生 FIFO（先进先出）行为。元素在双端队列的末尾添加并从开头删除，从 `Queue` 接口继承的方法与 `Deque` 方法完全等价，如下表所示：

| Queue 方法 | Deque 方法    |
| ---------- | ------------- |
| add(e)     | addLast(e)    |
| offer(e)   | offerLast(e)  |
| remove()   | removeFirst() |
| poll()     | pollFirst()   |
| element()  | getFirst()    |
| peek()     | peekFirst()   |

双端队列也可以用作 LIFO（后进先出）堆栈。应优先使用此接口而不是旧的 `Stack` 类。当双端队列用作堆栈时，从双端队列的开头推送和弹出元素。 `Stack` 方法完全等同于 `Deque` 方法，如下表所示：

| Stack 方法 | Deque 方法    |
| ---------- | ------------- |
| push(e)    | addFirst(e)   |
| pop()      | removeFirst() |
| peek()     | peekFirst()   |

请注意，当双端队列用作队列或堆栈时， peek方法同样有效；在任何一种情况下，元素都是从双端队列的**开头**开始插入的。

### 添加元素

1. 添加元素到队列头（或入栈）

```java
//--- Deque Interface ---
public void addFirst(E e) {
    linkFirst(e);
}

public boolean offerFirst(E e) {
    addFirst(e);
    return true;
}

//--- Stack Interface ---
// 入栈
public void push(E e) {
    addFirst(e);
}
```

2. 添加元素到队列尾部

```java
//--- Deque Interface ---
public void addLast(E e) {
    linkLast(e);
}

public boolean offerLast(E e) {
    addLast(e);
    return true;
}

//--- Queue Interface ---
public boolean add(E e) {
    linkLast(e);
    return true;
}

public boolean offer(E e) {
    return add(e);
}
```

### 删除元素

1. 从队列头部删除元素（或出栈）

```java
//--- Deque Interface ---
// 检索并删除此双端队列的第一个元素。此方法与pollFirst的不同之处仅在于如果此双端队列为空，它将引发异常
public E removeFirst() {
    final Node<E> f = first;
    if (f == null)
        throw new NoSuchElementException();
    return unlinkFirst(f);
}

// 检索并删除此列表的第一个元素，如果此列表为空，则返回null 
public E pollFirst() {
    final Node<E> f = first;
    return (f == null) ? null : unlinkFirst(f);
}

//--- Queue Interface ---
// 检索并删除此队列的头部，如果此队列为空，则返回null 
public E poll() {
    final Node<E> f = first;
    return (f == null) ? null : unlinkFirst(f);
}

// 检索并删除此队列的头部。此方法与poll的不同之处仅在于如果此队列为空，它将引发异常
public E remove() {
    return removeFirst();
}

//--- Stack Interface ---
// 从此列表表示的堆栈中弹出一个元素。换句话说，删除并返回此列表的第一个元素。
public E pop() {
    return removeFirst();
}
```

2. 从队列尾部删除元素

```java
//--- Deque Interface ---
// 移除并返回此列表中的最后一个元素，如果此列表为空，则抛异常
public E removeLast() {
    final Node<E> l = last;
    if (l == null)
        throw new NoSuchElementException();
    return unlinkLast(l);
}

// 检索并删除此列表的最后一个元素，如果此列表为空，则返回null 
public E pollLast() {
    final Node<E> l = last;
    return (l == null) ? null : unlinkLast(l);
}
```

### 查询元素

1. 从队列头部（栈顶）获取元素但不删除

```java
//--- Deque Interface ---
// 检索但不删除此列表的头部（第一个元素），如果此列表为空，则抛异常
public E getFirst() {
    final Node<E> f = first;
    if (f == null)
        throw new NoSuchElementException();
    return f.item;
}

// 检索但不删除此列表的第一个元素，如果此列表为空，则返回null 
public E peekFirst() {
    final Node<E> f = first;
    return (f == null) ? null : f.item;
 }

//--- Stack Interface ---
public E element() {
    return getFirst();
}

// also stack interface
public E peek() {
    final Node<E> f = first;
    return (f == null) ? null : f.item;
}
```

2. 从队列尾部获取元素但不删除

```java
// 返回此列表中的最后一个元素，如果此列表为空，则抛异常
public E getLast() {
    final Node<E> l = last;
    if (l == null)
        throw new NoSuchElementException();
    return l.item;
}

// 检索但不删除此列表的最后一个元素，如果此列表为空，则返回null
public E peekLast() {
    final Node<E> l = last;
    return (l == null) ? null : l.item;
}
```



## 序列化

1. 序列化

```java
private void writeObject(java.io.ObjectOutputStream s)
    throws java.io.IOException {
    // 写入非静态属性、非 transient 属性
    s.defaultWriteObject();

    // 写入 size
    s.writeInt(size);

    // 遍历写入元素的数据
    for (Node<E> x = first; x != null; x = x.next)
        s.writeObject(x.item);
}
```

2. 反序列化

```java
private void readObject(java.io.ObjectInputStream s)
    throws java.io.IOException, ClassNotFoundException {
    // 读取非静态属性、非 transient 属性
    s.defaultReadObject();

    // 读取 size
    int size = s.readInt();

    // 遍历读取全部数据
    for (int i = 0; i < size; i++)
        linkLast((E)s.readObject());
}
```

## 参考资料

* [芋道源码](https://www.iocoder.cn/)
* [Java 程序员进阶之路](https://tobebetterjavaer.com/collection/gailan.html)
* [Java全栈知识体系](https://pdai.tech/md/java/collection/java-collection-all.html)