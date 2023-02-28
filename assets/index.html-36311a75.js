import{_ as l,W as n,X as s,Y as c,Z as e,a0 as o,a1 as t,$ as p,G as i}from"./framework-3160f2a1.js";const d={},r=e("p",null,"介绍 Java 集合框架的主要接口及其实现类。",-1),h=p(`<h1 id="java集合框架" tabindex="-1"><a class="header-anchor" href="#java集合框架" aria-hidden="true">#</a> Java集合框架</h1><p>容器，就是可以容纳其他Java对象的对象。<em>Java Collections Framework(JCF)</em> 为Java开发者提供了通用的容器，其始于JDK 1.2，优点是:</p><ul><li><p>降低编程难度</p></li><li><p>提高程序性能</p></li><li><p>提高API间的互操作性</p></li><li><p>降低学习难度</p></li><li><p>降低设计和实现相关API的难度</p></li><li><p>增加程序的重用性</p></li></ul><p>Java容器里只能放对象，对于基本类型(int, long, float, double等)，需要将其包装成对象类型后(Integer, Long, Float, Double 等)才能放到容器里。很多时候拆包装和解包装能够自动完成。这虽然会导致额外的性能和空间开销，但简化了设计和编程。</p><p>Java容器主要包括 Collection 和 Map 两种，Collection 存储着对象的集合，而 Map 存储着键值对(两个对象)的映射表：</p><ol><li>Collection：主要由 List、Set、Queue 组成。 <ul><li>List 代表有序、可重复的集合，典型代表就是封装了动态数组的 ArrayList 和封装了链表的 LinkedList；</li><li>Set 代表无序、不可重复的集合，典型代表就是 HashSet 和 TreeSet；</li><li>Queue 代表队列，典型代表就是双端队列 ArrayDeque，以及优先级队列 PriorityQue。</li></ul></li><li>Map：代表键值对的集合，典型代表就是 HashMap。</li></ol><p><img src="https://cdn.staticaly.com/gh/alexchen68/image-hosting@master/blog/java/collection_framework.png" alt="Java集合框架" title=":size=80%" loading="lazy"></p><h2 id="collection-接口" tabindex="-1"><a class="header-anchor" href="#collection-接口" aria-hidden="true">#</a> <code>Collection</code> 接口</h2><p><code>Collection</code> 是所有序列集合共有的根接口。集合表示一组对象，称为其元素。一些集合允许重复元素，而另一些则不允许。有些是有序的，有些是无序的。 JDK 不提供此接口的任何直接实现：它提供更具体的子接口（如 Set 和 List）的实现。此接口通常用于传递集合并在需要最大通用性的地方操作它们。</p><p><code>Collection</code>接口继承了 <code>Iterable</code>接口，实现 <code>Collection</code> 就意味着需要提供 <code>iterator()</code> 方法</p><p><code>java.util.AbstractCollection</code> 类提供了 <code>Collection</code> 类的默认实现，使得你可以创建 <code>AbstractCollection</code> 的子类型，而其中没有不必要的代码重复。</p><p>Java访问集合总是通过统一的方式——迭代器（Iterator）来实现，它最明显的好处在于无需知道集合内部元素是按什么方式存储的。</p><h3 id="list-接口" tabindex="-1"><a class="header-anchor" href="#list-接口" aria-hidden="true">#</a> <code>List</code> 接口</h3><p><code>java.util.List</code> 接口继承自 <code>Collection</code> 接口，是单列集合的一个重要分支，习惯性地会将实现了List接口的对象称为List集合。</p><p>在List集合中允许出现重复的元素，所有的元素是以一种线性方式进行存储的，在程序中可以通过索引来访问集合中的指定元素。</p><p>另外，List集合还有一个特点就是元素有序，即元素的存入顺序和取出顺序一致。</p><ol><li><code>ArrayList</code></li></ol><p><code>ArrayList</code> 底层是由数组实现的，支持随机存取，也就是可以通过下标直接存取元素；</p><p>如果内部数组的容量不足时会自动扩容，因此当元素非常庞大的时候，效率会比较低。</p><p>所以 ArrayList 的特点是元素增删慢，查找快。</p><ol start="2"><li><code>LinkedList</code></li></ol><p><code>LinkedList</code> 是由双向链表实现的，不支持随机存取，只能从一端开始遍历，直到找到需要的元素后返回；</p><p>任意位置插入和删除元素都很方便，因为只需要改变前一个节点和后一个节点的引用即可，不像 ArrayList 那样需要复制和移动数组元素；</p><p>因为每个元素都存储了前一个和后一个节点的引用，所以相对来说，占用的内存空间会比 ArrayList 多一些。</p><ol start="3"><li><code>Vector</code></li></ol><p>和 ArrayList 类似，但它是线程安全的，一些方法都加了 <code>synchronized</code>关键字，执行效率会比较低，很少使用。</p><ol start="4"><li><code>Stack</code></li></ol><p><code>Stack</code> 继承了 <code>Vector</code>，在其基础上实现了栈先进先出的功能（push、pop、peek等方法），方法上同样添加了 <code>synchronized</code> 关键字，官方推荐使用双端队列 <code>ArrayDeque</code>。</p><h3 id="queue-接口" tabindex="-1"><a class="header-anchor" href="#queue-接口" aria-hidden="true">#</a> Queue 接口</h3><p>Queue 接口继承了 <code>Collection</code>，被设计用于处理之前临时保存在某处的元素。</p><p>除了基本的 <code>Collection</code> 操作之外，队列还提供了额外的插入、提取和检查操作。每一种操作都有两种形式：如果操作失败，则抛出一个异常；如果操作失败，则返回一个特殊值（null或false，取决于是什么操作）。</p><ol><li><code>ArrayDeque</code></li></ol><p><code>ArrayDeque</code> 是一个基于数组实现的双端队列，它使用一个头指针 <code>head</code> 指向队首的第一个有效的元素和一个尾指针 <code>tail </code>指向队尾第一个可以插入元素的空位构成一个循环数组。</p><ol start="2"><li><code>LinkedList</code></li></ol><p>LinkedList 也实现了 Deque 接口，由于其内部双向链表的特性，也可以作为链表实现的双向队列使用。</p><ol start="3"><li><code>PriorityQueue</code></li></ol><p><code>PriorityQueue</code> 是一种优先级队列，它的出队顺序与元素的优先级有关，执行 remove 或者 poll 方法，返回的总是优先级最高的元素。</p><p>要想有优先级，元素就需要实现 <code>Comparable</code> 接口或者 <code>Comparator</code> 接口</p><h3 id="set-接口" tabindex="-1"><a class="header-anchor" href="#set-接口" aria-hidden="true">#</a> Set 接口</h3><p>Set 的特点是存取无序，不可以存放重复的元素，不可以用下标对元素进行操作，和 List 有很多不同。</p><p>Set 的子类大多使用 Map 的子类的 key 存储数据，利用了 Map 键不允许重复、无序的特性。</p><ol><li><code>HashSet</code></li></ol><p>HashSet 内部是由 HashMap 实现的，只不过值由一个固定的 Object 对象填充，而键用于操作。</p><ol start="2"><li><code>LinkedHashSet</code></li></ol><p>LinkedHashSet 继承自 HashSet，其实是由 LinkedHashMap 实现的，LinkedHashSet 的构造方法调用了 HashSet 的一个特殊的构造方法：</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token class-name">HashSet</span><span class="token punctuation">(</span><span class="token keyword">int</span> initialCapacity<span class="token punctuation">,</span> <span class="token keyword">float</span> loadFactor<span class="token punctuation">,</span> <span class="token keyword">boolean</span> dummy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>initialCapacity<span class="token punctuation">,</span> loadFactor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="3"><li><code>TreeSet</code></li></ol><p>TreeSet 内部使用 TreeMap 实现，同样值由固定的 Object 对象填充，键用于操作。</p><h2 id="map-接口" tabindex="-1"><a class="header-anchor" href="#map-接口" aria-hidden="true">#</a> Map 接口</h2><blockquote><p>Map 保存的是键值对，键要求保持唯一性，值可以重复。</p></blockquote><ol><li><code>HashMap</code></li></ol><p>HashMap 实现了 Map 接口，根据键的 <strong>HashCode</strong> 值来存储数据，具有很快的访问速度，最多允许一个 null 键。</p><p>HashMap 不论是在学习还是工作当中，使用频率都是相当高的。随着 JDK 版本的不断更新，HashMap 的底层也优化了很多次，JDK 8 的时候引入了<strong>红黑树</strong>。</p><p>一旦 HashMap 发生哈希冲突，就把相同键位的地方改成链表，如果链表的长度超过 8，就该用红黑树。</p><ol start="2"><li><code>LinkedHashMap</code></li></ol><p>LinkedHashMap 是 HashMap 的子类，内部使用链表来记录插入/访问元素的顺序。</p><p>LinkedHashMap 可以看作是 HashMap + LinkedList 的合体，它使用了 哈希表来存储数据，又用了双向链表来维持顺序。</p><ol start="3"><li><code>TreeMap</code></li></ol><p>HashMap 是无序的，所以遍历的时候元素的顺序也是不可测的。TreeMap 是有序的，它在内部会对键进行排序，所以遍历的时候就可以得到预期的顺序。</p><p>为了保证顺序，TreeMap 的键必须要实现 Comparable 接口或者 Comparator 接口。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,61),u={href:"https://tobebetterjavaer.com/collection/gailan.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://pdai.tech/md/java/collection/java-collection-all.html",target:"_blank",rel:"noopener noreferrer"};function L(m,v){const a=i("ExternalLinkIcon");return n(),s("div",null,[r,c(" more "),h,e("ul",null,[e("li",null,[e("a",u,[o("Java 程序员进阶之路"),t(a)])]),e("li",null,[e("a",k,[o("Java全栈知识体系"),t(a)])])])])}const y=l(d,[["render",L],["__file","index.html.vue"]]);export{y as default};