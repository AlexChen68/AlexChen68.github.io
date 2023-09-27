---
title: 浏览器热更新
date: 2023-04-12
---

## 什么是浏览器的热更新

浏览器的热更新，指的是:
在本地开发的同时打开浏览器进行预览，当代码文件发生变化时，浏览器自动更新页面内容的技术
自动更新，表现上分为：

- 自动刷新整个页面
- 页面整体无刷新而只更新页面的部分内容

## webpack 中的热更新配置

四种更新模式：

- 一切依赖手动

- Watch 模式

- Live Reload

  在开发调试过程中会在网页中进行一些操作：

  例如输入了一些表单数据想要调试错误提示的样式、打开了一个弹窗想要调试其中按钮的位置，切换回编辑	器，修改样式文件进行保存，网页刷新后回到了初始化的状态，不得不再次重复操作才能确认改动后的效果。

- 模块热替换 (Hot Module Replacement)

![webpack 中的热更新原理](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/frontend/webpack热更新原理.png)

## webpack 中的打包流程

- `module`: 指在模块化编程中我们把应用程序分割成的独立功能的代码模块
- `chunk`: 指模块间按照引用关系组合成的代码块，一个 chunk 中可以包含多个 module
- `chunk group`: 指通过配置入口点 (entry point) 区分的块组，一个 chunk group 中可包含一到多个 chunk
- `bundling`: webpack 打包的过程
- `asset/bundle`: 打包产物

![webpack 中的打包流程](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/frontend/webpack打包流程.png)
