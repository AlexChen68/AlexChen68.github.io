---
title: Flink 流式计算引擎
date: 2023-10-13
order: 2
---

# Apache Flink

## Flink 简介

Apache Flink 是一个在**有界数据流**和**无界数据流**上进行有状态计算分布式处理引擎和框架。

Flink 设计旨在所有常见的集群环境中运行，以任意规模和内存级速度执行计算。

Flink 官方文档：https://nightlies.apache.org/flink/flink-docs-release-1.20/zh/

### 核心功能

- **流处理 (Stream Processing)**

    - **实时数据管道**：持续处理无界数据流（如日志、传感器数据、交易记录等）。

    - **事件驱动型应用**：基于事件触发的实时响应（如风险控制、实时推荐）。

- **批处理 (Batch Processing)**

    - 兼容传统批处理任务（如离线数据分析），并通过统一 API 实现流批一体。

### 应用场景

1. **电商和市场营销**：实时数据报表、广告投放、实时推荐举例：
2. **物联网 (IOT)**: 传感器实时数据采集和显示、实时报警，交通运输业
3. **物流配送和服务业**：订单状态实时更新、通知信息推送
4. **银行和金融业**：实时结算和通知推送，实时检测异常行为

## Flink 架构

Flink 是一个分布式系统，需要有效分配和管理计算资源才能执行流应用程序。它集成了所有常见的集群资源管理器，例如 Hadoop YARN，但也可以设置作为独立集群甚至库运行。

Flink 运行时由两种类型的进程组成：一个 `JobManager` 和一个或者多个 `TaskManager`。

![flink-2025-02-13-15-13-45](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/flink-2025-02-13-15-13-45.png)

![flink-2025-02-18-14-57-15](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2025/flink-2025-02-18-14-57-15.png)

`Client` 不是运行时和程序执行的一部分，而是用于准备数据流并将其发送给 `JobManager`。之后，客户端可以断开连接（分离模式），或保持连接来接收进程报告（附加模式）。客户端可以作为触发执行 `Java/Scala` 程序的一部分运行，也可以在命令行进程 `./bin/flink run ...` 中运行。

