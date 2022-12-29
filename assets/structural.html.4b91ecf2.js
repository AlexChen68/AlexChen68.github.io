import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,f as p}from"./app.b62ae7a7.js";const e={},t=p(`<h3 id="\u5916\u89C2-facade" tabindex="-1"><a class="header-anchor" href="#\u5916\u89C2-facade" aria-hidden="true">#</a> \u5916\u89C2(Facade)</h3><blockquote><p>\u5B83\u63D0\u4F9B\u4E86\u4E00\u4E2A\u7EDF\u4E00\u7684\u63A5\u53E3\uFF0C\u7528\u6765\u8BBF\u95EE\u5B50\u7CFB\u7EDF\u4E2D\u7684\u4E00\u7FA4\u63A5\u53E3\uFF0C\u4ECE\u800C\u8BA9\u5B50\u7CFB\u7EDF\u66F4\u5BB9\u6613\u4F7F\u7528\u3002</p><p>\u8FD9\u79CD\u6A21\u5F0F\u6D89\u53CA\u5230\u4E00\u4E2A\u5355\u4E00\u7684\u7C7B\uFF0C\u8BE5\u7C7B\u63D0\u4F9B\u4E86\u5BA2\u6237\u7AEF\u8BF7\u6C42\u7684\u7B80\u5316\u65B9\u6CD5\u548C\u5BF9\u73B0\u6709\u7CFB\u7EDF\u7C7B\u65B9\u6CD5\u7684\u59D4\u6258\u8C03\u7528\u3002</p></blockquote><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShapeMaker</span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FacadePattern</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">ShapeMaker</span> shapeMaker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShapeMaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      shapeMaker<span class="token punctuation">.</span><span class="token function">drawCircle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      shapeMaker<span class="token punctuation">.</span><span class="token function">drawRectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      shapeMaker<span class="token punctuation">.</span><span class="token function">drawSquare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u9002\u914D\u5668-adapter" tabindex="-1"><a class="header-anchor" href="#\u9002\u914D\u5668-adapter" aria-hidden="true">#</a> \u9002\u914D\u5668(Adapter)</h3><blockquote><p>\u9002\u914D\u5668\u6A21\u5F0F(Adapter pattern): \u5C06\u4E00\u4E2A\u7C7B\u7684\u63A5\u53E3, \u8F6C\u6362\u6210\u5BA2\u6237\u671F\u671B\u7684\u53E6\u4E00\u4E2A\u63A5\u53E3\u3002 \u9002\u914D\u5668\u8BA9\u539F\u672C\u63A5\u53E3\u4E0D\u517C\u5BB9\u7684\u7C7B\u53EF\u4EE5\u5408\u4F5C\u65E0\u95F4\u3002 \u5BF9\u8C61\u9002\u914D\u5668\u4F7F\u7528\u7EC4\u5408, \u7C7B\u9002\u914D\u5668\u4F7F\u7528\u591A\u91CD\u7EE7\u627F\u3002\u4F8B\u5982typec\u8F6Cusb\u8F6C\u63A5\u53E3\u3002</p></blockquote>`,7),c=[t];function o(l,i){return s(),a("div",null,c)}const d=n(e,[["render",o],["__file","structural.html.vue"]]);export{d as default};
