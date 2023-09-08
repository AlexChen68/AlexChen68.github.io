import{_ as a,W as e,X as s,a1 as n}from"./framework-ea95e8eb.js";const o={},c=n(`<h2 id="安装-docker" tabindex="-1"><a class="header-anchor" href="#安装-docker" aria-hidden="true">#</a> 安装 docker</h2><h3 id="卸载旧-docker-及依赖" tabindex="-1"><a class="header-anchor" href="#卸载旧-docker-及依赖" aria-hidden="true">#</a> 卸载旧 Docker 及依赖</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum remove <span class="token function">docker</span> <span class="token punctuation">\\</span>
                  docker-client <span class="token punctuation">\\</span>
                  docker-client-latest <span class="token punctuation">\\</span>
                  docker-common <span class="token punctuation">\\</span>
                  docker-latest <span class="token punctuation">\\</span>
                  docker-latest-logrotate <span class="token punctuation">\\</span>
                  docker-logrotate <span class="token punctuation">\\</span>
                  docker-engine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装-yum-工具-添加-yum-源配置" tabindex="-1"><a class="header-anchor" href="#安装-yum-工具-添加-yum-源配置" aria-hidden="true">#</a> 安装 yum 工具，添加 yum 源配置</h3><p>安装工具</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
</code></pre></div><p>添加 yum 源（二选一）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 中央仓库</span>
yum-config-manager --add-repo http://download.docker.com/linux/centos/docker-ce.repo

<span class="token comment"># 阿里云镜像</span>
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装-docker-ce" tabindex="-1"><a class="header-anchor" href="#安装-docker-ce" aria-hidden="true">#</a> 安装 Docker CE</h3><ol><li>安装<code>docker-ce</code></li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce
</code></pre></div><ol start="2"><li>设置系统启动</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl start <span class="token function">docker</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
</code></pre></div><ol start="3"><li>检查<code>docker</code>状态</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>systemctl status <span class="token function">docker</span>
</code></pre></div><h2 id="安装-docker-compose" tabindex="-1"><a class="header-anchor" href="#安装-docker-compose" aria-hidden="true">#</a> 安装 docker-compose</h2><h3 id="什么是-docker-compose" tabindex="-1"><a class="header-anchor" href="#什么是-docker-compose" aria-hidden="true">#</a> 什么是 docker-compose</h3><p>​docker-compose 是一个工具，这个工具主要是用来定义和运行多个应用的。比如说，我要启动 一个 kafka 容器，使用 docker 的话，需要先启动一个 zk 容器，然后再启动一个 kafka 容器，然而使用 docker-compose 的话，直接通过 docker-compose.yml 去定义 zk 和 kafka 这两个引用，然后使用 <code>docker-compose up -d</code> 直接启动这个 docker-compoes.yml 所定义的两个容器。所以，使用 docker-compose 比 docker 更加方便地定义和管理多个 docker 容器。</p><h3 id="docker-compose-的安装" tabindex="-1"><a class="header-anchor" href="#docker-compose-的安装" aria-hidden="true">#</a> docker-compose 的安装</h3><ol><li><p>官网查看 release 版本：https://github.com/docker/compose/releases/</p></li><li><p>下载 docker-compose 到 /usr/local/bin 目录下（也可以手动下载，手动上传）</p></li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-L</span> https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>  <span class="token parameter variable">-o</span> /usr/local/bin/docker-compose
</code></pre></div><ol start="3"><li>给 docker-compose 指定权限</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x /usr/local/bin/docker-compose
</code></pre></div><ol start="4"><li>查看版本</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">--version</span>
</code></pre></div><h2 id="docker-仓库配置" tabindex="-1"><a class="header-anchor" href="#docker-仓库配置" aria-hidden="true">#</a> Docker 仓库配置</h2><p>示例使用官方国内镜像仓库地址，对于使用 systemd 的系统，请在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span><span class="token string">&quot;registry-mirrors&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;https://registry.docker-cn.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre></div><p>之后重新启动服务</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre></div>`,30),t=[c];function d(l,r){return e(),s("div",null,t)}const p=a(o,[["render",d],["__file","1.3-install.html.vue"]]);export{p as default};