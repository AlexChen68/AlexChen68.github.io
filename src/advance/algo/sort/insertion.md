---
title: 插入排序
category: 算法
tag:
  - 排序算法
date: 2023-04-03
---

## 插入排序 <Badge text="低效" type="warning"/>

1. 把 n 个待排序的元素看成为一个有序表和一个无序表，最开始时有序表中只包含 1 个元素，无序表中包含有 n-1 个元素；
2. 每次从无序表中取出第一个元素，将它插入到有序表中的适当位置，使之成为新的有序表；
3. 重复第 2 步 n-1 次可完成排序过程。

## 演示动画

![直接插入排序动画](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/直接插入排序动画.gif)

## 代码实现

```java
public static void sort(int[] a) {
    int n = a.length;
    for (int i = 0; i < n; i++) {
        //为 a[i] 在前面的 a[0...i-1] 有序区间中找一个合适的位置
        int position = i - 1;
        int temp = a[i];
        // 先缓存 a[i]，如果前面的数比 a[i] 大，那就往后移
        while (position >= 0 && temp < a[position]) {
            a[position + 1] = a[position];
            position--;
        }
        // 最后 position 位置的数不比 a[i] 大，那么 a[i] 可以放在它后面一位
        a[position + 1] = temp;
    }
}
```

## 复杂度分析

- 时间复杂度：*O(n^2^)*
- 空间复杂度：*O(1)*