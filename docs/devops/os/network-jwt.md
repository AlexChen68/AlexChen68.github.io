---
title: JSON Web Token 入门教程
date: 2023-05-19
order: 22
---

# JSON Web Token 入门教程

## 什么是 JWT？

什么是 JWT？官方的定义是：

> JSON Web Token (JWT) 是一个开放标准 (RFC 7519)，它定义了一种紧凑的、自包含的方式，用于作为 JSON 对象在各方之间安全地传输信息。该信息可以被验证和信任，因为它是数字签名的。

## JWT 的构成

JWT 由三部分组成，中间使用句点 `.` 连接，即整体结构为 **`Header.Payload.Signature`**，这三个部分都是由 base64 编码的，这么做的目的是为了保证 url 中安全的传输。这三部分包含了不同的信息：

- Header 头部信息，主要声明了 JWT 的签名算法等信息。
- Payload 载荷信息，主要承载了各种声明并传递明文数据。
- Signature 签名，拥有该部分的 JWT 被称为 JWS，也就是签了名的 JWS，用于校验数据。

第一部分 header 中是由两部分信息组成，即声明类型为 jwt 和声明加密的算法（例如 HS256），所以说 header 在 base64URL 编码之前是如下的 JSON：

```json
{
  "alg": "HS256",
  "typ": "jwt"
}
```

*base64URL* 编码之后为：

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
```

第二部分 payload 是存放想要**传递的信息**，用来存放实际需要传递的数据。JWT 规定了 7 个官方字段，供选用。

> - iss (issuer)：签发人
> - exp (expiration time)：过期时间
> - sub (subject)：主题
> - aud (audience)：受众
> - nbf (Not Before)：生效时间
> - iat (Issued At)：签发时间
> - jti (JWT ID)：编号


此外，你可以在这部分自定义数据，例如 id、username、phone 在 *base64URL* 编码之前是如下的 JSON:

```json
{
  "id": "1024",
  "username": "alexchen",
  "phone": 18388888888
}
```

*base64URL* 编码之后为：

```json
eyJpZCI6MTAyNCwibmFtZSI6ImFsZXhjaGVuIiwicGhvbmUiOiIxODM4ODg4ODg4OCJ9
```

第三部分 `Signature` 最是关键，它的组成原理是：
  1. 将 `header` 和 `payload` 分别使用 *base64URL* 编码之后的结果组合到一起（通过 `.` 连接）；
  2. 添加一个只有服务器知道的**签名字符串**；
  3. 再使用 `header` 中的签名算法 *SHA256* 加密步骤 1、2。可以看成下面的公式：

```
Signature = SHA256(base64encode(header) + '.' + base64encode(payload), 'SEVER_SECRET_KEY')
```

最终得到第三部分的签名串：

```
0L2DzZz682cRh9WRb9S4GkcwXVWLAv9xeJFmGtIw-D4
```

最终将上面三部分通过 `.` 合并，得到最终的 JWT 串：

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAyNCwibmFtZSI6ImFsZXhjaGVuIiwicGhvbmUiOiIxODM4ODg4ODg4OCJ9.0L2DzZz682cRh9WRb9S4GkcwXVWLAv9xeJFmGtIw-D4
```

## JWT 安全性分析

在互联网中，通过 Http 协议传输数据主要有两大安全性危险：

- 数据被窥探：通过敏感数据加密解决
- 数据被篡改：通过数据加签和验签解决

JWT 通过对三部分数据进行加密，来防止直接明文传输，但是这不意味着安全，因为仍然可以通过技术手段解密，只是成本问题而已。

因此在 `payload` 部分传输明文敏感信息 (例如密码) 依然是不安全，可以通过对敏感信息进行不可逆加密，与数据库中使用同样算法的不可逆加密后的密文进行比较来达到验证敏感信息的功能。

另一方面，JWT 通过在第三部分增加签名，使用仅服务端存在的**签名字符串**，对 `head` 和 `payload` 部分进行加密，在服务端通过**签名字符串**解密签名并第一、二部分的 `head` 和 `payload` 进行比较，可以防止别人解密了 `head` 和 `payload` 后进行数据篡改。

## 应用场景

下列场景中使用 JSON Web Token 是很有用的：

- Authorization (授权) : 这是使用 JWT 的最常见场景。一旦用户登录，后续每个请求都将包含 JWT，允许用户访问该令牌允许的路由、服务和资源。单点登录是现在广泛使用的 JWT 的一个特性，因为它的开销很小，并且可以轻松地跨域使用。

- Information Exchange (信息交换) : 对于安全的在各方之间传输信息而言，JSON Web Tokens 无疑是一种很好的方式。因为 JWT 可以被签名，例如，用公钥/私钥对，你可以确定发送人就是它们所说的那个人。另外，由于签名是使用头和有效负载计算的，您还可以验证内容没有被篡改。

## JWT 的使用方式

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息 `Authorization` 字段里面。

```yaml
Authorization: Bearer <token>
```

另一种做法是，跨域的时候，JWT 就放在 POST 请求的数据体里面。

## JWT 的几个特点

（1）JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。

（2）JWT 不加密的情况下，不能将秘密数据写入 JWT。

（3）JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。

（4）JWT 的最大缺点是，由于服务器不保存 `session` 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。

（5）JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。

（6）为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 `HTTPS` 协议传输。

## 参考资料

- [JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
- [JWT 官方文档](https://jwt.io/)
- [JWT debugger](https://jwt.io/#debugger-io)