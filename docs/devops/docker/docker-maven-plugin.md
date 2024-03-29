---
title: Docker maven 插件
date: 2023-05-25
order: 21
---

# Docker maven 插件

## 什么是 docker-maven-plugin？

`fabric8io/docker-maven-plugin` 是一个用于管理 Docker 镜像和容器的 Maven 插件。它侧重于 Docker 构建集成的两个主要方面：

- 构建镜像：此插件的一个目的是创建保存实际应用程序的 Docker 镜像，这是通过 Mavne 命令 `docker:build` 完成的；
- 启停容器：使用此插件，可以运行完全隔离的集成测试，因此您无需处理共享资源。端口可以动态映射，并作为 Maven 属性提供给集成测试代码。

简单来说，通过这个插件，我们可以直接在本地将 SpringBoot 项目打包成 Docker 镜像，并推送至 Docker Register。

官方文档地址：[https://dmp.fabric8.io/](https://dmp.fabric8.io/)

## 使用 docker-maven-plugin

首先，需要添加 maven 依赖：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>io.fabric8</groupId>
            <artifactId>docker-maven-plugin</artifactId>
            <version>${version}</version>
        </plugin>
    </plugins>
</build>
```

然后，添加一个名为 Dockerfile 文件，输入镜像的打包配置。例如：

```Dockerfile
FROM openjdk:8-jdk-alpine

WORKDIR /app
ADD target/demo-1.0-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

完成 Dockerfile 的配置后，如果你配置了 Docker_HOST 环境变量，即有 Docker 守护进程的远程 URL，当你执行 `mvn docker:build` 的时候，就可以打包镜像至该引擎了。

如果你没有配置，那么可以添加一个系统环境变量，Key 为 Docker_HOST，value 为 Docker 守护进程的远程接口（需要开启你的 Docker 守护进程的远程接口哦），例如：`tcp://host:2375` （host 用实际 ip 地址替换，如果是本机可以填写 127.0.0.1）。

上面只是最简单的使用，我们并没有对其进行额外的配置，比如镜像名称，版本号，我们也可以在配置中使用指定的 Docker_HOST，这些配置可以在官方文档中找到 [ClickHere](https://dmp.fabric8.io/#global-configuration)。

下面的例子中，在上面的基础上，让项目在执行 `mvn install` 的时候，自动打包镜像。

```xml
<build>
    <plugins>
        <plugin>
            <groupId>io.fabric8</groupId>
            <artifactId>docker-maven-plugin</artifactId>
            <version>0.41.0</version>
            <configuration>
                <images>
                    <image>
                        <name>%g/%a:%v</name>
                        <run>
                            <containerNamePattern>%n-%i</containerNamePattern>
                        </run>
                    </image>
                </images>
            </configuration>
            <executions>
                <execution>
                    <phase>install</phase>
                    <goals>
                        <goal>build</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```
