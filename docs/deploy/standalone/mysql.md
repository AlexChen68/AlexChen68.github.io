---
title: Mysql 安装部署
date: 2023-10-17
order: 21
---

# Mysql 部署

本文介绍两种安装 Mysql 的方式，以及 Mysql 的权限设置：

- [Docker 安装 Mysql](#docker)
- [Yum 安装 Mysql](#yum)
- [Mysql 权限设置](#auth-config)

## Docker 安装 Mysql {#docker}

### 下载 Mysql 镜像

下载最新版本

```bash
docker pull mysql
```

或者指定版本号

```bash
docker pull mysql:8.0.31
```

### 启动容器

```bash
docker run -it --name mysql8\ 
-p 3306:3306\ 
-v ~/docker/mysql/conf:/etc/mysql/conf.d\ 
-v ~/docker/mysql/data:/var/lib/mysql\ 
-v ~/docker/mysql/log:/var/log/mysql\ 
-e MYSQL_ROOT_PASSWORD=PASSWORD\ 
-d mysql:tag
```

`--name` 参数为容器名称;

`-p` 指定端口映射；

`-v` 目录挂载，`:`前面为宿主机目录，后面为虚拟机对应目录；

`-e` 为启动参数，`MYSQL_ROOT_PASSWORD` 是配置的 Mysql 的 root 用户密码；

`-d` 后台运行容器。

示例：

```bash
# mac
docker run -it --name mysql8 -p 3306:3306 -v ~/docker/mysql/conf:/etc/mysql/conf.d -v ~/docker/mysql/data:/var/lib/mysql -v ~/docker/mysql/log:/var/log/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql

# windows
docker run -it --name mysql8 -p 3306:3306 -v D:/Docker/mysql/conf:/etc/mysql/conf.d -v D:/Docker/mysql/data:/var/lib/mysql -v D:/Docker/mysql/logs:/var/log/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql
```

启动后可以通过 `docker ps` 查看容器启动情况。

:::tip
本文示例中的 `mysql8` 参数位置，都为容器实例的名称，实际使用时请修改为自己容器的名称。
:::

### 查看生成的 Root 密码

初始化完成后，命令的输出将包含为 root 用户生成的随机密码; 例如，使用以下命令检查密码：

```bash
docker logs mysql8 2>&1 | grep GENERATED
```

### 从容器内连接 mysql

服务器准备就绪后，您可以在 MySQL 服务器中运行 mysql 客户端。容器，并将其连接到 MySQL 服务器。

使用 `docker exec -it` 命令在 Docker 容器内启动 mysql 客户端 已启动，如下所示：

```bash
docker exec -it mysql8 mysql -u root -p
```

随后输入 root 用户的密码登录。

### 修改 Root 密码

通常，我们首次连接 mysql 后，都需要修改 Root 用户的密码，使用以下命令（替换 password 为修改后的密码）：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
```

更改密码后需要刷新权限：

```bash
flush privileges;
```

### 容器外壳访问

要对 MySQL Server 容器进行 shell 访问，请使用 `docker exec -it` 命令启动 bash shell 容器内：

```bash
docker exec -it mysql8 bash
```

然后，可以在容器内运行 Linux 命令。

### 停止和删除 MySQL 容器

要停止我们创建的 MySQL 服务器容器，请使用 命令：

```bash
docker stop mysql8
```

`docker stop` 向 `mysqld` 进程发送 `SIGTERM` 信号，以便关闭服务器优雅地下来。

还要注意，当容器的主要进程（MySQL 服务器中的 mysqld 容器）停止，Docker 容器会自动停止。

要再次启动 MySQL 服务器容器，请执行以下操作：

```bash
docker start mysql8
```

使用单个停止和重新启动 MySQL 服务器容器 命令：

```bash
docker restart mysql8
```

要删除 MySQL 容器，请先停止它，然后使用 **docker rm** 命令：

```bash
docker stop mysql8
docker rm mysql8
```

## Yum 安装 Mysql {#yum}

> 在实际生产中，我们通过不会使用 Docker 方式安装 Mysql，主要是因为 Docker 镜像与宿主机之间的文件映射，会降低 Mysql 的效率；更常用的方式还是直接在 Linux 下安装 Mysql。

### 添加 MySQL Yum 源

首先，在 [Mysql yum 源网站](https://dev.mysql.com/downloads/repo/yum/)，下载适合自己系统和版本的 Yum 源，并上传到需要安装的机器上。

此步骤可以通过在虚机上执行以下命令直接下载到虚机上（替换为自己的 yum 源版本）：

```bash
wget https://dev.mysql.com/get/mysql80-community-release-el8-{version-number}.noarch.rpm
```

然后在虚机上安装 yum 源，选择一个命令即可：

```bash
# yum 命令安装
sudo yum install mysql80-community-release-el8-{version-number}.noarch.rpm

# rpm 命令安装
sudo rpm -ivh mysql80-community-release-el8-{version-number}.noarch.rpm
```

使用以下命令可以检查 MySQL Yum 源是否已通过以下命令成功添加：

```bash
yum repolist enabled | grep "mysql.*-community.*"
```

### 选择发行版本

使用 MySQL Yum 存储库时，最新的 GA 系列（当前为 MySQL 8.0）被选为 默认安装。有时你可能需要更改为其他版本，使用此命令可以查看 MySQL Yum 存储库中的所有子存储库，以及 查看其中哪些已启用或禁用：

```bash
yum repolist all | grep mysql
```

你可以使用命令更改需要安装的版本为 `--enable`，例如禁用 5.7 版本，启用 8.0 版本：

```bash
sudo yum-config-manager --disable mysql57-community
sudo yum-config-manager --enable mysql80-community
```

也可以手动修改 yum 源配置文件，通常它的路径是 `/etc/yum.repos.d/mysql-community.repo`，**在修改之前一定要先备份**：

```ini
# Enable to use MySQL 8.0
[mysql80-community]
name=MySQL 8.0 Community Server
baseurl=http://repo.mysql.com/yum/mysql-8.0-community/el/6/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql-2022
       file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```

修改你需要安装的版本的 `enabled=1`，不需要安装的自然是 `enabled=0` 啦。

### 禁用默认的 MySQL 模块

（仅限 EL8 系统）基于 EL8 的系统，如 RHEL8 和 Oracle Linux 8 包含一个默认启用的 MySQL 模块。除非禁用此模块，否则它会屏蔽 MySQL 存储库。禁用包含的模块并使 MySQL 存储库包可见，请使用以下内容命令：

```bash
sudo yum module disable mysql
```

### 安装 MySQL

```bash
sudo yum install mysql-community-server
```

这个命令会安装一系列 Mysql 服务器所需要的包，需要耐心等待。

:::tip
如果你觉得下载速度太慢，可以考虑使用阿里云的 yum 源替换，具体做法参考：[配置阿里云 yum 源](/devops/linux/yum.html#yum-aliyun)
:::

### 启动 MySQL 服务器

使用以下命令启动 MySQL 服务器：

```bash
systemctl start mysqld
```

查看状态：

```bash
systemctl status mysqld
```

MySQL 第一次启动时会执行以下的操作：

1. 服务器的初始化;
2. data 目录会产生 SSL 证数和 key 文件;
3. 安装 validate_password 组件并且生效;
4. 创建超级账户 `'root'@'localhost'`，为超级账户生成密码并且把密码保存到错误日志中，通过以下命令获取密码：

```bash
grep 'temporary password' /var/log/mysqld.log
```

### 连接 Mysql

```bash
mysql -u root -p
```

输入查看到的 root 用户的密码即可登录，首次登录建议修改 root 用户密码。

### 修改 Root 密码

通常，我们首次连接 mysql 后，都需要修改 root 用户的密码，使用以下命令（替换 password 为修改后的密码）：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
```

更改密码后需要刷新权限：

```bash
flush privileges;
```

## Mysql 权限设置 {#auth-config}

> 从 Mysql 8.0 起，root 用户默认只能本机登录，不能远程登录；所以通常我们需要创建新的用户，并授予数据库和表的操作权限。

### 查看账号

在创建用户之前，我们应该先看一下已有的用户：

```bash
select user,host from mysql.user;
```

`host` 列中，`localhost` 表示仅本地可以连接，`%` 表示可以远程连接。

### 创建账号

我们来创建一个 test 用户，设置可以远程连接：

```bash
create user 'test'@'%' identified by 'test';
```

参数说明：
  - username：你将创建的用户名；
  - host：指定该用户在哪个主机上可以登录，如果是本地用户可用 localhost，如果想让该用户可以从任意远程主机登录，可以使用通配符%，还可以指定的 ip 地址范围；
  - password：给用户设置密码，`password`必须是明文。在将用户帐户保存到用户表之前，MySQL 将加密明文密码。

再查看用户表，已经创建完成：

```bash
mysql> select user,host from mysql.user where user='test';
+------+------+
| user | host |
+------+------+
| test | %    |
+------+------+
1 row in set (0.01 sec)
```

### 删除账号

删除账号使用 `DROP` 命令：

```sql 
DROP USER 'test'@'%';
```

### 授予账号权限

数据库用户创建完成后，还需要添加对指定数据库的权限才可以访问或修改数据库的数据。

授权命令的语法如下：

```sql
GRANT [privileges]
  ON [database].[table]
  TO ['user']@['ip']
  WITH GRANT OPTION;
```

参数说明：
  - `privileges`: 授予的静态权限标识；例如 `ALL` 表示全部权限，`CREATE` 表示数据库、表或索引的创建权限；多个权限间用 `,` 分割。
  - `[database].[table]`: 可以进行指定权限操作的数据库和表的范围；例如 `*.*` 表示任意数据库的任意表，`test.*` 表示 test 数据库的任意表；
  - `['user']@['ip']`: 授权的用户。
  - `WITH GRANT OPTION`（可选）: 加上了该选项的用户可以对其他用户授权；未加的则不行。

完整的授权规则见 [官方文档 - 6.2.8 添加帐户、分配权限和删除帐户](https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html)

示例：

```sql
// 授予用户 test 全部数据库的全部操作权限
GRANT ALL ON *.* TO 'test'@'%';

// 授予用户 test `zeus_lowcode` 数据库全部表的全部操作权限
GRANT ALL ON zeus_lowcode.* TO 'test'@'%';

// 授予用户 test 全部数据库的 SELECT,INSERT,UPDATE,DELETE,CREATE,DROP 权限
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'test'@'%';
```

### 查看帐户权限

使用 `SHOW GRANTS` 命令可以查看全部用户的权限；如果只需要查看指定用户的权限，可以使用如下命令：

```bash
SHOW GRANTS FOR 'test'@'%';
```

### 撤销帐户权限

要撤消帐户权限，请使用 `REVOKE` 语句：

```sql
REVOKE [privileges]
  ON [database].[table]
  FROM ['user']@['ip']
```

其参数与创建账号时的参数相对应。

示例：

```sql
// 撤销用户 test 的全部权限
REVOKE ALL ON *.* FROM 'test'@'%';

// 撤销用户 test `zeus_lowcode` 数据库全部表的全部操作权限
REVOKE ALL ON zeus_lowcode.* FROM 'test'@'%';

// 撤销用户 test 全部数据库的 SELECT,INSERT,UPDATE,DELETE,CREATE,DROP 权限
REVOKE SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* FROM 'test'@'%';
```

### 修改账号密码及格式

- 修改密码的命令格式：

```sql
ALTER USER 'test'@'%' IDENTIFIED BY 'password';
```

如果你已经登录，则可以使用 `USER()` 表示已登陆的账号：

```sql
ALTER USER USER() IDENTIFIED BY 'password';
```

- 身份验证插件问题

有时候，在进行远程连接的时候，你可能会看见这个错误：

```bash
Error connecting to database: Authentication plugin ‘caching_sha2_password’ cannot be loaded
```

这是因为从 Mysql8.0 开始，默认采用了新的 `caching_sha2_password` 的身份验证方式，常规的老的 web 服务接口大多采用 `mysql_native_password` 方式，Mysql 升级到 8.0 后会导致采用 `mysql_native_password` 方式的 web 服务无法连接数据库。只需要修改一下配置让 Mysql8.0 连接方式默认为 `mysql_native_password` 方式，有两种方式修改：

1. 方法一：在修改密码时指定认证插件

```sql
ALTER USER 'test'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
```

2. 方法二：修改 mysql 配置文件 `my.cnf`，将默认的认证插件修改为 `mysql_native_password`

```ini
default_authentication_plugin=mysql_native_password
```

## Mysql 主从配置

### 准备服务器

启动两个 mysql 实例，一台主服务器，一台从服务器

```bash
# 创建网络
docker network create mysql

# 启动主节点
docker run -it --name mysql-master --net mysql -p 3306:3306 -v D:/Docker/mysql-slave/conf:/etc/mysql/conf.d -v D:/Docker/mysql-slave/data:/var/lib/mysql -v D:/Docker/mysql-slave/logs:/var/log/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql

# 启动从节点
docker run -it --name mysql-slave --net mysql -p 13306:3306 -v D:/Docker/mysql-slave/conf:/etc/mysql/conf.d -v D:/Docker/mysql-slave/data:/var/lib/mysql -v D:/Docker/mysql-slave/logs:/var/log/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql
```

### 配置主服务器

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

### 配置从服务器

增加从服务器配置 `/etc/mysql/conf.d/my.cnf`，然后重启数据库

```ini
[mysqld]
server-id=2
log-bin=mysql-bin # 如果从数据库，不需要再往其他数据库同步，可以注释掉
relay-log=slave-relay-bin # 必须开启，从主数据库同步的 binlog 会写入到该目录下
relay-log-index=slave-relay-bin
```

### 创建同步专用用户

（可选）在主服务器创建一个用户，专门用来同步数据

```sql
#如果使用navicate创建用户，需要修改加密方式
alter user xxx identified with mysql_native_password by 'password'
#修改host改为所有ip
update user set host='%' where user='xxx'
#授权不需要加密码
grant replication SLAVE on *.* to 'xxx'@'%'
```

### 检查主服务器状态

登录主服务器，查看主服务器 master 状态

```sql
show master status;
```

记录下 `file` 和 `position` 属性

### 检查从服务器状态

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

### 检验是否同步

在主服务器增加数据，自动同步数据到从数据库相应数据库即设置成功（同步哪些数据库由上述的配置文件设定）

## 参考资料

- [Deploying MySQL on Linux with Docker Containers](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html)