import{_ as t,W as p,X as c,$ as o,Y as n,Z as a,a1 as e,a0 as l,C as i}from"./framework-07dc8c78.js";const u={},d=n("p",null,"设计模式之建造者模式",-1),r=l(`<h2 id="建造者模式" tabindex="-1"><a class="header-anchor" href="#建造者模式" aria-hidden="true">#</a> 建造者模式</h2><p>将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。建造者模式是一种对象创建型模式。</p><h2 id="类图" tabindex="-1"><a class="header-anchor" href="#类图" aria-hidden="true">#</a> 类图</h2><p>建造者模式类图如下所示：</p><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/builder_pattern.png" alt="建造者模式类图" loading="lazy"></p><p>建造者模式类图中包含如下几个角色：</p><ul><li><p><strong>Builder（抽象建造者）</strong>：它为创建一个产品 Product 对象的各个部件指定抽象接口，在该接口中一般声明两类方法，一类方法是 buildPartX()，它们用于创建复杂对象的各个部件；另一类方法是 getResult()，它们用于返回复杂对象。Builder 既可以是抽象类，也可以是接口。</p></li><li><p><strong>ConcreteBuilder（具体建造者）</strong>：它实现了 Builder 接口，实现各个部件的具体构造和装配方法，定义并明确它所创建的复杂对象，也可以提供一个方法返回创建好的复杂产品对象。</p></li><li><p><strong>Product（产品角色）</strong>：它是被构建的复杂对象，包含多个组成部件，具体建造者创建该产品的内部表示并定义它的装配过程。</p></li><li><p><strong>Director（指挥者）</strong>：指挥者又称为导演类，它负责安排复杂对象的建造次序，指挥者与抽象建造者之间存在关联关系，可以在其 construct() 建造方法中调用建造者对象的部件构造与装配方法，完成复杂对象的建造。客户端一般只需要与指挥者进行交互，在客户端确定具体建造者的类型，并实例化具体建造者对象（也可以通过配置文件和反射机制），然后通过指挥者类的构造函数或者 Setter 方法将该对象传入指挥者类中。</p></li></ul><p>在建造者模式的定义中提到了复杂对象，那么什么是复杂对象？简单来说，复杂对象是指那些包含多个非简单类型的成员属性，这些成员属性也称为部件或零件，如汽车包括方向盘、发动机、轮胎等部件，电子邮件包括发件人、收件人、主题、内容、附件等部件。</p><h2 id="伪代码" tabindex="-1"><a class="header-anchor" href="#伪代码" aria-hidden="true">#</a> 伪代码</h2><p>定义产品角色，典型代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义部件，部件可以是任意类型，包括值类型和引用类型</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> partA<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> partB<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> partC<span class="token punctuation">;</span>

    <span class="token comment">// getter、setter 方法省略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在抽象建造者中定义了产品的创建方法和返回方法，其典型代码如下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建产品对象</span>
    <span class="token keyword">protected</span> <span class="token class-name">Product</span> product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildPartA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildPartB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildPartC</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 返回产品对象</span>
    <span class="token keyword">public</span> <span class="token class-name">Product</span> <span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> product<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在抽象类 <code>Builder</code> 中声明了一系列抽象的 <code>buildPartX()</code> 方法用于创建复杂产品的各个部件，具体建造过程在 <code>ConcreteBuilder</code> 中实现，此外还提供了工厂方法 <code>getResult()</code>，用于返回一个建造好的完整产品。</p><p>在 <code>ConcreteBuilder</code> 中实现了 <code>buildPartX()</code> 方法，通过调用 <code>Product</code> 的 <code>setPartX()</code> 方法可以给产品对象的成员属性设值。不同的具体建造者在实现 <code>buildPartX()</code> 方法时将有所区别。</p><p>在建造者模式的结构中还引入了一个指挥者类 <code>Director</code>，该类主要有两个作用：</p><p>一方面它隔离了客户与创建过程； 另一方面它控制产品的创建过程，包括某个 <code>buildPartX()</code> 方法是否被调用以及多个 <code>buildPartX()</code> 方法调用的先后次序等。</p><p>指挥者针对抽象建造者编程，客户端只需要知道具体建造者的类型，即可通过指挥者类调用建造者的相关方法，返回一个完整的产品对象。在实际生活中也存在类似指挥者一样的角色，如一个客户去购买电脑，电脑销售人员相当于指挥者，只要客户确定电脑的类型，电脑销售人员可以通知电脑组装人员给客户组装一台电脑。指挥者类的代码示例如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Director</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Builder</span> builder<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Director</span><span class="token punctuation">(</span><span class="token class-name">Builder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>builder <span class="token operator">=</span> builder<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setBuilder</span><span class="token punctuation">(</span><span class="token class-name">Builder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>builder <span class="token operator">=</span> builer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//产品构建与组装方法</span>
    <span class="token keyword">public</span> <span class="token class-name">Product</span> <span class="token function">construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        builder<span class="token punctuation">.</span><span class="token function">buildPartA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        builder<span class="token punctuation">.</span><span class="token function">buildPartB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        builder<span class="token punctuation">.</span><span class="token function">buildPartC</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> builder<span class="token punctuation">.</span><span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在指挥者类中可以注入一个抽象建造者类型的对象，其核心在于提供了一个建造方法 <code>construct()</code>，在该方法中调用了 <code>builder</code> 对象的构造部件的方法，最后返回一个产品对象。</p><p>对于客户端而言，只需关心具体的建造者即可，代码片段如下所示：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Builder</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Director</span> director <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Director</span><span class="token punctuation">(</span>builder<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Product</span> product <span class="token operator">=</span> director<span class="token punctuation">.</span><span class="token function">construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模式简化" tabindex="-1"><a class="header-anchor" href="#模式简化" aria-hidden="true">#</a> 模式简化</h2><p>在有些情况下，为了简化系统结构，可以将 Director 和抽象建造者 Builder 进行合并，在 Builder 中提供逐步构建复杂产品对象的 construct() 方法。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建产品对象</span>
    <span class="token keyword">protected</span> <span class="token class-name">Product</span> product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildPartA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildPartB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildPartC</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 返回产品对象</span>
    <span class="token keyword">public</span> <span class="token class-name">Product</span> <span class="token function">construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">buildPartA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">buildPartB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">buildPartC</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> product<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="应用实例" tabindex="-1"><a class="header-anchor" href="#应用实例" aria-hidden="true">#</a> 应用实例</h2><p>Spring 构建 <code>org.springframework.web.servlet.mvc.method.RequestMappingInfo</code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">DefaultBuilder</span> <span class="token keyword">implements</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> paths <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">[</span><span class="token punctuation">]</span> methods <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> headers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token class-name">DefaultBuilder</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> paths<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>paths <span class="token operator">=</span> paths<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">paths</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> paths<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>paths <span class="token operator">=</span> paths<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token class-name">DefaultBuilder</span> <span class="token function">methods</span><span class="token punctuation">(</span><span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> methods<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>methods <span class="token operator">=</span> methods<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token class-name">DefaultBuilder</span> <span class="token function">params</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>params <span class="token operator">=</span> params<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token class-name">DefaultBuilder</span> <span class="token function">headers</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> headers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>headers <span class="token operator">=</span> headers<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token class-name">RequestMappingInfo</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ContentNegotiationManager</span> manager <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">getContentNegotiationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">PatternsRequestCondition</span> patternsCondition <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PatternsRequestCondition</span><span class="token punctuation">(</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>paths<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">getUrlPathHelper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">getPathMatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">useSuffixPatternMatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">useTrailingSlashMatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">getFileExtensions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RequestMappingInfo</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>mappingName<span class="token punctuation">,</span> patternsCondition<span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">RequestMethodsRequestCondition</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>methods<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">ParamsRequestCondition</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>params<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">HeadersRequestCondition</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>headers<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">ConsumesRequestCondition</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>consumes<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>headers<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">ProducesRequestCondition</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>produces<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>headers<span class="token punctuation">,</span> manager<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>customCondition<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring 框架中许多构建类的实例化使用了类似上面方式，总结有以下特点：</p><ul><li><code>Builder</code> 大多是构建类的内部类，构建类提供了一个静态创建 <code>Builder</code> 的方法</li><li><code>Builder</code> 返回构建类的实例，大多通过 <code>build()</code> 方法</li><li>构建过程有大量参数，除了几个必要参数，用户可根据自己所需选择设置其他参数实例化对象</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>建造者模式的核心在于如何一步步构建一个包含多个组成部件的完整对象，使用相同的构建过程构建不同的产品，在软件开发中，如果我们需要创建复杂对象并希望系统具备很好的灵活性和可扩展性可以考虑使用建造者模式。</p><p><strong>建造者模式</strong>与<strong>抽象工厂模式</strong>有点相似，但是建造者模式返回一个完整的复杂产品，而抽象工厂模式返回一系列相关的产品；在抽象工厂模式中，客户端通过选择具体工厂来生成所需对象，而在建造者模式中，客户端通过指定具体建造者类型并指导 Director 类如何去生成对象，侧重于一步步构造一个复杂对象，然后将结果返回。</p><p><mark>如果将抽象工厂模式看成一个汽车配件生产厂，生成不同类型的汽车配件，那么建造者模式就是一个汽车组装厂，通过对配件进行组装返回一辆完整的汽车</mark>。</p><h3 id="主要优点" tabindex="-1"><a class="header-anchor" href="#主要优点" aria-hidden="true">#</a> 主要优点</h3><ul><li>将产品本身与产品的创建过程解耦，使得相同的创建过程可以创建不同的产品对象；</li><li>可以更加精细地控制产品的创建过程。将复杂产品的创建步骤分解在不同的方法中，使得创建过程更加清晰，也更方便使用程序来控制创建过程。</li></ul><h3 id="适用场景" tabindex="-1"><a class="header-anchor" href="#适用场景" aria-hidden="true">#</a> 适用场景</h3><ul><li>需要生成的产品对象有复杂的内部结构，这些产品对象通常包含多个成员属性。</li><li>需要生成的产品对象的属性相互依赖，需要指定其生成顺序。</li><li>隔离复杂对象的创建和使用，并使得相同的创建过程可以创建不同的产品。</li></ul><hr><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,40),k={href:"https://blog.csdn.net/LoveLion/article/details/17517213",target:"_blank",rel:"noopener noreferrer"},v={href:"https://bytesfly.github.io/blog/#/DesignPattern/builder-pattern",target:"_blank",rel:"noopener noreferrer"},m={href:"https://pdai.tech/md/dev-spec/pattern/6_builder.html",target:"_blank",rel:"noopener noreferrer"};function b(h,w){const s=i("ExternalLinkIcon");return p(),c("div",null,[d,o(" more "),r,n("ul",null,[n("li",null,[n("a",k,[a("史上最全设计模式导学目录（完整版）- 刘伟"),e(s)])]),n("li",null,[n("a",v,[a("字节飞扬"),e(s)])]),n("li",null,[n("a",m,[a("Java 全栈知识体系"),e(s)])])])])}const g=t(u,[["render",b],["__file","03-builder.html.vue"]]);export{g as default};