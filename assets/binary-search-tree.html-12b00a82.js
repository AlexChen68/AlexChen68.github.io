import{_ as o,W as l,X as a,Y as e,a0 as r,Z as n,a1 as s,C as c}from"./framework-d3200c61.js";const i={},h=s('<h2 id="二叉搜索树-bst" tabindex="-1"><a class="header-anchor" href="#二叉搜索树-bst" aria-hidden="true">#</a> 二叉搜索树（BST）</h2><p>前面介绍的树，都没有数值的，而二叉搜索树是有数值的了，二叉搜索树是一个有序树。二叉搜索树的定义：</p><blockquote><p>一棵二叉树，可以为空；如果不为空，满足以下性质：</p><ol><li>非空左子树的所有键值小于其根结点的键值；</li><li>非空右子树的所有键值大于其根结点的键值；</li><li>左、右子树都是二叉搜索树。</li></ol></blockquote><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/二叉搜索树示例.png" alt="二叉搜索树示例" loading="lazy"></p><p>二叉搜索树相比于其他数据结构的优势在于查找、插入的时间复杂度较低为 <em>O(logn)</em> 。</p><p>二叉搜索树是基础性数据结构，用于构建更为抽象的数据结构，如集合、多重集、关联数组等。</p><p>重要特性：</p><ol><li><em>二叉搜索树的中序遍历的结果是有序的</em>。</li><li>在二叉搜索树中搜索值时，可以利用有序的特性判断左右的方向，从而决定递归的方向。</li></ol><h2 id="相关算法题" tabindex="-1"><a class="header-anchor" href="#相关算法题" aria-hidden="true">#</a> 相关算法题</h2>',9),p={href:"https://leetcode.cn/problems/validate-binary-search-tree/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://leetcode.cn/problems/search-in-a-binary-search-tree/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://leetcode.cn/problems/minimum-absolute-difference-in-bst/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://leetcode.cn/problems/find-mode-in-binary-search-tree/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://leetcode.cn/problems/insert-into-a-binary-search-tree/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://leetcode.cn/problems/delete-node-in-a-bst/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://leetcode.cn/problems/trim-a-binary-search-tree/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/",target:"_blank",rel:"noopener noreferrer"},y={href:"https://leetcode.cn/problems/convert-bst-to-greater-tree/",target:"_blank",rel:"noopener noreferrer"};function x(v,B){const t=c("ExternalLinkIcon");return l(),a("div",null,[h,e("ul",null,[e("li",null,[r("二叉搜索树 "),e("ul",null,[e("li",null,[e("a",p,[r("098. 验证二叉搜索树"),n(t)])]),e("li",null,[e("a",d,[r("700. 二叉搜索树中的搜索"),n(t)])]),e("li",null,[e("a",_,[r("530. 二叉搜索树的最小绝对差"),n(t)])]),e("li",null,[e("a",b,[r("501. 二叉搜索树中的众数"),n(t)])]),e("li",null,[e("a",f,[r("235. 二叉搜索树的最近公共祖先"),n(t)])]),e("li",null,[e("a",m,[r("701. 二叉搜索树中的插入操作"),n(t)])]),e("li",null,[e("a",u,[r("450. 删除二叉搜索树中的节点"),n(t)])]),e("li",null,[e("a",g,[r("669. 修剪二叉搜索树"),n(t)])]),e("li",null,[e("a",k,[r("108. 将有序数组转换为二叉搜索树"),n(t)])]),e("li",null,[e("a",y,[r("538. 把二叉搜索树转换为累加树"),n(t)])])])])])])}const V=o(i,[["render",x],["__file","binary-search-tree.html.vue"]]);export{V as default};
