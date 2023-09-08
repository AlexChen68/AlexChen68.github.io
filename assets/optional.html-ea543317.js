const n=JSON.parse(`{"key":"v-2c7b4be8","path":"/java/java8/optional.html","title":"Java 8 新特性之 Optional","lang":"zh-CN","frontmatter":{"title":"Java 8 新特性之 Optional","category":"Java 8","date":"2023-01-02T00:00:00.000Z","description":"1. 什么是 Optional？ Optional 类 Java 8 引入的一个很有趣的特性。Optional 类主要解决的问题是臭名昭著的空指针异常（NullPointerException）。 本质上，这是一个包含有可选值的包装类，这意味着 Optional 类既可以含有对象也可以为空。 public final class Optional&lt;T&gt; { // 通用的空对象，调用 empty() 时都会返回它 private static final Optional&lt;?&gt; EMPTY = new Optional&lt;&gt;(); // 用来存储实际的值 private final T value; // 构造方法私有，只能通过 of() 和 ofNullable 创建 private Optional() { this.value = null; } }","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/java/java8/optional.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"Java 8 新特性之 Optional"}],["meta",{"property":"og:description","content":"1. 什么是 Optional？ Optional 类 Java 8 引入的一个很有趣的特性。Optional 类主要解决的问题是臭名昭著的空指针异常（NullPointerException）。 本质上，这是一个包含有可选值的包装类，这意味着 Optional 类既可以含有对象也可以为空。 public final class Optional&lt;T&gt; { // 通用的空对象，调用 empty() 时都会返回它 private static final Optional&lt;?&gt; EMPTY = new Optional&lt;&gt;(); // 用来存储实际的值 private final T value; // 构造方法私有，只能通过 of() 和 ofNullable 创建 private Optional() { this.value = null; } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-10T10:15:47.000Z"}],["meta",{"property":"article:author","content":"AlexChen"}],["meta",{"property":"article:published_time","content":"2023-01-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-10T10:15:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 8 新特性之 Optional\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-02T00:00:00.000Z\\",\\"dateModified\\":\\"2023-05-10T10:15:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"AlexChen\\",\\"url\\":\\"https://github.com/AlexChen68\\"}]}"]]},"headers":[{"level":2,"title":"1. 什么是 Optional？","slug":"_1-什么是-optional","link":"#_1-什么是-optional","children":[]},{"level":2,"title":"2. 创建 Optional 对象","slug":"_2-创建-optional-对象","link":"#_2-创建-optional-对象","children":[{"level":3,"title":"empty","slug":"empty","link":"#empty","children":[]},{"level":3,"title":"of","slug":"of","link":"#of","children":[]},{"level":3,"title":"ofNullable","slug":"ofnullable","link":"#ofnullable","children":[]}]},{"level":2,"title":"3. 使用 Optional 类","slug":"_3-使用-optional-类","link":"#_3-使用-optional-类","children":[{"level":3,"title":"isPresent","slug":"ispresent","link":"#ispresent","children":[]},{"level":3,"title":"get","slug":"get","link":"#get","children":[]},{"level":3,"title":"ifPresent","slug":"ifpresent","link":"#ifpresent","children":[]},{"level":3,"title":"orElse","slug":"orelse","link":"#orelse","children":[]},{"level":3,"title":"orElseGet","slug":"orelseget","link":"#orelseget","children":[]},{"level":3,"title":"orElseThrow","slug":"orelsethrow","link":"#orelsethrow","children":[]},{"level":3,"title":"map","slug":"map","link":"#map","children":[]},{"level":3,"title":"flatMap","slug":"flatmap","link":"#flatmap","children":[]},{"level":3,"title":"filter","slug":"filter","link":"#filter","children":[]}]},{"level":2,"title":"4. Optional 应用场景","slug":"_4-optional-应用场景","link":"#_4-optional-应用场景","children":[]},{"level":2,"title":"5. 使用 Optional 的用法和争议","slug":"_5-使用-optional-的用法和争议","link":"#_5-使用-optional-的用法和争议","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1681385905000,"updatedTime":1683713747000,"contributors":[{"name":"alexchen","email":"1274812218@qq.com","commits":1},{"name":"alexchen68","email":"1274812218@qq.com","commits":1}]},"readingTime":{"minutes":5.46,"words":1637},"filePathRelative":"java/java8/optional.md","localizedDate":"2023年1月2日","excerpt":"<h2> 1. 什么是 Optional？</h2>\\n<p>Optional 类 Java 8 引入的一个很有趣的特性。Optional 类主要解决的问题是臭名昭著的空指针异常（NullPointerException）。</p>\\n<p>本质上，这是一个包含有可选值的包装类，这意味着 Optional 类既可以含有对象也可以为空。</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Optional</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">T</span><span class=\\"token punctuation\\">&gt;</span></span> <span class=\\"token punctuation\\">{</span>\\n\\n  <span class=\\"token comment\\">// 通用的空对象，调用 empty() 时都会返回它</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Optional</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">&gt;</span></span> <span class=\\"token constant\\">EMPTY</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Optional</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token comment\\">// 用来存储实际的值</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">T</span> value<span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token comment\\">// 构造方法私有，只能通过 of() 和 ofNullable 创建</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Optional</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>value <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{n as data};