import{_ as e,W as t,X as n,a0 as r}from"./framework-8d3a05fe.js";const i={},o=r('<h2 id="查找的概念" tabindex="-1"><a class="header-anchor" href="#查找的概念" aria-hidden="true">#</a> 查找的概念</h2><p>查找是在大量的信息中寻找一个特定的信息元素，在计算机应用中，查找是常用的基本运算，例如编译程序中符号表的查找。本文简单概括性的介绍了常见的七种查找算法，说是七种，其实二分查找、插值查找以及斐波那契查找都可以归为一类——插值查找。插值查找和斐波那契查找是在二分查找的基础上的优化查找算法。</p><p><strong>查找的定义</strong>：根据给定的某个值，在查找表中确定一个其关键字等于给定值的数据元素（或记录）。</p><p><strong>查找算法分类</strong>：</p><ol><li><p>静态查找和动态查找；</p><p>注：静态或者动态都是针对查找表而言的。动态表指查找表中有删除和插入操作的表。</p></li><li><p>无序查找和有序查找。</p><p>无序查找：被查找数列有序无序均可；</p><p>有序查找：被查找数列必须为有序数列。</p></li></ol><p><strong>平均查找长度（Average Search Length，ASL）</strong>：需和指定key进行比较的关键字的个数的期望值，称为查找算法在查找成功时的平均查找长度。 　　 对于含有n个数据元素的查找表，查找成功的平均查找长度为：ASL = Pi*Ci的和。 　　Pi：查找表中第i个数据元素的概率。 　　Ci：找到第i个数据元素时已经比较过的次数。</p>',6),a=[o];function p(s,c){return t(),n("div",null,a)}const _=e(i,[["render",p],["__file","index.html.vue"]]);export{_ as default};
