---
title: Source Map
date: 2023-04-12
---

## 什么是 Source Map？

**source-map 的基本原理**，在编译处理的过程中，在生成产物代码的同时生成产物代码中被转换的部分与源代码中相应部分的映射关系表。

通过 Chrome 控制台中的"Enable Javascript source map"来实现调试时的显示与定位源代码功能。

对于同一个源文件，根据不同的目标，可以生成不同效果的 source map，在构建速度、质量 (反解代码与源代码的接近程度以及调试时行号列号等辅助信息的对应情况)、访问方式 (在产物文件中或是单独生成 source map 文件) 和文大小等方面各不相同。

对于 source map 功能的期望不同：

- 在开发环境中，通常关注的是构建速度快，质量高，以便于提升开发效率

- 在生产环境中，通常更关注是否需要提供线上 source map；生成的文件大小和访问方式是否会对页面性能造成影响等，其次才是质量和构建速度

## Source Map 名称关键字

- false:不开启 source map 功能，其他不符合上述规则的赋值也等价于 false

- eval: 在编译器中使用 EvalDevToolModulePlugin 作为 sourcemap 的处理插件

- [xxx-...]source-map: 根据 devtool 对应值中是否有 eval 关键字来决定使用
EvalSourceMapDevToolPlugin 或 SourceMapDevToolPlugin 作为 sourcemap 的处理插件其余关键字则决定传入到插件的相关字段赋值

- inline: 决定是否传入插件的 filename 参数，作用是决定单独生成 source map 文件还是在行内显示
  该参数在 eval- 参数存在时无效

- hidden: 决定传入插件 append 的赋值，作用是判断是否添加 SourceMappingURL 的注释该参数在 eval- 参数存在时无效

- module: 为 true 时传入插件的 module 为 true，作用是为加载器 (Loaders) 生成 source map

- cheap:当 module 为 false 时，它决定插件 module 参数的最终取值，最终取值与 cheap 相反，决定插件 columns 参数的取值，作用是决定生成的 source map 中是否包含列信息，在不包含列信息的情况下，调试时只能定位到指定代码所在的行

- noSource: 决定插件中 noSource 变量的取值，作用是决定生成的 source map 中是否包含源代码信息
  nosource:不包含源码情况下只能显示调用堆栈信息

## 开发环境下 Source Map 推荐预设

- 开发环境首选哪一种预设取决于 sourcemap 对于我们的帮助程度

- 如果对项目代码了如指掌，可以关闭 devtool 或使用 eval 来获得最快构建速度

- 如果在调试时，需要通过 source map 来快速定位到源代码，优先考虑使用 eval-cheap-modulesource-map，它的质量与初次/再次构建速度都属于次优级

- 根据对质量要求更高或是对速度要求更高的不同情况可以分别考虑使用 eval-source-map 或 eval-cheap-source-map

## 几种工具和脚手架中的默认预设

- webpack 配置中，默认值 eval，模块代码后多了 sourceURL 以帮助定位模块的文件名称

- create-react-app 中
  生产环境下，根据 shouldUseSourceMap 参数决定使用“source-map’或 false
  开发环境下，使用 cheap-module-source-map’(不包含列信息的源代码，但更快)

- vue-cli-service 中，与 creat-react-app 中相同
