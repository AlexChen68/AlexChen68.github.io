import{_ as e,o as a,c as s,Q as n}from"./chunks/framework.419948d5.js";const b=JSON.parse('{"title":"算法概述","description":"","frontmatter":{"title":"算法概述","date":"2022-09-27T00:00:00.000Z","order":-1},"headers":[],"relativePath":"advance/algo/index.md","filePath":"advance/algo/index.md","lastUpdated":1698482261000}'),l={name:"advance/algo/index.md"},i=n('<h1 id="时间复杂度和空间复杂度" tabindex="-1">时间复杂度和空间复杂度 <a class="header-anchor" href="#时间复杂度和空间复杂度" aria-label="Permalink to &quot;时间复杂度和空间复杂度&quot;">​</a></h1><h2 id="时间复杂度" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h2><p>在计算机科学中，算法的时间复杂度（Time complexity）是一个函数，它定性描述该算法的运行时间。这是一个代表算法输入值的字符串的长度的函数。时间复杂度常用大 O 符号表述，不包括这个函数的低阶项和首项系数。</p><p>这里的大 O 用来表示<strong>上界</strong>的，当用它作为算法的最坏情况运行时间的上界，就是对任意数据输入的运行时间的上界。但是我们依然说快速排序是 O(nlogn) 的时间复杂度，这个就是业内的一个默认规定，这里说的 O 代表的就是<strong>一般情况</strong>，而不是严格的上界。</p><p><img src="https://code-thinking-1253855093.file.myqcloud.com/pics/20200728185745611-20230310123844306.png" alt="Alt"></p><p>常见的时间复杂度：</p><ul><li>常数阶 O(1)</li><li>对数阶 O(logN)</li><li>线性阶 O(n)</li><li>线性对数阶 O(nlogN)</li><li>平方阶 O(n²)</li><li>立方阶 O(n³)</li><li>K 次方阶 O(n^k)</li><li>指数阶 O(2^n)</li></ul><p>有时候我们去计算时间复杂度的时候发现不是一个简单的 O(n) 或者 O(n^2)，而是一个复杂的表达式，例如：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">O(2*n^2 + 10*n + 1000)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">O(2*n^2 + 10*n + 1000)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>那这里如何描述这个算法的时间复杂度呢，一种方法就是简化法。</p><p>去掉运行时间中的加法常数项（因为常数项并不会因为 n 的增大而增加计算机的操作次数）。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">O(2*n^2 + 10*n)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">O(2*n^2 + 10*n)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>去掉常数系数</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">O(n^2 + n)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">O(n^2 + n)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>只保留保留最高项，去掉数量级小一级的 n（因为 n^2 的数据规模远大于 n），最终简化为：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">O(n^2)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">O(n^2)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果这一步理解有困难，那也可以做提取 n 的操作，变成 O(n(n+1)) ，省略加法常数项后也就别变成了：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">O(n^2)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">O(n^2)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>所以最后我们说：这个算法的算法时间复杂度是 O(n^2) 。</p><h2 id="空间复杂度" tabindex="-1">空间复杂度 <a class="header-anchor" href="#空间复杂度" aria-label="Permalink to &quot;空间复杂度&quot;">​</a></h2><blockquote><p>在计算机科学中，一个算法或程序的空间复杂度定性地描述该算法或程序运行所需要的存储空间大小。空间复杂度是相应计算问题的输入值的长度的函数，它表示一个算法完全执行所需要的存储空间大小。</p></blockquote><p>常见的空间复杂度：</p><ul><li><p>常数阶 O(1)</p></li><li><p>线性阶 O(n)</p></li><li><p>平方阶 O(n²)</p></li></ul><div class="tip custom-block"><p class="custom-block-title">推荐</p><p>一个动画演示算法的网站：<a href="https://www.cs.usfca.edu/~galles/visualization/Algorithms.html" target="_blank" rel="noreferrer">https://www.cs.usfca.edu/~galles/visualization/Algorithms.html</a></p></div><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://www.programmercarl.com/%E5%89%8D%E5%BA%8F/%E5%85%B3%E4%BA%8E%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%EF%BC%8C%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84%E9%83%BD%E5%9C%A8%E8%BF%99%E9%87%8C%EF%BC%81.html" target="_blank" rel="noreferrer">关于时间复杂度，你不知道的都在这里！</a></li></ul>',26),p=[i];function t(o,r,c,d,h,u){return a(),s("div",null,p)}const m=e(l,[["render",t]]);export{b as __pageData,m as default};