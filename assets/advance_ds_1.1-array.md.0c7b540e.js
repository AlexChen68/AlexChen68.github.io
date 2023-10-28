import{_ as e,o as r,c as l,Q as a}from"./chunks/framework.419948d5.js";const u=JSON.parse('{"title":"线性表 - 数组","description":"","frontmatter":{"title":"线性表 - 数组","date":"2022-09-27T00:00:00.000Z"},"headers":[],"relativePath":"advance/ds/1.1-array.md","filePath":"advance/ds/1.1-array.md","lastUpdated":1698482261000}'),t={name:"advance/ds/1.1-array.md"},i=a('<h2 id="数组概述" tabindex="-1">数组概述 <a class="header-anchor" href="#数组概述" aria-label="Permalink to &quot;数组概述&quot;">​</a></h2><p>数组是一种连续存储线性结构，元素类型相同，大小相等，数组是多维的，通过使用整型索引值来访问他们的元素，数组尺寸不能改变。</p><p>数组具有一下的特点：</p><ul><li>数组下标都是从 0 开始的。</li><li>数组内存空间的地址是连续的。</li><li>数组的元素是不能删的，只能覆盖。</li></ul><p>正是因为数组的在内存空间的地址是连续的，所以我们在删除或者增添元素的时候，就难免要移动其他元素的地址。</p><p>数组的<strong>优点</strong>:</p><ul><li>存取速度快</li></ul><p>数组的<strong>缺点</strong>:</p><ul><li>事先必须知道数组的长度</li><li>空间通常是有限制的</li><li>需要大块连续的内存块</li><li>插入删除元素的效率很低</li></ul><h2 id="相关算法题" tabindex="-1">相关算法题 <a class="header-anchor" href="#相关算法题" aria-label="Permalink to &quot;相关算法题&quot;">​</a></h2><ul><li><a href="https://leetcode.cn/problems/two-sum/" target="_blank" rel="noreferrer">001. 两数之和</a></li><li><a href="https://leetcode.cn/problems/minimum-size-subarray-sum/" target="_blank" rel="noreferrer">209. 长度最小的子数组</a></li><li><a href="https://leetcode.cn/problems/maximum-subarray/" target="_blank" rel="noreferrer">053. 最大子数组和</a></li><li><a href="https://leetcode.cn/problems/remove-element/" target="_blank" rel="noreferrer">27. 移除元素</a></li><li><a href="https://leetcode.cn/problems/remove-duplicates-from-sorted-list/" target="_blank" rel="noreferrer">083. 删除排序链表中的重复元素</a></li><li><a href="https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/" target="_blank" rel="noreferrer">080. 删除有序数组中的重复项 II</a></li><li><a href="https://leetcode.cn/problems/squares-of-a-sorted-array" target="_blank" rel="noreferrer">977. 有序数组的平方</a></li></ul><p><strong>常用解法：</strong></p><ol><li>二分法查询</li><li>双指针法</li><li>哈希表</li><li>滑动窗口</li></ol><p>所谓滑动窗口，就是不断的调节子序列的起始位置和终止位置，从而得出我们要想的结果。</p><p>实现滑动窗口，主要确定如下三点：</p><ul><li>窗口内是什么？</li><li>如何移动窗口的起始位置？</li><li>如何移动窗口的结束位置？</li></ul>',16),o=[i];function s(n,p,c,d,_,m){return r(),l("div",null,o)}const f=e(t,[["render",s]]);export{u as __pageData,f as default};