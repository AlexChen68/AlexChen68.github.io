---
title: Mysql 简介
tag: Mysql
category: Mysql
date: 2022-09-29
---

> 本篇原创出处：[MySQL - 墨天轮百科 (modb.pro)](https://www.modb.pro/wiki/2)

## 1. 前言

MySQL（官方发音为/maɪ ˌɛskjuːˈɛl/“My S-Q-L”，但也经常被错误读作/maɪ ˈsiːkwəl/“My Sequel”）原本是一个开放源码的关系数据库管理系统，原开发者为瑞典的 MySQL AB 公司，该公司于 2008 年被昇阳微系统（Sun Microsystems）收购。2009 年，甲骨文公司（Oracle）收购昇阳微系统公司，MySQL 成为 Oracle 旗下产品。

MySQL 的海豚标志的名字叫“sakila”，它是由 MySQL AB 的创始人从用户在“海豚命名”的竞赛中建议的大量的名字表中选出的。获胜的名字是由来自非洲斯威士兰的开源软件开发者 Ambrose Twebaze 提供。根据 Ambrose 所说，Sakila 来自一种叫 SiSwati 的斯威士兰方言，也是在 Ambrose 的家乡乌干达附近的坦桑尼亚的 Arusha 的一个小镇的名字。

MySQL 在过去由于性能高、成本低、可靠性好，已经成为最流行的开源数据库，因此被广泛地应用在 Internet 上的中小型网站中。随着 MySQL 的不断成熟，它也逐渐用于更多大规模网站和应用，比如维基百科、Google 和 Facebook 等网站。非常流行的开源软件组合 LAMP 中的“M”指的就是 MySQL。

但被甲骨文公司收购后，Oracle 大幅调涨 MySQL 商业版的售价，且甲骨文公司不再支持另一个自由软件项目 OpenSolaris 的发展，因此导致自由软件社群们对于 Oracle 是否还会持续支持 MySQL 社群版（MySQL 之中唯一的免费版本）有所隐忧，MySQL 的创始人麦克尔·维德纽斯以 MySQL 为基础，成立分支计划 MariaDB。而原先一些使用 MySQL 的开源软件逐渐转向 MariaDB 或其它的数据库。例如维基百科已于 2013 年正式宣布将从 MySQL 迁移到 MariaDB 数据库。

## 2. 历史

MySQL 的历史最早可以追溯到 1979 年，有一个人叫 MontyWidenius, 为一个叫 TcX 的小公司打工，并用 BASIC 设计了一个报表工具，可以在 4M 主频和 16KB 内在的计算机上运行。过了不久，又将此工具，使用 C 语言重写，移植到 Unix 平台，当时，它只是一个很底层的面向报表的存储引擎。这个工具叫做 Unireg。

- 1985 年，瑞典的几位志同道合小伙子（以 David Axmark 为首）成立了一家公司，这就是 MySQLAB 的前身。这个公司最初并不是为了开发数据库产品，而是在实现他们想法的过程中，需要一个数据库。他们希望能够使用开源的产品。但在当时并没有一个合适的选择，没办法，那就自己开发吧。
- 在最初，他们只是自己设计了一个利用索引顺序存取数据的方法，也就是 I SA M（Indexed Sequential Access Method）存储引擎核心算法的前身，利用 ISAM 结合 mSQL 来实现他们的应用需求。在早期，他们主要是为瑞典的一些大型零售商提供数据仓库服务。在系统使用过程中，随着数据量越来越大，系统复杂度越来越高，ISAM 和 mSQL 的组合逐渐不堪重负。在分析性能瓶颈之后，他们发现问题出在 mSQL 上面。不得已，他们抛弃了 mSQL，重新开发了一套功能类似的数据存储引擎，这就是 ISAM 存储引擎。大家可能已经注意到他们当时的主要客户是数据仓库，应该也容易理解为什么直至现在，MySQL 最擅长的是查询性能，而不是事务处理（需要借助第三方存储引擎）。
- 1990 年，TcX 的 customer 中开始有人要求要为它的 API 提供 SQL 支持，当时，有人想到了直接使用商用数据库算了，但是 Monty 觉得商用数据库的速度难令人满意。于是，他直接借助于 mSQL 的代码，将它集成到自己的存储引擎中。但不巧的是，效果并不太好。于是，Monty 雄心大起，决心自己重写一个 SQL 支持。
- 1996 年，MySQL 1.0 发布，在小范围内使用。到了 96 年 10 月，MySQL 3.11.1 发布了，没有 2.x 版本。最开始，只提供了 Solaris 下的二进制版本。一个月后，Linux 版本出现了。此时的 MySQL 还非常简陋，除了在一个表上做一些 Insert，Update，Delete 和 Select 操作职位，没有其他更多的功能。
- 紧接下来的两年里，MySQL 依次移植到各个平台下。它发布时，采用的许可策略，有些与众不同：允许免费商用，但是不能将 MySQL 与自己的产品绑定在一起发布。如果想一起发布，就必须使用特殊许可，意味着要花银子。当然，商业支持也是需要花银子的。其它的，随用户怎么用都可以。这种特殊许可为 MySQL 带来了一些收入，从而为它的持续发展打下了良好的基础。
- 1999-2000 年，有一家公司在瑞典成立了，叫 MySQL AB。雇了几个人，与 Sleepycat 合作，开发出了 Berkeley DB 引擎，因为 BDB 支持事务处理，所以，MySQL 从此开始支持事务处理了。
- 在 2000 年的时候，MySQL 公布了自己的源代码，并采用 GPL（GNU General PublicLicense）许可协议，正式进入开源世界。
- 2000 年 4 月，MySQL 对旧的存储引擎进行了整理，命名为 MyISAM。
- 2001 年，Heikiki Tuuri 向 MySQL 提出建议，希望能集成他们的存储引擎 InnoDB，这个引擎同样支持事务处理，还支持行级锁。所以在 2001 年发布的 3.23 版本的时候，该版本已经支持大多数的基本的 SQL 操作，而且还集成了 MyISAM 和 InnoDB 存储引擎。MySQL 与 InnoDB 的正式结合版本是 4.0。
- 2004 年 10 月，发布了经典的 4.1 版本。2005 年 10 月，有发布了里程碑的一个版本，MySQL5.0. 在 5.0 中加入了游标，存储过程，触发器，视图和事务的支持。在 5.0 之后的版本里，MySQL 明确地表现出迈向高性能数据库的发展步伐。
- 2008 年 1 月 16 日，Sun（太阳微系统）正式收购 MySQL。
- 2009 年 4 月 20 日，甲骨文公司宣布以每股 9.50 美元，74 亿美元的总额收购 Sun 电脑公司。
- 2010 年 04 月 22 发布 MySQL 5.5, MySQLcluster 7.1.
- 2013 年 6 月 18 日，甲骨文公司修改 MySQL 授权协议，移除了 GPL。但随后有消息称这是一个 bug。

## 3. 特性

- 使用 C 和 C++ 编写，并使用了多种编译器进行测试，保证源代码的可移植性。
- 支持 AIX、BSDi、FreeBSD、HP-UX、Linux、Mac OS、Novell NetWare、NetBSD、OpenBSD、OS/2 Wrap、Solaris、Windows 等多种操作系统。
- 为多种编程语言提供了 API。这些編程语言包括 C、C++、C#、VB.NET、Delphi、Eiffel、Java、Perl、PHP、Python、Ruby 和 Tcl 等。
- 支持多线程，充分利用 CPU 资源，支持多用户。
- 优化的 SQL 查询算法，有效地提高查询速度。
- 既能够作为一个单独的应用程序在客户端服务器网络环境中运行，也能够作为一个程序库而嵌入到其他的软件中。
- 提供多语言支持，常见的编码如中文的 GB 2312、BIG5，日文的 Shift JIS 等都可以用作数据表名和数据列名。
- 提供TCP/IP、ODBC和JDBC等多种数据库连接途径。
- 提供用于管理、检查、優化数据库操作的管理工具。
- 可以处理拥有上千万条记录的大型数据库。

## 4. 应用

与其他的大型数据库例如 Oracle、IBM DB2、MS SQL 等相比，MySQL 自有它的不足之处，如规模小、功能有限等，但是这丝毫也没有减少它受欢迎的程度。对于一般的个人用户和中小型企业来说，MySQL 提供的功能已经绰绰有余，而且由于 MySQL 是开放源码软件，因此可以大大降低总体拥有成本。

2010 年以前 Internet 上流行的网站构架方式是 LAMP（Linux Apache MySQL PHP），即是用 Linux 作为操作系统，Apache 作为 Web 服务器，MySQL 作为数据库，PHP（部分网站也使用 Perl 或 Python）作为服务器端脚本解释器。由于这四个软件都是开放源码软件，因此使用这种方式可以以较低的成本创建起一个稳定、免费的网站系统。MySQL 加 PHP 的配对在互联网上的应用相比 LAMP 来说更为常见，并获得了“动态配对”（Dynamic Duo）的雅号，大部分 Blog 网站基于的 WordPress 系统主要运用 MySQL 加 PHP 的配对。除了 LAMP 之外，用于 Solaris、Windows 和 Mac 上的网站构架也分别被称为 SAMP、WAMP 和 MAMP。

维基百科所使用的 Mediawiki 维基引擎采用 PHP 语言写成，并以 MySQL 作为其支持的其中一种数据库管理系统。

## 5. MySQL 管理

- 可以使用命令行工具管理 MySQL 数据库（命令 mysql 和 mysqladmin），也可以从 MySQL 的网站下载图形管理工具 MySQL Workbench。前者是用来取代旧有的 MySQL Administrator 和 MySQL Query Browser。
- Navicat 导航猫 for MySQL 是一套专为 MySQL 设计的强大数据库管理及开发工具。它可以用于任何版本的 MySQL 数据库，并支持大部分 MySQL 的功能，包括触发器、索引、查看等。
- phpMyAdmin 是由 PHP 写成的 MySQL 数据库系统管理程序，让管理者可用 Web 接口管理 MySQL 数据库。借由此 Web 接口可以成为一个简易方式输入繁杂 SQL 语法的较佳途径，尤其要处理大量数据的导入及导出更为方便。其中一个更大的优势在于由于 phpMyAdmin 跟其他 PHP 程序一样在网页服务器上运行，但是您可以在任何地方使用这些程序产生的 HTML 页面，也就是于远程管理你的 MySQL 数据库。使用 phpMyAdmin 您就可以方便的创建、修改、删除数据库及数据表。
- phpMyBackupPro 也是由 PHP 写成的，可以透过 Web 接口创建和管理数据库。它可以创建伪 cronjobs，可以用来自动在某个时间或周期备份 MySQL 数据库。

## 6. 连接方式

- 应用程序可透过 ODBC 或 ADO 方式，经由使用 MyODBC 与 MySQL 数据库连接。
- MS .Net Framework 下的程序（例如：C#、VB.NET）可透过 ADO.NET 的方式，经由使用 MySQL.Net 与 MySQL 数据库连接。
- C/C可使用MySQL或是直接使用MySQL内置API与MySQL数据库连接。
- PHP 可透过 PHP 的 MySQLi 与 MySQL 数据库连接，具备比 MySQL 模块更好的性能。另外 PHP6 可使用 mysqlnd 与 MySQL 数据库连接。
- JAVA 程序可通过 JDBC 方式与 MySQL 进行连接，MySQL 官方提供了 JDBC 驱动程序。
- 可通过 MySQL 客户端软件与 MySQL 进行连接，如 mysqlfront、mysqlyog、mysqlbrowser 等。
- javascript 可以通过使用 fibjs 的内置 mysql 模块与 MySQL 数据库连接。

## 7. 派生版本

派生版本有 Drizzle、MariaDB、Percona Server 及 OurDelta 等。

## 8. 外部链接

- [官方网站](http://www.mysql.com/)
- [MySQL 开发者主页](http://dev.mysql.com/)
- [MySQL Weblogs](http://www.planetmysql.org/)
- [MySQL 社区](https://web.archive.org/web/20080206224929/http://www.mysqlpub.com/)
- [中国 MySQL 社区](https://web.archive.org/web/20170214180417/http://www.innomysql.com/)
- [CentOS7 下安装 MySQL](https://www.ytyzx.org/index.php/如何在CentOS7中安装MySQL)
