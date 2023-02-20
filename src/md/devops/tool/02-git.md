---
title: Git 教程
index: false
isOriginal: true
tag: [Git]
category: 开发工具
date: 2022-12-29
---

## Windows 安装 Git

1. 下载 Git 安装包

从 [Git 官网](https://git-scm.com/download/win)或者 [Github 仓库](https://github.com/git-for-windows/git/releases/tag/v2.39.1.windows.1) 下载 Git 安装包发行版

2. 双击安装包安装

Git 安装时有许多可选配置，无特殊需求，使用默认选择即可。

3. 配置 Git 全局用户和邮箱

使用如下命令配置：

```bash
git config --global user.name "AlexChen"
git config --global user.email "1274812218@qq.com"
```

如果你只想改变当前 Git 仓库的配置，去掉 `global` 参数即可。

如果你需要删除配置，可以使用：

```bash
git config --global --unset user.name
```