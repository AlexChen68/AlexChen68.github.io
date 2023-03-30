import{_ as d,W as r,X as l,Y as e,a0 as n,Z as s,a1 as o,C as a}from"./framework-d3200c61.js";const c={},u={href:"https://leetcode.cn/problems/degree-of-an-array/",target:"_blank",rel:"noopener noreferrer"},v=e("hr",null,null,-1),m={id:"题目描述",tabindex:"-1"},_=e("a",{class:"header-anchor",href:"#题目描述","aria-hidden":"true"},"#",-1),p=o(`<p>给定一个非空且只包含非负数的整数数组 nums，数组的 度 的定义是指数组里任一元素出现频数的最大值。</p><p>你的任务是在 nums 中找到与 nums 拥有相同大小的度的最短连续子数组，返回其长度。</p><p><strong>示例 1：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：nums = [1,2,2,3,1]
输出：2
解释：
输入数组的度是 2 ，因为元素 1 和 2 的出现频数最大，均为 2 。
连续子数组里面拥有相同度的有如下所示：
[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
最短连续子数组 [2, 2] 的长度为 2 ，所以返回 2 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：nums = [1,2,2,3,1,4,2]
输出：6
解释：
数组的度是 3 ，因为元素 2 重复出现 3 次。
所以 [2,2,3,1,4,2] 是最短子数组，因此返回 6 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function b(h,g){const t=a("ExternalLinkIcon"),i=a("Badge");return r(),l("div",null,[e("blockquote",null,[e("p",null,[n("LeetCode 传送门 "),e("a",u,[n("https://leetcode.cn/problems/degree-of-an-array/"),s(t)])])]),v,e("h2",m,[_,n(" 题目描述 "),s(i,{text:"简单",type:"tip"})]),p])}const f=d(c,[["render",b],["__file","697-数组的度.html.vue"]]);export{f as default};
