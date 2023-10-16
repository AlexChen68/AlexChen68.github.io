import{_ as s,o as a,c as n,Q as o}from"./chunks/framework.419948d5.js";const m=JSON.parse('{"title":"Docker 安装","description":"","frontmatter":{"title":"Docker 安装","date":"2023-01-28T00:00:00.000Z"},"headers":[],"relativePath":"deploy/docker/1.3-install.md","filePath":"deploy/docker/1.3-install.md","lastUpdated":1697497069000}'),l={name:"deploy/docker/1.3-install.md"},e=o(`<h2 id="安装-docker" tabindex="-1">安装 docker <a class="header-anchor" href="#安装-docker" aria-label="Permalink to &quot;安装 docker&quot;">​</a></h2><h3 id="卸载旧-docker-及依赖" tabindex="-1">卸载旧 Docker 及依赖 <a class="header-anchor" href="#卸载旧-docker-及依赖" aria-label="Permalink to &quot;卸载旧 Docker 及依赖&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">remove</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-client</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-client-latest</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-common</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-latest</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-latest-logrotate</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-logrotate</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">docker-engine</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">remove</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-client</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-client-latest</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-common</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-latest</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-latest-logrotate</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-logrotate</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#032F62;">docker-engine</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="安装-yum-工具-添加-yum-源配置" tabindex="-1">安装 yum 工具，添加 yum 源配置 <a class="header-anchor" href="#安装-yum-工具-添加-yum-源配置" aria-label="Permalink to &quot;安装 yum 工具，添加 yum 源配置&quot;">​</a></h3><p>安装工具</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yum-utils</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">device-mapper-persistent-data</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">lvm2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yum-utils</span><span style="color:#24292E;"> </span><span style="color:#032F62;">device-mapper-persistent-data</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lvm2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>添加 yum 源（二选一）</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 中央仓库</span></span>
<span class="line"><span style="color:#B392F0;">yum-config-manager</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--add-repo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://download.docker.com/linux/centos/docker-ce.repo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 阿里云镜像</span></span>
<span class="line"><span style="color:#B392F0;">yum-config-manager</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--add-repo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 中央仓库</span></span>
<span class="line"><span style="color:#6F42C1;">yum-config-manager</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--add-repo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://download.docker.com/linux/centos/docker-ce.repo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 阿里云镜像</span></span>
<span class="line"><span style="color:#6F42C1;">yum-config-manager</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--add-repo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="安装-docker-ce" tabindex="-1">安装 Docker CE <a class="header-anchor" href="#安装-docker-ce" aria-label="Permalink to &quot;安装 Docker CE&quot;">​</a></h3><ol><li>安装<code>docker-ce</code></li></ol><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-ce</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-ce</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2"><li>设置系统启动</li></ol><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="3"><li>检查<code>docker</code>状态</li></ol><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="安装-docker-compose" tabindex="-1">安装 docker-compose <a class="header-anchor" href="#安装-docker-compose" aria-label="Permalink to &quot;安装 docker-compose&quot;">​</a></h2><h3 id="什么是-docker-compose" tabindex="-1">什么是 docker-compose <a class="header-anchor" href="#什么是-docker-compose" aria-label="Permalink to &quot;什么是 docker-compose&quot;">​</a></h3><p>​docker-compose 是一个工具，这个工具主要是用来定义和运行多个应用的。比如说，我要启动 一个 kafka 容器，使用 docker 的话，需要先启动一个 zk 容器，然后再启动一个 kafka 容器，然而使用 docker-compose 的话，直接通过 docker-compose.yml 去定义 zk 和 kafka 这两个引用，然后使用 <code>docker-compose up -d</code> 直接启动这个 docker-compoes.yml 所定义的两个容器。所以，使用 docker-compose 比 docker 更加方便地定义和管理多个 docker 容器。</p><h3 id="docker-compose-的安装" tabindex="-1">docker-compose 的安装 <a class="header-anchor" href="#docker-compose-的安装" aria-label="Permalink to &quot;docker-compose 的安装&quot;">​</a></h3><ol><li><p>官网查看 release 版本：<a href="https://github.com/docker/compose/releases/" target="_blank" rel="noreferrer">https://github.com/docker/compose/releases/</a></p></li><li><p>下载 docker-compose 到 /usr/local/bin 目录下（也可以手动下载，手动上传）</p></li></ol><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-L</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(</span><span style="color:#B392F0;">uname</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-s</span><span style="color:#9ECBFF;">)-$(</span><span style="color:#B392F0;">uname</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#9ECBFF;">)</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-o</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/docker-compose</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-L</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(</span><span style="color:#6F42C1;">uname</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-s</span><span style="color:#032F62;">)-$(</span><span style="color:#6F42C1;">uname</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-m</span><span style="color:#032F62;">)</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-o</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/docker-compose</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="3"><li>给 docker-compose 指定权限</li></ol><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">+x</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/docker-compose</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">chmod</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+x</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/docker-compose</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="4"><li>查看版本</li></ol><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--version</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--version</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="docker-仓库配置" tabindex="-1">Docker 仓库配置 <a class="header-anchor" href="#docker-仓库配置" aria-label="Permalink to &quot;Docker 仓库配置&quot;">​</a></h2><p>示例使用官方国内镜像仓库地址，对于使用 systemd 的系统，请在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span><span style="color:#B392F0;">&quot;registry-mirrors&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;https://registry.docker-cn.com&quot;</span><span style="color:#B392F0;">]}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span><span style="color:#6F42C1;">&quot;registry-mirrors&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;https://registry.docker-cn.com&quot;</span><span style="color:#6F42C1;">]}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>之后重新启动服务</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,30),p=[e];function c(r,t,i,d,y,E){return a(),n("div",null,p)}const F=s(l,[["render",c]]);export{m as __pageData,F as default};