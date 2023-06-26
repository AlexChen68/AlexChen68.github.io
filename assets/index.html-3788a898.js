import{_ as t,W as c,X as s,Z as e,$ as l,a0 as i,a1 as r,C as n}from"./framework-ea95e8eb.js";const h={},o=r('<h2 id="什么是-elasticsearch" tabindex="-1"><a class="header-anchor" href="#什么是-elasticsearch" aria-hidden="true">#</a> 什么是 ElasticSearch?</h2><p>Elasticsearch 是一个分布式的开源搜索和分析引擎，基于 Apache Lucene 开发而成，是 elastic stack 的核心组件。它是一个近实时的分布式搜索和分析引擎，在处理大数据方面相当擅长。</p><p>Elasticsearch 不会将信息存储为类似数据库的行 (row)，而是存储为已序列化为 JSON 文档的复杂数据结构。当集群中有多个 Elasticsearch 节点时，存储的文档会分布在整个集群中，并且可以从任何节点立即访问。存储文档后，将在 1s 内 (默认刷新频率为 1s) 几乎实时地对其进行索引和完全搜索。</p><p>通常会搭配 kibana 使用，Kibana 是一个针对 Elasticsearch 的开源分析及可视化平台，用来搜索、查看交互存储在 Elasticsearch 索引中的数据。使用 Kibana 可以通过各种图表进行高级数据分析及展示。</p><h2 id="elasticsearch-的特点" tabindex="-1"><a class="header-anchor" href="#elasticsearch-的特点" aria-hidden="true">#</a> ElasticSearch 的特点</h2><ul><li>实时搜索、实时分析；</li><li>分布式架构、实时文件存储，并将每一个字段都编入索引；</li><li>文档导向，所有的对象全部是文档；</li><li>高可用性、易扩展、支持集群 (cluster)、分配和复制 (shards and replicas)</li><li>接口友好，支持 json</li></ul><h2 id="主要功能和应用场景" tabindex="-1"><a class="header-anchor" href="#主要功能和应用场景" aria-hidden="true">#</a> 主要功能和应用场景</h2><ul><li>主要功能：</li></ul><ol><li>海量数据的分布式存储以及集群管理，达到了服务与数据的高可用以及水平扩展；</li><li>近实时搜索，性能卓越。对结构化、全文、地理位置等类型数据的处理；</li><li>海量数据的近实时分析（聚合功能）。</li></ol><ul><li>应用场景：</li></ul><ol><li>网站搜索、垂直搜索、代码搜索；</li><li>日志管理与分析、安全指标监控、应用性能监控、Web 抓取舆情分析。</li></ol><h2 id="相关资料" tabindex="-1"><a class="header-anchor" href="#相关资料" aria-hidden="true">#</a> 相关资料</h2>',12),d={href:"https://www.elastic.co/guide/en/elasticsearch/reference/7.17/getting-started.html",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/7.17/installation.html",target:"_blank",rel:"noopener noreferrer"};function _(p,f){const a=n("ExternalLinkIcon");return c(),s("div",null,[o,e("ul",null,[e("li",null,[e("a",d,[l("Quick start | Elasticsearch Guide (7.17) | Elastic"),i(a)])]),e("li",null,[e("a",u,[l("Installation | Elasticsearch Java API Client (7.17) | Elastic"),i(a)])])])])}const x=t(h,[["render",_],["__file","index.html.vue"]]);export{x as default};