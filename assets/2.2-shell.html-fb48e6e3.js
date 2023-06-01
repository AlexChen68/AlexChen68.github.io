import{_ as n,W as s,X as a,a1 as p}from"./framework-ea95e8eb.js";const t={},o=p(`<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>希尔排序，也称递减增量排序算法，是<strong>直接插入排序</strong>的一种更高效的改进版本。但希尔排序是非稳定排序算法。</p><p>希尔排序是基于插入排序的以下两点性质而提出改进方法的：</p><ul><li>插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到线性排序的效率；</li><li>但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位；</li></ul><p>希尔排序的基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录&quot;基本有序&quot;时，再对全体记录进行依次直接插入排序。</p><h2 id="排序步骤" tabindex="-1"><a class="header-anchor" href="#排序步骤" aria-hidden="true">#</a> 排序步骤</h2><ol><li>对于 n 个待排序的数列，取一个小于 n 的整数 gap(gap 被称为步长) 将待排序元素分成若干个组子序列，所有距离为 gap 的倍数的记录放在同一个组中；</li><li>然后，对各组内的元素进行直接插入排序；这一趟排序完成之后，每一个组的元素都是有序的。</li><li>减小 gap 的值，并重复执行上述的分组和排序。</li><li>当 gap 的值减少到等于 1 时，整个数组就是有序的了。</li></ol><h2 id="演示动画" tabindex="-1"><a class="header-anchor" href="#演示动画" aria-hidden="true">#</a> 演示动画</h2><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/希尔排序.gif" alt="希尔排序动画" loading="lazy"></p><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShellSort</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ints <span class="token operator">=</span> <span class="token class-name">RandomUtil</span><span class="token punctuation">.</span><span class="token function">randomInts</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Before: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>ints<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">sort</span><span class="token punctuation">(</span>ints<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;After:  &quot;</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>ints<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> n <span class="token operator">=</span> a<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token comment">// gap 依次除以 2，直至等于 1</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> gap <span class="token operator">=</span> n <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">;</span> gap <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span> gap <span class="token operator">=</span> gap <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 对每个步长使用直接插入排序</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> gap<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 插入排序，从 i+gap 开始，每个元素索引加 gap 位</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> i <span class="token operator">+</span> gap<span class="token punctuation">;</span> j <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> j <span class="token operator">+=</span> gap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">int</span> temp <span class="token operator">=</span> a<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    <span class="token keyword">int</span> position <span class="token operator">=</span> j <span class="token operator">-</span> gap<span class="token punctuation">;</span>
                    <span class="token keyword">while</span> <span class="token punctuation">(</span>position <span class="token operator">&gt;=</span> i <span class="token operator">&amp;&amp;</span> a<span class="token punctuation">[</span>position<span class="token punctuation">]</span> <span class="token operator">&gt;</span> temp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        a<span class="token punctuation">[</span>position <span class="token operator">+</span> gap<span class="token punctuation">]</span> <span class="token operator">=</span> a<span class="token punctuation">[</span>position<span class="token punctuation">]</span><span class="token punctuation">;</span>
                        position <span class="token operator">-=</span> gap<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    a<span class="token punctuation">[</span>position <span class="token operator">+</span> gap<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析" aria-hidden="true">#</a> 复杂度分析</h2><ul><li>时间复杂度：<em>O(n<sup>1.3</sup>)</em></li><li>空间复杂度：<em>O(1)</em></li></ul>`,13),e=[o];function c(l,i){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","2.2-shell.html.vue"]]);export{r as default};