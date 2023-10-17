import{_ as s,o as a,c as l,Q as n}from"./chunks/framework.419948d5.js";const u=JSON.parse('{"title":"Java 泛型机制","description":"","frontmatter":{"title":"Java 泛型机制","order":5,"date":"2023-04-13T00:00:00.000Z"},"headers":[],"relativePath":"java/basic/generic.md","filePath":"java/basic/generic.md","lastUpdated":1697504454000}'),p={name:"java/basic/generic.md"},e=n(`<h2 id="为什么会引入泛型" tabindex="-1">为什么会引入泛型 <a class="header-anchor" href="#为什么会引入泛型" aria-label="Permalink to &quot;为什么会引入泛型&quot;">​</a></h2><p>引入泛型的意义在于：</p><ul><li>适用于多种数据类型执行相同的代码（代码复用）</li><li>泛型中的类型在使用时指定，不需要强制类型转换（类型安全，编译器会检查类型）</li></ul><h2 id="泛型的基本使用" tabindex="-1">泛型的基本使用 <a class="header-anchor" href="#泛型的基本使用" aria-label="Permalink to &quot;泛型的基本使用&quot;">​</a></h2><ul><li>泛型接口和泛型类</li></ul><p>在接口和类的名称后面，通过 <code>&lt;Name1, Name2, ...&gt;</code> 的格式定义一至多个泛型类型，在该接口或者类中都可以该类型。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">List</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Collection</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">List</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Collection</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ArrayList</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbstractList</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">List</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;, </span><span style="color:#B392F0;">RandomAccess</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">Cloneable</span><span style="color:#E1E4E8;">, java.io.</span><span style="color:#B392F0;">Serializable</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ArrayList</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbstractList</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">List</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;, </span><span style="color:#6F42C1;">RandomAccess</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">Cloneable</span><span style="color:#24292E;">, java.io.</span><span style="color:#6F42C1;">Serializable</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>多元泛型：</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HashMap</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">K</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">V</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbstractMap</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">K</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">V</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Map</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">K</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">V</span><span style="color:#E1E4E8;">&gt;, </span><span style="color:#B392F0;">Cloneable</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">Serializable</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HashMap</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">K</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">V</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbstractMap</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">K</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">V</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Map</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">K</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">V</span><span style="color:#24292E;">&gt;, </span><span style="color:#6F42C1;">Cloneable</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">Serializable</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul><li>泛型方法</li></ul><p>在返回值前面通过 <code>&lt;Name1, Name2, ...&gt;</code> 的格式定义一个或多个泛型类型，可以在该方法的作用域范围类使用。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">T</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addAll</span><span style="color:#E1E4E8;">(Collection</span><span style="color:#F97583;">&lt;?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;"> T</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> c, T... elements) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (T element </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> elements)</span></span>
<span class="line"><span style="color:#E1E4E8;">          result </span><span style="color:#F97583;">|=</span><span style="color:#E1E4E8;"> c.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(element);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">T</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addAll</span><span style="color:#24292E;">(Collection</span><span style="color:#D73A49;">&lt;?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">super</span><span style="color:#24292E;"> T</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> c, T... elements) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (T element </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> elements)</span></span>
<span class="line"><span style="color:#24292E;">          result </span><span style="color:#D73A49;">|=</span><span style="color:#24292E;"> c.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(element);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="泛型的上限和下限" tabindex="-1">泛型的上限和下限 <a class="header-anchor" href="#泛型的上限和下限" aria-label="Permalink to &quot;泛型的上限和下限&quot;">​</a></h2><p>在使用泛型的时候，我们可以为传入的泛型类型实参进行上下边界的限制，如：类型实参只准传入某种类型的父类或某种类型的子类。</p><p>泛型的定义可以使用如下三种方式：</p><ul><li><code>&lt;?&gt;</code> 无限制通配符</li><li><code>&lt;? extends E&gt;</code> extends 关键字声明了类型的上界，表示参数化的类型可能是所指定的类型，或者是此类型的子类</li><li><code>&lt;? super E&gt;</code> super 关键字声明了类型的下界，表示参数化的类型可能是指定的类型，或者是此类型的父类</li></ul><p>《Effictive Java》中对泛型的使用原则：为了获得最大限度的灵活性，要在表示 生产者或者消费者 的输入参数上使用通配符，使用的规则就是：生产者有上限、消费者有下限</p><ol><li>如果参数化类型表示一个 T 的生产者，使用 <code>&lt;? extends T&gt;</code>;</li><li>如果它表示一个 T 的消费者，就使用 <code>&lt;? super T&gt;</code>；</li><li>如果既是生产又是消费，那使用通配符就没什么意义了，因为你需要的是精确的参数类型。</li></ol><h2 id="泛型的类型擦除" tabindex="-1">泛型的类型擦除 <a class="header-anchor" href="#泛型的类型擦除" aria-label="Permalink to &quot;泛型的类型擦除&quot;">​</a></h2><blockquote><p>Java 泛型这个特性是从 JDK 1.5 才开始加入的，因此为了兼容之前的版本，Java 泛型的实现采取了“伪泛型”的策略，即 Java 在语法上支持泛型，但是在编译阶段会进行所谓的“类型擦除”（Type Erasure），将所有的泛型表示（尖括号中的内容）都替换为具体的类型（其对应的原生态类型），就像完全没有泛型一样。理解类型擦除对于用好泛型是很有帮助的，尤其是一些看起来“疑难杂症”的问题，弄明白了类型擦除也就迎刃而解了。</p></blockquote><p>Java 编译器是通过先检查代码中泛型的类型，然后在进行类型擦除，再进行编译。</p><p><strong>泛型的类型擦除原则</strong>是：</p><ul><li><p>消除类型参数声明，即删除<code>&lt;&gt;</code>及其包围的部分。</p></li><li><p>根据类型参数的上下界推断并替换所有的类型参数为原生态类型：如果类型参数是无限制通配符或没有上下界限定则替换为 Object，如果存在上下界限定则根据子类替换原则取类型参数的最左边限定类型（即父类）。</p></li><li><p>为了保证类型安全，必要时插入强制类型转换代码。</p></li><li><p>自动产生“桥接方法”以保证擦除类型后的代码仍然具有泛型的“多态性”。</p></li></ul><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h2><ul><li>基本类型不能作为泛型类型</li><li>泛型类型不能实例化</li><li>类型擦除会造成多态的冲突，而 JVM 解决方法就是桥接方法。</li><li>泛型类中的<em>静态方法</em>和<em>静态变量</em>不可以使用泛型类所声明的泛型类型参数</li><li>不能抛出也不能捕获泛型类的对象，因为类型擦除后，异常类型都是 Object，同样不也能再 catch 子句中使用泛型变量；但是在异常声明中可以使用类型变量，例如：<code>&lt;T extends Throwable&gt;</code></li></ul><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://blog.csdn.net/qq_37080455/article/details/127851686" target="_blank" rel="noreferrer">Java 基础五大机制 —— 泛型机制解析（一）</a></li><li><a href="https://pdai.tech/md/java/basic/java-basic-x-generic.html" target="_blank" rel="noreferrer">Java 基础 - 泛型机制详解</a></li></ul>`,28),o=[e];function t(c,r,E,i,y,d){return a(),l("div",null,o)}const h=s(p,[["render",t]]);export{u as __pageData,h as default};