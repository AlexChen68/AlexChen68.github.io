---
title: 分布式事务中间件 Seata
date: 2023-06-13
order: 5
---

# 分布式事务中间件 Seata

## 什么是分布式事务？

事务是一个程序执行单元，里面的所有操作要么全部执行成功，要么全部执行失败。在分布式系统中，这些操作可能是位于不同的服务中，那么如果也能保证这些操作要么全部执行成功要么全部执行失败呢？这便是分布式事务要解决的问题。

## Seata 简介

Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。

Seata 为用户提供了 `AT`、`TCC`、`SAGA` 和 `XA` 四种事务模式，打造一站式的分布式解决方案。


- [Seata 官网链接](https://seata.io/zh-cn/index.html)

## seata 入门

### 启动 seata server

Server 端存储模式（store.mode）现有 file、db、redis 三种（后续将引入 raft,mongodb），file 模式无需改动，直接启动即可，下面专门讲下 db 和 redis 启动步骤。

:::warning 注：
- file 模式为单机模式，全局事务会话信息内存中读写并持久化本地文件 root.data，性能较高（默认）。
- db 模式为高可用模式，全局事务会话信息通过 db 共享，相应性能差些。
- redis 模式 Seata-Server 1.3 及以上版本支持，性能较高，存在事务信息丢失风险，请提前配置合适当前场景的 redis 持久化配置。
:::

:::danger 重要‼️
**本文主要介绍使用 Nacos 作为数据中心和配置中心启动 seata server，采用 db 模式启动的方式。**
:::

#### 下载 seata-server

从 [seata-release](https://github.com/seata/seata/releases) 下载需要的版本压缩包解压。

示例：

```bash
wget https://github.com/seata/seata/releases/download/v1.4.2/seata-server-1.4.2.zip
unzip seata-server-1.4.2.zip
```

解压后，目录结果为：

```
├──bin  # 脚本目录
├──conf # 配置目录
├──log  # 日志目录
└──lib  # jar包目录
```

#### 配置 `registry.conf`

Seata 服务端的 `conf` 目录可以看到配置文件：

- `registry.conf`：该文件必须存在。定义 seata-server 所需要的：registry 注册中心和 config 配置中心。
   - `registry.type` 注册中心类型可选范围为：file、nacos、eureka、redis、zk、consul、etcd3、sofa。通常选择 nacos 配置中心作为注册中心。
   - `config.type` 配置中心类型可选择范围为：file、nacos、apollo、zk、consul、etcd3。
- `file.conf`：仅在服务端 registry.conf 文件中选择配置 registry.type=file 或 config.type=file 时，才需要此 file.conf 文件（可在此文件中指定分布式事务管理的存储模式 store.mode）

- 无论是 file、还是 nacos，还是其他作为配置来源。都需要定义分布式事务管理的存储模式 `store.mode`。存储模式有三种：`file`、`db`、`redis`。
   - 若选择为 store.mode=file，Seata 的事务相关信息会存储在内存中，并持久化到本地 root.data 文件中，性能比较高。 
   - 若选择为 store.mode=db。Seata 的事务相关信息会存储在数据库中。使用数据库模式可以支持多个 seata-server 启动，实现 seata-server 高可用。

`registry.conf` 示例配置：

```ini
registry {
  type = "nacos"

  nacos {
    application = "seata-server"
    serverAddr = "127.0.0.1:8848"
    group = "SEATA_GROUP"
    namespace = "public"
    cluster = "default"
    username = "nacos"
    password = "nacos"
  }
}

config {
  type = "nacos"

  nacos {
    serverAddr = "127.0.0.1:8848"
    namespace = "public"
    group = "SEATA_GROUP"
    username = "nacos"
    password = "nacos"
    dataId = "seata-server.properties"
  }
}

```


:::tip 总结
`registry.conf` 用来配置 seata-server 向哪里注册，配置存储在哪里；如果配置为 file，使用 conf/file.conf 配置；如果使用 nacos 作为配置中心，需要在 nacos 添加一个配置文件，将 seata-server 存储其中，并在 `registry.conf` 的 config 中配置 `dataId`。

如果 seata-server 的配置中设置 `store.mode=db`，需要填写对应的数据库信息，并初始化数据库表结构到数据库。
:::

#### 初始化数据库表结构 <Badge text="仅 db 模式需要" type="tip"/>

从 [seata 源码](https://github.com/seata/seata/) 的 `/script/server/db` 目录下，下载对应的数据库 sql，在数据库执行。

或使用下面的 sql 语句（*ps：可能会过期，最好还是获取对应版本的*）

```sql
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS `global_table`
(
    `xid`                       VARCHAR(128) NOT NULL,
    `transaction_id`            BIGINT,
    `status`                    TINYINT      NOT NULL,
    `application_id`            VARCHAR(32),
    `transaction_service_group` VARCHAR(32),
    `transaction_name`          VARCHAR(128),
    `timeout`                   INT,
    `begin_time`                BIGINT,
    `application_data`          VARCHAR(2000),
    `gmt_create`                DATETIME,
    `gmt_modified`              DATETIME,
    PRIMARY KEY (`xid`),
    KEY `idx_status_gmt_modified` (`status` , `gmt_modified`),
    KEY `idx_transaction_id` (`transaction_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
    `branch_id`         BIGINT       NOT NULL,
    `xid`               VARCHAR(128) NOT NULL,
    `transaction_id`    BIGINT,
    `resource_group_id` VARCHAR(32),
    `resource_id`       VARCHAR(256),
    `branch_type`       VARCHAR(8),
    `status`            TINYINT,
    `client_id`         VARCHAR(64),
    `application_data`  VARCHAR(2000),
    `gmt_create`        DATETIME(6),
    `gmt_modified`      DATETIME(6),
    PRIMARY KEY (`branch_id`),
    KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
    `row_key`        VARCHAR(128) NOT NULL,
    `xid`            VARCHAR(128),
    `transaction_id` BIGINT,
    `branch_id`      BIGINT       NOT NULL,
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk`             VARCHAR(36),
    `status`         TINYINT      NOT NULL DEFAULT '0' COMMENT '0:locked ,1:rollbacking',
    `gmt_create`     DATETIME,
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_status` (`status`),
    KEY `idx_branch_id` (`branch_id`),
    KEY `idx_xid_and_branch_id` (`xid` , `branch_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `distributed_lock`
(
    `lock_key`       CHAR(20) NOT NULL,
    `lock_value`     VARCHAR(20) NOT NULL,
    `expire`         BIGINT,
    primary key (`lock_key`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('AsyncCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryRollbacking', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('TxTimeoutCheck', ' ', 0);
```


#### Nacos 配置 `seata-server.properties`<Badge text="仅使用 Nacos 配置中心时配置" type="tip"/>

Nacos 新增配置文件 `seata-server.properties`，seata 的配置参数可以参考 [官方文档-seata 参数配置](http://seata.io/zh-cn/docs/user/configurations)，也可以从 seata 源码目录下 `/script/config-center/config.txt` 文件中选取需要的配置（config.txt 包含了 server 和 client 的配置）。

`seata-server.properties` 示例配置：

```properties
service.vgroupMapping.zeus_tx_group=default
store.mode=db
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.cj.jdbc.Driver
store.db.url=jdbc:mysql://zeus-mysql:3306/seata_server?useUnicode=true
store.db.user=${MYSQL_USER:root}
store.db.password=${MYSQL_PWD:123456}
```

#### 启动 Server

首先进入 server 目录下的 `bin` 目录，然后调用 `seata-server.sh` 启动 server：

```bash
./seata-server.sh -h 127.0.0.1 -p 8091
```

各启动参数含义：


> -h: 注册到注册中心的 ip
> 
> -p: Server rpc 监听端口
> 
> -m: 全局事务会话信息存储模式，file、db、redis，**优先读取启动参数** (Seata-Server 1.3 及以上版本支持 redis)
> 
> -n: Server node，当有多个 Server 时，需区分各自节点，用于生成不同区间的 transactionId，以免冲突
> 
> -e: 多环境配置参考 http://seata.io/en-us/docs/ops/multi-configuration-isolation.html

### 集成 seata client
