---
title: 插入排序 - 直接插入排序
date: 2023-04-03
---

## 简介

插入排序的代码实现虽然没有冒泡排序和选择排序那么简单粗暴，但它的原理应该是最容易理解的了，因为只要打过扑克牌的人都应该能够秒懂。

插入排序是一种最简单直观的排序算法，它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

插入排序和冒泡排序一样，也有一种优化算法，叫做*拆半插入*。

## 排序步骤

1. 把 n 个待排序的元素看成为一个有序表和一个无序表，最开始时有序表中只包含 1 个元素，无序表中包含有 n-1 个元素；
2. 每次从无序表中取出第一个元素，将它插入到有序表中的适当位置，使之成为新的有序表；
3. 重复第 2 步 n-1 次可完成排序过程。

## 演示动画

![直接插入排序动画](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/advance/插入排序.gif)

## 代码实现

```java
public class InsertionSort {

    public static void main(String[] args) {
        int[] ints = RandomUtil.randomInts(16);
        System.out.println("Before: " + Arrays.toString(ints));
        sort(ints);
        System.out.println("After:  " + Arrays.toString(ints));
    }

    public static void sort(int[] a) {
        int n = a.length;
        for (int i = 0; i < n; i++) {
            //为 a[i] 在前面的 a[0...i-1] 有序区间中找一个合适的位置
            int position = i - 1;
            int temp = a[i];
            while (position >= 0 && temp < a[position]) {
                a[position + 1] = a[position];
                position--;
            }
            a[position + 1] = temp;
        }
    }
}
```

## 复杂度分析

- 时间复杂度：*O(n^2^)*
- 空间复杂度：*O(1)*