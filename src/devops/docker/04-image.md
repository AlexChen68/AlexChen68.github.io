---
title: Docker 镜像
category: Docker
date: 2023-01-28
description: Docker 镜像
---

## Docker 镜像操作

### 获取镜像

从 Docker 镜像仓库获取镜像的命令是 `docker pull`。其命令格式为：

```bash
docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]
```

具体的选项可以通过 `docker pull --help` 命令看到，这里我们说一下镜像名称的格式。

- Docker 镜像仓库地址：地址的格式一般是 `<域名/IP>[:端口号]`。如果不指定仓库地址，会使用 Docker 配置的仓库地址，默认地址是 Docker Hub(`docker.io`)。
- 仓库名：如之前所说，这里的仓库名是两段式名称，即 `<用户名>/<软件名>`。对于 Docker Hub，如果不给出用户名，则默认为 `library`，也就是官方镜像。

示例：`docker pull ubuntu:18.04`

```bash
[root@VM-16-13-centos ~]# docker pull ubuntu:18.04
18.04: Pulling from library/ubuntu
40dd5be53814: Pull complete #镜像是分层存储的，前面为每层的 ID 的前 12 位
Digest: sha256:d21b6ba9e19feffa328cb3864316e6918e30acfd55e285b5d3df1d8ca3c7fd3f #镜像完整的 sha256 的摘要
Status: Downloaded newer image for ubuntu:18.04 #下载结果
docker.io/library/ubuntu:18.04 #完整镜像名称
```

### 使用镜像

