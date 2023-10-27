---
title: Mysql 主从部署
date: 2023-10-17
order: 22
---

# Mysql 主从部署

## 准备服务器

启动两个 mysql 实例，一台主服务器，一台从服务器

```bash
# 创建网络
docker network create mysql

# 启动主节点
docker run -it --name mysql-master --net mysql -p 3306:3306 -v D:/Docker/mysql-slave/conf:/etc/mysql/conf.d -v D:/Docker/mysql-slave/data:/var/lib/mysql -v D:/Docker/mysql-slave/logs:/var/log/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql

# 启动从节点
docker run -it --name mysql-slave --net mysql -p 13306:3306 -v D:/Docker/mysql-slave/conf:/etc/mysql/conf.d -v D:/Docker/mysql-slave/data:/var/lib/mysql -v D:/Docker/mysql-slave/logs:/var/log/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql
```

## 配置主服务器

增加主服务器配置 `/etc/mysql/conf.d/my.cnf`，然后重启数据库

```ini
[mysqld]
server-id = 1        # 节点 ID，确保唯一
# log config
log-bin = mysql-bin     #开启 mysql 的 binlog 日志功能，binlog 日志位置
sync_binlog = 1         #控制数据库的 binlog 刷到磁盘上去 , 0 不控制，性能最好，1 每次事物提交都会刷到日志文件中，性能最差，最安全
binlog_format = mixed   #binlog 日志格式，mysql 默认采用 statement，建议使用 mixed
expire_logs_days = 7                           #binlog 过期清理时间
max_binlog_size = 100m                    #binlog 每个日志文件大小
binlog_cache_size = 4m                        #binlog 缓存大小

binlog-do-db=daydayup #需要同步的数据库
max_binlog_cache_size= 512m              #最大 binlog 缓存大
binlog-ignore-db=mysql #不生成日志文件的数据库，多个忽略数据库可以用逗号拼接，或者复制这句话，写多行

auto-increment-offset = 1     # 自增值的偏移量
auto-increment-increment = 1  # 自增值的自增量
replica_skip_errors = all #跳过从库错误
```

## 配置从服务器

增加从服务器配置 `/etc/mysql/conf.d/my.cnf`，然后重启数据库

```ini
[mysqld]
server-id=2
log-bin=mysql-bin # 如果从数据库，不需要再往其他数据库同步，可以注释掉
relay-log=slave-relay-bin # 必须开启，从主数据库同步的 binlog 会写入到该目录下
relay-log-index=slave-relay-bin
```

## 创建同步专用用户

（可选）在主服务器创建一个用户，专门用来同步数据

```sql
#如果使用navicate创建用户，需要修改加密方式
alter user xxx identified with mysql_native_password by 'password'
#修改host改为所有ip
update user set host='%' where user='xxx'
#授权不需要加密码
grant replication SLAVE on *.* to 'xxx'@'%'
```

## 检查主服务器状态

登录主服务器，查看主服务器 master 状态

```sql
show master status;
```

记录下 `file` 和 `position` 属性

## 检查从服务器状态

登录从服务器，设置 slave 信息

```sql
# 先停止 slave 服务
stop slave;

# 设置 master 同步信息，修改信息为实际信息，后两项为上面从主服务器获取的 `file` 和 `position` 属性
change master to master_host='172.18.0.2', master_port=3306,master_user='root', master_password='root',master_log_file='mysql-bin.000004',master_log_pos=5018;

# 启动 slave 服务
start slave;

# 查看 slave 状态，观察到如下图所示启动成功
show slave status \G;
```

![](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/1686762625238.png)

## 检验是否同步

在主服务器增加数据，自动同步数据到从数据库相应数据库即设置成功（同步哪些数据库由上述的配置文件设定）
