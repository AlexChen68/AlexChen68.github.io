import{_ as o,W as t,X as a,Y as e,Z as c,a1 as n,a0 as l,C as u}from"./framework-a443708f.js";const s={},d=l('<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p><strong>Executor</strong> 框架是指 JDK 1.5 中引入的一系列并发库中与 <code>Executor</code> 相关的功能类，包括 <code>Executor、Executors、ExecutorService、Future、Callable</code> 等。</p><h2 id="executors" tabindex="-1"><a class="header-anchor" href="#executors" aria-hidden="true">#</a> Executors</h2><p><code>java.util.concurrent</code> 包下的 <code>Executors</code> 是 JDK 提供的工厂工具类，用来创建管理线程的工具例如线程池。</p><p>Executor 框架主要包含三个部分：</p><ul><li><strong>任务</strong>：包括 Runnable 和 Callable，其中 Runnable 表示一个可以异步执行的任务，而 Callable 表示一个会产生结果的任务</li><li><strong>任务的执行</strong>：包括 Executor 框架的核心接口 Executor 以及其子接口 ExecutorService。在 Executor 框架中有两个关键类 ThreadPoolExecutor 和 ScheduledThreadPoolExecutor 实现了 ExecutorService 接口。</li><li><strong>异步计算的结果</strong>：包括接口 Future 和其实现类 FutureTask。</li></ul><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>',7),i={href:"https://www.jianshu.com/p/d63d01550f0e",target:"_blank",rel:"noopener noreferrer"};function h(x,E){const r=u("ExternalLinkIcon");return t(),a("div",null,[d,e("ul",null,[e("li",null,[e("a",i,[c("Java Executors(线程池)"),n(r)])])])])}const p=o(s,[["render",h],["__file","02-executor.html.vue"]]);export{p as default};
