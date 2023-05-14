---
title: Spring 概述
date: 2022-09-15
index: false
article: false
---

## Spring 介绍

要谈 Spring 的历史，就要先谈 J2EE。J2EE 应用程序的广泛实现是在 1999 年和 2000 年开始的，它的出现带来了诸如事务管理之类的核心中间层概念的标准化，但是在实践中并没有获得绝对的成功，因为开发效率，开发难度和实际的性能都令人失望。

曾经使用过 EJB 开发 JAVA EE 应用的人，一定知道，在 EJB 开始的学习和应用非常的艰苦，很多东西都不能一下子就很容易的理解。EJB 要严格地实现各种不同类型的接口，类似的或者重复的代码大量存在。而配置也是复杂和单调，同样使用 JNDI 进行对象查找的代码也是单调而枯燥。虽然有一些开发工作随着 xdoclet 的出现，而有所缓解，但是学习 EJB 的高昂代价，和极低的开发效率，极高的资源消耗，都造成了 EJB 的使用困难。而 Spring 出现的初衷就是为了解决类似的这些问题。

Spring 的一个最大的目的就是使 JAVA EE 开发更加容易。同时，Spring 之所以与 Struts、Hibernate 等单层框架不同，是因为 Spring 致力于提供一个以统一的、高效的方式构造整个应用，并且可以将单层框架以最佳的组合揉和在一起建立一个连贯的体系。可以说 Spring 是一个提供了更完善开发环境的一个框架，可以为 POJO(Plain Ordinary Java Object) 对象提供企业级的服务。

Spring 的形成，最初来自 Rod Jahnson 所著的一本很有影响力的书籍《Expert One-on-One J2EE Design and Development  (opens new window)》，就是在这本书中第一次出现了 Spring 的一些核心思想，该书出版于 2002 年。