import{_ as o,W as t,X as c,Z as p,Y as n,$ as s,a1 as e,a0 as i,C as l}from"./framework-8d3a05fe.js";const d={},r=n("p",null,"设计模式之装饰模式",-1),u=i(`<h2 id="装饰模式-decorator-pattern" tabindex="-1"><a class="header-anchor" href="#装饰模式-decorator-pattern" aria-hidden="true">#</a> 装饰模式（Decorator Pattern）</h2><p>如何让系统中的类可以进行扩展但是又不会导致类数目的急剧增加？<code>根据“合成复用原则”，在实现功能复用时，我们要多用关联，少用继承。</code></p><p><code>装饰模式是一种用于替代继承的技术</code>，它通过一种无须定义子类的方式来给对象<code>动态</code>增加职责，使用对象之间的<code>关联关系</code>取代类之间的<code>继承关系</code>。在装饰模式中引入了装饰类，在装饰类中既可以调用待装饰的原有类的方法，还可以增加新的方法，以扩充原有类的功能。</p><blockquote><p><code>装饰模式(Decorator Pattern)</code>：动态地给一个对象增加一些额外的职责，就增加对象功能来说，装饰模式比生成子类实现更为灵活。装饰模式是一种对象结构型模式。</p></blockquote><h2 id="类图" tabindex="-1"><a class="header-anchor" href="#类图" aria-hidden="true">#</a> 类图</h2><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/decorator_pattern.png" alt="装饰模式类图" loading="lazy"></p><p>在装饰模式类图中包含如下几个角色：</p><ul><li><code>Component</code>（抽象构件）：它是具体构件和抽象装饰类的共同父类，声明了在具体构件中实现的业务方法，它的引入可以使客户端以一致的方式处理未被装饰的对象以及装饰之后的对象，实现客户端的透明操作。</li><li><code>ConcreteComponent</code>（具体构件）：它是抽象构件类的子类，用于定义具体的构件对象，实现了在抽象构件中声明的方法，装饰器可以给它增加额外的职责（方法）。</li><li><code>Decorator</code>（抽象装饰类）：它也是抽象构件类的子类，用于给具体构件增加职责，但是具体职责在其子类中实现。它维护一个指向抽象构件对象的引用，通过该引用可以调用装饰之前构件对象的方法，并通过其子类扩展该方法，以达到装饰的目的。</li><li><code>ConcreteDecorator</code>（具体装饰类）：它是抽象装饰类的子类，负责向构件添加新的职责。每一个具体装饰类都定义了一些新的行为，它可以调用在抽象装饰类中定义的方法，并可以增加新的方法用以扩充对象的行为。</li></ul><p>由于具体构件类和装饰类都实现了相同的抽象构件接口，因此装饰模式以对客户透明的方式动态地给一个对象附加上更多的责任，换言之，客户端并不会觉得对象在装饰前和装饰后有什么不同。装饰模式可以在不需要创造更多子类的情况下，将对象的功能加以扩展。</p><h2 id="伪代码" tabindex="-1"><a class="header-anchor" href="#伪代码" aria-hidden="true">#</a> 伪代码</h2><p>装饰模式的核心在于抽象装饰类的设计，其典型代码如下所示：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Decorator</span> <span class="token keyword">implements</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
    <span class="token comment">// 维持一个对抽象构件对象的引用</span>
    <span class="token keyword">private</span> <span class="token class-name">Component</span> component<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Decorator</span><span class="token punctuation">(</span><span class="token class-name">Component</span> component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>component <span class="token operator">=</span> component<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        component<span class="token punctuation">.</span><span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是：</p><ul><li>在<code>Decorator</code>中并未真正实现<code>operation()</code>方法，而只是调用原有<code>component</code>对象的<code>operation()</code>方法，它没有真正实施装饰，而是提供一个统一的接口，将具体装饰过程交给子类完成。</li><li>由于在抽象装饰类<code>Decorator</code>中注入的是<code>Component</code>类型的对象，因此可以将一个具体构件对象注入其中，再通过具体装饰类来进行装饰；此外，我们还可以将一个已经装饰过的<code>Decorator</code>子类的对象再注入其中进行<code>多次装饰</code>，从而对原有功能的多次扩展。</li></ul><p>在<code>Decorator</code>的子类即具体装饰类中将继承<code>operation()</code>方法并根据需要进行扩展，典型的具体装饰类代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConcreteDecorator</span> <span class="token keyword">extends</span> <span class="token class-name">Decorator</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">ConcreteDecorator</span><span class="token punctuation">(</span><span class="token class-name">Component</span> component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 调用原有业务方法</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 调用新增业务方法</span>
        <span class="token function">addedBehavior</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 新增业务方法</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addedBehavior</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体装饰类中可以调用到抽象装饰类的<code>operation()</code>方法，同时可以定义新的业务方法，如<code>addedBehavior()</code></p><p>上面介绍的装饰模式就是透明 (Transparent) 装饰模式，也即标准装饰模式。</p><p>但是在实际使用过程中，由于新增行为可能需要单独调用（即<code>客户端想自己单独调用装饰类中新增的方法来控制是否以及如何增强</code>），因此这种形式的装饰模式也经常出现，这种装饰模式被称为<code>半透明(Semi-transparent)装饰模式</code></p><p>半透明装饰模式中的具体装饰类对应的实现，即变为如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConcreteDecorator</span> <span class="token keyword">extends</span> <span class="token class-name">Decorator</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">ConcreteDecorator</span><span class="token punctuation">(</span><span class="token class-name">Component</span> component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//@Override</span>
    <span class="token comment">//public void operation() {</span>
        <span class="token comment">// 调用原有业务方法</span>
        <span class="token comment">// super.operation();</span>
        <span class="token comment">// 调用新增业务方法</span>
        <span class="token comment">//addedBehavior();</span>
    <span class="token comment">//}</span>

    <span class="token comment">// 新增业务方法</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addedBehavior</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意 <code>半透明装饰模式</code>中的<code>ConcreteDecorator</code>类继承了父装饰类<code>Decorator</code>的<code>operation()</code>方法但并没有重写<code>operation()</code>方法，并新增了业务方法<code>addedBehavior()</code>，但这两个方法是完全独立的，没有任何调用关系。</strong></p><p>即 <code>半透明装饰模式</code>中的<code>ConcreteDecorator</code>中的<code>operation()</code>并没有对注入的<code>Component</code>进行增强，只是增加了额外的方法<code>addedBehavior()</code>，这样一来是否增强<code>Component</code>就取决于客户端是否调用<code>addedBehavior()</code>方法。</p><h2 id="应用实例" tabindex="-1"><a class="header-anchor" href="#应用实例" aria-hidden="true">#</a> 应用实例</h2><p><code>Java</code>中的<code>java.io</code>包下 io 流的设计就充分使用了装饰模式。</p><p>举个具体的例子，<code>BufferedInputStream</code>就是一个具体装饰者，它能为一个原本没有缓冲 (<code>buffer</code>) 功能的<code>InputStream</code>增加缓冲的功能。下面的代码应该司空见惯。</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token class-name">BufferedInputStream</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;/tmp/1.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><code>FileInputStream</code>本没有缓冲功能，每次调用<code>read</code>方法，都会发起系统调用读数据。用<code>BufferedInputStream</code>来装饰它，那么每次调用<code>read</code>方法，会向操作系统多读一定量数据进入内存的<code>buf[]</code>，这样就提高了读的效率，避免频繁发起系统调用。</p><p>BufferedInputStream<code>构造器中注入了</code>InputStream</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> in<span class="token punctuation">,</span> <span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>size <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Buffer size &lt;= 0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    buf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>BufferedInputStream</code>继承了父装饰器<code>FilterInputStream</code>，维持了对<code>InputStream</code>的引用</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FilterInputStream</span> <span class="token keyword">extends</span> <span class="token class-name">InputStream</span> <span class="token punctuation">{</span>

  <span class="token keyword">protected</span> <span class="token keyword">volatile</span> <span class="token class-name">InputStream</span> in<span class="token punctuation">;</span>

  <span class="token keyword">protected</span> <span class="token class-name">FilterInputStream</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> in<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>in <span class="token operator">=</span> in<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>BufferedInputStream</code>重写了<code>read()</code>从而实现对引用的<code>InputStream</code>增强。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>装饰模式降低了系统的耦合度，可以动态增强对象的功能。</p><h3 id="主要优点" tabindex="-1"><a class="header-anchor" href="#主要优点" aria-hidden="true">#</a> 主要优点</h3><ul><li>对于扩展一个对象的功能，装饰模式比继承更加灵活性，不会导致类的个数急剧增加。</li><li>可以对一个对象进行多次装饰，通过使用不同的具体装饰类以及这些装饰类的排列组合，可以创造出很多不同行为的组合，得到功能更为强大的对象。</li><li>具体构件类与具体装饰类可以独立变化，用户可以根据需要增加新的具体构件类和具体装饰类，原有类库代码无须改变，符合“开闭原则”。</li></ul><h3 id="适用场景" tabindex="-1"><a class="header-anchor" href="#适用场景" aria-hidden="true">#</a> 适用场景</h3><ul><li>在不影响其他对象的情况下，以动态、透明的方式给单个对象添加职责。</li><li>当不能采用继承的方式对系统进行扩展或者采用继承不利于系统扩展和维护时可以使用装饰模式。不能采用继承的情况主要有两类：第一类是系统中存在大量独立的扩展，为支持每一种扩展或者扩展之间的组合将产生大量的子类，使得子类数目呈爆炸性增长；第二类是因为类已定义为不能被继承（如<code>Java</code>语言中的<code>final</code>类）。</li></ul><hr><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,41),k={href:"https://bytesfly.github.io/blog/#/DesignPattern/decorator-pattern",target:"_blank",rel:"noopener noreferrer"},v={href:"https://pdai.tech/md/dev-spec/pattern/12_decorator.html",target:"_blank",rel:"noopener noreferrer"};function m(b,h){const a=l("ExternalLinkIcon");return t(),c("div",null,[r,p(" more "),u,n("ul",null,[n("li",null,[n("a",k,[s("字节飞扬"),e(a)])]),n("li",null,[n("a",v,[s("Java 全栈知识体系"),e(a)])])])])}const w=o(d,[["render",m],["__file","05-decorator.html.vue"]]);export{w as default};