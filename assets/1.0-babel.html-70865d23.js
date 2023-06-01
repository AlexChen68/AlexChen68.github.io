import{_ as t,W as o,X as c,Z as n,$ as a,a0 as e,a1 as p,C as l}from"./framework-ea95e8eb.js";const i={},u=p(`<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>ES6 的某些高级语法在浏览器环境甚至是 Node.js 环境中无法执行。</p><p>Babel 是一个广泛使用的转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行执行。</p><p>这意味着，你可以现在就用 ES6 编写程序，而不用担心现有环境是否支持。下面是一个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 转码前</span>
input<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 转码后</span>
input<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> item <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的原始代码用了箭头函数，Babel 将其转为普通函数，就能在不支持箭头函数的 JavaScript 环境执行了。</p>`,6),r={href:"https://babel.docschina.org/docs/en/",target:"_blank",rel:"noopener noreferrer"},d=p(`<h2 id="安装-babel" tabindex="-1"><a class="header-anchor" href="#安装-babel" aria-hidden="true">#</a> 安装 babel</h2><blockquote><p>Babel 官方文档推荐使用如下方式安装：</p></blockquote><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev @babel/core @babel/cli @babel/preset-env
</code></pre></div><p>其中，<code>@babel/core</code> 为 Babel 核心包；<code>@babel/cli</code> 为命令行工具；<code>@babel/preset-env</code> 是一系列插件的集合，包含了我们在 babel6 中常用的 es2015,es2016, es2017 等最新的语法转化插件，允许我们使用最新的 js 语法。</p><p>查看是否安装成功</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>babel <span class="token parameter variable">--version</span>
</code></pre></div><h2 id="babel-配置" tabindex="-1"><a class="header-anchor" href="#babel-配置" aria-hidden="true">#</a> Babel 配置</h2><blockquote><p>Babel 的配置文件是.babelrc，存放在项目的根目录下，该文件用来设置转码规则和插件，基本格式如下。</p></blockquote><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>presets</code> 字段设定转码规则，例如：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
      <span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;targets&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;edge&quot;</span><span class="token operator">:</span> <span class="token string">&quot;17&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;firefox&quot;</span><span class="token operator">:</span> <span class="token string">&quot;60&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;chrome&quot;</span><span class="token operator">:</span> <span class="token string">&quot;67&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;safari&quot;</span><span class="token operator">:</span> <span class="token string">&quot;11.1&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;useBuiltIns&quot;</span><span class="token operator">:</span> <span class="token string">&quot;usage&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;corejs&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3.6.5&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),k={href:"https://babel.docschina.org/docs/en/babel-preset-env/",target:"_blank",rel:"noopener noreferrer"},b=p(`<h2 id="使用命令转码" tabindex="-1"><a class="header-anchor" href="#使用命令转码" aria-hidden="true">#</a> 使用命令转码</h2><p>我们先准备一个使用 ES6 语法编写的 JS 文件，命名为 <code>demo.js</code>：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> input <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
input <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>
</code></pre></div><p>我们在命令行使用如下命令，将 js 文件进行转码：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>babel <span class="token punctuation">[</span>src<span class="token punctuation">]</span> <span class="token parameter variable">-o</span> <span class="token punctuation">[</span>compiled<span class="token punctuation">]</span>
</code></pre></div><p>例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>// 未全局安装 babel-cli
.<span class="token punctuation">\\</span>node_modules<span class="token punctuation">\\</span>.bin<span class="token punctuation">\\</span>babel .<span class="token punctuation">\\</span>babel<span class="token punctuation">\\</span>demo.js <span class="token parameter variable">-o</span> .<span class="token punctuation">\\</span>babel<span class="token punctuation">\\</span>compiled.js

// 如果全局安装了 babel-cli
babel .<span class="token punctuation">\\</span>babel<span class="token punctuation">\\</span>demo.js <span class="token parameter variable">-o</span> .<span class="token punctuation">\\</span>babel<span class="token punctuation">\\</span>compiled.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转码后的 <code>compiled.js</code> 文件：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token string">&quot;use strict&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> input <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
input <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，我们也可以对整个文件夹的文件进行转码：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>babel <span class="token punctuation">[</span>dir<span class="token punctuation">]</span> <span class="token parameter variable">-d</span> <span class="token punctuation">[</span>compiledDir<span class="token punctuation">]</span>
</code></pre></div><h2 id="自定义脚本" tabindex="-1"><a class="header-anchor" href="#自定义脚本" aria-hidden="true">#</a> 自定义脚本</h2><p>在实际开发中，如果我们每次都敲这么长的命令肯定很麻烦，所以我们可以自定义脚本的方式，将这个命令保存起来，直接用 <code>npm run xxx</code> 的方式执行就可以。</p><p>自定义脚本需要在 <code>package.json</code> 中添加，例如，上述的案例可以写成：</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;babel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;.\\\\node_modules\\\\.bin\\\\babel .\\\\babel\\\\demo.js -o .\\\\babel\\\\compiled.js&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre></div><p>或者直接转码整个文件夹：</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;babel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;.\\\\node_modules\\\\.bin\\\\babel .\\\\babel -d .\\\\babel\\\\compiled&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre></div><p>使用的时候，只需要执行 <code>npm run babel</code> 即可。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,19),v={href:"https://babel.docschina.org/docs/en/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://zhuanlan.zhihu.com/p/576231528",target:"_blank",rel:"noopener noreferrer"};function h(g,q){const s=l("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[a("更多 Babel 转换器的使用，见其 "),n("a",r,[a("官方文档"),e(s)])]),d,n("p",null,[a("更多设置可以看 "),n("a",k,[a("官方文档 - @babel/preset-env"),e(s)])]),b,n("ul",null,[n("li",null,[n("a",v,[a("babel 中文文档"),e(s)])]),n("li",null,[n("a",m,[a("babel 入门学习"),e(s)])])])])}const j=t(i,[["render",h],["__file","1.0-babel.html.vue"]]);export{j as default};