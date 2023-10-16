---
title: 选择排序 - 直接选择排序
tag:
  - 排序算法
date: 2023-04-03
---

## 简介

选择排序是一种简单直观的排序算法，无论什么数据进去都是 *O(n^²^)* 的时间复杂度。所以用到它的时候，**数据规模越小越好**。

唯一的好处可能就是不占用额外的内存空间了吧。

## 选择排序步骤

1. 首先在未排序的数列中找到最小 (or 最大) 元素，然后将其存放到数列的起始位置；
2. 接着，再从剩余未排序的元素中继续寻找最小 (or 最大) 元素，然后放到已排序序列的末尾。
3. 以此类推，直到所有元素均排序完毕。

## 演示动画

![选择排序动画](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/advance/选择排序.gif)

## 代码实现

```java
public static void sort(int[] a) {
    int index = 0;
    // 需要选择 n - 1 次
    while (index < a.length - 1) {
        int minIndex = index;
        // 获取未排序序列中的最小值索引
        for (int i = index + 1; i < a.length; i++) {
            if (a[i] < a[minIndex]) {
                minIndex = i;
            }
        }
        // 将最小值放入已排序序列的下一位
        if (minIndex != index) {
            int temp = a[index];
            a[index] = a[minIndex];
            a[minIndex] = temp;
        }
        index++;
    }
}
```

## 复杂度分析

- 时间复杂度：*O(n^2^)*
- 空间复杂度：*O(1)*

