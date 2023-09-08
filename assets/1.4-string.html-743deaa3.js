import{_ as o,W as c,X as l,Z as n,$ as a,a0 as s,a1 as i,C as p}from"./framework-ea95e8eb.js";const u={},r=i(`<h2 id="字符串概述" tabindex="-1"><a class="header-anchor" href="#字符串概述" aria-hidden="true">#</a> 字符串概述</h2><p>字符串是若干字符组成的有限序列，也可以理解为是一个字符数组，但是很多语言对字符串做了特殊的规定。</p><p>Java 中的字符串通过 final 类 String 实现，底层是 char 数组。</p><p>更多关于 Java String 的内容，可以参考 <a href="/java/basic/string">Java String 详解</a>。</p><h2 id="常用算法解法" tabindex="-1"><a class="header-anchor" href="#常用算法解法" aria-hidden="true">#</a> 常用算法解法</h2><ol><li>双指针法</li><li>反转字符串</li><li>KMP 匹配算法</li></ol><h2 id="字符串匹配之-kmp-算法" tabindex="-1"><a class="header-anchor" href="#字符串匹配之-kmp-算法" aria-hidden="true">#</a> 字符串匹配之 KMP 算法</h2><blockquote><p>使用子串与主串匹配，匹配失败就退回这一趟最开始匹配的主串位的下一位继续匹配，需要的时间复杂度是 O(m * n)，m 为子串长度，n 为主串长度。 使用 KMP 算法，可以将复杂度减少到 O(m+n)，</p></blockquote><p>KMP 主要应用在字符串匹配上，KMP 的主要思想是<strong>当出现字符串不匹配时，可以知道一部分之前已经匹配的文本内容，可以利用这些信息避免从头再去做匹配了。</strong></p><p>KMP 由三位学者发明的：Knuth，Morris 和 Pratt，所以取了三位学者名字的首字母。所以叫做 KMP。</p><p>KMP 算法的核心，在于如何计算出《部分匹配表》（Partial Match Table），也叫<strong>前缀表（PMT）</strong>。</p><h3 id="部分匹配表-前缀表" tabindex="-1"><a class="header-anchor" href="#部分匹配表-前缀表" aria-hidden="true">#</a> <strong>部分匹配表（前缀表）</strong></h3><p>那么什么是前缀表：<strong>记录下标 i 之前（包括 i）的字符串中，有多大长度的相同前缀后缀。</strong>。</p><p><strong>前缀表是用来回退的，它记录了模式串与主串 (文本串) 不匹配的时候，模式串应该从哪里开始重新匹配。</strong></p><p><strong>前后缀：</strong></p><ul><li>前缀是指<strong>不包含最后一个字符的所有以第一个字符开头的连续子串。</strong></li><li>后缀是指<strong>不包含第一个字符的所有以最后一个字符结尾的连续子串。</strong></li></ul><p>例如，对于 aba，它的前缀集合为{a, ab}，后缀 集合为{ba, a}。两个集合的交集为{a}，那么长度最长的元素就是字符串 a 了，长 度为 1，所以对于 aba 而言，它在 PMT 表中对应的值就是 1。</p><p>再比如，对于字符串 ababa，它的前缀集合为{a, ab, aba, abab}，它的后缀集合为{baba, aba, ba, a}，两个集合的交集为{a, aba}，其中最长的元素为 aba，长度为 3。</p><p>对于字符串 abababca，它的 PMT 如下表所示：</p><p><img src="https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/advance/pmt_demo.jpg" alt="前缀表示例" loading="lazy"></p><p><strong>PMT 中的值是字符串的前缀集合与后缀集合的交集中最长元素的长度。</strong></p><p>在实际应用中，通常会使用被称之为 <strong>next</strong> 的一个<strong>数组</strong>表示 PMT。</p><h3 id="求解-next-数组" tabindex="-1"><a class="header-anchor" href="#求解-next-数组" aria-hidden="true">#</a> 求解 next 数组</h3><p>那么我们怎么在知道<strong>主串</strong>和<strong>模式串</strong>的情况下，如何通过代码得到这个 next 数组呢？</p><p>求解 next 数组可以分成如下几个步骤：</p><ol><li>初始化数组，数组第一个元素总是为 0（因为长度为 1 的字符串没有前缀和后缀）；</li><li>使用两个指针： <ul><li>i 表示后缀末尾位置；</li><li>j 表示前缀末尾位置，同时也是最长相等前后缀的长度。</li></ul></li><li>遍历模式字符串，判断当前的前后缀的末尾元素是否相等； <ul><li>如果不匹配，则子串下标移动到前一位的最长前后缀相等长度；</li><li>如果匹配，匹配的子串长度加一，并更新 next 数组的值；</li></ul></li></ol><p>实现代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 求原始前缀表</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getNext</span><span class="token punctuation">(</span><span class="token class-name">String</span> pattern<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>pattern <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> pattern<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> i<span class="token punctuation">;</span>              <span class="token comment">// 后缀末尾位置</span>
    <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>          <span class="token comment">// 前缀末尾位置，同时也是最长相等前后缀长度</span>
    next<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">// 遍历子串长度</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> pattern<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果不匹配，则子串下标移动到前一位的最长前后缀相等长度</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>j <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> pattern<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">!=</span> pattern<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            j <span class="token operator">=</span> next<span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>                    
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>pattern<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">==</span> pattern<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            j<span class="token operator">++</span><span class="token punctuation">;</span>                    <span class="token comment">// 匹配的子串长度加一</span>
            next<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> j<span class="token punctuation">;</span>            <span class="token comment">// 更新 next 数组的值</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-next-数组进行模式匹配" tabindex="-1"><a class="header-anchor" href="#使用-next-数组进行模式匹配" aria-hidden="true">#</a> 使用 next 数组进行模式匹配</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">strStr</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token class-name">String</span> pattern<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> m <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>m<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">getNext</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> next<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> text<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>j <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> text<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">!=</span> pattern<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            j <span class="token operator">=</span> next<span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>text<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">==</span> pattern<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            j<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 如果全部都匹配了</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">==</span> m<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> i <span class="token operator">-</span> m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,31),k={href:"https://zhuanlan.zhihu.com/p/83334559",target:"_blank",rel:"noopener noreferrer"},d={href:"https://www.zhihu.com/question/21923021/answer/281346746",target:"_blank",rel:"noopener noreferrer"};function m(v,b){const t=p("ExternalLinkIcon"),e=p("Badge");return c(),l("div",null,[r,n("ul",null,[n("li",null,[n("a",k,[a("KMP 算法详解"),s(t)]),a(),s(e,{text:"强烈推荐",type:"tip"})]),n("li",null,[n("a",d,[a("如何更好地理解和掌握 KMP 算法？"),s(t)])])])])}const g=o(u,[["render",m],["__file","1.4-string.html.vue"]]);export{g as default};