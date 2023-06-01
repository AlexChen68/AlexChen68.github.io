---
title: JDK 安装
icon: java
tag: JDK
category: 开发工具
date: 2022-12-29
---

介绍各种 JDK 的安装和配置。
<!-- more -->
## windows 安装 JDK8

### 下载 JDK8

JDK 下载地址：[https://www.oracle.com/java/technologies/downloads/#java8-windows](https://www.oracle.com/java/technologies/downloads/#java8-windows)

### 安装

点击下载好的安装包进行安装，安装路径最好不要有中文或者特殊符号如空格等；

安装时可以取消勾选安装 JRE，因为 JDK 已经自带了。

### 配置环境变量

点开系统环境变量设置，增加如下设置：

1. 增加一个系统变量

```
变量名:JAVA_HOME
变量值:JDK的安装目录，按照实际情况修改
```

2. 添加如下路径到 PATH 变量中

```
.;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin
```

### 查看是否安装成功
 
打开系统终端，输入：

```bash
java -version
```

出现 JDK 的版本信息表示安装成功

```bash
java version "1.8.0_351"
Java(TM) SE Runtime Environment (build 1.8.0_351-b10)
Java HotSpot(TM) 64-Bit Server VM (build 25.351-b10, mixed mode)
```
