---
title: 逻辑结构 - 树
date: 2022-09-27
category: 数据结构
---

## 树简介

**定义**

> 树：n(n>=0) 个节点构成的有限集合。
> 当 n=0 时，称为空树；

对于任一棵非空树 (n>0)，它具备以下性质：

1. 树中有一个称为“根”的特殊结点，用 r 表示；
2. 其余结点可分为 m(m>0) 个**互不相交**的有限集，其中每个集合本身又是一颗树，称为原来树的“子树”；
3. 除了根结点外，每个节点有且仅有一个父结点；
4. 一颗 N 个结点的树有 N-1 条边；

**树的一些术语**

1. 结点的度 (Degree):结点的子树个数
2. 树的度：树的所有结点中最大的度数
3. 叶结点 (Leaf):度为 0 的结点
4. 父结点 (Parent):有子树的结点是其子树的根结点的父结点
5. 子结点 (Child):若 A 结点是 B 结点的父结 L 点，则称 B 结点是 A 结点的子结点;子结点也称孩子结点。
6. 兄弟结点 (Sibling):具有同一父结点的各结点彼此是兄弟结点。
7. 路径和路径的长度：从结点 n1 到 nk 的路径为一 个结点序列 n1 , n2 ,... , nk , ni 是 ni+1 的父结 点，路径所包含边的个数为路径的长度；
8. 祖先结点 (Ancestor)：沿树根到某一结点路 径上的所有结点都是这个结点的祖先结点；
9. 子孙结点 (Descendant):某一结点的子树 中的所有结点是这个结点的子孙；
10. 结点的层次 (Level):规定根结点在 1 层，其它任一结点的层数是其父结点的层数加 1；
11. 树的深度 (Depth):树中所有结点中的最 大层次是这棵树的深度。

## 二叉树

> 二叉树 T：一个有穷的结点集合。
> 这个集合可以为空；
> 若不为空，则它是由根结点和称为其左子树 TL 和右子树 TR 的两个不相交的二叉树组成（度为 2）；
> 子树有左右之分。


**斜二叉树**：所有节点都只有左子树的二叉树叫做左斜树，所有节点都只有右子树的二叉树叫做右斜树。(本质就是链表)。

**满二叉树**：二叉树中所有非叶子结点的度都是 2，且叶子结点都在同一层次上。

**完全二叉树**：有 n 个结点的二叉树，对树中结点按从上至下、从左到右顺序进行编号，编号为 i(1 ≤ i ≤ n) 结点与满二叉树 中编号为 i 结点在二叉树中位置相同（即允许缺失最后的多个结点，缺中间的不算），称为完全二叉树。

### 二叉树的重要性质

1. 一个二叉树的第 i 层的最大结点数为 *2^i-1^*，i >= 1;
2. 深度为 k 的二叉树有最大结点总数为 *2^k-1^*, k >= 1;
3. 对任何非空二叉树 T，若 n~0~ 表示叶结点的个数，n~2~ 是 度为 2 的非叶结点个数，那么两者满足关系 *n~0~ = n~2~ +1*。

### 二叉树的存储结构

1. 二叉树可以非常方便的使用**链式存储结构**存储（主要存储方式），每个节点包含数据及两个指针，分别指向左子树和右子树。

![ 二叉树链式存储](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/二叉树链式存储.png)

2. **完全二叉树**可以使用**顺序存储结构**存储，可以使用数组按从上至下、从左到右顺序存储 n 个结点的完全二叉树的结点父子关系；其具备以下特定：

   * 非根结点 (序号 i > 1) 的父结点的序号是 i / 2;
   * 结点 (序号为 i) 的左孩子结点的序号是 2i， (若 2i <= n，否则没有左孩子);
   * 结点 (序号为 i) 的右孩子结点的序号是 2i+1， (若 2i +1<= n，否则没有右孩子);

![二叉树顺序存储](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/二叉树顺序存储.png)

如果父节点的数组下标是 `i`，那么左孩子就是 *`i*2+1`*，右孩子就是 *`i*2+2`*。

3. 一般的二叉树也可以通过补足为完全二叉树后，使用顺序存储结构存储，但是会浪费空间。

### 二叉树的遍历

二叉树主要有两种遍历方式：

