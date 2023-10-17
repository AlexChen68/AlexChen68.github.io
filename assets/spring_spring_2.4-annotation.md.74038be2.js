import{_ as a,o as e,c as o,Q as r}from"./chunks/framework.419948d5.js";const q=JSON.parse('{"title":"Spring 常用注解","description":"","frontmatter":{"title":"Spring 常用注解","index":false,"article":true,"date":"2022-10-12T00:00:00.000Z"},"headers":[],"relativePath":"spring/spring/2.4-annotation.md","filePath":"spring/spring/2.4-annotation.md","lastUpdated":1697504454000}'),t={name:"spring/spring/2.4-annotation.md"},i=r('<h1 id="spring-常用核心注解" tabindex="-1">Spring 常用核心注解 <a class="header-anchor" href="#spring-常用核心注解" aria-label="Permalink to &quot;Spring 常用核心注解&quot;">​</a></h1><h2 id="核心注解" tabindex="-1">核心注解 <a class="header-anchor" href="#核心注解" aria-label="Permalink to &quot;核心注解&quot;">​</a></h2><h3 id="springbootapplication" tabindex="-1">@SpringBootApplication <a class="header-anchor" href="#springbootapplication" aria-label="Permalink to &quot;@SpringBootApplication&quot;">​</a></h3><p>通常用在启动类上，申明让 spring boot 自动给程序进行必要的配置，它也是 Spring Boot 的核心注解，主要组合包含了以下 3 个注解：</p><ul><li>@SpringBootConfiguration</li><li>@EnableAutoConfiguration</li><li>@ComponentScan</li></ul><h3 id="springbootconfiguration" tabindex="-1">@SpringBootConfiguration <a class="header-anchor" href="#springbootconfiguration" aria-label="Permalink to &quot;@SpringBootConfiguration&quot;">​</a></h3><p>组合了 @Configuration 注解，实现配置文件的功能。</p><h3 id="enableautoconfiguration" tabindex="-1">@EnableAutoConfiguration <a class="header-anchor" href="#enableautoconfiguration" aria-label="Permalink to &quot;@EnableAutoConfiguration&quot;">​</a></h3><p>打开自动配置的功能，也可以关闭某个自动配置的选项。</p><p>如关闭数据源自动配置功能： @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })；</p><h3 id="componentscan" tabindex="-1">@ComponentScan <a class="header-anchor" href="#componentscan" aria-label="Permalink to &quot;@ComponentScan&quot;">​</a></h3><p>Spring 组件扫描功能，让 spring Boot 扫描到 Configuration 类并把它加入到程序上下文。</p><p>可以通过配置其 basePackages 属性或者 value 属性来配置需要扫描的包路径。value 属性是 basePackages 的别名。</p><h2 id="配置注解" tabindex="-1">配置注解 <a class="header-anchor" href="#配置注解" aria-label="Permalink to &quot;配置注解&quot;">​</a></h2><h3 id="configuration" tabindex="-1">@Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;@Configuration&quot;">​</a></h3><p><code>@Configuration</code> 用于定义<strong>配置类</strong>，被注解的类内部包含有一个或多个被@Bean 注解的方法，这些方法将会被 <code>AnnotationConfigApplicationContext</code> 或 <code>AnnotationConfigWebApplicationContext</code> 类进行扫描，并用于构建 bean 定义，初始化 Spring 容器。</p><h3 id="bean" tabindex="-1">@Bean <a class="header-anchor" href="#bean" aria-label="Permalink to &quot;@Bean&quot;">​</a></h3><p>@Bean 注解主要的作用是告知 Spring，被此注解所标注的类将需要纳入到 Bean 管理工厂中。</p><p><code>initMethod</code> 和 <code>destroyMethod</code> 属性用来配置初始化和销毁的回调方法。</p><h3 id="scope" tabindex="-1">@Scope <a class="header-anchor" href="#scope" aria-label="Permalink to &quot;@Scope&quot;">​</a></h3><p>@Scope 注解可以用来定义 @Component 标注的类的作用范围以及 @Bean 所标记的类的作用范围。</p><p>@Scope 所限定的作用范围有：singleton、prototype、request、session、globalSession 或者其他的自定义范围。</p><h3 id="import" tabindex="-1">@Import <a class="header-anchor" href="#import" aria-label="Permalink to &quot;@Import&quot;">​</a></h3><p>用来导入其他配置类。</p><h3 id="importresource" tabindex="-1">@ImportResource <a class="header-anchor" href="#importresource" aria-label="Permalink to &quot;@ImportResource&quot;">​</a></h3><p>用来加载 xml 配置文件。</p><h3 id="autowired" tabindex="-1">@Autowired <a class="header-anchor" href="#autowired" aria-label="Permalink to &quot;@Autowired&quot;">​</a></h3><p>自动导入依赖的 bean，自动导入依赖的 bean。byType 方式。把配置好的 Bean 拿来用，完成属性、方法的组装，它可以对类成员变量、方法及构造函数进行标注，完成自动装配的工作。当加上（required=false）时，就算找不到 bean 也不报错。</p><h3 id="resource-name-name-type-type" tabindex="-1">@Resource(name=&quot;name&quot;,type=&quot;type&quot;) <a class="header-anchor" href="#resource-name-name-type-type" aria-label="Permalink to &quot;@Resource(name=&quot;name&quot;,type=&quot;type&quot;)&quot;">​</a></h3><p>Spring 还通过在字段或 bean 属性 setter 方法上使用 JSR-250 @Resource(javax.annotation.Resource) 注解来支持注入。</p><p>@Resource 在没有明确指定 name 时，其行为类似于 @Autowired。</p><h3 id="inject" tabindex="-1">@Inject <a class="header-anchor" href="#inject" aria-label="Permalink to &quot;@Inject&quot;">​</a></h3><p>等价于默认的@Autowired，只是没有 required 属性。</p><h3 id="autowired-1" tabindex="-1">@Autowired <a class="header-anchor" href="#autowired-1" aria-label="Permalink to &quot;@Autowired&quot;">​</a></h3><p><code>@Autowired</code> 注解用于标记 Spring 将要解析和注入的依赖项。此注解可以作用在构造函数、字段和 setter 方法上。</p><h3 id="primary" tabindex="-1">@Primary <a class="header-anchor" href="#primary" aria-label="Permalink to &quot;@Primary&quot;">​</a></h3><p>当系统中需要配置多个具有相同类型的 Bean 时，<code>@Primary</code> 可以定义这些 Bean 的优先级。</p><h3 id="qualifier" tabindex="-1">@Qualifier <a class="header-anchor" href="#qualifier" aria-label="Permalink to &quot;@Qualifier&quot;">​</a></h3><p>当系统中存在同一类型的多个 Bean 时，<code>@Autowired</code> 在进行依赖注入的时候就不知道该选择哪一个实现类进行注入。此时，我们可以使用@Qualifier 注解来指定实现类。</p><h3 id="value" tabindex="-1">@value <a class="header-anchor" href="#value" aria-label="Permalink to &quot;@value&quot;">​</a></h3><p>@Value 通常用于注入外部属性。</p><h3 id="profiles" tabindex="-1">@Profiles <a class="header-anchor" href="#profiles" aria-label="Permalink to &quot;@Profiles&quot;">​</a></h3><p>Spring Profiles 提供了一种隔离应用程序配置的方式，并让这些配置只能在特定的环境下生效。任何@Component 或@Configuration 都能被@Profile 标记，从而限制加载它的时机。</p><h3 id="configurationproperties" tabindex="-1">@ConfigurationProperties <a class="header-anchor" href="#configurationproperties" aria-label="Permalink to &quot;@ConfigurationProperties&quot;">​</a></h3><p>将外部配置的属性，绑定到当前 Bean 中，通常用于从 <code>application.yml</code> 等配置文件中加载自定义配置。</p><h2 id="业务注解" tabindex="-1">业务注解 <a class="header-anchor" href="#业务注解" aria-label="Permalink to &quot;业务注解&quot;">​</a></h2><h3 id="component" tabindex="-1">@Component <a class="header-anchor" href="#component" aria-label="Permalink to &quot;@Component&quot;">​</a></h3><p>泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注。</p><h3 id="controller" tabindex="-1">@Controller <a class="header-anchor" href="#controller" aria-label="Permalink to &quot;@Controller&quot;">​</a></h3><p>用于定义控制器类，在 spring 项目中由控制器负责将用户发来的 URL 请求转发到对应的服务接口（service 层），一般这个注解在类中，通常方法需要配合注解@RequestMapping；</p><h3 id="responsebody" tabindex="-1">@ResponseBody <a class="header-anchor" href="#responsebody" aria-label="Permalink to &quot;@ResponseBody&quot;">​</a></h3><p>表示该方法的返回结果直接写入 HTTP response body 中，一般在异步获取数据时使用，用于构建 RESTful 的 api。</p><p>在使用@RequestMapping 后，返回值通常解析为跳转路径，加上@esponsebody 后返回结果不会被解析为跳转路径，而是直接写入 HTTP response body 中。</p><p>比如异步获取 json 数据，加上@Responsebody 后，会直接返回 json 数据。该注解一般会配合@RequestMapping 一起使用；</p><h3 id="requestmapping" tabindex="-1">@RequestMapping <a class="header-anchor" href="#requestmapping" aria-label="Permalink to &quot;@RequestMapping&quot;">​</a></h3><p>提供路由信息，负责 URL 到 Controller 中的具体函数的映射；</p><p>该注解包含以下 6 个属性：（常用 value）</p><ul><li>params：指定 request 中必须包含某些参数值是，才让该方法处理；</li><li>headers：指定 request 中必须包含某些指定的 header 值，才能让该方法处理请求；</li><li>value：指定请求的实际地址，指定的地址可以是 URI Template 模式；</li><li>method：指定请求的 method 类型，GET、POST、PUT、DELETE 等；</li><li>consumes：指定处理请求的提交内容类型（Content-Type），如 application/json,text/html；</li><li>produces：指定返回的内容类型，仅当 request 请求头中的 (Accept) 类型中包含该指定类型才返回。</li></ul><h3 id="restcontroller" tabindex="-1">@RestController <a class="header-anchor" href="#restcontroller" aria-label="Permalink to &quot;@RestController&quot;">​</a></h3><p>用于标注控制层组件 (如 struts 中的 action)，是@ResponseBody 和@Controller 的合集。</p><h3 id="service" tabindex="-1">@Service <a class="header-anchor" href="#service" aria-label="Permalink to &quot;@Service&quot;">​</a></h3><p>一般用于修饰 service 层的组件。</p><h3 id="repository" tabindex="-1">@Repository <a class="header-anchor" href="#repository" aria-label="Permalink to &quot;@Repository&quot;">​</a></h3><p>用于标注数据访问组件，即 DAO 组件。</p><h3 id="pathvariable" tabindex="-1">@PathVariable <a class="header-anchor" href="#pathvariable" aria-label="Permalink to &quot;@PathVariable&quot;">​</a></h3><p>路径变量，参数与大括号里的名字一样要相同。</p>',66),n=[i];function l(p,s,h,c,u,d){return e(),o("div",null,n)}const m=a(t,[["render",l]]);export{q as __pageData,m as default};