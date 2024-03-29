---
title: 选择排序 - 堆排序
tag:
  - 排序算法
date: 2023-04-03
---

## 简介

堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：**即子结点的键值或索引总是小于（或者大于）它的父节点**。堆排序可以说是一种利用堆的概念来排序的选择排序。分为两种方法：

- 大顶堆（最大堆）：每个节点的值都大于或等于其子节点的值，在堆排序算法中用于*升序*排列；
- 小顶堆（最小堆）：每个节点的值都小于或等于其子节点的值，在堆排序算法中用于*降序*排列；

堆排序的平均时间复杂度为 Ο(nlogn)。

## 排序步骤

以最大堆为例：

1. 用待排序数组构建成一个堆 H[0...n-1]，那么此时的堆顶一定是最大值；
2. 交换堆顶和堆尾的元素，那么最大值就被放到了数组的末尾，完成了一个元素的排序；
3. 使用剩余**未排序**的数组重复 1 和 2 的操作，用未排序的数组构成最大堆，交换堆顶和堆尾的元素，一次完成一个元素的排序，直至整个数组有序。

## 演示动画

![堆排序动画](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/advance/堆排序.gif)

## 代码实现

```java
public class HeapSort {

    public static void main(String[] args) {
        int[] ints = RandomUtil.randomInts(16);
        System.out.println("Before: " + Arrays.toString(ints));
        sort(ints);
        System.out.println("After:  " + Arrays.toString(ints));
    }

    public static void sort(int[] a) {
        int n = a.length;
        // 初始化堆
        buildMaxHeap(a, n);
        //
        for (int i = n - 1; i > 0; i--) {
            // 交换堆顶 a[0] 和堆底 a[i] 的值
            swap(a, 0, i);
            maxHeapify(a, 0, i);
        }
    }

    private static void buildMaxHeap(int[] a, int n) {
        // i 初始化为最后一个结点的父结点在数组的下标
        for (int i = n / 2 - 1; i >= 0; i--) {
            maxHeapify(a, i, n);
        }
    }

    private static void maxHeapify(int[] a, int i, int n) {
        int left = 2 * i + 1;
        int right = left + 1;
        int largest = i;
        if (left < n && a[left] > a[largest]) {
            largest = left;
        }
        if (right < n && a[right] > a[largest]) {
            largest = right;
        }
        if (largest != i) {
            swap(a, i, largest);
            maxHeapify(a, largest, n);
        }
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```

## 复杂度分析

- 时间复杂度：*O(nlog~2~n)*
- 空间复杂度：*O(1)*