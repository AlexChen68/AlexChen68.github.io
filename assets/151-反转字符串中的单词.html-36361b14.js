import{_ as o,W as c,X as l,Y as n,a0 as s,Z as a,a1 as i,C as t}from"./framework-d3200c61.js";const u={},r=n("h2",{id:"题目链接",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#题目链接","aria-hidden":"true"},"#"),s(" 题目链接")],-1),k={href:"https://leetcode.cn/problems/reverse-words-in-a-string/",target:"_blank",rel:"noopener noreferrer"},d={id:"题目描述",tabindex:"-1"},v=n("a",{class:"header-anchor",href:"#题目描述","aria-hidden":"true"},"#",-1),m=i(`<p>给你一个字符串 s，请你反转字符串中 单词 的顺序。</p><p>单词是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的单词分隔开。</p><p>返回单词顺序颠倒且单词之间用单个空格连接的结果字符串。</p><p>注意：输入字符串 s 中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。</p><h2 id="解题思路" tabindex="-1"><a class="header-anchor" href="#解题思路" aria-hidden="true">#</a> 解题思路</h2><ol><li>去除多余的空格（前导空格、尾随空格或者单词间的多个空格）</li><li>反转整个字符串</li><li>将每个单词反转</li></ol><h2 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码" aria-hidden="true">#</a> 示例代码</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">reverseWords</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 去除多余空格</span>
        s<span class="token operator">=</span>  <span class="token function">removeSpace</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 反转字符串</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">reverse</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 反转单词</span>
        <span class="token keyword">int</span> start <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> end <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>start <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span>end <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>end<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">&#39; &#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                end<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token function">reverse</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> start<span class="token punctuation">,</span> end <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            start <span class="token operator">=</span> end <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            end <span class="token operator">=</span> start<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">char</span> tmp <span class="token operator">=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>left<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>right<span class="token operator">--</span><span class="token punctuation">]</span> <span class="token operator">=</span> tmp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
        
    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">removeSpace</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> start <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> end <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token char">&#39; &#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            start<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>end<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token char">&#39; &#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            end<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>start <span class="token operator">&lt;=</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">char</span> c <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">!=</span> <span class="token char">&#39; &#39;</span> <span class="token operator">||</span> sb<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>sb<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token char">&#39; &#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            start<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析" aria-hidden="true">#</a> 复杂度分析</h2><ul><li>时间复杂度：<em>O(n)</em></li><li>空间复杂度：<em>O(n)</em></li></ul>`,10);function b(h,_){const p=t("ExternalLinkIcon"),e=t("Badge");return c(),l("div",null,[r,n("ul",null,[n("li",null,[n("a",k,[s("151. 反转字符串中的单词"),a(p)])])]),n("h2",d,[v,s(" 题目描述 "),a(e,{text:"中等",type:"warning"})]),m])}const w=o(u,[["render",b],["__file","151-反转字符串中的单词.html.vue"]]);export{w as default};
