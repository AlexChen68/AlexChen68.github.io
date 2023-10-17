import{_ as a,o as e,c as t,Q as o}from"./chunks/framework.419948d5.js";const v=JSON.parse('{"title":"Java 异常机制","description":"","frontmatter":{"title":"Java 异常机制","order":8},"headers":[],"relativePath":"java/basic/exception.md","filePath":"java/basic/exception.md","lastUpdated":1697537189000}'),r={name:"java/basic/exception.md"},c=o('<h1 id="java-异常机制" tabindex="-1">Java 异常机制 <a class="header-anchor" href="#java-异常机制" aria-label="Permalink to &quot;Java 异常机制&quot;">​</a></h1><h2 id="什么是异常机制" tabindex="-1">什么是异常机制 <a class="header-anchor" href="#什么是异常机制" aria-label="Permalink to &quot;什么是异常机制&quot;">​</a></h2><p><strong>异常机制是指当程序出现错误后，程序如何处理。具体来说，异常机制提供了程序退出的安全通道。当出现错误后，程序执行的流程发生改变，程序的控制权转移到异常处理器。</strong></p><p>程序错误分为三种：<strong>1.编译错误；2.运行时错误；3.逻辑错误。</strong></p><h2 id="异常的结构" tabindex="-1">异常的结构 <a class="header-anchor" href="#异常的结构" aria-label="Permalink to &quot;异常的结构&quot;">​</a></h2><p>在 Java 中，所有的异常都有一个共同的祖先 <code>Throwable</code>（可抛出）。<code>Throwable</code> 指定代码中可用异常传播机制通过 Java 应用程序传输的任何问题的共性。</p><p><code>Throwable</code>：有两个重要的子类：<code>Exception</code>（异常）和 <code>Error</code>（错误），二者都是 Java 异常处理的重要子类，各自都包含大量子类。</p><p><strong>异常和错误的区别是：异常能被程序本身可以处理，错误是无法处理。</strong></p><p><img src="https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/20231017090848.png" alt="20231017090848"></p>',9),n=[c];function s(d,i,p,l,h,_){return e(),t("div",null,n)}const b=a(r,[["render",s]]);export{v as __pageData,b as default};