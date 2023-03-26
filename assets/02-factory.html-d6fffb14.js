import{_ as t,W as p,X as o,Y as n,$ as a,a1 as e,a0 as c,C as l}from"./framework-8d3a05fe.js";const i={},u=c(`<h2 id="简单工厂模式-simple-factory" tabindex="-1"><a class="header-anchor" href="#简单工厂模式-simple-factory" aria-hidden="true">#</a> 简单工厂模式（Simple Factory）</h2><p>定义一个工厂类，可以根据传入的参数不同创建不同类实例，被创建的实例通常都有相同的父类。简单工厂模式在 java 中得到了大量的使用，它属于创建型的设计模式，但是它不属于 GOF23 设计模式中的一种。</p><p>工厂模式提供公共的接口，客户端直接使用公共接口来创建对象，客户端这边不关心对象是怎么创建的，其中包含 3 个角色：<strong>工厂角色，抽象产品角色，具体产品角色</strong>。</p><ul><li>工厂角色是简单工厂模式的核心，负责产品实例的内部逻辑；</li><li>抽象产品角色是所有具体产品角色的父类，封装了公共的方法；</li><li>具体产品角色是工厂角色创建的目标对象。</li></ul><p>因为简单工厂模式将对象的创建和使用分离，使得系统更加符合单一职责原则。</p><h3 id="伪代码" tabindex="-1"><a class="header-anchor" href="#伪代码" aria-hidden="true">#</a> 伪代码</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Mobile</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">produce</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IphoneMobile</span> <span class="token keyword">implements</span> <span class="token class-name">Mobile</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">produce</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;生产苹果手机&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HuaweiMobile</span> <span class="token keyword">implements</span> <span class="token class-name">Mobile</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">produce</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;生产华为手机&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FoxconnFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Mobile</span> <span class="token function">getMobile</span><span class="token punctuation">(</span><span class="token class-name">String</span> mobileType<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">&quot;iphone&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>mobileType<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">IphoneMobile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">&quot;huawei&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>mobileType<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HuaweiMobile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleFactoryTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">FoxconnFactory</span> foxconnFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FoxconnFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Mobile</span> mobile <span class="token operator">=</span> foxconnFactory<span class="token punctuation">.</span><span class="token function">getMobile</span><span class="token punctuation">(</span><span class="token string">&quot;iphone&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        mobile<span class="token punctuation">.</span><span class="token function">produce</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Mobile</span> huawei <span class="token operator">=</span> foxconnFactory<span class="token punctuation">.</span><span class="token function">getMobile</span><span class="token punctuation">(</span><span class="token string">&quot;huawei&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        huawei<span class="token punctuation">.</span><span class="token function">produce</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3><p>简单工厂适用场景：</p><ol><li>工厂类创建的对象比较少；</li><li>客户端只需要传入某个参数，对如何创建对象不关心。</li></ol><p>优点：</p><ol><li>只需要传入参数就可以获取到需要的对象，客户端使用简单；</li><li>通过反射或者配置文件，可以在不修改任何代码的情况下更换或者新增产品类，提供系统的灵活性；</li><li>让创建和使用进行分离。</li></ol><p>缺点：</p><ol><li>工厂类的职责比较重，如果新增一些类，需要修改工厂类判断逻辑，违背了开闭原则；</li><li>增加类的个数，增加系统的复杂性和理解难度。</li></ol><h2 id="工厂方法模式-factory-method" tabindex="-1"><a class="header-anchor" href="#工厂方法模式-factory-method" aria-hidden="true">#</a> 工厂方法模式 (Factory Method)</h2><p>定义了一个创建对象的接口，但由工厂子类决定要实例化哪个类。</p><p>工厂方法把实例化操作推迟到工厂的子类。</p><h3 id="伪代码-1" tabindex="-1"><a class="header-anchor" href="#伪代码-1" aria-hidden="true">#</a> 伪代码</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">FoodFactory</span> <span class="token punctuation">{</span>
    <span class="token class-name">Food</span> <span class="token function">makeFood</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ChineseFoodFactory</span> <span class="token keyword">implements</span> <span class="token class-name">FoodFactory</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Food</span> <span class="token function">makeFood</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ChineseFoodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ChineseFoodB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AmericanFoodFactory</span> <span class="token keyword">implements</span> <span class="token class-name">FoodFactory</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Food</span> <span class="token function">makeFood</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AmericanFoodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AmericanFoodB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1" aria-hidden="true">#</a> 小结</h3><p>适用场景：</p><ol><li>在任何需要生成<strong>复杂对象</strong>的地方，都可以使用工厂方法模式。直接用 <code>new</code>可以完成的<strong>不需要用工厂模式</strong>个人理解，重点就是这个复杂（构造函数有很多参数）和是否可以直接用 <code>new</code>。</li><li>客户端只知道传入工厂类的参数，对于如何创建对象并不关心。</li><li>工厂类负责创建的对象比较少，由于创建的对象较少，不会造成工厂方法中的业务逻辑太过复杂。</li></ol><p>优点：</p><ol><li>用户只需要关心所需产品的对应工厂，无需关心细节；</li><li>完全支持开闭原则，提高可扩展性。所谓的开闭原则就是对扩展开放，对修改关闭，再说白点就是实现工厂方法以后要进行扩展时不需要修改原有代码，只需要增加一个工厂实现类和产品实现类就可以。这样的好处可以降低因为修改代码引进错误的风险。</li></ol><p>缺点：</p><ol><li>加入一种产品，会创建一个具体工厂类和具体产品类，因此，类的个数容易过多，增加复杂度；</li><li>抽象工厂和抽象产品增加了系统的抽象性和理解难度。</li></ol><h2 id="抽象工厂-abstract-factory" tabindex="-1"><a class="header-anchor" href="#抽象工厂-abstract-factory" aria-hidden="true">#</a> 抽象工厂 (Abstract Factory)</h2><p>抽象工厂模式创建的是<strong>对象家族</strong>，也就是很多对象而不是一个对象，并且这些对象是相关的，也就是说必须一起创建出来。而工厂方法模式只是用于创建一个对象，这和抽象工厂模式有很大不同。</p><h3 id="伪代码-2" tabindex="-1"><a class="header-anchor" href="#伪代码-2" aria-hidden="true">#</a> 伪代码</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Monitor</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结-2" tabindex="-1"><a class="header-anchor" href="#小结-2" aria-hidden="true">#</a> 小结</h3><p>适用场景：</p><ol><li>如果希望一个系统独立于它的产品的<strong>创建</strong>，<strong>组合</strong>和<strong>表示</strong>的时候，换句话说，希望一个系统只是知道产品的接口，而不关心实现的时候；</li><li>如果一个系统要由多个产品系列中的一个来配置的时候，换句话说，就是可以动态的切换<strong>产品簇</strong>的时候；</li><li>如果要强调一系列相关产品的接口，以便联合使用它们的时候。</li></ol><p>优点：</p><ol><li>分离接口和实现；</li><li>使得切换产品簇变得容易。</li></ol><p>缺点：</p><ol><li>抽象工厂添加新的产品，所有具体工厂都需要添加，违反开闭原则（一种方法是仅实现一个方法，根据参数再判断具体实现，这种方法不安全，因为返回的参数必须是所有产品的父类）；</li><li>容易造成类层次复杂。</li></ol><hr><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,39),k={href:"https://pdai.tech/md/dev-spec/pattern/1_overview.html",target:"_blank",rel:"noopener noreferrer"},r={href:"https://javadoop.com/post/design-pattern",target:"_blank",rel:"noopener noreferrer"},d={href:"https://bytesfly.github.io/blog/#/DesignPattern/factory-pattern",target:"_blank",rel:"noopener noreferrer"};function v(m,b){const s=l("ExternalLinkIcon");return p(),o("div",null,[u,n("ul",null,[n("li",null,[n("a",k,[a("Java 全栈知识体系"),e(s)])]),n("li",null,[n("a",r,[a("设计模式也可以这么简单"),e(s)])]),n("li",null,[n("a",d,[a("工厂模式三兄弟 (Factory Pattern)"),e(s)])])])])}const w=t(i,[["render",v],["__file","02-factory.html.vue"]]);export{w as default};