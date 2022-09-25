> 本文基于 JDK1.8

# Java集合框架概览

容器，就是可以容纳其他Java对象的对象。*Java Collections Framework(JCF)* 为Java开发者提供了通用的容器，其始于JDK 1.2，优点是:

- 降低编程难度

- 提高程序性能

- 提高API间的互操作性

- 降低学习难度

- 降低设计和实现相关API的难度

- 增加程序的重用性



Java容器里只能放对象，对于基本类型(int, long, float, double等)，需要将其包装成对象类型后(Integer, Long, Float, Double 等)才能放到容器里。很多时候拆包装和解包装能够自动完成。这虽然会导致额外的性能和空间开销，但简化了设计和编程。

Java容器主要包括 Collection 和 Map 两种，Collection 存储着对象的集合，而 Map 存储着键值对(两个对象)的映射表：

1. Collection：主要由 List、Set、Queue 组成。
    - List 代表有序、可重复的集合，典型代表就是封装了动态数组的 ArrayList 和封装了链表的 LinkedList；
    - Set 代表无序、不可重复的集合，典型代表就是 HashSet 和 TreeSet；
    - Queue 代表队列，典型代表就是双端队列 ArrayDeque，以及优先级队列 PriorityQue。
2. Map：代表键值对的集合，典型代表就是 HashMap。

![Java集合框架](../../../public/images/java/collection/overview-framework.png ':size=80%')

## Collection 接口

`Collection` 是所有序列集合共有的根接口。集合表示一组对象，称为其元素。一些集合允许重复元素，而另一些则不允许。有些是有序的，有些是无序的。 JDK 不提供此接口的任何直接实现：它提供更具体的子接口（如 Set 和 List）的实现。此接口通常用于传递集合并在需要最大通用性的地方操作它们。

`Collection`接口继承了 `Iterable`接口，实现 `Collection` 就意味着需要提供 `iterator()` 方法

`java.util.AbstractCollection` 类提供了 `Collection` 类的默认实现，使得你可以创建 `AbstractCollection` 的子类型，而其中没有不必要的代码重复。

Java访问集合总是通过统一的方式——迭代器（Iterator）来实现，它最明显的好处在于无需知道集合内部元素是按什么方式存储的。

### List 接口

> java.util.List接口继承自Collection接口，是单列集合的一个重要分支，习惯性地会将实现了List接口的对象称为List集合。
>
> 在List集合中允许出现重复的元素，所有的元素是以一种线性方式进行存储的，在程序中可以通过索引来访问集合中的指定元素。
>
> 另外，List集合还有一个特点就是元素有序，即元素的存入顺序和取出顺序一致。

#### ArrayList

`ArrayList` 底层是由数组实现的，支持随机存取，也就是可以通过下标直接存取元素；

如果内部数组的容量不足时会自动扩容，因此当元素非常庞大的时候，效率会比较低。

所以 ArrayList 的特点是元素增删慢，查找快。

#### LinkedList

`LinkedList` 是由双向链表实现的，不支持随机存取，只能从一端开始遍历，直到找到需要的元素后返回；

任意位置插入和删除元素都很方便，因为只需要改变前一个节点和后一个节点的引用即可，不像 ArrayList 那样需要复制和移动数组元素；

因为每个元素都存储了前一个和后一个节点的引用，所以相对来说，占用的内存空间会比 ArrayList 多一些。

#### Vector

和 ArrayList 类似，但它是线程安全的，一些方法都加了 `synchronized`关键字，执行效率会比较低，很少使用。

#### Stack

`Stack` 继承了 `Vector`，在其基础上实现了栈先进先出的功能（push、pop、peek等方法），方法上同样添加了 `synchronized` 关键字，官方推荐使用双端队列 `ArrayDeque`。

### Queue 接口

> Queue 接口继承了Collection，被设计用于处理之前临时保存在某处的元素。
>
> 除了基本的Collection操作之外，队列还提供了额外的插入、提取和检查操作。每一种操作都有两种形式：如果操作失败，则抛出一个异常；如果操作失败，则返回一个特殊值（null或false，取决于是什么操作）。

#### ArrayDeque

`ArrayDeque` 是一个基于数组实现的双端队列，它使用一个头指针 `head` 指向队首的第一个有效的元素和一个尾指针 `tail `指向队尾第一个可以插入元素的空位构成一个循环数组。

#### LinkedList

LinkedList 也实现了 Deque 接口，由于其内部双向链表的特性，也可以作为链表实现的双向队列使用。

#### PriorityQueue

PriorityQueue 是一种优先级队列，它的出队顺序与元素的优先级有关，执行 remove 或者 poll 方法，返回的总是优先级最高的元素。

要想有优先级，元素就需要实现 Comparable 接口或者 Comparator 接口

### Set 接口

> Set 的特点是存取无序，不可以存放重复的元素，不可以用下标对元素进行操作，和 List 有很多不同。
>
> Set 的子类大多使用 Map 的子类的 key 存储数据，利用了 Map 键不允许重复、无序的特性。

#### HashSet

HashSet 内部是由 HashMap 实现的，只不过值由一个固定的 Object 对象填充，而键用于操作。

#### LinkedHashSet

LinkedHashSet 继承自 HashSet，其实是由 LinkedHashMap 实现的，LinkedHashSet 的构造方法调用了 HashSet 的一个特殊的构造方法：

```java
HashSet(int initialCapacity, float loadFactor, boolean dummy) {
   map = new LinkedHashMap<>(initialCapacity, loadFactor);
}
```

#### TreeSet

TreeSet 内部使用 TreeMap 实现，同样值由固定的 Object 对象填充，键用于操作。

## Map 接口

> Map 保存的是键值对，键要求保持唯一性，值可以重复。

### HashMap

HashMap 实现了 Map 接口，根据键的 HashCode 值来存储数据，具有很快的访问速度，最多允许一个 null 键。

HashMap 不论是在学习还是工作当中，使用频率都是相当高的。随着 JDK 版本的不断更新，HashMap 的底层也优化了很多次，JDK 8 的时候引入了红黑树。

一旦 HashMap 发生哈希冲突，就把相同键位的地方改成链表，如果链表的长度超过 8，就该用红黑树。

### LinkedHashMap

LinkedHashMap 是 HashMap 的子类，内部使用链表来记录插入/访问元素的顺序。

LinkedHashMap 可以看作是 HashMap + LinkedList 的合体，它使用了 哈希表来存储数据，又用了双向链表来维持顺序。

### TreeMap

HashMap 是无序的，所以遍历的时候元素的顺序也是不可测的。TreeMap 是有序的，它在内部会对键进行排序，所以遍历的时候就可以得到预期的顺序。

为了保证顺序，TreeMap 的键必须要实现 Comparable 接口或者 Comparator 接口。


## 参考资料

* [Java 程序员进阶之路](https://tobebetterjavaer.com/collection/gailan.html)
* [Java全栈知识体系](https://pdai.tech/md/java/collection/java-collection-all.html)