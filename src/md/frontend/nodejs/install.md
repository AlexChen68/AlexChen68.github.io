---
title: Node.js 的安装
category: 
date: 2023-02-22
---

介绍 Node.js 的安装方法
<!-- more -->

## Node.js简介

Node.js 是一个开源和跨平台的 JavaScript 运行时环境。 它几乎是任何类型项目的流行工具！

Node.js 在浏览器之外运行 V8 JavaScript 引擎（Google Chrome 的内核）。 这使得 Node.js 的性能非常好。

Node.js 应用程序在单个进程中运行，无需为每个请求创建新的线程。 Node.js 在其标准库中提供了一组异步的 I/O 原语，以防止 JavaScript 代码阻塞，通常，Node.js 中的库是使用非阻塞范式编写的，使得阻塞行为成为异常而不是常态。

当 Node.js 执行 I/O 操作时（比如从网络读取、访问数据库或文件系统），Node.js 将在响应返回时恢复操作（而不是阻塞线程和浪费 CPU 周期等待）。

这允许 Node.js 使用单个服务器处理数千个并发连接，而不会引入管理线程并发（这可能是错误的重要来源）的负担。

Node.js 具有独特的优势，因为数百万为浏览器编写 JavaScript 的前端开发者现在无需学习完全不同的语言，就可以编写除客户端代码之外的服务器端代码。

在 Node.js 中，可以毫无问题地使用新的 ECMAScript 标准，因为你不必等待所有用户更新他们的浏览器，你负责通过更改 Node.js 版本来决定使用哪个 ECMAScript 版本，你还可以通过运行带有标志的 Node.js 来启用特定的实验性功能。

## 如何安装 Node.js

Node.js 可以通过多种方式安装，所有主流平台的官方软件包都可以在 [http://nodejs.cn/download/](http://nodejs.cn/download/) 获得。

安装 Node.js 的一种非常方便的方式是通过包管理器。 对于这种情况，每种操作系统都有其自身的包管理器。

其他适用于 MacOS、Linux 和 Windows 的包管理器列出在 [http://nodejs.cn/download/package-manager/](http://nodejs.cn/download/package-manager/)。

### Windows 安装 Node.js

在官网下载 Node.js 安装包后，点击安装即可。

### Linux 安装 Node.js

#### 使用 NVM 安装

**什么是 NVM**
nvm 是node.js的版本管理器，旨在按用户安装，并按 shell 调用。nvm适用于任何符合 POSIX 的 shell（sh、dash、ksh、zsh、bash），特别是在以下平台上：unix、macOS 和windows WSL。

1. 安装 NVM
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
或者使用
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
运行上述任一命令都会下载脚本并运行它。

2. 退出环境查看是否安装成功关闭远程连接后重新进入并输入命令
```bash
nvm -version
```

3. 安装 Node
```bash
nvm install --lts
```

4. 检查是否安装成功
```bash
node -v
npm -v
```

#### 手动解压安装

1. 下载对应 Linux 版本下的压缩包
```bash
wget https://npmmirror.com/mirrors/node/v16.16.0/node-v16.16.0-linux-x64.tar.xz
```

2. 解压缩
```bash
tar xvf node-v16.16.0-linux-x64.tar.xz
```

3. 创建软链接，以便可以在任意目录下使用 node 和 npm 命令
```bash
ln -s /usr/local/node/node-v16.16.0-linux-x64/bin/node /usr/local/bin/node
ln -s /usr/local/node/node-v16.16.0-linux-x64/bin/npm /usr/local/bin/npm
```

4. 检查是否安装成功
```bash
node -v
npm -v
```

## 参考资料

[Node.js官网](https://nodejs.org/zh-cn/)