import{_ as o,C as n,o as p,c,k as a,a as s,H as r,Q as e}from"./chunks/framework.419948d5.js";const D=JSON.parse('{"title":"Docker image","description":"Docker 镜像","frontmatter":{"title":"Docker image","date":"2023-01-28T00:00:00.000Z","description":"Docker 镜像"},"headers":[],"relativePath":"deploy/docker/1.4-image.md","filePath":"deploy/docker/1.4-image.md","lastUpdated":1697537189000}'),t={name:"deploy/docker/1.4-image.md"},i=e(`<h2 id="docker-镜像操作" tabindex="-1">Docker 镜像操作 <a class="header-anchor" href="#docker-镜像操作" aria-label="Permalink to &quot;Docker 镜像操作&quot;">​</a></h2><h3 id="获取镜像" tabindex="-1">获取镜像 <a class="header-anchor" href="#获取镜像" aria-label="Permalink to &quot;获取镜像&quot;">​</a></h3><p>从 Docker 镜像仓库获取镜像的命令是 <code>docker pull</code>。其命令格式为：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pull</span><span style="color:#E1E4E8;"> [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pull</span><span style="color:#24292E;"> [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>具体的选项可以通过 <code>docker pull --help</code> 命令看到，这里我们说一下镜像名称的格式。</p><ul><li>Docker 镜像仓库地址：地址的格式一般是 <code>&lt;域名/IP&gt;[:端口号]</code>。如果不指定仓库地址，会使用 Docker 配置的仓库地址，默认地址是 Docker Hub(<code>docker.io</code>)。</li><li>仓库名：如之前所说，这里的仓库名是两段式名称，即 <code>&lt;用户名&gt;/&lt;软件名&gt;</code>。对于 Docker Hub，如果不给出用户名，则默认为 <code>library</code>，也就是官方镜像。</li></ul><p>示例：<code>docker pull ubuntu:18.04</code></p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@VM-16-13-centos </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker pull ubuntu:18.04</span></span>
<span class="line"><span style="color:#B392F0;">18.04:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Pulling</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">library/ubuntu</span></span>
<span class="line"><span style="color:#B392F0;">40dd5be53814:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Pull</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">complete</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#镜像是分层存储的，前面为每层的 ID 的前 12 位</span></span>
<span class="line"><span style="color:#B392F0;">Digest:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sha256:d21b6ba9e19feffa328cb3864316e6918e30acfd55e285b5d3df1d8ca3c7fd3f</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#镜像完整的 sha256 的摘要</span></span>
<span class="line"><span style="color:#B392F0;">Status:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Downloaded</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">newer</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">for</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ubuntu:18.04</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#下载结果</span></span>
<span class="line"><span style="color:#B392F0;">docker.io/library/ubuntu:18.04</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#完整镜像名称</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@VM-16-13-centos </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker pull ubuntu:18.04</span></span>
<span class="line"><span style="color:#6F42C1;">18.04:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Pulling</span><span style="color:#24292E;"> </span><span style="color:#032F62;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">library/ubuntu</span></span>
<span class="line"><span style="color:#6F42C1;">40dd5be53814:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Pull</span><span style="color:#24292E;"> </span><span style="color:#032F62;">complete</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#镜像是分层存储的，前面为每层的 ID 的前 12 位</span></span>
<span class="line"><span style="color:#6F42C1;">Digest:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sha256:d21b6ba9e19feffa328cb3864316e6918e30acfd55e285b5d3df1d8ca3c7fd3f</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#镜像完整的 sha256 的摘要</span></span>
<span class="line"><span style="color:#6F42C1;">Status:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Downloaded</span><span style="color:#24292E;"> </span><span style="color:#032F62;">newer</span><span style="color:#24292E;"> </span><span style="color:#032F62;">image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">for</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ubuntu:18.04</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#下载结果</span></span>
<span class="line"><span style="color:#6F42C1;">docker.io/library/ubuntu:18.04</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#完整镜像名称</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="使用镜像" tabindex="-1">使用镜像 <a class="header-anchor" href="#使用镜像" aria-label="Permalink to &quot;使用镜像&quot;">​</a></h3><p>有了基础镜像之后，可以通过 <code>docker run</code>命令基于镜像启动容器，当启动容器时，如果本地不存在该镜像，Docker 还会先从镜像仓库下载该镜像，然后再启动容器，具体的容器相关见 <a href="#Docker-容器">Docker 容器</a>。</p><h3 id="查看镜像" tabindex="-1">查看镜像 <a class="header-anchor" href="#查看镜像" aria-label="Permalink to &quot;查看镜像&quot;">​</a></h3><p>列举本地已经下载的镜像使用 <code>docker image ls</code>命令，其信息包含了 <code>仓库名</code>、<code>标签</code>、<code>镜像 ID</code>、<code>创建时间</code> 以及 <code>所占用的空间</code>（镜像实际大小，镜像库中的为压缩后的大小）。</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ls</span></span>
<span class="line"><span style="color:#B392F0;">REPOSITORY</span><span style="color:#E1E4E8;">           </span><span style="color:#9ECBFF;">TAG</span><span style="color:#E1E4E8;">                 </span><span style="color:#9ECBFF;">IMAGE</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ID</span><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">CREATED</span><span style="color:#E1E4E8;">             </span><span style="color:#9ECBFF;">SIZE</span></span>
<span class="line"><span style="color:#B392F0;">redis</span><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">latest</span><span style="color:#E1E4E8;">              </span><span style="color:#79B8FF;">5</span><span style="color:#9ECBFF;">f515359c7f8</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">days</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ago</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">183</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">MB</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ls</span></span>
<span class="line"><span style="color:#6F42C1;">REPOSITORY</span><span style="color:#24292E;">           </span><span style="color:#032F62;">TAG</span><span style="color:#24292E;">                 </span><span style="color:#032F62;">IMAGE</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ID</span><span style="color:#24292E;">            </span><span style="color:#032F62;">CREATED</span><span style="color:#24292E;">             </span><span style="color:#032F62;">SIZE</span></span>
<span class="line"><span style="color:#6F42C1;">redis</span><span style="color:#24292E;">                </span><span style="color:#032F62;">latest</span><span style="color:#24292E;">              </span><span style="color:#005CC5;">5</span><span style="color:#032F62;">f515359c7f8</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> </span><span style="color:#032F62;">days</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ago</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">183</span><span style="color:#24292E;"> </span><span style="color:#032F62;">MB</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>可以使用 <code>docker system df</code> 命令查询镜像实际占用的大小，不同镜像可能复用了多层存储中的部分层，因此实际占用硬盘大小会小于显示大小。</p><p><strong>虚悬镜像</strong></p><p>有些镜像原本是有镜像名和标签的，随着官方镜像维护，发布了新版本后，重新 <code>docker pull</code>时，镜像名被转移到了新下载的镜像身上，而旧的镜像上的这个名称则被取消，标签会变成 <code>&lt;none&gt;</code>，这种镜像称为”虚悬镜像“，可以通过<code>docker image ls -f dangling=true</code>命令查看虚悬镜像，一般来说，虚悬镜像已经失去了存在的价值，是可以随意删除的。</p><p>更多镜像相关命令可通过<code>docker image ls --help</code>查看。</p><h3 id="删除镜像" tabindex="-1">删除镜像 <a class="header-anchor" href="#删除镜像" aria-label="Permalink to &quot;删除镜像&quot;">​</a></h3><p><strong>删除命令</strong></p><p>如果要删除本地的镜像，可以使用 <code>docker image rm</code> 命令，其格式为：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> [选项] </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">镜像</span><span style="color:#F97583;">1&gt;</span><span style="color:#E1E4E8;"> [</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">镜像2</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> ...]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> [选项] </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">镜像</span><span style="color:#D73A49;">1&gt;</span><span style="color:#24292E;"> [</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">镜像2</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> ...]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其中的镜像可以为<code>镜像短 ID</code>、<code>镜像长 ID</code>、<code>镜像名</code> 或者 <code>镜像摘要</code>。</p><p><strong>当镜像删除时，会出现如下几种情况：</strong></p><ol><li>删除的镜像仅有一个标签，命令执行结果显示 <code>Deleted</code>，表示删除；</li><li>仅删除了某个标签的镜像，此时会看到命令执行结果中，显示的不是 <code>Deleted</code> 而是 <code>Untagged</code>，因为还有别的标签指向了这个镜像；</li><li>删除了一个镜像的全部标签，但是由于镜像是多层存储复用的，可能有别的镜像依赖当前镜像的某一层，依旧不会触发删除该层的行为，也是为什么有时候会发现所删除的层数和自己 <code>docker pull</code> 看到的层数不一样的原因；</li><li>当删除的镜像有容器依赖其时，需要先删除容器，然后才可以删除镜像。</li></ol><p><strong>镜像删除命令还可以结合镜像查看命令，删除符合查询条件的镜像</strong></p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">$(</span><span style="color:#B392F0;">docker</span><span style="color:#9ECBFF;"> image ls [选项])</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">$(</span><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> image ls [选项])</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,26),d={id:"docker-commit",tabindex:"-1"},y=a("a",{class:"header-anchor",href:"#docker-commit","aria-label":'Permalink to "Docker commit <Badge text="不推荐" type="warning"/>"'},"​",-1),E=e('<p>当我们使用一个镜像运行了一个容器，并且进入容器内部进行了修改的时候，可能需要将修改后的镜像保存，<code>docker commit</code> 命令可以将容器打包成为一个新的镜像，具体命令格式：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">commit</span><span style="color:#E1E4E8;"> [选项] </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">容器ID或容器名</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> [</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">仓库名</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">[:</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">标签</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">]]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">commit</span><span style="color:#24292E;"> [选项] </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">容器ID或容器名</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> [</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">仓库名</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">[:</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">标签</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">]]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>docker commit</code> 虽然可以制作镜像，但是并不推荐使用，如果使用 <code>docker diff</code> 命令查询容器的改动后会发现，容器运行后，除了本身的改动外，由于命令的执行，还有很多文件被改动或添加了；另一方面，镜像所使用的分层存储的概念，除当前层外，之前的每一层都是不会发生改变的，换句话说，任何修改的结果仅仅是在当前层进行标记、添加、修改，而不会改动上一层，一次次的 <code>docker commit</code> 只会让镜像越来越臃肿，因此更加推荐使用 <code>dockerfile</code> 构建镜像。</p><p>使用 dockerfile 制作镜像可以参考 <a href="./1.7-dockerfile.html">dockerfile</a>。</p><h2 id="镜像版本选择" tabindex="-1">镜像版本选择 <a class="header-anchor" href="#镜像版本选择" aria-label="Permalink to &quot;镜像版本选择&quot;">​</a></h2><h3 id="官方镜像" tabindex="-1">官方镜像 <a class="header-anchor" href="#官方镜像" aria-label="Permalink to &quot;官方镜像&quot;">​</a></h3><p>官方默认镜像（不带其他后缀的镜像）使用最新的稳定 Debian 操作系统发行版，它的缺点是打包后的体积过大，但它通常是最安全的选择。</p><p>示例：openjdk:8u312-jre</p><h3 id="debian-发行版镜像" tabindex="-1">Debian 发行版镜像 <a class="header-anchor" href="#debian-发行版镜像" aria-label="Permalink to &quot;Debian 发行版镜像&quot;">​</a></h3><p>带有 bullseye、buster、stretch 或 jessie 标签的镜像是不同 Debian 发行版的代号，对应情况如下：</p><ul><li>bullseye:Debian 11</li><li>buster:Debian 10</li><li>stretch:Debian 9</li><li>jessie:Debian 8</li></ul><p>示例：openjdk:8u312-jre-slim-buster</p><h3 id="slim-镜像" tabindex="-1">slim 镜像 <a class="header-anchor" href="#slim-镜像" aria-label="Permalink to &quot;slim 镜像&quot;">​</a></h3><p>slim 的镜像是完整镜像的配对版本。这个镜像通常只安装运行特定工具所需的最小包。以 python 为例，就是运行 python 的最小包，node.js 同理。</p><p>通过省去较少使用的工具，镜像会更小。如果有空间限制且不需要完整版本，请使用此镜像。</p><p>** 但是，在使用这个镜像时，一定要进行彻底的测试！** 如果您遇到无法解释的错误，请尝试切换到完整的镜像，看看是否能够解决问题。</p><h3 id="alpine-镜像" tabindex="-1">alpine 镜像 <a class="header-anchor" href="#alpine-镜像" aria-label="Permalink to &quot;alpine 镜像&quot;">​</a></h3><p>alipine 镜像基于 alpine linux 项目，这是一个专门为容器内部使用而构建的操作系统。在很长一段时间里，这些是最受欢迎的镜像变体，因为它们的尺寸很小。</p><p>然而，一些团队正在弃用 alpine 镜像，因为这些镜像可能会导致难以调试的兼容性问题。具体来说，如果使用 python 镜像，一些 wheels 将被构建成与 Debian 兼容，并且需要重新编译，才能与基于 apline 的镜像一起工作。</p><p>使用 alpine 镜像的主要原因是使你得到的镜像尽可能小。基础镜像将小于 5MB。python 基础镜像 (将 python 添加到基础 alpine 镜像) 目前是 78.9MB。这仍然很小。</p><p>如果考虑到空间问题，强烈推荐使用此镜像。</p><p>它的缺点是不包含一些你可能会需要的包。主要是，它使用了一个更小的 musl lib 代替 glibc。如果您的应用程序有特定的 libc 需求，您可能会遇到问题。</p><p>如果你发现 Alpine 镜像缺少你需要的东西，你可以直接在 Dockerfile 中安装它，这样能确保镜像只包含你需要的内容。需要注意，如果您正在安装外部包，您的 Dockerfile 将会更改。主要的区别是，您将使用 apk 而不是 apt-get 来安装包。</p><p>对 alpine 镜像的使用有很多担心之处，所以你需要充分了解它。需要充分阅读文档并研究。同样，如果您在构建 Dockerfile 时遇到了无法解释的问题，请尝试切换到完整的镜像，看看是否能解决问题。</p><p>示例：openjdk:8u171-jdk-alpine3.7</p><h3 id="windowsservercore-镜像" tabindex="-1">windowsservercore 镜像 <a class="header-anchor" href="#windowsservercore-镜像" aria-label="Permalink to &quot;windowsservercore 镜像&quot;">​</a></h3><p>windowsservercore 是使用 windows 操作系统打包的镜像。</p><p>示例：openjdk:8u312-jre-windowsservercore-ltsc2022</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><ul><li>选择镜像时应该根据实际情况选择镜像，不要求镜像大小限制就选择稳定的官方镜像；</li><li>使用 slim 镜像时应该做全面的测试；</li><li>如果有极端的空间限制，可以尝试使用 alpine 镜像，但是可能会导致更长的构建时间和不确定的 bug；</li><li>不要在生产环境中使用 <code>&lt;image&gt;:latest</code> 使用最新的镜像，而是使用具体版本并进行全面的测试。</li></ul></div>',29);function u(b,h,F,m,k,g){const l=n("Badge");return p(),c("div",null,[i,a("h3",d,[s("Docker commit "),r(l,{text:"不推荐",type:"warning"}),s(),y]),E])}const v=o(t,[["render",u]]);export{D as __pageData,v as default};