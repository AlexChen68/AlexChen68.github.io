import{_ as a,o,c as e,Q as t}from"./chunks/framework.419948d5.js";const m=JSON.parse('{"title":"Hadoop 大数据组件","description":"","frontmatter":{"title":"Hadoop 大数据组件","date":"2023-10-14T00:00:00.000Z"},"headers":[],"relativePath":"bigdata/hadoop.md","filePath":"bigdata/hadoop.md","lastUpdated":1697399636000}'),r={name:"bigdata/hadoop.md"},p=t('<h1 id="apache-hadoop" tabindex="-1">Apache Hadoop <a class="header-anchor" href="#apache-hadoop" aria-label="Permalink to &quot;Apache Hadoop&quot;">​</a></h1><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p><strong>Hadoop 是什么</strong></p><ul><li>Hadoop 是一个由 Apache 基金会所开发的分布式系统基础架构。</li><li>主要解决，海量数据的存储和海量数据的分析计算问题。</li><li>广义上来说，Hadoop 通常是指一个更广泛的概念 —— Hadoop 生态圈。</li></ul><p><strong>Hadoop 三大发行版本：Apache、Cloudera、Hortonworks</strong></p><ol><li>Apache 版本最原始（最基础）的版本，对于入门学习最好。</li><li>Cloudera 在大型互联网企业中用的较多。</li><li>Hortonworks 文档较好。</li></ol><p><strong>Hadoop 的优势</strong></p><ul><li>高可靠性：Hadoop 底层维护多个数据副本，所以即使 Hadoop 某个计算元素或存储出现故障，也不会导致数据的丢失。</li><li>高扩展性：在集群间分配任务数据，可方便的扩展数以千计的节点。</li><li>高效性：在 MapReduce 的思想下，Hadoop 是并行工作的，以加快任务处理速度。</li><li>高容错性：能够自动将失败的任务重新分配。</li></ul><h2 id="hadoop-的组成" tabindex="-1">Hadoop 的组成 <a class="header-anchor" href="#hadoop-的组成" aria-label="Permalink to &quot;Hadoop 的组成&quot;">​</a></h2><ul><li>HDFS 分布式文件系统</li><li>MapReduce 分布式计算框架</li><li>Yarn 资源协调框架</li><li>Common 模块</li></ul><p><img src="https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/hadoop_1.png" alt="hadoop_1"></p><h3 id="hdfs-分布式文件系统" tabindex="-1">HDFS 分布式文件系统 <a class="header-anchor" href="#hdfs-分布式文件系统" aria-label="Permalink to &quot;HDFS 分布式文件系统&quot;">​</a></h3><p>一个高可靠、高吞吐量的分布式文件系统。对于 HDFS 而言，他具有数据切割、制作副本、分散存储数据的能力。</p><p><img src="https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/20231016033754.png" alt="20231016033754"></p><ul><li><p><strong>NameNode</strong>: 存储文件的元数据。比如文件名称、文件目录结构、文件属性（生成时间、副本数、文件权限）以及每个文件的块列表和块所在的 DataNode 等。- <strong>SecondaryNameNode</strong>: 辅助 NameNode 更好的工作，用来监控 HDFS 状态的辅助后台程序，每隔一段时间获取 HDFS 元数据快照。</p></li><li><p><strong>DataNode</strong>: 在本地文件系统存储文件块数据，以及块数据的校验。</p></li></ul><h3 id="mapreduce-分布式离线并行计算框架" tabindex="-1">MapReduce 分布式离线并行计算框架 <a class="header-anchor" href="#mapreduce-分布式离线并行计算框架" aria-label="Permalink to &quot;MapReduce 分布式离线并行计算框架&quot;">​</a></h3><p>MapReduce 在处理任务时 ==&gt; 拆解任务 + 分散处理 + 合并结果</p><p>MapReduce 计算 == &gt; map 阶段 + reduce 阶段</p><p>map 阶段就是&quot;分&quot;的阶段，指的是并行的处理输入数据。</p><p>reduce 阶段就是&quot;合&quot;的阶段，对 map 阶段结果进行汇总。</p><p><img src="https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/20231016033942.png" alt="20231016033942"></p><h3 id="yarn-作业调度与集群管理框架" tabindex="-1">YARN 作业调度与集群管理框架 <a class="header-anchor" href="#yarn-作业调度与集群管理框架" aria-label="Permalink to &quot;YARN 作业调度与集群管理框架&quot;">​</a></h3><p>计算资源协调</p><p><img src="https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/20231016033957.png" alt="20231016033957"></p><ul><li><strong>ResourceManager</strong>: 处理客户端请求，启动/监控 ApplicationMaster、监控 NodeManager、资源分配与调度。- <strong>NodeManager</strong>: 单个节点上的资源管理，处理来自 ResourceManager 的命令、处理来自 ApplicationMaster 的命令。- <strong>ApplicationMaster</strong>: 数据切分，为应用程序申请资源，并分配给内部任务、任务监控与容错。- <strong>Container</strong>: 对任务运行环境的抽象。封装了 CPU、内存等多维资源以及环境变量、启动命令等任务运行的相关信息。</li></ul><p>ResourceManager 是老大 ---&gt; NodeManager 是小弟 -----&gt; ApplicationMaster 是计算任务专员。</p><h3 id="common-模块" tabindex="-1">Common 模块 <a class="header-anchor" href="#common-模块" aria-label="Permalink to &quot;Common 模块&quot;">​</a></h3><p>支持其他模块的工具模块（Configuration、RPC、序列化机制、日志操作）</p>',28),l=[p];function i(n,d,s,h,c,g){return o(),e("div",null,l)}const _=a(r,[["render",i]]);export{m as __pageData,_ as default};
