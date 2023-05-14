---
title: Node.js 的安装
category: Node.js
date: 2023-02-22
---

## 如何安装 Node.js

Node.js 可以通过多种方式安装，所有主流平台的官方软件包都可以在 [http://nodejs.cn/download/](http://nodejs.cn/download/) 获得。

安装 Node.js 的一种非常方便的方式是通过包管理器。对于这种情况，每种操作系统都有其自身的包管理器。

其他适用于 MacOS、Linux 和 Windows 的包管理器列出在 [http://nodejs.cn/download/package-manager/](http://nodejs.cn/download/package-manager/)。

### Windows 安装 Node.js

在官网下载 Node.js 安装包后，点击安装即可。

### Linux 安装 Node.js

#### 使用 NVM 安装

**什么是 NVM**
nvm 是 node.js 的版本管理器，旨在按用户安装，并按 shell 调用。nvm 适用于任何符合 POSIX 的 shell（sh、dash、ksh、zsh、bash），特别是在以下平台上：unix、macOS 和 windows WSL。

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

[Node.js 官网](https://nodejs.org/zh-cn/)