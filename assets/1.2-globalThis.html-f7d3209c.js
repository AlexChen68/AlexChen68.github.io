import{_ as o,W as t,X as c,Y as n,a0 as s,Z as e,a1 as p,C as l}from"./framework-d3200c61.js";const i={},d={href:"https://es6.ruanyifeng.com/#docs/let#%E9%A1%B6%E5%B1%82%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%B1%9E%E6%80%A7",target:"_blank",rel:"noopener noreferrer"},r=p(`<h2 id="顶层对象" tabindex="-1"><a class="header-anchor" href="#顶层对象" aria-hidden="true">#</a> 顶层对象</h2><p>顶层对象，在浏览器环境指的是<code>window</code>对象，在 Node 指的是<code>global</code>对象。ES5 之中，顶层对象的属性与全局变量是等价的。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>window<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
a <span class="token comment">// 1</span>

a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
window<span class="token punctuation">.</span>a <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，顶层对象的属性赋值与全局变量的赋值，是同一件事。</p><p>ES6 为了改变这一点，一方面规定，为了保持兼容性，<code>var</code>命令和<code>function</code>命令声明的全局变量，依旧是顶层对象的属性；</p><p>另一方面规定，<code>let</code>命令、<code>const</code>命令、<code>class</code>命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">// 如果在 Node 的 REPL 环境，可以写成 global.a</span>
<span class="token comment">// 或者采用通用方法，写成 this.a</span>
window<span class="token punctuation">.</span>a <span class="token comment">// 1</span>

<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
window<span class="token punctuation">.</span>b <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，全局变量<code>a</code>由<code>var</code>命令声明，所以它是顶层对象的属性；全局变量<code>b</code>由<code>let</code>命令声明，所以它不是顶层对象的属性，返回<code>undefined</code>。</p><h2 id="globalthis-对象" tabindex="-1"><a class="header-anchor" href="#globalthis-对象" aria-hidden="true">#</a> globalThis 对象</h2><p>JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。</p><ul><li>浏览器里面，顶层对象是<code>window</code>，但 Node 和 Web Worker 没有<code>window</code>。</li><li>浏览器和 Web Worker 里面，<code>self</code>也指向顶层对象，但是 Node 没有<code>self</code>。</li><li>Node 里面，顶层对象是<code>global</code>，但其他环境都不支持。</li></ul><p>同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用<code>this</code>关键字，但是有局限性。</p><ul><li>全局环境中，<code>this</code>会返回顶层对象。但是，Node.js 模块中<code>this</code>返回的是当前模块，ES6 模块中<code>this</code>返回的是<code>undefined</code>。</li><li>函数里面的<code>this</code>，如果函数不是作为对象的方法运行，而是单纯作为函数运行，<code>this</code>会指向顶层对象。但是，严格模式下，这时<code>this</code>会返回<code>undefined</code>。</li><li>不管是严格模式，还是普通模式，<code>new Function(&#39;return this&#39;)()</code>，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么<code>eval</code>、<code>new Function</code>这些方法都可能无法使用。</li></ul><p>综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 方法一</span>
<span class="token punctuation">(</span><span class="token keyword">typeof</span> window <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span>
   <span class="token operator">?</span> window
   <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> process <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span>
      <span class="token keyword">typeof</span> require <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">&amp;&amp;</span>
      <span class="token keyword">typeof</span> global <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span><span class="token punctuation">)</span>
     <span class="token operator">?</span> global
     <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 方法二</span>
<span class="token keyword">var</span> <span class="token function-variable function">getGlobal</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> self <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> self<span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> window <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> window<span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> global <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> global<span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;unable to locate global object&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),u={href:"https://github.com/tc39/proposal-global",target:"_blank",rel:"noopener noreferrer"},k=n("code",null,"globalThis",-1),v=n("code",null,"globalThis",-1),b=n("code",null,"this",-1),m={href:"https://github.com/ungap/global-this",target:"_blank",rel:"noopener noreferrer"},h=n("code",null,"global-this",-1),g=n("code",null,"globalThis",-1);function w(f,_){const a=l("ExternalLinkIcon");return t(),c("div",null,[n("blockquote",null,[n("p",null,[s("原文出处："),n("a",d,[s("ECMAScript 6 入门"),e(a)])])]),r,n("p",null,[n("a",u,[s("ES2020"),e(a)]),s(" 在语言标准的层面，引入"),k,s("作为顶层对象。也就是说，任何环境下，"),v,s("都是存在的，都可以从它拿到顶层对象，指向全局环境下的"),b,s("。")]),n("p",null,[s("垫片库"),n("a",m,[h,e(a)]),s("模拟了这个提案，可以在所有环境拿到"),g,s("。")])])}const E=o(i,[["render",w],["__file","1.2-globalThis.html.vue"]]);export{E as default};
