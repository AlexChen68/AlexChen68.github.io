import{_ as o,W as c,X as l,Y as n,$ as s,a1 as a,a0 as i,C as t}from"./framework-8d3a05fe.js";const u={},r={href:"https://leetcode.cn/problems/squares-of-a-sorted-array",target:"_blank",rel:"noopener noreferrer"},k={id:"题目描述",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#题目描述","aria-hidden":"true"},"#",-1),m=i(`<p>给你一个按 <strong>非递减顺序</strong> 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。</p><p>示例 1：输入：nums = [-4,-1,0,3,10] 输出：[0,1,9,16,100] 解释：平方后，数组变为 [16,1,0,9,100]，排序后，数组变为 [0,1,9,16,100]</p><p>示例 2：输入：nums = [-7,-3,2,3,11] 输出：[4,9,9,49,121]</p><h2 id="解题思路" tabindex="-1"><a class="header-anchor" href="#解题思路" aria-hidden="true">#</a> 解题思路</h2><p>双指针法：</p><p>因为数组是非递减顺序的，所以有可能一个负数平方后比正数平方后更大，但是最大值只会在数组的两端，不是最左边就是最右边，不可能是中间。</p><p>因此每次都取最大值，然后放入一个新数组，从末尾开始依次放数。</p><h2 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码" aria-hidden="true">#</a> 示例代码</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">sortedSquares</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> n <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> right <span class="token operator">=</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 判断 left 的平方和 right 的平方哪个更大</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">*</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">&gt;</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">*</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                res<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">*</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>
                left<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                res<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">*</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">;</span>
                right<span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            index<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析" aria-hidden="true">#</a> 复杂度分析</h2><ul><li>时间复杂度：O(n)，只需要遍历一次。</li><li>空间复杂度：O(1)，只需要存储常数级的额外变量。</li></ul>`,11);function v(h,b){const e=t("ExternalLinkIcon"),p=t("Badge");return c(),l("div",null,[n("blockquote",null,[n("p",null,[s("LeetCode 传送门 "),n("a",r,[s("https://leetcode.cn/problems/squares-of-a-sorted-array"),a(e)])])]),n("h2",k,[d,s(" 题目描述 "),a(p,{text:"简单",type:"tip"})]),m])}const f=o(u,[["render",v],["__file","977-有序数组的平方.html.vue"]]);export{f as default};