- 深度优先遍历：先往深走，遇到叶子节点再往回走。
   - 前序遍历（递归法，迭代法）：根、左子树、右子树
   - 中序遍历（递归法，迭代法）：左子树、根、右子树
   - 后序遍历（递归法，迭代法）：左子树、右子树、根
- 广度优先遍历：一层一层的去遍历。
   - 层次遍历（迭代法）：从上到下，从左到右

![二叉树遍历示例](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/二叉树遍历示例.png)

**遍历二叉树的应用**

1. 输出二叉树中的叶子结点；

2. 求二叉树的深度；

3. 二元运算表达式树及其遍历：

   1. 前序遍历得到前缀表达式；
   2. 中序遍历得到中缀表达式；
   3. 后序遍历得到后缀表达式；
   4. 中缀表达式会受到运算符优先级的影响，通过在中序遍历时，遇到左子树加左括号，右子树加右括号解决。

4. 由两种遍历序列确定二叉树：

   注意：仅有前序遍历和后序遍历无法确定一颗二叉树，前序遍历和后序遍历只可以确定跟结点，中序遍历才可以确定左右子树的顺序；

### 代码实现方式

使用**递归**可以方便地实现前三种遍历；使用**堆栈**可以实现**非递归**遍历算法。

二叉树的**层次遍历**可以通过**队列**实现：

> *遍历从根结点开始，首先将根结点入队，然后开始执行循环：结点出队、访问该结点、其左右儿子入队*

- 前序遍历

::: code-tabs
@tab 递归法
```java
public List<Integer> preorderTraversal(TreeNode root) {
   List<Integer> res = new ArrayList<>();
   if (root == null) {
      return res;
   }
   res.add(root.val);
   res.addAll(preorderTraversal(root.left));
   res.addAll(preorderTraversal(root.right));
   return res;
}
```
@tab 迭代法
```java
/**
 * 1. 访问根结点；
 * 2. 右结点入栈，左结点入栈；那么出栈时，左结点先出然后被访问。
 */
public List<Integer> preorderTraversal(TreeNode root) {
   List<Integer> res = new ArrayList<>();
   if (root == null) {
      return res;
   }
   Deque<TreeNode> stack = new ArrayDeque<>();
   stack.push(root);
   while (!stack.isEmpty()) {
      TreeNode node = stack.pop();
      res.add(node.val);
      // 右结点先入后出
      if (node.right != null) {
            stack.push(node.right);
      }
      if (node.left != null) {
            stack.push(node.left);
      }
   }
   return res;
}
```
:::

- 中序遍历

::: code-tabs
@tab 递归法
```java
public List<Integer> inorderTraversal(TreeNode root) {
   List<Integer> res = new ArrayList();
   if (root == null) {
      return res;
   }
   res.addAll(inorderTraversal(root.left));
   res.add(root.val);
   res.addAll(inorderTraversal(root.right));
   return res;
}
```
@tab 迭代法
```java
/**
 * 中序遍历与前序遍历和后序遍历的方法不同，必须先让最左侧的结点入栈，具体步骤为：
 * 1. 先把当前结点入栈，然后去遍历它的左子树，直至无左子树；
 * 2. 左子树遍历完了（叶子结点无左子树了），再弹出栈顶元素，访问它的值；
 * 3. 然后按其右指针再去中序遍历该结点的右子树。
 */
public List<Integer> inorderTraversal(TreeNode root) {
   List<Integer> res = new ArrayList();
   if (root == null) {
      return res;
   }
   Deque<TreeNode> stack = new ArrayDeque<>();
   TreeNode node = root;
   while (node != null || !stack.isEmpty()) {
      // 左子树入栈
      while (node != null) {
            stack.push(node);
            node = node.left;
      }
      node = stack.pop();
      res.add(node.val);
      // 以当前节点的右子节点为起点再次遍历左子节点
      node = node.right;
   }
   return res;
}
```
:::

- 后序遍历

