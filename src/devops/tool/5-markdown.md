---
title: Markdown
icon: markdown
tag: Markdown
category: 开发工具
date: 2022-12-29
---

> 本文章转载自 [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable/#/markdown)。

## 简介

Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。

Markdown 编写的文档后缀为 .md, .markdown。

当前许多网站都广泛使用 Markdown 来撰写帮助文档或是用于论坛上发表消息。例如：GitHub、简书、reddit、Diaspora、Stack Exchange、OpenStreetMap、SourceForge 等。

其主要特性：
- 支持“标准”Markdown / CommonMark 和 Github 风格的语法，也可变身为代码编辑器；
- 支持实时预览、图片（跨域）上传、预格式文本/代码/表格插入、代码折叠、搜索替换、只读模式、自定义样式主题和多语言语法高亮等功能；
- 支持 ToC（Table of Contents）、Emoji 表情、Task lists、@链接等 Markdown 扩展语法；
- 支持 TeX 科学公式（基于 KaTeX）、流程图 Flowchart 和 时序图 Sequence Diagram;
- 支持识别和解析 HTML 标签，并且支持自定义过滤标签解析，具有可靠的安全性和几乎无限的扩展性；
- 支持 AMD / CMD 模块化加载（支持 Require.js & Sea.js），并且支持自定义扩展插件；
- 兼容主流的浏览器（IE8+）和 Zepto.js，且支持 iPad 等平板设备；
- 支持自定义主题样式；

## 常用语法

### 标题

<!-- tabs:start -->

#### **Rendered**

<!-- markdownlint-disable-next-line single-title -->
# Heading 1 {docsify-ignore}

text...

## Heading 2 {docsify-ignore}

This is the text under the title.

### Heading 3 {docsify-ignore}

text...

#### Heading 4 {docsify-ignore}

text...

##### Heading 5 {docsify-ignore}

text...

###### Heading 6 {docsify-ignore}

text...

#### **Markdown**

```markdown
# Heading 1

text...

## Heading 2

text...

### Heading 3

text...

#### Heading 4

text...

##### Heading 5

text...

###### Heading 6

text...
```

<!-- tabs:end -->

### 文本

<!-- tabs:start -->

#### **Rendered**

Body text

**Bold text**

*Italic text*

~~Strikethrough~~

<mark>Marked text</mark>

<pre>Preformatted text</pre>

<small>Small Text</small>

This is <sub>subscript</sub>

This is <sup>superscript</sup>

#### **Markdown**

```markdown
Body text

**Bold text**

*Italic text*

~~Strikethrough~~

<mark>Marked text</mark>

<pre>Preformatted text</pre>

<small>Small Text</small>

This is <sub>subscript</sub>

This is <sup>superscript</sup>
```

<!-- tabs:end -->

### 链接

<!-- tabs:start -->

#### **Rendered**
<https://www.baidu.com>

[Inline link](https://baidu.com)

[Inline link with title](https://baidu.com "百度")

[Reference link by name][link1]

[Reference link by number][1]

[Reference link by self]

[link1]: https://baidu1.com
[1]: https://baidu2.com
[Reference link by self]: https://baidu3.com

#### **Markdown**

```markdown
<https://www.baidu.com>

[Inline link](https://baidu.com)

[Inline link with title](https://baidu.com "百度")

[Reference link by name][link1]

[Reference link by number][1]

[Reference link by self]

[link1]: https://baidu.com
[1]: https://baidu.com
[Reference link by self]: https://baidu.com
```

<!-- tabs:end -->

### 列表

<!-- tabs:start -->

#### **Rendered**

**有序列表**

1. Ordered 1
1. Ordered 2
    1. Ordered 2a
    1. Ordered 2b
    1. Ordered 2c
1. Ordered 3

**无序列表**

- Unordered 1
- Unordered 2
    - Unordered 2a
    - Unordered 2b
    - Unordered 2c
- Unordered 3

**任务列表**

- [x] Task 1
- [ ] Task 2
    - [x] Subtask A
    - [ ] Subtask B
- [ ] Task 3

#### **Markdown**

```markdown
**有序列表**

1. Ordered 1
1. Ordered 2
   1. Ordered 2a
   1. Ordered 2b
   1. Ordered 2c
1. Ordered 3

**无序列表**

- Unordered 1
- Unordered 2
  - Unordered 2a
  - Unordered 2b
  - Unordered 2c
- Unordered 3

**任务列表**

- [x] Task 1
- [ ] Task 2
  - [x] Subtask A
  - [ ] Subtask B
- [ ] Task 3
```

<!-- tabs:end -->

### 引用

<!-- tabs:start -->

#### **Rendered**

> This is a quote
>
> *- Quote Source*
#### **Markdown**

```markdown
> This is a quote
>
> *- Quote Source*
```
<!-- tabs:end -->

### 代码块

<!-- tabs:start -->

#### **Rendered**

This is `inline code`
```javascript
const add   = (num1, num2) => num1 + num2;
const total = add(1, 2);
console.log(total); // 3
```
```html
<body>
    <p>Hello</p>
</body>
```

#### **Markdown**

````markdown
This is `inline code`

```javascript
const add   = (num1, num2) => num1 + num2;
const total = add(1, 2);
console.log(total); // 3
```

```html
<body>
    <p>Hello</p>
</body>
```
````

<!-- tabs:end -->

### 通知

<!-- tabs:start -->

#### **Rendered**

!> 这是一段警告通知

?> 这是一段提示通知

#### **Markdown**

```markdown

!> 这是一段警告通知

?> 这是一段提示通知
```
<!-- tabs:end -->

### 选项卡

选项卡由插件[docsify-tabs](https://jhildenbiddle.github.io/docsify-tabs)提供


<!-- tabs:start -->

#### **English**

Hello!

#### **French**

Bonjour!

#### **Italian**

Ciao!

#### **Markdown**

```markdown
<!-- tabs:start -->

#### **English**

Hello!

#### **French**

Bonjour!

#### **Italian**

Ciao!

<!-- tabs:end -->
```

<!-- tabs:end -->

### 表格

<!-- tabs:start -->

#### **Rendered**

| Left Align | Center Align | Right Align | Non&#8209;Breaking&nbsp;Header |
| ---------- |:------------:| -----------:| ------------------------------ |
| A1         | A2           | A3          | A4                             |
| B1         | B2           | B3          | B4                             |
| C1         | C2           | C3          | C4                             |

#### **Markdown**

```markdown
| Left Align | Center Align | Right Align | Non&#8209;Breaking&nbsp;Header |
| ---------- |:------------:| -----------:| ------------------------------ |
| A1         | A2           | A3          | A4                             |
| B1         | B2           | B3          | B4                             |
| C1         | C2           | C3          | C4                             |
```

<!-- tabs:end -->

### 键盘

<!-- tabs:start -->

#### **Rendered**

<kbd>&uarr;</kbd> Arrow Up

<kbd>&darr;</kbd> Arrow Down

<kbd>&larr;</kbd> Arrow Left

<kbd>&rarr;</kbd> Arrow Right

<kbd>&#8682;</kbd> Caps Lock

<kbd>&#8984;</kbd> Command

<kbd>&#8963;</kbd> Control

<kbd>&#9003;</kbd> Delete

<kbd>&#8998;</kbd> Delete (Forward)

<kbd>&#8600;</kbd> End

<kbd>&#8996;</kbd> Enter

<kbd>&#9099;</kbd> Escape

<kbd>&#8598;</kbd> Home

<kbd>&#8670;</kbd> Page Up

<kbd>&#8671;</kbd> Page Down

<kbd>&#8997;</kbd> Option, Alt

<kbd>&#8629;</kbd> Return

<kbd>&#8679;</kbd> Shift

<kbd>&#9251;</kbd> Space

<kbd>&#8677;</kbd> Tab

<kbd>&#8676;</kbd> Tab + Shift

#### **Markdown**

```markdown
<kbd>&uarr;</kbd> Arrow Up

<kbd>&darr;</kbd> Arrow Down

<kbd>&larr;</kbd> Arrow Left

<kbd>&rarr;</kbd> Arrow Right

<kbd>&#8682;</kbd> Caps Lock

<kbd>&#8984;</kbd> Command

<kbd>&#8963;</kbd> Control

<kbd>&#9003;</kbd> Delete

<kbd>&#8998;</kbd> Delete (Forward)

<kbd>&#8600;</kbd> End

<kbd>&#8996;</kbd> Enter

<kbd>&#9099;</kbd> Escape

<kbd>&#8598;</kbd> Home

<kbd>&#8670;</kbd> Page Up

<kbd>&#8671;</kbd> Page Down

<kbd>&#8997;</kbd> Option, Alt

<kbd>&#8629;</kbd> Return

<kbd>&#8679;</kbd> Shift

<kbd>&#9251;</kbd> Space

<kbd>&#8677;</kbd> Tab

<kbd>&#8676;</kbd> Tab + Shift
```

<!-- tabs:end -->

### 水平分割线

<!-- tabs:start -->

#### **Rendered**

---

#### **Markdown**

```markdown
---
```

<!-- tabs:end -->

### 图片

<!-- tabs:start -->

#### **Rendered**

Inline-style

![alt text](//source.unsplash.com/daily "Provided by unsplash.com")

Reference-style

![alt text][logo]

[logo]: //source.unsplash.com/collection/881815 "Provided by unsplash.com"

#### **Markdown**

```markdown
**Inline**

![alt text](//source.unsplash.com/daily "Provided by unsplash.com")

**Reference**

![alt text][logo]

[logo]: //source.unsplash.com/collection/881815 "Provided by unsplash.com"
```

<!-- tabs:end -->