import{_ as l,o as e,c as p,Q as a,k as s,a as n}from"./chunks/framework.419948d5.js";const D=JSON.parse('{"title":"Markdown","description":"","frontmatter":{"title":"Markdown","icon":"markdown","tag":"Markdown","date":"2022-12-29T00:00:00.000Z"},"headers":[],"relativePath":"devops/tool/5-markdown.md","filePath":"devops/tool/5-markdown.md","lastUpdated":1697769685000}'),o={name:"devops/tool/5-markdown.md"},r=a('<blockquote><p>本文章转载自 <a href="https://jhildenbiddle.github.io/docsify-themeable/#/markdown" target="_blank" rel="noreferrer">docsify-themeable</a>。</p></blockquote><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。</p><p>Markdown 编写的文档后缀为 .md, .markdown。</p><p>当前许多网站都广泛使用 Markdown 来撰写帮助文档或是用于论坛上发表消息。例如：GitHub、简书、reddit、Diaspora、Stack Exchange、OpenStreetMap、SourceForge 等。</p><p>其主要特性：</p><ul><li>支持“标准”Markdown / CommonMark 和 Github 风格的语法，也可变身为代码编辑器；</li><li>支持实时预览、图片（跨域）上传、预格式文本/代码/表格插入、代码折叠、搜索替换、只读模式、自定义样式主题和多语言语法高亮等功能；</li><li>支持 ToC（Table of Contents）、Emoji 表情、Task lists、@链接等 Markdown 扩展语法；</li><li>支持 TeX 科学公式（基于 KaTeX）、流程图 Flowchart 和 时序图 Sequence Diagram;</li><li>支持识别和解析 HTML 标签，并且支持自定义过滤标签解析，具有可靠的安全性和几乎无限的扩展性；</li><li>支持 AMD / CMD 模块化加载（支持 Require.js &amp; Sea.js），并且支持自定义扩展插件；</li><li>兼容主流的浏览器（IE8+）和 Zepto.js，且支持 iPad 等平板设备；</li><li>支持自定义主题样式；</li></ul><h2 id="常用语法" tabindex="-1">常用语法 <a class="header-anchor" href="#常用语法" aria-label="Permalink to &quot;常用语法&quot;">​</a></h2><h3 id="标题" tabindex="-1">标题 <a class="header-anchor" href="#标题" aria-label="Permalink to &quot;标题&quot;">​</a></h3><h4 id="rendered" tabindex="-1"><strong>Rendered</strong> <a class="header-anchor" href="#rendered" aria-label="Permalink to &quot;**Rendered**&quot;">​</a></h4>',10),t=s("h1",{"docsify-ignore":"",id:"heading-1",tabindex:"-1"},[n("Heading 1 "),s("a",{class:"header-anchor",href:"#heading-1","aria-label":'Permalink to "Heading 1 {docsify-ignore}"'},"​")],-1),c=s("p",null,"text...",-1),i=s("h2",{"docsify-ignore":"",id:"heading-2",tabindex:"-1"},[n("Heading 2 "),s("a",{class:"header-anchor",href:"#heading-2","aria-label":'Permalink to "Heading 2 {docsify-ignore}"'},"​")],-1),d=s("p",null,"This is the text under the title.",-1),b=s("h3",{"docsify-ignore":"",id:"heading-3",tabindex:"-1"},[n("Heading 3 "),s("a",{class:"header-anchor",href:"#heading-3","aria-label":'Permalink to "Heading 3 {docsify-ignore}"'},"​")],-1),E=s("p",null,"text...",-1),y=s("h4",{"docsify-ignore":"",id:"heading-4",tabindex:"-1"},[n("Heading 4 "),s("a",{class:"header-anchor",href:"#heading-4","aria-label":'Permalink to "Heading 4 {docsify-ignore}"'},"​")],-1),u=s("p",null,"text...",-1),h=s("h5",{"docsify-ignore":"",id:"heading-5",tabindex:"-1"},[n("Heading 5 "),s("a",{class:"header-anchor",href:"#heading-5","aria-label":'Permalink to "Heading 5 {docsify-ignore}"'},"​")],-1),m=s("p",null,"text...",-1),g=s("h6",{"docsify-ignore":"",id:"heading-6",tabindex:"-1"},[n("Heading 6 "),s("a",{class:"header-anchor",href:"#heading-6","aria-label":'Permalink to "Heading 6 {docsify-ignore}"'},"​")],-1),k=a(`<p>text...</p><h4 id="markdown" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;font-weight:bold;"># Heading 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">text...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">## Heading 2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">text...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">### Heading 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">text...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">#### Heading 4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">text...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">##### Heading 5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">text...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">###### Heading 6</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">text...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;font-weight:bold;"># Heading 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">text...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">## Heading 2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">text...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">### Heading 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">text...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">#### Heading 4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">text...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">##### Heading 5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">text...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">###### Heading 6</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">text...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="文本" tabindex="-1">文本 <a class="header-anchor" href="#文本" aria-label="Permalink to &quot;文本&quot;">​</a></h3><h4 id="rendered-1" tabindex="-1"><strong>Rendered</strong> <a class="header-anchor" href="#rendered-1" aria-label="Permalink to &quot;**Rendered**&quot;">​</a></h4><p>Body text</p><p><strong>Bold text</strong></p><p><em>Italic text</em></p><p><s>Strikethrough</s></p><p><mark>Marked text</mark></p><pre>Preformatted text</pre><p><small>Small Text</small></p><p>This is <sub>subscript</sub></p><p>This is <sup>superscript</sup></p><h4 id="markdown-1" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown-1" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Body text</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;font-weight:bold;">**Bold text**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;font-style:italic;">*Italic text*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">~~Strikethrough~~</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;mark&gt;Marked text&lt;/mark&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;pre&gt;Preformatted text&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;small&gt;Small Text&lt;/small&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">This is &lt;sub&gt;subscript&lt;/sub&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">This is &lt;sup&gt;superscript&lt;/sup&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Body text</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;font-weight:bold;">**Bold text**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;font-style:italic;">*Italic text*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">~~Strikethrough~~</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;mark&gt;Marked text&lt;/mark&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;pre&gt;Preformatted text&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;small&gt;Small Text&lt;/small&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">This is &lt;sub&gt;subscript&lt;/sub&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">This is &lt;sup&gt;superscript&lt;/sup&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="链接" tabindex="-1">链接 <a class="header-anchor" href="#链接" aria-label="Permalink to &quot;链接&quot;">​</a></h3><h4 id="rendered-2" tabindex="-1"><strong>Rendered</strong> <a class="header-anchor" href="#rendered-2" aria-label="Permalink to &quot;**Rendered**&quot;">​</a></h4><p><a href="https://www.baidu.com" target="_blank" rel="noreferrer">https://www.baidu.com</a></p><p><a href="https://baidu.com" target="_blank" rel="noreferrer">Inline link</a></p><p><a href="https://baidu.com" title="百度" target="_blank" rel="noreferrer">Inline link with title</a></p><p><a href="https://baidu1.com" target="_blank" rel="noreferrer">Reference link by name</a></p><p><a href="https://baidu2.com" target="_blank" rel="noreferrer">Reference link by number</a></p><p><a href="https://baidu3.com" target="_blank" rel="noreferrer">Reference link by self</a></p><h4 id="markdown-2" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown-2" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#E1E4E8;text-decoration:underline;">https://www.baidu.com</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#DBEDFF;text-decoration:underline;">Inline link</span><span style="color:#E1E4E8;">](</span><span style="color:#E1E4E8;text-decoration:underline;">https://baidu.com</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#DBEDFF;text-decoration:underline;">Inline link with title</span><span style="color:#E1E4E8;">](</span><span style="color:#E1E4E8;text-decoration:underline;">https://baidu.com</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;text-decoration:underline;">&quot;</span><span style="color:#DBEDFF;text-decoration:underline;">百度</span><span style="color:#9ECBFF;text-decoration:underline;">&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#DBEDFF;text-decoration:underline;">Reference link by name</span><span style="color:#E1E4E8;">][</span><span style="color:#DBEDFF;text-decoration:underline;">link1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#DBEDFF;text-decoration:underline;">Reference link by number</span><span style="color:#E1E4E8;">][</span><span style="color:#DBEDFF;text-decoration:underline;">1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Reference link by self]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#DBEDFF;text-decoration:underline;">link1</span><span style="color:#E1E4E8;">]: </span><span style="color:#E1E4E8;text-decoration:underline;">https://baidu.com</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#DBEDFF;text-decoration:underline;">1</span><span style="color:#E1E4E8;">]: </span><span style="color:#E1E4E8;text-decoration:underline;">https://baidu.com</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#DBEDFF;text-decoration:underline;">Reference link by self</span><span style="color:#E1E4E8;">]: </span><span style="color:#E1E4E8;text-decoration:underline;">https://baidu.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#24292E;text-decoration:underline;">https://www.baidu.com</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;text-decoration:underline;">Inline link</span><span style="color:#24292E;">](</span><span style="color:#24292E;text-decoration:underline;">https://baidu.com</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;text-decoration:underline;">Inline link with title</span><span style="color:#24292E;">](</span><span style="color:#24292E;text-decoration:underline;">https://baidu.com</span><span style="color:#24292E;"> </span><span style="color:#032F62;text-decoration:underline;">&quot;百度&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;text-decoration:underline;">Reference link by name</span><span style="color:#24292E;">][</span><span style="color:#032F62;text-decoration:underline;">link1</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;text-decoration:underline;">Reference link by number</span><span style="color:#24292E;">][</span><span style="color:#032F62;text-decoration:underline;">1</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Reference link by self]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;text-decoration:underline;">link1</span><span style="color:#24292E;">]: </span><span style="color:#24292E;text-decoration:underline;">https://baidu.com</span></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;text-decoration:underline;">1</span><span style="color:#24292E;">]: </span><span style="color:#24292E;text-decoration:underline;">https://baidu.com</span></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;text-decoration:underline;">Reference link by self</span><span style="color:#24292E;">]: </span><span style="color:#24292E;text-decoration:underline;">https://baidu.com</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="列表" tabindex="-1">列表 <a class="header-anchor" href="#列表" aria-label="Permalink to &quot;列表&quot;">​</a></h3><h4 id="rendered-3" tabindex="-1"><strong>Rendered</strong> <a class="header-anchor" href="#rendered-3" aria-label="Permalink to &quot;**Rendered**&quot;">​</a></h4><p><strong>有序列表</strong></p><ol><li>Ordered 1</li><li>Ordered 2 <ol><li>Ordered 2a</li><li>Ordered 2b</li><li>Ordered 2c</li></ol></li><li>Ordered 3</li></ol><p><strong>无序列表</strong></p><ul><li>Unordered 1</li><li>Unordered 2 <ul><li>Unordered 2a</li><li>Unordered 2b</li><li>Unordered 2c</li></ul></li><li>Unordered 3</li></ul><p><strong>任务列表</strong></p><ul><li>[x] Task 1</li><li>[ ] Task 2 <ul><li>[x] Subtask A</li><li>[ ] Subtask B</li></ul></li><li>[ ] Task 3</li></ul><h4 id="markdown-3" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown-3" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;font-weight:bold;">**有序列表**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFAB70;">1.</span><span style="color:#E1E4E8;"> Ordered 1</span></span>
<span class="line"><span style="color:#FFAB70;">1.</span><span style="color:#E1E4E8;"> Ordered 2</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#FFAB70;">1.</span><span style="color:#E1E4E8;"> Ordered 2a</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#FFAB70;">1.</span><span style="color:#E1E4E8;"> Ordered 2b</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#FFAB70;">1.</span><span style="color:#E1E4E8;"> Ordered 2c</span></span>
<span class="line"><span style="color:#FFAB70;">1.</span><span style="color:#E1E4E8;"> Ordered 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;font-weight:bold;">**无序列表**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFAB70;">-</span><span style="color:#E1E4E8;"> Unordered 1</span></span>
<span class="line"><span style="color:#FFAB70;">-</span><span style="color:#E1E4E8;"> Unordered 2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">-</span><span style="color:#E1E4E8;"> Unordered 2a</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">-</span><span style="color:#E1E4E8;"> Unordered 2b</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">-</span><span style="color:#E1E4E8;"> Unordered 2c</span></span>
<span class="line"><span style="color:#FFAB70;">-</span><span style="color:#E1E4E8;"> Unordered 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;font-weight:bold;">**任务列表**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFAB70;">-</span><span style="color:#E1E4E8;"> [</span><span style="color:#DBEDFF;text-decoration:underline;">x</span><span style="color:#E1E4E8;">] Task 1</span></span>
<span class="line"><span style="color:#FFAB70;">-</span><span style="color:#E1E4E8;"> [ ] Task 2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">-</span><span style="color:#E1E4E8;"> [</span><span style="color:#DBEDFF;text-decoration:underline;">x</span><span style="color:#E1E4E8;">] Subtask A</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">-</span><span style="color:#E1E4E8;"> [ ] Subtask B</span></span>
<span class="line"><span style="color:#FFAB70;">-</span><span style="color:#E1E4E8;"> [ ] Task 3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;font-weight:bold;">**有序列表**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E36209;">1.</span><span style="color:#24292E;"> Ordered 1</span></span>
<span class="line"><span style="color:#E36209;">1.</span><span style="color:#24292E;"> Ordered 2</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#E36209;">1.</span><span style="color:#24292E;"> Ordered 2a</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#E36209;">1.</span><span style="color:#24292E;"> Ordered 2b</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#E36209;">1.</span><span style="color:#24292E;"> Ordered 2c</span></span>
<span class="line"><span style="color:#E36209;">1.</span><span style="color:#24292E;"> Ordered 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;font-weight:bold;">**无序列表**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> Unordered 1</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> Unordered 2</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">-</span><span style="color:#24292E;"> Unordered 2a</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">-</span><span style="color:#24292E;"> Unordered 2b</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">-</span><span style="color:#24292E;"> Unordered 2c</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> Unordered 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;font-weight:bold;">**任务列表**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> [</span><span style="color:#032F62;text-decoration:underline;">x</span><span style="color:#24292E;">] Task 1</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> [ ] Task 2</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">-</span><span style="color:#24292E;"> [</span><span style="color:#032F62;text-decoration:underline;">x</span><span style="color:#24292E;">] Subtask A</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">-</span><span style="color:#24292E;"> [ ] Subtask B</span></span>
<span class="line"><span style="color:#E36209;">-</span><span style="color:#24292E;"> [ ] Task 3</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h3><h4 id="rendered-4" tabindex="-1"><strong>Rendered</strong> <a class="header-anchor" href="#rendered-4" aria-label="Permalink to &quot;**Rendered**&quot;">​</a></h4><blockquote><p>This is a quote</p><p><em>- Quote Source</em></p></blockquote><h4 id="markdown-4" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown-4" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">&gt; This is a quote</span></span>
<span class="line"><span style="color:#85E89D;">&gt;</span></span>
<span class="line"><span style="color:#85E89D;">&gt; </span><span style="color:#E1E4E8;font-style:italic;">*- Quote Source*</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">&gt; This is a quote</span></span>
<span class="line"><span style="color:#22863A;">&gt;</span></span>
<span class="line"><span style="color:#22863A;">&gt; </span><span style="color:#24292E;font-style:italic;">*- Quote Source*</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="代码块" tabindex="-1">代码块 <a class="header-anchor" href="#代码块" aria-label="Permalink to &quot;代码块&quot;">​</a></h3><h4 id="rendered-5" tabindex="-1"><strong>Rendered</strong> <a class="header-anchor" href="#rendered-5" aria-label="Permalink to &quot;**Rendered**&quot;">​</a></h4><p>This is <code>inline code</code></p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">num1</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">num2</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> num1 </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> num2;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">total</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(total); </span><span style="color:#6A737D;">// 3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">num1</span><span style="color:#24292E;">, </span><span style="color:#E36209;">num2</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> num1 </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> num2;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">total</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(total); </span><span style="color:#6A737D;">// 3</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;Hello&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;Hello&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="markdown-5" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown-5" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">This is </span><span style="color:#79B8FF;">\`inline code\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">\`\`\`javascript</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">num1</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">num2</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> num1 </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> num2;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">total</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(total); </span><span style="color:#6A737D;">// 3</span></span>
<span class="line"><span style="color:#E1E4E8;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">\`\`\`html</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;Hello&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">\`\`\`</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">This is </span><span style="color:#005CC5;">\`inline code\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">\`\`\`javascript</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">num1</span><span style="color:#24292E;">, </span><span style="color:#E36209;">num2</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> num1 </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> num2;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">total</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(total); </span><span style="color:#6A737D;">// 3</span></span>
<span class="line"><span style="color:#24292E;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">\`\`\`html</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;Hello&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">\`\`\`</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="通知" tabindex="-1">通知 <a class="header-anchor" href="#通知" aria-label="Permalink to &quot;通知&quot;">​</a></h3><h4 id="rendered-6" tabindex="-1"><strong>Rendered</strong> <a class="header-anchor" href="#rendered-6" aria-label="Permalink to &quot;**Rendered**&quot;">​</a></h4><p>!&gt; 这是一段警告通知</p><p>?&gt; 这是一段提示通知</p><h4 id="markdown-6" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown-6" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">!&gt; 这是一段警告通知</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">?&gt; 这是一段提示通知</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">!&gt; 这是一段警告通知</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">?&gt; 这是一段提示通知</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="选项卡" tabindex="-1">选项卡 <a class="header-anchor" href="#选项卡" aria-label="Permalink to &quot;选项卡&quot;">​</a></h3><p>选项卡由插件<a href="https://jhildenbiddle.github.io/docsify-tabs" target="_blank" rel="noreferrer">docsify-tabs</a>提供</p><h4 id="english" tabindex="-1"><strong>English</strong> <a class="header-anchor" href="#english" aria-label="Permalink to &quot;**English**&quot;">​</a></h4><p>Hello!</p><h4 id="french" tabindex="-1"><strong>French</strong> <a class="header-anchor" href="#french" aria-label="Permalink to &quot;**French**&quot;">​</a></h4><p>Bonjour!</p><h4 id="italian" tabindex="-1"><strong>Italian</strong> <a class="header-anchor" href="#italian" aria-label="Permalink to &quot;**Italian**&quot;">​</a></h4><p>Ciao!</p><h4 id="markdown-7" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown-7" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- tabs:start --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">#### </span><span style="color:#E1E4E8;font-weight:bold;">**English**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Hello!</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">#### </span><span style="color:#E1E4E8;font-weight:bold;">**French**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Bonjour!</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">#### </span><span style="color:#E1E4E8;font-weight:bold;">**Italian**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Ciao!</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- tabs:end --&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- tabs:start --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">#### </span><span style="color:#24292E;font-weight:bold;">**English**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Hello!</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">#### </span><span style="color:#24292E;font-weight:bold;">**French**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Bonjour!</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">#### </span><span style="color:#24292E;font-weight:bold;">**Italian**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Ciao!</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- tabs:end --&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="表格" tabindex="-1">表格 <a class="header-anchor" href="#表格" aria-label="Permalink to &quot;表格&quot;">​</a></h3><h4 id="rendered-7" tabindex="-1"><strong>Rendered</strong> <a class="header-anchor" href="#rendered-7" aria-label="Permalink to &quot;**Rendered**&quot;">​</a></h4><table><thead><tr><th>Left Align</th><th style="text-align:center;">Center Align</th><th style="text-align:right;">Right Align</th><th>Non‑Breaking Header</th></tr></thead><tbody><tr><td>A1</td><td style="text-align:center;">A2</td><td style="text-align:right;">A3</td><td>A4</td></tr><tr><td>B1</td><td style="text-align:center;">B2</td><td style="text-align:right;">B3</td><td>B4</td></tr><tr><td>C1</td><td style="text-align:center;">C2</td><td style="text-align:right;">C3</td><td>C4</td></tr></tbody></table><h4 id="markdown-8" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown-8" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">| Left Align | Center Align | Right Align | Non&amp;#8209;Breaking&amp;nbsp;Header |</span></span>
<span class="line"><span style="color:#E1E4E8;">| ---------- |:------------:| -----------:| ------------------------------ |</span></span>
<span class="line"><span style="color:#E1E4E8;">| A1         | A2           | A3          | A4                             |</span></span>
<span class="line"><span style="color:#E1E4E8;">| B1         | B2           | B3          | B4                             |</span></span>
<span class="line"><span style="color:#E1E4E8;">| C1         | C2           | C3          | C4                             |</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">| Left Align | Center Align | Right Align | Non&amp;#8209;Breaking&amp;nbsp;Header |</span></span>
<span class="line"><span style="color:#24292E;">| ---------- |:------------:| -----------:| ------------------------------ |</span></span>
<span class="line"><span style="color:#24292E;">| A1         | A2           | A3          | A4                             |</span></span>
<span class="line"><span style="color:#24292E;">| B1         | B2           | B3          | B4                             |</span></span>
<span class="line"><span style="color:#24292E;">| C1         | C2           | C3          | C4                             |</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="键盘" tabindex="-1">键盘 <a class="header-anchor" href="#键盘" aria-label="Permalink to &quot;键盘&quot;">​</a></h3><h4 id="rendered-8" tabindex="-1"><strong>Rendered</strong> <a class="header-anchor" href="#rendered-8" aria-label="Permalink to &quot;**Rendered**&quot;">​</a></h4><p><kbd>↑</kbd> Arrow Up</p><p><kbd>↓</kbd> Arrow Down</p><p><kbd>←</kbd> Arrow Left</p><p><kbd>→</kbd> Arrow Right</p><p><kbd>⇪</kbd> Caps Lock</p><p><kbd>⌘</kbd> Command</p><p><kbd>⌃</kbd> Control</p><p><kbd>⌫</kbd> Delete</p><p><kbd>⌦</kbd> Delete (Forward)</p><p><kbd>↘</kbd> End</p><p><kbd>⌤</kbd> Enter</p><p><kbd>⎋</kbd> Escape</p><p><kbd>↖</kbd> Home</p><p><kbd>⇞</kbd> Page Up</p><p><kbd>⇟</kbd> Page Down</p><p><kbd>⌥</kbd> Option, Alt</p><p><kbd>↵</kbd> Return</p><p><kbd>⇧</kbd> Shift</p><p><kbd>␣</kbd> Space</p><p><kbd>⇥</kbd> Tab</p><p><kbd>⇤</kbd> Tab + Shift</p><h4 id="markdown-9" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown-9" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;uarr;&lt;/kbd&gt; Arrow Up</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;darr;&lt;/kbd&gt; Arrow Down</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;larr;&lt;/kbd&gt; Arrow Left</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;rarr;&lt;/kbd&gt; Arrow Right</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8682;&lt;/kbd&gt; Caps Lock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8984;&lt;/kbd&gt; Command</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8963;&lt;/kbd&gt; Control</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#9003;&lt;/kbd&gt; Delete</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8998;&lt;/kbd&gt; Delete (Forward)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8600;&lt;/kbd&gt; End</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8996;&lt;/kbd&gt; Enter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#9099;&lt;/kbd&gt; Escape</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8598;&lt;/kbd&gt; Home</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8670;&lt;/kbd&gt; Page Up</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8671;&lt;/kbd&gt; Page Down</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8997;&lt;/kbd&gt; Option, Alt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8629;&lt;/kbd&gt; Return</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8679;&lt;/kbd&gt; Shift</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#9251;&lt;/kbd&gt; Space</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8677;&lt;/kbd&gt; Tab</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;kbd&gt;&amp;#8676;&lt;/kbd&gt; Tab + Shift</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;uarr;&lt;/kbd&gt; Arrow Up</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;darr;&lt;/kbd&gt; Arrow Down</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;larr;&lt;/kbd&gt; Arrow Left</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;rarr;&lt;/kbd&gt; Arrow Right</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8682;&lt;/kbd&gt; Caps Lock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8984;&lt;/kbd&gt; Command</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8963;&lt;/kbd&gt; Control</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#9003;&lt;/kbd&gt; Delete</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8998;&lt;/kbd&gt; Delete (Forward)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8600;&lt;/kbd&gt; End</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8996;&lt;/kbd&gt; Enter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#9099;&lt;/kbd&gt; Escape</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8598;&lt;/kbd&gt; Home</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8670;&lt;/kbd&gt; Page Up</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8671;&lt;/kbd&gt; Page Down</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8997;&lt;/kbd&gt; Option, Alt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8629;&lt;/kbd&gt; Return</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8679;&lt;/kbd&gt; Shift</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#9251;&lt;/kbd&gt; Space</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8677;&lt;/kbd&gt; Tab</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;kbd&gt;&amp;#8676;&lt;/kbd&gt; Tab + Shift</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h3 id="水平分割线" tabindex="-1">水平分割线 <a class="header-anchor" href="#水平分割线" aria-label="Permalink to &quot;水平分割线&quot;">​</a></h3><h4 id="rendered-9" tabindex="-1"><strong>Rendered</strong> <a class="header-anchor" href="#rendered-9" aria-label="Permalink to &quot;**Rendered**&quot;">​</a></h4><hr><h4 id="markdown-10" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown-10" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">---</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">---</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="图片" tabindex="-1">图片 <a class="header-anchor" href="#图片" aria-label="Permalink to &quot;图片&quot;">​</a></h3><h4 id="rendered-10" tabindex="-1"><strong>Rendered</strong> <a class="header-anchor" href="#rendered-10" aria-label="Permalink to &quot;**Rendered**&quot;">​</a></h4><p>Inline-style</p><p><img src="//source.unsplash.com/daily" alt="alt text" title="Provided by unsplash.com"></p><p>Reference-style</p><p><img src="//source.unsplash.com/collection/881815" alt="alt text" title="Provided by unsplash.com"></p><h4 id="markdown-11" tabindex="-1"><strong>Markdown</strong> <a class="header-anchor" href="#markdown-11" aria-label="Permalink to &quot;**Markdown**&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;font-weight:bold;">**Inline**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">![</span><span style="color:#DBEDFF;text-decoration:underline;">alt text</span><span style="color:#E1E4E8;">](</span><span style="color:#E1E4E8;text-decoration:underline;">//source.unsplash.com/daily</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;text-decoration:underline;">&quot;</span><span style="color:#DBEDFF;text-decoration:underline;">Provided by unsplash.com</span><span style="color:#9ECBFF;text-decoration:underline;">&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;font-weight:bold;">**Reference**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">![</span><span style="color:#DBEDFF;text-decoration:underline;">alt text</span><span style="color:#E1E4E8;">][</span><span style="color:#DBEDFF;text-decoration:underline;">logo</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#DBEDFF;text-decoration:underline;">logo</span><span style="color:#E1E4E8;">]: </span><span style="color:#E1E4E8;text-decoration:underline;">//source.unsplash.com/collection/881815</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;text-decoration:underline;">&quot;</span><span style="color:#DBEDFF;text-decoration:underline;">Provided by unsplash.com</span><span style="color:#9ECBFF;text-decoration:underline;">&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;font-weight:bold;">**Inline**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">![</span><span style="color:#032F62;text-decoration:underline;">alt text</span><span style="color:#24292E;">](</span><span style="color:#24292E;text-decoration:underline;">//source.unsplash.com/daily</span><span style="color:#24292E;"> </span><span style="color:#032F62;text-decoration:underline;">&quot;Provided by unsplash.com&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;font-weight:bold;">**Reference**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">![</span><span style="color:#032F62;text-decoration:underline;">alt text</span><span style="color:#24292E;">][</span><span style="color:#032F62;text-decoration:underline;">logo</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;text-decoration:underline;">logo</span><span style="color:#24292E;">]: </span><span style="color:#24292E;text-decoration:underline;">//source.unsplash.com/collection/881815</span><span style="color:#24292E;"> </span><span style="color:#032F62;text-decoration:underline;">&quot;Provided by unsplash.com&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,107),w=[r,t,c,i,d,b,E,y,u,h,m,g,k];function F(x,f,v,C,q,A){return e(),p("div",null,w)}const _=l(o,[["render",F]]);export{D as __pageData,_ as default};
