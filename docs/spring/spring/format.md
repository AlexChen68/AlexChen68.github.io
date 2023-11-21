---
title: Spring 格式转换
date: 2023-11-20
order: 101
---

# Spring 格式转换

## 简介

在 Spring 中的参数格式转换，通常分两种情况：

- 以非 Json 格式的参数形式接收参数，然后使用 `Convert` 转换；
- 以 Json 格式传递，然后以对象接收，中间由 `Jackson` 进行反序列化化；返回前端时再序列化。

## 基于注解的时间格式转换

### @DateTimeFormat

`@DateTimeFormat` 是 Spring 框架中用于处理日期和时间格式的注解。它可以应用于类的字段或方法上，**用于指定日期和时间的输入和输出格式**。

适用情况：

- 接收**非 Json** 格式的请求参数时，可以使用 `@DateTimeFormat` 注解来解析传入的日期和时间字符串，并将其转换为对应的 Java 对象，比如：用 Date 接收 String。

:::warning 注意：
如果使用了 `@DateTimeFormat` 指定了转换的格式，那么请求的参数字符串必须符合指定的格式，否则会报无法转换错误。
:::

### @JsonFormat

`@JsonFormat`: 添加了该注解的类，在序列化和反序列化 JSON 数据时，日期和时间按照指定的格式和时区进行处理。

比如：

```java
/**
 * 用于进行序列化和反序列化时，将时间按照指定的格式返回
 */
@JsonFormat(pattern = "yyyy 年 MM 月 dd 日")
private Date birthday;
```

上面的代码可以让该字段在返回给前端时使用指定的格式。

:::tip 总结：
- 不使用 RequestBody 传参数，`@DateTimeFormat` 会生效，要求输入格式为指定格式。`@JsonFormat` 会在响应数据时生效（如果是以 Json 格式响应的话）。
- 使用 RequestBody 传参数时，`@JsonFormat` 会生效，要求输入格式和输出格式（如果是以 Json 格式响应的话）为指定格式，
:::

## 全局定义时间转换格式

> 参考文章：https://zhuanlan.zhihu.com/p/610989565

- 引入依赖：

```xml
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
</dependency>
```

- 自定义 Jackson 配置类：

```java
@Configuration
@ConditionalOnClass(ObjectMapper.class)
@AutoConfigureBefore(JacksonAutoConfiguration.class)
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class DateTimeConfiguration {

    /**
     * 时区
     */
    private static final String ASIA_SHANGHAI = "Asia/Shanghai";
    /**
     * 默认日期时间格式
     */
    private static final String DateTimeFormatPattern = "yyyy-MM-dd HH:mm:ss";
    /**
     * 默认日期格式
     */
    private static final String DateFormatPattern = "yyyy-MM-dd";
    /**
     * 默认时间格式
     */
    private static final String TimeFormatPattern = "HH:mm:ss";

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer jacksonCustomizer() {
        return builder -> {
            // 设置 java.util.Date 时间类的序列化以及反序列化的格式
            builder.simpleDateFormat(DateTimeFormatPattern);
            builder.locale(Locale.CHINA);
            builder.timeZone(TimeZone.getTimeZone(ASIA_SHANGHAI));

            // JSR 310 日期时间处理
            JavaTimeModule javaTimeModule = new JavaTimeModule();

            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DateTimeFormatPattern);
            javaTimeModule.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(dateTimeFormatter));
            javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(dateTimeFormatter));

            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern(DateFormatPattern);
            javaTimeModule.addSerializer(LocalDate.class, new LocalDateSerializer(dateFormatter));
            javaTimeModule.addDeserializer(LocalDate.class, new LocalDateDeserializer(dateFormatter));

            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern(TimeFormatPattern);
            javaTimeModule.addSerializer(LocalTime.class, new LocalTimeSerializer(timeFormatter));
            javaTimeModule.addDeserializer(LocalTime.class, new LocalTimeDeserializer(timeFormatter));

            builder.modules(javaTimeModule);

            // 全局转化 Long 类型为 String，解决序列化后传入前端 Long 类型精度丢失问题
            builder.serializerByType(BigInteger.class, ToStringSerializer.instance);
            builder.serializerByType(Long.class, ToStringSerializer.instance);
        };
    }

}
```

