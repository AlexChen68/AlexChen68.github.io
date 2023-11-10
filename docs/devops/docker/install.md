---
title: Docker 安装配置
date: 2023-01-28
order: 2
---

# Docker 安装配置

## 安装 docker

### 卸载旧 Docker 及依赖

```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

### 安装 yum 工具，添加 yum 源配置

安装工具

```bash
yum install -y yum-utils device-mapper-persistent-data lvm2
```

添加 yum 源（二选一）

```bash
# 中央仓库
yum-config-manager --add-repo http://download.docker.com/linux/centos/docker-ce.repo

# 阿里云镜像
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

### 安装 Docker CE

1. 安装`docker-ce`

```bash
yum install -y docker-ce
```

2. 设置系统启动

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

3. 检查`docker`状态

```bash
systemctl status docker
```

## Docker 仓库配置

示例使用官方国内镜像仓库地址，对于使用 systemd 的系统，请在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）

```bash
{"registry-mirrors":["https://registry.docker-cn.com"]}
```

之后重新启动服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```