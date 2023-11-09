---
title: JDK 安装
date: 2022-12-29
order: 0
---

# JDK 安装部署

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

### 卸载旧版本

```bash
# 查看是否有旧版本
java -version

# rpm 检查是否已安装
rpm -qa | grep -i java
rpm -qa | grep jdk

# 卸载命令
rpm -qa | grep java | xargs rpm -e --nodeps
```

### 下载 JDK

从[官网](https://www.oracle.com/java/technologies/downloads/#java8)下载对应系统的 JDK 安装包，然后使用 SFTP 工具上传到服务器的合适目录。

这里有两种类型的包，一种 rpm 包，可以使用 rpm 命令直接安装，无需手动配置环境变量；

另一种是压缩包格式的，解压后手动配置环境变量即可。


### rpm 包安装方式

使用 rpm 命令直接安装

```bash
rpm -ivh jdk-8u381-linux-x64.rpm
```

检查 Java 版本

```bash
java -version
```

### tar.gz 压缩包安装方式

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

## MacOS 安装 JDK

### 下载 JDK

从 [Orcale 官方](https://www.oracle.com/cn/java/technologies/downloads/) 下载需要版本的 `.dmg` 安装包（mac m 系列芯片选择 aarch64 版本的）

### 安装 JDK

直接双击安装包安装，会自动安装到 `/Library/Java/JavaVirtualMachines` 目录下面。

```bash
cd /Library/Java/JavaVirtualMachines
```

### 配置环境变量

- 编辑环境变量文件

```bash
vim ~/.bash_profile
```

- 单版本 jdk 配置示例

```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-8.jdk/Contents/Home
```

- 多版本 jdk 配置示例

```bash
# jdk home config
export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk-8.jdk/Contents/Home
export JAVA_11_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
export JAVA_17_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home

# default jdk home
export JAVA_HOME=$JAVA_8_HOME

# switch jdk version
alias jdk8='export JAVA_HOME=$JAVA_8_HOME'
alias jdk11='export JAVA_HOME=$JAVA_11_HOME'
alias jdk17='export JAVA_HOME=$JAVA_17_HOME'
```

> 上面配置了三个 jdk，并通过 alias 命令重命名了三个指令，执行 `jdk{version}` 命令可以切换 jdk 版本。

:::warning 注意：
配置 JDK 安装目录要到 `/Contents/Home` 子目录下
:::

- 使配置文件生效

```bash
source ~/.bash_profile
```

### 查看 JDK 版本信息
 
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

### 查看安装的所有 JDK 版本

```bash
/usr/libexec/java_home -V
```
