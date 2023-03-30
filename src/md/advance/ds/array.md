---
title: 线性表 - 数组
date: 2022-09-27
category: 数据结构
---

## 数组概述

数组是一种连续存储线性结构，元素类型相同，大小相等，数组是多维的，通过使用整型索引值来访问他们的元素，数组尺寸不能改变。

数组具有一下的特点：

- 数组下标都是从 0 开始的。
- 数组内存空间的地址是连续的。
- 数组的元素是不能删的，只能覆盖。

正是因为数组的在内存空间的地址是连续的，所以我们在删除或者增添元素的时候，就难免要移动其他元素的地址。

数组的**优点**:

* 存取速度快

数组的**缺点**:

* 事先必须知道数组的长度
* 空间通常是有限制的
* 需要大块连续的内存块
* 插入删除元素的效率很低

## 相关算法题

1. 数组中查询符合条件的元素个数或长度等
  - [001. 两数之和](https://leetcode.cn/problems/two-sum/)
  - [209-长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)

2. 删除元素，通过覆盖元素的值实现
  - [27. 移除元素](https://leetcode.cn/problems/remove-element/)
  - [083. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/)
  - [080. 删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/)

3. 计算得到新数组
  - [977. 有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array)


**常用解法：**

1. 二分法查询
2. 双指针法
3. 哈希表统计
4. 滑动窗口

所谓滑动窗口，就是不断的调节子序列的起始位置和终止位置，从而得出我们要想的结果。

实现滑动窗口，主要确定如下三点：

- 窗口内是什么？
- 如何移动窗口的起始位置？
- 如何移动窗口的结束位置？