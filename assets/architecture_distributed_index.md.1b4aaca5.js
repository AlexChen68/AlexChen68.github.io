import{_ as t,o as r,c as o,Q as a}from"./chunks/framework.419948d5.js";const p=JSON.parse('{"title":"分布式","description":"","frontmatter":{"title":"分布式","index":false,"article":false,"date":"2023-02-13T00:00:00.000Z"},"headers":[],"relativePath":"architecture/distributed/index.md","filePath":"architecture/distributed/index.md","lastUpdated":1697537189000}'),n={name:"architecture/distributed/index.md"},e=a('<h2 id="分布式系统" tabindex="-1">分布式系统 <a class="header-anchor" href="#分布式系统" aria-label="Permalink to &quot;分布式系统&quot;">​</a></h2><p><strong>分布式系统</strong>：分布式系统是一个硬件或软件组件<strong>分布在不同的网络计算机上</strong>，彼此之间仅仅<strong>通过消息传递进行通信和协调的系统</strong>。</p><h2 id="分布式与集群的区别" tabindex="-1">分布式与集群的区别 <a class="header-anchor" href="#分布式与集群的区别" aria-label="Permalink to &quot;分布式与集群的区别&quot;">​</a></h2><ul><li>集群：多个人在一起作同样的事；</li><li>分布式：多个人在一起作不同的事。</li></ul><h2 id="分布式系统面临的问题" tabindex="-1">分布式系统面临的问题 <a class="header-anchor" href="#分布式系统面临的问题" aria-label="Permalink to &quot;分布式系统面临的问题&quot;">​</a></h2><ol><li><strong>通信异常</strong>：<strong>网络本身的不可靠性</strong>，因此每次网络通信都会伴随着网络不可用的风险（光纤、路由、DNS 等硬件设备或系统的不可用），都会导致最终分布式系统无法顺利进行一次网络通信，另外，即使分布式系统各节点之间的网络通信能够正常执行，其延时也会大于单机操作，存在巨大的延时差别，也会影响消息的收发过程，因此消息丢失和消息延迟变的非常普遍。</li><li><strong>网络分区</strong>：<strong>网络之间出现了网络不连通，但各个子网络的内部网络是正常的</strong>，从而导致整个系统的网络环境被切分成了若干个孤立的区域，<strong>分布式系统就会出现局部小集群</strong>，在极端情况下，这些小集群会独立完成原本需要整个分布式系统才能完成的功能，包括数据的事务处理，这就对分布式一致性提出非常大的挑战。</li><li><strong>节点故障</strong>：节点故障是分布式系统下另一个比较常见的问题，指的是组成分布式系统的服务器节点出现的宕机或&quot;僵死&quot;现象，每个节点都有可能出现故障，并且经常发生。</li><li><strong>三态</strong>：分布式系统每一次请求与响应存在特有的&quot;三态&quot;概念，即<strong>成功、失败和超时</strong>。</li></ol><h2 id="分布式的一致性" tabindex="-1">分布式的一致性 <a class="header-anchor" href="#分布式的一致性" aria-label="Permalink to &quot;分布式的一致性&quot;">​</a></h2><p>分布式<strong>数据一致性</strong>，指的是数据在<strong>多份副本中</strong>存储时，各副本中的<strong>数据是一致的</strong>。</p><h3 id="一致性的分类" tabindex="-1">一致性的分类 <a class="header-anchor" href="#一致性的分类" aria-label="Permalink to &quot;一致性的分类&quot;">​</a></h3><ul><li><strong>强一致性</strong>：要求系统写入什么，读出来的也会是什么，用户体验好，但实现起来往往对系统的性能影响大。但是强一致性很难实现。</li><li><strong>弱一致性</strong>：在写入成功后，不承诺立即可以读到写入的值，也不承诺多久之后数据能够达到一致，但会尽可能地保证到某个时间级别（比如秒级别）后，数据能够达到一致状态。 <ol><li><strong>读写一致性</strong>：保证用户永远能够<strong>第一时间看到自己更新的内容</strong>;</li><li><strong>单调读一致性</strong>：本次读到的数据<strong>不能比上次读到的旧</strong>；</li><li><strong>因果一致性</strong>：如果节点 A 在更新完某个数据后通知了节点 B，那么节点 B 之后对该数 据的访问和修改都是基于 A 更新后的值。于此同时，和节点 A 无因果关系的节点 C 的数据访问则没有这样的限制。</li><li><strong>最终一致性</strong>：最终一致性是所有分布式一致性模型当中最弱的。可以认为是没有任何优化的&quot;最&quot;弱一致性，它的意思是说，我不考虑所有的中间状态的影响，只保证当没有新的更新之后，经过一段时间之后，最终系统内所有副本的数据是正确的。它最大程度上保证了系统的并发能力，也因此，在高并发的场景下，它也是使用最广的一致性模型。</li></ol></li></ul><h2 id="分布式事务" tabindex="-1">分布式事务 <a class="header-anchor" href="#分布式事务" aria-label="Permalink to &quot;分布式事务&quot;">​</a></h2><p>其实分布式事务从实质上看与数据库事务的概念是一致的，既然是事务也就需要满足事务的基本特性（<strong>ACID</strong>），<strong>只是分布式事务相对于本地事务而言其表现形式有很大的不同</strong></p>',12),s=[e];function i(l,g,d,h,c,u){return r(),o("div",null,s)}const q=t(n,[["render",i]]);export{p as __pageData,q as default};