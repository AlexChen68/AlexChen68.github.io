const l=JSON.parse(`{"key":"v-0a81f390","path":"/md/java/tool/01-log.html","title":"Java 日志框架","lang":"zh-CN","frontmatter":{"title":"Java 日志框架","date":"2022-09-30T00:00:00.000Z","tag":"日志","category":"Java 工具类","description":"日志框架 日志简介 在 Java 开发中，有各式各样的日志工具库来实现日志功能，本文介绍日志框架中的日志门面和日志库的区别以及常用的日志工具。 日志门面是日志功能的接口定义，而日志库是接口的实现。 常用的日志门面有： apache 的开源日志门面框架 common-logging 大神 Ceki Gulcu 开发的 slf4j 框架 常用的日志库有： java.util.logging (JUL) Log4j Logback Log4j2","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/md/java/tool/01-log.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"Java 日志框架"}],["meta",{"property":"og:description","content":"日志框架 日志简介 在 Java 开发中，有各式各样的日志工具库来实现日志功能，本文介绍日志框架中的日志门面和日志库的区别以及常用的日志工具。 日志门面是日志功能的接口定义，而日志库是接口的实现。 常用的日志门面有： apache 的开源日志门面框架 common-logging 大神 Ceki Gulcu 开发的 slf4j 框架 常用的日志库有： java.util.logging (JUL) Log4j Logback Log4j2"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-07T16:15:18.000Z"}],["meta",{"property":"article:tag","content":"日志"}],["meta",{"property":"article:published_time","content":"2022-09-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-07T16:15:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 日志框架\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-30T00:00:00.000Z\\",\\"dateModified\\":\\"2023-03-07T16:15:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"日志简介","slug":"日志简介","link":"#日志简介","children":[]},{"level":2,"title":"日志门面","slug":"日志门面","link":"#日志门面","children":[{"level":3,"title":"common-logging","slug":"common-logging","link":"#common-logging","children":[]},{"level":3,"title":"slf4j","slug":"slf4j","link":"#slf4j","children":[]},{"level":3,"title":"比较","slug":"比较","link":"#比较","children":[]}]},{"level":2,"title":"日志库","slug":"日志库","link":"#日志库","children":[{"level":3,"title":"java.util.logging (JUL)","slug":"java-util-logging-jul","link":"#java-util-logging-jul","children":[]},{"level":3,"title":"Log4j","slug":"log4j","link":"#log4j","children":[]},{"level":3,"title":"Logback","slug":"logback","link":"#logback","children":[]},{"level":3,"title":"Log4j2","slug":"log4j2","link":"#log4j2","children":[]},{"level":3,"title":"比较","slug":"比较-1","link":"#比较-1","children":[]}]},{"level":2,"title":"Slf4j + Logback 的使用","slug":"slf4j-logback-的使用","link":"#slf4j-logback-的使用","children":[]},{"level":2,"title":"日志框架选择及使用建议","slug":"日志框架选择及使用建议","link":"#日志框架选择及使用建议","children":[]},{"level":2,"title":"Logback 配置详解","slug":"logback-配置详解","link":"#logback-配置详解","children":[{"level":3,"title":"Logback 的配置介绍","slug":"logback-的配置介绍","link":"#logback-的配置介绍","children":[]},{"level":3,"title":"配置 logback","slug":"配置-logback","link":"#配置-logback","children":[]},{"level":3,"title":"Logback 的默认配置","slug":"logback-的默认配置","link":"#logback-的默认配置","children":[]},{"level":3,"title":"logback.xml 常用配置详解","slug":"logback-xml-常用配置详解","link":"#logback-xml-常用配置详解","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1676724442000,"updatedTime":1678205718000,"contributors":[{"name":"AlexChen","email":"1274812218@qq.com","commits":5}]},"readingTime":{"minutes":13.72,"words":4116},"filePathRelative":"md/java/tool/01-log.md","localizedDate":"2022年9月30日","excerpt":"<h1> 日志框架</h1>\\n<h2> 日志简介</h2>\\n<p>在 Java 开发中，有各式各样的日志工具库来实现日志功能，本文介绍日志框架中的日志门面和日志库的区别以及常用的日志工具。</p>\\n<p>日志门面是日志功能的接口定义，而日志库是接口的实现。</p>\\n<p>常用的日志门面有：</p>\\n<ul>\\n<li>\\n<p>apache 的开源日志门面框架 common-logging</p>\\n</li>\\n<li>\\n<p>大神 Ceki Gulcu 开发的 slf4j 框架</p>\\n</li>\\n</ul>\\n<p>常用的日志库有：</p>\\n<ul>\\n<li>java.util.logging (JUL)</li>\\n<li>Log4j</li>\\n<li>Logback</li>\\n<li>Log4j2</li>\\n</ul>","autoDesc":true}`);export{l as data};
