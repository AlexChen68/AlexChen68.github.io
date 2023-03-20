import{_ as o,W as l,X as c,Y as n,$ as a,a1 as s,a0 as i,C as e}from"./framework-8d3a05fe.js";const d={},r={href:"https://leetcode.cn/problems/swap-nodes-in-pairs",target:"_blank",rel:"noopener noreferrer"},u={id:"题目描述",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#题目描述","aria-hidden":"true"},"#",-1),h=i(`<p>给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。</p><p>示例：</p><p><img src="https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg" alt="示例" loading="lazy"></p><blockquote><p>输入：head = [1,2,3,4] 输出：[2,1,4,3]</p></blockquote><p>提示：</p><ul><li>链表中节点的数目在范围 [0, 100] 内</li><li>0 &lt;= Node.val &lt;= 100</li></ul><h2 id="解题思路" tabindex="-1"><a class="header-anchor" href="#解题思路" aria-hidden="true">#</a> 解题思路</h2><p><strong>递归法</strong></p><p>其中我们应该关心的主要有三点：</p><ul><li>返回值</li><li>调用单元做了什么</li><li>终止条件</li></ul><p>在本题中：</p><ul><li>返回值：交换完成的子链表</li><li>调用单元：设需要交换的两个点为 head 和 next，head 连接后面交换完成的子链表，next 连接 head，完成交换</li><li>终止条件：head 为空指针或者 next 为空指针，也就是当前无节点或者只有一个节点，无法进行交换</li></ul><h2 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码" aria-hidden="true">#</a> 示例代码</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">swapPairs</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">ListNode</span> temp <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token comment">// head 指向 next 后面两个结点</span>
        head<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">swapPairs</span><span class="token punctuation">(</span>temp<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
        temp<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">return</span> temp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析" aria-hidden="true">#</a> 复杂度分析</h2><ul><li>时间复杂度：O(n)，其中 n 是链表的节点数量。需要对每个节点进行更新指针的操作。</li><li>空间复杂度：O(n)，其中 n 是链表的节点数量。空间复杂度主要取决于递归调用的栈空间。</li></ul>`,16);function m(_,v){const t=e("ExternalLinkIcon"),p=e("Badge");return l(),c("div",null,[n("blockquote",null,[n("p",null,[a("LeetCode 传送门 "),n("a",r,[a("https://leetcode.cn/problems/swap-nodes-in-pairs"),s(t)])])]),n("h2",u,[k,a(" 题目描述 "),s(p,{text:"中等",type:"warning"})]),h])}const x=o(d,[["render",m],["__file","024-两两交换链表中的节点.html.vue"]]);export{x as default};
