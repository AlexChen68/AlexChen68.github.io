import{_ as l,V as t,W as c,X as s,Y as a,Z as e,a0 as o,D as r}from"./framework-82df2182.js";const p={},i=o(`<h2 id="单机部署-使用内部的数据库" tabindex="-1"><a class="header-anchor" href="#单机部署-使用内部的数据库" aria-hidden="true">#</a> 单机部署（使用内部的数据库）</h2><h2 id="docker-安装-nacos" tabindex="-1"><a class="header-anchor" href="#docker-安装-nacos" aria-hidden="true">#</a> Docker 安装 Nacos</h2><ol><li>下载 Nacos 镜像</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run nacos/nacos-server:v2.2.0-slim
</code></pre></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>为什么下载 slim 版本：因为使用的 Mac M1，需要使用支持 arm 架构的镜像。</p></div><ol start="2"><li>获取 Nacos 数据库初始化 SQL 文件</li></ol>`,6),d={href:"https://github.com/alibaba/nacos/blob/master/config/src/main/resources/META-INF/nacos-db.sql%5Bhttps://github.com/alibaba/nacos/blob/master/config/src/main/resources/META-INF/nacos-db.sql%5D%EF%BC%9B",target:"_blank",rel:"noopener noreferrer"},u={href:"https://github.com/alibaba/nacos/releases/tag/2.2.0",target:"_blank",rel:"noopener noreferrer"},b=s("code",null,"conf",-1),m=s("code",null,"mysql-schema.sql",-1),v=o(`<p>方式三：从容器的 <code>/usr/local/nacos/config</code> 路径下，获取 <code>mysql-schema.sql</code> 文件。</p><ol start="3"><li>启动容器，通过配置 mysql 参数，使用外部的 Mysql 数据库存储配置</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> nacos <span class="token punctuation">\\</span>
<span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">8848</span>:8848 <span class="token punctuation">\\</span>
<span class="token parameter variable">--link</span> mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /usr/local/nacos/logs:/home/nacos/logs <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /usr/local/nacos/data:/home/nacos/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /usr/local/nacos/config:/home/nacos/config <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MODE</span><span class="token operator">=</span>standalone <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">SPRING_DATASOURCE_PLATFORM</span><span class="token operator">=</span>mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_SERVICE_HOST</span><span class="token operator">=</span><span class="token number">127.0</span>.0.1 <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">3306</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_SERVICE_DB_NAME</span><span class="token operator">=</span>zeus_nacos <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_SERVICE_USER</span><span class="token operator">=</span>root <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_SERVICE_PASSWORD</span><span class="token operator">=</span>root <span class="token punctuation">\\</span>
nacos/nacos-server:v2.2.0-slim
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>如果使用内置数据库启动</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> nacos <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">-p</span> <span class="token number">8848</span>:8848  nacos/nacos-server:v2.2.0-slim
</code></pre></div>`,5);function k(h,_){const n=r("ExternalLinkIcon");return t(),c("div",null,[i,s("p",null,[a("方式一：从 github 中下载: "),s("a",d,[a("https://github.com/alibaba/nacos/blob/master/config/src/main/resources/META-INF/nacos-db.sql[https://github.com/alibaba/nacos/blob/master/config/src/main/resources/META-INF/nacos-db.sql]；"),e(n)])]),s("p",null,[a("方式二：从 Nacos 的 "),s("a",u,[a("Release"),e(n)]),a(" 版本中下载压缩包版本，"),b,a(" 文件夹下的 "),m,a(" 文件即为 Mysql 数据库初始化脚本；")]),v])}const f=l(p,[["render",k],["__file","02-install.html.vue"]]);export{f as default};
