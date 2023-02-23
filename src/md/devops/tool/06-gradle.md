---
title: Gradle 教程
icon: gradle
tag: gradle
category: 开发工具
date: 2022-12-29
---

## Gradle 简介

Gradle 是一个基于 Apache Ant 和 Apache Maven 概念的项目自动化构建开源工具。它使用一种基于 Groovy 的特定领域语言(DSL)来声明项目设置，也增加了基于 Kotlin 语言的 kotlin-based DSL，抛弃了基于 XML的各种繁琐配置。

面向Java应用为主。当前其支持的语言 C++、Java、Groovy、Kotlin、Scala 和 Swift，计划未来将支持更多的语言。

Gradle 提供了什么:

1. 一种可切换的，像 maven 一样的基于约定的构建框架，却又从不锁住你（约定优于配置）
2. 强大的支持多工程的构建
3. 强大的依赖管理（基于 Apache Ivy），提供最大的便利去构建你的工程
4. 全力支持已有的 Maven 或者 Ivy 仓库基础建设
5. 支持传递性依赖管理，在不需要远程仓库和 pom.xml 和 ivy 配置文件的前提下
6. 基于 groovy 脚本构建，其 build 脚本使用 groovy 语言编写
7. 具有广泛的领域模型支持你的构建

## 安装 Gradle

1. 从 Gralde [官方网站](https://gradle.org/releases/)下载 Gradle 的最新发行包。

![下载 Gradle](https://cdn.staticaly.com/gh/AlexChen68/images@master/blog/devops/gradle_download.png)

2. 解压缩

Gradle 发行包是一个 ZIP 文件。完整的发行包包括以下内容(官方发行包有 full 完整版，也有不带源码和文档的版本，可根据需求下载):

- Gradle 可执行文件
- 用户手册 (有 PDF 和 HTML 两种版本)
- DSL 参考指南
- API 手册(Javadoc 和 Groovydoc)
- 样例，包括用户手册中的例子，一些完整的构建样例和更加复杂的构建脚本
- 源代码。仅供参考使用,如果你想要自己来编译 Gradle 你需要从源代码仓库中检出发行版本源码，具体请查看 Gradle 官方主页。

3. 配置环境变量

运行 gradle 必须将​ `GRADLE_HOME/bin` ​加入到你的 `PATH` 环境变量中, GRADLE_HOME 为解压缩后的 Gradle 包。

4. 测试安装

运行如下命令来检查是否安装成功.该命令会显示当前的 JVM 版本和 Gradle 版本。

```bash
gradle -v 
```
