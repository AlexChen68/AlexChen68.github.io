---
title: Dockerfile
date: 2023-01-28
order: 3
---

# Dockerfile

## 什么是 Dockerfile？

Docker 镜像的定制实际上就是定制每一层所添加的配置、文件。如果我们可以把每一层修改、安装、构建、操作的命令都写入一个脚本，用这个脚本来构建、定制镜像，那么之前提及的无法重复的问题、镜像构建透明性的问题、体积的问题就都会解决。这个脚本就是 Dockerfile。

Dockerfile 是一个文本文件，其内包含了一条条的 指令 (Instruction)，每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。

## Dockerfile 文件格式

| 指令       | 参数      | 描述                                       |
|------------|-----------|------------------------------------------|
| FROM       | image     | 指定基础镜像                               |
| MAINTAINER | name      | 镜像维护者信息                             |
| RUN        | command   | 在容器内部执行命令                         |
| CMD        | command   | 容器启动时执行命令                         |
| EXPOSE     | port      | 声明容器需要监听的端口                     |
| ENV        | key=value | 设置环境变量                               |
| ADD        | src dest  | 复制文件或目录到容器内部                   |
| COPY       | src dest  | 复制文件或目录到容器内部                   |
| ENTRYPOINT | command   | 容器启动时执行的命令                       |
| VOLUME     | path      | 声明数据卷                                 |
| USER       | username  | 指定容器运行的用户名                       |
| WORKDIR    | path      | 指定容器的工作目录                         |
| ARG        | name      | 设置构建时的参数                           |
| ONBUILD    | command   | 当镜像被用作其他镜像的基础镜像时执行的命令 |

## 构建镜像

docker 使用 dockerfile 构建镜像的命令格式为：

```
docker build [选项] <上下文路径/URL/->
```

*其中上下文路径为 `Dockerfile` 文件所在路径。*

:::tip
其中上下文路径并不是 `Dockerfile` 文件所在路径，而是**上下文路径**；

当构建的时候，用户会指定构建镜像上下文的路径，docker build 命令得知这个路径后，会将路径下的所有内容打包，然后上传给 Docker 引擎。这样 Docker 引擎收到这个上下文包后，展开就会获得构建镜像所需的一切文件。

因为有了上下文路径，我们才能在 `ADD` 和 `COPY` 命令中，获取到需要打包的文件路径。
:::

示例：

```dockerfile
FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
```

在 `Dockerfile` 文件所在目录，执行以下命令，将使用当前目录下的 `Dockerfile` 文件构建一个 nginx 镜像，版本为 v3:

```bash
docker build -t nginx:v3 .
```
