---
title: Kafka 部署
date: 2023-11-04
order: 110
---

# Kafka 部署

## Docker 部署

1. Kafka 依赖 Zookeeper 所以需要先安装 Zookeeper

```bash
docker run -d --name zookeeper --network kafka -e ALLOW_ANONYMOUS_LOGIN=yes bitnami/zookeeper:latest
```

2. 安装 Kafka

```bash
docker run -d --name kafka \
  --network kafka \
  -p 9092:9092 \
  -e ALLOW_PLAINTEXT_LISTENER=yes \
  -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://:9092 \
  bitnami/kafka:latest
```

3. 安装 kafka-map 图形化管理工具（可选）

```bash
docker run -d --name kafka-map \
  --network kafka \
  -p 9093:8080 \
  -v D:/Docker/kafka-map/data:/usr/local/kafka-map/data \
  -e DEFAULT_USERNAME=admin \
  -e DEFAULT_PASSWORD=123456 \
  --restart always dushixiang/kafka-map:latest
```

## Docker Compose 部署

## 安装包部署