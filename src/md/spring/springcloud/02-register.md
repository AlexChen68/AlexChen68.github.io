---
title: 微服务注册中心
category: SpringCloud
date: 2023-02-12
description: 注册中心
---

## 什么是注册中心?

### 定义

- 注册中心是微服务架构中最基础也是最重要的组件

- 注册中心本质上是为了解耦微服务

- 注册中心主要用于提供服务的发现与注册

- 注册中心相当于微服务之间的通讯录，记录着所有微服务的地址

- 注册中心能实现微服务之间的相互调用

## 常见的注册中心组件

常见的注册中心组件有Eureka、Consul、Nacos、Zookeeper，前三者属于 springcloud 体系，最后一个属于 Dubbo 类体系，两种体系代表两种注册中心实现方案，虽然是不同的方案，但是最终实现的效果相同。

本文仅介绍 Nacos 的使用。

## Alibaba Nacos 组件

### Nacos 是什么？

Nacos 是 Dynamic Naming and Configuration Service 的缩写，动态命名和配置服务。

Nacos 是阿里开源的注册中心 + 配置中心服务。

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

### 源码启动 Nacos（使用 Mysql 数据库）

1. 下载 Nacos 源码

从 Github Release 中下载源码压缩包 [Source code.zip](https://github.com/alibaba/nacos/releases/tag/2.0.3)(一定要使用稳定版本，推荐 2.0.3)，并解压缩到本地；

`nacos` 目录下的 `console` 文件夹即为启动 Nacos 的模块，其主类 `Nacos` 为启动类。

2. 编译源码

依次执行 maven 的 clear 和 compile 命令（可跳过 test），耐心等待。

3. 设置单机模式

单机启动有两种方法：
- 在 main 方法中，添加属性设置，设置为单机启动：

```java
public static void main(String[] args) {
    // 单机模式启动
    System.setProperty(Constants.STANDALONE_MODE_PROPERTY_NAME, "true");
    SpringApplication.run(Nacos.class, args);
}
```

- 或者在 idea 运行配置中，添加 VM 参数：

```bash
-Dstandalone=true
```

4. 启动 Nacos

执行 `console` 模块的 `Nacos` 类的 `main` 方法，如果有缺失类和方法的情况，应该是没有编译成功导致的，尝试重复第 2 步。

5. 打开 Nacos 界面

Nacos 本地的地址默认为 [http://localhost:8848/nacos/index.html](http://localhost:8848/nacos/index.html);

默认的账号密码皆为 `nacos`。

:::info
如果想将 Nacos 单独拎出来，放入自己的工程中，会出现从无法找到 Nacos 其他基础组件的问题，可以使用第三方 Mavne 库 `io.spring.nacos`，具体可以参考这篇文章 [若依 + nacos 源码启动](https://www.cnblogs.com/huilangyizu/articles/16665305.html)。
:::