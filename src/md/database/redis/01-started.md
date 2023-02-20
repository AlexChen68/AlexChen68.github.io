---
title: 开始使用 Redis
date: 2022-09-29
category: Redis
description: 开始使用 Redis
---

Redis 的介绍和初步安装、卸载教程。
<!-- more -->

## Redis 简介

Redis 是完全开源的，遵守 BSD 协议，是一个高性能的 key-value 数据库。

Redis 与其他 key - value 缓存产品有以下三个特点：

Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。
Redis支持数据的备份，即master-slave模式的数据备份。

## 安装和卸载

### Docker 安装 Redis

拉取 Redis 最新镜像

```shell
docker pull redis:latest
```

查看镜像

```shell
docker images
```

使用自定义的 `redis.conf` 启动 Redis 容器，并绑定端口，`[redis-container-name]`使用自定义的容器名称替换

```shell
docker run --restart=always -p 6379:6379 -v /root/redis:/usr/local/etc/redis --name [redis-container-name] -d redis redis-server /usr/local/etc/redis/redis.conf
```

查看容器是否启动

```shell
docker ps -a | grep [redis-container-name]
```

进入 redis 容器，使用 `redis-cli` 登录

```shell
docker exec -it [redis-container-name] bash
# 进入 redis 命令行界面
redis-cli
# 鉴权登录,yourpassword 为在 redis.conf 中，使用 requirepass 配置的密码
auth yourpassword
```

### Redis 配置

#### redis.conf 配置文件

Redis 可以通过在启动时，指定配置文件 `redis.conf` 来加载自定义配置。

该文件可以在 Redis 安装目录下找到，或者从 [Github](https://github.com/redis/redis/blob/unstable/redis.conf) 下载。

常见的配置项：

- 指定 Redis 是否以守护进程的方式启动，默认为 no，表示不以守护进程的方式启动

  ```conf
  daemonize yes
  ```

- 指定 Redis 监听端口，默认端口为 6379

  ```conf
  port 6379
  ```

- 设置 Redis 连接密码，如果配置了连接密码，客户端在连接 Redis 时需要通过 `AUTH <password>` 命令提供密码，默认关闭

  ```conf
  requirepass password
  ```
  
- 绑定主机地址；如果指定了bind，则说明只允许来自指定网卡的Redis请求。如果没有指定，就说明可以接受来自任意一个网卡的Redis请求，需要远程连接时，可以注释掉该配置

  ```conf
  bind 127.0.0.1
  ```

- 当 Redis 以守护进程方式运行时，Redis 默认会把 pid 写入 /var/run/redis.pid 文件，可以通过 pidfile 指定

  ```conf
  pidfile /var/run/redis.pid
  ```

- 当客户端闲置多长秒后关闭连接，如果指定为 0 ，表示关闭该功能

  ```conf
  timeout 300
  ```

- 设置数据库的数量，默认数据库为0，可以使用SELECT 命令在连接上指定数据库id

  ```conf
  databases 16
  ```


更多具体设置，见 [Redis 官方文档](https://redis.io/docs/manual/config/)。

#### Redis-cli 命令行配置

在通过 Redis-cli 工具连接上 Redis 并通过 `auth [password]` 认证后，可以使用 `config set/get [param]` 命令设置或查询 Redis 配置。

查看全部配置

```bash
config get *
```

查询某个配置，例如查询密码

```bash
config get requirepass
```

设置某个配置，例如设置密码

```bash
config set requirepass [password]
```

### Docker 卸载 Redis

查看正在运行的 redis 容器

```shell
docker ps -a | grep [redis-container-name]
```

停止容器，[redis-container-name] 为容器名称

```shell
docker stop [redis-container-name]
```

查看 Redis 镜像

```shell
docker iamges
```

删除 Redis 镜像，`[redis-image-id]` 为 Redis 镜像的 `IMAGE ID`

```shell
docker image rm [redis-image-id]
```

## 参考资料

[Redis官方文档](https://redis.io/docs/)
[Redis教程｜菜鸟教程](https://www.runoob.com/redis/redis-tutorial.html)