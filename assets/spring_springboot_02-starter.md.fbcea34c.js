import{_ as a,o as s,c as n,Q as e}from"./chunks/framework.419948d5.js";const h=JSON.parse('{"title":"SpringBoot Starter 启动器","description":"","frontmatter":{"title":"SpringBoot Starter 启动器","date":"2022-09-15T00:00:00.000Z","tag":"Springboot Starter"},"headers":[],"relativePath":"spring/springboot/02-starter.md","filePath":"spring/springboot/02-starter.md","lastUpdated":1698482261000}'),r={name:"spring/springboot/02-starter.md"},o=e(`<p>SpringBoot Starter 启动器</p><h2 id="springboot-starter-简介" tabindex="-1">SpringBoot Starter 简介 <a class="header-anchor" href="#springboot-starter-简介" aria-label="Permalink to &quot;SpringBoot Starter 简介&quot;">​</a></h2><h3 id="什么是-springboot-starter" tabindex="-1">什么是 SpringBoot Starter？ <a class="header-anchor" href="#什么是-springboot-starter" aria-label="Permalink to &quot;什么是 SpringBoot Starter？&quot;">​</a></h3><p>Starter 是 Spring Boot 中的一个非常重要的概念，Starter 相当于模块，它能将模块所需的依赖整合起来并对模块内的 Bean 根据环境（条件）进行自动配置。</p><p><strong>使用者只需要依赖相应功能的 Starter，无需做过多的配置和依赖，Spring Boot 就能自动扫描并加载相应的模块并设置默认值，做到开箱即用。</strong></p><h3 id="springboot-自动装配" tabindex="-1">SpringBoot 自动装配 <a class="header-anchor" href="#springboot-自动装配" aria-label="Permalink to &quot;SpringBoot 自动装配&quot;">​</a></h3><p>SpringBoot 中的 starter 是一种非常重要的机制，能够抛弃以前繁杂的配置，将其统一集成进 starter，应用者只需要在 maven 中引入 starter 依赖，Spring Boot 就能自动扫描各个 jar 包下 classpath 路径的 <code>spring.factories</code> 文件，加载自动配置类信息，加载相应的 bean 信息并启动相应的<code>默认配置</code>。</p><p>Spring Boot 提供了针对日常企业应用研发各种场景的 spring-boot-starter 依赖模块。所有这些依赖模块都遵循着约定成俗的默认配置，并允许我们调整这些配置，即遵循“<code>约定大于配置</code>”的理念。</p><h2 id="自定义-springboot-starter" tabindex="-1">自定义 SpringBoot Starter <a class="header-anchor" href="#自定义-springboot-starter" aria-label="Permalink to &quot;自定义 SpringBoot Starter&quot;">​</a></h2><h3 id="为什么要自定义-starter" tabindex="-1">为什么要自定义 Starter？ <a class="header-anchor" href="#为什么要自定义-starter" aria-label="Permalink to &quot;为什么要自定义 Starter？&quot;">​</a></h3><p><strong>痛点</strong>：日常开发中一些独立于业务之外的通用模块，如果多个工程需要复用的时候，需要将代码硬拷贝到另一个工程并重新集成一遍，麻烦至极。</p><p><strong>解决方案</strong>：把这些功能模块封装成自定义的 starter，复用的时候只需要将其在 pom 中引用依赖即可，再由 SpringBoot 为我们完成自动装配。</p><p><strong>应用场景</strong>：动态数据源、登录模块、基于 AOP 技术实现日志切面...</p><h3 id="starter-的命名规则" tabindex="-1">Starter 的命名规则 <a class="header-anchor" href="#starter-的命名规则" aria-label="Permalink to &quot;Starter 的命名规则&quot;">​</a></h3><p><strong>SpringBoot 官方提供的 starter</strong>：以 <code>spring-boot-starter-XXX</code> 的方式命名的。</p><p><strong>自定义的 starter</strong>：以 <code>XXX-spring-boot-starter</code> 命名规则。【为了区分 SpringBoot 生态提供的 starter】</p><h3 id="如何自定义-springboot-starter" tabindex="-1">如何自定义 SpringBoot Starter？ <a class="header-anchor" href="#如何自定义-springboot-starter" aria-label="Permalink to &quot;如何自定义 SpringBoot Starter？&quot;">​</a></h3><ol><li><p>新建 Maven 工程</p></li><li><p>添加包含 <code>@Configuration</code>的配置类</p></li><li><p>在 <code>resources</code> 目录下，添加 <code>META-INF</code> 文件夹，在其中增加 <code>spring.factories</code> 文件，用于需要自动加载的配置类全限定类名，例如：</p></li></ol><div class="language-ini vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">org.springframework.boot.autoconfigure.EnableAutoConfiguration</span><span style="color:#E1E4E8;">=\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     tech.alexchen.starter.swagger.SwaggerConfiguration</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">org.springframework.boot.autoconfigure.EnableAutoConfiguration</span><span style="color:#24292E;">=\\</span></span>
<span class="line"><span style="color:#24292E;">     tech.alexchen.starter.swagger.SwaggerConfiguration</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="4"><li>在 SpringBoot3.x 中，将移除 <code>3.</code> 介绍的配置方式，这里介绍另一个方式：可以通过在自定义注解中，使用 <code>@Import</code> 导入需要装配的类；这样只需要在引入该 <code>Starter</code> 的工程配置类中，使用该注解即可自动装配该 <code>Starter</code> 的配置，例如：</li></ol><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Target</span><span style="color:#E1E4E8;">({ElementType.TYPE})</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Retention</span><span style="color:#E1E4E8;">(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Documented</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Inherited</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Import</span><span style="color:#E1E4E8;">({ SwaggerConfiguration.class })</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">EnableCommonSwagger</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Target</span><span style="color:#24292E;">({ElementType.TYPE})</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Retention</span><span style="color:#24292E;">(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Documented</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Inherited</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Import</span><span style="color:#24292E;">({ SwaggerConfiguration.class })</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">EnableCommonSwagger</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,21),t=[o];function p(l,i,c,g,d,b){return s(),n("div",null,t)}const u=a(r,[["render",p]]);export{h as __pageData,u as default};