---
title: 基数排序
tag:
  - 排序算法
date: 2023-04-03
---

## 简介

**基数排序的基本思想**：将整数按位数切割成不同的数字，然后按每个位数分别比较。

**具体做法**：将所有待比较数值统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。这样从最低位排序一直到最高位排序完成以后，数列就变成一个有序序列。

## 排序步骤

1. 将带排序数组，按照个数数值，放入长度为 10 的数组桶中；
2. 按顺序取出桶中的元素，并放入原数组中；
3. 按照十位数值放入对应的桶中；
4. 按顺序取出桶中的元素，并放入原数组中，依次类推，直至没有更高位的元素，则原数组排序完毕。

## 演示动画

![基数排序动画](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/1686125901253.png)

## 代码实现

```java
public class RadixSort {

    /*
     * 获取数组 a 中最大值
     *
     * 参数说明：
     *     a -- 数组
     *     n -- 数组长度
     */
    private static int getMax(int[] a) {
        int max;

        max = a[0];
        for (int i = 1; i < a.length; i++)
            if (a[i] > max)
                max = a[i];

        return max;
    }

    /*
     * 对数组按照"某个位数"进行排序 (桶排序)
     *
     * 参数说明：
     *     a -- 数组
     *     exp -- 指数。对数组 a 按照该指数进行排序。
     *
     * 例如，对于数组 a={50, 3, 542, 745, 2014, 154, 63, 616}；
     *    (01) 当 exp=1 表示按照"个位"对数组 a 进行排序
     *    (02) 当 exp=10 表示按照"十位"对数组 a 进行排序
     *    (03) 当 exp=100 表示按照"百位"对数组 a 进行排序
     *    ...
     */
    private static void countSort(int[] a, int exp) {
        //int output[a.length];    // 存储"被排序数据"的临时数组
        int[] output = new int[a.length];    // 存储"被排序数据"的临时数组
        int[] buckets = new int[10];

        // 将数据出现的次数存储在 buckets[] 中
        for (int i = 0; i < a.length; i++)
            buckets[ (a[i]/exp)%10 ]++;

        // 更改 buckets[i]。目的是让更改后的 buckets[i] 的值，是该数据在 output[] 中的位置。
        for (int i = 1; i < 10; i++)
            buckets[i] += buckets[i - 1];

        // 将数据存储到临时数组 output[] 中
        for (int i = a.length - 1; i >= 0; i--) {
            output[buckets[ (a[i]/exp)%10 ] - 1] = a[i];
            buckets[ (a[i]/exp)%10 ]--;
        }

        // 将排序好的数据赋值给 a[]
        for (int i = 0; i < a.length; i++)
            a[i] = output[i];

        output = null;
        buckets = null;
    }

    /*
     * 基数排序
     *
     * 参数说明：
     *     a -- 数组
     */
    public static void radixSort(int[] a) {
        int exp;    // 指数。当对数组按各位进行排序时，exp=1；按十位进行排序时，exp=10；...
        int max = getMax(a);    // 数组 a 中的最大值

        // 从个位开始，对数组 a 按"指数"进行排序
        for (exp = 1; max/exp > 0; exp *= 10)
            countSort(a, exp);
    }

    public static void main(String[] args) {
        int i;
        int a[] = {53, 3, 542, 748, 14, 214, 154, 63, 616};

        System.out.printf("before sort:");
        for (i=0; i<a.length; i++)
            System.out.printf("%d ", a[i]);
        System.out.printf("\n");

        radixSort(a);    // 基数排序

        System.out.printf("after  sort:");
        for (i=0; i<a.length; i++)
            System.out.printf("%d ", a[i]);
        System.out.printf("\n");
    }
}
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)