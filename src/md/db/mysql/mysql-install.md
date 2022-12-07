---
title: Mysql 的安装和卸载
article: true
date: 2022-12-06
tag: [Mysql]
category: [Mysql]
isOriginal: true
description: Mysql 的安装和卸载
---

## Docker 安装 Mysql

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
-e MYSQL_ROOT_PASSWORD=my-secret-pw\ 
-d mysql:tag
```

`--name` 参数为容器名称;

`-p` 指定端口映射；

`-v` 目录挂载，`:`前面为宿主机目录，后面为虚拟机对应目录；

`-e` 为启动参数，`MYSQL_ROOT_PASSWORD` 是配置的 Mysql 的 root 用户密码；

`-d` 是启动的镜像及版本。

示例：

```bash
docker run -it --name mysql8\
 -p 3306:3306\
 -v ~/docker/mysql/conf:/etc/mysql/conf.d\
 -v ~/docker/mysql/data:/var/lib/mysql\
 -v ~/docker/mysql/log:/var/log/mysql\
 -e MYSQL_ROOT_PASSWORD=root\
 -d mysql
```




