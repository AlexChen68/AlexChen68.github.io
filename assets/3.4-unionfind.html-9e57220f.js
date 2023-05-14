import{_ as t,W as o,X as e,Y as n,a0 as s,Z as p,a1 as c,C as i}from"./framework-35f74cfc.js";const l={},u=n("h2",{id:"_1-什么是并查集-union-find-算法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-什么是并查集-union-find-算法","aria-hidden":"true"},"#"),s(" 1. 什么是并查集（Union-Find）算法")],-1),k=n("code",null,"动态连通性",-1),r={href:"https://labuladong.github.io/algo/di-yi-zhan-da78c/shou-ba-sh-03a72/bing-cha-j-323f3/",target:"_blank",rel:"noopener noreferrer"},d=c(`<p><strong>用途</strong>：以非常简单且巧妙的存储方式、算法来解决图论中<strong>无向图的节点动态连通</strong>的问题。很多复杂的 DFS 算法问题，都可以利用 Union-Find 算法更漂亮地解决。</p><p><strong>主要原理</strong>：用<code>数组</code>来存储每个节点的直接父节点，这样就足以存储包含多个连通分量的图——在内部为各连通分量自底向上生成了有向生成树并用数组存储（也可以理解为存储的是多棵树组成的森林，每棵树可以是任意叉的；这里的生成树不一定是原图的生成树），在并查集维护的过程中自底向上（自叶节点到根节点）动态维护各树。</p><h2 id="_2-实现-union-find-算法" tabindex="-1"><a class="header-anchor" href="#_2-实现-union-find-算法" aria-hidden="true">#</a> 2. 实现 Union-Find 算法</h2><p>并查集支持的<strong>操作</strong>包括：</p><ul><li>find(p)：找到指定节点所属的根节点。</li><li>union(p, q)：把 p、q 两个节点联通起来，也即将两节点分别所在的连通分量合并为一个。两节点原来可能已连通也可能尚未连通。实现：分别找出两节点的根节点，然后将一个根节点作为另一根节点的孩子。</li><li>connected(p, q)：判断两个节点是否连通。实现：获取两节点的根节点，判断是否是同一个。</li><li>count()：获取联通分量数，也即节点分类数。</li></ul><p>代码框架：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">UF</span> <span class="token punctuation">{</span>
    <span class="token comment">// 记录连通分量</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token comment">// 节点 x 的父节点是 parent[x]</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parent<span class="token punctuation">;</span>

    <span class="token comment">/* 构造函数，n 为图的节点总数 */</span>
    <span class="token keyword">public</span> <span class="token function">UF</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 一开始互不连通</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> n<span class="token punctuation">;</span>
        <span class="token comment">// 父节点指针初始指向自己</span>
        parent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          parent<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 连通两个结点 */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">union</span><span class="token punctuation">(</span><span class="token keyword">int</span> p<span class="token punctuation">,</span> <span class="token keyword">int</span> q<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> rootP <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> rootQ <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>rootP <span class="token operator">==</span> rootQ<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 将两棵树合并为一棵</span>
        parent<span class="token punctuation">[</span>rootP<span class="token punctuation">]</span> <span class="token operator">=</span> rootQ<span class="token punctuation">;</span>
        <span class="token comment">// parent[rootQ] = rootP 也一样</span>
        count<span class="token operator">--</span><span class="token punctuation">;</span> <span class="token comment">// 两个分量合二为一</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 返回某个节点 x 的根节点 */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 根节点的 parent[x] == x</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">!=</span> x<span class="token punctuation">)</span>
            x <span class="token operator">=</span> parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 返回当前的连通分量个数 */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">return</span> count<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 判断两个结点是否连通 */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">connected</span><span class="token punctuation">(</span><span class="token keyword">int</span> p<span class="token punctuation">,</span> <span class="token keyword">int</span> q<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> rootP <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> rootQ <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> rootP <span class="token operator">==</span> rootQ<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-优化-union-find-算法" tabindex="-1"><a class="header-anchor" href="#_3-优化-union-find-算法" aria-hidden="true">#</a> 3. 优化 Union-Find 算法</h2><h3 id="_3-1-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_3-1-复杂度分析" aria-hidden="true">#</a> 3.1 复杂度分析：</h3><ul><li><strong>空间复杂度</strong>：<em>O(n)</em>，n 为节点数</li><li><strong>时间复杂度</strong>：初始化的时间复杂度为 <em>O(n)</em>；<code>union</code> 和 <code>connected</code> 操作都依赖 <code>find</code> 且主要代价在 <code>find</code> 操作，因此时间复杂度看 <code>find</code> 操作，各操作的平均时间复杂度在优化前后分别为 <em>O(log<sub>n</sub>)</em>、<em>O(1)</em>。<code>find</code> 操作花费的时间与<strong>当前节点到根节点的路径</strong>长有关，平均时间复杂度为树高 <em>O(log<sub>n</sub>)</em>、最坏为 <em>O(n)</em>。</li></ul><p><strong>因此可以通过尽量减少 <code>find</code> 操作后的树高度，来优化整个算法的时间复杂度</strong>。有两种常见的优化方式，最终各操作时间复杂度为 <code>O(1)</code>，两种优化本质上都是为了<strong>减少树高</strong>：</p><ul><li>平衡性优化</li><li>路径压缩优化</li></ul><h3 id="_3-2-平衡性优化" tabindex="-1"><a class="header-anchor" href="#_3-2-平衡性优化" aria-hidden="true">#</a> 3.2 平衡性优化</h3><blockquote><p><strong>平衡性优化</strong>：<code>union</code> 操作时将<strong>节点数少的树的根节点接到节点数多的树的根节点</strong>上去，而不是反过来。这样可以防止树成为单链，从而减少下面的路径压缩操作。</p><p>解决方法是额外使用一个 <code>size</code> 数组，记录每棵树包含的节点数。</p></blockquote><p>平衡性优化后的代码实现：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">UF</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parent<span class="token punctuation">;</span>
    <span class="token comment">// 新增一个数组记录树的“重量”</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> size<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">UF</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> n<span class="token punctuation">;</span>
        parent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// 最初每棵树只有一个节点，重量应该初始化 1</span>
        size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            parent<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
            size<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">union</span><span class="token punctuation">(</span><span class="token keyword">int</span> p<span class="token punctuation">,</span> <span class="token keyword">int</span> q<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> rootP <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> rootQ <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>rootP <span class="token operator">==</span> rootQ<span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 小树接到大树下面，较平衡</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>size<span class="token punctuation">[</span>rootP<span class="token punctuation">]</span> <span class="token operator">&gt;</span> size<span class="token punctuation">[</span>rootQ<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            parent<span class="token punctuation">[</span>rootQ<span class="token punctuation">]</span> <span class="token operator">=</span> rootP<span class="token punctuation">;</span>
            size<span class="token punctuation">[</span>rootP<span class="token punctuation">]</span> <span class="token operator">+=</span> size<span class="token punctuation">[</span>rootQ<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            parent<span class="token punctuation">[</span>rootP<span class="token punctuation">]</span> <span class="token operator">=</span> rootQ<span class="token punctuation">;</span>
            size<span class="token punctuation">[</span>rootQ<span class="token punctuation">]</span> <span class="token operator">+=</span> size<span class="token punctuation">[</span>rootP<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        count<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 返回某个节点 x 的根节点 */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 根节点的 parent[x] == x</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">!=</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          x <span class="token operator">=</span> parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 返回当前的连通分量个数 */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">return</span> count<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

   <span class="token comment">/* 判断两个结点是否连通 */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">connected</span><span class="token punctuation">(</span><span class="token keyword">int</span> p<span class="token punctuation">,</span> <span class="token keyword">int</span> q<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> rootP <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> rootQ <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> rootP <span class="token operator">==</span> rootQ<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-路径压缩优化" tabindex="-1"><a class="header-anchor" href="#_3-3-路径压缩优化" aria-hidden="true">#</a> 3.3 路径压缩优化</h3><blockquote><p><strong>路径压缩优化</strong>：<code>find</code> 操作时顺便压缩路径，这里有两种实现</p><ol><li>普通的路径压缩：如果当前节点不是根节点，则将当前节点上移一层，然后对其新父节点递归执行该操作。</li><li>激进的压缩方式：此过程使得压缩后指定节点及其各非根父节点均直接成为根节点的子节点。</li></ol></blockquote><p>普通的路径压缩：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 每次 while 循环都会把一对父子节点改到同一层，这样每次调用 find 函数向树根遍历的同时，顺手就将树高缩短了。</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">!=</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// x 的根节点指向其父节点的父节点，相当于 x 往上面提了一层，成了其父节点的兄弟</span>
        parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">=</span> parent<span class="token punctuation">[</span>parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// 然后他们共同的父节点成为新的 x，继续向上合并</span>
        x <span class="token operator">=</span> parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>激进的压缩方式：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">!=</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>路径压缩后的代码实现：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">UF</span> <span class="token punctuation">{</span>
    <span class="token comment">// 连通分量个数</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token comment">// 存储每个节点的父节点</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parent<span class="token punctuation">;</span>

    <span class="token comment">// n 为图中节点的个数</span>
    <span class="token keyword">public</span> <span class="token function">UF</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> n<span class="token punctuation">;</span>
        parent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            parent<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 将节点 p 和节点 q 连通</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">union</span><span class="token punctuation">(</span><span class="token keyword">int</span> p<span class="token punctuation">,</span> <span class="token keyword">int</span> q<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> rootP <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> rootQ <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>rootP <span class="token operator">==</span> rootQ<span class="token punctuation">)</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        
        parent<span class="token punctuation">[</span>rootQ<span class="token punctuation">]</span> <span class="token operator">=</span> rootP<span class="token punctuation">;</span>
        <span class="token comment">// 两个连通分量合并成一个连通分量</span>
        count<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 判断节点 p 和节点 q 是否连通</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">connected</span><span class="token punctuation">(</span><span class="token keyword">int</span> p<span class="token punctuation">,</span> <span class="token keyword">int</span> q<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> rootP <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> rootQ <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> rootP <span class="token operator">==</span> rootQ<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">!=</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 返回图中的连通分量个数</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> count<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>平衡性优化和第一种路径压缩可以一起使用哦。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">UF</span> <span class="token punctuation">{</span>
    <span class="token comment">// 连通分量个数</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token comment">// 存储一棵树</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parent<span class="token punctuation">;</span>
    <span class="token comment">// 记录树的“重量”</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> size<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">UF</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> n<span class="token punctuation">;</span>
        parent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
        size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            parent<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
            size<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">union</span><span class="token punctuation">(</span><span class="token keyword">int</span> p<span class="token punctuation">,</span> <span class="token keyword">int</span> q<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> rootP <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> rootQ <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>rootP <span class="token operator">==</span> rootQ<span class="token punctuation">)</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>

        <span class="token comment">// 小树接到大树下面，较平衡</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>size<span class="token punctuation">[</span>rootP<span class="token punctuation">]</span> <span class="token operator">&gt;</span> size<span class="token punctuation">[</span>rootQ<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            parent<span class="token punctuation">[</span>rootQ<span class="token punctuation">]</span> <span class="token operator">=</span> rootP<span class="token punctuation">;</span>
            size<span class="token punctuation">[</span>rootP<span class="token punctuation">]</span> <span class="token operator">+=</span> size<span class="token punctuation">[</span>rootQ<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            parent<span class="token punctuation">[</span>rootP<span class="token punctuation">]</span> <span class="token operator">=</span> rootQ<span class="token punctuation">;</span>
            size<span class="token punctuation">[</span>rootQ<span class="token punctuation">]</span> <span class="token operator">+=</span> size<span class="token punctuation">[</span>rootP<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        count<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">connected</span><span class="token punctuation">(</span><span class="token keyword">int</span> p<span class="token punctuation">,</span> <span class="token keyword">int</span> q<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> rootP <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> rootQ <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> rootP <span class="token operator">==</span> rootQ<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">!=</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 进行路径压缩</span>
            parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">=</span> parent<span class="token punctuation">[</span>parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            x <span class="token operator">=</span> parent<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="_4-参考资料" tabindex="-1"><a class="header-anchor" href="#_4-参考资料" aria-hidden="true">#</a> 4. 参考资料</h2>`,26),v={href:"https://labuladong.github.io/algo/di-yi-zhan-da78c/shou-ba-sh-03a72/bing-cha-j-323f3/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.cnblogs.com/z-sm/p/12383918.html",target:"_blank",rel:"noopener noreferrer"};function b(w,y){const a=i("ExternalLinkIcon");return o(),e("div",null,[u,n("p",null,[s("并查集（Union-Find）算法是一个专门针对 "),k,s(" 的算法。关于动态连通性，可以参见这篇文章："),n("a",r,[s("并查集（Union-Find）算法"),p(a)])]),d,n("ul",null,[n("li",null,[n("a",v,[s("并查集（Union-Find）算法"),p(a)])]),n("li",null,[n("a",m,[s("算法之并查集 Union-Find"),p(a)])])])])}const h=t(l,[["render",b],["__file","3.4-unionfind.html.vue"]]);export{h as default};
