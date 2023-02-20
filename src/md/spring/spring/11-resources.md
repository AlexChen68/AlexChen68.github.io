---
title: Spring 资源(Resources)
article: true
date: 2022-10-09
tag: [Spring]
category: Spring
isOriginal: true
description: Spring 资源(Resources)
---

## 简介

遗憾的是,Java 的标准 `java.net.URL` 类和各种 URL 前缀的标准处理程序不足以完全访问底层资源。 例如,没有标准化的 `URL` 实现可用于访问需要从类路径或相对于 `ServletContext` 获取的资源。 虽然可以为专用 `URL` 前缀注册新的处理程序(类似于 `http:`)这样的前缀的现有处理程序,但这通常非常复杂,并且 `URL` 接口仍然缺少一些理想的功能,例如检查当前资源是否存在的方法。

## `Resource` 接口

位于 `org.springframework.core.io.` 包中的 Spring `Resource` 接口的目标是成为一个更强大的接口，用于抽象对底层资源的访问。

以下清单显示了 `Resource` 接口定义,见 [`Resource`](https://docs.spring.io/spring-framework/docs/5.3.21/javadoc-api/org/springframework/core/io/Resource.html) Javadoc 了解更多详细信息：

```java
public interface Resource extends InputStreamSource {

    boolean exists();

    boolean isReadable();

    boolean isOpen();

    boolean isFile();

    URL getURL() throws IOException;

    URI getURI() throws IOException;

    File getFile() throws IOException;

    ReadableByteChannel readableChannel() throws IOException;

    long contentLength() throws IOException;

    long lastModified() throws IOException;

    Resource createRelative(String relativePath) throws IOException;

    String getFilename();

    String getDescription();
}

public interface InputStreamSource {

    InputStream getInputStream() throws IOException;
}
```

Resource 接口中一些最重要的方法是:

- getInputStream(): 用于定位和打开当前资源，返回当前资源的 InputStream，预计每一次调用都会返回一个新的 InputStream。 因此调用者必须自行关闭当前的输出流。
- exists(): 返回 boolean 值，表示当前资源是否存在。
- isOpen():返回 boolean 值，表示当前资源是否有已打开的输入流。 如果为 true，那么 InputStream 不能被多次读取 ，只能在一次读取后即关闭以防止内存泄漏。 除了 InputStreamResource 外，其他常用 Resource 实现都会返回 false。
- getDescription(): 返回当前资源的描述，当处理资源出错时，资源的描述会用于输出错误的信息。 一般来说，资源的描述是一个完全限定的文件名称，或者是当前资源的真实 URL。

## 内置 Resource 实现

- urlresource
- classpathresource
- filesystemresource
- PathResource
- servletcontextresource
- inputstreamresource
- bytearrayresource

## ResourceLoader

ResourceLoader 接口用于加载 Resource 对象，换句话说，就是当一个对象需要获取 Resource 实例时，可以选择实现 ResourceLoader 接口，以下清单显示了 ResourceLoader 接口定义：

```java
public interface ResourceLoader {

    Resource getResource(String location);

    ClassLoader getClassLoader();
}
```

所有 `ApplicationContext` 都实现 `ResourceLoader` 接口。因此,可以使用所有 `ApplicationContext` 来获取 Resource 实例。

不同的 ApplicationContext 返回不同的 Resource 实现，例如：针对 ClassPathXmlApplicationContext，`getResource("/somepath")`返回 ClassPathResource 对象；

可以通过指定特殊的 `classpath:` 前缀来强制使用 ClassPathResource，其他的类似。

## ResourcePatternResolver 接口

ResourcePatternResolver 接口是对 ResourceLoader 接口的扩展。它定义了一种解决位置模式的策略 (例如， Ant 样式的路径模式) 转换为 Resource 对象。

```java
public interface ResourcePatternResolver extends ResourceLoader {

    String CLASSPATH_ALL_URL_PREFIX = "classpath*:";

    Resource[] getResources(String locationPattern) throws IOException;
}
```

## ResourceLoaderAware 接口

ResourceLoaderAware 是一个特殊的标识接口，用来提供 ResourceLoader 引用的对象.。以下清单显示了 ResourceLoaderAware 接口的定义：

```java
public interface ResourceLoaderAware {

    void setResourceLoader(ResourceLoader resourceLoader);
}
```

实现了该接口的 Bean，可以通过 `setResourceLoader` 方法获取当前的 `ApplicationContext，因为` `ApplicationContext` 都实现了 `ResourceLoader` 接口。

实现 `ApplicationContextAware` 接口同样可以获取 ApplicationContext，从 ApplicationContext 获取 ResourceLoader，但是推荐使用专用接口。此外也可以通过自动装配获取。

