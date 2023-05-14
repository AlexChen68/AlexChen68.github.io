import{_ as o,W as l,X as c,Y as n,a0 as s,Z as a,a1 as i,C as e}from"./framework-35f74cfc.js";const u={},r=n("h2",{id:"题目链接",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#题目链接","aria-hidden":"true"},"#"),s(" 题目链接")],-1),d={href:"https://leetcode.cn/problems/palindrome-linked-list/",target:"_blank",rel:"noopener noreferrer"},k={id:"题目描述",tabindex:"-1"},v=n("a",{class:"header-anchor",href:"#题目描述","aria-hidden":"true"},"#",-1),m=i(`<p>给你一个单链表的头节点 <code>head</code>，请你判断该链表是否为回文链表。如果是，返回 <code>true</code>；否则，返回 <code>false</code>。</p><p>示例：</p><p><img src="https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg" alt="示例" loading="lazy"></p><div class="language-text" data-ext="text"><pre class="language-text"><code>输入：head = [1,2,2,1]
输出：true
</code></pre></div><h2 id="解题思路" tabindex="-1"><a class="header-anchor" href="#解题思路" aria-hidden="true">#</a> 解题思路</h2><p><strong>快慢指针：</strong></p><p>我们可以将链表的后半部分反转（修改链表结构），然后将前半部分和后半部分进行比较。比较完成后我们应该将链表恢复原样。虽然不需要恢复也能通过测试用例，但是使用该函数的人通常不希望链表结构被更改。</p><p>整个流程可以分为以下五个步骤：</p><ul><li>找到前半部分链表的尾节点。</li><li>反转后半部分链表。</li><li>判断是否回文。</li><li>恢复链表。</li><li>返回结果。</li></ul><h2 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码" aria-hidden="true">#</a> 示例代码</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isPalindrome</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 找到前半部分链表的尾节点并反转后半部分链表</span>
        <span class="token class-name">ListNode</span> firstHalfEnd <span class="token operator">=</span> <span class="token function">endOfFirstHalf</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span>   
        <span class="token class-name">ListNode</span> secondHalfStart <span class="token operator">=</span> <span class="token function">reverseList</span><span class="token punctuation">(</span>firstHalfEnd<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 判断是否回文</span>
        <span class="token class-name">ListNode</span> p1 <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> p2 <span class="token operator">=</span> secondHalfStart<span class="token punctuation">;</span>

        <span class="token keyword">boolean</span> result <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>result <span class="token operator">&amp;&amp;</span> p2 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p1<span class="token punctuation">.</span>val <span class="token operator">!=</span> p2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p1 <span class="token operator">=</span> p1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            p2 <span class="token operator">=</span> p2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>        

        <span class="token comment">// 还原链表并返回结果</span>
        firstHalfEnd<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">reverseList</span><span class="token punctuation">(</span>secondHalfStart<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">ListNode</span> <span class="token function">endOfFirstHalf</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> fast <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> slow <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>fast<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> slow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">ListNode</span> <span class="token function">reverseList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> nextTemp <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            curr<span class="token punctuation">.</span>next <span class="token operator">=</span> prev<span class="token punctuation">;</span>
            prev <span class="token operator">=</span> curr<span class="token punctuation">;</span>
            curr <span class="token operator">=</span> nextTemp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> prev<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析" aria-hidden="true">#</a> 复杂度分析</h2><ul><li>时间复杂度：O(n)</li><li>空间复杂度：O(1)</li></ul>`,13);function b(h,f){const t=e("ExternalLinkIcon"),p=e("Badge");return l(),c("div",null,[r,n("ul",null,[n("li",null,[n("a",d,[s("234. 回文链表"),a(t)])])]),n("h2",k,[v,s(" 题目描述 "),a(p,{text:"简单",type:"tip"})]),m])}const x=o(u,[["render",b],["__file","234-回文链表.html.vue"]]);export{x as default};
