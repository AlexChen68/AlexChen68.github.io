---
title: 深度优先搜索
category: 算法
date: 2023-06-07
---

## 什么是深度优先搜索？

> DFS：核心思想就是一条路找到底，然后回退一步换一个方向继续。有一个细节是，有时需要在出递归时把回退到的当前节点标为可访问。

深度优先遍历图的方法是：

> 从图中某顶点 v 出发： 
（1）访问顶点 v； 
（2）依次从 v 的未被访问的邻接点出发，对图进行深度优先遍历；直至图中和 v 有路径相通的顶点都被访问； 
（3）若此时图中尚有顶点未被访问，则从一个未被访问的顶点出发，重新进行深度优先遍历，直到图中所有顶点均被访问过为止。

## 代码框架

```java
public static void DFS(int[][] graph, int s) {
    boolean visited[] = new boolean[graph.length];
    traverse(graph, s, visited);
}


static void traverse(int[][] graph, int s, boolean visited[]) {
    visited[s] = true;

    // 访问该结点
    // doSomething();

    // 遍历 s 的相邻结点
    for (int i = 0; i < graph.length; i++) {
        if (graph[s][i] == 1 && !visited[i]) {
            traverse(graph, i, visited);
        }
    }
}
```
