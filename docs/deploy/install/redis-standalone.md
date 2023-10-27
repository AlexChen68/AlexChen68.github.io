---
title: Redis 单机部署
date: 2022-09-29
order: 31
---

# Redis 安装部署

## Docker 安装 Redis

拉取 Redis 最新镜像

```bash
docker pull redis:latest
```

查看镜像

```bash
docker images
```

使用自定义的 `redis.conf` 启动 Redis 容器，并绑定端口，`[redis-container-name]`使用自定义的容器名称替换

```bash
docker run --restart=always -p 6379:6379 -v /root/redis:/usr/local/etc/redis --name [redis-container-name] -d redis redis-server /usr/local/etc/redis/redis.conf
```

查看容器是否启动

```bash
docker ps -a | grep [redis-container-name]
```

进入 redis 容器，使用 `redis-cli` 登录

```bash
docker exec -it [redis-container-name] bash
# 进入 redis 命令行界面
redis-cli
# 鉴权登录,yourpassword 为在 redis.conf 中，使用 requirepass 配置的密码
auth yourpassword
```

## Redis 配置

### redis.conf 配置文件

Redis 可以通过在启动时，指定配置文件 `redis.conf` 来加载自定义配置。

该文件可以在 Redis 安装目录下找到，或者从 [Github](https://github.com/redis/redis/blob/unstable/redis.conf) 下载。

常见的配置项：

- 指定 Redis 是否以守护进程的方式启动，默认为 no，表示不以守护进程的方式启动

  ```ini
  daemonize yes
  ```

- 指定 Redis 监听端口，默认端口为 6379

  ```ini
  port 6379
  ```

- 设置 Redis 连接密码，如果配置了连接密码，客户端在连接 Redis 时需要通过 `AUTH <password>` 命令提供密码，默认关闭

  ```ini
  requirepass password
  ```
  
- 绑定主机地址；如果指定了 bind，则说明只允许来自指定网卡的 Redis 请求。如果没有指定，就说明可以接受来自任意一个网卡的 Redis 请求，需要远程连接时，可以注释掉该配置

  ```ini
  bind 127.0.0.1
  ```

- 当 Redis 以守护进程方式运行时，Redis 默认会把 pid 写入 /var/run/redis.pid 文件，可以通过 pidfile 指定

  ```ini
  pidfile /var/run/redis.pid
  ```

- 当客户端闲置多长秒后关闭连接，如果指定为 0，表示关闭该功能

  ```ini
  timeout 300
  ```

- 设置数据库的数量，默认数据库为 0，可以使用 SELECT 命令在连接上指定数据库 id

  ```ini
  databases 16
  ```


更多具体设置，见 [Redis 官方文档](https://redis.io/docs/manual/config/)。

### Redis-cli 命令行配置

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

## Docker 卸载 Redis

查看正在运行的 redis 容器

```bash
docker ps -a | grep [redis-container-name]
```

停止容器，[redis-container-name] 为容器名称

```bash
docker stop [redis-container-name]
```

查看 Redis 镜像

```bash
docker iamges
```

删除 Redis 镜像，`[redis-image-id]` 为 Redis 镜像的 `IMAGE ID`

```bash
docker image rm [redis-image-id]
```

## 参考资料

- [Redis 官方文档](https://redis.io/docs/)
- [Redis 教程｜菜鸟教程](https://www.runoob.com/redis/redis-tutorial.html)