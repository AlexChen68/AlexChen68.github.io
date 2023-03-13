import{_ as n,W as a,X as s,a0 as p}from"./framework-07dc8c78.js";const e={},t=p(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p><code>TreeSet</code> 是基于 <code>TreeMap</code> 的 <code>Set</code> 集合实现类，利用了 <code>TreeMap</code> 的键不允许重复、无序的特点，将元素存储在 TreeMap 的键中，而值使用固定的 Object 对象填充。</p><h2 id="类图" tabindex="-1"><a class="header-anchor" href="#类图" aria-hidden="true">#</a> 类图</h2><p><img src="https://cdn.staticaly.com/gh/alexchen68/image-hosting@master/blog/java/treeset_class.png" alt="TreeSet类图" title=":size=60%" loading="lazy"></p><p><code>TreeSet</code> 实现了三个接口：</p><ul><li><code>java.util.NavigableSet</code> 可导航 Set 集合，定义了获取给定元素最接近元素的方法；</li><li><code>java.io.Serializable</code> 序列化接口；</li><li><code>java.lang.Cloneable</code> 可克隆接口；</li></ul><p>并继承了 <code>java.util.AbstractSet</code> 抽象类，其实现了基本的集合方法。</p><h2 id="属性" tabindex="-1"><a class="header-anchor" href="#属性" aria-hidden="true">#</a> 属性</h2><p><strong>类属性</strong></p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token comment">// 用于填充 value 的通用 Object 对象</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> <span class="token constant">PRESENT</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><strong>实例属性</strong></p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token class-name">NavigableMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> m<span class="token punctuation">;</span>
</code></pre></div><h2 id="构造方法" tabindex="-1"><a class="header-anchor" href="#构造方法" aria-hidden="true">#</a> 构造方法</h2><p><code>TreeSet</code> 内部维护了一个 <code>NavigableMap</code> 类型的属性，默认使用 <code>TreeMap</code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">TreeSet</span><span class="token punctuation">(</span><span class="token class-name">NavigableMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> m<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>m <span class="token operator">=</span> m<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">TreeSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">TreeSet</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> comparator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>comparator<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">TreeSet</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 批量添加</span>
    <span class="token function">addAll</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">TreeSet</span><span class="token punctuation">(</span><span class="token class-name">SortedSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">comparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 批量添加</span>
    <span class="token function">addAll</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h3><h3 id="添加元素" tabindex="-1"><a class="header-anchor" href="#添加元素" aria-hidden="true">#</a> 添加元素</h3><p>添加单个元素调用 <code>TreeMap</code> 的 put 方法，使用 <code>PRESENT</code> 填充值。</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> <span class="token constant">PRESENT</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>批量添加元素</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span>  <span class="token keyword">boolean</span> <span class="token function">addAll</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 特殊优化</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">0</span> <span class="token operator">&amp;&amp;</span> c<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
            c <span class="token keyword">instanceof</span> <span class="token class-name">SortedSet</span> <span class="token operator">&amp;&amp;</span>
            m <span class="token keyword">instanceof</span> <span class="token class-name">TreeMap</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SortedSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> set <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">SortedSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> c<span class="token punctuation">;</span>
        <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> m<span class="token punctuation">;</span>
        <span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> cc <span class="token operator">=</span> set<span class="token punctuation">.</span><span class="token function">comparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> mc <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">comparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cc<span class="token operator">==</span>mc <span class="token operator">||</span> <span class="token punctuation">(</span>cc <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> cc<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>mc<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// TreeMap 针对 TreeSet 的优化方法</span>
            map<span class="token punctuation">.</span><span class="token function">addAllForTreeSet</span><span class="token punctuation">(</span>set<span class="token punctuation">,</span> <span class="token constant">PRESENT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 普通情况</span>
    <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除元素" tabindex="-1"><a class="header-anchor" href="#删除元素" aria-hidden="true">#</a> 删除元素</h3><p>删除元素调用 <code>TreeMap</code> 的 remove 方法。</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token operator">==</span><span class="token constant">PRESENT</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="查找元素" tabindex="-1"><a class="header-anchor" href="#查找元素" aria-hidden="true">#</a> 查找元素</h3><p>判断是否包含给定元素，调用 <code>TreeMap</code> 的 <code>containsKey</code> 方法。</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">contains</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="查找接近的元素" tabindex="-1"><a class="header-anchor" href="#查找接近的元素" aria-hidden="true">#</a> 查找接近的元素</h2><p><code>TreeMap</code> 是继承自 <code>NavigableMap</code> 的可导航映射类，实现了查询小于、小于或等于、大于、大于或等于给定键的导航方法，<code>TreeSet</code> 则通过调用内部的 <code>NavigableMap</code> 的对应方法，实现查找接近元素的操作。</p><h4 id="严格小于给定元素的最大元素" tabindex="-1"><a class="header-anchor" href="#严格小于给定元素的最大元素" aria-hidden="true">#</a> 严格小于给定元素的最大元素</h4><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">lower</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">lowerKey</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="小于或等于给定元素的最大元素" tabindex="-1"><a class="header-anchor" href="#小于或等于给定元素的最大元素" aria-hidden="true">#</a> 小于或等于给定元素的最大元素</h3><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">floor</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">floorKey</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="严格大于给定元素的最小元素" tabindex="-1"><a class="header-anchor" href="#严格大于给定元素的最小元素" aria-hidden="true">#</a> 严格大于给定元素的最小元素</h3><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">higher</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">higherKey</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="大于或等于给定元素的最小元素" tabindex="-1"><a class="header-anchor" href="#大于或等于给定元素的最小元素" aria-hidden="true">#</a> 大于或等于给定元素的最小元素</h3><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">ceiling</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">ceilingKey</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="获取首位元素" tabindex="-1"><a class="header-anchor" href="#获取首位元素" aria-hidden="true">#</a> 获取首位元素</h2><p>同样是通过调用 <code>TreeMap</code> 的对应方法实现对应操作。</p><h3 id="获取首个元素" tabindex="-1"><a class="header-anchor" href="#获取首个元素" aria-hidden="true">#</a> 获取首个元素</h3><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">firstKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="获取首个元素并移除" tabindex="-1"><a class="header-anchor" href="#获取首个元素并移除" aria-hidden="true">#</a> 获取首个元素并移除</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">pollFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">,</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> e <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">pollFirstEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>e <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> e<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取末尾元素" tabindex="-1"><a class="header-anchor" href="#获取末尾元素" aria-hidden="true">#</a> 获取末尾元素</h3><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">last</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">lastKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="获取末尾元素并移除" tabindex="-1"><a class="header-anchor" href="#获取末尾元素并移除" aria-hidden="true">#</a> 获取末尾元素并移除</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">pollLast</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">,</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> e <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">pollLastEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>e <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> e<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取一定范围的子集合" tabindex="-1"><a class="header-anchor" href="#获取一定范围的子集合" aria-hidden="true">#</a> 获取一定范围的子集合</h2><h3 id="获取小于给定元素的子集合" tabindex="-1"><a class="header-anchor" href="#获取小于给定元素的子集合" aria-hidden="true">#</a> 获取小于给定元素的子集合</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 不包含给定元素</span>
<span class="token keyword">public</span> <span class="token class-name">SortedSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">headSet</span><span class="token punctuation">(</span><span class="token class-name">E</span> toElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">headSet</span><span class="token punctuation">(</span>toElement<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// inclusive 为 true 时包含给定元素</span>
<span class="token keyword">public</span> <span class="token class-name">NavigableSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">headSet</span><span class="token punctuation">(</span><span class="token class-name">E</span> toElement<span class="token punctuation">,</span> <span class="token keyword">boolean</span> inclusive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">headMap</span><span class="token punctuation">(</span>toElement<span class="token punctuation">,</span> inclusive<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取中间范围的子集合" tabindex="-1"><a class="header-anchor" href="#获取中间范围的子集合" aria-hidden="true">#</a> 获取中间范围的子集合</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 不包含给定元素</span>
<span class="token keyword">public</span> <span class="token class-name">SortedSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">subSet</span><span class="token punctuation">(</span><span class="token class-name">E</span> fromElement<span class="token punctuation">,</span> <span class="token class-name">E</span> toElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">subSet</span><span class="token punctuation">(</span>fromElement<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> toElement<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// fromInclusive 为 true 时包含 fromElement</span>
<span class="token comment">// toInclusive 为 true 时包含 toElement</span>
<span class="token keyword">public</span> <span class="token class-name">NavigableSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">subSet</span><span class="token punctuation">(</span><span class="token class-name">E</span> fromElement<span class="token punctuation">,</span> <span class="token keyword">boolean</span> fromInclusive<span class="token punctuation">,</span>
                              <span class="token class-name">E</span> toElement<span class="token punctuation">,</span>   <span class="token keyword">boolean</span> toInclusive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">subMap</span><span class="token punctuation">(</span>fromElement<span class="token punctuation">,</span> fromInclusive<span class="token punctuation">,</span>
                                   toElement<span class="token punctuation">,</span>   toInclusive<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取大于给定元素的子集合" tabindex="-1"><a class="header-anchor" href="#获取大于给定元素的子集合" aria-hidden="true">#</a> 获取大于给定元素的子集合</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 不包含给定元素</span>
<span class="token keyword">public</span> <span class="token class-name">SortedSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">tailSet</span><span class="token punctuation">(</span><span class="token class-name">E</span> fromElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">tailSet</span><span class="token punctuation">(</span>fromElement<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// inclusive 为 true 时包含给定元素</span>
<span class="token keyword">public</span> <span class="token class-name">NavigableSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">tailSet</span><span class="token punctuation">(</span><span class="token class-name">E</span> fromElement<span class="token punctuation">,</span> <span class="token keyword">boolean</span> inclusive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">tailMap</span><span class="token punctuation">(</span>fromElement<span class="token punctuation">,</span> inclusive<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p><code>TreeSet</code> 是基于 <code>TreeMap</code> 的 Set 实现类，其利用了 TreeMap 键的不可重复、可排序的特性。</p>`,56),c=[t];function o(l,u){return a(),s("div",null,c)}const k=n(e,[["render",o],["__file","set-treeset.html.vue"]]);export{k as default};