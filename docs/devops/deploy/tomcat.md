---
title: Tomcat 部署
date: 2023-02-20
order: 30
---

# Tomcat 安装

## 下载 tomcat

安装 tomcat 要注意与 JDK 版本匹配，可以查看官方文档的版本对比：[Apache Tomcat - Which Version Do I Want?](https://tomcat.apache.org/whichversion.html)

目前来看 Tomcat8.5 是主流使用版本，而使用 Maven 构建的 Tomcat 项目中，使用的是 Tomcat 7.0。

Tomcat 8.5 的官网下载地址：[Apache Tomcat 8 Software Downloads](https://tomcat.apache.org/download-80.cgi)

## 启动 Tomcat

Tomcat 启动方式：

1. startup.bat 启动

- 操作：找到 tomcat 安装目录，然后找到`bin`目录下的`startup.bat`,双击启动。
- 验证：启动后在浏览器的地址栏中输入如下地址，如果出现 Tomcat 欢迎页面则启动成功。    
  1. http://localhost:8080
  2. http://127.0.0.1:8080
  3. http://电脑真实ip:8080
- 关闭的话同样在`bin`目录中找到`shutdown.bat`,双击关闭。或者直接 X 掉。

2. 命令启动

- 在 cmd 中进入 tomcat 安装的 bin 目录下（或者直接在 bin 目录中然后地址栏输入 cmd），输入命令`catalina run` ,回车，启动成功。
- 测试启动成功和上面的验证方法一样。

## 参考资料

- [Web 容器是什么？]([Web 容器是什么？ - 掘金 (juejin.cn)](https://juejin.cn/post/6844903853792428046))
- [Tomcat 两种启动方式及常见问题解决。](https://cloud.tencent.com/developer/article/1818755)
