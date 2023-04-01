---
title: 玩转 VS Code
icon: vscode
tag: Visual Studio Code
category: 开发工具
isOriginal: true
date: 2022-09-30
---

## 配置代码模版

VsCode 可以通过 Snippets 配置代码模版，官方文档：[Snippets in Visual Studio Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

创建模板步骤：

1. 打开VSCode,按下快捷键组合 `shift+command+p` 呼出控制台
2. 输入 `Snippets: Configure User Snippets`,配置用户代码片段
3. 输入 `new`, 有两个选项，可以选择创建一个全局配置或者专为本项目使用的配置；
4. 然后会要求输入配置文件名称，按实际情况命名；
5. 编辑配置文件，示例配置如下：
```json
{
	"README": {
		"prefix": "readme",
		"body": [
			"---",
			"title: $1",
			"icon: blog",
			"index: false",
			"article: false",
			"date${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}",
			"description: $1",
			"---"
		],
		"description": "Vuepress 博客 README 模板"
	}
}
```

其中，`README` 为一份配置的名称，单个配置文件中，可以同时配置多份配置；
`description` 为该项配置的描述；
`prefix` 为快捷使用前缀，当你编写代码或者文件时，输入配置的前缀时，会自动提示你选择该配置，使用 `tab` 键选择后，会自动将 `body` 中的代码块补全出来；
`body` 中的 `$x` 表示光标的位置，当进行代码补全时，光标会按照 x 的顺序依次停留（使用 tab 切换至下个光标处），方便你在模板中填充需要的内容。

更多的配置，见官方文档：[Snippets in Visual Studio Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

:::info
如果使用 markdown 文件的模板发现没有提示，可能是 vscode 没有开启Markdown文件中的补全与匹配;

打开 `settings.json` 文件，在原来的基础上，增加如下 `markdown` 配置：

```json
 "[markdown]": {
      "editor.quickSuggestions": {
          "other": true,
          "comments": true,
          "strings": true
      },
      "editor.acceptSuggestionOnEnter": "on"
  },
```
:::