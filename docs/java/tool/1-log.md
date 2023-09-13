---
title: Java 日志框架
date: 2022-09-30
tag: 日志
---

# 日志框架

## 日志简介

在 Java 开发中，有各式各样的日志工具库来实现日志功能，本文介绍日志框架中的日志门面和日志库的区别以及常用的日志工具。

日志门面是日志功能的接口定义，而日志库是接口的实现。

常用的日志门面有：

- apache 的开源日志门面框架 common-logging

- 大神 Ceki Gulcu 开发的 slf4j 框架

常用的日志库有：

- java.util.logging (JUL)
- Log4j
- Logback
- Log4j2

## 日志门面

### common-logging

> common-logging 是 apache 的一个开源项目。也称 Jakarta Commons Logging，缩写 JCL。

common-logging 的功能是提供日志功能的 API 接口，本身并不提供日志的具体实现（当然，common-logging 内部有一个 Simple logger 的简单实现，但是功能很弱，直接忽略），而是在运行时动态的绑定日志实现组件来工作（如 log4j、java.util.loggin）。

官网地址：[http://commons.apache.org/proper/commons-logging/  (opens new window)](http://commons.apache.org/proper/commons-logging/)

### slf4j

> 全称为 Simple Logging Facade for Java，即 java 简单日志门面。

类似于 Common-Logging，slf4j 是对不同日志框架提供的一个 API 封装，可以在部署的时候不修改任何配置即可接入一种日志实现方案。但是，slf4j 在编译时静态绑定真正的 Log 库。使用 SLF4J 时，如果你需要使用某一种日志实现，那么你必须选择正确的 SLF4J 的 jar 包的集合（各种桥接包）。

![slf4j](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/java/slf4j_dependcies.png)

### 比较

slf4j 库类似于 Apache Common-Logging。但是，他在编译时静态绑定真正的日志库。这点似乎很麻烦，其实也不过是导入桥接 jar 包而已。

同时，slf4j 使用 `{}`作为字符串替换符，解决了需要使用 `logger.isDebugEnabled()` 来解决日志因为字符拼接产生的性能问题。

## 日志库

### java.util.logging (JUL)

JDK1.4 开始，通过 java.util.logging 提供日志功能。虽然是官方自带的 log lib，JUL 的使用确不广泛。主要原因：

- JUL 从 JDK1.4 才开始加入 (2002 年)，当时各种第三方 log lib 已经被广泛使用了
- JUL 早期存在性能问题，到 JDK1.5 上才有了不错的进步，但现在和 Logback/Log4j2 相比还是有所不如
- JUL的功能不如Logback/Log4j2等完善，比如Output Handler就没有Logback/Log4j2的丰富，有时候需要自己来继承定制，又比如默认没有从ClassPath里加载配置文件的功能

### Log4j

Log4j 是 apache 的一个开源项目，创始人 Ceki Gulcu。Log4j 应该说是 Java 领域资格最老，应用最广的日志工具。Log4j 是高度可配置的，并可通过在运行时的外部文件配置。它根据记录的优先级别，并提供机制，以指示记录信息到许多的目的地，诸如：数据库，文件，控制台，UNIX 系统日志等。

Log4j 中有三个主要组成部分：

- loggers - 负责捕获记录信息。
- appenders - 负责发布日志信息，以不同的首选目的地。
- layouts - 负责格式化不同风格的日志信息。

官网地址：[http://logging.apache.org/log4j/2.x/  (opens new window)](http://logging.apache.org/log4j/2.x/)

Log4j 的短板在于性能，在 Logback 和 Log4j2 出来之后，Log4j 的使用也减少了。

### Logback

Logback 是由 log4j 创始人 Ceki Gulcu 设计的又一个开源日志组件，是作为 Log4j 的继承者来开发的，提供了性能更好的实现，异步 logger，Filter 等更多的特性。

logback 当前分成三个模块：logback-core、logback-classic 和 logback-access。

- logback-core - 是其它两个模块的基础模块。
- logback-classic - 是 log4j 的一个 改良版本。此外 logback-classic 完整实现 SLF4J API 使你可以很方便地更换成其它日志系统如 log4j 或 JDK14 Logging。
- logback-access - 访问模块与 Servlet 容器集成提供通过 Http 来访问日志的功能。

官网地址：[http://logback.qos.ch/  (opens new window)](http://logback.qos.ch/)

### Log4j2

维护 Log4j 的人为了性能又搞出了 Log4j2。

Log4j2 和 Log4j1.x 并不兼容，设计上很大程度上模仿了 SLF4J/Logback，性能上也获得了很大的提升。

Log4j2 也做了 Facade/Implementation 分离的设计，分成了 log4j-api 和 log4j-core。

官网地址：[http://logging.apache.org/log4j/2.x/  (opens new window)](http://logging.apache.org/log4j/2.x/)

### 比较

需要追求性能，选用 Log4j；否则 Logback + slf4j 的生态更强。

## Slf4j + Logback 的使用

1. 添加 maven 依赖，logback-classic 会自动将 slf4j-api 和 logback-core 也添加到你的项目中：

```xml
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.0.13</version>
</dependency>
```

2. 日志库配置

logback 配置示例如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            <charset>utf-8</charset>
        </encoder>
        <file>log/output.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <fileNamePattern>log/output.log.%i</fileNamePattern>
        </rollingPolicy>
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <MaxFileSize>1MB</MaxFileSize>
        </triggeringPolicy>
    </appender>

    <root level="INFO">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

3. 使用日志

方式一：定义一个 `Logger`

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
public class App {
    private static final Logger log = LoggerFactory.getLogger(App.class);
    
    public static void main(String[] args) {
        String msg = "print log, current level: {}";
        log.trace(msg, "trace");
        log.debug(msg, "debug");
        log.info(msg, "info");
        log.warn(msg, "warn");
        log.error(msg, "error");
    }
}
```

方式二：引入 lombok 后，使用 `@Slf4j` 注解，会自动创建一个 `Logger`

```java
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class App {
    
    public static void main(String[] args) {
        String msg = "print log, current level: {}";
        log.trace(msg, "trace");
        log.debug(msg, "debug");
        log.info(msg, "info");
        log.warn(msg, "warn");
        log.error(msg, "error");
    }
}
```

## 日志框架选择及使用建议

1. 考虑优先使用 slf4j 日志门面；
2. 新系统应该在 logback 和 log4j2 中做出选择，对于性能有很高要求的系统，应优先考虑 log4j2，否则应该先考虑 logback；
3. 总是使用日志门面加日志库，而不是直接使用日志库；
4. 只使用一个日志库框架，必要时从项目中排除第三方库中的其他日志库依赖；
5. 在项目中，日志库的依赖强烈建议设置为 runtime scope，并且设置为 optional，防止将依赖传入使用者；
6. 使用 `isDebugEnabled` 这样的日志等级判定和 `{}` 占位符，减少日志中不必要的字符串拼接开销；
7. 日志格式中最好不要使用行号，函数名等字段，从当前的 `stacktrace` 中获取这些信息需要很大的开销。

## Logback 配置详解

### Logback 的配置介绍

**Logger、appender 及 layout**

- Logger 作为日志的记录器，把它关联到应用的对应的 context 上后，主要用于存放日志对象，也可以定义日志类型、级别。

- Appender 主要用于指定日志输出的目的地，目的地可以是控制台、文件、远程套接字服务器、MySQL、PostreSQL、Oracle 和其他数据库、JMS 和远程 UNIX Syslog 守护进程等。

- Layout 负责把事件转换成字符串，格式化的日志信息的输出。

**Logger context**

各个 logger 都被关联到一个 **LoggerContext**，LoggerContext 负责制造 logger，也负责以树结构排列各 logger。其他所有 logger 也通过 `org.slf4j.LoggerFactory` 类的静态方法 `getLogger()` 取得。getLogger 方法以 logger 名称为参数。用同一名字调用`LoggerFactory.getLogger` 方法所得到的永远都是同一个 logger 对象的引用。

**有效级别及级别的继承**

Logger 可以被分配级别。级别包括：TRACE、DEBUG、INFO、WARN 和 ERROR，定义于 ch.qos.logback.classic.Level 类。

如果 logger 没有被分配级别，那么它将从有被分配级别的最近的祖先那里继承级别。

**root** logger 默认级别是 DEBUG。

**打印方法与基本的选择规则**

打印方法决定记录请求的级别。例如，如果 L 是一个 logger 实例，那么，语句 L.info("..") 是一条级别为 INFO 的记录语句。记录请求的级别在高于或等于其 logger 的有效级别时被称为被启用，否则，称为被禁用。记录请求级别为 p，其 logger 的有效级别为 q，只有则当 p>=q 时，该请求才会被执行。

该规则是 logback 的核心。级别排序为： **TRACE < DEBUG < INFO < WARN < ERROR**

### 配置 logback

可以通过编程或者配置 XML 脚本或者 Groovy 格式的方式来配置 logback。对于已经使用 log4j 的用户可以通过这个[工具](https://logback.qos.ch/translator/)来把 log4j.properties 转换为 logback.xml。

以下是 logback 的初始化步骤：

1. logback 会在类路径下寻找名为 logback-test.xml 的文件。
2. 如果没有找到，logback 会继续寻找名为 logback.groovy 的文件。
3. 如果没有找到，logback 会继续寻找名为 logback.xml 的文件。
4. 如果没有找到，将会通过 JDK 提供的 [ServiceLoader](https://docs.oracle.com/javase/6/docs/api/java/util/ServiceLoader.html) 工具在类路径下寻找文件 *META-INFO/services/ch.qos.logback.classic.spi.Configurator*，该文件的内容为实现了 [`Configurator`](https://logback.qos.ch/xref/ch/qos/logback/classic/spi/Configurator.html) 接口的实现类的全限定类名。
5. 如果以上都没有成功，logback 会通过 [BasicConfigurator](https://logback.qos.ch/xref/ch/qos/logback/classic/BasicConfigurator.html) 为自己进行配置，并且日志将会全部在控制台打印出来。

最后一步的目的是为了保证在所有的配置文件都没有被找到的情况下，提供一个默认的（但是是非常基础的）配置。

如果你使用的是 maven，你可以在 *src/test/resources* 下新建 logback-test.xml。maven 会确保它不会被生成。所以你可以在测试环境中给配置文件命名为 *logback-test.xml*，在生产环境中命名为 *logback.xml*。

### Logback 的默认配置

如果配置文件 logback-test.xml 和 logback.xml 都不存在，那么 logback 默认地会调用 BasicConfigurator，创建一个最小化配置。最小化配置由一个关联到根 logger 的 ConsoleAppender 组成。输出用模式为%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n 的 PatternLayoutEncoder 进行格式化。root logger 默认级别是 DEBUG。

- Logback 的配置文件

  Logback 配置文件的语法非常灵活。正因为灵活，所以无法用 DTD 或 XML schema 进行定义。尽管如此，可以这样描述配置文件的基本结构：以`<configuration>` 开头，后面有零个或多个 `<appender>` 元素，有零个或多个 `<logger>` 元素，有最多一个 `<root>` 元素。

- Logback 默认配置的步骤

1. 尝试在 classpath 下查找文件 logback-test.xml；
2. 如果文件不存在，则查找文件 logback.xml；
3. 如果两个文件都不存在，logback 用 BasicConfigurator 自动对自己进行配置，这会导致记录输出到控制台。

### logback.xml 常用配置详解

#### 根标签

根标签 `<configuration>` 包含下面三个属性：

- scan: 当此属性设置为 true 时，配置文件如果发生改变，将会被重新加载，默认值为 true。
- scanPeriod: 设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当 scan 为 true 时，此属性生效。默认的时间间隔为 1 分钟。
- debug: 当此属性设置为 true 时，将打印出 logback 内部日志信息，实时查看 logback 运行状态。默认值为 false。

```xml
<configuration scan="true" scanPeriod="60 seconds" debug="false"> 
    <!--其他配置省略--> 
</configuration>　
```

#### 配置上下文名称

`<contextName>` 用来设置上下文名称，每个 logger 都关联到 logger 上下文，默认上下文名称为 default。

但可以使用 `<contextName>` 设置成其他名字，用于区分不同应用程序的记录。一旦设置，不能修改。

```xml
<configuration scan="true" scanPeriod="60 seconds" debug="false"> 
    <contextName>myAppName</contextName> 
    <!--其他配置省略-->
</configuration>   
```

#### 配置变量

`<property>` 用来定义变量值，它有两个属性 name 和 value，通过 `<property>` 定义的值会被插入到 logger 上下文中，可以使 `${}` 来使用变量。

- name: 变量的名称
- value: 变量定义的值

```xml
<configuration scan="true" scanPeriod="60 seconds" debug="false"> 
    <property name="APP_Name" value="myAppName" /> 
    <contextName>${APP_Name}</contextName> 
    <!--其他配置省略--> 
</configuration>
```

#### 配置时间格式

`<timestamp>` 可以获取时间戳字符串，他有两个属性 key 和 datePattern。

- key: 标识此 `<timestamp>` 的名字；
- datePattern: 设置将当前时间（解析配置文件的时间）转换为字符串的模式，遵循 `java.txt.SimpleDateFormat` 的格式。

```xml
<configuration scan="true" scanPeriod="60 seconds" debug="false"> 
    <timestamp key="bySecond" datePattern="yyyyMMdd'T'HHmmss"/> 
    <contextName>${bySecond}</contextName> 
    <!-- 其他配置省略--> 
</configuration>
```

#### 配置 Appender

appender 通过 `<appender>` 元素进行配置，需要两个强制的属性 *name* 与 *class*。*name* 属性用来指定 appender 的名字，*class* 属性需要指定类的全限定名用于实例化。

`<appender>` 元素可以包含 0 或一个 `<layout>` 元素，0 或多个 `<encoder>` 元素，0 或多个 `<filter>` 元素。除了这些公共的元素之外，`<appender>` 元素可以包含任意与 appender 类的 JavaBean 属性相一致的元素。

![appenderSyntax](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/java/logback_appender_syntax.png)

`<layout>` 元素强制一个 class 属性去指定一个类的全限定名，用于实例化。与 `<appender>` 元素一样，`<layout>` 元素也可以包含与 layout 实例相关的属性。如果 layout 的 class 是 `PatternLayout`，那么 class 属性可以被隐藏掉（参考：[默认类映射](https://github.com/YLongo/logback-chinese-manual/blob/master/03第三章：logback 的配置.md#默认类映射)），因为这个很常见。.

`<encoder` 元素强制一个 class 属性去指定一个类的全限定名，用于实例化。如果 encoder 的 class 是 `PatternLayoutEncoder`，那么基于[默认类映射](https://github.com/YLongo/logback-chinese-manual/blob/master/03第三章：logback 的配置.md#默认类映射)，class 属性可以被隐藏。

Logback 有多种不同的 Appender，常用的如下：

1. **ConsoleAppender**

把日志输出到控制台，有以下子节点：

- `<encoder>`：对日志进行格式化。（具体参数稍后讲解）
- `<target>`：字符串 System.out (默认) 或者 System.err（区别不多说了）

```xml
<configuration> 
  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender"> 
    <encoder> 
      <pattern>%-4relative [%thread] %-5level %logger{35} - %msg %n</pattern> 
    </encoder> 
  </appender> 

  <root level="DEBUG"> 
    <appender-ref ref="STDOUT" /> 
  </root> 
</configuration>
```

2. **FileAppender**

把日志添加到文件，有以下子节点：

- `<file>`：被写入的文件名，可以是相对目录，也可以是绝对目录，如果上级目录不存在会自动创建，没有默认值。
- `<append>`：如果是 true，日志被追加到文件结尾，如果是 false，清空现存文件，默认是 true。
- `<encoder>`：对记录事件进行格式化。（具体参数稍后讲解）。
- `<prudent>`：如果是 true，日志会被安全的写入文件，即使其他的 FileAppender 也在向此文件做写入操作，效率低，默认是 false。

```xml
<configuration> 
  <appender name="FILE" class="ch.qos.logback.core.FileAppender"> 
    <file>testFile.log</file> 
    <append>true</append> 
    <encoder> 
      <pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern> 
    </encoder> 
  </appender> 

  <root level="DEBUG"> 
    <appender-ref ref="FILE" /> 
  </root> 
</configuration>
```

3. RollingFileAppender

滚动记录文件，先将日志记录到指定文件，当符合某个条件时，将日志记录到其他文件。有以下子节点：

- `<file>`：被写入的文件名，可以是相对目录，也可以是绝对目录，如果上级目录不存在会自动创建，没有默认值。
- `<append>`：如果是 true，日志被追加到文件结尾，如果是 false，清空现存文件，默认是 true。
- `<rollingPolicy>`：当发生滚动时，决定 RollingFileAppender 的行为，涉及文件移动和重命名。属性 class 定义具体的滚动策略类。
- `<triggeringPolicy>`：告知 RollingFileAppender 合适激活滚动。

Appender 的具体配置见[官方文档中文版](https://github.com/YLongo/logback-chinese-manual/blob/master/04%E7%AC%AC%E5%9B%9B%E7%AB%A0%EF%BC%9AAppenders.md)。

#### 配置 logger

`logger` 用来设置某一个包或具体的某一个类的日志打印级别、以及指定 < appender>。

通过 `<logger>` 标签来过 logger 进行配置，一个 `<logger>` 标签必须包含一个 *name* 属性，一个可选的 *level* 属性，一个可选 *additivity* 属性。

`additivity` 的值为 *true* 或 *false*，为 true 时会继承父 logger 的 appender。

`level` 的值为 TRACE，DEBUG，INFO，WARN，ERROR，ALL，OFF，INHERITED，NULL。当 `level` 的值为 INHERITED 或 NULL 时，将会强制 logger 继承上一层的级别。

`<logger>` 元素至少包含 0 或多个 `<appender-ref>` 元素。每一个 appender 通过这种方式被添加到 logger 上。与 log4j 不同的是，logbakc-classic 不会关闭或移除任何之前在 logger 上定义好的的 appender。

 `<root>`: 它也是 < logger > 元素，但是它是根 logger, 是所有 logger 的上级。只有一个 level 属性，因为 name 已经被命名为 "root", 且已经是最上级了。

示例：

```xml
<property name="pattern" value="%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"/>

<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
        <pattern>${pattern}</pattern>
    </encoder>
</appender>

<logger name="org.springframework" level="WARN" additivity="false">
  	<appender-ref ref="CONSOLE"/>
</logger>
```

---

## 参考资料

- [Java 全栈知识体系](https://pdai.tech/md/develop/package/dev-package-x-log.html)
- [行走在云端的愚公](https://www.cnblogs.com/warking/p/5710303.html)
- [Logback 官方手册](https://logback.qos.ch/manual/)
- [Logbach 中文文档](https://logbackcn.gitbook.io/logback/)















