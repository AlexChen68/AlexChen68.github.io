import{_ as n,W as e,X as a,a1 as s}from"./framework-ea95e8eb.js";const o={},t=s(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><blockquote><p>SpringBoot 可以同时处理多少请求？</p></blockquote><p>我们都知道，SpringBoot 默认的内嵌容器是 Tomcat，也就是我们的程序实际上是运行在 Tomcat 里的。</p><p>所以与其说 SpringBoot 可以处理多少请求，到不如说 Tomcat 可以处理多少请求。</p><h2 id="tomcat-配置" tabindex="-1"><a class="header-anchor" href="#tomcat-配置" aria-hidden="true">#</a> Tomcat 配置</h2><p>关于 Tomcat 的默认配置，都在<code>spring-configuration-metadata.json</code>文件中，对应的配置类则是<code>org.springframework.boot.autoconfigure.web.ServerProperties</code>。</p><p>和处理请求数量相关的参数有四个：</p><ul><li><p><code>server.tomcat.threads.min-spare</code>：最少的工作线程数，默认大小是 10。该参数相当于长期工，如果并发请求的数量达不到 10，就会依次使用这几个线程去处理请求。</p></li><li><p><code>server.tomcat.threads.max</code>：最大工作线程数，默认大小是 200。该参数相当于临时工，如果并发请求的数量在 10 到 200 之间，就会使用这些临时工线程进行处理。<mark>（建议这个配置数可以在服务器 CUP 核心数的 200~250 倍之间）</mark></p></li><li><p><code>server.tomcat.max-connections</code>：最大连接数，默认大小是 8192。表示 Tomcat 可以处理的最大请求数量，超过 8192 的请求就会被放入到等待队列。</p></li><li><p><code>server.tomcat.accept-count</code>：等待队列的长度，默认大小是 100。</p></li></ul><p>也就是说，SpringBoot 同时所能处理的最大请求数量是<code>max-connections+accept-count</code>，超过该数量的请求直接就会被丢掉。</p><h2 id="springboot-配置-tomcat" tabindex="-1"><a class="header-anchor" href="#springboot-配置-tomcat" aria-hidden="true">#</a> SpringBoot 配置 tomcat</h2><p>在 spring boot 配置文件中 application.yml，添加以下配置：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># Tomcat
server<span class="token operator">:</span>
  tomcat<span class="token operator">:</span>
    uri-encoding<span class="token operator">:</span> UTF<span class="token number">-8</span>
    #最小线程数
    min-spare-threads<span class="token operator">:</span> <span class="token number">500</span>
    #最大线程数
    max-threads<span class="token operator">:</span> <span class="token number">2500</span>
    #最大链接数
    max-connections<span class="token operator">:</span> <span class="token number">6500</span>
    #最大等待队列长度
    accept-count<span class="token operator">:</span> <span class="token number">1000</span>
    #请求头最大长度kb
    max-http-header-size<span class="token operator">:</span> <span class="token number">1048576</span>
    #请请求体最大长度kb
    #max-http-post-size<span class="token operator">:</span> <span class="token number">2097152</span>
  #链接建立超时时间
  connection-timeout<span class="token operator">:</span> <span class="token number">12000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),c=[t];function i(r,p){return e(),a("div",null,c)}const l=n(o,[["render",i],["__file","1.2-tomcat-config.html.vue"]]);export{l as default};
