---
title: Kafka 消息队列
category: 消息队列
date: 2023-04-02
---

## 1.0 Kafka 简介

Kafka 是一个分布式、分区的、多副本的、多订阅者，基于 zookeeper 协调的分布式日志系统，可作为消息中间件。

sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

### 1.1 核心概念

- Producer：生产者，发送消息的一方。生产者负责创建消息，然后将其发送到 Kafka。
- Consumer：消费者，接受消息的一方。消费者连接到 Kafka 上并接收消息，进而进行相应的业务逻辑处理。
- Consumer Group：一个消费者组可以包含一个或多个消费者。使用多分区 + 多消费者方式可以极大提高数据下游的处理速度，同一消费组中的消费者不会重复消费消息，同样的，不同消费组中的消费者消息消息时互不影响。Kafka 就是通过消费组的方式来实消息 P2P 模式和广播模式。
- Broker：服务代理节点。Broker 是 Kafka 的服务节点，即 Kafka 的服务器。
- Topic：Kafka 中的消息以 Topic 为单位进行划分，生产者将消息发送到特定的 Topic，而消费者负责订阅 Topic 的消息并进行消费。
- Partition：Topic 是一个逻辑的概念，它可以细分为多个分区，每个分区只属于单个主题。同一个主题下不同分区包含的消息是不同的，分区在存储层面可以看作一个可追加的日志（Log）文件，消息在被追加到分区日志文件的时候都会分配一个特定的偏移量 offset）。
- Offset：offset 是消息在分区中的唯一标识，Kafka 通过它来保证消息在分区内的顺序性，不过 offset 并不跨越分区，也就是说，Kafka 保证的是分区有序性而不是主题有序性。
- Replication：副本，是 Kafka 保证数据高可用的方式，Kafka 同一 Partition 的数据可以在多 Broker 上存在多个副本，通常只有主副本对外提供读写服务，当主副本所在 broker 崩溃或发生网络异常，Kafka 会在 Controller 的管理下会重新选择新的 Leader 副对外提供读写服务。
- Record：实际写入 Kafka 中并可以被读取的消息记录。每个 record 包含了 key、value 和 timestamp。

### 1.2 优缺点

Kafka 是一个分布式流处理平台，具有以下优点：

- 高吞吐量和可伸缩性：Kafka 可以处理每秒数百万条消息，并且可以通过添加更多的节点轻松扩展。
- 高容错性：Kafka 使用分布式复制机制来保证数据的可靠性和持久性，即使其中一些节点失败也不会造成数据丢失。
- 高性能：Kafka 采用了顺序读写磁盘的方式进行消息存储，具有较低的延迟和高吞吐量。
- 支持多种消费者：Kafka 的消费者模型支持同时有多个消费者组订阅同一个主题，并且可以准确地跟踪每个消费者在主题中的消费进度。

尽管 Kafka 具有许多优点，但它也有一些缺点：
- 复杂性：配置和管理 Kafka 集群可能需要一定的技术知识和经验。对于新手来说，上手可能会有一定的学习曲线。
- 存储需求较高：由于 Kafka 默认将所有消息持久化到磁盘上，所以需要相应的存储空间。如果消息量很大，存储需求可能会变得很高。
- 无法直接修改数据：一旦消息被写入 Kafka，就无法直接修改它们。如果需要更改消息内容，只能通过写入新的消息来实现。
- API 稳定性变化：Kafka 的 API 在不同版本之间可能会发生一些变化，这可能导致升级和兼容性方面的挑战。

综上所述，Kafka 是一种高性能、可伸缩、可靠的分布式流处理平台，但在配置和管理上有一定的复杂性，并且需要额外的存储空间。

## 2.0 Docker 安装 Kafka

### 2.1 创建网络

```bash
docker network create kafka --driver bridge
```

### 2.2 安装 Zookeeper

Kafka 依赖 Zookeeper 所以需要先安装 Zookeeper

```bash
docker run -d --name zookeeper --network kafka -e ALLOW_ANONYMOUS_LOGIN=yes bitnami/zookeeper:latest
```

### 2.3 安装 Kafka

```bash
docker run -d --name kafka \
  --network kafka \
  -p 9092:9092 \
  -e ALLOW_PLAINTEXT_LISTENER=yes \
  -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://192.168.0.100:9092 \
  bitnami/kafka:latest
```

### 2.4 安装 kafka-map 图形化管理工具（可选）

```bash
docker run -d --name kafka-map \
  --network kafka \
  -p 9093:8080 \
  -v D:/Docker/kafka-map/data:/usr/local/kafka-map/data \
  -e DEFAULT_USERNAME=admin \
  -e DEFAULT_PASSWORD=admin \
  --restart always dushixiang/kafka-map:latest
```


