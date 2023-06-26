import{_ as e,W as a,X as r,Y as t,Z as n,a1 as c}from"./framework-ea95e8eb.js";const i={},h=n("p",null,"搜索算法之顺序查找",-1),s=c('<h2 id="什么是顺序查找" tabindex="-1"><a class="header-anchor" href="#什么是顺序查找" aria-hidden="true">#</a> 什么是顺序查找？</h2><p>顺序查找（sequential search），也称穷举查找，是一种基本的查找算法。</p><p>顺序查找是按照序列原有顺序对数组进行遍历比较查询的基本查找算法。静态查找表既可以使用顺序表表示，也可以使用链表结构表示。虽然一个是数组、一个链表，但两者在做查找操作时，基本上都是大同小异。</p><h2 id="顺序查找的改进" tabindex="-1"><a class="header-anchor" href="#顺序查找的改进" aria-hidden="true">#</a> 顺序查找的改进</h2><p>顺序查找的改进：设置一个“哨兵”，就是等待查询的值，放在查找方向的尽头处，避免了每一次比较后都要判断一下当前的位置是否越界了。</p><p>习惯上我们一般将“哨兵”放在开头，然后逆序查找，放置好“哨兵”以后，从没有“哨兵”的一端依次遍历，如果查找的数据与关键字（key 值）相等，则输出，当程序运行到“哨兵”处，查询结束。</p><h2 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析" aria-hidden="true">#</a> 复杂度分析</h2><ul><li>时间复杂度：<em>O(n)</em></li><li>空间复杂度：<em>O(1)</em></li></ul>',8);function d(l,o){return a(),r("div",null,[h,t(" more "),s])}const m=e(i,[["render",d],["__file","1-linear-search.html.vue"]]);export{m as default};