可以通过多种方式启动 `JobManager` 和 `TaskManager`: 直接在机器上作为 [standalone](https://nightlies.apache.org/flink/flink-docs-release-1.20/zh/docs/deployment/resource-providers/standalone/overview/) 集群启动、在容器中启动、或者通过 YARN 等资源框架管理并启动。TaskManager 连接到 JobManagers，宣布自己可用，并被分配工作。

- **JobManager**

JobManager 具有许多与协调 Flink 应用程序的分布式执行有关的职责：它决定何时调度下一个 task（或一组 task）、对完成的 task 或执行失败做出反应、协调 checkpoint、并且协调从失败中恢复等等。

- **TaskManagers**

TaskManager（也称为 worker）执行作业流的 task，并且缓存和交换数据流。必须始终至少有一个 TaskManager。在 TaskManager 中资源调度的最小单位是 task slot。TaskManager 中 task slot 的数量表示并发处理 task 的数量。

### Flink 四层 API

Flink 为流式/批式处理应用程序的开发提供了不同级别的抽象。

![flink-2025-02-14-10-01-07](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2025/flink-2025-02-14-10-01-07.png)

最常用的是 SQL 级别的 API。

### Flink 核心概念

1. **并行度（Parallelism）**

**并行度（Parallelism）** 是 Apache Flink 中用于描述任务并行执行程度的概念。它决定了任务在集群中运行时可以使用的并行实例数量。具体来说：

- 并行实例：每个算子（Operator）在运行时可以有多个并行实例，每个实例处理数据流的一个子集。
- 全局与局部设置：并行度可以在全局范围内设置，也可以在单个算子级别设置。全局并行度影响整个作业，而局部并行度仅影响特定算子。
- 资源利用：较高的并行度通常意味着更高的资源利用率和更快的处理速度，但也会增加资源消耗和协调开销。

:::tip 并行度优先级顺序
算子 > ENV 全局 > 任务提交参数 > 配置文件
:::

2. **算子链（Operator Chain）**

**算子链（Operator Chaining**）是 Flink 优化任务执行的一种机制，通过将多个算子合并为一个任务来减少数据交换的开销。具体特点如下：

- 任务合并：Flink 会将多个算子合并为一个任务，在同一个线程中执行，避免不必要的序列化和网络传输。
- 条件限制：算子链的形成需要满足一定条件，如前一个算子的输出类型与后一个算子的输入类型兼容，且并行度相同。
- 性能提升：算子链减少了线程切换和数据传输的开销，从而提升性能。
- 手动控制：用户可以通过 disableChaining() 方法禁用算子链，或使用 startNewChain() 方法开始新的算子链。

3. **任务槽 (Task slot)**

- `Task Slot` 是 Flink 集群中资源分配的最小单元，每个 `Slot` 可以运行一个或多个任务。
- 每个 `Slot` 拥有固定的资源（如 CPU 和内存），任务在 `Slot` 内共享这些资源，但不同 `Slot` 之间的资源相互隔离。
- **并行度**决定了一个任务可以拆分成多少个并行实例，每个实例需要一个 `Slot` 来运行。

### Flink 主要开发步骤

![flink-2025-02-19-11-33-25](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2025/flink-2025-02-19-11-33-25.png)


## Flink 三种部署模式

Flink 应用程序的作业可以被提交到长期运行的 `Flink Session` 集群、专用的 `Flink Job` 集群 或 `Flink Application` 集群。这些选项之间的差异主要与集群的生命周期和资源隔离保证有关。

- `Flink Session` 集群：在 Flink Session 集群中，客户端连接到一个预先存在的、长期运行的集群，该集群可以接受多个作业提交。即使所有作业完成后，集群（和 JobManager）仍将继续运行直到手动停止 session 为止。因此，Flink Session 集群的寿命不受任何 Flink 作业寿命的约束。
- `Flink Job` 集群：会话模式因为资源共享会导致很多问题，所以为了更好地隔离资源，可以考虑为每个提交的作业启动一个集群。在 Flink Job 集群中，可用的集群管理器（例如 YARN）用于为每个提交的作业启动一个集群，并且该集群仅可用于该作业。在这里，客户端首先从集群管理器请求资源启动 JobManager，然后将作业提交给在这个进程中运行的 Dispatcher。然后根据作业的资源请求惰性的分配 TaskManager。一旦作业完成，Flink Job 集群将被拆除。
- `Flink Application` 集群：Flink Application 集群是专用的 Flink 集群，仅从 Flink 应用程序执行作业，并且 main() 方法在集群上而不是客户端上运行。提交作业是一个单步骤过程：无需先启动 Flink 集群，然后将作业提交到现有的 session 集群；相反，将应用程序逻辑和依赖打包成一个可执行的作业 JAR 中，并且集群入口（ApplicationClusterEntryPoint）负责调用 main() 方法来提取 JobGraph。例如，这允许你像在 Kubernetes 上部署任何其他应用程序一样部署 Flink 应用程序。因此，Flink Application 集群的寿命与 Flink 应用程序的寿命有关。

参考链接：[Flink 应用程序执行](https://nightlies.apache.org/flink/flink-docs-release-1.20/zh/docs/concepts/flink-architecture/#flink-%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E6%89%A7%E8%A1%8C)


## DataStream API

### 执行环境


### 源算子

#### 从集合获取数据源

使用 `fromData()` 方法获取集合数据源

```java
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

DataStreamSource<Integer> dataStreamSource = env.fromData(1, 2, 3);

dataStreamSource.print();
env.execute();
```

#### 从文件获取数据源

1. 引入依赖

```xml
<dependency>
    <groupId>org.apache.flink</groupId>
    <artifactId>flink-connector-files</artifactId>
    <version>${flink.version}</version>
    <scope>provided</scope>
</dependency>
```

2. 使用 `FileSource` 获取数据源

```java
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

Path path = new Path("/Users/alexchen/Projects/github/flink-examples/flink-source-demo/input/data.txt");
FileSource<String> source = FileSource.forRecordStreamFormat(new TextLineInputFormat(), path).build();

DataStreamSource<String> dataStreamSource = env.fromSource(source, WatermarkStrategy.noWatermarks(), "fileSource");

dataStreamSource.print();
env.execute();
```

##### 从 Socket 读取数据源

使用 `socketTextStream` 方法获取 socket 数据源

```java
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

DataStreamSource<String> dataStreamSource =
        env.socketTextStream("localhost", 9999);

dataStreamSource.print();
env.execute();
```


#### 从 kafka 获取数据源

1. 添加 kafka 连接器 Maven 依赖

```xml
<dependency>
    <groupId>org.apache.flink</groupId>
    <artifactId>flink-connector-kafka</artifactId>
    <version>3.3.0-1.20</version>
</dependency>
```

2. 使用 `KafkaSource` 构造器创建数据源

```java
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

KafkaSource<String> kafkaSource = KafkaSource.<String>builder()
        .setBootstrapServers("kafkahost:9092")
        .setGroupId("flink-group")
        .setTopics("flink-topic")
        .setValueOnlyDeserializer(new SimpleStringSchema()) // 值序列化器
        .setStartingOffsets(OffsetsInitializer.earliest()) // 消费 kafka 的偏移量策略
        .build();

DataStreamSource<String> dataStreamSource = env.fromSource(kafkaSource, WatermarkStrategy.noWatermarks(), "kafkaSource");
dataStreamSource.print();

env.execute();
```

3. kafka 创建 topic

```shell
./kafka-topics.sh --create --topic flink-topic --zookeeper localhost:2181 --partitions 3 --replication-factor 1
```

4. 往 kafka 写入测试数据

```shell
./kafka-console-producer.sh --broker-list localhost:9092 --topic flink-topic
```

#### 使用 `DataGen` 模拟数据源

1. 引入依赖

```xml
<dependency>
    <groupId>org.apache.flink</groupId>
    <artifactId>flink-connector-datagen</artifactId>
    <version>${flink.version}</version>
    <scope>provided</scope>
</dependency>
```

2. 使用 `DataGeneratorSource` 创建数据源

```java
public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
    // 总数量会按并行度均分
    env.setParallelism(2);

    DataGeneratorSource<String> dataGeneratorSource = new DataGeneratorSource<>(
            new MyGeneratorFunction(),
            100, // 数据总条数
            RateLimiterStrategy.perSecond(1), // 每秒生成的数据数量
            Types.STRING
    );
    DataStreamSource<String> dataStreamSource = env.fromSource(dataGeneratorSource, WatermarkStrategy.noWatermarks(), "data-generator");
    dataStreamSource.print();

    env.execute();
}

public static class MyGeneratorFunction implements GeneratorFunction<Long, String> {
    public MyGeneratorFunction() {
    }

    @Override
    public String map(Long value) {
        return "Number:" + value;
    }
}
```

