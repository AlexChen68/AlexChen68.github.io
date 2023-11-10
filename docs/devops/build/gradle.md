---
title: Gradle 入门教程
date: 2023-11-10
order: 2
---

# Gradle 入门教程

## 什么是 Gradle？

Gradle 是一个基于 Apache Ant 和 Apache Maven 概念的项目自动化构建开源工具。它使用一种基于 Groovy 的特定领域语言 (DSL) 来声明项目设置，也增加了基于 Kotlin 语言的 kotlin-based DSL，抛弃了基于 XML 的各种繁琐配置。

1. gradle 类似于 maven，是一个集项目 jar 包管理、依赖管理、项目打包等操作为一体的工具。
2. gradle 不同于 maven 的地方在于，取消 maven 笨重的 xml 配置，以独特简便的 groovy 语言代替大量繁琐的 xml 配置项。
3. 拥有自己脚本语言的 gradle 更加灵活，我们可以在项目构建的时候通过 groovy 语言，去灵活的创建任务，依据自己的需求对项目进行构建，相比于 maven 来说，使用 groovy 进行构建的 gradle，扩展性和灵活性更高。

## 下载 Gradle

下载地址：https://groovy.apache.org/download.html