---
title: 图 - UnionFind 并查集
category: 数据结构
date: 2023-05-11
---

##  1. 什么是并查集（Union-Find）算法

并查集（Union-Find）算法是一个专门针对 `动态连通性` 的算法。关于动态连通性，可以参见这篇文章：[并查集（Union-Find）算法](https://labuladong.github.io/algo/di-yi-zhan-da78c/shou-ba-sh-03a72/bing-cha-j-323f3/)  


**用途**：以非常简单且巧妙的存储方式、算法来解决图论中**无向图的节点动态连通**的问题。很多复杂的 DFS 算法问题，都可以利用 Union-Find 算法更漂亮地解决。

**主要原理**：用`数组`来存储每个节点的直接父节点，这样就足以存储包含多个连通分量的图——在内部为各连通分量自底向上生成了有向生成树并用数组存储（也可以理解为存储的是多棵树组成的森林，每棵树可以是任意叉的；这里的生成树不一定是原图的生成树），在并查集维护的过程中自底向上（自叶节点到根节点）动态维护各树。

## 2. 实现 Union-Find 算法

并查集支持的**操作**包括：

- find(p)：找到指定节点所属的根节点。
- union(p, q)：把 p、q 两个节点联通起来，也即将两节点分别所在的连通分量合并为一个。两节点原来可能已连通也可能尚未连通。实现：分别找出两节点的根节点，然后将一个根节点作为另一根节点的孩子。
- connected(p, q)：判断两个节点是否连通。实现：获取两节点的根节点，判断是否是同一个。
- count()：获取联通分量数，也即节点分类数。

代码框架：

```java
class UF {
    // 记录连通分量
    private int count;
    // 节点 x 的父节点是 parent[x]
    private int[] parent;

    /* 构造函数，n 为图的节点总数 */
    public UF(int n) {
        // 一开始互不连通
        this.count = n;
        // 父节点指针初始指向自己
        parent = new int[n];
        for (int i = 0; i < n; i++) {
          parent[i] = i;
        }
    }

    /* 连通两个结点 */
    public void union(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        if (rootP == rootQ) {
          return;
        }
        // 将两棵树合并为一棵
        parent[rootP] = rootQ;
        // parent[rootQ] = rootP 也一样
        count--; // 两个分量合二为一
    }

    /* 返回某个节点 x 的根节点 */
    private int find(int x) {
        // 根节点的 parent[x] == x
        while (parent[x] != x)
            x = parent[x];
        return x;
    }

    /* 返回当前的连通分量个数 */
    public int count() { 
        return count;
    }

    /* 判断两个结点是否连通 */
    public boolean connected(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        return rootP == rootQ;
    }
}
```

## 3. 优化 Union-Find 算法

### 3.1 复杂度分析：

- **空间复杂度**：*O(n)*，n 为节点数
- **时间复杂度**：初始化的时间复杂度为 *O(n)*；`union` 和 `connected` 操作都依赖 `find` 且主要代价在 `find` 操作，因此时间复杂度看 `find` 操作，各操作的平均时间复杂度在优化前后分别为 *O(log~n~)*、*O(1)*。`find` 操作花费的时间与**当前节点到根节点的路径**长有关，平均时间复杂度为树高 *O(log~n~)*、最坏为 *O(n)*。

**因此可以通过尽量减少 `find` 操作后的树高度，来优化整个算法的时间复杂度**。有两种常见的优化方式，最终各操作时间复杂度为 `O(1)`，两种优化本质上都是为了**减少树高**：

- 平衡性优化
- 路径压缩优化

### 3.2 平衡性优化

> **平衡性优化**：`union` 操作时将**节点数少的树的根节点接到节点数多的树的根节点**上去，而不是反过来。这样可以防止树成为单链，从而减少下面的路径压缩操作。
> 
> 解决方法是额外使用一个 `size` 数组，记录每棵树包含的节点数。

平衡性优化后的代码实现：

```java
class UF {
    private int count;
    private int[] parent;
    // 新增一个数组记录树的“重量”
    private int[] size;

    public UF(int n) {
        this.count = n;
        parent = new int[n];
        // 最初每棵树只有一个节点，重量应该初始化 1
        size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }
    
    public void union(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        if (rootP == rootQ) {
           return;
        }
        // 小树接到大树下面，较平衡
        if (size[rootP] > size[rootQ]) {
            parent[rootQ] = rootP;
            size[rootP] += size[rootQ];
        } else {
            parent[rootP] = rootQ;
            size[rootQ] += size[rootP];
        }
        count--;
    }

    /* 返回某个节点 x 的根节点 */
    private int find(int x) {
        // 根节点的 parent[x] == x
        while (parent[x] != x) {
          x = parent[x];
        }
        return x;
    }

    /* 返回当前的连通分量个数 */
    public int count() { 
        return count;
    }

   /* 判断两个结点是否连通 */
    public boolean connected(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        return rootP == rootQ;
    }
}
```

### 3.3 路径压缩优化

> **路径压缩优化**：`find` 操作时顺便压缩路径，这里有两种实现
> 1. 普通的路径压缩：如果当前节点不是根节点，则将当前节点上移一层，然后对其新父节点递归执行该操作。
> 2. 激进的压缩方式：此过程使得压缩后指定节点及其各非根父节点均直接成为根节点的子节点。

普通的路径压缩：

```java
private int find(int x) {
    // 每次 while 循环都会把一对父子节点改到同一层，这样每次调用 find 函数向树根遍历的同时，顺手就将树高缩短了。
    while (parent[x] != x) {
        // x 的根节点指向其父节点的父节点，相当于 x 往上面提了一层，成了其父节点的兄弟
        parent[x] = parent[parent[x]];
        // 然后他们共同的父节点成为新的 x，继续向上合并
        x = parent[x];
    }
    return x;
}
```

激进的压缩方式：

```java
public int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}
```

路径压缩后的代码实现：

```java
class UF {
    // 连通分量个数
    private int count;
    // 存储每个节点的父节点
    private int[] parent;

    // n 为图中节点的个数
    public UF(int n) {
        this.count = n;
        parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }
    
    // 将节点 p 和节点 q 连通
    public void union(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        
        if (rootP == rootQ)
            return;
        
        parent[rootQ] = rootP;
        // 两个连通分量合并成一个连通分量
        count--;
    }

    // 判断节点 p 和节点 q 是否连通
    public boolean connected(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        return rootP == rootQ;
    }

    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    // 返回图中的连通分量个数
    public int count() {
        return count;
    }
}
```

:::tip
平衡性优化和第一种路径压缩可以一起使用哦。

```java
class UF {
    // 连通分量个数
    private int count;
    // 存储一棵树
    private int[] parent;
    // 记录树的“重量”
    private int[] size;

    public UF(int n) {
        this.count = n;
        parent = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }

    public void union(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        if (rootP == rootQ)
            return;

        // 小树接到大树下面，较平衡
        if (size[rootP] > size[rootQ]) {
            parent[rootQ] = rootP;
            size[rootP] += size[rootQ];
        } else {
            parent[rootP] = rootQ;
            size[rootQ] += size[rootP];
        }
        count--;
    }

    public boolean connected(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        return rootP == rootQ;
    }

    private int find(int x) {
        while (parent[x] != x) {
            // 进行路径压缩
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
```
:::

## 4. 参考资料

- [并查集（Union-Find）算法](https://labuladong.github.io/algo/di-yi-zhan-da78c/shou-ba-sh-03a72/bing-cha-j-323f3/)  
- [算法之并查集 Union-Find](https://www.cnblogs.com/z-sm/p/12383918.html)