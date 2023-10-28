import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.419948d5.js";const d=JSON.parse('{"title":"Kafka 消息队列","description":"","frontmatter":{"title":"Kafka 消息队列","date":"2023-04-02T00:00:00.000Z"},"headers":[],"relativePath":"architecture/distributed/mq-kafka.md","filePath":"architecture/distributed/mq-kafka.md","lastUpdated":1698482261000}'),p={name:"architecture/distributed/mq-kafka.md"},o=l(`<h2 id="_1-0-kafka-简介" tabindex="-1">1.0 Kafka 简介 <a class="header-anchor" href="#_1-0-kafka-简介" aria-label="Permalink to &quot;1.0 Kafka 简介&quot;">​</a></h2><p>Kafka 是一个分布式、分区的、多副本的、多订阅者，基于 zookeeper 协调的分布式日志系统，可作为消息中间件。</p><p>sudo yum-config-manager <br> --add-repo <br><a href="https://download.docker.com/linux/centos/docker-ce.repo" target="_blank" rel="noreferrer">https://download.docker.com/linux/centos/docker-ce.repo</a></p><h3 id="_1-1-核心概念" tabindex="-1">1.1 核心概念 <a class="header-anchor" href="#_1-1-核心概念" aria-label="Permalink to &quot;1.1 核心概念&quot;">​</a></h3><ul><li>Producer：生产者，发送消息的一方。生产者负责创建消息，然后将其发送到 Kafka。</li><li>Consumer：消费者，接受消息的一方。消费者连接到 Kafka 上并接收消息，进而进行相应的业务逻辑处理。</li><li>Consumer Group：一个消费者组可以包含一个或多个消费者。使用多分区 + 多消费者方式可以极大提高数据下游的处理速度，同一消费组中的消费者不会重复消费消息，同样的，不同消费组中的消费者消息消息时互不影响。Kafka 就是通过消费组的方式来实消息 P2P 模式和广播模式。</li><li>Broker：服务代理节点。Broker 是 Kafka 的服务节点，即 Kafka 的服务器。</li><li>Topic：Kafka 中的消息以 Topic 为单位进行划分，生产者将消息发送到特定的 Topic，而消费者负责订阅 Topic 的消息并进行消费。</li><li>Partition：Topic 是一个逻辑的概念，它可以细分为多个分区，每个分区只属于单个主题。同一个主题下不同分区包含的消息是不同的，分区在存储层面可以看作一个可追加的日志（Log）文件，消息在被追加到分区日志文件的时候都会分配一个特定的偏移量 offset）。</li><li>Offset：offset 是消息在分区中的唯一标识，Kafka 通过它来保证消息在分区内的顺序性，不过 offset 并不跨越分区，也就是说，Kafka 保证的是分区有序性而不是主题有序性。</li><li>Replication：副本，是 Kafka 保证数据高可用的方式，Kafka 同一 Partition 的数据可以在多 Broker 上存在多个副本，通常只有主副本对外提供读写服务，当主副本所在 broker 崩溃或发生网络异常，Kafka 会在 Controller 的管理下会重新选择新的 Leader 副对外提供读写服务。</li><li>Record：实际写入 Kafka 中并可以被读取的消息记录。每个 record 包含了 key、value 和 timestamp。</li></ul><h3 id="_1-2-优缺点" tabindex="-1">1.2 优缺点 <a class="header-anchor" href="#_1-2-优缺点" aria-label="Permalink to &quot;1.2 优缺点&quot;">​</a></h3><p>Kafka 是一个分布式流处理平台，具有以下优点：</p><ul><li>高吞吐量和可伸缩性：Kafka 可以处理每秒数百万条消息，并且可以通过添加更多的节点轻松扩展。</li><li>高容错性：Kafka 使用分布式复制机制来保证数据的可靠性和持久性，即使其中一些节点失败也不会造成数据丢失。</li><li>高性能：Kafka 采用了顺序读写磁盘的方式进行消息存储，具有较低的延迟和高吞吐量。</li><li>支持多种消费者：Kafka 的消费者模型支持同时有多个消费者组订阅同一个主题，并且可以准确地跟踪每个消费者在主题中的消费进度。</li></ul><p>尽管 Kafka 具有许多优点，但它也有一些缺点：</p><ul><li>复杂性：配置和管理 Kafka 集群可能需要一定的技术知识和经验。对于新手来说，上手可能会有一定的学习曲线。</li><li>存储需求较高：由于 Kafka 默认将所有消息持久化到磁盘上，所以需要相应的存储空间。如果消息量很大，存储需求可能会变得很高。</li><li>无法直接修改数据：一旦消息被写入 Kafka，就无法直接修改它们。如果需要更改消息内容，只能通过写入新的消息来实现。</li><li>API 稳定性变化：Kafka 的 API 在不同版本之间可能会发生一些变化，这可能导致升级和兼容性方面的挑战。</li></ul><p>综上所述，Kafka 是一种高性能、可伸缩、可靠的分布式流处理平台，但在配置和管理上有一定的复杂性，并且需要额外的存储空间。</p><h2 id="_2-0-docker-安装-kafka" tabindex="-1">2.0 Docker 安装 Kafka <a class="header-anchor" href="#_2-0-docker-安装-kafka" aria-label="Permalink to &quot;2.0 Docker 安装 Kafka&quot;">​</a></h2><h3 id="_2-1-创建网络" tabindex="-1">2.1 创建网络 <a class="header-anchor" href="#_2-1-创建网络" aria-label="Permalink to &quot;2.1 创建网络&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">network</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kafka</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--driver</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bridge</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">network</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kafka</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--driver</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bridge</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-2-安装-zookeeper" tabindex="-1">2.2 安装 Zookeeper <a class="header-anchor" href="#_2-2-安装-zookeeper" aria-label="Permalink to &quot;2.2 安装 Zookeeper&quot;">​</a></h3><p>Kafka 依赖 Zookeeper 所以需要先安装 Zookeeper</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zookeeper</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--network</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kafka</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ALLOW_ANONYMOUS_LOGIN=yes</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bitnami/zookeeper:latest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zookeeper</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--network</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kafka</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ALLOW_ANONYMOUS_LOGIN=yes</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bitnami/zookeeper:latest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-3-安装-kafka" tabindex="-1">2.3 安装 Kafka <a class="header-anchor" href="#_2-3-安装-kafka" aria-label="Permalink to &quot;2.3 安装 Kafka&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kafka</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--network</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kafka</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9092</span><span style="color:#9ECBFF;">:9092</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ALLOW_PLAINTEXT_LISTENER=yes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://192.168.0.100:9092</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">bitnami/kafka:latest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kafka</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--network</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kafka</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9092</span><span style="color:#032F62;">:9092</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ALLOW_PLAINTEXT_LISTENER=yes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://192.168.0.100:9092</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">bitnami/kafka:latest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="_2-4-安装-kafka-map-图形化管理工具-可选" tabindex="-1">2.4 安装 kafka-map 图形化管理工具（可选） <a class="header-anchor" href="#_2-4-安装-kafka-map-图形化管理工具-可选" aria-label="Permalink to &quot;2.4 安装 kafka-map 图形化管理工具（可选）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kafka-map</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--network</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kafka</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9093</span><span style="color:#9ECBFF;">:8080</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">D:/Docker/kafka-map/data:/usr/local/kafka-map/data</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">DEFAULT_USERNAME=admin</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">DEFAULT_PASSWORD=admin</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">always</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">dushixiang/kafka-map:latest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kafka-map</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--network</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kafka</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9093</span><span style="color:#032F62;">:8080</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">D:/Docker/kafka-map/data:/usr/local/kafka-map/data</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">DEFAULT_USERNAME=admin</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">DEFAULT_PASSWORD=admin</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">always</span><span style="color:#24292E;"> </span><span style="color:#032F62;">dushixiang/kafka-map:latest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,21),e=[o];function r(t,c,E,y,i,k){return a(),n("div",null,e)}const C=s(p,[["render",r]]);export{d as __pageData,C as default};