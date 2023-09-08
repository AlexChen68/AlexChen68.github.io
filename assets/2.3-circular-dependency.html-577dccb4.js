const e=JSON.parse(`{"key":"v-00fd664f","path":"/spring/spring/2.3-circular-dependency.html","title":"Spring 三级缓存解决循环依赖问题","lang":"zh-CN","frontmatter":{"title":"Spring 三级缓存解决循环依赖问题","category":"Spring","date":"2023-05-18T00:00:00.000Z","description":"Spring 循环依赖问题 什么是循环依赖呢？可以把它拆分成循环和依赖两个部分来看，循环是指计算机领域中的循环，执行流程形成闭合回路；依赖就是完成这个动作的前提准备条件，和我们平常说的依赖大体上含义一致。放到 Spring 中来看就一个或多个 Bean 实例之间存在直接或间接的依赖关系，构成循环调用，循环依赖可以分为直接循环依赖和间接循环依赖。 直接循环依赖的简单依赖场景：Bean A 依赖于 Bean B，然后 Bean B 又反过来依赖于 Bean A（Bean A -&gt; Bean B -&gt; Bean A）； 间接循环依赖的一个依赖场景：Bean A 依赖于 Bean B，Bean B 依赖于 Bean C，Bean C 依赖于 Bean A，中间多了一层，但是最终还是形成循环（Bean A -&gt; Bean B -&gt; Bean C -&gt; Bean A）。","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/spring/spring/2.3-circular-dependency.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"Spring 三级缓存解决循环依赖问题"}],["meta",{"property":"og:description","content":"Spring 循环依赖问题 什么是循环依赖呢？可以把它拆分成循环和依赖两个部分来看，循环是指计算机领域中的循环，执行流程形成闭合回路；依赖就是完成这个动作的前提准备条件，和我们平常说的依赖大体上含义一致。放到 Spring 中来看就一个或多个 Bean 实例之间存在直接或间接的依赖关系，构成循环调用，循环依赖可以分为直接循环依赖和间接循环依赖。 直接循环依赖的简单依赖场景：Bean A 依赖于 Bean B，然后 Bean B 又反过来依赖于 Bean A（Bean A -&gt; Bean B -&gt; Bean A）； 间接循环依赖的一个依赖场景：Bean A 依赖于 Bean B，Bean B 依赖于 Bean C，Bean C 依赖于 Bean A，中间多了一层，但是最终还是形成循环（Bean A -&gt; Bean B -&gt; Bean C -&gt; Bean A）。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-02T02:54:43.000Z"}],["meta",{"property":"article:author","content":"AlexChen"}],["meta",{"property":"article:published_time","content":"2023-05-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-02T02:54:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring 三级缓存解决循环依赖问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-18T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-02T02:54:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"AlexChen\\",\\"url\\":\\"https://github.com/AlexChen68\\"}]}"]]},"headers":[{"level":2,"title":"Spring 循环依赖问题","slug":"spring-循环依赖问题","link":"#spring-循环依赖问题","children":[]},{"level":2,"title":"循环依赖的类型","slug":"循环依赖的类型","link":"#循环依赖的类型","children":[]},{"level":2,"title":"Spring 三级缓存","slug":"spring-三级缓存","link":"#spring-三级缓存","children":[]},{"level":2,"title":"Spring 对几种循环依赖场景支持情况","slug":"spring-对几种循环依赖场景支持情况","link":"#spring-对几种循环依赖场景支持情况","children":[{"level":3,"title":"第 ① 种场景——单例 Bean 的 setter 注入","slug":"第-1-种场景——单例-bean-的-setter-注入","link":"#第-1-种场景——单例-bean-的-setter-注入","children":[]},{"level":3,"title":"第 ② 种场景——多例 Bean 的 setter 注入","slug":"第-2-种场景——多例-bean-的-setter-注入","link":"#第-2-种场景——多例-bean-的-setter-注入","children":[]},{"level":3,"title":"第 ③ 种场景——代理对象的 setter 注入","slug":"第-3-种场景——代理对象的-setter-注入","link":"#第-3-种场景——代理对象的-setter-注入","children":[]},{"level":3,"title":"第 ④ 种场景——构造器注入","slug":"第-4-种场景——构造器注入","link":"#第-4-种场景——构造器注入","children":[]},{"level":3,"title":"第 ⑤ 种场景——DependsOn 循环依赖","slug":"第-5-种场景——dependson-循环依赖","link":"#第-5-种场景——dependson-循环依赖","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1688266483000,"updatedTime":1688266483000,"contributors":[{"name":"alexchen68","email":"1274812218@qq.com","commits":1}]},"readingTime":{"minutes":8.45,"words":2534},"filePathRelative":"spring/spring/2.3-circular-dependency.md","localizedDate":"2023年5月18日","excerpt":"<h2> Spring 循环依赖问题</h2>\\n<p>什么是循环依赖呢？可以把它拆分成循环和依赖两个部分来看，循环是指计算机领域中的循环，执行流程形成闭合回路；依赖就是完成这个动作的前提准备条件，和我们平常说的依赖大体上含义一致。放到 Spring 中来看就一个或多个 Bean 实例之间存在直接或间接的依赖关系，构成循环调用，循环依赖可以分为直接循环依赖和间接循环依赖。</p>\\n<p>直接循环依赖的简单依赖场景：Bean A 依赖于 Bean B，然后 Bean B 又反过来依赖于 Bean A（Bean A -&gt; Bean B -&gt; Bean A）；</p>\\n<p>间接循环依赖的一个依赖场景：Bean A 依赖于 Bean B，Bean B 依赖于 Bean C，Bean C 依赖于 Bean A，中间多了一层，但是最终还是形成循环（Bean A -&gt; Bean B -&gt; Bean C -&gt; Bean A）。</p>","autoDesc":true}`);export{e as data};