:::tip 说明：
上面的配置，指定了 Jackson 在使用 LocalDateTime、LocalDate、LocalTime 类型对时间进行序列化和反序列化时使用的格式。

Spring Boot 会收集容器里面所有的 Jackson2ObjectMapperBuilderCustomizer 实现类，统一对 Jackson2ObjectMapperBuilder 进行设置，从而实现定制 ObjectMapper。因此，如果我们想个性化定制 ObjectMapper，只需要实现 Jackson2ObjectMapperBuilderCustomizer 接口并注册到容器就可以了。
:::

## 时间戳转时间

上面的配置实现的是字符串格式的时间转换，有时我们在与前端传递时间时，都使用时间戳格式，我们可以自定义序列化和反序列化格式，来达到自动转换。

```java
@Configuration
@ConditionalOnClass(ObjectMapper.class)
@AutoConfigureBefore(JacksonAutoConfiguration.class)
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class DateTimeConfiguration {

    /**
     * 时区
     */
    private static final String ASIA_SHANGHAI = "Asia/Shanghai";
    /**
     * 默认日期时间格式
     */
    private static final String DateTimeFormatPattern = "yyyy-MM-dd HH:mm:ss";
    /**
     * 默认日期格式
     */
    private static final String DateFormatPattern = "yyyy-MM-dd";
    /**
     * 默认时间格式
     */
    private static final String TimeFormatPattern = "HH:mm:ss";

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer jacksonCustomizer() {
        return builder -> {
            // 设置 java.util.Date 时间类的序列化以及反序列化的格式
            builder.simpleDateFormat(DateTimeFormatPattern);
            builder.locale(Locale.CHINA);
            builder.timeZone(TimeZone.getTimeZone(ASIA_SHANGHAI));

            // JSR 310 日期时间处理
            JavaTimeModule module = new JavaTimeModule();
            // LocalDateTime
            // DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DateTimeFormatPattern);
            // module.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(dateTimeFormatter));
            // module.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(dateTimeFormatter));

            // LocalDate
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern(DateFormatPattern);
            module.addSerializer(LocalDate.class, new LocalDateSerializer(dateFormatter));
            module.addDeserializer(LocalDate.class, new LocalDateDeserializer(dateFormatter));
            // LocalTime
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern(TimeFormatPattern);
            module.addSerializer(LocalTime.class, new LocalTimeSerializer(timeFormatter));
            module.addDeserializer(LocalTime.class, new LocalTimeDeserializer(timeFormatter));

            builder.modules(module);

            // 全局转化 Long 类型为 String，解决序列化后传入前端 Long 类型精度丢失问题
            builder.serializerByType(BigInteger.class, ToStringSerializer.instance);
            builder.serializerByType(Long.class, ToStringSerializer.instance);

            // 设置 LocalDateTime 在序列化时，转换为时间戳
            builder.serializerByType(LocalDateTime.class, new TimestampLocalDateTimeSerializer());
            // 设置 LocalDateTime 在反序列化时，从时间戳转为 LocalDateTime
            builder.deserializerByType(LocalDateTime.class, new TimestampLocalDateTimeDeserializer());
        };
    }

    /**
     * 序列化时间戳
     */
    public static class TimestampLocalDateTimeSerializer extends JsonSerializer<LocalDateTime> {
        @Override
        public void serialize(LocalDateTime value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
            if (value != null) {
                long timestamp = LocalDateTimeUtil.toEpochMilli(value);
                gen.writeNumber(timestamp);
            }
        }
    }

    /**
     * 反序列化时间戳
     */
    public static class TimestampLocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {
        @Override
        public LocalDateTime deserialize(JsonParser p, DeserializationContext deserializationContext) throws IOException {
            long timestamp = p.getValueAsLong();
            if (timestamp > 0) {
                return LocalDateTimeUtil.of(timestamp, ZoneOffset.of("+8"));
            } else {
                throw new IllegalArgumentException("Cannot deserialize value, receive only 13 bit timestamp");
            }
        }
    }

}
```

:::tip 
- `LocalDateTimeUtil` 为 hutool 提供的工具，可以替换为自己的实现
:::