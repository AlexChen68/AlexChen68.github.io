---
title: Swagger3 注解
category: 开发工具
date: 2023-07-17
---

## 基本信息注解

### @OpenAPIDefinition

- 描述：用于定义整个 API 文档的基本信息。
- 可用于：类、接口。
- 属性：
   - `info`：指定 @Info 注解的对象，用于描述 API 文档的基本信息。

### @Info

- 描述：用于定义 API 文档的基本信息。
- 可用于：类、接口。
- 属性：
   - `title`：API 的标题。
   - `description`：API 的描述。
   - `version`：API 的版本号。
   - `termsOfService`：服务条款的 URL。
   - `contact`：指定 @Contact 注解的对象，用于描述联系人信息。
   - `license`：指定 @License 注解的对象，用于描述许可证信息。

### @Contact

- 描述：用于定义 API 文档中的联系人信息。
- 可用于：类、接口。
- 属性：
   - `name`：联系人的名称。
   - `url`：联系人的网址。
   - `email`：联系人的电子邮件地址。

### @License

- 描述：用于定义 API 文档中的许可证信息。
- 可用于：类、接口。
- 属性：
   - `name`：许可证的名称。
   - `url`：许可证的网址。

## 分组注解

### @Tag

- 描述：用于给 API 分组，用途类似于为 API 文档添加标签。
- 可用于：方法、类、接口。
- 属性：
   - `name`：分组的名称。

## 请求方法注解

以下注解用于描述 API 的请求方法：

### @Operation

- 描述：用于描述 API 的操作。
- 可用于：方法。
- 属性：
  - `summary`：操作的摘要信息。
  - `description`：操作的详细描述。
  - `tags`：指定 `@Tag` 注解的对象数组，用于将操作归类到特定的分组。
  - `parameters`：指定 `@Parameter` 注解的对象数组，用于描述操作的输入参数。
  - `responses`：指定 `@ApiResponse` 注解的对象数组，用于描述操作的响应结果。
  - `requestBody`：指定 `@RequestBody` 注解的对象，用于描述操作的请求体。

### @Parameter

- 描述：用于描述操作的输入参数。
- 可用于：方法。
- 属性：
  - `name`：参数的名称。
  - `in`：参数的位置，可以是 `path`、`query`、`header`、`cookie` 中的一种。
  - `description`：参数的描述。
  - `required`：参数是否必需，默认为 `false`。
  - `schema`：指定 `@Schema` 注解的对象，用于描述参数的数据类型。

### @RequestBody

- 描述：用于描述操作的请求体。
- 可用于：方法。
- 属性：
  - `required`：请求体是否必需，默认为 `false`。
  - `content`：指定 `@Content` 注解的对象数组，用于描述请求体的内容。

### @ApiResponse

- 描述：用于描述操作的响应结果。
- 可用于：方法。
- 属性：
  - `responseCode`：响应的状态码。
  - `description`：响应的描述。
  - `content`：指定 `@Content` 注解的对象数组，用于描述响应的内容。

### @Content

- 描述：用于描述请求体或响应的内容。
- 可用于：方法。
- 属性：
  - `mediaType`：内容的媒体类型。
  - `schema`：指定 `@Schema` 注解的对象，用于描述内容的数据类型。

### @Schema

- 描述：用于描述数据模型的属性。
- 可用于：方法、类、接口。
- 属性：
  - `title`：数据模型的标题。
  - `description`：数据模型的描述。
  - `type`：数据模型的类型。
  - `format`：数据模型的格式。

## 路径注解

以下注解用于描述 API 的路径：

### @Path

- 描述：用于定义路径参数。
- 可用于：方法。
- 属性：
  - `value`：路径参数的名称。

### @PathVariable

- 描述：用于描述路径参数。
- 可用于：方法的参数。
- 属性：
  - `value`：路径参数的名称。

### @RequestParam

- 描述：用于描述查询参数。
- 可用于：方法的参数。
- 属性：
  - `value`：查询参数的名称。
  - `required`：查询参数是否必需，默认为 `false`。
