---
title: Native 本地方法区
date: 2023-05-21
---

## native 关键字

native 关键字说明其修饰的方法是一个原生态方法，方法对应的实现不是在当前文件，而是在用其他语言（如 C 和 C++）实现的文件中。Java 语言本身不能对操作系统底层进行访问和操作，但是可以通过 JNI 接口调用其他语言来实现对底层的访问。

被 native 修饰的方法会进入**本地方法栈（Native Method Stack）**，执行本地方法时，会调通过本地接口（JNI）调用本地方法库。

JNI 是 Java 本机接口（Java Native Interface），是一个本机编程接口，它是 Java 软件开发工具箱（java Software Development Kit，SDK）的一部分。JNI 允许 Java 代码使用以其他语言编写的代码和代码库。Invocation API（JNI 的一部分）可以用来将 Java 虚拟机（JVM）嵌入到本机应用程序中，从而允许程序员从本机代码内部调用 Java 代码。

## native 的用法

1. 编写带有 native 声明的方法的 Java 类（java 文件）
2. 使用 javac 命令编译编写的 Java 类（class 文件）
3. 使用 javah -jni ****来生成后缀名为.h 的头文件（.h 的文件）
4. 使用其他语言（C、C++）实现本地方法
5. 将本地方法编写的文件生成动态链接库（dll 文件）