import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.01af844e.js";const D=JSON.parse('{"title":"交换排序 - 快速排序","description":"","frontmatter":{"title":"交换排序 - 快速排序","date":"2023-02-21T00:00:00.000Z"},"headers":[],"relativePath":"advance/algo/sort-1.2-quick.md","filePath":"advance/algo/sort-1.2-quick.md","lastUpdated":1699602333000}'),p={name:"advance/algo/sort-1.2-quick.md"},o=l(`<h2 id="算法简介" tabindex="-1">算法简介 <a class="header-anchor" href="#算法简介" aria-label="Permalink to &quot;算法简介&quot;">​</a></h2><p>快速排序是由东尼·霍尔所发展的一种排序算法。在平均状况下，排序 n 个项目要 Ο(nlogn) 次比较。在最坏状况下则需要 Ο(n2) 次比较，但这种状况并不常见。事实上，快速排序通常明显比其他 Ο(nlogn) 算法更快，因为它的内部循环（inner loop）可以在大部分的架构上很有效率地被实现出来。</p><p>快速排序使用分治法（Divide and conquer）策略来把一个串行（list）分为两个子串行（sub-lists）。</p><p>快速排序又是一种分而治之思想在排序算法上的典型应用。本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。</p><blockquote><p>快速排序的最坏运行情况是 O(n²)，比如说顺序数列的快排。但它的平摊期望时间是 O(nlogn)，且 O(nlogn) 记号中隐含的常数因子很小，比复杂度稳定等于 O(nlogn) 的归并排序要小很多。所以，对绝大多数顺序性较弱的随机数列而言，快速排序总是优于归并排序。</p></blockquote><h2 id="排序步骤" tabindex="-1">排序步骤 <a class="header-anchor" href="#排序步骤" aria-label="Permalink to &quot;排序步骤&quot;">​</a></h2><ol><li>从数列中挑出一个基准值。</li><li>将所有比基准值小的摆放在基准前面，所有比基准值大的摆在基准的后面 (相同的数可以到任一边)；在这个分区退出之后，该基准就处于数列的中间位置。</li><li>递归地把 &quot;基准值前面的子数列&quot; 和 &quot;基准值后面的子数列&quot; 进行排序。</li></ol><p>其中，将数组分区的算法，有三种常见的方法，具体原理见代码注释：</p><ol><li>双边指针（交换法）</li><li>双边指针（挖坑法）</li><li>单边指针</li></ol><h2 id="演示动画" tabindex="-1">演示动画 <a class="header-anchor" href="#演示动画" aria-label="Permalink to &quot;演示动画&quot;">​</a></h2><p><img src="https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/advance/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F.gif" alt="快速排序动画"></p><h2 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h2><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">QuickSort</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">[] ints </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> RandomUtil.</span><span style="color:#B392F0;">randomInts</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Before: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> Arrays.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">(ints));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;">(ints);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;After:  &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> Arrays.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">(ints));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;">(a, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, a.length</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 快速排序</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">arr</span><span style="color:#6A737D;"> 待排序数组</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">startIndex</span><span style="color:#6A737D;"> 左边界</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">endIndex</span><span style="color:#6A737D;"> 右边界</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">startIndex</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">endIndex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (startIndex </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> endIndex) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 核心算法部分：分别介绍 双边指针（交换法），双边指针（挖坑法），单边指针</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> pivotIndex </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doublePointerSwap</span><span style="color:#E1E4E8;">(arr, startIndex, endIndex);</span></span>
<span class="line"><span style="color:#6A737D;">//        int pivotIndex = doublePointerHole(arr, startIndex, endIndex);</span></span>
<span class="line"><span style="color:#6A737D;">//        int pivotIndex = singlePointer(arr, startIndex, endIndex);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 用分界值下标区分出左右区间，进行递归调用</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;">(arr, startIndex, pivotIndex </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;">(arr, pivotIndex </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, endIndex);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 双边指针（交换法）</span></span>
<span class="line"><span style="color:#6A737D;">     * 思路：</span></span>
<span class="line"><span style="color:#6A737D;">     * 记录分界值 pivot，创建左右指针（记录下标）。</span></span>
<span class="line"><span style="color:#6A737D;">     * （分界值选择方式有：首元素，随机选取，三数取中法）</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * 首先从右向左找出比 pivot 小的数据，</span></span>
<span class="line"><span style="color:#6A737D;">     * 然后从左向右找出比 pivot 大的数据，</span></span>
<span class="line"><span style="color:#6A737D;">     * 左右指针数据交换，进入下次循环。</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * 结束循环后将当前指针数据与分界值互换，</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回当前指针下标（即分界值下标）</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doublePointerSwap</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">startIndex</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">endIndex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> pivot </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[startIndex];</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> leftPoint </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> startIndex;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> rightPoint </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> endIndex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (leftPoint </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> rightPoint) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 从右向左找出比 pivot 小的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (leftPoint </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> rightPoint</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> arr[rightPoint] </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> pivot) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 表示当前右边界的值大于分界值，右边界还可以往左边移动</span></span>
<span class="line"><span style="color:#E1E4E8;">                rightPoint</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 从左向右找出比 pivot 大的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (leftPoint </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> rightPoint</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> arr[leftPoint] </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> pivot) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 表示当前左边界的值小于等于分界值，左边界还可以往右边移动</span></span>
<span class="line"><span style="color:#E1E4E8;">                leftPoint</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 没有过界则交换</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (leftPoint </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> rightPoint) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> temp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[leftPoint];</span></span>
<span class="line"><span style="color:#E1E4E8;">                arr[leftPoint] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[rightPoint];</span></span>
<span class="line"><span style="color:#E1E4E8;">                arr[rightPoint] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> temp;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 此时 leftPoint = rightPoint，都是分界值应该在的位置</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 最终将分界值与当前指针数据交换，即将边界值放到了中间，左边的比它小，右边的比它大</span></span>
<span class="line"><span style="color:#E1E4E8;">        arr[startIndex] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[rightPoint];</span></span>
<span class="line"><span style="color:#E1E4E8;">        arr[rightPoint] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pivot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 返回分界值所在下标</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> rightPoint;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 双边指针（挖坑法）</span></span>
<span class="line"><span style="color:#6A737D;">     * 思路：</span></span>
<span class="line"><span style="color:#6A737D;">     * 创建左右指针。</span></span>
<span class="line"><span style="color:#6A737D;">     * 记录左指针数据为分界值 pivot，</span></span>
<span class="line"><span style="color:#6A737D;">     * 此时左指针视为&quot;坑&quot;，里面的数据可以被覆盖。</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * 首先从右向左找出比 pivot 小的数据，</span></span>
<span class="line"><span style="color:#6A737D;">     * 找到后立即放入左边坑中，当前位置变为新的&quot;坑&quot;，</span></span>
<span class="line"><span style="color:#6A737D;">     * 然后从左向右找出比 pivot 大的数据，</span></span>
<span class="line"><span style="color:#6A737D;">     * 找到后立即放入右边坑中，当前位置变为新的&quot;坑&quot;，</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * 结束循环后将最开始存储的分界值放入当前的&quot;坑&quot;中，</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回当前&quot;坑&quot;下标（即分界值下标）</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doublePointerHole</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">startIndex</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">endIndex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> pivot </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[startIndex];</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> leftPoint </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> startIndex;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> rightPoint </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> endIndex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (leftPoint </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> rightPoint) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 从右向左找出比 pivot 小的数据，</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (leftPoint </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> rightPoint</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> arr[rightPoint] </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> pivot) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                rightPoint</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 找到后立即放入左边坑中，当前位置变为新的&quot;坑&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (leftPoint </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> rightPoint) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                arr[leftPoint] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[rightPoint];</span></span>
<span class="line"><span style="color:#E1E4E8;">                leftPoint</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 从左向右找出比 pivot 大的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (leftPoint </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> rightPoint</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> arr[leftPoint] </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> pivot) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                leftPoint</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 找到后立即放入右边坑中，当前位置变为新的&quot;坑&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (leftPoint </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> rightPoint) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                arr[rightPoint] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[leftPoint];</span></span>
<span class="line"><span style="color:#E1E4E8;">                rightPoint</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 将最开始存储的分界值放入当前的&quot;坑&quot;中</span></span>
<span class="line"><span style="color:#E1E4E8;">        arr[rightPoint] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pivot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> rightPoint;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 单边指针</span></span>
<span class="line"><span style="color:#6A737D;">     * 思路：</span></span>
<span class="line"><span style="color:#6A737D;">     * 记录首元素为分界值 pivot, 创建标记 mark 指针。</span></span>
<span class="line"><span style="color:#6A737D;">     * 循环遍历与分界值对比。</span></span>
<span class="line"><span style="color:#6A737D;">     * 比分界值小，则 mark++ 后与之互换。</span></span>
<span class="line"><span style="color:#6A737D;">     * 结束循环后，将首元素分界值与当前 mark 互换。</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回 mark 下标为分界值下标。</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">singlePointer</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">startIndex</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">endIndex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> pivot </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[startIndex];</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> markPoint </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> startIndex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> startIndex </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> endIndex; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 如果比分界值小，则 mark++ 后互换。</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (arr[i] </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> pivot) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                markPoint</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> temp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[markPoint];</span></span>
<span class="line"><span style="color:#E1E4E8;">                arr[markPoint] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">                arr[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> temp;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 将首元素分界值与当前 mark 互换</span></span>
<span class="line"><span style="color:#E1E4E8;">        arr[startIndex] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[markPoint];</span></span>
<span class="line"><span style="color:#E1E4E8;">        arr[markPoint] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pivot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> markPoint;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">QuickSort</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">[] ints </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> RandomUtil.</span><span style="color:#6F42C1;">randomInts</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">16</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Before: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> Arrays.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">(ints));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;">(ints);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;After:  &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> Arrays.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">(ints));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">a</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;">(a, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, a.length</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 快速排序</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">arr</span><span style="color:#6A737D;"> 待排序数组</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">startIndex</span><span style="color:#6A737D;"> 左边界</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">endIndex</span><span style="color:#6A737D;"> 右边界</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">startIndex</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">endIndex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (startIndex </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> endIndex) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 核心算法部分：分别介绍 双边指针（交换法），双边指针（挖坑法），单边指针</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> pivotIndex </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doublePointerSwap</span><span style="color:#24292E;">(arr, startIndex, endIndex);</span></span>
<span class="line"><span style="color:#6A737D;">//        int pivotIndex = doublePointerHole(arr, startIndex, endIndex);</span></span>
<span class="line"><span style="color:#6A737D;">//        int pivotIndex = singlePointer(arr, startIndex, endIndex);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 用分界值下标区分出左右区间，进行递归调用</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;">(arr, startIndex, pivotIndex </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;">(arr, pivotIndex </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, endIndex);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 双边指针（交换法）</span></span>
<span class="line"><span style="color:#6A737D;">     * 思路：</span></span>
<span class="line"><span style="color:#6A737D;">     * 记录分界值 pivot，创建左右指针（记录下标）。</span></span>
<span class="line"><span style="color:#6A737D;">     * （分界值选择方式有：首元素，随机选取，三数取中法）</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * 首先从右向左找出比 pivot 小的数据，</span></span>
<span class="line"><span style="color:#6A737D;">     * 然后从左向右找出比 pivot 大的数据，</span></span>
<span class="line"><span style="color:#6A737D;">     * 左右指针数据交换，进入下次循环。</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * 结束循环后将当前指针数据与分界值互换，</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回当前指针下标（即分界值下标）</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doublePointerSwap</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">startIndex</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">endIndex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> pivot </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[startIndex];</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> leftPoint </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> startIndex;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> rightPoint </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> endIndex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (leftPoint </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> rightPoint) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 从右向左找出比 pivot 小的数据</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (leftPoint </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> rightPoint</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> arr[rightPoint] </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> pivot) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 表示当前右边界的值大于分界值，右边界还可以往左边移动</span></span>
<span class="line"><span style="color:#24292E;">                rightPoint</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 从左向右找出比 pivot 大的数据</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (leftPoint </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> rightPoint</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> arr[leftPoint] </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> pivot) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 表示当前左边界的值小于等于分界值，左边界还可以往右边移动</span></span>
<span class="line"><span style="color:#24292E;">                leftPoint</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 没有过界则交换</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (leftPoint </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> rightPoint) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> temp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[leftPoint];</span></span>
<span class="line"><span style="color:#24292E;">                arr[leftPoint] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[rightPoint];</span></span>
<span class="line"><span style="color:#24292E;">                arr[rightPoint] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> temp;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 此时 leftPoint = rightPoint，都是分界值应该在的位置</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 最终将分界值与当前指针数据交换，即将边界值放到了中间，左边的比它小，右边的比它大</span></span>
<span class="line"><span style="color:#24292E;">        arr[startIndex] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[rightPoint];</span></span>
<span class="line"><span style="color:#24292E;">        arr[rightPoint] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pivot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 返回分界值所在下标</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> rightPoint;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 双边指针（挖坑法）</span></span>
<span class="line"><span style="color:#6A737D;">     * 思路：</span></span>
<span class="line"><span style="color:#6A737D;">     * 创建左右指针。</span></span>
<span class="line"><span style="color:#6A737D;">     * 记录左指针数据为分界值 pivot，</span></span>
<span class="line"><span style="color:#6A737D;">     * 此时左指针视为&quot;坑&quot;，里面的数据可以被覆盖。</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * 首先从右向左找出比 pivot 小的数据，</span></span>
<span class="line"><span style="color:#6A737D;">     * 找到后立即放入左边坑中，当前位置变为新的&quot;坑&quot;，</span></span>
<span class="line"><span style="color:#6A737D;">     * 然后从左向右找出比 pivot 大的数据，</span></span>
<span class="line"><span style="color:#6A737D;">     * 找到后立即放入右边坑中，当前位置变为新的&quot;坑&quot;，</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * 结束循环后将最开始存储的分界值放入当前的&quot;坑&quot;中，</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回当前&quot;坑&quot;下标（即分界值下标）</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doublePointerHole</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">startIndex</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">endIndex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> pivot </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[startIndex];</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> leftPoint </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> startIndex;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> rightPoint </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> endIndex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (leftPoint </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> rightPoint) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 从右向左找出比 pivot 小的数据，</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (leftPoint </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> rightPoint</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> arr[rightPoint] </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> pivot) {</span></span>
<span class="line"><span style="color:#24292E;">                rightPoint</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 找到后立即放入左边坑中，当前位置变为新的&quot;坑&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (leftPoint </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> rightPoint) {</span></span>
<span class="line"><span style="color:#24292E;">                arr[leftPoint] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[rightPoint];</span></span>
<span class="line"><span style="color:#24292E;">                leftPoint</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 从左向右找出比 pivot 大的数据</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (leftPoint </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> rightPoint</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> arr[leftPoint] </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> pivot) {</span></span>
<span class="line"><span style="color:#24292E;">                leftPoint</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 找到后立即放入右边坑中，当前位置变为新的&quot;坑&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (leftPoint </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> rightPoint) {</span></span>
<span class="line"><span style="color:#24292E;">                arr[rightPoint] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[leftPoint];</span></span>
<span class="line"><span style="color:#24292E;">                rightPoint</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 将最开始存储的分界值放入当前的&quot;坑&quot;中</span></span>
<span class="line"><span style="color:#24292E;">        arr[rightPoint] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pivot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> rightPoint;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 单边指针</span></span>
<span class="line"><span style="color:#6A737D;">     * 思路：</span></span>
<span class="line"><span style="color:#6A737D;">     * 记录首元素为分界值 pivot, 创建标记 mark 指针。</span></span>
<span class="line"><span style="color:#6A737D;">     * 循环遍历与分界值对比。</span></span>
<span class="line"><span style="color:#6A737D;">     * 比分界值小，则 mark++ 后与之互换。</span></span>
<span class="line"><span style="color:#6A737D;">     * 结束循环后，将首元素分界值与当前 mark 互换。</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回 mark 下标为分界值下标。</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">singlePointer</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">startIndex</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">endIndex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> pivot </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[startIndex];</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> markPoint </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> startIndex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> startIndex </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> endIndex; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 如果比分界值小，则 mark++ 后互换。</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (arr[i] </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> pivot) {</span></span>
<span class="line"><span style="color:#24292E;">                markPoint</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> temp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[markPoint];</span></span>
<span class="line"><span style="color:#24292E;">                arr[markPoint] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[i];</span></span>
<span class="line"><span style="color:#24292E;">                arr[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> temp;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 将首元素分界值与当前 mark 互换</span></span>
<span class="line"><span style="color:#24292E;">        arr[startIndex] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[markPoint];</span></span>
<span class="line"><span style="color:#24292E;">        arr[markPoint] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pivot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> markPoint;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br></div></div><h2 id="复杂度分析" tabindex="-1">复杂度分析 <a class="header-anchor" href="#复杂度分析" aria-label="Permalink to &quot;复杂度分析&quot;">​</a></h2><ul><li>时间复杂度：<em>O(nlog~2~n)</em></li><li>空间复杂度：<em>O(nlog~2~n)</em></li></ul>`,15),e=[o];function r(t,c,E,y,i,b){return n(),a("div",null,e)}const u=s(p,[["render",r]]);export{D as __pageData,u as default};
