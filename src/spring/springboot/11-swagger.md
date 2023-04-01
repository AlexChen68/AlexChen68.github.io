---
title: SpringBoot 使用 Swagger
date: 2022-09-29
tag: SpringBoot
  - Swagger
  - Knife4j
category: SpringBoot
isOriginal: true
description: SpringBoot 使用 Swagger
---

Swagger 是一个用于生成、描述和调用 RESTful 接口的 Web 服务。通俗的来讲，Swagger 就是将项目中所有（想要暴露的）接口展现在页面上，并且可以进行接口调用和测试的服务。
<!-- more -->

## OpenAPI 规范

[OpenAPI](https://swagger.io/resources/open-api) 规范（OAS）是一种通用的、和编程语言无关的 API 描述规范，使人类和计算机都可以发现和理解服务的功能，而无需访问源代码、文档或针对接口进行嗅探。正确定义后，使用者可以使用最少的实现逻辑来理解远程服务并与之交互。

OpenAPI 始于 Swagger 规范，Swagger 规范已于 [2015 年捐赠给 Linux 基金会后改名为 OpenAPI](https://smartbear.com/blog/develop/what-is-the-difference-between-swagger-and-openapi/)，并定义最新的规范为 OpenAPI 3.0。

官方GitHub地址： [OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification)

## 什么是 Swagger

Swagger 是一个用于生成、描述和调用 RESTful 接口的 Web 服务。通俗的来讲，Swagger 就是将项目中所有（想要暴露的）接口展现在页面上，并且可以进行接口调用和测试的服务。

Swagger 有以下 3 个重要的作用：

- 将项目中所有的接口展现在页面上，这样后端程序员就不需要专门为前端使用者编写专门的接口文档；
- 当接口更新之后，只需要修改代码中的 Swagger 描述就可以实时生成新的接口文档了，从而规避了接口文档老旧不能使用的问题；
- 通过 Swagger 页面，我们可以直接进行接口调用，降低了项目开发阶段的调试成本。

Swagger3完全遵循了 OpenAPI 规范。Swagger 官网地址：[https://swagger.io/  (opens new window)](https://swagger.io/)

在 Spring 中，`SpringFox` 是 Swagger 规范的实现，其 [Github 地址](https://github.com/springfox/springfox)。

## 什么是 Knife4J？

`Knife4j` 的前身是 `swagger-bootstrap-ui`，这是一个 Swagger 的 UI 增强方案，随着不断改进，更名为 `Knife4j`，其[官网地址](https://doc.xiaominfo.com/docs/quick-start)。

## SpringBoot 使用 Swagger

### 引入依赖

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

### 自定义 Swagger 配置

- 使用 `@EnableOpenApi` 开启 Swagger

- 通过 `@Bean` 配置一个` `Docket` 对象，来配置 Swagger；
- 其中有一个重点配置是，使用 `enable(boolean flag)` 来控制 Swagger 是否开启；具体通过 `environment.acceptsProfiles()` 方法判断当前环境是否符合 `Profiles` 中定义，将结果传入 `enable()` 方法。

```java
@Configuration
@EnableOpenApi
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class SwaggerConfiguration {

    /**
     * 不生成文档的接口路径
     */
    private static final List<String> DEFAULT_EXCLUDE_PATH = Arrays.asList("/error", "/actuator/**");

    @Bean
    public Docket openApi(Environment environment) {
        // 不在生产中使用
        Profiles profiles = Profiles.of("dev", "test");
        boolean enabled = environment.acceptsProfiles(profiles);

        // openapi 规范 3.0
        Docket docket = new Docket(DocumentationType.OAS_30)
                .enable(enabled)
                .groupName("ZeusBoot")
                .apiInfo(apiInfo())
                // 设置全局请求参数
                .globalRequestParameters(getGlobalRequestParameters());

        // 更细粒度的构造器
        ApiSelectorBuilder selectorBuilder = docket.select();
        // 设置为添加了 @ApiOperation 注解的接口生成文档
        selectorBuilder.apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class));
        // 配置不生成文档的路径
        DEFAULT_EXCLUDE_PATH.forEach(path -> selectorBuilder.paths(PathSelectors.ant(path).negate()));
        selectorBuilder.build();

        // 如果需要使用 knife4j 增强的话，需要使用 extensions() 方法
        return docket;
    }

    private List<RequestParameter> getGlobalRequestParameters() {
        List<RequestParameter> parameters = new ArrayList<>();
        parameters.add(new RequestParameterBuilder()
                .name("token")
                .description("用户 token")
                .in(ParameterType.HEADER)
                .query(q -> q.model(m -> m.scalarModel(ScalarType.STRING)))
                .required(false)
                .build());
        return parameters;
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("ZeusBoot Api Documentation")
                .description("ZeusBoot Api Documentation")
                .contact(new Contact("AlexChen", "https://blog.alexchen.tech", "alexchen.tech@gmail.com"))
                .version("1.0")
                .build();
    }
}
```

### 接口层面添加 Swagger 注解

Swagger 注解见[官方文档](https://github.com/swagger-api/swagger-core/wiki/Annotations)

```java
@ApiOperation("添加用户")
@PostMapping("add")
@ApiImplicitParam(name = "userParam", type = "body", dataTypeClass = UserParam.class, required = true)
public ResponseEntity<String> add(@RequestBody UserParam userParam) {
    return ResponseEntity.ok("success");
}
```

### 访问 Swagger 页面

使用以下链接打开 Swagger，域名和端口视情况修改：

[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

## SpringBoot 使用 knife4j

### 单纯使用其 UI

#### 引入 `Pom` 依赖

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-ui</artifactId>
    <version>3.0.3</version>
</dependency>
```

#### 打开 knife4j 页面

[http://localhost:8080/doc.html](http://localhost:8080/doc.html)

### 使用 knife4j 的增强功能

#### 引入 `Pom` 依赖

```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
```

如果开发者使用的是Knife4j 2.x版本，并且Spring Boot版本高于2.4,那么需要在Spring Boot的yml文件中做如下配置：

```yaml
spring:
    mvc:
        pathmatch:
            # 配置策略
            matching-strategy: ant-path-matcher
```

#### SpringBoot yaml 配置示例

```yaml
knife4j:
  enable: true
  documents:
    - 
      group: 2.X版本
      name: 接口签名
      locations: classpath:sign/*
  setting:
    language: zh-CN
    enableSwaggerModels: true
    enableDocumentManage: true
    swaggerModelName: 实体类列表
    enableVersion: false
    enableReloadCacheParameter: false
    enableAfterScript: true
    enableFilterMultipartApiMethodType: POST
    enableFilterMultipartApis: false
    enableRequestCache: true
    enableHost: false
    enableHostText: 192.168.0.193:8000
    enableHomeCustom: true
    homeCustomLocation: classpath:markdown/home.md
    enableSearch: false
    enableFooter: false
    enableFooterCustom: true
    footerCustomContent: Apache License 2.0 | Copyright  2019-[浙江八一菜刀股份有限公司](https://gitee.com/xiaoym/knife4j)
    enableDynamicParameter: false
    enableDebug: true
    enableOpenApi: false
    enableGroup: true
  cors: false
  production: false
  basic:
    enable: false
    username: test
    password: 12313
```

#### 自定义 Swagger 配置

在 Swagger 配置的基础上，需要多注入 `OpenApiExtensionResolver`，并通过 `docket.extensions()` 方法注入扩展，扩展由 knife4j 自动配置类提供。

如果提示无法注入 `OpenApiExtensionResolver`，可以通过增加 `@EnableKnife4j` 引入，在 2.0.6 版本后,只需要在配置文件中配置`knife4j.enable=true`即可不在使用注解。

```java
@EnableKnife4j
@Configuration
@EnableOpenApi
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class OpenApiConfig {

    /**
     * open api extension by knife4j.
     */
    private final OpenApiExtensionResolver openApiExtensionResolver;

    @Autowired
    public OpenApiConfig(OpenApiExtensionResolver openApiExtensionResolver) {
        this.openApiExtensionResolver = openApiExtensionResolver;
    }

	@Bean
    public Docket openApi() {
        return new Docket(DocumentationType.OAS_30)
                .groupName("defaultGroup")
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .paths(PathSelectors.any())
                .build()
             .extensions(openApiExtensionResolver.buildExtensions(groupName))
                .extensions(openApiExtensionResolver.buildSettingExtensions());
    }
    
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            // .other()
            .build();
    }
}
```

#### 打开 knife4j 页面

在接口中使用 Swagger 注解，添加文档注释后，使用下面链接打开 knife4j，域名和端口视情况修改：

[http://localhost:8080/doc.html](http://localhost:8080/doc.html)

---

## 参考资料

- [Springfox](https://github.com/springfox/springfox)

- [knife4j](https://doc.xiaominfo.com/docs/quick-start)

- [Java 全栈知识体系](https://pdai.tech/md/spring/springboot/springboot-x-interface-doc.html)
