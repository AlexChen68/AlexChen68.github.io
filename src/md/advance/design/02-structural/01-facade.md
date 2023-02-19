---
title: 外观模式
date: 2022-09-27
tag:
  - 设计模式
category:
  - 设计模式
isOriginal: true
description: 外观模式
---

设计模式之外观模式
<!-- more -->

## 外观(Facade)模式

> 它提供了一个统一的接口，用来访问子系统中的一群接口，从而让子系统更容易使用。
>
> 这种模式涉及到一个单一的类，该类提供了客户端请求的简化方法和对现有系统类方法的委托调用。

```java
public interface Shape {
   void draw();
}

class Rectangle implements Shape {
 
   @Override
   public void draw() {
      System.out.println("Rectangle::draw()");
   }
}

class Square implements Shape {
 
   @Override
   public void draw() {
      System.out.println("Square::draw()");
   }
}

class Circle implements Shape {
 
   @Override
   public void draw() {
      System.out.println("Circle::draw()");
   }
}
```

```java
public class ShapeMaker {
   private Shape circle;
   private Shape rectangle;
   private Shape square;
 
   public ShapeMaker() {
      circle = new Circle();
      rectangle = new Rectangle();
      square = new Square();
   }
 
   public void drawCircle(){
      circle.draw();
   }
   public void drawRectangle(){
      rectangle.draw();
   }
   public void drawSquare(){
      square.draw();
   }
}
```

```java
public class FacadePattern {
   public static void main(String[] args) {
      ShapeMaker shapeMaker = new ShapeMaker();
 
      shapeMaker.drawCircle();
      shapeMaker.drawRectangle();
      shapeMaker.drawSquare();      
   }
}
```