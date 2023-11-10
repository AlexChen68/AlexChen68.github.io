---
title: Zookeeper 安装部署
date: 2023-10-18
order: 102
---

## 独立模式部署

### 下载 ZooKeeper

下载地址：http://zookeeper.apache.org/releases.html

通常选择最新的 stable 版本。

### 解压缩

解压缩到某一目录 (这里以 /opt 目录为例)，可以修改解压缩后的文件夹名称

```bash
# 解压缩
tar -zxf /opt/apache-zookeeper-3.8.3-bin.tar.gz

# 重命名
mv /opt/apache-zookeeper-3.8.3-bin /opt/zookeeper
```

### 添加配置文件

进入配置目录

```bash
cd /opt/zookeeper/conf
```

创建配置文件 `zoo.cfg`

```bash
vi zoo.cfg
```

添加配置信息，

```ini
tickTime=2000
dataDir=/var/lib/zookeeper
dataLogDir=/var/lib/log
clientPort=2181
```

> tickTime=2000（Zookeeper 最小时间单元，单位毫秒 (ms)，默认值为 3000）。
> 
> dataDir=/var/lib/zookeeper（Zookeeper 服务器存储快照文件的目录，必须配置）。
> 
> dataLogDir=/var/lib/log（Zookeeper 服务器存储事务日志的目录，默认为 dataDir）。
> 
> clientPort=2181（服务器对外服务端口，一般设置为 2181）。

### ZooKeeper 启停

首先进入 zookeeper 的 bin 目录下，

```bash
cd /opt/zookeeper/bin
```

调用 `zkServer.sh` 脚本，可以对 zookeeper 进行如下操作：

- 启动 ZooKeeper 服务：`./zkServer.sh start`
- 查看 ZooKeeper 服务状态：`./zkServer.sh status`
- 停止 ZooKeeper 服务：`./zkServer.sh stop`
- 重启 ZooKeeper 服务：`./zkServer.sh restart`

### 连接 ZooKeeper

首先进入 zookeeper 的 bin 目录下。

```bash
cd /opt/zookeeper/bin
```

调用 `zkCli.sh` 脚本，连接到 zookeeper

```bash
./zkCli.sh -server 127.0.0.1:2181
```

更多 cli 命令，参考 [zookeeperCLI](https://zookeeper.apache.org/doc/r3.8.3/zookeeperCLI.html)。

## 集群部署

### 准备工作

最少三台服务器（奇数），打通网络，配置 ssh 免密登录，安装 JDK；

配置 hosts

```
192.168.188.128 node1
192.168.188.129 node2
192.168.188.130 node3
```

关闭防火墙

```bash
systemctl stop firewalld
systemctl disable firewalld
setenforce 0
```

可以参考 [集群环境配置](./vm-cluster)

### 配置文件

在独立模式部署的前提下，修改配置文件如下

```ini
tickTime=2000
dataDir=/var/lib/zookeeper
clientPort=2181
initLimit=5
syncLimit=2
server.1=node1:2888:3888
server.2=node2:2888:3888
server.3=node3:2888:3888
```

### 指定节点 id

使用 echo 命令，写入希望的节点 id 到 zoo.cfg 配置的 dataDir 目录下的 myid 文件中：

```bash
echo 1 > /opt/zookeeper/data/myid
echo 2 > /opt/zookeeper/data/myid
echo 3 > /opt/zookeeper/data/myid
```


### 配置 Zookeeper 启动脚本

```bash
vi /etc/init.d/zookeeper
```

```sh
#!/bin/bash
ZK_HOME='/opt/zookeeper'
case $1 in
start)
	echo "---------- zookeeper 启动 ------------"
	$ZK_HOME/bin/zkServer.sh start
;;
stop)
	echo "---------- zookeeper 停止 ------------"
	$ZK_HOME/bin/zkServer.sh stop
;;
restart)
	echo "---------- zookeeper 重启 ------------"
	$ZK_HOME/bin/zkServer.sh restart
;;
status)
	echo "---------- zookeeper 状态 ------------"
	$ZK_HOME/bin/zkServer.sh status
;;
*)
    echo "Usage: $0 {start|stop|restart|status}"
esac
```

### 启停服务

- 启动 ZooKeeper 服务：`service zookeeper start`
- 查看 ZooKeeper 服务状态：`service zookeeper status`
- 停止 ZooKeeper 服务：`service zookeeper stop`
- 重启 ZooKeeper 服务：`service zookeeper restart`

启动后查看状态，如下为启动成功示例，Mode 表示是领导节点还是从节点

```bash
[root@node1 bin]# service zookeeper status
---------- zookeeper 状态 ------------
/bin/java
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper/bin/../conf/zoo.cfg
Client port found: 2181. Client address: localhost. Client SSL: false.
Mode: leader
```

### 连接 ZooKeeper

首先进入 zookeeper 的 bin 目录下。

```bash
cd /opt/zookeeper/bin
```

调用 `zkCli.sh` 脚本，连接到 zookeeper

```bash
./zkCli.sh -server 127.0.0.1:2181
```

在一个节点 set 数据，查看其他节点是否可以查看到该数据，以验证集群是否部署成功。

## 参考资料

- [官方文档](https://zookeeper.apache.org/doc/r3.8.3/zookeeperStarted.html)
- [zookeeper 集群](https://blog.csdn.net/wang_dian1/article/details/131680214)