---
title: 1.4 验证, 数据绑定和类型转换
article: true
date: 2022-10-16
tag: [Spring,Validation]
category: [Spring]
isOriginal: true
description: 验证, 数据绑定和类型转换
---

## 数据验证

Spring 提供了 `Validator` 接口用来进行对象的数据验证。`Validator` 接口在进行数据验证的时候会要求传入一个 `Errors` 对象，当有错误产生时会将错误信息放入该对象。

`Validator` 接口：

```java
public interface Validator {
    boolean supports(Class<?> clazz);

    void validate(Object target, Errors errors);
}
```

Spring 提供了 `ValidationUtils` 工具类用来在数据验证错误时，封装错误信息返回。

## 数据绑定

### BeanWrapper

`org.springframework.beans` 包的 `BeanWrapper` 类是 Bean 的包装器，它的主要工作，就是对任何一个bean，进行属性（包括内嵌属性）的设置和方法的调用，`BeanWrapper` 的默认实现类是 `BeanWrapperImpl`。

设置和获取属性是通过使用 `BeanWrapper`的 `setPropertyValue`和 `getPropertyValues` 方法完成的。

JavaBeans 规范具有指示对象属性的约定：

| Expression             | Explanation                                                  |
| :--------------------- | :----------------------------------------------------------- |
| `name`                 | 表示属性 `name` 与 `getName()` 或 `isName()` 和 `setName(..)` 方法相对应 |
| `account.name`         | 表示 `account` 属性的嵌套属性 `name` 与 `getAccount().setName()` 或 `getAccount().getName()` 相对应. |
| `account[2]`           | 表示索引属性 `account` 的第_3_个属性. 索引属性可以是 `array`, `list`， 其他自然排序的集合. |
| `account[COMPANYNAME]` | 表示映射属性 `account` 是键为 `COMPANYNAME` 的值.            |

使用示例：

Company 类

```java
public class Company {

    private String name;
    private Employee managingDirector;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Employee getManagingDirector() {
        return this.managingDirector;
    }

    public void setManagingDirector(Employee managingDirector) {
        this.managingDirector = managingDirector;
    }
}
```

Employee 类

```java
public class Employee {

    private String name;

    private float salary;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getSalary() {
        return salary;
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }
}
```

属性设置示例

```java
BeanWrapper company = new BeanWrapperImpl(new Company());
// setting the company name..
company.setPropertyValue("name", "Some Company Inc.");
// ... can also be done like this:
PropertyValue value = new PropertyValue("name", "Some Company Inc.");
company.setPropertyValue(value);

// ok, let's create the director and tie it to the company:
BeanWrapper jim = new BeanWrapperImpl(new Employee());
jim.setPropertyValue("name", "Jim Stravinsky");
company.setPropertyValue("managingDirector", jim.getWrappedInstance());

// retrieving the salary of the managingDirector through the company
Float salary = (Float) company.getPropertyValue("managingDirector.salary");
```

### PropertyEditor 简介

Spring 使用 `PropertyEditor`的概念来实现 Object 和 String 的转换，简单说就是字符串和其他对象的类型转换器，通过setAsText设置，再通过getValue获取转换值。

`PropertyEditor` 位于 JDK 的扩展包 **rt.jar** 的 `java.beans` 包中，其子类 `PropertyEditorSupport` 提供了默认的实现，Spring 中提供了很多不同类型的 PropertyEditor 实现都继承了 `PropertyEditorSupport`。

在 Spring 中使用属性编辑的几个示例:

- 通过使用 `PropertyEditor` 实现来设置bean的属性. 当您使用 `java.lang.String` 作为您在 XML 文件中声明的某个 bean 的属性的值时, Spring 将(如果相应属性的 setter 具有类参数) 使用 `ClassEditor` 尝试将参数解析为类对象.
- 在 Spring 的 MVC 框架中解析 HTTP 请求参数是通过使用各种 `PropertyEditor` 实现来完成的，您可以在 `CommandController` 的所有子类中手动绑定它们。

Spring 内置了许多 `PropertyEditor` 用于简化处理。 它们都位于 `org.springframework.beans.propertyeditors` 包中。大多数(但不是全部，如下表所示) 默认情况下由 `BeanWrapperImpl` 注册。 当属性编辑器以某种方式进行配置时，开发者仍可以注册自定义的变体用于覆盖默认的变量。 下表描述了 Spring 提供的各种 `PropertyEditor` 实现:

