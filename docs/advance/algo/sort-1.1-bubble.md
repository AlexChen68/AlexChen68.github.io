---
title: 交换排序 - 冒泡排序
date: 2022-09-27
---

# 冒泡排序

## 算法简介

冒泡排序（Bubble Sort）也是一种简单直观的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。

这个算法的名字由来是因为越小的元素会经由交换慢慢"浮"到数列的顶端。

## 排序步骤

1. 从头遍历数列，从前往后依次的**比较相邻两个数的大小**，如果前者比后者大，则交换它们的位置，遍历一次后，可最大的元素就在数列的末尾；
2. 重复上述操作，每一次遍历可以得到子数列的最大值放到该子数列的末尾，直到整个数列都有序为止。

**冒泡排序的优化**：

增加一个标志位，记录本次遍历是否发生元素交换，如果没有交换，则表示数组已经是有序的了，无需再继续后面的遍历。

## 演示动画

![冒泡排序动画](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/advance/冒泡排序.gif)

## 代码实现

```java
public class BubbleSort {

    public static void main(String[] args) {
        int[] ints = RandomUtil.randomInts(16);
        System.out.println("Before: " + Arrays.toString(ints));
        sort(ints);
        System.out.println("After:  " + Arrays.toString(ints));
    }

    /**
     * 冒泡排序，返回升序排序后的数组
     * @param a 待排序待数组
     * @return
     */
    public static void sort(int[] a) {
        int n = a.length;
        boolean flag = false;
        // i 从 n-1 到 0，代表一次内循环确定的下标
        for (int i = n-1; i > 0; i--) {
            // j 从 0 到 i-1
            for (int j = 0; j < i; j++) {
                if (a[j] > a[j+1]) {
                    // 交换元素
                    int temp = a[j];
                    a[j] = a[j+1];
                    a[j+1] = temp;
                    flag = true;
                }
            }
            // 如果没有发生交换，说明数组已经有序了
            if (!flag) {
                break;
            }
        }
    }
}
```

## 复杂度分析

- 时间复杂度：*O(n^2^)*
- 空间复杂度：*O(1)*