---
title: Linux 常用命令
date: 2023-10-26
order: 1
---

# Linux 常用命令

## Linux 命令查询

- [Linux 命令搜索](https://git.io/linux)
- [Linux 命令速查表](https://wangchujiang.com/reference/docs/linux-command.html)

## ssh 命令

- 将本地 ssh 公钥复制到远程主机，实现免密登陆

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server
```

第一次需要输入密码，在成功添加后，之后可以直接连接：

```bash
ssh user@server
```

:::warning 注意：
记得修改远程主机的用户名和 ip 地址
:::