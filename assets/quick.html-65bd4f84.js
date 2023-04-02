import{_ as a,W as t,X as p,Y as n,a0 as e,Z as o,a1 as i,C as c}from"./framework-7c4b0f0a.js";const l={},u={id:"快速排序",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#快速排序","aria-hidden":"true"},"#",-1),d=i(`<ol><li>从数列中挑出一个基准值。</li><li>将所有比基准值小的摆放在基准前面，所有比基准值大的摆在基准的后面 (相同的数可以到任一边)；在这个分区退出之后，该基准就处于数列的中间位置。</li><li>递归地把 &quot;基准值前面的子数列&quot; 和 &quot;基准值后面的子数列&quot; 进行排序。</li></ol><p>其中，将数组分区的算法，有三种常见的方法，具体原理见代码注释：</p><ol><li>双边指针（交换法）</li><li>双边指针（挖坑法）</li><li>单边指针</li></ol><h2 id="演示动画" tabindex="-1"><a class="header-anchor" href="#演示动画" aria-hidden="true">#</a> 演示动画</h2><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/快速排序动画.gif" alt="快速排序动画" loading="lazy"></p><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 快速排序
 * <span class="token keyword">@param</span> <span class="token parameter">arr</span> 待排序数组
 * <span class="token keyword">@param</span> <span class="token parameter">startIndex</span> 左边界
 * <span class="token keyword">@param</span> <span class="token parameter">endIndex</span> 右边界
 */</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> startIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>startIndex <span class="token operator">&gt;=</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 核心算法部分：分别介绍 双边指针（交换法），双边指针（挖坑法），单边指针</span>
    <span class="token keyword">int</span> pivotIndex <span class="token operator">=</span> <span class="token function">doublePointerSwap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> startIndex<span class="token punctuation">,</span> endIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//         int pivotIndex = doublePointerHole(arr, startIndex, endIndex);</span>
<span class="token comment">//         int pivotIndex = singlePointer(arr, startIndex, endIndex);</span>

    <span class="token comment">// 用分界值下标区分出左右区间，进行递归调用</span>
    <span class="token function">sort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> startIndex<span class="token punctuation">,</span> pivotIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> pivotIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> endIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 双边指针（交换法）
 * 思路：
 * 记录分界值 pivot，创建左右指针（记录下标）。
 * （分界值选择方式有：首元素，随机选取，三数取中法）
 *
 * 首先从右向左找出比 pivot 小的数据，
 * 然后从左向右找出比 pivot 大的数据，
 * 左右指针数据交换，进入下次循环。
 *
 * 结束循环后将当前指针数据与分界值互换，
 * 返回当前指针下标（即分界值下标）
 */</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">doublePointerSwap</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> startIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> pivot <span class="token operator">=</span> arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> leftPoint <span class="token operator">=</span> startIndex<span class="token punctuation">;</span>
    <span class="token keyword">int</span> rightPoint <span class="token operator">=</span> endIndex<span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 从右向左找出比 pivot 小的数据</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint
                <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">&gt;</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 表示当前右边界的值大于分界值，右边界还可以往左边移动</span>
            rightPoint<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 从左向右找出比 pivot 大的数据</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint
                <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 表示当前左边界的值小于等于分界值，左边界还可以往右边移动</span>
            leftPoint<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 没有过界则交换</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 此时 leftPoint = rightPoint，都是分界值应该在的位置</span>
    <span class="token comment">// 最终将分界值与当前指针数据交换，即将边界值放到了中间，左边的比它小，右边的比它大</span>
    arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">=</span> pivot<span class="token punctuation">;</span>
    <span class="token comment">// 返回分界值所在下标</span>
    <span class="token keyword">return</span> rightPoint<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 双边指针（挖坑法）
 * 思路：
 * 创建左右指针。
 * 记录左指针数据为分界值 pivot，
 * 此时左指针视为&quot;坑&quot;，里面的数据可以被覆盖。
 *
 * 首先从右向左找出比 pivot 小的数据，
 * 找到后立即放入左边坑中，当前位置变为新的&quot;坑&quot;，
 * 然后从左向右找出比 pivot 大的数据，
 * 找到后立即放入右边坑中，当前位置变为新的&quot;坑&quot;，
 *
 * 结束循环后将最开始存储的分界值放入当前的&quot;坑&quot;中，
 * 返回当前&quot;坑&quot;下标（即分界值下标）
 */</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">doublePointerHole</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> startIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> pivot <span class="token operator">=</span> arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> leftPoint <span class="token operator">=</span> startIndex<span class="token punctuation">;</span>
    <span class="token keyword">int</span> rightPoint <span class="token operator">=</span> endIndex<span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 从右向左找出比 pivot 小的数据，</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint
                <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">&gt;</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            rightPoint<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 找到后立即放入左边坑中，当前位置变为新的&quot;坑&quot;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
            leftPoint<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 从左向右找出比 pivot 大的数据</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint
                <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            leftPoint<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 找到后立即放入右边坑中，当前位置变为新的&quot;坑&quot;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
            rightPoint<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 将最开始存储的分界值放入当前的&quot;坑&quot;中</span>
    arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">=</span> pivot<span class="token punctuation">;</span>
    <span class="token keyword">return</span> rightPoint<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 单边指针
 * 思路：
 * 记录首元素为分界值 pivot, 创建标记 mark 指针。
 * 循环遍历与分界值对比。
 * 比分界值小，则 mark++ 后与之互换。
 * 结束循环后，将首元素分界值与当前 mark 互换。
 * 返回 mark 下标为分界值下标。
 */</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">singlePointer</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> startIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> pivot <span class="token operator">=</span> arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> markPoint <span class="token operator">=</span> startIndex<span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> startIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> endIndex<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果比分界值小，则 mark++ 后互换。</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            markPoint<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>markPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>markPoint<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 将首元素分界值与当前 mark 互换</span>
    arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>markPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr<span class="token punctuation">[</span>markPoint<span class="token punctuation">]</span> <span class="token operator">=</span> pivot<span class="token punctuation">;</span>
    <span class="token keyword">return</span> markPoint<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析" aria-hidden="true">#</a> 复杂度分析</h2><ul><li>时间复杂度：<em>O(nlog<sub>2</sub>n)</em></li><li>空间复杂度：<em>O(nlog<sub>2</sub>n)</em></li></ul>`,9);function k(v,m){const s=c("Badge");return t(),p("div",null,[n("h2",u,[r,e(" 快速排序 "),o(s,{text:"推荐",type:"tip"})]),d])}const h=a(l,[["render",k],["__file","quick.html.vue"]]);export{h as default};
