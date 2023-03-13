const e=JSON.parse(`{"key":"v-769faff6","path":"/md/java/concurrency/juc/executor.html","title":"JUC - Executor 框架","lang":"zh-CN","frontmatter":{"title":"JUC - Executor 框架","category":"Concurrency","date":"2023-03-07T00:00:00.000Z","description":"简介 Executor 框架是指 JDK 1.5 中引入的一系列并发库中与 Executor 相关的功能类，包括 Executor、Executors、ExecutorService、Future、Callable 等。 Executor 框架主要包含三个部分： 任务：包括 Runnable 和 Callable，其中 Runnable 表示一个可以异步执行的任务，而 Callable 表示一个会产生结果的任务。 任务的执行：包括 Executor 框架的核心接口 Executor 以及其子接口 ExecutorService。在 Executor 框架中有两个关键类 ThreadPoolExecutor 和 ScheduledThreadPoolExecutor 实现了 ExecutorService 接口。 异步计算的结果：包括接口 Future 和其实现类 FutureTask。","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/md/java/concurrency/juc/executor.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"JUC - Executor 框架"}],["meta",{"property":"og:description","content":"简介 Executor 框架是指 JDK 1.5 中引入的一系列并发库中与 Executor 相关的功能类，包括 Executor、Executors、ExecutorService、Future、Callable 等。 Executor 框架主要包含三个部分： 任务：包括 Runnable 和 Callable，其中 Runnable 表示一个可以异步执行的任务，而 Callable 表示一个会产生结果的任务。 任务的执行：包括 Executor 框架的核心接口 Executor 以及其子接口 ExecutorService。在 Executor 框架中有两个关键类 ThreadPoolExecutor 和 ScheduledThreadPoolExecutor 实现了 ExecutorService 接口。 异步计算的结果：包括接口 Future 和其实现类 FutureTask。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-13T18:12:02.000Z"}],["meta",{"property":"article:published_time","content":"2023-03-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-13T18:12:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUC - Executor 框架\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-07T00:00:00.000Z\\",\\"dateModified\\":\\"2023-03-13T18:12:02.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"Executor 核心类","slug":"executor-核心类","link":"#executor-核心类","children":[{"level":3,"title":"Executor","slug":"executor","link":"#executor","children":[]},{"level":3,"title":"ExecutorService","slug":"executorservice","link":"#executorservice","children":[]},{"level":3,"title":"AbstractExecutorService","slug":"abstractexecutorservice","link":"#abstractexecutorservice","children":[]},{"level":3,"title":"ThreadPoolExecutor","slug":"threadpoolexecutor","link":"#threadpoolexecutor","children":[]},{"level":3,"title":"ScheduledExecutorService","slug":"scheduledexecutorservice","link":"#scheduledexecutorservice","children":[]},{"level":3,"title":"ScheduledThreadPoolExecutor","slug":"scheduledthreadpoolexecutor","link":"#scheduledthreadpoolexecutor","children":[]},{"level":3,"title":"ForkJoinPool","slug":"forkjoinpool","link":"#forkjoinpool","children":[]}]},{"level":2,"title":"Executors","slug":"executors","link":"#executors","children":[]},{"level":2,"title":"ThreadPoolExecutor","slug":"threadpoolexecutor-1","link":"#threadpoolexecutor-1","children":[{"level":3,"title":"ThreadPoolExecutor 的重要参数","slug":"threadpoolexecutor-的重要参数","link":"#threadpoolexecutor-的重要参数","children":[]},{"level":3,"title":"ThreadPoolExecutor 实例","slug":"threadpoolexecutor-实例","link":"#threadpoolexecutor-实例","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1678731122000,"updatedTime":1678731122000,"contributors":[{"name":"AlexChen","email":"1274812218@qq.com","commits":1}]},"readingTime":{"minutes":7.25,"words":2175},"filePathRelative":"md/java/concurrency/juc/executor.md","localizedDate":"2023年3月7日","excerpt":"<h2> 简介</h2>\\n<p><strong>Executor</strong> 框架是指 JDK 1.5 中引入的一系列并发库中与 <code>Executor</code> 相关的功能类，包括 <code>Executor、Executors、ExecutorService、Future、Callable</code> 等。</p>\\n<p>Executor 框架主要包含三个部分：</p>\\n<ul>\\n<li><strong>任务</strong>：包括 <code>Runnable</code> 和 <code>Callable</code>，其中 <code>Runnable</code> 表示一个可以异步执行的任务，而 <code>Callable</code> 表示一个会产生结果的任务。</li>\\n<li><strong>任务的执行</strong>：包括 Executor 框架的核心接口 <code>Executor</code> 以及其子接口 <code>ExecutorService</code>。在 Executor 框架中有两个关键类 <code>ThreadPoolExecutor</code> 和 <code>ScheduledThreadPoolExecutor</code> 实现了 ExecutorService 接口。</li>\\n<li><strong>异步计算的结果</strong>：包括接口 <code>Future</code> 和其实现类 <code>FutureTask</code>。</li>\\n</ul>","autoDesc":true}`);export{e as data};