---
title: OpenApi3 和 Springdoc
date: 2023-07-17
order: 2
---

# OpenApi3 规范与 Springdoc 工具

## 相关概念

说到接口文档，常常会听到 OpenAPI、Swagger、Knife4j 等等词汇，它们都是什么？它们之间有什么关系呢？

### OpenAPI 和 Swagger

`OpenAPI` 是一种用于描述和定义 RESTful API 的规范，它定义了 API 的结构、端点、参数、响应等信息。
Swagger 它是 SmartBear 这个公司的一个开源项目，里面提供了一系列工具，包括著名的 `swagger-ui`。

目前 `OpenApi` 的版本：
- `OpenApi2` 对应 Swagger 的实现版 Swagger2，Swagger2 已经于 17 年停止维护，对应的包名：`io.swagger  `
- `OpenApi3` 对应 Swagger 的实现版 Swagger3，Swagger3 于 17 年开始开发，对应的包名：`io.swagger.core.v3`

相关资料：

- [OpenAPI 规范 (中文版)](https://openapi.apifox.cn/)
- [OpenApi3 规范 - 官网](https://swagger.io/specification/)

### Springfox <Badge text="不推荐" type="danger"/>

Springfox 是 Spring 生态的一个开源库，是 Swagger 与 OpenApi 规范的具体实现。

由于目前已经不再更新，Spring 官方推出了另一个库：Springdoc。

### SpringDoc <Badge text="推荐" type="tip"/>

SpringDoc 基于 OpenAPI 3 规范，用于 SpringBoot 项目中 API 文档的生成和维护的工具类，支持 Springboot3，推荐直接使用它。

相关资料：

- [SpringDoc 官网](https://springdoc.org/)

### Knife4j <Badge text="增强方案" type="tip"/>

Knife4j 是一个集 Swagger2 和 OpenAPI3 为一体的增强解决方案。

- 基于 SpringFox2.x 版本提供 Swagger2 规范的增强扩展
- 基于 Springdoc-openapi 项目提供 OAS3 规范的增强扩展

相关资料：

- [Knife4j 官网](https://doc.xiaominfo.com/)

:::tip 小结
推荐使用 Springdoc 或者 Knife4j。
:::

## SpringBoot - Springdoc 实践

看这一篇：[秒懂 SpringBoot 之如何集成 SpringDoc](http://lihuaxi.xjx100.cn/news/1267782.html?action=onClick)

## SpringCloud - Springdoc 实践

在 SpringCloud 中，由于存在网关进行路由转发，我们可以这样搭建接口平台：

- 在各个微服务中引入 springdoc，仅开启 springdoc 的接口，关闭 swagger-ui 界面；
- 网关模块开启 swagger-ui 和 springdoc 接口，通过 `springdoc.swagger-ui.urls` 进行分组

微服务示例：

```yml
# springdoc 配置，关闭 swagger-ui，仅提供接口，统一由网关提供界面
springdoc:
  api-docs:
    enabled: true
    path: /springdoc # 自定义接口路径，请求这个接口会响应符合 openapi 规范的接口信息数据
  swagger-ui:
    enabled: false
```

网关示例：

```yml
springdoc:
  api-docs:
    enabled: true
    path: /springdoc # 自定义接口路径，请求这个接口会响应符合 openapi 规范的接口信息数据
  swagger-ui:
    path: /swagger-ui # 自定义 swagger-ui 界面路径
    # 接口分组，通常一个服务一组，url 为获取 openapi 数据的接口，path 第一部分为前缀，与路由保持一致；后面为子服务配置的 openapi 接口地址
    urls:
      - name: your-service-name
        url: /admin/springdoc
```
