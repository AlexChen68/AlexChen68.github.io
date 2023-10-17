import{_ as s,o as a,c as e,Q as n}from"./chunks/framework.419948d5.js";const b=JSON.parse('{"title":"开始使用 Redis","description":"开始使用 Redis","frontmatter":{"title":"开始使用 Redis","date":"2022-09-29T00:00:00.000Z","description":"开始使用 Redis"},"headers":[],"relativePath":"database/redis/1.1-started.md","filePath":"database/redis/1.1-started.md","lastUpdated":1697537189000}'),p={name:"database/redis/1.1-started.md"},l=n(`<p>Redis 的介绍和初步安装、卸载教程。</p><h2 id="redis-简介" tabindex="-1">Redis 简介 <a class="header-anchor" href="#redis-简介" aria-label="Permalink to &quot;Redis 简介&quot;">​</a></h2><p>Redis 是完全开源的，遵守 BSD 协议，是一个高性能的 key-value 数据库。</p><p>Redis 与其他 key - value 缓存产品有以下三个特点：</p><p>Redis 支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。 Redis 不仅仅支持简单的 key-value 类型的数据，同时还提供 list，set，zset，hash 等数据结构的存储。 Redis 支持数据的备份，即 master-slave 模式的数据备份。</p><h2 id="安装和卸载" tabindex="-1">安装和卸载 <a class="header-anchor" href="#安装和卸载" aria-label="Permalink to &quot;安装和卸载&quot;">​</a></h2><h3 id="docker-安装-redis" tabindex="-1">Docker 安装 Redis <a class="header-anchor" href="#docker-安装-redis" aria-label="Permalink to &quot;Docker 安装 Redis&quot;">​</a></h3><p>拉取 Redis 最新镜像</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pull</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis:latest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pull</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis:latest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查看镜像</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">images</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">images</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>使用自定义的 <code>redis.conf</code> 启动 Redis 容器，并绑定端口，<code>[redis-container-name]</code>使用自定义的容器名称替换</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--restart=always</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6379</span><span style="color:#9ECBFF;">:6379</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/root/redis:/usr/local/etc/redis</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> [redis-container-name] -d redis redis-server /usr/local/etc/redis/redis.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--restart=always</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6379</span><span style="color:#032F62;">:6379</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/root/redis:/usr/local/etc/redis</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> [redis-container-name] -d redis redis-server /usr/local/etc/redis/redis.conf</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查看容器是否启动</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ps</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-a</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> [redis-container-name]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ps</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-a</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> [redis-container-name]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>进入 redis 容器，使用 <code>redis-cli</code> 登录</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-it</span><span style="color:#E1E4E8;"> [redis-container-name] bash</span></span>
<span class="line"><span style="color:#6A737D;"># 进入 redis 命令行界面</span></span>
<span class="line"><span style="color:#B392F0;">redis-cli</span></span>
<span class="line"><span style="color:#6A737D;"># 鉴权登录,yourpassword 为在 redis.conf 中，使用 requirepass 配置的密码</span></span>
<span class="line"><span style="color:#B392F0;">auth</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yourpassword</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-it</span><span style="color:#24292E;"> [redis-container-name] bash</span></span>
<span class="line"><span style="color:#6A737D;"># 进入 redis 命令行界面</span></span>
<span class="line"><span style="color:#6F42C1;">redis-cli</span></span>
<span class="line"><span style="color:#6A737D;"># 鉴权登录,yourpassword 为在 redis.conf 中，使用 requirepass 配置的密码</span></span>
<span class="line"><span style="color:#6F42C1;">auth</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yourpassword</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="redis-配置" tabindex="-1">Redis 配置 <a class="header-anchor" href="#redis-配置" aria-label="Permalink to &quot;Redis 配置&quot;">​</a></h3><h4 id="redis-conf-配置文件" tabindex="-1">redis.conf 配置文件 <a class="header-anchor" href="#redis-conf-配置文件" aria-label="Permalink to &quot;redis.conf 配置文件&quot;">​</a></h4><p>Redis 可以通过在启动时，指定配置文件 <code>redis.conf</code> 来加载自定义配置。</p><p>该文件可以在 Redis 安装目录下找到，或者从 <a href="https://github.com/redis/redis/blob/unstable/redis.conf" target="_blank" rel="noreferrer">Github</a> 下载。</p><p>常见的配置项：</p><ul><li><p>指定 Redis 是否以守护进程的方式启动，默认为 no，表示不以守护进程的方式启动</p><div class="language-ini vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">daemonize yes</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">daemonize yes</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>指定 Redis 监听端口，默认端口为 6379</p><div class="language-ini vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">port 6379</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">port 6379</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>设置 Redis 连接密码，如果配置了连接密码，客户端在连接 Redis 时需要通过 <code>AUTH &lt;password&gt;</code> 命令提供密码，默认关闭</p><div class="language-ini vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">requirepass password</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">requirepass password</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>绑定主机地址；如果指定了 bind，则说明只允许来自指定网卡的 Redis 请求。如果没有指定，就说明可以接受来自任意一个网卡的 Redis 请求，需要远程连接时，可以注释掉该配置</p><div class="language-ini vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">bind 127.0.0.1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">bind 127.0.0.1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>当 Redis 以守护进程方式运行时，Redis 默认会把 pid 写入 /var/run/redis.pid 文件，可以通过 pidfile 指定</p><div class="language-ini vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pidfile /var/run/redis.pid</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pidfile /var/run/redis.pid</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>当客户端闲置多长秒后关闭连接，如果指定为 0，表示关闭该功能</p><div class="language-ini vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">timeout 300</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">timeout 300</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>设置数据库的数量，默认数据库为 0，可以使用 SELECT 命令在连接上指定数据库 id</p><div class="language-ini vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">databases 16</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">databases 16</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ul><p>更多具体设置，见 <a href="https://redis.io/docs/manual/config/" target="_blank" rel="noreferrer">Redis 官方文档</a>。</p><h4 id="redis-cli-命令行配置" tabindex="-1">Redis-cli 命令行配置 <a class="header-anchor" href="#redis-cli-命令行配置" aria-label="Permalink to &quot;Redis-cli 命令行配置&quot;">​</a></h4><p>在通过 Redis-cli 工具连接上 Redis 并通过 <code>auth [password]</code> 认证后，可以使用 <code>config set/get [param]</code> 命令设置或查询 Redis 配置。</p><p>查看全部配置</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查询某个配置，例如查询密码</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">requirepass</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">requirepass</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>设置某个配置，例如设置密码</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">requirepass</span><span style="color:#E1E4E8;"> [password]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">requirepass</span><span style="color:#24292E;"> [password]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="docker-卸载-redis" tabindex="-1">Docker 卸载 Redis <a class="header-anchor" href="#docker-卸载-redis" aria-label="Permalink to &quot;Docker 卸载 Redis&quot;">​</a></h3><p>查看正在运行的 redis 容器</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ps</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-a</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> [redis-container-name]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ps</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-a</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> [redis-container-name]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>停止容器，[redis-container-name] 为容器名称</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> [redis-container-name]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> [redis-container-name]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查看 Redis 镜像</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">iamges</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">iamges</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>删除 Redis 镜像，<code>[redis-image-id]</code> 为 Redis 镜像的 <code>IMAGE ID</code></p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> [redis-image-id]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> [redis-image-id]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://redis.io/docs/" target="_blank" rel="noreferrer">Redis 官方文档</a></li><li><a href="https://www.runoob.com/redis/redis-tutorial.html" target="_blank" rel="noreferrer">Redis 教程｜菜鸟教程</a></li></ul>`,43),o=[l];function r(i,c,t,d,h,u){return a(),e("div",null,o)}const E=s(p,[["render",r]]);export{b as __pageData,E as default};