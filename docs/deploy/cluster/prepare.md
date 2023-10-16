---
title: 集群部署环境
date: 2023-10-17
order: 30
---

# 准备集群部署环境

## 目标

配置集群部署需要的环境，这里以最少节点的 3 台虚拟机为例，采用 `VMware Workstation Pro` 创建虚拟机，三台机器打通网络，互相配置 ssh 免密登录。

### 创建虚拟机

1. 安装 `VMware Workstation Pro`，windows 激活码 `MC60H-DWHD5-H80U9-6V85M-8280D`;
2. 下载 Centos7 ISO 镜像，下载地址：[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/centos/7.9.2009/isos/x86_64/)（DVD 标准版或 Minimal 最小版）。
3. 使用 `VMware Workstation Pro` 版本在本地创建一台机器（可以先配置一台，配置好后再克隆），并选择 Centos7 操作系统，配置好网络、时区、主机名等等。

### 网络配置

1. 查看网络是否连通

```bash
ping www.baidu.com
```

2. 安装 net-tools

```bash
yum upgrade 
yum install net-tools
```

3. 配置静态 ip（可选）

:::info 可选
默认使用 NAT 模式，开启 DHCP，配置静态 ip 主要是防止 ip 地址改变；

**如果不配置静态 ip，也可以直接设置 DHCP 的有效时间为 63 天**
:::

修改网络配置文件

```bash
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

修改 `BOOTPROTO` 为 `static`，添加 ip 地址、子网掩码、DNS 等设置。

> ip 地址参照 4 步骤自行选择（必须在起始和结束的范围内）
> 
> 子网掩码默认设置为 255.255.255.0
> 
> 网关的值为将 ip 地址中最后一段的值改为 2
> 
> DNS 使用谷歌提供的免费 dns1:8.8.8.8

```bash
# 修改
BOOTPROTO="static"
ONBOOT="yes"

# 添加
IPADDR=192.168.188.128
GATEWAY=192.168.188.2
NETMASK=255.255.255.0
DNS1=8.8.8.8
```

重启网络服务，查看是否配置成功

```bash
systemctl restart network
ping www.baidu.com
```

重启虚拟机后，查看是否连通网络（ip 地址并未改变，且能连通网络）

```bash
reboot
ifconfig
ping www.baidu.com
```

### 克隆虚拟机

使用完整克隆，克隆出两台虚拟机，然后修改主机名。

1. 修改主机名

```bash
# 设置主机名
hostnamectl set-hostname 主机名

# 查看主机名
hostnamectl 主机名
```

2. 重启，查看主机名是否修改成功

```bash
# 重启
reboot

# 查看主机名
hostnamectl 主机名
```

3. 重复上面的 [网络配置](#网络配置) 第三步，配置静态 ip。

### 配置 ssh 免密登录

1. 在三台机器上面的 hosts 文件中，添加 ip 和主机名的映射。

```bash
# 编辑 hosts
vi /etc/hosts

# 添加映射，根据实际 ip 修改
192.168.188.128 node1
192.168.188.129 node2
192.168.188.130 node3
```

2. 生成密钥文件（四次回车），三台机器都需要生成

```bash
ssh-keygen -t rsa
```

3. 将本机公钥文件复制到其它虚拟机上（接收方需先开机），三台机器都需要将自己的公钥复制到其他机器上。

```bash
# 使用 ssh-copy-id 复制到其他机器上，与 hosts 配置对应
# 然后输入 yes 确认，接着输入目标机器的密码
ssh-copy-id node1
ssh-copy-id node2
ssh-copy-id node2
```

4. 检查是否配置成功

在三台机器上面的，分别使用 ssh 命令登录其他节点，无需密码则配置成功。

```bash
ssh node1
ssh node2
ssh node3
```


## 安装 Java 环境

参考 [Jdk 部署](../standalone/jdk)