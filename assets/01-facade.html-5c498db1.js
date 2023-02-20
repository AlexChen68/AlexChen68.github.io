import{_ as n,W as s,X as a,Y as p,Z as e,$ as t}from"./framework-3160f2a1.js";const c={},o=e("p",null,"设计模式之外观模式",-1),l=t(`<h2 id="外观-facade-模式" tabindex="-1"><a class="header-anchor" href="#外观-facade-模式" aria-hidden="true">#</a> 外观(Facade)模式</h2><blockquote><p>它提供了一个统一的接口，用来访问子系统中的一群接口，从而让子系统更容易使用。</p><p>这种模式涉及到一个单一的类，该类提供了客户端请求的简化方法和对现有系统类方法的委托调用。</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
   <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Rectangle::draw()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Square</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Square::draw()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Circle::draw()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShapeMaker</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">Shape</span> circle<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">Shape</span> rectangle<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">Shape</span> square<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">ShapeMaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      circle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      rectangle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      square <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Square</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawCircle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      circle<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawRectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      rectangle<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawSquare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      square<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FacadePattern</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">ShapeMaker</span> shapeMaker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShapeMaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      shapeMaker<span class="token punctuation">.</span><span class="token function">drawCircle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      shapeMaker<span class="token punctuation">.</span><span class="token function">drawRectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      shapeMaker<span class="token punctuation">.</span><span class="token function">drawSquare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function i(u,k){return s(),a("div",null,[o,p(" more "),l])}const r=n(c,[["render",i],["__file","01-facade.html.vue"]]);export{r as default};
