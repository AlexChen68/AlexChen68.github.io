---
title: 前端脚手架
date: 2023-04-12
---

## 前端开发流程问题

当你准备开发一个新项目时，在进入到实际业务编码前，会遇到的问题：

- 准备好一个项目的基础开发设施，需要投入大量时间和精力；
- 较短时间内配置一个技术栈完整、辅助功能丰富、兼顾不同环境下构建优化目标的项目基础代码需要开发人员在工程领域长久的知识储备与实践总结；
- 不同的项目需求和团队情况，需要根据不同的现状使用不同的基础设施。

## 前端脚手架

在软件开发领域，脚手架指通过各种工具来生成项目基础代码的技术；代码中通常包含项目开发流程中所需的工作目录内的通用基础设施。

**脚手架的优势**

- 利用脚手架工具，可以经过几个简单的选项快速生成项目的基础代码
- 使用脚手架工具生成的项目模板通常是经过经验丰富的开发者提炼和检验的
- 脚手架工具支持使用自定义模板，可以根据项目中的实际经验总结、定制一个脚手架模板

**进入开发需要做的准备**

1. 需要有 package.json，它是 npm 依赖管理体系下的基础配置文件
2. 然择使用 npm 或 Yarn 作为包管理器
3. 确定项目技术栈，在明确选择后安装相关依赖包并在 src 目录中建立入口源码文件
4. 选择构建工具，主流选择是 webpack (除非项目已先锋性地考虑尝试 nobundle 方案)，对应项目里需要增加相关的 webpack 配置文件，可以考虑针对开发/生产环境使用不同配置文件
5. 打通构建流程，安装与配置各种 Loader、插件和其他配置项
6. 优化构建流程，针对开发/生产环境的不同特点进行各自优化
7. 选择和调试辅助工具，例如代码检查工具和单元测试工具，安装相应依赖并调试配置文件
8. 检查各主要环节的脚本是否工作正常，编写说明文档 README.md，不需要纳入版本管理的文件目录记入.gitignore 等

使用脚手架，可以快速地构建上述的步骤。

## 常见的脚手架

- Yeoman 代表一般开源工具的理念
它专注于实现脚手架生成器的逻辑和提供展示第三方生成器，主要目标群体是生成器的开发者。

- CRA 代表面向某一技术栈降低开发复杂度的理念
它提供一个包含各开发工具的集成工具集和标准化的开发 - 构建 - 测试三步流程脚本。

- Vue CLI 代表更灵活折中的理念
  - 继承了 CRA 降低配置复杂度的优点；
  - 在创建项目的过程中提供更多交互式选项来配置技术栈的细节，允许在项目中使用自定义配置。

## 如何定制一个脚手架模板

对通过这些脚手架创建的模板项目进行定制化，例如：

1. 为项目引入新的通用特性
2. 针对构建环节的 webpack 配置优化，来提升开发环境的效率和生产环境的性能等
3. 定制符合团队内部规范的代码检测规则配置
4. 定制单元测试等辅助工具模块的配置项
5. 定制符合团队内部规范的目录结构与通用业务模块，例如业务组件库、辅助工具类、页面模板等

通过将实际项目开发中所需要做的定制化修改输出为标准的脚手架模板

- 最大程度减少大家在开发中处理重复事务的时间
- 减少因为开发风格不一导致的团队内项目维护成本的增加

## 参考资料

- [前端工程化精讲](https://www.bilibili.com/video/BV1mL411d76B?p=2&vd_source=22bbf859a1c6c3f6f0e747066bf28f13)