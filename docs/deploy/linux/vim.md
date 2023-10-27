---
title: Vim 常用命令
date: 2023-10-26
order: 11
---

# Vim 常用命令

## 简介

Vim 是一款功能强大的文本编辑器，是 Linux 下常用的编辑器之一，用它编辑文件，方便且快捷，能极大提高工作效率。

基本上 Vim 分为三种模式，分别是：**命令行模式（Command mode）、输入模式（Insert mode）和底线命令模式（Last line mode）。**

## 命令行模式

命令行模式也称为交互模式，这是 Vim 的默认模式，每次使用 Vim 命令编辑文件的时候，就会先进入这个模式。

```
vim text.txt
```

特征：

- 在这个模式下，你不能输入文本；
- 它可以让我们在文本间移动，删除一行文本，复制黏贴文本，跳转到指定行，撤销操作，等等。

### 常用命令

| 命令 | 作用 |
| --- |  --- |
| i | 切换到输入模式，以输入字符 |
| x | 删除当前光标所在处的字符 |
| X | 删除当前光标前一个字符 |
| : | 切换到底线命令模式，以在最底一行输入命令 |
| gg | 跳转到文件开头 |
| G | 跳转到文件末尾 |
| dd | 删除光标所在一整行数据，且临时存储到缓存区 |
| yy | 复制整行文本到临时缓存区 |
| p | 将指定缓存区内容放在光标位置之下；整行文本放在行下面，若是非整行文本则放在光标后面 |
| P | 将指定缓冲区的内容放到当前光标的位置之上；整行文本放在行下面，若是非整行文本则放在光标后面 |
| u | 撤销最近的修改，针对所有修改 |
| U | 撤销对当前行上做的所有修改 |
| r | 替换光标位置上的一个字符，但不会进入 insert 模式，先按 r 再按要替换成的字符，也可以 2r 把光标后面两个都替换掉 |
| R | 替换从光标位置开始的字符，同时改变 vim 到文本输入模式 |
| . | 重复上一次的修改 -- 注意该命令是英文符号点 |
| \>> | 向右移动本行一段距离 |
| << | 向左移动本行一段距离 |

### 翻页命令

| 命令 | 作用 |
| --- |  --- |
| Ctrl + d | 将光标向下翻半屏，通常每次翻屏 12 行 |
| Ctrl + u | 将光标向上翻半屏，通常每次翻屏 12 行 |
| Ctrl + f | 将光标向下翻满屏，通常每次翻屏 24 行 |
| Ctrl + b | 将光标向上翻满屏，通常每次翻屏 24 行 |

## 输入模式

是我们熟悉的文本编辑器的模式，就是可以输入任何你想输入的内容。

进入这个模式有几种方法，最常用的方法是按字母键 i（i、I、a、A、o、O）都可以进入插入模式，只是所处的位置不同），退出这种模式，只需要按下 Esc 键。

| 命令 | 作用 |
| --- |  --- |
| i | 在光标的左侧输入文本，光标右侧文本向右移动 |
| I | 在光标所在行的行首输入文本，相当于在行首执行了 i 命令 |
| a | 在光标的右侧输入文本 |
| A | 在光标所在行的尾部进行输入文本，相当于在光标行尾执行 a 命令 |
| o | 在光标所在行的下一行增添新的一行，光标停留在新行的行首 |
| O | 在光标所在行的上一行增添新的一行，光标停留在新行的行首 |

输入模式没什么可说的，就是进入编辑模式，可以自由编辑了。

## 底线命令模式

在命令模式下按 `:` (**注意是英文冒号**)，此时 vim 的窗口左下方会出现一个 `:` 符号，这时就已经进入了底线命令模式了。

注意：指令执行之后会把自动返回到命令行模式的

作用：底线命令模式可以对文件中指定的内容进行保存、替换、查询、删除等等操作。

### 常用命令

| 命令 | 作用 |
| --- |  --- |
| :q | 退出 vim 编辑器 |
| :q! | 不保存文件，直接退出 vim 编辑器 |
| :w | 只保存文件，但不退出 vim 编辑器 |
| :wq | 保存文件且退出 vim 编辑器 |
| ZZ | 保存文件且退出 vim 编辑器 |
| :start,endd | 从第 start 行开始到 end 行进行删除操作 最后一个 d 表示删除，如 :3,4d |
| :%d | 清空文件内容 (跳到行首 dG 执行也可删除) |
| :! command | 暂时离开 vim 编辑器去到指令模式下执行 command 命令显示结果，如 :!ls |
| :/string | 从文件首部开始查找到尾部；按 n 键可以跳到下一个，N 上一个，另外按 / 键后，按上下键可以找到以前查找的记录，同样的也有记录 |
| :?string | 同上，从当前光标向文件首部查找 |
| :%s/word1/word2/g | 从文件首到尾替换每一行的 word1 为 word2 |
| :set nu | 显示行号 也可以输入 set number |
| :set nonu | 取消行号 |
| :set ai/noai | 开启/关闭自动缩进 |