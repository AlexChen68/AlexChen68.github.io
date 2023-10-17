import{_ as t,o as e,c as a,Q as i}from"./chunks/framework.419948d5.js";const h=JSON.parse('{"title":"CAP 理论","description":"","frontmatter":{"title":"CAP 理论","date":"2023-10-17T00:00:00.000Z"},"headers":[],"relativePath":"architecture/distributed/cap.md","filePath":"architecture/distributed/cap.md","lastUpdated":1697504454000}'),r={name:"architecture/distributed/cap.md"},c=i('<h2 id="cap-理论" tabindex="-1">CAP 理论 <a class="header-anchor" href="#cap-理论" aria-label="Permalink to &quot;CAP 理论&quot;">​</a></h2><p><strong>CAP 理论</strong>是分布式系统中一个很重要的理论，它描述的是一个分布式系统最多只能满足 CAP 中的两个条件，不可能同时满足三个条件。</p><p>三种条件中，P 通常都有，所以一般只分为 CP 和 AP：</p><ul><li><p>C（Consistency）：这里指的是强一致性。保证在一定时间内，集群中的各个节点会达到较强的一致性，同时，为了达到这一点，一般会牺牲一点响应时间。而放弃 C 也不意味着放弃一致性，而是放弃强一致性。允许系统内有一定的数据不一致情况的存在。</p></li><li><p>A (Avalibility)：可用性。意味着系统一直处于可用状态。个别节点的故障不会影响整个服务的运作，可以理解为容错率更高。</p></li><li><p>P（Partition Tolerance）：分区容忍性。当系统出现网络分区等情况时，依然能对外提供服务。想到达到这一点，一般来说会把数据复制到多个分区里，来提高分区容忍性。这个一般是不会被抛弃的。</p></li></ul>',4),o=[c];function s(p,n,_,l,d,P){return e(),a("div",null,o)}const A=t(r,[["render",s]]);export{h as __pageData,A as default};