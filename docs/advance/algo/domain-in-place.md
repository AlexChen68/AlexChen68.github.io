---
title: 原地算法
date: 2023-02-21
order: 301
---

## 原地算法（In-Place Algorithm）

原地算法：在计算机科学中，一个原地算法（in-place algorithm）是一种使用小的，固定数量的额外之空间来转换资料的算法。当算法执行时，输入的资料通常会被要输出的部分覆盖掉。不是原地算法有时候称为非原地（not-in-place）或不得其所（out-of-place）。

通俗的说法：就是一个算法，除了可以运用输入数据本身已开辟的空间外，就只可以用极小的辅助空间来进行运算了，一般 额外空间复杂度为 O (1)，也就是一个变量。(特殊情况除外)

示例：LeetCode 26 题 [https://leetcode.cn/problems/remove-duplicates-from-sorted-array/](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)