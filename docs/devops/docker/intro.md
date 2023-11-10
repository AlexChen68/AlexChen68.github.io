---
title: Docker 基本概念
date: 2023-10-27
order: 1
---

# Docker 基本概念

## Docker 架构

:::info 基本概念
Docker 包含三个基本概念：

* **镜像**：Docker 镜像（Image），就相当于是一个 root 文件系统。

* **容器（Container）**：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

* **仓库（Repository）**：仓库可看着一个代码控制中心，用来保存镜像。
:::

### 镜像（Image）

我们都知道，操作系统分为 **内核** 和 **用户空间**。对于 `Linux` 而言，内核启动后，会挂载 `root` 文件系统为其提供用户空间支持。而 **Docker 镜像**（`Image`），就相当于是一个 `root` 文件系统。比如官方镜像 `ubuntu:18.04` 就包含了完整的一套 Ubuntu 18.04 最小系统的 `root` 文件系统。

**Docker 镜像** 是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像 **不包含** 任何动态数据，其内容在构建之后也不会被改变。

因为镜像包含操作系统完整的 root 文件系统，其体积往往是庞大的，因此在 Docker 设计时，就充分利用`Union FS`的技术，将其设计为**分层存储**的架构。所以严格来说，镜像并非是像一个 ISO 那样的打包文件，镜像只是一个虚拟的概念，其实际体现并非由一个文件组成，而是由一组文件系统组成，或者说，由多层文件系统联合组成。

镜像构建时，会一层层构建，前一层是后一层的基础。每一层构建完就不会再发生改变，后一层上的任何改变只发生在自己这一层。比如，删除前一层文件的操作，实际不是真的删除前一层的文件，而是仅在当前层标记为该文件已删除。在最终容器运行的时候，虽然不会看到这个文件，但是实际上该文件会一直跟随镜 像。因此，在构建镜像的时候，需要额外小心，每一层尽量只包含该层需要添加的东西，任何额外的东西应该在该层构建结束前清理掉。

分层存储的特征还使得镜像的复用、定制变的更为容易。甚至可以用之前构建好的镜像作为基础层，然后进一步添加新的层，以定制自己所需的内容，构建新的镜像。

### 容器（Container）

镜像（`Image`）和容器（`Container`）的关系，就像是面向对象程序设计中的 `类` 和 `实例` 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 命名空间。因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全。也因为这种隔离的特性，很多人初学 Docker 时常常会混淆容器和虚拟机。

前面讲过镜像使用的是分层存储，容器也是如此。每一个容器运行时，是以镜像为基础层，在其上创建一个当前容器的存储层，我们可以称这个为容器运行时读写而准备的存储层为 **容器存储层**。

容器存储层的生存周期和容器一样，容器消亡时，容器存储层也随之消亡。因此，任何保存于容器存储层的信息都会随容器删除而丢失。

按照 Docker 最佳实践的要求，容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用数据卷（Volume）、或者绑定宿主目录，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。

数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡。因此，使用数据卷后，容器删除或者重新运行之后，数据却不会丢失。

### 仓库（Repository）

镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，[Docker Registry](https://vuepress.mirror.docker-practice.com/repository/registry.html) 就是这样的服务。

一个 **Docker Registry** 中可以包含多个 **仓库**（`Repository`）；每个仓库可以包含多个 **标签**（`Tag`）；每个标签对应一个镜像。

通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 `<仓库名>:<标签>` 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 `latest` 作为默认标签。

以 Ubuntu 镜像为例，ubuntu 是仓库的名字，其内包含有不同的版本标签，如，16.04, 18.04。我们可以通过 ubuntu:16.04，或者 ubuntu:18.04 来具体指定所需哪个版本的镜像。如果忽略了标签，比如 ubuntu，那将视为 ubuntu:latest。

仓库名经常以 *两段式路径* 形式出现，比如 `jwilder/nginx-proxy`，前者往往意味着 Docker Registry 多用户环境下的用户名，后者则往往是对应的软件名。但这并非绝对，取决于所使用的具体 Docker Registry 的软件或服务。

Docker Registry 公开服务是开放给用户使用、允许用户管理镜像的 Registry 服务，官方的  [Docker Hub](https://hub.docker.com/) 国内访问较慢，Docker 官方和国内很多云服务商都提供了国内加速器服务，比如：

- 阿里云的加速器：https://help.aliyun.com/document_detail/60750.html
- 网易加速器：http://hub-mirror.c.163.com
- Docker 官方中国加速器：https://registry.docker-cn.com
- ustc 的镜像：https://docker.mirrors.ustc.edu.cn
- daocloud：https://www.daocloud.io/mirror#accelerator-doc（注册后使用）

当然了，在内部项目中，还可以自己搭建私有的 Docker Registry 服务，官方提供了 [Docker Register](https://hub.docker.com/_/registry/) 镜像。


## Docker 镜像（Image）

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

### Docker commit <Badge text="不推荐" type="warning"/>

当我们使用一个镜像运行了一个容器，并且进入容器内部进行了修改的时候，可能需要将修改后的镜像保存，`docker commit` 命令可以将容器打包成为一个新的镜像，具体命令格式：

```bash
docker commit [选项] <容器ID或容器名> [<仓库名>[:<标签>]]
```

`docker commit` 虽然可以制作镜像，但是并不推荐使用，如果使用 `docker diff` 命令查询容器的改动后会发现，容器运行后，除了本身的改动外，由于命令的执行，还有很多文件被改动或添加了；另一方面，镜像所使用的分层存储的概念，除当前层外，之前的每一层都是不会发生改变的，换句话说，任何修改的结果仅仅是在当前层进行标记、添加、修改，而不会改动上一层，一次次的 `docker commit` 只会让镜像越来越臃肿，因此更加推荐使用 `dockerfile` 构建镜像。

使用 dockerfile 制作镜像可以参考 [dockerfile](docker-file)。

### 镜像版本选择

#### 官方镜像

官方默认镜像（不带其他后缀的镜像）使用最新的稳定 Debian 操作系统发行版，它的缺点是打包后的体积过大，但它通常是最安全的选择。

示例：openjdk:8u312-jre

#### Debian 发行版镜像

带有 bullseye、buster、stretch 或 jessie 标签的镜像是不同 Debian 发行版的代号，对应情况如下：

- bullseye:Debian 11
- buster:Debian 10
- stretch:Debian 9
- jessie:Debian 8

示例：openjdk:8u312-jre-slim-buster

#### slim 镜像

slim 的镜像是完整镜像的配对版本。这个镜像通常只安装运行特定工具所需的最小包。以 python 为例，就是运行 python 的最小包，node.js 同理。

通过省去较少使用的工具，镜像会更小。如果有空间限制且不需要完整版本，请使用此镜像。

** 但是，在使用这个镜像时，一定要进行彻底的测试！** 如果您遇到无法解释的错误，请尝试切换到完整的镜像，看看是否能够解决问题。

#### alpine 镜像

alipine 镜像基于 alpine linux 项目，这是一个专门为容器内部使用而构建的操作系统。在很长一段时间里，这些是最受欢迎的镜像变体，因为它们的尺寸很小。

然而，一些团队正在弃用 alpine 镜像，因为这些镜像可能会导致难以调试的兼容性问题。具体来说，如果使用 python 镜像，一些 wheels 将被构建成与 Debian 兼容，并且需要重新编译，才能与基于 apline 的镜像一起工作。

使用 alpine 镜像的主要原因是使你得到的镜像尽可能小。基础镜像将小于 5MB。python 基础镜像 (将 python 添加到基础 alpine 镜像) 目前是 78.9MB。这仍然很小。

如果考虑到空间问题，强烈推荐使用此镜像。

它的缺点是不包含一些你可能会需要的包。主要是，它使用了一个更小的 musl lib 代替 glibc。如果您的应用程序有特定的 libc 需求，您可能会遇到问题。

如果你发现 Alpine 镜像缺少你需要的东西，你可以直接在 Dockerfile 中安装它，这样能确保镜像只包含你需要的内容。需要注意，如果您正在安装外部包，您的 Dockerfile 将会更改。主要的区别是，您将使用 apk 而不是 apt-get 来安装包。

对 alpine 镜像的使用有很多担心之处，所以你需要充分了解它。需要充分阅读文档并研究。同样，如果您在构建 Dockerfile 时遇到了无法解释的问题，请尝试切换到完整的镜像，看看是否能解决问题。

示例：openjdk:8u171-jdk-alpine3.7

#### windowsservercore 镜像

windowsservercore 是使用 windows 操作系统打包的镜像。

示例：openjdk:8u312-jre-windowsservercore-ltsc2022

:::tip
- 选择镜像时应该根据实际情况选择镜像，不要求镜像大小限制就选择稳定的官方镜像；
- 使用 slim 镜像时应该做全面的测试；
- 如果有极端的空间限制，可以尝试使用 alpine 镜像，但是可能会导致更长的构建时间和不确定的 bug；
- 不要在生产环境中使用 `<image>:latest` 使用最新的镜像，而是使用具体版本并进行全面的测试。
:::

## Docker 容器（Container）

容器是 Docker 又一核心概念。

简单的说，容器是独立运行的一个或一组应用，以及它们的运行态环境。对应的，虚拟机可以理解为模拟运行的一整套操作系统（提供了运行态环境和其他系统环境）和跑在上面的应用。


### 启动容器

启动容器有两种方式，一种是基于镜像新建一个容器并启动，另外一个是将在终止状态（exited）的容器重新启动。

因为 Docker 的容器实在太轻量级了，很多时候用户都是随时删除和新创建容器。

使用以下命令来启动一个新容器：

```bash
docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
```

通过 `docker run` 指定一个镜像及版本来启动对应版本的镜像，如果不指定镜像版本，默认使用 latest 版本。

另外，可以使用 OPTIONS 来覆盖镜像的默认设置，常用的参数有：

- `-t`: 选项让 Docker 分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上
- `-i`: 让容器的标准输入保持打开
- `-d`: 后台运行容器，打印容器的 id
- `--name {name}`: 给启动的容器指定名称，如果冲突会创建失败
- `--rm`: 在容器运行结束后自动删除容器
- `-p`: 为启动的容器与宿主机做端口映射，例如：-p 80:8080，让宿主机的 80 端口与容器内的 8080 端口映射
- `-v`: 设置宿主机目录与容器内目录的映射
- `--network`: 为启动的容器指定网络，如果是自定义网络，需要先使用 `docker network create NETWORK` 创建网络
- `--restart`: 设置容器的重启策略，例如：`--restart=always` 为守护进程启动时自动启动该容器，且该容器非正常停止后自动重启

更多 `docker run` 参数可以参考 [Reference - docker run](https://docs.docker.com/engine/reference/commandline/run/)

还可以使用 `docker start` 启动一个处于停止状态的容器：

```bash
docker start [OPTIONS] CONTAINER [CONTAINER...]
```

当然，也可以重启一个正在运行的重启：

```bash
docker restart [OPTIONS] CONTAINER [CONTAINER...]
```

### 查看容器

查看正在运行的容器：

```bash
docker ps
```

查看全部容器：

```bash
docker ps -a
```

### 进入容器

在使用 -d 参数时，容器启动后会进入后台。

某些时候需要进入容器进行操作，包括使用 `docker attach` 命令或 `docker exec` 命令，推荐大家使用 `docker exec` 命令，因为使用 `docker attach` 命令退出后，容器会停止。

示例：

```bash
docker exec -it 3630fb4ce831 bash
```

进入容器后，输入 `exit` 可以退出容器。

### 停止容器

使用以下命令停止容器：

```bash
docker stop [OPTIONS] CONTAINER [CONTAINER...]
```

可以使用 `-t` 参数，来等待一段时间后停止容器（以秒为单位）。

### 删除容器

使用命令删除容器，前提是容器已经停止：

```bash
docker rm [OPTIONS] CONTAINER [CONTAINER...]

// 或者
docker container rm [OPTIONS] CONTAINER [CONTAINER...]
```

删除所有处于停止状态的容器：

```bash
docker container prune
```

## Docker 仓库 (Repository)？

仓库（Repository）是集中存放镜像的地方。

一个容易混淆的概念是注册服务器（Registry）。实际上注册服务器是管理仓库的具体服务器，每个服务器上可以有多个仓库，而每个仓库下面有多个镜像。从这方面来说，仓库可以被认为是一个具体的项目或目录。例如对于仓库地址 docker.io/ubuntu 来说，docker.io 是注册服务器地址，ubuntu 是仓库名。

大部分时候，并不需要严格区分这两者的概念。

### Docker Hub

Docker Hub 是 Docker 官方维护的一个公共仓库，大部分需求都可以通过在 Docker Hub 中直接下载镜像来实现。

Docker hub 的地址 [https://hub.docker.com](https://hub.docker.com)，你需要注册一个 Docker hub 账号，才能在 Docker Hub 上面创建自己的镜像仓库。

在本地的 Dcoker cli 中，你可以通过 `docker login` 来登录 Docker hub、`docker logout` 来注销登录。

### 私有仓库

有时候使用 Docker Hub 这样的公共仓库可能不方便，用户可以创建一个本地仓库供私人使用。

[docker-registry](https://docs.docker.com/registry/) 是官方提供的工具，可以用于构建私有的镜像仓库。

具体案例可以参考 [Reference - Docekr registry](https://docs.docker.com/registry/#basic-commands)。

### Nexus3.x 的私有仓库

使用 Docker 官方的 Registry 创建的仓库面临一些维护问题。比如某些镜像删除以后空间默认是不会回收的，需要一些命令去回收空间然后重启 Registry。在企业中把内部的一些工具包放入 Nexus 中是比较常见的做法，最新版本 Nexus3.x 全面支持 Docker 的私有镜像。所以使用 Nexus3.x (opens new window) 一个软件来管理 Docker , Maven , Yum , PyPI 等是一个明智的选择。

**启动一个 nexus3 容器：**

```bash
docker run -d -it --name nexus3 --restart=always -p 8081:8081 -p 5000:5000 sonatype/nexus3
```

这里的 8081 为 Nexus3 的网页开放端口，5000 是为 Docker 仓库预留的端口。

容器启动后，打开 localhost:8081 访问 Nexus 界面，可以从右上角点击登录，用户名为 admin，密码需要使用如下命令获取：

```bash
docker exec nexus3 cat /nexus-data/admin.password
```

首次登录后需要更改密码，并设置匿名访问策略。

**之后，我们就可以创建 Docker 仓库了：**

创建一个私有仓库的方法： `Repository->Repositories` 点击右边菜单 `Create repository` 选择 `docker (hosted)`

- **Name**: 仓库的名称
- **HTTP**: 仓库单独的访问端口（例如：**5000**）
- **Hosted -> Deployment pollcy**: 请选择 **Allow redeploy** 否则无法上传 Docker 镜像。

其它的仓库创建方法请各位自己摸索，还可以创建一个 `docker (proxy)` 类型的仓库链接到 DockerHub 上。再创建一个 `docker (group)` 类型的仓库把刚才的 `hosted` 与 `proxy` 添加在一起。主机在访问的时候默认下载私有仓库中的镜像，如果没有将链接到 DockerHub 中下载并缓存到 Nexus 中。

**此外，我们还需要添加用户和访问权限：**

- 菜单 `Security->Realms` 把 Docker Bearer Token Realm 移到右边的框中保存。

- 添加用户规则：菜单 `Security->Roles`->`Create role` 在 `Privlleges` 选项搜索 docker 把相应的规则移动到右边的框中然后保存。

- 添加用户：菜单 `Security->Users`->`Create local user` 在 `Roles` 选项中选中刚才创建的规则移动到右边的窗口保存。

**接下来，我们来测试一下，上传一个镜像到 Nexus 的 Docker 仓库**

1. 拉取一个 ubuntu 镜像

```bash
docker pull ubuntu
```

2. 标记 ubuntu 镜像，归入在 Nexus 创建的 Docker 仓库

```bash
docker image tag ubuntu localhost:5000/myfirstimage
```

3. 登录该 Docker 仓库；输入用户名和密码，具体参考上面的**添加用户和权限** 

```bash
docker login localhost:5000
```

4. push 镜像到 Docker 仓库

```bash
docker push localhost:5000/myfirstimage
```

执行完成就可以在 nexus 看到镜像了。

5. pull 镜像到本地 (先删除本地镜像再拉取)

```bash
// 删除本地镜像
docker rmi localhost:5000/myfirstimage

// 从 Nexus 拉取镜像
docker pull localhost:5000/myfirstimage
```

## 参考资料

- [DockerHub 官方文档](https://docs.docker.com/engine/reference/run/)
- [Docker 从入门到实践](https://vuepress.mirror.docker-practice.com/container/)