import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.419948d5.js";const d=JSON.parse('{"title":"广度优先搜索","description":"","frontmatter":{"title":"广度优先搜索","date":"2023-06-07T00:00:00.000Z"},"headers":[],"relativePath":"advance/algo/2-search/3-bfs.md","filePath":"advance/algo/2-search/3-bfs.md"}'),p={name:"advance/algo/2-search/3-bfs.md"},o=l(`<h2 id="什么是广度优先搜索" tabindex="-1">什么是广度优先搜索？ <a class="header-anchor" href="#什么是广度优先搜索" aria-label="Permalink to &quot;什么是广度优先搜索？&quot;">​</a></h2><blockquote><p>BFS：广度优先搜索的搜索过程有点像一层一层地进行遍历，每层遍历都以上一层遍历的结果作为起点，遍历一个距离能访问到的所有节点。需要注意的是，遍历过的节点不能再次被遍历。</p></blockquote><p>BFS 常常用来<strong>求解无权图的最短路径问题。</strong></p><p>在程序实现 BFS 时需要考虑以下问题：</p><ul><li>队列：用来存储每一轮遍历得到的节点；</li><li>标记：对于遍历过的节点，应该将它标记，防止重复遍历。</li></ul><h2 id="代码框架" tabindex="-1">代码框架 <a class="header-anchor" href="#代码框架" aria-label="Permalink to &quot;代码框架&quot;">​</a></h2><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BFS</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">[][] graph, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> s) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 标记所有节点为未访问状态</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> visited[] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;">[graph.length];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建一个队列来存储需要遍历的节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    LinkedList&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; queue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> LinkedList&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将起始节点加入队列，并标记已访问过</span></span>
<span class="line"><span style="color:#E1E4E8;">    visited[s] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(s);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (queue.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 从队列中取出要访问的节点</span></span>
<span class="line"><span style="color:#E1E4E8;">        s </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> queue.</span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 访问该结点</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// doSomething();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 遍历与该节点相邻且未被访问的节点</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> graph.length; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (graph[s][i] </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">visited[i]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                visited[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                queue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BFS</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;">[][] graph, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> s) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 标记所有节点为未访问状态</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> visited[] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;">[graph.length];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建一个队列来存储需要遍历的节点</span></span>
<span class="line"><span style="color:#24292E;">    LinkedList&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; queue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> LinkedList&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将起始节点加入队列，并标记已访问过</span></span>
<span class="line"><span style="color:#24292E;">    visited[s] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    queue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(s);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (queue.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 从队列中取出要访问的节点</span></span>
<span class="line"><span style="color:#24292E;">        s </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> queue.</span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 访问该结点</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// doSomething();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 遍历与该节点相邻且未被访问的节点</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> graph.length; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (graph[s][i] </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">visited[i]) {</span></span>
<span class="line"><span style="color:#24292E;">                visited[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                queue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(i);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div>`,7),e=[o];function c(r,t,E,y,i,b){return n(),a("div",null,e)}const F=s(p,[["render",c]]);export{d as __pageData,F as default};