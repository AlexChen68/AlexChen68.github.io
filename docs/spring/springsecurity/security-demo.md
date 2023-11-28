---
title: Spring Security 实践
date: 2023-11-23
order: 10
---

# Spring Security 实践

## 准备工作

1. 创建一个 SpringBoot 项目

2. 添加依赖

```xml
<!-- spring security -->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<!-- web -->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

3. 创建一个 controller，用于测试

```java
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
}
```

4. 配置端口

```yml
server:
  port: 9000
```


## 表单登陆

### spring security 默认配置

- 在未配置任何 spring security 配置项时，启动 springboot 项目，在控制台会输出一个 uuid 作为默认的密码（默认用户名为：user）。

示例：

```bash
Using generated security password: 05492df7-3f1f-4ec9-b1d6-db24cb8eab2e
```

这意味着，你不需要配置什么东西，spring security 会自动配置，当你访问系统的接口时，**未登陆用户**会被重定向到 `/login` 界面进行登陆。

试着访问 `http://localhost:9000/hello`，会被重定向到一个默认的登陆界面（可能由于网络原因，无法下载 css 文件）；使用用户名 user 和生成的密码登陆后，会在 cookie 中存储一个 JSESSIONID。

登陆成功后，会重定向到之前访问的 `hello` 接口，返回 "hello"。

- 使用自定义的用户和密码

在 `application.yml` 中，添加 `spring security` 的配置，可以配置默认的用户名和密码

```yaml
spring:
  security:
    user:
      name: admin
      password: 123456
```

重启应用，再次访问 `http://localhost:9000/hello`，输入配置的帐号和密码测试。



## Basic 认证

> Basic 认证是一种 HTTP 认证协议，用于在客户端和服务器之间进行身份验证。它是一种简单的基于用户名和密码的认证机制，被广泛用于 Web 应用程序和 API 的安全访问控制。

在 Basic 认证中，客户端发送一个 HTTP 请求到服务器，并在请求头中包含一个 `Authorization` 字段。该字段包含了经过 Base64 编码的用户名和密码组合，格式为 `username:password`，例如：`--header 'Authorization: Basic YWRtaW46MTIzNDU2'`

服务器收到请求后，解码 Authorization 字段，然后验证提供的用户名和密码是否与其记录的凭据匹配。

Spring Security 开启 Basic 参考：[Basic 认证](https://springdoc.cn/spring-security/servlet/authentication/passwords/basic.html)。

### 配置开启 Basic 认证

```java
@Bean
@Order(Ordered.HIGHEST_PRECEDENCE)
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
   // 开启 Basic 认证
   http.httpBasic(withDefaults());
   return http.build();
}
```

重启应用，按下图的配置请求，请求通过会响应结果。

![spring-security-2023-11-24-17-06-11](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/spring-security-2023-11-24-17-06-11.png)

## 密码编码器

通常，为了安全考虑，我们不会直接在数据库存储明文密码，而是存储加密后的密码；在用户登陆时，将用户的明文密码使用同一个编码器进行加密，然后比对加密后的密文是否匹配即可。

Spring Security 提供了多种加密方式的密码编码器，你也可以通过实现 `PasswordEncoder` 接口来自定义密码编码器。常用编码器有：

- `NoOpPasswordEncoder`: 直接使用明文密码，也是默认的编码器，通常只有在简单测试时使用，生产上不使用。
- `BCryptPasswordEncoder`: 使用广泛支持的 bcrypt 算法对密码进行散列。
- `DelegatingPasswordEncoder`: 一个委托代理编码器，`PasswordEncoderFactories` 这个工厂的静态构造方法把常用的几种密码方案都注入到了缓存 Map 中，默认注入的 encodingId 对应的是 BCryptPasswordEncoder 加密方案，这样系统就可以达到在新存储密码可以使用 BCrypt Password Encoder 加密方案进行加密，但是对于数据库里面以前用其他方式加密的密码也支持比对。

```java
public static PasswordEncoder createDelegatingPasswordEncoder() {
   String encodingId = "bcrypt";
   Map<String, PasswordEncoder> encoders = new HashMap();
   encoders.put(encodingId, new BCryptPasswordEncoder());
   encoders.put("ldap", new LdapShaPasswordEncoder());
   encoders.put("MD4", new Md4PasswordEncoder());
   encoders.put("MD5", new MessageDigestPasswordEncoder("MD5"));
   encoders.put("noop", NoOpPasswordEncoder.getInstance());
   encoders.put("pbkdf2", Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_5());
   encoders.put("pbkdf2@SpringSecurity_v5_8", Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8());
   encoders.put("scrypt", SCryptPasswordEncoder.defaultsForSpringSecurity_v4_1());
   encoders.put("scrypt@SpringSecurity_v5_8", SCryptPasswordEncoder.defaultsForSpringSecurity_v5_8());
   encoders.put("SHA-1", new MessageDigestPasswordEncoder("SHA-1"));
   encoders.put("SHA-256", new MessageDigestPasswordEncoder("SHA-256"));
   encoders.put("sha256", new StandardPasswordEncoder());
   encoders.put("argon2", Argon2PasswordEncoder.defaultsForSpringSecurity_v5_2());
   encoders.put("argon2@SpringSecurity_v5_8", Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8());
   return new DelegatingPasswordEncoder(encodingId, encoders);
}
```

在 SpringSecurity 中，我们通常使用 Java 配置来注册一个编码器实例，比如：

```java
@Bean
public PasswordEncoder passwordEncoder() {
   return PasswordEncoderFactories.createDelegatingPasswordEncoder();
}
```

在使用了密码编码之后，如果你的用户信息存储到数据库，那么相应的密码也要存储为加密后的密文，以防止数据库被入侵后用户密码泄漏。

## 自定义 UserDetailsService

通常我们只有在简单测试时将用户信息保存在应用内存中，生产上会存储到数据库中，比如 Mysql，那么我们就需要根据用户的输入，从数据库找到对应的用户信息进行比对，来确定用户是否有权限访问应用。

我们可以通过实现 Spring Security 的 `UserDetailsService` 接口，重写 `loadUserByUsername` 方法来实现自己的逻辑。比如：

```java
@Component
public class CustomUserDetailService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("CustomUserDetailService - loadUserByUsername");
        if (username == null || !username.equals("admin")) {
            throw new UsernameNotFoundException("用户名 " + username + " 不存在");
        }
        String encodePassword = new BCryptPasswordEncoder().encode("123456");
        return new User(username, encodePassword, AuthorityUtils.createAuthorityList("ROLE_ADMIN"));
    }
}
```

如果只有一个 `UserDetailsService` 实现，你可以通过 `@Component` 或者 Java 配置注册到 Spring 容器中，让 Spring Security 采用你的自定义实现；如果有多个，你可能会实现自己的 `AuthenticationProvider`，每个 `AuthenticationProvider` 使用对应的 `UserDetailsService` 实现。