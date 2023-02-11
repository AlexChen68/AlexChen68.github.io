---
title: Nacos 部署
category: [Nacos]
date: 2023-02-05
description: Nacos 部署
---

## 单机部署（使用内部的数据库）

## Docker 安装 Nacos

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

3. 启动容器，通过配置 mysql 参数，使用外部的 Mysql 数据库存储配置

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

4. 如果使用内置数据库启动

```bash
docker run -d --name nacos --restart=always -p 8848:8848  nacos/nacos-server:v2.2.0-slim
```
