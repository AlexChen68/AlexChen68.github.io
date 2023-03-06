const e=JSON.parse(`{"key":"v-3fe06ba2","path":"/md/spring/spring/11-resources.html","title":"Spring 资源(Resources)","lang":"zh-CN","frontmatter":{"title":"Spring 资源(Resources)","article":true,"date":"2022-10-09T00:00:00.000Z","tag":["Spring"],"category":["Spring"],"isOriginal":true,"description":"Spring 资源(Resources)","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/md/spring/spring/11-resources.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"Spring 资源(Resources)"}],["meta",{"property":"og:description","content":"Spring 资源(Resources)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-21T15:20:07.000Z"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:published_time","content":"2022-10-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-21T15:20:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring 资源(Resources)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-10-09T00:00:00.000Z\\",\\"dateModified\\":\\"2023-02-21T15:20:07.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"Resource 接口","slug":"resource-接口","link":"#resource-接口","children":[]},{"level":2,"title":"内置 Resource 实现","slug":"内置-resource-实现","link":"#内置-resource-实现","children":[]},{"level":2,"title":"ResourceLoader","slug":"resourceloader","link":"#resourceloader","children":[]},{"level":2,"title":"ResourcePatternResolver 接口","slug":"resourcepatternresolver-接口","link":"#resourcepatternresolver-接口","children":[]},{"level":2,"title":"ResourceLoaderAware 接口","slug":"resourceloaderaware-接口","link":"#resourceloaderaware-接口","children":[]}],"git":{"createdTime":1672329285000,"updatedTime":1676992807000,"contributors":[{"name":"AlexChen","email":"1274812218@qq.com","commits":3},{"name":"alexchen","email":"1274812218@qq.com","commits":1}]},"readingTime":{"minutes":2.78,"words":835},"filePathRelative":"md/spring/spring/11-resources.md","localizedDate":"2022年10月9日","excerpt":"<h2> 简介</h2>\\n<p>遗憾的是,Java 的标准 <code>java.net.URL</code> 类和各种 URL 前缀的标准处理程序不足以完全访问底层资源。 例如,没有标准化的 <code>URL</code> 实现可用于访问需要从类路径或相对于 <code>ServletContext</code> 获取的资源。 虽然可以为专用 <code>URL</code> 前缀注册新的处理程序(类似于 <code>http:</code>)这样的前缀的现有处理程序,但这通常非常复杂,并且 <code>URL</code> 接口仍然缺少一些理想的功能,例如检查当前资源是否存在的方法。</p>"}`);export{e as data};