::: code-tabs
@tab 递归法
```java
public List<Integer> postorderTraversal(TreeNode root) {
   List<Integer> res = new ArrayList();
   if (root == null) {
      return res;
   }
   res.addAll(postorderTraversal(root.left));
   res.addAll(postorderTraversal(root.right));
   res.add(root.val);
   return res;
}
```
@tab 迭代法
```java
/**
 * 后序遍历可以看作是一次相反的前序遍历，只需要将结果到序存储，同时主要左右子树的访问顺序颠倒一下，具体步骤如下：
 * 1. 根结点入栈；
 * 2. 栈非空，就读取栈顶元素，加入结果集的头部，注意是加入头部，这样根结点会在后面，实现后序遍历；
 * 3. 左结点入栈，然后右结点入栈，这样右结点会先出栈，访问后的结果在根结点前面，而左结点的值会在右结点值的前面，从而满足后序遍历要求。
 */
public List<Integer> postorderTraversal(TreeNode root) {
      LinkedList<Integer> res = new LinkedList();
      if (root == null) {
         return res;
      }
      Deque<TreeNode> stack = new ArrayDeque<>();
      stack.push(root);
      while (!stack.isEmpty()) {
         TreeNode node = stack.pop();
         // 注意，使用 LinkedList 的 addFirst 方式，往前面添加
         res.addFirst(node.val);
         if (node.left != null) {
               stack.push(node.left);
         }
         if (node.right != null) {
               stack.push(node.right);
         }
      }
      return res;
   }
```
:::

- 层序遍历

::: code-tabs
@tab 递归法
```java
public List<List<Integer>> levelOrder(TreeNode root) {
   List<List<Integer>> res = new ArrayList<>();
   if (root == null) {
      return res;
   }
   // 将根节点放入第 0 层
   levelOrder(res, root, 0);
   return res;
}

private void levelOrder(List<List<Integer>> result, TreeNode node, int level) {
   if (node == null) {
      return;
   }
   // 如果当前层还没有处理过，则创建一个新的空列表存储当前层的节点
   if (result.size() <= level) {
      result.add(new ArrayList<>());
   }
   // 将当前节点添加到结果列表中
   result.get(level).add(node.val);
   // 递归处理下一层左右子节点
   levelOrder(result, node.left, level + 1);
   levelOrder(result, node.right, level + 1);
}
```
@tab 迭代法
```java

```
:::

## 二叉搜索树（BST）

前面介绍的树，都没有数值的，而二叉搜索树是有数值的了，二叉搜索树是一个有序树。二叉搜索树的定义：

> 一棵二叉树，可以为空；如果不为空，满足以下性质：
>
> 1. 非空左子树的所有键值小于其根结点的键值；
> 2. 非空右子树的所有键值大于其根结点的键值；
> 3. 左、右子树都是二叉搜索树。

![二叉搜索树示例](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/二叉搜索树示例.png)

二叉查找树相比于其他数据结构的优势在于查找、插入的时间复杂度较低为 *O(logn)* 。
二叉查找树是基础性数据结构，用于构建更为抽象的数据结构，如集合、多重集、关联数组等。

## 平衡二叉树-AVL

含有相同节点的二叉查找树可以有不同的形态，而二叉查找树的平均查找长度与树的深度有关，所以需要找出一个查找平均长度最小的一棵，那就是平衡二叉树，具有以下性质：

>1. 要么是棵空树，要么其根节点左右子树的深度之差的绝对值不超过 1；
>2. 其左右子树也都是平衡二叉树；
>3. 二叉树节点的平衡因子定义为该节点的左子树的深度减去右子树的深度。则平衡二叉树的所有节点的平衡因子只可能是 -1,0,1。

## 哈夫曼树（Huffman Tree）

> 给定 N 个权值作为 N 个**叶子**结点，构造一棵二叉树，若该树的带权路径长度达到最小，称这样的二叉树为最优二叉树，也称为哈夫曼树 (Huffman Tree)。
>
> 哈夫曼树是带权路径长度最短的树，权值较大的结点离根较近。

**构造哈夫曼树**

*每次把权值最小的两棵二叉树合并*

**哈夫曼树的特点**

1. 没有度为 1 的结点；
2. n 个叶子结点的哈夫曼树共有 2n-1 个结点；
3. 哈夫曼树的任意非叶节点的左右子树交换后仍是哈夫曼树；
4. 对同一组权值，不同构造的两颗哈夫曼树 WPL 相等。

**哈夫曼编码**

使用二叉树进行编码：

1. 左右分支：0、1
2. 字符只在叶结点上（保证每个字符没有二义，即任何字符的编码都不是另一字符编码的前缀）

当每个字符出现的频率不同时，使用哈夫曼树进行编码，出现频率越高的字母 (也即权值越大)，其编码越短，可以保证在频率加权后的平均编码长度最短，称之为最佳编码，一般就叫做 Huffman 编码。

## 堆

