import{_ as p,W as e,X as o,Z as n,$ as s,a0 as t,a1 as l,C as c}from"./framework-ea95e8eb.js";const i={},u=l(`<h2 id="_1-图的概述" tabindex="-1"><a class="header-anchor" href="#_1-图的概述" aria-hidden="true">#</a> 1. 图的概述</h2><p><strong>图的定义</strong></p><p>图 (Graph) 是由顶点的有穷非空集合和顶点之间边的集合组成，通常表示为：G(V,E)，其中，G 表示一个图，V 是图 G 中顶点的集合，E 是图 G 中边的集合。</p><p>和线性表，树的差异:</p><ul><li><p>线性表中我们把数据元素叫元素，树中将数据元素叫结点，在图中数据元素，我们则称之为顶点 (Vertex)。</p></li><li><p>线性表可以没有元素，称为空表；树中可以没有节点，称为空树；但是，在图中不允许没有顶点 (有穷非空性)。</p></li><li><p>线性表中的各元素是线性关系，树中的各元素是层次关系，而图中各顶点的关系是用边来表示 (边集可以为空)。</p></li></ul><p><strong>图的分类</strong></p><ul><li><p>有向图：如果给图的每条边规定一个方向，那么得到的图称为<strong>有向图</strong>。</p></li><li><p>无向图：在有向图中，与一个节点相关联的边有出边和入边之分。相反，边没有方向的图称为<strong>无向图</strong>。</p></li><li><p>单图：一个图如果任意两顶点之间只有一条边（在有向图中为两顶点之间每个方向只有一条边）；边集中不含环，则称为<strong>单图</strong>。</p></li></ul><p><strong>基本术语</strong></p><ul><li><p>顶点的度：顶点 Vi 的度 (Degree) 是指在图中与 Vi 相关联的边的条数。对于有向图来说，有入度 (In-degree) 和出度 (Out-degree) 之分，有向图顶点的度等于该顶点的入度和出度之和。</p></li><li><p>邻接：</p><ul><li>若无向图中的两个顶点 V1 和 V2 存在一条边 (V1,V2)，则称顶点 V1 和 V2 邻接 (Adjacent)；</li><li>若有向图中存在一条边&lt;V3,V2&gt;，则称顶点 V3 与顶点 V2 邻接，且是 V3 邻接到 V2 或 V2 邻接到 V3；</li></ul></li><li><p>路径：在无向图中，若从顶点 Vi 出发有一组边可到达顶点 Vj，则称顶点 Vi 到顶点 Vj 的顶点序列为从顶点 Vi 到顶点 Vj 的路径 (Path)。</p></li><li><p>连通：若从 Vi 到 Vj 有路径可通，则称顶点 Vi 和顶点 Vj 是连通 (Connected) 的。</p></li><li><p>权 (Weight)：有些图的边或弧具有与它相关的数字，这种与图的边或弧相关的数叫做权 (Weight)。</p></li><li><p>连通：如果从 V 到 W 存在一条（无向）路径，则称 V 和 W 是连通的；</p></li><li><p>路径：V 到 W 的路径是一系列顶点{V, v 1, v 2, …, v n, W}的集合，其中任一对相邻的顶点间都有图中的边。路径的长度是路径中的边数（如果带 权，则是所有边的权重和）。如果 V 到 W 之间的所有顶点都不同，则称简单路径；</p></li><li><p>回路：起点等于终点的路径；</p></li><li><p>连通图：图中任意两顶点均连通</p></li></ul><h2 id="_2-图的表示" tabindex="-1"><a class="header-anchor" href="#_2-图的表示" aria-hidden="true">#</a> 2. 图的表示</h2><h3 id="_2-1-邻接矩阵-数组存储" tabindex="-1"><a class="header-anchor" href="#_2-1-邻接矩阵-数组存储" aria-hidden="true">#</a> 2.1 邻接矩阵（数组存储）</h3><p>邻接矩阵 G[N][N]——N 个顶点从 0 到 N-1 编号，若结点 V<sub>i</sub> 和 结点 V<sub>j</sub> 是 G 中的边，这 G[i][j] = 1，否则等于 0，由此得出的 N * N 的矩阵为邻接矩阵。</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token comment">// matrix[x][y] 记录 x 是否有一条指向 y 的边</span>
<span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> matrix<span class="token punctuation">;</span>
</code></pre></div><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/邻接矩阵.png" alt="邻接矩阵" loading="lazy"></p><p>表示无向图时：</p><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/邻接矩阵-无向图.png" alt="邻接矩阵" loading="lazy"></p><p>对于无向图来说，V<sub>i</sub> 和 V<sub>j</sub> 的结果和 V<sub>j</sub> 和 V<sub>i</sub> 的结果是对称的。</p><blockquote><p>不足：由于存在 n 个顶点的图需要 n*n 个数组元素进行存储，当图为稀疏图时，使用邻接矩阵存储方法将会出现大量 0 元素，这会造成极大的空间浪费。这时，可以考虑使用邻接表表示法来存储图中的数据。</p></blockquote><h3 id="_2-2-邻接表-链表存储" tabindex="-1"><a class="header-anchor" href="#_2-2-邻接表-链表存储" aria-hidden="true">#</a> 2.2 邻接表（链表存储）</h3><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token comment">// graph[x] 存储 x 的所有邻居节点</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> graph <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/邻接表.png" alt="邻接表" loading="lazy"></p><p><strong>邻接矩阵与邻接表比较</strong></p><p>对于邻接表，好处是占用的空间少。邻接矩阵里面空着那么多位置，肯定需要更多的存储空间。</p><p>但是，邻接表无法快速判断两个节点是否相邻。</p><h2 id="_3-图的遍历" tabindex="-1"><a class="header-anchor" href="#_3-图的遍历" aria-hidden="true">#</a> 3. 图的遍历</h2><h3 id="_3-1-深度优先遍历〔depth-first-search-dfs〕" tabindex="-1"><a class="header-anchor" href="#_3-1-深度优先遍历〔depth-first-search-dfs〕" aria-hidden="true">#</a> 3.1 深度优先遍历〔Depth First Search, DFS〕</h3><blockquote><p>DFS：核心思想就是一条路找到底，然后回退一步换一个方向继续。有一个细节是，有时需要在出递归时把回退到的当前节点标为可访问。</p></blockquote><p>深度优先遍历图的方法是，从图中某顶点 v 出发： （1）访问顶点 v； （2）依次从 v 的未被访问的邻接点出发，对图进行深度优先遍历；直至图中和 v 有路径相通的顶点都被访问； （3）若此时图中尚有顶点未被访问，则从一个未被访问的顶点出发，重新进行深度优先遍历，直到图中所有顶点均被访问过为止。</p><p>DFS 算法框架：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">DFS</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> graph<span class="token punctuation">,</span> <span class="token keyword">int</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> visited<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span>graph<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">traverse</span><span class="token punctuation">(</span>graph<span class="token punctuation">,</span> s<span class="token punctuation">,</span> visited<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">traverse</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> graph<span class="token punctuation">,</span> <span class="token keyword">int</span> s<span class="token punctuation">,</span> <span class="token keyword">boolean</span> visited<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    visited<span class="token punctuation">[</span>s<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token comment">// 访问该结点</span>
    <span class="token comment">// doSomething();</span>

    <span class="token comment">// 遍历 s 的相邻结点</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> graph<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>graph<span class="token punctuation">[</span>s<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>visited<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">traverse</span><span class="token punctuation">(</span>graph<span class="token punctuation">,</span> i<span class="token punctuation">,</span> visited<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-广度优先搜索〔breadth-first-search-bfs〕" tabindex="-1"><a class="header-anchor" href="#_3-2-广度优先搜索〔breadth-first-search-bfs〕" aria-hidden="true">#</a> 3.2 广度优先搜索〔Breadth First Search, BFS〕</h3><blockquote><p>BFS：广度优先搜索的搜索过程有点像一层一层地进行遍历，每层遍历都以上一层遍历的结果作为起点，遍历一个距离能访问到的所有节点。需要注意的是，遍历过的节点不能再次被遍历。</p></blockquote><p>BFS 常常用来求解<strong>无权图的最短路径问题</strong>。</p><p>在程序实现 BFS 时需要考虑以下问题：</p><ul><li>队列：用来存储每一轮遍历得到的节点；</li><li>标记：对于遍历过的节点，应该将它标记，防止重复遍历。</li></ul><p>BFS 算法框架：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">BFS</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> graph<span class="token punctuation">,</span> <span class="token keyword">int</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 标记所有节点为未访问状态</span>
    <span class="token keyword">boolean</span> visited<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span>graph<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建一个队列来存储需要遍历的节点</span>
    <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 将起始节点加入队列，并标记已访问过</span>
    visited<span class="token punctuation">[</span>s<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 从队列中取出要访问的节点</span>
        s <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 访问该结点</span>
        <span class="token comment">// doSomething();</span>

        <span class="token comment">// 遍历与该节点相邻且未被访问的节点</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> graph<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>graph<span class="token punctuation">[</span>s<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>visited<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                visited<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-相关算法题" tabindex="-1"><a class="header-anchor" href="#_4-相关算法题" aria-hidden="true">#</a> 4. 相关算法题</h2>`,38),r={href:"https://leetcode.cn/problems/all-paths-from-source-to-target",target:"_blank",rel:"noopener noreferrer"},k={href:"https://leetcode.cn/problems/course-schedule/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://leetcode.cn/problems/course-schedule-ii/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://leetcode.cn/problems/is-graph-bipartite/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://leetcode.cn/problems/possible-bipartition/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://leetcode.cn/problems/satisfiability-of-equality-equations/",target:"_blank",rel:"noopener noreferrer"},b=n("h2",{id:"_5-参考资料",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_5-参考资料","aria-hidden":"true"},"#"),s(" 5. 参考资料")],-1),g={href:"https://labuladong.github.io/algo/di-yi-zhan-da78c/shou-ba-sh-03a72/bing-cha-j-323f3/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://zhuanlan.zhihu.com/p/93647900",target:"_blank",rel:"noopener noreferrer"};function f(V,y){const a=c("ExternalLinkIcon");return e(),o("div",null,[u,n("ul",null,[n("li",null,[s("图的基本遍历 "),n("ul",null,[n("li",null,[n("a",r,[s("797. 所有可能的路径"),t(a)])])])]),n("li",null,[s("检测图是否有环 "),n("ul",null,[n("li",null,[n("a",k,[s("207. 课程表"),t(a)])]),n("li",null,[n("a",d,[s("210. 课程表 II"),t(a)])])])]),n("li",null,[s("二分图 "),n("ul",null,[n("li",null,[n("a",h,[s("785. 判断二分图"),t(a)])]),n("li",null,[n("a",v,[s("886. 可能的二分法"),t(a)])])])]),n("li",null,[s("并查集（Union-Find）算法 "),n("ul",null,[n("li",null,[n("a",m,[s("990. 等式方程的可满足性"),t(a)])])])])]),b,n("ul",null,[n("li",null,[n("a",g,[s("labuladong 的算法小抄"),t(a)])]),n("li",null,[n("a",_,[s("算法学习笔记 : 并查集"),t(a)])])])])}const x=p(i,[["render",f],["__file","3.1-graph.html.vue"]]);export{x as default};