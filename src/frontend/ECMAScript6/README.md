---
title: ECMAScript 6 简介
index: false
article: false
date: 2023-01-03
---

## ES 6 简介

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了 ES6 的第一个版本，正式名称就是《ECMAScript 2015 标准》（简称 ES2015）。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

## Babel 转码器

目前，绝大部分浏览器已经支持 ES6，如果你需要在不支持 ES6 的浏览器上支持 ES6，可以使用 Babel 转换器；

Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。下面是一个例子。

```javascript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```

上面的原始代码用了箭头函数，Babel 将其转为普通函数，就能在不支持箭头函数的 JavaScript 环境执行了。

更多 Babel 转换器的使用，见其[官方文档](https://babel.docschina.org/docs/en/)