import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.419948d5.js";const y=JSON.parse('{"title":"SpringBoot 内嵌 Tomcat 配置优化","description":"","frontmatter":{"title":"SpringBoot 内嵌 Tomcat 配置优化","icon":"tomcat","tag":"tomcat","date":"2023-05-16T00:00:00.000Z"},"headers":[],"relativePath":"devops/deploy/1.2-tomcat-config.md","filePath":"devops/deploy/1.2-tomcat-config.md","lastUpdated":1694772424000}'),e={name:"devops/deploy/1.2-tomcat-config.md"},l=p(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><blockquote><p>SpringBoot 可以同时处理多少请求？</p></blockquote><p>我们都知道，SpringBoot 默认的内嵌容器是 Tomcat，也就是我们的程序实际上是运行在 Tomcat 里的。</p><p>所以与其说 SpringBoot 可以处理多少请求，到不如说 Tomcat 可以处理多少请求。</p><h2 id="tomcat-配置" tabindex="-1">Tomcat 配置 <a class="header-anchor" href="#tomcat-配置" aria-label="Permalink to &quot;Tomcat 配置&quot;">​</a></h2><p>关于 Tomcat 的默认配置，都在<code>spring-configuration-metadata.json</code>文件中，对应的配置类则是<code>org.springframework.boot.autoconfigure.web.ServerProperties</code>。</p><p>和处理请求数量相关的参数有四个：</p><ul><li><p><code>server.tomcat.threads.min-spare</code>：最少的工作线程数，默认大小是 10。该参数相当于长期工，如果并发请求的数量达不到 10，就会依次使用这几个线程去处理请求。</p></li><li><p><code>server.tomcat.threads.max</code>：最大工作线程数，默认大小是 200。该参数相当于临时工，如果并发请求的数量在 10 到 200 之间，就会使用这些临时工线程进行处理。==（建议这个配置数可以在服务器 CUP 核心数的 200~250 倍之间）==</p></li><li><p><code>server.tomcat.max-connections</code>：最大连接数，默认大小是 8192。表示 Tomcat 可以处理的最大请求数量，超过 8192 的请求就会被放入到等待队列。</p></li><li><p><code>server.tomcat.accept-count</code>：等待队列的长度，默认大小是 100。</p></li></ul><p>也就是说，SpringBoot 同时所能处理的最大请求数量是<code>max-connections+accept-count</code>，超过该数量的请求直接就会被丢掉。</p><h2 id="springboot-配置-tomcat" tabindex="-1">SpringBoot 配置 tomcat <a class="header-anchor" href="#springboot-配置-tomcat" aria-label="Permalink to &quot;SpringBoot 配置 tomcat&quot;">​</a></h2><p>在 spring boot 配置文件中 application.yml，添加以下配置：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># Tomcat</span></span>
<span class="line"><span style="color:#E1E4E8;">server:</span></span>
<span class="line"><span style="color:#E1E4E8;">  tomcat:</span></span>
<span class="line"><span style="color:#E1E4E8;">    uri-encoding: UTF</span><span style="color:#79B8FF;">-8</span></span>
<span class="line"><span style="color:#E1E4E8;">    #最小线程数</span></span>
<span class="line"><span style="color:#E1E4E8;">    min-spare-threads: </span><span style="color:#79B8FF;">500</span></span>
<span class="line"><span style="color:#E1E4E8;">    #最大线程数</span></span>
<span class="line"><span style="color:#E1E4E8;">    max-threads: </span><span style="color:#79B8FF;">2500</span></span>
<span class="line"><span style="color:#E1E4E8;">    #最大链接数</span></span>
<span class="line"><span style="color:#E1E4E8;">    max-connections: </span><span style="color:#79B8FF;">6500</span></span>
<span class="line"><span style="color:#E1E4E8;">    #最大等待队列长度</span></span>
<span class="line"><span style="color:#E1E4E8;">    accept-count: </span><span style="color:#79B8FF;">1000</span></span>
<span class="line"><span style="color:#E1E4E8;">    #请求头最大长度kb</span></span>
<span class="line"><span style="color:#E1E4E8;">    max-http-header-size: </span><span style="color:#79B8FF;">1048576</span></span>
<span class="line"><span style="color:#E1E4E8;">    #请请求体最大长度kb</span></span>
<span class="line"><span style="color:#E1E4E8;">    #max-http-post-size: </span><span style="color:#79B8FF;">2097152</span></span>
<span class="line"><span style="color:#E1E4E8;">  #链接建立超时时间</span></span>
<span class="line"><span style="color:#E1E4E8;">  connection-timeout: </span><span style="color:#79B8FF;">12000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># Tomcat</span></span>
<span class="line"><span style="color:#24292E;">server:</span></span>
<span class="line"><span style="color:#24292E;">  tomcat:</span></span>
<span class="line"><span style="color:#24292E;">    uri-encoding: UTF</span><span style="color:#005CC5;">-8</span></span>
<span class="line"><span style="color:#24292E;">    #最小线程数</span></span>
<span class="line"><span style="color:#24292E;">    min-spare-threads: </span><span style="color:#005CC5;">500</span></span>
<span class="line"><span style="color:#24292E;">    #最大线程数</span></span>
<span class="line"><span style="color:#24292E;">    max-threads: </span><span style="color:#005CC5;">2500</span></span>
<span class="line"><span style="color:#24292E;">    #最大链接数</span></span>
<span class="line"><span style="color:#24292E;">    max-connections: </span><span style="color:#005CC5;">6500</span></span>
<span class="line"><span style="color:#24292E;">    #最大等待队列长度</span></span>
<span class="line"><span style="color:#24292E;">    accept-count: </span><span style="color:#005CC5;">1000</span></span>
<span class="line"><span style="color:#24292E;">    #请求头最大长度kb</span></span>
<span class="line"><span style="color:#24292E;">    max-http-header-size: </span><span style="color:#005CC5;">1048576</span></span>
<span class="line"><span style="color:#24292E;">    #请请求体最大长度kb</span></span>
<span class="line"><span style="color:#24292E;">    #max-http-post-size: </span><span style="color:#005CC5;">2097152</span></span>
<span class="line"><span style="color:#24292E;">  #链接建立超时时间</span></span>
<span class="line"><span style="color:#24292E;">  connection-timeout: </span><span style="color:#005CC5;">12000</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div>`,12),o=[l];function c(t,r,i,m,E,d){return n(),a("div",null,o)}const u=s(e,[["render",c]]);export{y as __pageData,u as default};
