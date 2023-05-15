---
title: NPM 包管理器
category: Node.js
date: 2023-05-14
---

## 什么是 npm 包管理器？

NPM 全称 Node Package Manager，是 Node.js 包管理工具，是全球最大的模块生态系统，里面所有的模块都是开源免费的；也是 Node.js 的包管理工具，相当于后端开发中的 Maven。

官方网站：https://www.npmjs.com/

NPM 有两个主要的功能：

1. 快速构建 nodejs 工程；
2. 快速安装和依赖第三方模块。

## npm 的使用

### npm init 初始化命令

```bash
npm init [--force|-f|--yes|-y|--scope]
npm init <@scope> (same as `npx <@scope>/create`)
npm init [<@scope>/]<name> (same as `npx [<@scope>/]create-<name>`)
```

使用上述命令，可以初始化前端工程，并创建一个名为 `package.json` 的文件，这个文件包含了工程的描述信息和依赖信息等等。

例如，初始化一个空工程：

```bash
npm init -y
```

上面的命令会在执行命令的文件夹下，直接一个创建 `package.json` 文件。

:::tip
`npm init` 还要一个别名：`npm create`，也就是说 `npm create` 等效于 `npm init`
:::

### cli 脚手架

使用 `npm init -y` 可以初始化一个前端工程，但是仅仅包含了一个基本 `package.json` 文件，没有其他的目录结构，`package.json` 中也没有其他的依赖，这对于我们正常开发而言，需要自己一个个都添加需要的依赖。

因此，一些框架提供了创建相应技术栈的脚手架工程，可以作为参数在 `npm init` 命令中使用，来创建符合实际应用开发的前端工程结构，并将相关的依赖都添加到工程中。

这些脚手架工程常常被命名为 `create-xxx`，或者 `xxx-cli`。

例如，使用 Vite 提供的模板来创建一个 Vue 工程：

```bash
npm create vite@latest
```

上述命令会做如下的事情：

1. 如果你本地没有安装 `create-vite`，它会先提示你安装它，输入 y 即可安装。
2. 使用 `create-vite` 模板创建一个工程，期间会通过命令行询问你一些参数，比如工程名、JS 框架等等；

创建后的工程目录如下：

![工程结构.png](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/frontend/npm创建vite工程-工程结构.png)

### npm install 安装依赖

完整的命令列表：

```bash
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>

alias: npm i
common options: [-P|--save-prod|-D|--save-dev|-O|--save-optional] [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]
```

下面介绍几种常用用法和参数。

#### 基本用法

```bash
npm install <name>@<version>
```
`npm install <name>@<version>` 命令用来从 npm 仓库下载依赖包到项目的 `\node_modules` 文件夹下；如果使用 `-g` 参数表示全局下载，会下载到 node 安装目录的 `\node_modules` 文件夹下。

常用的使用情况有三种：

1. 直接使用 `npm install <name>@<version>` 命令安装依赖会自动在项目目录下添加 `package-lock.json` 文件，这个文件帮助锁定安装包的版本。同时 `package.json` 文件中，依赖包会被添加到 `dependencies` 节点下，类似 maven 中的 <dependencies>

```bash
npm install mysql@1.0.0
```

2. 如果不添加 `version` 参数，默认安装最新版本。

```bash
npm install mysql
```

3. 如果不指定依赖名称，则会读取 `package.json` 文件的依赖项，安装整个项目的依赖。

```bash
npm install
```

更多命令使用情况可以参见 [官方文档 - 中文版](https://www.npmjs.cn/cli/install/)

#### 常用参数

`npm install` 命令还有几个常用的参数：

- `--save-prod/-P` 

使用该命令后，会在 `package.json` 的 `dependencies` 中出现，是生产环境依赖；该命令是默认命令。

```bash
npm install react
// 等同于
npm install --save-prod react
// 等同于
npm install -P react
// 等同于
npm install --save react
```

- `--save-dev/-D`

使用该命令后，依赖包会出现在 `package.json` 的 `devDependencies` 中；

表示开发环境依赖。

```bash
npm install --save-dev webpack
// 等同于
npm install -D webpack
```

- `-g/--global`

全局安装依赖；可以直接在命令行中使用。

```bash
npm install vue -g
```

- `--no-save`

防止保存到 `dependencies`。

```bash
npm install mysql --no-save
```


### npm update 更新依赖

```bash
npm update [-g] [<pkg>...]
```

此命令会将列出的所有包更新为最新版本（由 `tag` 配置指定）;它还将安装缺少的软件包。

`dependencies` 的依赖项版本号前面，常常会有 `^` 或 `~` 修饰，在使用 `npm udpate` 命令更新时，这两者是有区别的：

- `^` 修饰的依赖会更新到最新的大版本，例如：`^1.1.1` 可以更新到 `^2.0.0`；
- `~` 修饰的依赖只能更新到该大版本下的最新版本，例如：`~1.2.3` 只能更新到 `~1.4.0`，而不能更新到 `~2.0.0`，最前面的大版本 `1` 不能变更。

### npm uninstall 卸载依赖

```bash
npm uninstall [<@scope>/]<pkg>[@<version>]... [-S|--save|-D|--save-dev|-O|--save-optional|--no-save]
```

`npm uninstall` 与 `npm install` 相对应，参数也与其一致。

## 参考资料

- [npm 中文文档](https://www.npmjs.cn/)