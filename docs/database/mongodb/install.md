---
title: 安装 MongoDB
date: 2023-09-14
---

## Docker 安装 MongoDB

1. 下载镜像
   
```bash
docker pull mongo
```

2. 启动容器

```bash
# --auth 参数表示需要密码才能访问
docker run -itd --name mongodb -p 27017:27017 mongo --auth
```

3. 进入容器

```bash
docker exec -it mongodb mongosh
```

4. 进入 admin 数据库并创建用户

```bash
use admin
db.createUser( { user:"root", pwd:"123456", roles: [{role:"root",db:"admin"}] })
```

5. 使用刚创建的用户和密码登录

```bash
db.auth('root','123456')
```
