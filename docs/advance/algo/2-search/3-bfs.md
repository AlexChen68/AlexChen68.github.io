---
title: 广度优先搜索
date: 2023-06-07
---

## 什么是广度优先搜索？

> BFS：广度优先搜索的搜索过程有点像一层一层地进行遍历，每层遍历都以上一层遍历的结果作为起点，遍历一个距离能访问到的所有节点。需要注意的是，遍历过的节点不能再次被遍历。

BFS 常常用来**求解无权图的最短路径问题。**

在程序实现 BFS 时需要考虑以下问题：

- 队列：用来存储每一轮遍历得到的节点；
- 标记：对于遍历过的节点，应该将它标记，防止重复遍历。

## 代码框架

```java
static void BFS(int[][] graph, int s) {
    // 标记所有节点为未访问状态
    boolean visited[] = new boolean[graph.length];

    // 创建一个队列来存储需要遍历的节点
    LinkedList<Integer> queue = new LinkedList<Integer>();

    // 将起始节点加入队列，并标记已访问过
    visited[s] = true;
    queue.add(s);

    while (queue.size() != 0) {
        // 从队列中取出要访问的节点
        s = queue.poll();

        // 访问该结点
        // doSomething();

        // 遍历与该节点相邻且未被访问的节点
        for (int i = 0; i < graph.length; i++) {
            if (graph[s][i] == 1 && !visited[i]) {
                visited[i] = true;
                queue.add(i);
            }
        }
    }
}
```


