---
title: 微服务注册中心
category: [SpringCloud]
date: 2023-02-12
description: 注册中心
---

## 什么是注册中心

## Alibaba Nacos 组件

### Nacos 是什么？

Nacos 是 Dynamic Naming and Configuration Service 的缩写，动态命名和配置服务。Nacos 是阿里开源的注册中心 + 配置中心服务。

Nacos 官网地址：[https://nacos.io/zh-cn/](https://nacos.io/zh-cn/)

### Docker 安装 Nacos（使用 Mysql 数据库）

1. 下载 Nacos 镜像

```bash
docker run nacos/nacos-server:v2.2.0-slim
```

:::info
为什么下载 slim 版本：因为使用的 Mac M1，需要使用支持 arm 架构的镜像。
:::

2. 获取 Nacos 数据库初始化 SQL 文件

方式一：从 github 中下载: https://github.com/alibaba/nacos/blob/master/config/src/main/resources/META-INF/nacos-db.sql[https://github.com/alibaba/nacos/blob/master/config/src/main/resources/META-INF/nacos-db.sql]；

方式二：从 Nacos 的 [Release](https://github.com/alibaba/nacos/releases/tag/2.2.0) 版本中下载压缩包版本，`conf` 文件夹下的 `mysql-schema.sql` 文件即为 Mysql 数据库初始化脚本；

方式三：从容器的 `/usr/local/nacos/config` 路径下，获取 `mysql-schema.sql` 文件。

3. 数据库初始化

使用第 2 步获取的 Mysql 文件初始化数据库。

4. 启动容器，通过配置 mysql 参数，使用外部的 Mysql 数据库存储配置

```bash
docker run -d --name nacos \
--restart=always \
-p 8848:8848 \
--link mysql \
-v /usr/local/nacos/logs:/home/nacos/logs \
-v /usr/local/nacos/data:/home/nacos/data \
-v /usr/local/nacos/config:/home/nacos/config \
-e MODE=standalone \
-e SPRING_DATASOURCE_PLATFORM=mysql \
-e MYSQL_SERVICE_HOST=127.0.0.1 \
-e MYSQL_SERVICE_PORT=3306 \
-e MYSQL_SERVICE_DB_NAME=zeus_nacos \
-e MYSQL_SERVICE_USER=root \
-e MYSQL_SERVICE_PASSWORD=root \
nacos/nacos-server:v2.2.0-slim
```

5. 如果使用内置数据库启动

```bash
docker run -d --name nacos --restart=always -p 8848:8848  nacos/nacos-server:v2.2.0-slim
```