---
title: 桶排序
index: false
article: false
tag:
  - 排序算法
date: 2023-04-03
---

## 简介

假设待排序的数组 a 中共有 N 个整数，并且已知数组 a 中数据的范围[0, MAX)。在桶排序时，创建容量为 MAX 的桶数组 r，并将桶数组元素都初始化为 0；将容量为 MAX 的桶数组中的每一个单元都看作一个"桶"。在排序时，逐个遍历数组 a，将数组 a 的值，作为"桶数组 r"的下标。当 a 中数据被读取时，就将桶的值加 1。例如，读取到数组 a[3]=5，则将 r[5]的值 +1。

## 排序步骤

假设 a={8,2,3,4,3,6,6,3,9}, max=10。此时，将数组 a 的所有数据都放到需要为 0-9 的桶中。如下图：

![桶排序](https://pdai.tech/images/alg/alg-sort-bucket-1.jpg)

在将数据放到桶中之后，再通过一定的算法，将桶中的数据提出出来并转换成有序数组。就得到我们想要的结果了。

## 演示动画

![桶排序动画](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/advance/桶排序.gif)

## 代码实现

```java
public class BucketSort {

    /*
     * 桶排序
     *
     * 参数说明：
     *     a -- 待排序数组
     *     max -- 数组 a 中最大值的范围
     */
    public static void bucketSort(int[] a, int max) {
        int[] buckets;

        if (a==null || max<1)
            return ;

        // 创建一个容量为 max 的数组 buckets，并且将 buckets 中的所有数据都初始化为 0。
        buckets = new int[max];

        // 1. 计数
        for(int i = 0; i < a.length; i++) 
            buckets[a[i]]++; 

        // 2. 排序
        for (int i = 0, j = 0; i < max; i++) {
            while( (buckets[i]--) >0 ) {
                a[j++] = i;
            }
        }

        buckets = null;
    }

    public static void main(String[] args) {
        int i;
        int a[] = {8,2,3,4,3,6,6,3,9};

        System.out.printf("before sort:");
        for (i=0; i<a.length; i++)
            System.out.printf("%d ", a[i]);
        System.out.printf("\n");

        bucketSort(a, 10); // 桶排序

        System.out.printf("after  sort:");
        for (i=0; i<a.length; i++)
            System.out.printf("%d ", a[i]);
        System.out.printf("\n");
    }
}
```

## 复杂度分析

- 平均时间复杂度：O(n + k)
- 最佳时间复杂度：O(n + k)
- 最差时间复杂度：O(n ^ 2)
- 空间复杂度：O(n * k)