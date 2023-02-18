import{_ as n,W as s,X as a,a0 as e,Y as t,a1 as c}from"./framework-d9a58575.js";const p={},o=t("p",null,"抽象工厂模式创建的是对象家族，也就是很多对象而不是一个对象，并且这些对象是相关的，也就是说必须一起创建出来。而工厂方法模式只是用于创建一个对象，这和抽象工厂模式有很大不同。",-1),l=c(`<h3 id="抽象工厂-abstract-factory" tabindex="-1"><a class="header-anchor" href="#抽象工厂-abstract-factory" aria-hidden="true">#</a> 抽象工厂(Abstract Factory)</h3><blockquote><p>抽象工厂模式创建的是对象家族，也就是很多对象而不是一个对象，并且这些对象是相关的，也就是说必须一起创建出来。而工厂方法模式只是用于创建一个对象，这和抽象工厂模式有很大不同。</p></blockquote><p><strong>适用场景</strong></p><ol><li>如果希望一个系统独立于它的产品的创建，组合和表示的时候，换句话说，希望一个系统只是知道产品的接口，而不关心实现的时候；</li><li>如果一个系统要由多个产品系列中的一个来配置的时候，换句话说，就是可以动态的切换产品簇的时候；</li><li>如果要强调一系列相关产品的接口，以便联合使用它们的时候。</li></ol><p><strong>优点</strong></p><ol><li>分离接口和实现；</li><li>使得切换产品簇变得容易。</li></ol><p><strong>缺点</strong></p><ol><li>抽象工厂添加新的产品，所有具体工厂都需要添加，违反开闭原则（一种方法是仅实现一个方法，根据参数再判断具体实现，这种方法不安全，因为返回的参数必须是所有产品的父类）；</li><li>容易造成类层次复杂。</li></ol><p><strong>代码示例</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Monitor</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">LGMonitor</span> <span class="token keyword">extends</span> <span class="token class-name">Monitor</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SamsungMonitor</span> <span class="token keyword">extends</span> <span class="token class-name">Monitor</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Mainframe</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">AsusMainframe</span> <span class="token keyword">extends</span> <span class="token class-name">Mainframe</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">HpMainframe</span> <span class="token keyword">extends</span> <span class="token class-name">Mainframe</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 工厂生产电脑需要主机和显示器，组合了两个工厂方法，形成抽象工厂
 */</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractComputerFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">abstract</span> <span class="token class-name">Monitor</span> <span class="token function">createMonitor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">abstract</span> <span class="token class-name">Mainframe</span> <span class="token function">createMainframe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ComputerFactory1</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractComputerFactory</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">Monitor</span> <span class="token function">createMonitor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">LGMonitor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">Mainframe</span> <span class="token function">createMainframe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AsusMainframe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ComputerFactory2</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractComputerFactory</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">Monitor</span> <span class="token function">createMonitor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SamsungMonitor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">Mainframe</span> <span class="token function">createMainframe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HpMainframe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function i(u,r){return s(),a("div",null,[o,e(" more "),l])}const k=n(p,[["render",i],["__file","04-abstract-factory.html.vue"]]);export{k as default};
