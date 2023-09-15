import{_ as e,o,c as a,Q as t}from"./chunks/framework.419948d5.js";const h=JSON.parse('{"title":"Node.js 简介","description":"","frontmatter":{"title":"Node.js 简介","article":false,"date":"2023-02-22T00:00:00.000Z"},"headers":[],"relativePath":"frontend/node/index.md","filePath":"frontend/node/index.md","lastUpdated":1694772353000}'),d={name:"frontend/node/index.md"},s=t('<h2 id="node-js-简介" tabindex="-1">Node.js 简介 <a class="header-anchor" href="#node-js-简介" aria-label="Permalink to &quot;Node.js 简介&quot;">​</a></h2><p>Node.js 是一个开源和跨平台的 JavaScript 运行时环境。它几乎是任何类型项目的流行工具！</p><p>Node.js 在浏览器之外运行 V8 JavaScript 引擎（Google Chrome 的内核）。这使得 Node.js 的性能非常好。</p><p>Node.js 应用程序在单个进程中运行，无需为每个请求创建新的线程。Node.js 在其标准库中提供了一组异步的 I/O 原语，以防止 JavaScript 代码阻塞，通常，Node.js 中的库是使用非阻塞范式编写的，使得阻塞行为成为异常而不是常态。</p><p>当 Node.js 执行 I/O 操作时（比如从网络读取、访问数据库或文件系统），Node.js 将在响应返回时恢复操作（而不是阻塞线程和浪费 CPU 周期等待）。</p><p>这允许 Node.js 使用单个服务器处理数千个并发连接，而不会引入管理线程并发（这可能是错误的重要来源）的负担。</p><p>Node.js 具有独特的优势，因为数百万为浏览器编写 JavaScript 的前端开发者现在无需学习完全不同的语言，就可以编写除客户端代码之外的服务器端代码。</p><p>在 Node.js 中，可以毫无问题地使用新的 ECMAScript 标准，因为你不必等待所有用户更新他们的浏览器，你负责通过更改 Node.js 版本来决定使用哪个 ECMAScript 版本，你还可以通过运行带有标志的 Node.js 来启用特定的实验性功能。</p><h2 id="node-js-相关链接" tabindex="-1">Node.js 相关链接 <a class="header-anchor" href="#node-js-相关链接" aria-label="Permalink to &quot;Node.js 相关链接&quot;">​</a></h2><ul><li><a href="https://nodejs.org/zh-cn/" target="_blank" rel="noreferrer">Node.js 官网</a></li></ul>',10),r=[s];function n(i,p,c,l,_,j){return o(),a("div",null,r)}const f=e(d,[["render",n]]);export{h as __pageData,f as default};
