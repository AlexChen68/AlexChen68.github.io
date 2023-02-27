---
title: Java 流程控制
category: Java
order: 6
date: 2023-02-25
---

介绍 Java 常用的流程控制语句。
<!-- more -->

## if-else 语句

`if-else` 语句语法：

```java
if(条件1){  
  // 条件1 为 true 时执行的代码
}else if(条件2){  
  // 条件2 为 true 时执行的代码
}  
else if(条件3){  
  // 条件3 为 true 时执行的代码
}  
...  
else{  
  // 以上条件均为 false 时执行的代码
} 
```
 
通常，当 `if-else` 的条件过多时，可以常用使用 `switch` 语法改造，或者通过设计模式重构，增强代码的可维护性。

## switch 语句

switch 语句用来判断变量与多个值之间的相等性。

switch 语句的格式：

```java
switch(变量) {    
  case 可选值1:    
    // 可选值1匹配后执行的代码;    
    break;  // 该关键字是可选项
  case 可选值2:    
    // 可选值2匹配后执行的代码;    
    break;  // 该关键字是可选项
  ......    
default: // 该关键字是可选项     
  // 所有可选值都不匹配后执行的代码 
}    
```

switch 语句变量支持的类型：
1. byte、short、int、char以及对应的包装器类型 Byte、Short、Integer、Character；
2. String 字符串（JDK 7+ 开始支持）
3. Enum 枚举类（JDK 5+开始支持）
   
:::warning 特别注意
注意：switch 变量不支持 long、float、double 及其包装类。
:::

## for 循环

1. 普通 for 循环

格式：

```java
for(初始变量;条件;自增/自减){  
   // 循环体
}  
```

2. 增强 for 循环

for-each 循环通常用于遍历数组和集合，它的使用规则比普通的 for 循环还要简单，不需要初始变量，不需要条件，不需要下标来自增或者自减。

```java
for(元素类型 元素 : 数组或集合){  
   // 要执行的代码
}  
```

例如：

```java
public static void main(String[] args) {
     String[] strings = {"java", "python", "go"};

     for (String str : strings) {
         System.out.println(str);
     }
 }
```

## while 循环

while 循环的格式：

```java
while(条件){  
   //循环体  
}  
```

## do-while 循环

do-while 循环的格式：

```java
do{  
   // 循环体
}while(提交);  
```

## break

break 关键字通常用于中断循环或 switch 语句，它在指定条件下中断程序的当前流程。如果是内部循环，则仅中断内部循环。

可以将 break 关键字用于所有类型循环语句中，比如说 for 循环、while 循环，以及 do-while 循环。

## continue

当我们需要在 for 循环或者 （do）while 循环中立即跳转到下一个循环时，就可以使用 continue 关键字，通常用于跳过指定条件下的循环体，如果循环是嵌套的，仅跳过当前循环。

## 参考资料

- [Java 程序员进阶之路](https://tobebetterjavaer.com/basic-grammar/flow-control.html)