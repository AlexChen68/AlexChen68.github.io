---
title: 冒泡排序
category: 算法
date: 2022-09-27
---

冒泡排序原理及代码实现
<!-- more -->

## **原理**

1. 从头遍历数列，从前往后依次的比较相邻两个数的大小，如果前者比后者大，则交换它们的位置，遍历一次后，可最大的元素就在数列的末尾；
2. 重复上述操作，每一次遍历可以得到子数列的最大值放到该子数列的末尾，直到整个数列都有序为止。

时间复杂度：O(n^2)
空间复杂度：O(n)

## **代码实现**

```java
public static void sort(int[] arr) {
    int n = arr.length;
    boolean flag = false;
    // i 从 n-1 到 0，代表一次内循环确定的下标
    for (int i = n-1; i > 0; i--) {
        // j 从 0 到 i-1
        for (int j = 0; j < i; j++) {
            if (arr[j] > arr[j+1]) {
                // 交换元素
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                flag = true;
            }
        }
        // 如果没有发生交换，说明数组已经有序了
        if (!flag) {
            break;
        }
    }
}
```
