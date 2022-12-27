---
title: 其他常用算法
date: 2022-09-27
order: 88
icon: blog
category:
  - 算法
isOriginal: true
description: 其他常用算法
---

其他常用的算法集合
<!-- more -->

			
## 原地算法（In-Place Algorithm）

原地算法：在计算机科学中，一个原地算法（in-place algorithm）是一种使用小的，固定数量的额外之空间来转换资料的算法。当算法执行时，输入的资料通常会被要输出的部分覆盖掉。不是原地算法有时候称为非原地（not-in-place）或不得其所（out-of-place）。

通俗的说法：就是一个算法，除了可以运用输入数据本身已开辟的空间外，就只可以用极小的辅助空间来进行运算了，一般 额外空间复杂度为 O (1)，也就是一个变量。(特殊情况除外)

例如：[LeetCode 26题](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

## 页面置换算法

`LRU` 是 Least Recently Used 的缩写，即最近最少使用，是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。

该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间 t，当须淘汰一个页面时，选择现有页面中其 t 值最大的，即最近最少使用的页面予以淘汰