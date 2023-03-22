import{_ as o,W as c,X as l,Y as n,$ as a,a1 as s,a0 as i,C as p}from"./framework-8d3a05fe.js";const d={},u=i(`<h2 id="乐观锁与悲观锁的概念" tabindex="-1"><a class="header-anchor" href="#乐观锁与悲观锁的概念" aria-hidden="true">#</a> 乐观锁与悲观锁的概念</h2><p>锁可以从不同的角度分类。其中，乐观锁和悲观锁是一种分类方式。</p><p><strong>悲观锁：</strong></p><p>悲观锁就是我们常说的锁。对于悲观锁来说，它总是认为每次访问共享资源时会发生冲突，所以必须对每次数据操作加上锁，以保证临界区的程序同一时间只能有一个线程在执行。</p><p><strong>乐观锁：</strong></p><p>乐观锁又称为“无锁”，顾名思义，它是乐观派。乐观锁总是假设对共享资源的访问没有冲突，线程可以不停地执行，无需加锁也无需等待。而一旦多个线程发生冲突，乐观锁通常是使用一种称为 CAS 的技术来保证线程执行的安全性。</p><p>由于无锁操作中没有锁的存在，因此不可能出现死锁的情况，也就是说<strong>乐观锁天生免疫死锁</strong>。</p><p>乐观锁多用于“读多写少“的环境，避免频繁加锁影响性能；而悲观锁多用于”写多读少“的环境，避免频繁失败和重试影响性能。</p><h2 id="cas-的概念" tabindex="-1"><a class="header-anchor" href="#cas-的概念" aria-hidden="true">#</a> CAS 的概念</h2><p>CAS 的全称是：比较并交换（Compare And Swap）。在 CAS 中，有这样三个值：</p><ul><li>V：要更新的变量 (var)</li><li>E：预期值 (expected)</li><li>N：新值 (new)</li></ul><p>比较并交换的过程如下：</p><p>判断 V 是否等于 E，如果等于，将 V 的值设置为 N；如果不等，说明已经有其它线程更新了 V，则当前线程放弃更新，什么都不做。</p><p>所以这里的<strong>预期值 E 本质上指的是“旧值”</strong>。</p><p>我们以一个简单的例子来解释这个过程：</p><ol><li>如果有一个多个线程共享的变量<code>i</code>原本等于 5，我现在在线程 A 中，想把它设置为新的值 6;</li><li>我们使用 CAS 来做这个事情；</li><li>首先我们用 i 去与 5 对比，发现它等于 5，说明没有被其它线程改过，那我就把它设置为新的值 6，此次 CAS 成功，<code>i</code>的值被设置成了 6；</li><li>如果不等于 5，说明<code>i</code>被其它线程改过了（比如现在<code>i</code>的值为 2），那么我就什么也不做，此次 CAS 失败，<code>i</code>的值仍然为 2。</li></ol><p>在这个例子中，<code>i</code>就是 V，5 就是 E，6 就是 N。</p><p>那有没有可能我在判断了<code>i</code>为 5 之后，正准备更新它的新值的时候，被其它线程更改了<code>i</code>的值呢？</p><p>不会的。因为 CAS 是一种原子操作，它是一种系统原语，是一条 CPU 的原子指令，从 CPU 层面保证它的原子性</p><p><strong>当多个线程同时使用 CAS 操作一个变量时，只有一个会胜出，并成功更新，其余均会失败，但失败的线程并不会被挂起，仅是被告知失败，并且允许再次尝试，当然也允许失败的线程放弃操作。</strong></p><h2 id="java-实现-cas-的原理-unsafe-类" tabindex="-1"><a class="header-anchor" href="#java-实现-cas-的原理-unsafe-类" aria-hidden="true">#</a> Java 实现 CAS 的原理 - Unsafe 类</h2><p>前面提到，CAS 是一种原子操作。那么 Java 是怎样来使用 CAS 的呢？我们知道，在 Java 中，如果一个方法是 native 的，那 Java 就不负责具体实现它，而是交给底层的 JVM 使用 c 或者 c++去实现。</p><p>在 Java 中，有一个<code>Unsafe</code>类，它在<code>sun.misc</code>包中。它里面是一些<code>native</code>方法，其中就有几个关于 CAS 的：</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">compareAndSwapObject</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">,</span> <span class="token keyword">long</span> offset<span class="token punctuation">,</span><span class="token class-name">Object</span> expected<span class="token punctuation">,</span> <span class="token class-name">Object</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">boolean</span> <span class="token function">compareAndSwapInt</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">,</span> <span class="token keyword">long</span> offset<span class="token punctuation">,</span><span class="token keyword">int</span> expected<span class="token punctuation">,</span><span class="token keyword">int</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">boolean</span> <span class="token function">compareAndSwapLong</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">,</span> <span class="token keyword">long</span> offset<span class="token punctuation">,</span><span class="token keyword">long</span> expected<span class="token punctuation">,</span><span class="token keyword">long</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>当然，他们都是<code>public native</code>的。</p><p>Unsafe 中对 CAS 的实现是 C++写的，它的具体实现和操作系统、CPU 都有关系。</p><p>Linux 的 X86 下主要是通过<code>cmpxchgl</code>这个指令在 CPU 级完成 CAS 操作的，但在多处理器情况下必须使用<code>lock</code>指令加锁来完成。当然不同的操作系统和处理器的实现会有所不同，大家可以自行了解。</p><p>当然，Unsafe 类里面还有其它方法用于不同的用途。比如支持线程挂起和恢复的<code>park</code>和<code>unpark</code>，LockSupport 类底层就是调用了这两个方法。还有支持反射操作的<code>allocateInstance()</code>方法。</p><h2 id="原子操作-atomicinteger-类源码简析" tabindex="-1"><a class="header-anchor" href="#原子操作-atomicinteger-类源码简析" aria-hidden="true">#</a> 原子操作-AtomicInteger 类源码简析</h2><p>上面介绍了 Unsafe 类的几个支持 CAS 的方法。那 Java 具体是如何使用这几个方法来实现原子操作的呢？</p><p>JDK 提供了一些用于原子操作的类，在<code>java.util.concurrent.atomic</code>包下面。在 JDK 11 中，有如下 17 个类：</p><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/java/原子类.jpg" alt="原子类" loading="lazy"></p><p>从名字就可以看得出来这些类大概的用途：</p><ul><li>原子更新基本类型</li><li>原子更新数组</li><li>原子更新引用</li><li>原子更新字段（属性）</li></ul><p>这里我们以<code>AtomicInteger</code>类的<code>getAndAdd(int delta)</code>方法为例，来看看 Java 是如何实现原子操作的。</p><p>先看看这个方法的源码：</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">getAndAdd</span><span class="token punctuation">(</span><span class="token keyword">int</span> delta<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">getAndAddInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token constant">VALUE</span><span class="token punctuation">,</span> delta<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这里的 U 其实就是一个<code>Unsafe</code>对象：</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name"><span class="token namespace">jdk<span class="token punctuation">.</span>internal<span class="token punctuation">.</span>misc<span class="token punctuation">.</span></span>Unsafe</span> <span class="token class-name">U</span> <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">jdk<span class="token punctuation">.</span>internal<span class="token punctuation">.</span>misc<span class="token punctuation">.</span></span>Unsafe</span><span class="token punctuation">.</span><span class="token function">getUnsafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>所以其实<code>AtomicInteger</code>类的<code>getAndAdd(int delta)</code>方法是调用<code>Unsafe</code>类的方法来实现的：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@HotSpotIntrinsicCandidate</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">getAndAddInt</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">,</span> <span class="token keyword">long</span> offset<span class="token punctuation">,</span> <span class="token keyword">int</span> delta<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> v<span class="token punctuation">;</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span>
        v <span class="token operator">=</span> <span class="token function">getIntVolatile</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">weakCompareAndSetInt</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> offset<span class="token punctuation">,</span> v<span class="token punctuation">,</span> v <span class="token operator">+</span> delta<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> v<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注：这个方法是在 JDK 1.8 才新增的。在 JDK1.8 之前，<code>AtomicInteger</code>源码实现有所不同，是基于 for 死循环的，有兴趣的读者可以自行了解一下。</p></blockquote><p>我们来一步步解析这段源码。首先，对象<code>o</code>是<code>this</code>，也就是一个<code>AtomicInteger</code>对象。然后<code>offset</code>是一个常量<code>VALUE</code>。这个常量是在<code>AtomicInteger</code>类中声明的：</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">VALUE</span> <span class="token operator">=</span> <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">objectFieldOffset</span><span class="token punctuation">(</span><span class="token class-name">AtomicInteger</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>同样是调用的<code>Unsafe</code>的方法。从方法名字上来看，是得到了一个对象字段偏移量。</p><blockquote><p>用于获取某个字段相对 Java 对象的“起始地址”的偏移量。</p><p>一个 java 对象可以看成是一段内存，各个字段都得按照一定的顺序放在这段内存里，同时考虑到对齐要求，可能这些字段不是连续放置的，</p><p>用这个方法能准确地告诉你某个字段相对于对象的起始内存地址的字节偏移量，因为是相对偏移量，所以它其实跟某个具体对象又没什么太大关系，跟 class 的定义和虚拟机的内存模型的实现细节更相关。</p></blockquote><p>继续看源码。前面我们讲到，CAS 是“无锁”的基础，它允许更新失败。所以经常会与 while 循环搭配，在失败后不断去重试。</p><p>这里声明了一个 v，也就是要返回的值。从<code>getAndAddInt</code>来看，它返回的应该是原来的值，而新的值的<code>v + delta</code>。</p><p>这里使用的是<strong>do-while 循环</strong>。这种循环不多见，它的目的是<strong>保证循环体内的语句至少会被执行一遍</strong>。这样才能保证 return 的值<code>v</code>是我们期望的值。</p><p>循环体的条件是一个 CAS 方法：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">weakCompareAndSetInt</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">,</span> <span class="token keyword">long</span> offset<span class="token punctuation">,</span>
                                          <span class="token keyword">int</span> expected<span class="token punctuation">,</span>
                                          <span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">compareAndSetInt</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> offset<span class="token punctuation">,</span> expected<span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">native</span> <span class="token keyword">boolean</span> <span class="token function">compareAndSetInt</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">,</span> <span class="token keyword">long</span> offset<span class="token punctuation">,</span>
                                             <span class="token keyword">int</span> expected<span class="token punctuation">,</span>
                                             <span class="token keyword">int</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，最终其实是调用的我们之前说到了 CAS <code>native</code>方法。那为什么要经过一层<code>weakCompareAndSetInt</code>呢？从 JDK 源码上看不出来什么。在 JDK 8 及之前的版本，这两个方法是一样的。</p><blockquote><p>而在 JDK 9 开始，这两个方法上面增加了@HotSpotIntrinsicCandidate 注解。这个注解允许 HotSpot VM 自己来写汇编或 IR 编译器来实现该方法以提供性能。也就是说虽然外面看到的在 JDK9 中 weakCompareAndSet 和 compareAndSet 底层依旧是调用了一样的代码，但是不排除 HotSpot VM 会手动来实现 weakCompareAndSet 真正含义的功能的可能性。</p></blockquote><p>根据本文第二篇参考文章（文末链接），它跟<code>volatile</code>有关。</p><p>简单来说，<code>weakCompareAndSet</code>操作仅保留了<code>volatile</code>自身变量的特性，而除去了 happens-before 规则带来的内存语义。也就是说，<code>weakCompareAndSet</code>**无法保证处理操作目标的 volatile 变量外的其他变量的执行顺序 ( 编译器和处理器为了优化程序性能而对指令序列进行重新排序 )，同时也无法保证这些变量的可见性。**这在一定程度上可以提高性能。</p><p>再回到循环条件上来，可以看到它是在不断尝试去用 CAS 更新。如果更新失败，就继续重试。那为什么要把获取“旧值”v 的操作放到循环体内呢？其实这也很好理解。前面我们说了，CAS 如果旧值 V 不等于预期值 E，它就会更新失败。说明旧的值发生了变化。那我们当然需要返回的是被其他线程改变之后的旧值了，因此放在了 do 循环体内。</p><h2 id="cas-实现原子操作的三大问题" tabindex="-1"><a class="header-anchor" href="#cas-实现原子操作的三大问题" aria-hidden="true">#</a> CAS 实现原子操作的三大问题</h2><p>这里介绍一下 CAS 实现原子操作的三大问题及其解决方案。</p><h3 id="aba-问题" tabindex="-1"><a class="header-anchor" href="#aba-问题" aria-hidden="true">#</a> ABA 问题</h3><p>所谓 ABA 问题，就是一个值原来是 A，变成了 B，又变回了 A。这个时候使用 CAS 是检查不出变化的，但实际上却被更新了两次。</p><p>ABA 问题的解决思路是在变量前面追加上<strong>版本号或者时间戳</strong>。从 JDK 1.5 开始，JDK 的 atomic 包里提供了一个类<code>AtomicStampedReference</code>类来解决 ABA 问题。</p><p>这个类的<code>compareAndSet</code>方法的作用是首先检查当前引用是否等于预期引用，并且检查当前标志是否等于预期标志，如果二者都相等，才使用 CAS 设置为新的值和标志。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token class-name">V</span>   expectedReference<span class="token punctuation">,</span>
                             <span class="token class-name">V</span>   newReference<span class="token punctuation">,</span>
                             <span class="token keyword">int</span> expectedStamp<span class="token punctuation">,</span>
                             <span class="token keyword">int</span> newStamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Pair</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> current <span class="token operator">=</span> pair<span class="token punctuation">;</span>
    <span class="token keyword">return</span>
        expectedReference <span class="token operator">==</span> current<span class="token punctuation">.</span>reference <span class="token operator">&amp;&amp;</span>
        expectedStamp <span class="token operator">==</span> current<span class="token punctuation">.</span>stamp <span class="token operator">&amp;&amp;</span>
        <span class="token punctuation">(</span><span class="token punctuation">(</span>newReference <span class="token operator">==</span> current<span class="token punctuation">.</span>reference <span class="token operator">&amp;&amp;</span>
          newStamp <span class="token operator">==</span> current<span class="token punctuation">.</span>stamp<span class="token punctuation">)</span> <span class="token operator">||</span>
         <span class="token function">casPair</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> <span class="token class-name">Pair</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>newReference<span class="token punctuation">,</span> newStamp<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="循环时间长开销大" tabindex="-1"><a class="header-anchor" href="#循环时间长开销大" aria-hidden="true">#</a> 循环时间长开销大</h3><p>CAS 多与自旋结合。如果自旋 CAS 长时间不成功，会占用大量的 CPU 资源。</p><p>解决思路是让 JVM 支持处理器提供的<strong>pause 指令</strong>。</p><p>pause 指令能让自旋失败时 cpu 睡眠一小段时间再继续自旋，从而使得读操作的频率低很多，为解决内存顺序冲突而导致的 CPU 流水线重排的代价也会小很多。</p><h3 id="只能保证一个共享变量的原子操作" tabindex="-1"><a class="header-anchor" href="#只能保证一个共享变量的原子操作" aria-hidden="true">#</a> 只能保证一个共享变量的原子操作</h3><p>这个问题你可能已经知道怎么解决了。有两种解决方案：</p><ol><li>使用 JDK 1.5 开始就提供的<code>AtomicReference</code>类保证对象之间的原子性，把多个变量放到一个对象里面进行 CAS 操作；</li><li>使用锁。锁内的临界区代码可以保证只有当前线程能操作。</li></ol><hr><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,72),r={href:"http://concurrent.redspider.group/article/02/10.html",target:"_blank",rel:"noopener noreferrer"},k={href:"http://www.importnew.com/27596.html",target:"_blank",rel:"noopener noreferrer"},v=n("li",null,"《Java 并发编程的艺术》",-1);function m(f,g){const e=p("ExternalLinkIcon"),t=p("Badge");return c(),l("div",null,[u,n("ul",null,[n("li",null,[n("a",r,[a("CAS 与原子操作"),s(e)]),a(),s(t,{text:"原文",type:"tip"})]),n("li",null,[n("a",k,[a("对 volatile、compareAndSet、weakCompareAndSet 的一些思考"),s(e)])]),v])])}const h=o(d,[["render",m],["__file","cas.html.vue"]]);export{h as default};
