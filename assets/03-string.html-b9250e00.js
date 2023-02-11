const t=JSON.parse(`{"key":"v-1587dd26","path":"/md/java/basic/03-string.html","title":"String 字符串详解","lang":"zh-CN","frontmatter":{"title":"String 字符串详解","order":3,"date":"2022-09-15T00:00:00.000Z","tag":["String"],"category":["Java 基础"],"isOriginal":true,"description":"String 字符串详解","head":[["meta",{"property":"og:url","content":"https://AlexChen68.github.com/blog/blog/md/java/basic/03-string.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"String 字符串详解"}],["meta",{"property":"og:description","content":"String 字符串详解"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-02-11T15:09:23.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:published_time","content":"2022-09-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-11T15:09:23.000Z"}]]},"headers":[{"level":2,"title":"String 概述","slug":"string-概述","link":"#string-概述","children":[]}],"git":{"createdTime":1664572145000,"updatedTime":1676128163000,"contributors":[{"name":"AlexChen","email":"1274812218@qq.com","commits":1},{"name":"alexchen68","email":"1274812218@qq.com","commits":1}]},"readingTime":{"minutes":1.46,"words":439},"filePathRelative":"md/java/basic/03-string.md","localizedDate":"2022年9月15日","excerpt":"<h2> String 概述</h2>\\n<blockquote>\\n<p>String 内部使用字符数组实现，且 String 被声明为 final，不可以被继承，这意味着 value 数组初始化之后就不能再引用其它数组。并且 String 内部没有改变 value 数组的方法，因此可以保证 String 不可变。</p>\\n<p>当我们调用 String 类的任何方法（比如说 <code>trim()</code>、<code>substring()</code>、<code>toLowerCase()</code>）时，总会返回一个新的对象，而不影响之前的值。</p>\\n<p>Java 9 以前，String 是用 char 型数组实现的，之后改成了 byte 型数组实现，并增加了 coder 来表示编码。</p>\\n</blockquote>"}`);export{t as data};
