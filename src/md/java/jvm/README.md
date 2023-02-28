---
title: Java 虚拟机概述
article: true
date: 2022-09-30
tag: JVM
category: Java 并发
isOriginal: true
description: Java 虚拟机概述
---

## JVM 简介

### 什么是 JVM？

**Java 虚拟机**（英语： Java Virtual Machine，缩写为 JVM），一种能够执行 [Java bytecode](https://zh.wikipedia.org/wiki/Java_bytecode) 的 [虚拟机](https://zh.wikipedia.org/wiki/虛擬機器)，以[堆栈结构机器](https://zh.wikipedia.org/wiki/堆疊結構機器)来进行实做。最早由 [Sun 微系统](https://zh.wikipedia.org/wiki/昇陽電腦)所研发并实现第一个实现版本，是 [Java 平台](https://zh.wikipedia.org/wiki/Java平臺)的一部分，能够执行以 [Java](https://zh.wikipedia.org/wiki/Java) 语言写作的 [软件](https://zh.wikipedia.org/wiki/軟體)[程序](https://zh.wikipedia.org/wiki/程式)。

Java 虚拟机有自己完善的[硬体](https://zh.wikipedia.org/wiki/硬體)架构，如[处理器](https://zh.wikipedia.org/wiki/处理器)、[堆栈](https://zh.wikipedia.org/wiki/堆栈)、[寄存器](https://zh.wikipedia.org/wiki/寄存器)等，还具有相应的[指令](https://zh.wikipedia.org/wiki/指令)系统。JVM 屏蔽了与具体[操作系统](https://zh.wikipedia.org/wiki/操作系统)平台相关的信息，使得 Java [程序](https://zh.wikipedia.org/wiki/程序)只需生成在 Java 虚拟机上运行的目标代码（[字节码](https://zh.wikipedia.org/wiki/字节码)），就可以在多种平台上不加修改地运行。通过对中央处理器（ [CPU](https://zh.wikipedia.org/wiki/CPU)）所执行的软件实现，实现能执行 [编译](https://zh.wikipedia.org/wiki/编译)过的 Java 程序码（ [Applet](https://zh.wikipedia.org/wiki/Applet) 与应用程序）。

作为一种编程语言的虚拟机，实际上不只是专用于 Java 语言，只要生成的编译文件符合 JVM 对加载编译文件格式要求，任何语言都可以由 JVM 编译运行。此外，除了[甲骨文](https://zh.wikipedia.org/wiki/甲骨文公司)，也有其他开源或闭源的实现。

据技术规范所述，Java 虚拟机是一部抽象（虚拟）的计算机。但技术规范未定义使用的垃圾回收算法及优化 Java 虚拟机指令的内部算法，这主要是为了不给实现者带来过多困扰与限制。所有的 Java 程序仅可在对 Java 虚拟机的抽象技术规范的具体实现环境中才可运行。

自 [Java 平台标准版](https://zh.wikipedia.org/wiki/Java_SE)（J2SE）5.0 起，Java 虚拟机的技术规范改为由 [Java 社区流程](https://zh.wikipedia.org/wiki/JCP)开发制定（JSR 924）。[[2\]](https://zh.wikipedia.org/wiki/Java虚拟机#cite_note-2)2006 年，JSR 924 对技术规范进行了变更，支持更改[类文件格式](https://zh.wikipedia.org/w/index.php?title=Class_(文件格式)&action=edit&redlink=1)的提议（JSR 202）[[3\]](https://zh.wikipedia.org/wiki/Java虚拟机#cite_note-3)。Java 虚拟机的技术细节以蓝皮书 [[4\]](https://zh.wikipedia.org/wiki/Java虚拟机#cite_note-4) 的形式发布，其前言称：

> 我们希望这份文档中的技术规范足以打造出相兼容的净室版 Java 虚拟机实现。甲骨文公司提供用于验证 Java 虚拟机实现是否正常运作的测试项目。[[注 1\]](https://zh.wikipedia.org/wiki/Java虚拟机#cite_note-5)

甲骨文公司的一款 Java 虚拟机名为 [HotSpot](https://zh.wikipedia.org/wiki/HotSpot)；另一款自 [BEA Systems](https://zh.wikipedia.org/wiki/BEA_Systems) 继承而来的名为 [JRockit](https://zh.wikipedia.org/wiki/JRockit)。 [净室设计](https://zh.wikipedia.org/wiki/净室设计)版 Java 实现有 [Kaffe](https://zh.wikipedia.org/w/index.php?title=Kaffe&action=edit&redlink=1)、[IBM J9](https://zh.wikipedia.org/w/index.php?title=IBM_J9&action=edit&redlink=1)及 Skelmir's CEE-J 。甲骨文公司拥有 Java 商标权，且可能将其用于认证其他实现是否能完全匹配甲骨文的技术规范。

### JVM 结构

![jvm 结构](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/java/jvm.png)