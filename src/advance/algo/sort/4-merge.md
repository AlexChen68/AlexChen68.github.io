---
title: 4. 归并排序
category: 算法
tag:
  - 排序算法
date: 2023-04-03
---

## 简介

归并排序（Merge sort）是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。

作为一种典型的分而治之思想的算法应用，归并排序的实现由两种方法：

- 自上而下的递归（所有递归的方法都可以用迭代重写，所以就有了第 2 种方法）；
- 自下而上的迭代；

和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是 *O(nlogn)* 的时间复杂度。代价是需要额外的内存空间。

归并排序是用分治思想，分治模式在每一层递归上有三个步骤：

- 分解（Divide）：将 n 个元素分成个含 n/2 个元素的子序列。
- 解决（Conquer）：用合并排序法对两个子序列递归的排序。
- 合并（Combine）：合并两个已排序的子序列已得到排序结果。

## 排序步骤

迭代法：

1. 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；
2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置；
3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；
4. 重复步骤 3 直到某一指针到达序列尾；
5. 将另一序列剩下的所有元素直接复制到合并序列尾。

递归法：

1. 将序列每相邻两个数字进行归并操作，形成 floor(n/2) 个序列，排序后每个序列包含两个元素；
2. 将上述序列再次归并，形成 floor(n/4) 个序列，每个序列包含四个元素；
3. 重复步骤 2，直到所有元素排序完毕。

## 演示动画

![归并排序动画](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/advance/归并排序.gif)

## 代码实现

自上而下的递归：

```java
public class MergeSort {

    public static void main(String[] args) {
        int[] ints = RandomUtil.randomInts(16);
        System.out.println("Before: " + Arrays.toString(ints));
        sort(ints);
        System.out.println("After:  " + Arrays.toString(ints));
    }

    public static void sort(int[] a) {
        mergeSort(a, 0,  a.length- 1);
    }

    /**
     * 递归法
     * @param nums 待排序数组
     * @param l 数组左边界索引
     * @param r 数组右点解索引
     */
    private static void mergeSort(int[] nums, int l, int r) {
        // 终止条件
        if (l >= r) {
            return;
        }
        // 递归划分
        int m = (l + r) / 2;
        mergeSort(nums, l, m);
        mergeSort(nums, m + 1, r);
        // 合并子数组
        // 因为使用原地算法修改数组，因此要先暂存需合并区间元素，即 [l, r] 的元素；
        int[] tmp = new int[r - l + 1];
        for (int k = l; k <= r; k++) {
            tmp[k - l] = nums[k];
        }
        // 两指针分别指向左/右子数组的首个元素
        int i = 0, j = m - l + 1;
        // 遍历合并左/右子数组
        for (int k = l; k <= r; k++) {
            // i == m - l + 1 表示左子数组已经遍历完了，因此使用右子数组开始填充，并且 j++；j == r - l + 1 同理；否则的话，谁小谁先填充到数组中
            if (i == m - l + 1) {
                nums[k] = tmp[j++];
            } else if (j == r - l + 1 || tmp[i] <= tmp[j]) {
                nums[k] = tmp[i++];
            } else {
                nums[k] = tmp[j++];
            }
        }
    }
}
```


## 复杂度分析

- 时间复杂度：*O(nlog~2~n)*
- 空间复杂度：*O(n)*