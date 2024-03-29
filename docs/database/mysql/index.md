--- 
title: Mysql 简介
date: 2022-09-29
---

# Mysql 简介

## 什么是 MySQL 数据库？

MySQL 是一个关系型数据库管理系统，由瑞典 MySQL AB 公司开发，属于 Oracle 旗下产品。MySQL 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL 是最好的 RDBMS (Relational Database Management System，关系数据库管理系统) 应用软件之一。

MySQL 是一种关系型数据库管理系统，关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

MySQL 所使用的 SQL 语言是用于访问数据库的最常用标准化语言。MySQL 软件采用了双授权政策，分为社区版和商业版，由于其体积小、速度快、总体拥有成本低，尤其是开放源码这一特点，一般中小型网站的开发都选择 MySQL 作为网站数据库。

## MySQL 的优点

- 成本低——MySQL 是开源的，一般可以免费使用。
- 性能——MySQL 执行快。
- 可信赖，体积小。
- 简单——MySQL 很容易安装和使用。

## MariaDB 分支

MariaDB 由 MySQL 的创始人开发，MariaDB 的目的是完全兼容 MySQL，包括 API 和命令行，使之能轻松成为 MySQL 的代替品。

MariaDB 提供了 MySQL 提供的标准存储引擎，即 MyISAM 和 InnoDB，10.0.9 版起使用 XtraDB(名称代号为 Aria) 来代替 MySQL 的 InnoDB。

## 存储引擎

### InnoDB

是 MySQL 默认的**事务型存储引擎**，**只有在需要它不支持的特性时，才考虑使用其它存储引擎**。

实现了四个标准的隔离级别，默认级别是可重复读 (REPEATABLE READ)；在可重复读隔离级别下，通过多版本并发控制 (MVCC)+ 间隙锁 (Next-Key Locking) 防止幻影读。

主索引是聚簇索引，在索引中保存了数据，从而避免直接读取磁盘，因此对查询性能有很大的提升。

内部做了很多优化，包括从磁盘读取数据时采用的可预测性读、能够加快读操作并且自动创建的自适应哈希索引、能够加速插入操作的插入缓冲区等。

支持真正的在线热备份。其它存储引擎不支持在线热备份，要获取一致性视图需要停止对所有表的写入，而在读写混合场景中，停止写入可能也意味着停止读取。

### MyISAM

设计简单，数据以紧密格式存储。对于只读数据，或者表比较小、可以容忍修复操作，则依然可以使用它。

提供了大量的特性，包括压缩表、空间数据索引等。

**不支持事务**。

不支持行级锁，只能对整张表加锁，读取时会对需要读到的所有表加共享锁，写入时则对表加排它锁。但在表有读取操作的同时，也可以往表中插入新的记录，这被称为并发插入 (CONCURRENT INSERT)。

可以手工或者自动执行检查和修复操作，但是和事务恢复以及崩溃恢复不同，可能导致一些数据丢失，而且修复操作是非常慢的。

如果指定了 DELAY_KEY_WRITE 选项，在每次修改执行完成时，不会立即将修改的索引数据写入磁盘，而是会写到内存中的键缓冲区，只有在清理键缓冲区或者关闭表的时候才会将对应的索引块写入磁盘。这种方式可以极大的提升写入性能，但是在数据库或者主机崩溃时会造成索引损坏，需要执行修复操作。

### 比较

- 事务：InnoDB 是事务型的，可以使用 Commit 和 Rollback 语句。
- 并发：MyISAM 只支持表级锁，而 InnoDB 还支持行级锁。
- 外键：InnoDB 支持外键。
- 备份：InnoDB 支持在线热备份。
- 崩溃恢复：MyISAM 崩溃后发生损坏的概率比 InnoDB 高很多，而且恢复的速度也更慢。
- 其它特性：MyISAM 支持压缩表和空间数据索引。

## 相关资料

- [Mysql 官方网站](http://www.mysql.com/)
- [Mysql8 官方文档](https://dev.mysql.com/doc/refman/8.0/en/)
- [MySQL 开发者主页](http://dev.mysql.com/)
- [MySQL Weblogs](http://www.planetmysql.org/)
- [MySQL 社区](https://web.archive.org/web/20080206224929/http://www.mysqlpub.com/)
- [中国 MySQL 社区](https://web.archive.org/web/20170214180417/http://www.innomysql.com/)

## 参考资料

- [MySQL 数据库简介](https://juejin.cn/post/7102792140400361480)
- [MySQL - 存储引擎](https://pdai.tech/md/db/sql-mysql/sql-mysql-engine.html)