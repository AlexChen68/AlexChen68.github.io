---
title: JDK 安装
icon: java
tag: JDK
date: 2022-12-29
---

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

## Linux 安装 JDK8

1. 检查系统中的 jdk 版本

```bash
java -version

# rpm 检查是否已安装
rpm -qa | grep -i java
rpm -qa | grep jdk

# 卸载命令
rpm -qa | grep java | xargs rpm -e --nodeps
```

2. 从[官网](https://www.oracle.com/java/technologies/downloads/#java8)下载对应系统的 JDK 安装包，然后使用 SFTP 工具上传到服务器的合适目录。

这里有两种类型的包，一种 rpm 包，可以使用 rpm 命令直接安装；一种压缩包，解压后配置环境变量即可。


3. rpm 包安装方式

使用 rpm 命令直接安装

```bash
rpm -ivh jdk-8u381-linux-x64.rpm
```

检查 Java 版本

```bash
java -version
```

4. tar.gz 压缩包安装方式

压缩包解压缩

```bash
tar -zxvf jdk-8u381-linux-x64.tar.gz
```

设置环境变量

```bash
vi /etc/profile
```

添加如下内容，修改为实际 jdk 名称，然后保存并推出

```bash
export JAVA_HOME=/usr/local/src/jdk1.8.0_XX
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
```

执行以下命令，使环境变量生效

```bash
source /etc/profile
```

检查 Java 版本

```bash
java -version
```