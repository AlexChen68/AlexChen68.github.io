const e=JSON.parse(`{"key":"v-195ae008","path":"/md/java/juc/01-thread.html","title":"Thread 详解","lang":"zh-CN","frontmatter":{"title":"Thread 详解","date":"2022-09-30T00:00:00.000Z","tag":"JUC","category":"Java 并发","description":"Java 线程","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/md/java/juc/01-thread.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"Thread 详解"}],["meta",{"property":"og:description","content":"Java 线程"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-07T16:15:18.000Z"}],["meta",{"property":"article:tag","content":"JUC"}],["meta",{"property":"article:published_time","content":"2022-09-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-07T16:15:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Thread 详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-30T00:00:00.000Z\\",\\"dateModified\\":\\"2023-03-07T16:15:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"什么是线程","slug":"什么是线程","link":"#什么是线程","children":[]},{"level":2,"title":"线程的状态","slug":"线程的状态","link":"#线程的状态","children":[{"level":3,"title":"新建（NEW）","slug":"新建-new","link":"#新建-new","children":[]},{"level":3,"title":"可运行 (Runnable)","slug":"可运行-runnable","link":"#可运行-runnable","children":[]},{"level":3,"title":"阻塞 (BLOCKED)","slug":"阻塞-blocked","link":"#阻塞-blocked","children":[]},{"level":3,"title":"无限期等待 (WAITING)","slug":"无限期等待-waiting","link":"#无限期等待-waiting","children":[]},{"level":3,"title":"限期等待 (TIMED_WAITING)","slug":"限期等待-timed-waiting","link":"#限期等待-timed-waiting","children":[]},{"level":3,"title":"终止（TERMINATED）","slug":"终止-terminated","link":"#终止-terminated","children":[]}]},{"level":2,"title":"线程状态的转换","slug":"线程状态的转换","link":"#线程状态的转换","children":[{"level":3,"title":"BLOCKED <-> RUNNABLE","slug":"blocked-runnable","link":"#blocked-runnable","children":[]},{"level":3,"title":"WAITING <-> RUNNABLE","slug":"waiting-runnable","link":"#waiting-runnable","children":[]},{"level":3,"title":"TIMED_WAITING <-> RUNNABLE","slug":"timed-waiting-runnable","link":"#timed-waiting-runnable","children":[]}]},{"level":2,"title":"创建线程的方式","slug":"创建线程的方式","link":"#创建线程的方式","children":[{"level":3,"title":"实现 Runnable 接口","slug":"实现-runnable-接口","link":"#实现-runnable-接口","children":[]},{"level":3,"title":"继承 Thread 类","slug":"继承-thread-类","link":"#继承-thread-类","children":[]},{"level":3,"title":"实现 Callable 接口","slug":"实现-callable-接口","link":"#实现-callable-接口","children":[]}]},{"level":2,"title":"Thread 常用方法","slug":"thread-常用方法","link":"#thread-常用方法","children":[{"level":3,"title":"sleep()","slug":"sleep","link":"#sleep","children":[]},{"level":3,"title":"join()","slug":"join","link":"#join","children":[]},{"level":3,"title":"setDaemon()","slug":"setdaemon","link":"#setdaemon","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1672326923000,"updatedTime":1678205718000,"contributors":[{"name":"AlexChen","email":"1274812218@qq.com","commits":4},{"name":"alexchen","email":"1274812218@qq.com","commits":1}]},"readingTime":{"minutes":9.65,"words":2896},"filePathRelative":"md/java/juc/01-thread.md","localizedDate":"2022年9月30日","excerpt":"<h2> 什么是线程</h2>\\n<ul>\\n<li>进程，是对运行时程序的封装，是系统进行资源调度和分配的基本单位，实现了操作系统的并发。</li>\\n<li>线程，是进程的子任务，是 CPU 调度和分派的基本单位，实现了进程内部的并发。</li>\\n</ul>\\n<h2> 线程的状态</h2>\\n<p><strong>首先来看操作系统中的线程的状态：</strong></p>\\n<blockquote>\\n<p>在现在的操作系统中，线程是被视为轻量级进程的，所以操作系统线程的状态其实和操作系统进程的状态是一致的。</p>\\n</blockquote>\\n<p><img src=\\"https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/java/system_thread_state.png\\" alt=\\"操作系统线程状态\\" loading=\\"lazy\\"></p>"}`);export{e as data};
