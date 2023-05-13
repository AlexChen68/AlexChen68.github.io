const e=JSON.parse(`{"key":"v-167d8afb","path":"/frontend/ECMAScript6/1.3-destructuring.html","title":"变量的解构赋值","lang":"zh-CN","frontmatter":{"title":"变量的解构赋值","category":"ES6","date":"2023-05-13T00:00:00.000Z","description":"原文出处：ECMAScript 6 入门 什么是解构赋值 ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。 我们先模拟一个 JSON 数据： let user = { id: 1024, name: alex, age: 18, address: \\"广东深圳\\" }","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/frontend/ECMAScript6/1.3-destructuring.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"变量的解构赋值"}],["meta",{"property":"og:description","content":"原文出处：ECMAScript 6 入门 什么是解构赋值 ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。 我们先模拟一个 JSON 数据： let user = { id: 1024, name: alex, age: 18, address: \\"广东深圳\\" }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-13T14:29:06.000Z"}],["meta",{"property":"article:author","content":"AlexChen"}],["meta",{"property":"article:published_time","content":"2023-05-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-13T14:29:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"变量的解构赋值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-13T00:00:00.000Z\\",\\"dateModified\\":\\"2023-05-13T14:29:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"AlexChen\\",\\"url\\":\\"https://github.com/AlexChen68\\"}]}"]]},"headers":[{"level":2,"title":"什么是解构赋值","slug":"什么是解构赋值","link":"#什么是解构赋值","children":[]},{"level":2,"title":"数组的解构赋值","slug":"数组的解构赋值","link":"#数组的解构赋值","children":[{"level":3,"title":"解构赋值","slug":"解构赋值","link":"#解构赋值","children":[]},{"level":3,"title":"默认值","slug":"默认值","link":"#默认值","children":[]}]},{"level":2,"title":"对象的解构赋值","slug":"对象的解构赋值","link":"#对象的解构赋值","children":[{"level":3,"title":"解构赋值","slug":"解构赋值-1","link":"#解构赋值-1","children":[]},{"level":3,"title":"默认值","slug":"默认值-1","link":"#默认值-1","children":[]}]},{"level":2,"title":"字符串的解构赋值","slug":"字符串的解构赋值","link":"#字符串的解构赋值","children":[]},{"level":2,"title":"数值和布尔值的解构赋值","slug":"数值和布尔值的解构赋值","link":"#数值和布尔值的解构赋值","children":[]},{"level":2,"title":"函数参数的解构赋值","slug":"函数参数的解构赋值","link":"#函数参数的解构赋值","children":[]},{"level":2,"title":"注意事项","slug":"注意事项","link":"#注意事项","children":[{"level":3,"title":"已声明变量的解构赋值","slug":"已声明变量的解构赋值","link":"#已声明变量的解构赋值","children":[]},{"level":3,"title":"用数组下标解构赋值","slug":"用数组下标解构赋值","link":"#用数组下标解构赋值","children":[]},{"level":3,"title":"圆括号问题","slug":"圆括号问题","link":"#圆括号问题","children":[]}]},{"level":2,"title":"解构赋值的用途","slug":"解构赋值的用途","link":"#解构赋值的用途","children":[{"level":3,"title":"交换变量的值","slug":"交换变量的值","link":"#交换变量的值","children":[]},{"level":3,"title":"从函数返回多个值","slug":"从函数返回多个值","link":"#从函数返回多个值","children":[]},{"level":3,"title":"函数参数的定义","slug":"函数参数的定义","link":"#函数参数的定义","children":[]},{"level":3,"title":"提取 JSON 数据","slug":"提取-json-数据","link":"#提取-json-数据","children":[]},{"level":3,"title":"函数参数的默认值","slug":"函数参数的默认值","link":"#函数参数的默认值","children":[]},{"level":3,"title":"遍历 Map 结构","slug":"遍历-map-结构","link":"#遍历-map-结构","children":[]},{"level":3,"title":"输入模块的指定方法","slug":"输入模块的指定方法","link":"#输入模块的指定方法","children":[]}]}],"git":{"createdTime":1683988146000,"updatedTime":1683988146000,"contributors":[{"name":"alexchen","email":"1274812218@qq.com","commits":1}]},"readingTime":{"minutes":10.91,"words":3273},"filePathRelative":"frontend/ECMAScript6/1.3-destructuring.md","localizedDate":"2023年5月13日","excerpt":"<blockquote>\\n<p>原文出处：<a href=\\"https://es6.ruanyifeng.com/#docs/destructuring\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">ECMAScript 6 入门</a></p>\\n</blockquote>\\n<h2> 什么是解构赋值</h2>\\n<blockquote>\\n<p>ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。</p>\\n</blockquote>\\n<p>我们先模拟一个 JSON 数据：</p>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token keyword\\">let</span> user <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token literal-property property\\">id</span><span class=\\"token operator\\">:</span> <span class=\\"token number\\">1024</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token literal-property property\\">name</span><span class=\\"token operator\\">:</span> alex<span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token literal-property property\\">age</span><span class=\\"token operator\\">:</span> <span class=\\"token number\\">18</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token literal-property property\\">address</span><span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"广东深圳\\"</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{e as data};