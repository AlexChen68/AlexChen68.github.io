---
title: MapStruct 对象转换工具
category: 开发工具
icon: java
tag: MapStruct 
date: 2023-05-29
---

## 什么是 MapStruct?

MapStruct 是基于 `JSR 269` 的 Java 注释处理器，用于生成类型安全的 `Bean` 映射类。

您所要做的就是定义一个映射器接口，该接口声明任何所需的映射方法。在**编译**过程中，MapStruct 将生成此接口的实现。此实现使用纯 Java 方法调用在源对象和目标对象之间进行映射，即无反射或类似内容。

与手动编写映射代码相比，MapStruct 通过生成繁琐且容易出错的代码来节省时间。遵循配置方法的约定，MapStruct 使用合理的默认值，但在配置或实现特殊行为时会步入歧途。

## 使用案例

### Maven 配置

```xml
<properties>
    <org.mapstruct.version>1.5.5.Final</org.mapstruct.version>
</properties>
...
<dependencies>
    <dependency>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct</artifactId>
        <version>${org.mapstruct.version}</version>
    </dependency>
</dependencies>
...
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.mapstruct</groupId>
                        <artifactId>mapstruct-processor</artifactId>
                        <version>${org.mapstruct.version}</version>
                    </path>
                </annotationProcessorPaths>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### 使用 `@Mapper` 定义转换接口

在定义转换接口之前，我们先准备两个实体类：

```java
@Data
public class User {
    
    private Integer id;
    
    private String username;
    
    private Integer age;
}

@Data
public class UserVO {

    private Integer id;

    private String name;

    private Integer age;
}
```

然后，通过 `@Mapper` 定义一个转换器接口，里面的方法可以定义需要转换的两个类的类型，并且如果字段名称不同，还可以通过 `@Mapping` 做字段映射，如下所示：

```java
import org.mapstruct.Mapper; 
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source ="name",target = "username")
    User userVOToUser(UserVO userVO);

}
```

:::tip
注意引入的 Mapper 不要和和 Mybatis 的 Mapper 搞混了
:::

`MapStruct` 会为上述的 `UserMapper` 添加一个实现类 `UserMapperImpl`, 并且在其中通过 `set()` 将 `UserVO` 的属性赋值给 `User` 的属性，并返回一个 `User` 对象。

### 使用 Mapper

我们获取 Mapper 对象通常有两种方式，一种是上面所示的，通过 `Mappers.getMapper(Class clazz)` 来获取指定类型的 Mapper 对象，这种方法需要每个 Mapper 都定义一个类似的 `INSTANCE` 实例供使用者调用，这在 Spring 框架下是不方便的。

因此，MapStruct 还提供一个基于依赖注入的方法，可以将 Mapper 实例注入到 Spring 容器中，需要的时候，直接通过 `@Resource` 注入即可。

上面的 UserMapper 可以改为：

```java
import org.mapstruct.Mapper; 
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    @Mapping(source ="name",target = "username")
    User userVOToUser(UserVO userVO);

}
```

使用的时候，可以直接注入：

```java
public class client {

   @Resource
   UserMapper useMapper;

   // ...
}
```

## 与 Lombok 冲突

由于 MapStruct 是在编译过程时，通过增加实现类，在实现类中通过 set 方法实现对象类型转换的，需要添加 `maven-compiler-plugin` 编译插件，并添加 `mapstruct-processor` 的注解处理组件，它可以根据注解自动生成 mapstruct 的 mapperImpl 类。

编译时，这个注解处理组件可能会和 Lombok 插件冲突，如果冲突了，针对这个问题，官方给了解决办法：[Can I use MapStruct together with Project Lombok?](https://mapstruct.org/faq/#Can-I-use-MapStruct-together-with-Project-Lombok)

高版本 MapStruct 和 Lombok 解决方案示例：

```xml
<properties>
   <org.mapstruct.version>1.5.5.Final</org.mapstruct.version>
   <org.projectlombok.version>1.18.20</org.projectlombok.version>
   <lombok-mapstruct-binding.version>0.2.0</lombok-mapstruct-binding.version>
</properties>


<plugin>
   <groupId>org.apache.maven.plugins</groupId>
   <artifactId>maven-compiler-plugin</artifactId>
   <version>3.8.1</version>
   <configuration>
      <source>1.8</source>
      <target>1.8</target>
      <annotationProcessorPaths>
            <path>
               <groupId>org.mapstruct</groupId>
               <artifactId>mapstruct-processor</artifactId>
               <version>${org.mapstruct.version}</version>
            </path>
            <path>
               <groupId>org.projectlombok</groupId>
               <artifactId>lombok</artifactId>
               <version>${org.projectlombok.version}</version>
            </path>
            <path>
               <groupId>org.projectlombok</groupId>
               <artifactId>lombok-mapstruct-binding</artifactId>
               <version>${lombok-mapstruct-binding.version}</version>
            </path>
      </annotationProcessorPaths>
   </configuration>
</plugin>
```

## 参考资料

- [MapStruct 1.5.5.Final Reference Guide](https://mapstruct.org/documentation/stable/reference/html/)
- [高效、优雅的对象 copy 之 MapStruct 入门到精通，实战踩坑版](https://www.cnblogs.com/wang1221/p/17118519.html)
- [mapstruct 引入不生效：解决 mapstruct 与 lombok 二者版本冲突问题](https://blog.csdn.net/iijik55/article/details/126434952)