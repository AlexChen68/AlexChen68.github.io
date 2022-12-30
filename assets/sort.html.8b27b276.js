import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as t,b as p,f as e}from"./app.fdaad276.js";const o={},i=p("p",null,"\u6392\u5E8F\u7B97\u6CD5",-1),c=e(`<h2 id="\u5192\u6CE1\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u5192\u6CE1\u6392\u5E8F" aria-hidden="true">#</a> \u5192\u6CE1\u6392\u5E8F</h2><p><strong>\u539F\u7406</strong></p><ol><li>\u4ECE\u5934\u904D\u5386\u6570\u5217\uFF0C\u4ECE\u524D\u5F80\u540E\u4F9D\u6B21\u7684\u6BD4\u8F83\u76F8\u90BB\u4E24\u4E2A\u6570\u7684\u5927\u5C0F\uFF0C\u5982\u679C\u524D\u8005\u6BD4\u540E\u8005\u5927\uFF0C\u5219\u4EA4\u6362\u5B83\u4EEC\u7684\u4F4D\u7F6E\uFF0C\u904D\u5386\u4E00\u6B21\u540E\uFF0C\u53EF\u6700\u5927\u7684\u5143\u7D20\u5C31\u5728\u6570\u5217\u7684\u672B\u5C3E\uFF1B</li><li>\u91CD\u590D\u4E0A\u8FF0\u64CD\u4F5C\uFF0C\u6BCF\u4E00\u6B21\u904D\u5386\u53EF\u4EE5\u5F97\u5230\u5B50\u6570\u5217\u7684\u6700\u5927\u503C\u653E\u5230\u8BE5\u5B50\u6570\u5217\u7684\u672B\u5C3E\uFF0C\u76F4\u5230\u6574\u4E2A\u6570\u5217\u90FD\u6709\u5E8F\u4E3A\u6B62\u3002</li></ol><p>\u65F6\u95F4\u590D\u6742\u5EA6\uFF1AO(N^2) \u7A7A\u95F4\u590D\u6742\u5EA6\uFF1AO(N)</p><p><strong>\u4EE3\u7801\u5B9E\u73B0</strong></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> n <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> flag <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token comment">// i \u4ECE n-1 \u5230 0\uFF0C\u4EE3\u8868\u4E00\u6B21\u5185\u5FAA\u73AF\u786E\u5B9A\u7684\u4E0B\u6807</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// j \u4ECE 0 \u5230 i-1</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> arr<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// \u4EA4\u6362\u5143\u7D20</span>
                <span class="token keyword">int</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                arr<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
                flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u5982\u679C\u6CA1\u6709\u53D1\u751F\u4EA4\u6362\uFF0C\u8BF4\u660E\u6570\u7EC4\u5DF2\u7ECF\u6709\u5E8F\u4E86</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>flag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5FEB\u901F\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u901F\u6392\u5E8F" aria-hidden="true">#</a> \u5FEB\u901F\u6392\u5E8F</h2><p><strong>\u539F\u7406</strong></p><ol><li>\u4ECE\u6570\u5217\u4E2D\u6311\u51FA\u4E00\u4E2A\u57FA\u51C6\u503C\u3002</li><li>\u5C06\u6240\u6709\u6BD4\u57FA\u51C6\u503C\u5C0F\u7684\u6446\u653E\u5728\u57FA\u51C6\u524D\u9762\uFF0C\u6240\u6709\u6BD4\u57FA\u51C6\u503C\u5927\u7684\u6446\u5728\u57FA\u51C6\u7684\u540E\u9762 (\u76F8\u540C\u7684\u6570\u53EF\u4EE5\u5230\u4EFB\u4E00\u8FB9)\uFF1B\u5728\u8FD9\u4E2A\u5206\u533A\u9000\u51FA\u4E4B\u540E\uFF0C\u8BE5\u57FA\u51C6\u5C31\u5904\u4E8E\u6570\u5217\u7684\u4E2D\u95F4\u4F4D\u7F6E\u3002</li><li>\u9012\u5F52\u5730\u628A &quot;\u57FA\u51C6\u503C\u524D\u9762\u7684\u5B50\u6570\u5217&quot; \u548C &quot;\u57FA\u51C6\u503C\u540E\u9762\u7684\u5B50\u6570\u5217&quot; \u8FDB\u884C\u6392\u5E8F\u3002</li></ol><p>\u5176\u4E2D\uFF0C\u5C06\u6570\u7EC4\u5206\u533A\u7684\u7B97\u6CD5\uFF0C\u6709\u4E09\u79CD\u5E38\u89C1\u7684\u65B9\u6CD5\uFF0C\u5177\u4F53\u539F\u7406\u89C1\u4EE3\u7801\u6CE8\u91CA\uFF1A</p><ol><li>\u53CC\u8FB9\u6307\u9488\uFF08\u4EA4\u6362\u6CD5\uFF09</li><li>\u53CC\u8FB9\u6307\u9488\uFF08\u6316\u5751\u6CD5\uFF09</li><li>\u5355\u8FB9\u6307\u9488</li></ol><p><strong>\u4EE3\u7801\u5B9E\u73B0</strong></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**
     * \u5FEB\u901F\u6392\u5E8F
     * <span class="token keyword">@param</span> <span class="token parameter">arr</span> \u5F85\u6392\u5E8F\u6570\u7EC4
     * <span class="token keyword">@param</span> <span class="token parameter">startIndex</span> \u5DE6\u8FB9\u754C
     * <span class="token keyword">@param</span> <span class="token parameter">endIndex</span> \u53F3\u8FB9\u754C
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> startIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>startIndex <span class="token operator">&gt;=</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u6838\u5FC3\u7B97\u6CD5\u90E8\u5206\uFF1A\u5206\u522B\u4ECB\u7ECD \u53CC\u8FB9\u6307\u9488\uFF08\u4EA4\u6362\u6CD5\uFF09\uFF0C\u53CC\u8FB9\u6307\u9488\uFF08\u6316\u5751\u6CD5\uFF09\uFF0C\u5355\u8FB9\u6307\u9488</span>
        <span class="token keyword">int</span> pivotIndex <span class="token operator">=</span> <span class="token function">doublePointerSwap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> startIndex<span class="token punctuation">,</span> endIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//         int pivotIndex = doublePointerHole(arr, startIndex, endIndex);</span>
<span class="token comment">//         int pivotIndex = singlePointer(arr, startIndex, endIndex);</span>

        <span class="token comment">// \u7528\u5206\u754C\u503C\u4E0B\u6807\u533A\u5206\u51FA\u5DE6\u53F3\u533A\u95F4\uFF0C\u8FDB\u884C\u9012\u5F52\u8C03\u7528</span>
        <span class="token function">sort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> startIndex<span class="token punctuation">,</span> pivotIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">sort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> pivotIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> endIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u53CC\u8FB9\u6307\u9488\uFF08\u4EA4\u6362\u6CD5\uFF09
     * \u601D\u8DEF\uFF1A
     * \u8BB0\u5F55\u5206\u754C\u503C pivot\uFF0C\u521B\u5EFA\u5DE6\u53F3\u6307\u9488\uFF08\u8BB0\u5F55\u4E0B\u6807\uFF09\u3002
     * \uFF08\u5206\u754C\u503C\u9009\u62E9\u65B9\u5F0F\u6709\uFF1A\u9996\u5143\u7D20\uFF0C\u968F\u673A\u9009\u53D6\uFF0C\u4E09\u6570\u53D6\u4E2D\u6CD5\uFF09
     *
     * \u9996\u5148\u4ECE\u53F3\u5411\u5DE6\u627E\u51FA\u6BD4pivot\u5C0F\u7684\u6570\u636E\uFF0C
     * \u7136\u540E\u4ECE\u5DE6\u5411\u53F3\u627E\u51FA\u6BD4pivot\u5927\u7684\u6570\u636E\uFF0C
     * \u5DE6\u53F3\u6307\u9488\u6570\u636E\u4EA4\u6362\uFF0C\u8FDB\u5165\u4E0B\u6B21\u5FAA\u73AF\u3002
     *
     * \u7ED3\u675F\u5FAA\u73AF\u540E\u5C06\u5F53\u524D\u6307\u9488\u6570\u636E\u4E0E\u5206\u754C\u503C\u4E92\u6362\uFF0C
     * \u8FD4\u56DE\u5F53\u524D\u6307\u9488\u4E0B\u6807\uFF08\u5373\u5206\u754C\u503C\u4E0B\u6807\uFF09
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">doublePointerSwap</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> startIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> pivot <span class="token operator">=</span> arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> leftPoint <span class="token operator">=</span> startIndex<span class="token punctuation">;</span>
        <span class="token keyword">int</span> rightPoint <span class="token operator">=</span> endIndex<span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// \u4ECE\u53F3\u5411\u5DE6\u627E\u51FA\u6BD4 pivot \u5C0F\u7684\u6570\u636E</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint
                    <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">&gt;</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// \u8868\u793A\u5F53\u524D\u53F3\u8FB9\u754C\u7684\u503C\u5927\u4E8E\u5206\u754C\u503C\uFF0C\u53F3\u8FB9\u754C\u8FD8\u53EF\u4EE5\u5F80\u5DE6\u8FB9\u79FB\u52A8</span>
                rightPoint<span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// \u4ECE\u5DE6\u5411\u53F3\u627E\u51FA\u6BD4pivot\u5927\u7684\u6570\u636E</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint
                    <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// \u8868\u793A\u5F53\u524D\u5DE6\u8FB9\u754C\u7684\u503C\u5C0F\u4E8E\u7B49\u4E8E\u5206\u754C\u503C\uFF0C\u5DE6\u8FB9\u754C\u8FD8\u53EF\u4EE5\u5F80\u53F3\u8FB9\u79FB\u52A8</span>
                leftPoint<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// \u6CA1\u6709\u8FC7\u754C\u5219\u4EA4\u6362</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
                arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
                arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u6B64\u65F6 leftPoint = rightPoint\uFF0C\u90FD\u662F\u5206\u754C\u503C\u5E94\u8BE5\u5728\u7684\u4F4D\u7F6E</span>
        <span class="token comment">// \u6700\u7EC8\u5C06\u5206\u754C\u503C\u4E0E\u5F53\u524D\u6307\u9488\u6570\u636E\u4EA4\u6362\uFF0C\u5373\u5C06\u8FB9\u754C\u503C\u653E\u5230\u4E86\u4E2D\u95F4\uFF0C\u5DE6\u8FB9\u7684\u6BD4\u5B83\u5C0F\uFF0C\u53F3\u8FB9\u7684\u6BD4\u5B83\u5927</span>
        arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
        arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">=</span> pivot<span class="token punctuation">;</span>
        <span class="token comment">// \u8FD4\u56DE\u5206\u754C\u503C\u6240\u5728\u4E0B\u6807</span>
        <span class="token keyword">return</span> rightPoint<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u53CC\u8FB9\u6307\u9488\uFF08\u6316\u5751\u6CD5\uFF09
     * \u601D\u8DEF\uFF1A
     * \u521B\u5EFA\u5DE6\u53F3\u6307\u9488\u3002
     * \u8BB0\u5F55\u5DE6\u6307\u9488\u6570\u636E\u4E3A\u5206\u754C\u503C pivot\uFF0C
     * \u6B64\u65F6\u5DE6\u6307\u9488\u89C6\u4E3A&quot;\u5751&quot;\uFF0C\u91CC\u9762\u7684\u6570\u636E\u53EF\u4EE5\u88AB\u8986\u76D6\u3002
     *
     * \u9996\u5148\u4ECE\u53F3\u5411\u5DE6\u627E\u51FA\u6BD4pivot\u5C0F\u7684\u6570\u636E\uFF0C
     * \u627E\u5230\u540E\u7ACB\u5373\u653E\u5165\u5DE6\u8FB9\u5751\u4E2D\uFF0C\u5F53\u524D\u4F4D\u7F6E\u53D8\u4E3A\u65B0\u7684&quot;\u5751&quot;\uFF0C
     * \u7136\u540E\u4ECE\u5DE6\u5411\u53F3\u627E\u51FA\u6BD4pivot\u5927\u7684\u6570\u636E\uFF0C
     * \u627E\u5230\u540E\u7ACB\u5373\u653E\u5165\u53F3\u8FB9\u5751\u4E2D\uFF0C\u5F53\u524D\u4F4D\u7F6E\u53D8\u4E3A\u65B0\u7684&quot;\u5751&quot;\uFF0C
     *
     * \u7ED3\u675F\u5FAA\u73AF\u540E\u5C06\u6700\u5F00\u59CB\u5B58\u50A8\u7684\u5206\u754C\u503C\u653E\u5165\u5F53\u524D\u7684&quot;\u5751&quot;\u4E2D\uFF0C
     * \u8FD4\u56DE\u5F53\u524D&quot;\u5751&quot;\u4E0B\u6807\uFF08\u5373\u5206\u754C\u503C\u4E0B\u6807\uFF09
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">doublePointerHole</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> startIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> pivot <span class="token operator">=</span> arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> leftPoint <span class="token operator">=</span> startIndex<span class="token punctuation">;</span>
        <span class="token keyword">int</span> rightPoint <span class="token operator">=</span> endIndex<span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// \u4ECE\u53F3\u5411\u5DE6\u627E\u51FA\u6BD4pivot\u5C0F\u7684\u6570\u636E\uFF0C</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint
                    <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">&gt;</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                rightPoint<span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// \u627E\u5230\u540E\u7ACB\u5373\u653E\u5165\u5DE6\u8FB9\u5751\u4E2D\uFF0C\u5F53\u524D\u4F4D\u7F6E\u53D8\u4E3A\u65B0\u7684&quot;\u5751&quot;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
                leftPoint<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// \u4ECE\u5DE6\u5411\u53F3\u627E\u51FA\u6BD4pivot\u5927\u7684\u6570\u636E</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint
                    <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                leftPoint<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// \u627E\u5230\u540E\u7ACB\u5373\u653E\u5165\u53F3\u8FB9\u5751\u4E2D\uFF0C\u5F53\u524D\u4F4D\u7F6E\u53D8\u4E3A\u65B0\u7684&quot;\u5751&quot;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>leftPoint <span class="token operator">&lt;</span> rightPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>leftPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
                rightPoint<span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u5C06\u6700\u5F00\u59CB\u5B58\u50A8\u7684\u5206\u754C\u503C\u653E\u5165\u5F53\u524D\u7684&quot;\u5751&quot;\u4E2D</span>
        arr<span class="token punctuation">[</span>rightPoint<span class="token punctuation">]</span> <span class="token operator">=</span> pivot<span class="token punctuation">;</span>
        <span class="token keyword">return</span> rightPoint<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u5355\u8FB9\u6307\u9488
     * \u601D\u8DEF\uFF1A
     * \u8BB0\u5F55\u9996\u5143\u7D20\u4E3A\u5206\u754C\u503C pivot, \u521B\u5EFA\u6807\u8BB0 mark \u6307\u9488\u3002
     * \u5FAA\u73AF\u904D\u5386\u4E0E\u5206\u754C\u503C\u5BF9\u6BD4\u3002
     * \u6BD4\u5206\u754C\u503C\u5C0F\uFF0C\u5219 mark++ \u540E\u4E0E\u4E4B\u4E92\u6362\u3002
     * \u7ED3\u675F\u5FAA\u73AF\u540E\uFF0C\u5C06\u9996\u5143\u7D20\u5206\u754C\u503C\u4E0E\u5F53\u524Dmark\u4E92\u6362\u3002
     * \u8FD4\u56DE mark \u4E0B\u6807\u4E3A\u5206\u754C\u503C\u4E0B\u6807\u3002
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">singlePointer</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> startIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> pivot <span class="token operator">=</span> arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> markPoint <span class="token operator">=</span> startIndex<span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> startIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> endIndex<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// \u5982\u679C\u6BD4\u5206\u754C\u503C\u5C0F\uFF0C\u5219 mark++ \u540E\u4E92\u6362\u3002</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                markPoint<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>markPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
                arr<span class="token punctuation">[</span>markPoint<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u5C06\u9996\u5143\u7D20\u5206\u754C\u503C\u4E0E\u5F53\u524Dmark\u4E92\u6362</span>
        arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>markPoint<span class="token punctuation">]</span><span class="token punctuation">;</span>
        arr<span class="token punctuation">[</span>markPoint<span class="token punctuation">]</span> <span class="token operator">=</span> pivot<span class="token punctuation">;</span>
        <span class="token keyword">return</span> markPoint<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function l(u,r){return s(),a("div",null,[i,t(" more "),c])}const v=n(o,[["render",l],["__file","sort.html.vue"]]);export{v as default};
