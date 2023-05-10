---
title: Java 时间工具
category: Java
date: 2023-05-10
---

## 1. Date 和 Calendar

`java.util.Date` 与 `java.util.Calendar` 是 JDK 早期提供的日期工具，不过由于 API 设计混乱，吐槽的地方太多了。比如：

- 在易用性方面有着很大的缺陷，年份的起始时间选择是 1900 年，月份是从 0 开始。
- toString 方法返回值不直观，带有时区。
- 很多时间操作都需要 `SimpleDateTimeFormat` 来格式化。
- `java.util.Date` 与 `java.util.Calendar` 中的所有属性都是可变的。
- `SimpleDateTimeFormat` 是非线程安全。

因此，从 JDK8 起，提供了新的日期工具包 `java.time` 来替换原来的日期工具。

## 2. Java8 时间和日期

Java 8 仍然延用了 ISO 的日历体系，并且与它的前辈们不同，`java.time` 包中的类是不可变且线程安全的。新的时间及日期 API 位于 `java.time` 包中，下面是里面的一些关键的类：

1. `Instant`——它代表的是时间戳 
2. `LocalDate`——不包含具体时间的日期，比如 2014-01-14。它可以用来存储生日，周年纪念日，入职日期等。
3. `LocalTime`——它代表的是不含日期的时间 
4. `LocalDateTime`——它包含了日期及时间，不过还是没有偏移信息或者说时区。
5. `ZonedDateTime`——这是一个包含时区的完整的日期时间，偏移量是以 UTC/格林威治时间为基准的。

新的库还增加了 ZoneOffset 及 Zoned，可以为时区提供更好的支持。有了新的 DateTimeFormatter 之后日期的解析及格式化也变得焕然一新了。