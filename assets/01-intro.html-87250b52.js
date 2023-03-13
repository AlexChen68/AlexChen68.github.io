import{_ as n,W as t,X as r,Y as e,Z as o,a1 as i,a0 as l,C as c}from"./framework-07dc8c78.js";const s={},h=l('<h2 id="cap理论" tabindex="-1"><a class="header-anchor" href="#cap理论" aria-hidden="true">#</a> CAP理论</h2><p><strong>CAP 理论</strong>是分布式系统中一个很重要的理论，它描述的是一个分布式系统最多只能满足 CAP 中的两个条件，不可能同时满足三个条件</p><p>三种条件中，P 通常都有，所以一般只分为 CP 和 AP：</p><ul><li><p>C（Consistency）：这里指的是强一致性。保证在一定时间内，集群中的各个节点会达到较强的一致性，同时，为了达到这一点，一般会牺牲一点响应时间。而放弃C也不意味着放弃一致性，而是放弃强一致性。允许系统内有一定的数据不一致情况的存在。</p></li><li><p>A (Avalibility)：可用性。意味着系统一直处于可用状态。个别节点的故障不会影响整个服务的运作，可以理解为容错率更高。</p></li><li><p>P（Partition Tolerance)：分区容忍性。当系统出现网络分区等情况时，依然能对外提供服务。想到达到这一点，一般来说会把数据复制到多个分区里，来提高分区容忍性。这个一般是不会被抛弃的。</p></li></ul><hr><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>',6),p={href:"https://www.cnblogs.com/zhaojinhui/p/16668436.html",target:"_blank",rel:"noopener noreferrer"};function d(_,u){const a=c("ExternalLinkIcon");return t(),r("div",null,[h,e("ul",null,[e("li",null,[e("a",p,[o("Hviger - 微服务的注册中心"),i(a)])])])])}const m=n(s,[["render",d],["__file","01-intro.html.vue"]]);export{m as default};