import{_ as s,W as n,X as a,Y as e,Z as t,a1 as p}from"./framework-ea95e8eb.js";const o={},l=t("p",null,"本文主要介绍 CSS 发展、CSS 模块化定义和 CSS 模块化的实现方式",-1),i=p(`<blockquote><p>原文链接：https://juejin.cn/post/6844904034281734151</p></blockquote><h2 id="css-发展" tabindex="-1"><a class="header-anchor" href="#css-发展" aria-hidden="true">#</a> CSS 发展</h2><p>我们在书写 css 的时候其实经历了以下几个阶段：</p><ul><li>手写源生 CSS</li><li>使用预处理器 Sass/Less</li><li>使用后处理器 PostCSS</li><li>使用 css modules</li><li>使用 css in js</li></ul><h3 id="手写源生-css" tabindex="-1"><a class="header-anchor" href="#手写源生-css" aria-hidden="true">#</a> 手写源生 CSS</h3><p>在我们最初学习写页面的时候，大家都学过怎么去写 css，也就以下几种情况：</p><ul><li>行内样式，即直接在 html 中的 <code>style</code> 属性里编写 css 代码。</li><li>内嵌样式，即在 html 中的 <code>style</code> 标签内编写 class，提供给当前页面使用。</li><li>导入样式，即在内联样式中 通过 <code>@import</code> 方法，导入其他样式，提供给当前页面使用。</li><li>外部样式，即使用 html 中的 <code>link</code> 标签，加载样式，提供给当前页面使用。</li></ul><p>我们在不断摸索中，逐渐形成了以编写<strong>内嵌样式</strong>和<strong>外部样式</strong>为主要的编写习惯。</p><p>读到这里大家肯定有所疑问，为什么不建议使用行内样式？</p><blockquote><p>使用行内样式的缺点</p><ul><li>样式不能复用。</li><li>样式权重太高，样式不好覆盖。</li><li>表现层与结构层没有分离。</li><li>不能进行缓存，影响加载效率。</li></ul></blockquote><p>然后我们继续剖析一下，为什么不建议使用导入样式？</p><p>经测试，在 css 中使用 <code>@import</code> 会有以下两种情况：</p><p>1、在 IE6-8 下，<code>@import</code> 声明指向的样式表并不会与页面其他资源并发加载，而是等页面所有资源加载完成后才开始下载。</p><p>2、如果在 link 标签中去 <code>@import</code> 其他 css，页面会等到所有资源加载完成后，才开始解析 link 标签中 <code>@import</code> 的 css。</p><blockquote><p>使用导入样式的缺点</p><ul><li>导入样式，只能放在 style 标签的第一行，放其他行则会无效。</li><li>@import 声明的样式表不能充分利用浏览器并发请求资源的行为，其加载行为往往会延后触发或被其他资源加载挂起。</li><li>由于 @import 样式表的延后加载，可能会导致页面样式闪烁。</li></ul></blockquote><h3 id="使用预处理器-sass-less" tabindex="-1"><a class="header-anchor" href="#使用预处理器-sass-less" aria-hidden="true">#</a> 使用预处理器 Sass/Less</h3><p>随着时间的不断发展，我们逐渐发现，编写源生的 css 其实并不友好，例如：源生的 css 不支持变量，不支持嵌套，不支持父选择器等等，这些种种问题，催生出了像 sass/less 这样的预处理器。</p><p>预处理器主要是强化了 css 的语法，弥补了上文说了这些问题，但本质上，打包出来的结果和源生的 css 都是一样的，只是对开发者友好，写起来更顺滑。</p><h3 id="后处理器-postcss" tabindex="-1"><a class="header-anchor" href="#后处理器-postcss" aria-hidden="true">#</a> 后处理器 PostCSS</h3><p>随着前端工程化的不断发展，越来越多的工具被前端大佬们开发出来，愿景是把所有的重复性的工作都交给机器去做，在 css 领域就产生了 postcss。</p><p>postcss 可以称作为 css 界的 babel，它的实现原理是通过 ast 去分析我们的 css 代码，然后将分析的结果进行处理，从而衍生出了许多种处理 css 的使用场景。</p><p>常用的 postcss 使用场景有：</p><ul><li>配合 stylelint 校验 css 语法</li><li>自动增加浏览器前缀 autoprefixer</li><li>编译 css next 的语法</li></ul><h3 id="css-模块化迅速发展" tabindex="-1"><a class="header-anchor" href="#css-模块化迅速发展" aria-hidden="true">#</a> CSS 模块化迅速发展</h3><p>随着 react、vue 等基于模块化的框架的普及使用，我们编写源生 css 的机会也越来越少。我们常常将页面拆分成许多个小组件，然后像搭积木一样将多个小组件组成最终呈现的页面。</p><p>但是我们知道，css 是根据类名去匹配元素的，如果有两个组件使用了一个相同的类名，后者就会把前者的样式给覆盖掉，看来解决样式命名的冲突是个大问题。</p><p>为了解决这个问题，产生出了 CSS 模块化的概念。</p><h2 id="css-模块化定义" tabindex="-1"><a class="header-anchor" href="#css-模块化定义" aria-hidden="true">#</a> CSS 模块化定义</h2><ul><li>你是否为 class 命名而感到苦恼？</li><li>你是否有怕跟别人使用同样 class 名而感到担忧？</li><li>你是否因层级结构不清晰而感到烦躁？</li><li>你是否因代码难以复用而感到不爽？</li><li>你是否因为 common.css 的庞大而感到恐惧？</li></ul><p>你如果遇到如上问题，那么就很有必要使用 css 模块化。</p><h2 id="css-模块化的实现方式" tabindex="-1"><a class="header-anchor" href="#css-模块化的实现方式" aria-hidden="true">#</a> CSS 模块化的实现方式</h2><h3 id="bem-命名规范" tabindex="-1"><a class="header-anchor" href="#bem-命名规范" aria-hidden="true">#</a> BEM 命名规范</h3><p>BEM 的意思就是块（block）、元素（element）、修饰符（modifier）。是由 Yandex 团队提出的一种前端命名方法论。这种巧妙的命名方法让你的 css 类对其他开发者来说更加透明而且更有意义。</p><p>BEM 的命名规范如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 块即是通常所说的 Web 应用开发中的组件或模块。每个块在逻辑上和功能上都是相互独立的。 */</span>
<span class="token punctuation">.</span>block <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 元素是块中的组成部分。元素不能离开块来使用。BEM 不推荐在元素中嵌套其他元素。 */</span>
<span class="token punctuation">.</span>block__element <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 修饰符用来定义块或元素的外观和行为。同样的块在应用不同的修饰符之后，会有不同的外观 */</span>
<span class="token punctuation">.</span>block<span class="token operator">--</span>modifier <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 bem 的命名方式，可以让我们的 css 代码层次结构清晰，通过严格的命名也可以解决命名冲突的问题，但也不能完全避免，毕竟只是一个命名约束，不按规范写照样能运行。</p><h3 id="css-modules" tabindex="-1"><a class="header-anchor" href="#css-modules" aria-hidden="true">#</a> CSS Modules</h3><p>CSS Modules 指的是我们像 import js 一样去引入我们的 css 代码，代码中的每一个类名都是引入对象的一个属性，通过这种方式，即可在使用时明确指定所引用的 css 样式。</p><p>并且 CSS Modules 在打包的时候会自动将类名转换成 hash 值，完全杜绝 css 类名冲突的问题。</p><p>使用方式如下：</p><p>1、定义 css 文件。</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.className</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 编写全局样式 */</span>
<span class="token selector">:global(.className)</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 样式复用 */</span>
<span class="token selector">.otherClassName</span> <span class="token punctuation">{</span>
  <span class="token property">composes</span><span class="token punctuation">:</span> className<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.otherClassName</span> <span class="token punctuation">{</span>
  <span class="token property">composes</span><span class="token punctuation">:</span> className from <span class="token string">&quot;./style.css&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、在 js 模块中导入 css 文件。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">&quot;./style.css&quot;</span><span class="token punctuation">;</span>

element<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;&lt;div class=&quot;&#39;</span> <span class="token operator">+</span> styles<span class="token punctuation">.</span>className <span class="token operator">+</span> <span class="token string">&#39;&quot;&gt;&#39;</span><span class="token punctuation">;</span>
</code></pre></div><p>3、配置 css-loader 打包。</p><p>CSS Modules 不能直接使用，而是需要进行打包，一般通过配置 css-loader 中的 modules 属性即可完成 css modules 的配置。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token comment">// 自定义 hash 名称</span>
              <span class="token literal-property property">localIdentName</span><span class="token operator">:</span> <span class="token string">&#39;[path][name]__[local]--[hash:base64:5]&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、最终打包出来的 css 类名就是由一长串 hash 值生成。</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">._2DHwuiHWMnKTOYG45T0x34</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">._10B-buq6_BEOTOl9urIjf8</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="css-in-js" tabindex="-1"><a class="header-anchor" href="#css-in-js" aria-hidden="true">#</a> CSS In JS</h3><p>CSS in JS，意思就是使用 js 语言写 css，完全不需要些单独的 css 文件，所有的 css 代码全部放在组件内部，以实现 css 的模块化。</p><p>CSS in JS 其实是一种编写思想，目前已经有超过 40 多种方案的实现，最出名的是 styled-components。</p><p>使用方式如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&quot;styled-components&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 创建一个带样式的 h1 标签</span>
<span class="token keyword">const</span> Title <span class="token operator">=</span> styled<span class="token punctuation">.</span>h1<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token comment">// 创建一个带样式的 section 标签</span>
<span class="token keyword">const</span> Wrapper <span class="token operator">=</span> styled<span class="token punctuation">.</span>section<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  padding: 4em;
  background: papayawhip;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token comment">// 通过属性动态定义样式</span>
<span class="token keyword">const</span> Button <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  background: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token parameter">props</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>props<span class="token punctuation">.</span>primary <span class="token operator">?</span> <span class="token string">&quot;palevioletred&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;white&quot;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
  color: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token parameter">props</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>props<span class="token punctuation">.</span>primary <span class="token operator">?</span> <span class="token string">&quot;white&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;palevioletred&quot;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token comment">// 样式复用</span>
<span class="token keyword">const</span> TomatoButton <span class="token operator">=</span> <span class="token function">styled</span><span class="token punctuation">(</span>Button<span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: tomato;
  border-color: tomato;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token operator">&lt;</span>Wrapper<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>Title<span class="token operator">&gt;</span>Hello World<span class="token punctuation">,</span> <span class="token keyword">this</span> is my first styled component<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>Title<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>Button primary<span class="token operator">&gt;</span>Primary<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Wrapper<span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，我们直接在 js 中编写 css，案例中在定义源生 html 时就创建好了样式，在使用的时候就可以渲染出带样式的组件了。</p><p>除此之外，还有其他比较出名的库：</p><ul><li>emotion</li><li>radium</li><li>glamorous</li></ul><p><strong>CSS 模块化和 CSS in jS 的对比</strong>：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/30/16f5477372d2bee3~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt="CSS 模块化和 CSS in jS 的对比" loading="lazy"></p>`,59);function c(r,u){return n(),a("div",null,[l,e(" more "),i])}const k=s(o,[["render",c],["__file","2.1-css-intro.html.vue"]]);export{k as default};
