const e=JSON.parse(`{"key":"v-06ffc82f","path":"/md/java/collection/map-treemap.html","title":"Map - TreeMap 源码分析","lang":"zh-CN","frontmatter":{"title":"Map - TreeMap 源码分析","date":"2022-09-30T00:00:00.000Z","tag":"Collection","category":"Java Collection","order":8,"description":"概述 TreeMap 是一个可以按照 key 的顺序排序的 Map 实现类，它底层使用红黑树实现。 红黑树是一种二叉查找树，左子结点的值都小于父结点，右子结点的值都大于父结点；红黑树会进行自平衡，避免树的高度过高，导致查找性能下降。因此，红黑树能提供 logN 的时间复杂度。 类图","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/md/java/collection/map-treemap.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"Map - TreeMap 源码分析"}],["meta",{"property":"og:description","content":"概述 TreeMap 是一个可以按照 key 的顺序排序的 Map 实现类，它底层使用红黑树实现。 红黑树是一种二叉查找树，左子结点的值都小于父结点，右子结点的值都大于父结点；红黑树会进行自平衡，避免树的高度过高，导致查找性能下降。因此，红黑树能提供 logN 的时间复杂度。 类图"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-28T19:53:35.000Z"}],["meta",{"property":"article:tag","content":"Collection"}],["meta",{"property":"article:published_time","content":"2022-09-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-28T19:53:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Map - TreeMap 源码分析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-30T00:00:00.000Z\\",\\"dateModified\\":\\"2023-02-28T19:53:35.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"类图","slug":"类图","link":"#类图","children":[]},{"level":2,"title":"属性","slug":"属性","link":"#属性","children":[]},{"level":2,"title":"内部类","slug":"内部类","link":"#内部类","children":[]},{"level":2,"title":"构造方法","slug":"构造方法","link":"#构造方法","children":[]},{"level":2,"title":"Map 方法","slug":"map-方法","link":"#map-方法","children":[{"level":3,"title":"添加键值对","slug":"添加键值对","link":"#添加键值对","children":[]},{"level":3,"title":"查找键值对","slug":"查找键值对","link":"#查找键值对","children":[]},{"level":3,"title":"删除键值对","slug":"删除键值对","link":"#删除键值对","children":[]}]},{"level":2,"title":"NavigableMap 方法","slug":"navigablemap-方法","link":"#navigablemap-方法","children":[{"level":3,"title":"获取接近的键值对","slug":"获取接近的键值对","link":"#获取接近的键值对","children":[]},{"level":3,"title":"获取首尾的键值对","slug":"获取首尾的键值对","link":"#获取首尾的键值对","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1677486677000,"updatedTime":1677614015000,"contributors":[{"name":"AlexChen","email":"1274812218@qq.com","commits":2}]},"readingTime":{"minutes":15.84,"words":4752},"filePathRelative":"md/java/collection/map-treemap.md","localizedDate":"2022年9月30日","excerpt":"<h2> 概述</h2>\\n<p><code>TreeMap</code> 是一个可以按照 key 的顺序排序的 Map 实现类，它底层使用红黑树实现。</p>\\n<p>红黑树是一种二叉查找树，左子结点的值都小于父结点，右子结点的值都大于父结点；红黑树会进行自平衡，避免树的高度过高，导致查找性能下降。因此，红黑树能提供 <code>logN</code> 的时间复杂度。</p>\\n<h2> 类图</h2>\\n<p><img src=\\"https://cdn.staticaly.com/gh/alexchen68/image-hosting@master/blog/java/treemap_class.png\\" alt=\\"TreeMap类图\\" loading=\\"lazy\\"></p>","autoDesc":true}`);export{e as data};