有了基础镜像之后，可以通过 `docker run`命令基于镜像启动容器，当启动容器时，如果本地不存在该镜像，Docker 还会先从镜像仓库下载该镜像，然后再启动容器，具体的容器相关见 [Docker 容器](#Docker-容器)。

### 查看镜像

列举本地已经下载的镜像使用 `docker image ls`命令，其信息包含了 `仓库名`、`标签`、`镜像 ID`、`创建时间` 以及 `所占用的空间`（镜像实际大小，镜像库中的为压缩后的大小）。

```bash
$ docker image ls
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
redis                latest              5f515359c7f8        5 days ago          183 MB
```

可以使用 `docker system df` 命令查询镜像实际占用的大小，不同镜像可能复用了多层存储中的部分层，因此实际占用硬盘大小会小于显示大小。

**虚悬镜像**

有些镜像原本是有镜像名和标签的，随着官方镜像维护，发布了新版本后，重新 `docker pull`时，镜像名被转移到了新下载的镜像身上，而旧的镜像上的这个名称则被取消，标签会变成 `<none>`，这种镜像称为”虚悬镜像“，可以通过`docker image ls -f dangling=true`命令查看虚悬镜像，一般来说，虚悬镜像已经失去了存在的价值，是可以随意删除的。

更多镜像相关命令可通过`docker image ls --help`查看。

### 删除镜像

**删除命令**

如果要删除本地的镜像，可以使用 `docker image rm` 命令，其格式为：

```bash
docker image rm [选项] <镜像1> [<镜像2> ...]
```

其中的镜像可以为`镜像短 ID`、`镜像长 ID`、`镜像名` 或者 `镜像摘要`。

**当镜像删除时，会出现如下几种情况：**

1. 删除的镜像仅有一个标签，命令执行结果显示 `Deleted`，表示删除；
2. 仅删除了某个标签的镜像，此时会看到命令执行结果中，显示的不是 `Deleted` 而是 `Untagged`，因为还有别的标签指向了这个镜像；
3. 删除了一个镜像的全部标签，但是由于镜像是多层存储复用的，可能有别的镜像依赖当前镜像的某一层，依旧不会触发删除该层的行为，也是为什么有时候会发现所删除的层数和自己 `docker pull` 看到的层数不一样的原因；
4. 当删除的镜像有容器依赖其时，需要先删除容器，然后才可以删除镜像。

**镜像删除命令还可以结合镜像查看命令，删除符合查询条件的镜像**

```bash
docker image rm $(docker image ls [选项])
```

### Docker commit

当我们使用一个镜像运行了一个容器，并且进入容器内部进行了修改的时候，可能需要将修改后的镜像保存，`docker commit` 命令可以将容器打包成为一个新的镜像，具体命令格式：

```bash
docker commit [选项] <容器ID或容器名> [<仓库名>[:<标签>]]
```

`docker commit` 虽然可以制作镜像，但是并不推荐使用，如果使用 `docker diff` 命令查询容器的改动后会发现，容器运行后，除了本身的改动外，由于命令的执行，还有很多文件被改动或添加了；另一方面，镜像所使用的分层存储的概念，除当前层外，之前的每一层都是不会发生改变的，换句话说，任何修改的结果仅仅是在当前层进行标记、添加、修改，而不会改动上一层，一次次的 `docker commit` 只会让镜像越来越臃肿，因此更加推荐使用 `dockerfile` 构建镜像。

## 镜像版本选择

### 官方镜像

官方默认镜像（不带其他后缀的镜像）使用最新的稳定 Debian 操作系统发行版，它的缺点是打包后的体积过大，但它通常是最安全的选择。

示例：openjdk:8u312-jre

### Debian 发行版镜像

带有 bullseye、buster、stretch 或 jessie 标签的镜像是不同 Debian 发行版的代号，对应情况如下：

- bullseye:Debian 11
- buster:Debian 10
- stretch:Debian 9
- jessie:Debian 8

示例：openjdk:8u312-jre-slim-buster

### slim 镜像

slim 的镜像是完整镜像的配对版本。这个镜像通常只安装运行特定工具所需的最小包。以 python 为例，就是运行 python 的最小包，node.js 同理。

通过省去较少使用的工具，镜像会更小。如果有空间限制且不需要完整版本，请使用此镜像。

** 但是，在使用这个镜像时，一定要进行彻底的测试！** 如果您遇到无法解释的错误，请尝试切换到完整的镜像，看看是否能够解决问题。

### alpine 镜像

alipine 镜像基于 alpine linux 项目，这是一个专门为容器内部使用而构建的操作系统。在很长一段时间里，这些是最受欢迎的镜像变体，因为它们的尺寸很小。

然而，一些团队正在弃用 alpine 镜像，因为这些镜像可能会导致难以调试的兼容性问题。具体来说，如果使用 python 镜像，一些 wheels 将被构建成与 Debian 兼容，并且需要重新编译，才能与基于 apline 的镜像一起工作。

使用 alpine 镜像的主要原因是使你得到的镜像尽可能小。基础镜像将小于 5MB。python 基础镜像 (将 python 添加到基础 alpine 镜像) 目前是 78.9MB。这仍然很小。

如果考虑到空间问题，强烈推荐使用此镜像。

它的缺点是不包含一些你可能会需要的包。主要是，它使用了一个更小的 musl lib 代替 glibc。如果您的应用程序有特定的 libc 需求，您可能会遇到问题。

如果你发现 Alpine 镜像缺少你需要的东西，你可以直接在 Dockerfile 中安装它，这样能确保镜像只包含你需要的内容。需要注意，如果您正在安装外部包，您的 Dockerfile 将会更改。主要的区别是，您将使用 apk 而不是 apt-get 来安装包。

对 alpine 镜像的使用有很多担心之处，所以你需要充分了解它。需要充分阅读文档并研究。同样，如果您在构建 Dockerfile 时遇到了无法解释的问题，请尝试切换到完整的镜像，看看是否能解决问题。

示例：openjdk:8u171-jdk-alpine3.7

### windowsservercore 镜像

windowsservercore 是使用 windows 操作系统打包的镜像。

示例：openjdk:8u312-jre-windowsservercore-ltsc2022

:::tip
- 选择镜像时应该根据实际情况选择镜像，不要求镜像大小限制就选择稳定的官方镜像；
- 使用 slim 镜像时应该做全面的测试；
- 如果有极端的空间限制，可以尝试使用 alpine 镜像，但是可能会导致更长的构建时间和不确定的 bug；
- 不要在生产环境中使用 `<image>:latest` 使用最新的镜像，而是使用具体版本并进行全面的测试。
:::