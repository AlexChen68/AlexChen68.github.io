import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.419948d5.js";const u=JSON.parse('{"title":"Alibaba Nacos - 配置中心","description":"","frontmatter":{"title":"Alibaba Nacos - 配置中心","date":"2023-02-12T00:00:00.000Z"},"headers":[],"relativePath":"spring/springcloud/2.1-config.md","filePath":"spring/springcloud/2.1-config.md","lastUpdated":1697497069000}'),p={name:"spring/springcloud/2.1-config.md"},o=l(`<h1 id="nacos-配置中心" tabindex="-1">Nacos 配置中心 <a class="header-anchor" href="#nacos-配置中心" aria-label="Permalink to &quot;Nacos 配置中心&quot;">​</a></h1><h2 id="什么是服务配置中心" tabindex="-1">什么是服务配置中心 <a class="header-anchor" href="#什么是服务配置中心" aria-label="Permalink to &quot;什么是服务配置中心&quot;">​</a></h2><h3 id="微服务架构下关于配置文件的一些问题" tabindex="-1">微服务架构下关于配置文件的一些问题 <a class="header-anchor" href="#微服务架构下关于配置文件的一些问题" aria-label="Permalink to &quot;微服务架构下关于配置文件的一些问题&quot;">​</a></h3><ol><li><p>配置文件相对分散。在一个微服务架构下，配置文件会随着微服务的增多变的越来越多，而且分散 在各个微服务中，不好统一配置和管理。</p></li><li><p>配置文件无法区分环境。微服务项目可能会有多个环境，例如：测试环境、预发布环境、生产环 境。每一个环境所使用的配置理论上都是不同的，一旦需要修改，就需要我们去各个微服务下手动 维护，这比较困难。</p></li><li><p>配置文件无法实时更新。我们修改了配置文件之后，必须重新启动微服务才能使配置生效，这对一 个正在运行的项目来说是非常不友好的。</p></li></ol><p>基于上面这些问题，我们就需要配置中心的加入来解决这些问题。</p><h3 id="配置中心的思路是" tabindex="-1">配置中心的思路是 <a class="header-anchor" href="#配置中心的思路是" aria-label="Permalink to &quot;配置中心的思路是&quot;">​</a></h3><p>首先把项目中各种配置全部都放到一个集中的地方进行统一管理，并提供一套标准的接口。</p><p>当各个服务需要获取配置的时候，就来配置中心的接口拉取自己的配置。</p><p>当配置中心中的各种参数有更新的时候，也能通知到各个服务实时的过来同步最新的信息，使之动态更新。</p><h3 id="常见的服务配置中心" tabindex="-1">常见的服务配置中心 <a class="header-anchor" href="#常见的服务配置中心" aria-label="Permalink to &quot;常见的服务配置中心&quot;">​</a></h3><p>Apollo Apollo 是由携程开源的分布式配置中心。特点有很多，比如：配置更新之后可以实时生效，支持灰度发布功能，并且能对所有的配置进行版本管理、操作审计等功能，提供开放平台 API。并且资料也写的很详细。</p><p>Disconf Disconf 是由百度开源的分布式配置中心。它是基于 Zookeeper 来实现配置变更后实时通知和生效的。SpringCloud Confifig 这是 SpringCloud 中带的配置中心组件。它和 Spring 是无缝集成，使用起来非常方便，并且它的配置存储支持 Git。不过它没有可视化的操作界面，配置的生效也不是实时的，需要重启或去刷新。</p><p>Nacos 这是 SpingCloud alibaba 技术栈中的一个组件，前面我们已经使用它做过服务注册中心。其实它也集成了服务配置的功能，我们可以直接使用它作为服务配置中心。</p><h2 id="nacos-配置中心入门" tabindex="-1">Nacos 配置中心入门 <a class="header-anchor" href="#nacos-配置中心入门" aria-label="Permalink to &quot;Nacos 配置中心入门&quot;">​</a></h2><p>使用 nacos 作为配置中心，其实就是将 nacos 当做一个服务端，将各个微服务看成是客户端，我们将各个微服务的配置文件统一存放在 nacos 上，然后各个微服务从 nacos 上拉取配置即可。接下来我们以商品微服务为例，学习 nacos confifig 的使用。</p><h3 id="使用-nacos-config" tabindex="-1">使用 Nacos config <a class="header-anchor" href="#使用-nacos-config" aria-label="Permalink to &quot;使用 Nacos config&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">准备工作</p><p>启动 nacos 服务，具体可以查看 <a href="./1.1-register.html">Alibaba Nacos - 注册中心</a></p></div><ol><li>在微服务中引入 nacos 的依赖</li></ol><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.alibaba.cloud&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-cloud-starter-alibaba-nacos-config&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.alibaba.cloud&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-cloud-starter-alibaba-nacos-config&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2"><li>在微服务的配置文件中，加入 Nacos 的配置，指定需要连接的 Nacos 地址和端口</li></ol><p>示例：</p><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">application</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: @</span><span style="color:#9ECBFF;">artifactId@</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">cloud</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">nacos</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">discovery</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">server-addr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\${NACOS_HOST:localhost}:\${NACOS_PORT:8848}</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">config</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">server-addr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\${spring.cloud.nacos.discovery.server-addr}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">config</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">import</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">optional:nacos:\${spring.application.name}.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">application</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: @</span><span style="color:#032F62;">artifactId@</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">cloud</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">nacos</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">discovery</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">server-addr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${NACOS_HOST:localhost}:\${NACOS_PORT:8848}</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">config</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">server-addr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${spring.cloud.nacos.discovery.server-addr}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">config</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">import</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">optional:nacos:\${spring.application.name}.yml</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ol start="3"><li>在 nacos 中添加配置</li></ol><p>打开 nacos 网页，登录后点击【配置管理】-【配置列表】，会显示 nacos 配置中心的配置信息表格，点击右上角的加号，可以新增配置；</p><p>新增的配置名称，需要和上一步中，<code>spring.config.import</code> 对应的配置列表名称对应（可以配置多个），本示例配置的是 <code>\${spring.application.name}.yml</code>，即与应用名称对应。</p><ol start="4"><li>配置完成后，启动微服务，查看日志中启用成功的配置是否与配置的一致。</li></ol>`,26),e=[o];function c(r,t,i,E,d,y){return a(),n("div",null,e)}const g=s(p,[["render",c]]);export{u as __pageData,g as default};