| 类                        | 说明                                                         |
| :------------------------ | :----------------------------------------------------------- |
| `ByteArrayPropertyEditor` | 字节数组的编辑器。 将字符串转换为其对应的字节表示形式。 `BeanWrapperImpl` 默认注册。 |
| `ClassEditor`             | 将表示类的字符串解析为实际的类，反之亦然。 找不到类时，抛出 `IllegalArgumentException`。 默认情况下，由 `BeanWrapperImpl` 注册。 |
| `CustomBooleanEditor`     | `Boolean` 属性的可自定义属性编辑器。 默认情况下，由 `BeanWrapperImpl` 注册，但可以通过将其自定义实例注册为自定义编辑器来覆盖。 |
| `CustomCollectionEditor`  | `Collection` 的属性编辑器，将任何源 `Collection` 转换为给定的目标 `Collection` 类型。 |
| `CustomDateEditor`        | `java.util.Date` 的可自定义属性编辑器，支持自定义 `DateFormat`. 默认未注册。 必须根据需要使用适当的格式进行用户注册。 |
| `CustomNumberEditor`      | 任何 `Number` 子类的可自定义属性编辑器，例如 `Integer`， `Long`， `Float` 或 `Double`。 默认情况下，由 `BeanWrapperImpl` 注册，但可以通过将其自定义实例注册为自定义编辑器来覆盖。 |
| `FileEditor`              | 将字符串解析为 `java.io.File` 对象。 默认情况下，由 `BeanWrapperImpl` 注册。 |
| `InputStreamEditor`       | 单向属性编辑器，可以获取字符串并生成(通过中间 `ResourceEditor` 和 `Resource`) `InputStream`，以便 `InputStream` 属性可以直接设置为字符串。 请注意，默认用法不会为您关闭 `InputStream`. 默认情况下，由 `BeanWrapperImpl` 注册。 |
| `LocaleEditor`            | 可以将字符串解析为 `Locale` 对象，反之亦然(字符串格式为 `*[country]*[variant]`，与 `Locale` 的 `toString()` 方法相同) 。 默认情况下，由 `BeanWrapperImpl` 注册。 |
| `PatternEditor`           | 可以将字符串解析为 `java.util.regex.Pattern` 对象，反之亦然。  |
| `PropertiesEditor`        | 可以将字符串(使用 `java.util.Properties` 类的 javadoc 中定义的格式进行格式化) 转换为 `Properties` 对象。 默认情况下，由 `BeanWrapperImpl` 注册。 |
| `StringTrimmerEditor`     | 修剪字符串的属性编辑器。 (可选) 允许将空字符串转换为 `null`。 默认情况下未注册 - 必须是用户注册的。 |
| `URLEditor`               | 可以将URL的字符串表示形式解析为实际的 `URL` 对象。 默认情况下，由 `BeanWrapperImpl` 注册。 |

### 自定义 PropertyEditor

可以通过直接实现 `PropertyEditor` 接口或者继承 `PropertyEditorSupport`类实现自定义的 PropertyEditor 实现。一个 TimeZoneEditor 示例如下：

```java
public class TimeZoneEditor extends PropertyEditorSupport {

	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (StringUtils.hasText(text)) {
			text = text.trim();
		}
		setValue(StringUtils.parseTimeZoneString(text));
	}

	@Override
	public String getAsText() {
		TimeZone value = (TimeZone) getValue();
		return (value != null ? value.getID() : "");
	}

}
```

在 Spring 中实现自定义的 PropertyEditor 后，还需要将自定义的 PropertyEditor 注测到 Spring 容器中。

### 注册 PropertyEditor

#### 使用 `PropertyEditorRegistrar`

使用 Spring 容器注册属性编辑器的一个策略是创建和使用 `PropertyEditorRegistrar`，`PropertyEditorRegistrar` 与另外一个称为 `PropertyEditorRegistry` 的接口一起工作。

`org.springframework.beans.PropertyEditorRegistry` 是 Spring 中的 `PropertyEditor` 注册器接口，通过 `registerCustomEditor` 方法，可以将适用某一对象类型的 PropertyEditor 实现类注册到 Spring 中，`PropertyEditorRegistrySupport` 是其默认实现。

```java
public final class CustomPropertyEditorRegistrar implements PropertyEditorRegistrar {

    public void registerCustomEditors(PropertyEditorRegistry registry) {
        registry.registerCustomEditor(ExoticType.class, new ExoticTypeEditor());
    }
}
```

#### 使用 `CustomEditorConfigurer`

通过 `customEditorConfigurer` 配置类的 `setCustomEditors` 方法，可以以 Map 的形式，注册 PropertyEditor 的实现类：

```java
@Bean
public CustomEditorConfigurer customEditorConfigurer() {
    CustomEditorConfigurer configurer = new CustomEditorConfigurer();
    Map<Class<?>, Class<? extends PropertyEditor>> editors = new HashMap<>();
    editors.put(URL.class, URLEditor.class);
    configurer.setCustomEditors(editors);
    return configurer;
}
```

还可以使用 `customEditorConfigurer` 注册 `PropertyEditorRegistrar` 实例：

```java
@Bean
public CustomPropertyEditorRegistrar customPropertyEditorRegistrar() {
    return new CustomPropertyEditorRegistrar();
}

@Bean
public CustomEditorConfigurer customEditorConfigurer() {
    CustomEditorConfigurer configurer = new CustomEditorConfigurer();
    configurer.setPropertyEditorRegistrars(new PropertyEditorRegistrar[]{customPropertyEditorRegistrar()});
    return configurer;
}
```

## 类型转换









































