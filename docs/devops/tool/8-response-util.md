---
title: 接口通用 Response
date: 2023-07-28
---

## 响应对象

包含 code 和 message

```java
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCode {

    private String code;
    private String message;

}
```

## 枚举值

```java
@Getter
@AllArgsConstructor
public enum GlobalResponseEnum implements Responsive {

    SUCCESS(new ResponseCode("00000", "操作成功")),
    SERVICE_ERROR(new ResponseCode("A0001", "用户端错误")),
    SERVER_ERROR(new ResponseCode("B0001", "服务端错误")),
    THIRD_PARTY_SERVICE_ERROR(new ResponseCode("C0001", "调用第三方服务出错")),
    FAILED(new ResponseCode("99999", "操作失败"));

    private final ResponseCode response;

}
```

## 异常类

```java
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public final class ServiceException extends RuntimeException implements Responsive {


    private final ResponseCode response;

    public ServiceException(String code, String message) {
        this.response = new ResponseCode(code, message);
    }

    public <E extends Responsive> ServiceException(E e) {
        this.response = e.getResponse();
    }

    @Override
    public ResponseCode getResponse() {
        return response;
    }
}
```

```java
public class ExceptionUtil {

    public static RuntimeException service(Responsive responsive) {
        return new ServiceException(responsive);
    }
    public static RuntimeException service(ResponseCode errorCode) {
        return new ServiceException(errorCode);
    }

    public static RuntimeException service(Supplier<ResponseCode> supplier) {
        return service(supplier.get());
    }

    public static RuntimeException service() {
        return service(GlobalResponseEnum.SERVICE_ERROR);
    }
}
```

## 全局捕获

```java
@Slf4j
@Order(-1000)
@RestControllerAdvice
public class WebMvcExceptionHandler {

    @Value("${spring.application.name}")
    private String applicationName;

    /**
     * 捕获任意异常
     *
     * @param e 异常
     * @return R
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public R<String> handleException(Exception e) {
        log.error("返回异常服务：{}, exception: {}", applicationName, e.getMessage(), e);
        return R.fail(e.getLocalizedMessage());
    }

    /**
     * 业务异常
     *
     * @param e 异常
     * @return R
     */
    @ExceptionHandler({ServiceException.class, ServerException.class, ThirdPartyServiceException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public <T extends Responsive> R<String> handleServiceException(T e) {
        log.error("业务异常，Exception: {}", e.getMessage());
        return R.build(e.getCode(), e.getMessage(), null);
    }

}
```

## 响应体封装

```java
@Data
@Builder
public class R<T> implements Serializable{

    /**
     * 13 时间戳
     */
    private Long timestamp;

    /**
     * 状态码
     */
    private String code;

    /**
     * 响应信息
     */
    private String message;

    /**
     * 响应数据
     */
    private T data;

    public static <T> R<T> build(String code, String message, T data) {
        return R.<T>builder()
                .timestamp(Instant.now().toEpochMilli())
                .code(code)
                .message(message)
                .data(data)
                .build();
    }

    public static <T> R<T> build(ResponseCode responseCode, T data) {
        return R.<T>builder()
                .timestamp(Instant.now().toEpochMilli())
                .code(responseCode.getCode())
                .message(responseCode.getMessage())
                .data(data)
                .build();
    }

    public static <T> R<T> ok() {
        return ok(null);
    }

    public static <T> R<T> ok(T data) {
        return R.build(GlobalResponseEnum.SUCCESS.getCode(),
                GlobalResponseEnum.SUCCESS.getMessage(),
                data);
    }

    public static <T> R<T> fail(String message) {
        return fail(message, null);
    }

    public static <T> R<T> fail(String message, T data) {
        return R.build(GlobalResponseEnum.FAILED.getCode(), message, data);
    }
}
```

## 使用案例

```java
# hutool 的 Assert，第一个参数为表达式，第二个参数为一个返回异常示例的函数式接口；断言不通过，会抛出异常并被捕获

Assert.isTrue(user.getId().equals(id), () -> ExceptionUtil.service(USER_USERNAME_EXISTS));
```

