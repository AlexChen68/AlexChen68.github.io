---
title: 希尔排序
category: 算法
tag:
  - 排序算法
date: 2023-04-03
---

## 希尔排序 <Badge text="推荐" type="tip"/>

希尔排序是针对直接插入排序的优化。

希尔排序实质上是一种分组插入方法。其排序步骤：

1. 对于 n 个待排序的数列，取一个小于 n 的整数 gap(gap 被称为步长) 将待排序元素分成若干个组子序列，所有距离为 gap 的倍数的记录放在同一个组中；
2. 然后，对各组内的元素进行直接插入排序；这一趟排序完成之后，每一个组的元素都是有序的。
3. 减小 gap 的值，并重复执行上述的分组和排序。
4. 当 gap 的值减少到等于 1 时，整个数组就是有序的了。

## 演示动画

![希尔排序动画](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/希尔排序动画.gif)

## 代码实现

```java
public static void sort(int[] a) {
    int n = a.length;
    // gap 依次除以 2，直至等于 1
    for (int gap = n >>> 1; gap > 0; gap = gap >>> 1) {
        // 对每个步长使用直接插入排序
        for (int i = 0; i < gap; i++) {
            // 插入排序，从 i+gap 开始，每个元素索引加 gap 位
            for (int j = i + gap; j < n; j += gap) {
                int temp = a[j];
                int position = j - gap;
                while (position >= i && a[position] > temp) {
                    a[position + gap] = a[position];
                    position -= gap;
                }
                a[position + gap] = temp;
            }
        }
    }
}
```

## 复杂度分析

- 时间复杂度：*O(n^1.3^)*
- 空间复杂度：*O(1)*