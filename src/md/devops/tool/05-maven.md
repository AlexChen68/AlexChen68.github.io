---
title: Maven 教程
icon: maven
date: 2022-09-30
tag: Maven
category: 开发工具
---

转载自廖雪峰老师的教程：https://www.liaoxuefeng.com/wiki/1252599548343744/1309301146648610

<!-- more -->

## Maven 简介

在了解 Maven 之前，我们先来看看一个 Java 项目需要的东西。首先，我们需要确定引入哪些依赖包。例如，如果我们需要用到 [commons logging](https://commons.apache.org/proper/commons-logging/)，我们就必须把 commons logging 的 jar 包放入 classpath。如果我们还需要 [log4j](https://logging.apache.org/log4j/)，就需要把 log4j 相关的 jar 包都放到 classpath 中。这些就是依赖包的管理。

其次，我们要确定项目的目录结构。例如，`src` 目录存放 Java 源码，`resources` 目录存放配置文件，`bin` 目录存放编译生成的`.class` 文件。

此外，我们还需要配置环境，例如 JDK 的版本，编译打包的流程，当前代码的版本号。

最后，除了使用 Eclipse 这样的 IDE 进行编译外，我们还必须能通过命令行工具进行编译，才能够让项目在一个独立的服务器上编译、测试、部署。

这些工作难度不大，但是非常琐碎且耗时。如果每一个项目都自己搞一套配置，肯定会一团糟。我们需要的是一个标准化的 Java 项目管理和构建工具。

Maven 就是是专门为 Java 项目打造的管理和构建工具，它的主要功能有：

- 提供了一套标准化的项目结构；
- 提供了一套标准化的构建流程（编译，测试，打包，发布……）；
- 提供了一套依赖管理机制。

### Maven 项目结构

一个使用 Maven 管理的普通的 Java 项目，它的目录结构默认如下：

```ascii
a-maven-project
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   └── resources
│   └── test
│       ├── java
│       └── resources
└── target
```

项目的根目录 `a-maven-project` 是项目名，它有一个项目描述文件 `pom.xml`，存放 Java 源码的目录是 `src/main/java`，存放资源文件的目录是 `src/main/resources`，存放测试源码的目录是 `src/test/java`，存放测试资源的目录是 `src/test/resources`，最后，所有编译、打包生成的文件都放在 `target` 目录里。这些就是一个 Maven 项目的标准目录结构。

所有的目录结构都是约定好的标准结构，我们千万不要随意修改目录结构。使用标准结构不需要做任何配置，Maven 就可以正常使用。

我们再来看最关键的一个项目描述文件 `pom.xml`，它的内容长得像下面：

```xml
<project ...>
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.itranswarp.learnjava</groupId>
	<artifactId>hello</artifactId>
	<version>1.0</version>
	<packaging>jar</packaging>
	<properties>
        ...
	</properties>
	<dependencies>
        <dependency>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
            <version>1.2</version>
        </dependency>
	</dependencies>
</project>
```

其中，`groupId` 类似于 Java 的包名，通常是公司或组织名称，`artifactId` 类似于 Java 的类名，通常是项目名称，再加上 `version`，一个 Maven 工程就是由 `groupId`，`artifactId` 和 `version` 作为唯一标识。我们在引用其他第三方库的时候，也是通过这 3 个变量确定。例如，依赖 `commons-logging`：

```xml
<dependency>
    <groupId>commons-logging</groupId>
    <artifactId>commons-logging</artifactId>
    <version>1.2</version>
</dependency>
```

使用 `<dependency>` 声明一个依赖后，Maven 就会自动下载这个依赖包并把它放到 classpath 中。

### 安装 Maven

要安装 Maven，可以从 [Maven 官网](https://maven.apache.org/)下载最新的 Maven 3.6.x，然后在本地解压，设置几个环境变量：

```properties
M2_HOME=/path/to/maven-3.6.x
PATH=$PATH:$M2_HOME/bin
```

Windows 可以把 `%M2_HOME%\bin` 添加到系统 Path 变量中。

然后，打开命令行窗口，输入 `mvn -version`，应该看到 Maven 的版本信息：

```ascii
┌────────────────────────────────────────────────────────┐
│Command Prompt                                    - □ x │
├────────────────────────────────────────────────────────┤
│Microsoft Windows [Version 10.0.0]                      │
│(c) 2015 Microsoft Corporation. All rights reserved.    │
│                                                        │
│C:\> mvn -version                                       │
│Apache Maven 3.6.0 (97c98ec64a1fdfee7767ce5ffb20918...) │
│Maven home: C:\Users\liaoxuefeng\maven                  │
│Java version: ...                                       │
│...                                                     │
│C:\> _                                                  │
└────────────────────────────────────────────────────────┘
```

如果提示命令未找到，说明系统 PATH 路径有误，需要修复后再运行。



## 依赖管理

如果我们的项目依赖第三方的 jar 包，例如 commons logging，那么问题来了：commons logging 发布的 jar 包在哪下载？

如果我们还希望依赖 log4j，那么使用 log4j 需要哪些 jar 包？

类似的依赖还包括：JUnit，JavaMail，MySQL 驱动等等，一个可行的方法是通过搜索引擎搜索到项目的官网，然后手动下载 zip 包，解压，放入 classpath。但是，这个过程非常繁琐。

Maven 解决了依赖管理问题。例如，我们的项目依赖 `abc` 这个 jar 包，而 `abc` 又依赖 `xyz` 这个 jar 包：

```ascii
┌──────────────┐
│Sample Project│
└──────────────┘
        │
        ▼
┌──────────────┐
│     abc      │
└──────────────┘
        │
        ▼
┌──────────────┐
│     xyz      │
└──────────────┘
```

当我们声明了 `abc` 的依赖时，Maven 自动把 `abc` 和 `xyz` 都加入了我们的项目依赖，不需要我们自己去研究 `abc` 是否需要依赖 `xyz`。

因此，Maven 的第一个作用就是解决依赖管理。我们声明了自己的项目需要 `abc`，Maven 会自动导入 `abc` 的 jar 包，再判断出 `abc` 需要 `xyz`，又会自动导入 `xyz` 的 jar 包，这样，最终我们的项目会依赖 `abc` 和 `xyz` 两个 jar 包。

我们来看一个复杂依赖示例：

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>1.4.2.RELEASE</version>
</dependency>
```

当我们声明一个 `spring-boot-starter-web` 依赖时，Maven 会自动解析并判断最终需要大概二三十个其他依赖：

```ascii
spring-boot-starter-web
  spring-boot-starter
    spring-boot
    sprint-boot-autoconfigure
    spring-boot-starter-logging
      logback-classic
        logback-core
        slf4j-api
      jcl-over-slf4j
        slf4j-api
      jul-to-slf4j
        slf4j-api
      log4j-over-slf4j
        slf4j-api
    spring-core
    snakeyaml
  spring-boot-starter-tomcat
    tomcat-embed-core
    tomcat-embed-el
    tomcat-embed-websocket
      tomcat-embed-core
  jackson-databind
  ...
```

如果我们自己去手动管理这些依赖是非常费时费力的，而且出错的概率很大。

### 依赖关系

Maven 定义了几种依赖关系，分别是 `compile`、`test`、`runtime` 和 `provided`：

| scope    | 说明                                            | 示例            |
| :------- | :---------------------------------------------- | :-------------- |
| compile  | 编译时需要用到该 jar 包（默认）                 | commons-logging |
| test     | 编译 Test 时需要用到该 jar 包                   | junit           |
| runtime  | 编译时不需要，但运行时需要用到                  | mysql           |
| provided | 编译时需要用到，但运行时由 JDK 或某个服务器提供 | servlet-api     |

其中，默认的 `compile` 是最常用的，Maven 会把这种类型的依赖直接放入 classpath。

`test` 依赖表示仅在测试时使用，正常运行时并不需要。最常用的 `test` 依赖就是 JUnit：

```
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.3.2</version>
    <scope>test</scope>
</dependency>
```

`runtime` 依赖表示编译时不需要，但运行时需要。最典型的 `runtime` 依赖是 JDBC 驱动，例如 MySQL 驱动：

```
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.48</version>
    <scope>runtime</scope>
</dependency>
```

`provided` 依赖表示编译时需要，但运行时不需要。最典型的 `provided` 依赖是 Servlet API，编译的时候需要，但是运行时，Servlet 服务器内置了相关的 jar，所以运行期不需要：

```
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.0</version>
    <scope>provided</scope>
</dependency>
```

最后一个问题是，Maven 如何知道从何处下载所需的依赖？也就是相关的 jar 包？答案是 Maven 维护了一个中央仓库（[repo1.maven.org](https://repo1.maven.org/)），所有第三方库将自身的 jar 以及相关信息上传至中央仓库，Maven 就可以从中央仓库把所需依赖下载到本地。

Maven 并不会每次都从中央仓库下载 jar 包。一个 jar 包一旦被下载过，就会被 Maven 自动缓存在本地目录（用户主目录的`.m2` 目录），所以，除了第一次编译时因为下载需要时间会比较慢，后续过程因为有本地缓存，并不会重复下载相同的 jar 包。

### 唯一 ID

对于某个依赖，Maven 只需要 3 个变量即可唯一确定某个 jar 包：

- groupId：属于组织的名称，类似 Java 的包名；
- artifactId：该 jar 包自身的名称，类似 Java 的类名；
- version：该 jar 包的版本。

通过上述 3 个变量，即可唯一确定某个 jar 包。Maven 通过对 jar 包进行 PGP 签名确保任何一个 jar 包一经发布就无法修改。修改已发布 jar 包的唯一方法是发布一个新版本。

因此，某个 jar 包一旦被 Maven 下载过，即可永久地安全缓存在本地。

注：只有以 `-SNAPSHOT` 结尾的版本号会被 Maven 视为开发版本，开发版本每次都会重复下载，这种 SNAPSHOT 版本只能用于内部私有的 Maven repo，公开发布的版本不允许出现 SNAPSHOT。

### Maven 镜像

除了可以从 Maven 的中央仓库下载外，还可以从 Maven 的镜像仓库下载。如果访问 Maven 的中央仓库非常慢，我们可以选择一个速度较快的 Maven 的镜像仓库。Maven 镜像仓库定期从中央仓库同步：

```ascii
           slow    ┌───────────────────┐
    ┌─────────────>│Maven Central Repo.│
    │              └───────────────────┘
    │                        │
    │                        │sync
    │                        ▼
┌───────┐  fast    ┌───────────────────┐
│ User  │─────────>│Maven Mirror Repo. │
└───────┘          └───────────────────┘
```

中国区用户可以使用阿里云提供的 Maven 镜像仓库。使用 Maven 镜像仓库需要一个配置，在用户主目录下进入`.m2` 目录，创建一个 `settings.xml` 配置文件，内容如下：

```xml
<settings>
    <mirrors>
        <mirror>
          <id>aliyunmaven</id>
          <mirrorOf>*</mirrorOf>
          <name>阿里云公共仓库</name>
          <url>https://maven.aliyun.com/repository/public</url>
        </mirror>
    </mirrors>
</settings>
```

配置镜像仓库后，Maven 的下载速度就会非常快。

### 搜索第三方组件

最后一个问题：如果我们要引用一个第三方组件，比如 `okhttp`，如何确切地获得它的 `groupId`、`artifactId` 和 `version`？方法是通过 [search.maven.org](https://search.maven.org/) 搜索关键字，找到对应的组件后，直接复制。



## 构建流程

Maven 不但有标准化的项目结构，而且还有一套标准化的构建流程，可以自动化实现编译，打包，发布，等等。

### Lifecycle 和 Phase

使用 Maven 时，我们首先要了解什么是 Maven 的生命周期（lifecycle）。

Maven 的生命周期由一系列阶段（phase）构成，以内置的生命周期 `default` 为例，它包含以下 phase：

```
validate： 用于验证项目的有效性和其项目所需要的内容是否具备
initialize：初始化操作，比如创建一些构建所需要的目录等。
generate-sources：用于生成一些源代码，这些源代码在compile phase中需要使用到
process-sources：对源代码进行一些操作，例如过滤一些源代码
generate-resources：生成资源文件（这些文件将被包含在最后的输入文件中）
process-resources：对资源文件进行处理
compile：对源代码进行编译
process-classes：对编译生成的文件进行处理
generate-test-sources：生成测试用的源代码
process-test-sources：对生成的测试源代码进行处理
generate-test-resources：生成测试用的资源文件
process-test-resources：对测试用的资源文件进行处理
test-compile：对测试用的源代码进行编译
process-test-classes：对测试源代码编译后的文件进行处理
test：进行单元测试
prepare-package：打包前置操作
package：打包
pre-integration-test：集成测试前置操作   
integration-test：集成测试
post-integration-test：集成测试后置操作
install：将打包产物安装到本地maven仓库
deploy：将打包产物安装到远程仓库
```

如果我们运行 `mvn package`，Maven 就会执行 `default` 生命周期，它会从开始一直运行到 `package` 这个 phase 为止：

- validate
- ...
- package

如果我们运行 `mvn compile`，Maven 也会执行 `default` 生命周期，但这次它只会运行到 `compile`，即以下几个 phase：

- validate
- ...
- compile

Maven 另一个常用的生命周期是 `clean`，它会执行 3 个 phase：

- pre-clean
- clean （注意这个 clean 不是 lifecycle 而是 phase）
- post-clean

所以，我们使用 `mvn` 这个命令时，后面的参数是 phase，Maven 自动根据生命周期运行到指定的 phase。

更复杂的例子是指定多个 phase，例如，运行 `mvn clean package`，Maven 先执行 `clean` 生命周期并运行到 `clean` 这个 phase，然后执行 `default` 生命周期并运行到 `package` 这个 phase，实际执行的 phase 如下：

- pre-clean
- clean （注意这个 clean 是 phase）
- validate
- ...
- package

在实际开发过程中，经常使用的命令有：

`mvn clean`：清理所有生成的 class 和 jar；

`mvn clean compile`：先清理，再执行到 `compile`；

`mvn clean test`：先清理，再执行到 `test`，因为执行 `test` 前必须执行 `compile`，所以这里不必指定 `compile`；

`mvn clean package`：先清理，再执行到 `package`。

大多数 phase 在执行过程中，因为我们通常没有在 `pom.xml` 中配置相关的设置，所以这些 phase 什么事情都不做。

经常用到的 phase 其实只有几个：

- clean：清理
- compile：编译
- test：运行测试
- package：打包

### Goal

执行一个 phase 又会触发一个或多个 goal：

| 执行的 Phase | 对应执行的 Goal                       |
| :----------- | :------------------------------------ |
| compile      | compiler:compile                      |
| test         | compiler:testCompile<br>surefire:test |

goal 的命名总是 `abc:xyz` 这种形式。

其实我们类比一下就明白了：

- lifecycle 相当于 Java 的 package，它包含一个或多个 phase；
- phase 相当于 Java 的 class，它包含一个或多个 goal；
- goal 相当于 class 的 method，它其实才是真正干活的。

大多数情况，我们只要指定 phase，就默认执行这些 phase 默认绑定的 goal，只有少数情况，我们可以直接指定运行一个 goal，例如，启动 Tomcat 服务器：

```
mvn tomcat:run
```



## 使用插件

我们在前面介绍了 Maven 的 lifecycle，phase 和 goal：使用 Maven 构建项目就是执行 lifecycle，执行到指定的 phase 为止。每个 phase 会执行自己默认的一个或多个 goal。goal 是最小任务单元。

我们以 `compile` 这个 phase 为例，如果执行：

```
mvn compile
```

Maven 将执行 `compile` 这个 phase，这个 phase 会调用 `compiler` 插件执行关联的 `compiler:compile` 这个 goal。

实际上，执行每个 phase，都是通过某个插件（plugin）来执行的，Maven 本身其实并不知道如何执行 `compile`，它只是负责找到对应的 `compiler` 插件，然后执行默认的 `compiler:compile` 这个 goal 来完成编译。

所以，使用 Maven，实际上就是配置好需要使用的插件，然后通过 phase 调用它们。

Maven 已经内置了一些常用的标准插件：

| 插件名称 | 对应执行的 phase |
| :------- | :--------------- |
| clean    | clean            |
| compiler | compile          |
| surefire | test             |
| jar      | package          |

如果标准插件无法满足需求，我们还可以使用自定义插件。使用自定义插件的时候，需要声明。例如，使用 `maven-shade-plugin` 可以创建一个可执行的 jar，要使用这个插件，需要在 `pom.xml` 中声明它：

```
<project>
    ...
	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-shade-plugin</artifactId>
                <version>3.2.1</version>
				<executions>
					<execution>
						<phase>package</phase>
						<goals>
							<goal>shade</goal>
						</goals>
						<configuration>
                            ...
						</configuration>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>
</project>
```

自定义插件往往需要一些配置，例如，`maven-shade-plugin` 需要指定 Java 程序的入口，它的配置是：

```
<configuration>
    <transformers>
        <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
            <mainClass>com.itranswarp.learnjava.Main</mainClass>
        </transformer>
    </transformers>
</configuration>
```

注意，Maven 自带的标准插件例如 `compiler` 是无需声明的，只有引入其它的插件才需要声明。

下面列举了一些常用的插件：

- maven-shade-plugin：打包所有依赖包并生成可执行 jar；
- cobertura-maven-plugin：生成单元测试覆盖率报告；
- findbugs-maven-plugin：对 Java 源码进行静态分析以找出潜在问题。



## 聚合与继承

Maven 的聚合特性(aggregation)能够使项目的多个模块聚合在一起构建，而继承特性(inheritance)能够帮助抽取各模块相同的依赖、插件等配置，在简化模块配置的同时，保持各模块一致。

### **模块聚合**

随着项目越来越复杂，需要解决的问题越来越多、功能越来越重，我们更倾向于将一个项目划分几个模块并行开发，如：将 feedcenter-push 项目划分为 client、core 和 web 三个模块，而我们又想一次构建所有模块，而不是针对各模块分别执行 $ mvn 命令。于是就有了 Maven 的模块聚合，将 feedcenter-push 作为聚合模块将其他模块聚集到一起构建。

**聚合POM**

聚合模块 POM 仅仅是帮助聚合其他模块构建的工具，本身并无实质内容。

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <groupId>com.vdian.feedcenter</groupId>
    <artifactId>feedcenter-push</artifactId>
    <packaging>pom</packaging>
    <version>1.0.0.SNAPSHOT</version>

    <modules>
        <module>feedcenter-push-client</module>
        <module>feedcenter-push-core</module>
        <module>feedcenter-push-web</module>
    </modules>

</project>
```

通过在一个打包方式为 pom 的 Maven 项目中声明任意数量的 module 以实现模块聚合。

- packaging: 打包为 pom，否则无法聚合构建。
- modules: 实现聚合的核心，module 值为被聚合模块相对于聚合 POM 的相对路径，每个被聚合模块下还各自包含有 pom.xml、src/main/java、src/test/java等内容， 离开聚合 POM 也能够独立构建。

若 `<packaging>` 元素的内容是 jar，那么我们很好理解，也就是说这个项目最终会被打包成一个 jar 包，那 `<packaging>` 元素为 pom 又是什么意思呢？从字面上的意思来看，这个项目将打包成一个 pom 。我们不妨去 Maven 仓库里去瞧瞧（前提是已经在项目下运行了 mvn install 命令）。可以发现这个文件其实和项目中的 `pom.xml` 是同一个文件，这样做的目的是什么呢？上面我们说过 PO 对象也是有继承关系的，`<packaging>pom</packaging>` 的作用就在这里，这就是 Maven 中 project inheritance 的概念。当实际执行 Maven 命令的时候，会根据 project inheritance 关系对项目的 pom.xml 进行转化，得到真正执行时所用到的 `pom.xml`，即所谓的 effective pom，因此可以得到一个结论：所有 `<packaging>` 元素为 pom 的项目其实并不会输出一个可供外部使用，类似于 jar 包的东西。这类项目的作用有两个：管理子项目和管理继承属性。

**管理子项目**

例如，api 和 biz 是 echo 项目的两个 module。若没有 echo 这个父项目，我们需要到 api 和 biz 两个项目下分别执行 mvn install 命令才能完成整个构建过程，而有了 echo 这个父项目之后，我们只需在 echo 项目中执行 mvn install 即可，Maven 会解析 pom.xml，发现该项目有 api 和 biz 两个 module，它会分别到这两个项目下去执行 mvn install 命令。当 module 数量比较多的时候，能大大提高构建的效率

**管理继承属性**

比如A和B都需要某个依赖，那么在父类项目的 pom.xml 中声明即可，因为根据 PO 对象的继承关系，A和B项目会继承父类项目的依赖，这样就可以减少一些重复的输入。

effective pom 包含了当前项目的 PO 对象，直到 Super POM 对应的 PO 对象中的信息。要看一个项目的 effective pom，只需在项目中执行命令即可查看：

```
mvn help:effective-pom
```

这里顺带说一句，有的人可能不理解上面这个命令是什么意思。Maven 命令的语法为：

```
mvn [plugin-name]:[goal-name]
```

这个命令采用了缩写的形式，其全称是这样的：

```
org.apache.maven.plugins:maven-help-plugin:2.2:effective-pom
```

此命令以分号为分隔符，包含了 groupId，artifactId，version，goal 四部分。若 groupId 为 org.apache.maven.plugins 则可以使用上述的简写形式，也就是说和下面的命令是等价的：

```
mvn help:effective-pom
mvn org.apache.maven.plugins:maven-help-plugin:2.2:effective-pom
```

都是执行了 maven-help-plugin 这个 plugin 中的 effective-pom 这个 goal。

我们知道一个 plugin 中可以包含多 个goal，goal 可以绑定到 lifecycle 中的某一个 phase，这样在执行这个 phase 的时候就会调用该 goal。那些没有绑定到 phase 上的 goal 应该如何执行呢？这就是 mvn [goal(s)]

这里的 goal 也就是官方文档中所说的 standalone goal，也就是说若一个 plugin 中的某个 goal 没有和一个 phase 进行绑定，可以通过这种方式来执行。可能有的人使用过：

```
mvn dependency:tree
```

这条命令其实就是单独执行一个 goal，这个 goal 的作用是分析该工程的依赖并使用树状的形式打印出来。这里的 dependency:tree 其实是一个简写的形式，其完整形式是：

```
mvn org.apache.maven.plugins:maven-dependency-plugin:<版本号信息>:tree
```

也就是说单独执行一个 goal 的方式是：

```
mvn <groupId>:<artifactId>:<version>:<goal>
```

每次都要敲这么长一串命令是很繁琐的，因此才有了上述的简写的形式。

### **模块继承**

在面向对象中, 可以通过类继承实现复用，在 Maven 中同样也可以创建 POM 的父子结构, 通过在父 POM 中声明一些配置供子 POM 继承来实现复用与消除重复。

**父 POM**

与聚合类似，父 POM 的打包方式也是 pom，因此可以继续复用聚合模块的 POM ，这也是在开发中常用的方式：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <groupId>com.vdian.feedcenter</groupId>
    <artifactId>feedcenter-push</artifactId>
    <packaging>pom</packaging>
    <version>1.0.0.SNAPSHOT</version>

    <modules>
        <module>feedcenter-push-client</module>
        <module>feedcenter-push-core</module>
        <module>feedcenter-push-web</module>
    </modules>

    <properties>
        <finalName>feedcenter-push</finalName>
        <warName>${finalName}.war</warName>
        <spring.version>4.0.6.RELEASE</spring.version>
        <junit.version>4.12</junit.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <warExplodedDirectory>exploded/${warName}</warExplodedDirectory>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-core</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-beans</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context</artifactId>
                <version>${spring.version}</version>
            </dependency>

           <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>${junit.version}</version>
                <scope>test</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-source-plugin</artifactId>
                    <version>3.0.0</version>
                    <executions>
                        <execution>
                            <id>attach-sources</id>
                            <phase>verify</phase>
                            <goals>
                                <goal>jar-no-fork</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</project>
```

在项目中遇到一些 jar 包冲突的问题，还有很多人分不清楚 dependencies 与 **dependencyManagement** 的区别：

dependencies，即使在子项目中不写该依赖项，那么子项目仍然会从父项目中继承该依赖项（全部继承）

**dependencyManagement**，只是声明依赖，并不实现引入，因此子项目需要显示的声明需要用的依赖。如果不在子项目中声明依赖，是不会从父项目中继承下来的；只有在子项目中写了该依赖项，并且没有指定具体版本，才会从父项目中继承该项，并且 version 和 scope 都读取自父 pom。另外，如果子项目中指定了版本号，那么会使用子项目中指定的 jar 版本。

使用 **dependencyManagement** ，能让子 POM 继承父 POM 的配置的同时, 又能够保证子模块的灵活性。在父 POM 中 **dependencyManagement** 元素配置的依赖声明不会实际引入子模块中， 但能够约束子模块 dependencies 下的依赖的使用，子模块只需配置 groupId 与 artifactId。

**pluginManagement** 与 **dependencyManagement** 类似，配置的插件不会造成实际插件的调用行为，只有当子 POM 中配置了相关 plugin 元素，才会影响实际的插件行为。

**子 POM**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <parent>
        <groupId>com.vdian.feedcenter</groupId>
        <artifactId>feedcenter-push</artifactId>
        <version>1.0.0.SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>feedcenter-push-client</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-source-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

**元素继承**

可以看到，子 POM 中并未定义模块 groupId 与 version，这是因为子 POM 默认会从父 POM 继承了如下元素：

```
groupId、version
dependencies
developers and contributors
plugin lists (including reports)
plugin executions with matching ids
plugin configuration
resources 
```

因此，所有的 springframework 都省去了 version、junit还省去了scope, 而且插件还省去了 executions 与 configuration 配置，因为完整的声明已经包含在父POM中。

当依赖、插件的版本、配置等信息在父 POM 中声明之后，子模块在使用时就无须声明这些信息，也就不会出现多个子模块使用的依赖版本不一致的情况，这就降低了依赖冲突的几率。 另外，如果子模块不显式声明依赖与插件的使用，即使已经在父 POM 的 dependencyManagement、pluginManagement 中配置了，也不会产生实际的效果。

建议：模块继承与模块聚合同时进行，这意味着，你可以为自己的所有模块指定一个父工程，同时父工程中可以指定其余的 Maven 模块作为它的聚合模块。但需要遵循以下三条规则：

- 在所有子 POM 中指定它们的父 POM；
- 将父 POM 的 packaging 值设为 pom；
- 在父 POM 中指定子模块/子POM的目录；

parent元素内还包含一个 relativePath 元素, 用于指定父 POM 的相对路径，默认../pom.xml