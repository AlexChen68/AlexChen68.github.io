import{_ as s,W as i,X as a,Z as n,$ as l,a0 as r,a1 as d,C as c}from"./framework-ea95e8eb.js";const t={},v=d(`<h2 id="spring-循环依赖问题" tabindex="-1"><a class="header-anchor" href="#spring-循环依赖问题" aria-hidden="true">#</a> Spring 循环依赖问题</h2><p>什么是循环依赖呢？可以把它拆分成循环和依赖两个部分来看，循环是指计算机领域中的循环，执行流程形成闭合回路；依赖就是完成这个动作的前提准备条件，和我们平常说的依赖大体上含义一致。放到 Spring 中来看就一个或多个 Bean 实例之间存在直接或间接的依赖关系，构成循环调用，循环依赖可以分为直接循环依赖和间接循环依赖。</p><p>直接循环依赖的简单依赖场景：Bean A 依赖于 Bean B，然后 Bean B 又反过来依赖于 Bean A（Bean A -&gt; Bean B -&gt; Bean A）；</p><p>间接循环依赖的一个依赖场景：Bean A 依赖于 Bean B，Bean B 依赖于 Bean C，Bean C 依赖于 Bean A，中间多了一层，但是最终还是形成循环（Bean A -&gt; Bean B -&gt; Bean C -&gt; Bean A）。</p><h2 id="循环依赖的类型" tabindex="-1"><a class="header-anchor" href="#循环依赖的类型" aria-hidden="true">#</a> 循环依赖的类型</h2><p>第一种是<strong>自依赖</strong>，自己依赖自己从而形成循环依赖，一般情况下不会发生这种循环依赖，因为它很容易被我们发现。</p><p><img src="https://i.loli.net/2021/07/17/LGgVfXmPKU3EwcS.png" alt="1.png" loading="lazy"></p><p>第二种是<strong>直接依赖</strong>，发生在两个对象之间，比如：Bean A 依赖于 Bean B，然后 Bean B 又反过来依赖于 Bean A，如果比较细心的话肉眼也不难发现。</p><p><img src="https://i.loli.net/2021/07/17/yNlpDUtmQT2RXnu.png" alt="2.png" loading="lazy"></p><p>第三种是<strong>间接依赖</strong>，这种依赖类型发生在 3 个或者以上的对象依赖的场景，间接依赖最简单的场景：Bean A 依赖于 Bean B，Bean B 依赖于 Bean C，Bean C 依赖于 Bean A，可以想象当中间依赖的对象很多时，是很难发现这种循环依赖的，一般都是借助一些工具排查。</p><p><img src="https://i.loli.net/2021/07/17/OH3JobWDSPqrYZE.png" alt="3.png" loading="lazy"></p><h2 id="spring-三级缓存" tabindex="-1"><a class="header-anchor" href="#spring-三级缓存" aria-hidden="true">#</a> Spring 三级缓存</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/** Cache of singleton objects: bean name --&gt; bean instance */</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> singletonObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token doc-comment comment">/** Cache of early singleton objects: bean name --&gt; bean instance */</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> earlySingletonObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/** Cache of singleton factories: bean name --&gt; ObjectFactory */</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">ObjectFactory</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> singletonFactories <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">ObjectFactory</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第一层缓存（singletonObjects）</strong>：单例对象缓存池，已经实例化并且属性赋值，这里的对象是<strong>成熟对象</strong>；</p><p><strong>第二层缓存（earlySingletonObjects）</strong>：单例对象缓存池，已经实例化但尚未属性赋值，这里的对象是<strong>半成品对象</strong>；</p><p><strong>第三层缓存（singletonFactories）</strong>: 单例工厂的缓存</p><h2 id="spring-对几种循环依赖场景支持情况" tabindex="-1"><a class="header-anchor" href="#spring-对几种循环依赖场景支持情况" aria-hidden="true">#</a> Spring 对几种循环依赖场景支持情况</h2><p>在介绍 Spring 对几种循环依赖场景的处理方式之前，先来看看在 Spring 中循环依赖会有哪些场景，大部分常见的场景总结如下图所示：</p><p><img src="https://i.loli.net/2021/07/17/qu4Y6s8nBi1NvRa.png" alt="4.png" loading="lazy"></p><p>有句话说得好，源码之下无秘密，下面就通过源码探究这些场景 Spring 是否支持，以及支持的原因或者不支持的原因，话不多说，下面进入正题。</p><h3 id="第-1-种场景——单例-bean-的-setter-注入" tabindex="-1"><a class="header-anchor" href="#第-1-种场景——单例-bean-的-setter-注入" aria-hidden="true">#</a> 第 ① 种场景——单例 Bean 的 setter 注入</h3><p>这种使用方式也是最常用的方式之一，假设有两个 Service 分别为 OrderService（订单相关业务逻辑）和 TradeService（交易相关业务逻辑），代码如下：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
public class OrderService {

  @Autowired
  private TradeService tradeService;

  public void testCreateOrder() {
    // omit business logic ...
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
public class TradeService {

  @Autowired
  private OrderService orderService;

  public void testCreateTrade() { 
    // omit business logic ...
   }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种循环依赖场景，程序是可以正常运行的，从代码上看确实是有循环依赖了，也就是说 Spring 是支持这种循环依赖场景的，这里我们察觉不到循环依赖的原因是 Spring 已经默默地解决了。</p><p>假设没有做任何处理，按照正常的创建逻辑来执行的话，流程是这样的：容器先创建 OrderService，发现依赖于 TradeService，再创建 OrderService，又发现依赖于 TradeService ... ，发生无限死循环，最后发生栈溢出错误，程序停止。为了支持这种常见的循环依赖场景，Spring 将创建对象分为如下几个步骤：</p><ol><li>实例化一个新对象（在堆中），但此时尚未给对象属性赋值</li><li>给对象赋值</li><li>调用 BeanPostProcessor 的一些实现类的方法，在这个阶段，Bean 已经创建并赋值属性完成。这时候容器中所有实现 BeanPostProcessor 接口的类都会被调用（e.g. AOP）</li><li>初始化（如果实现了 InitializingBean，就会调用这个类的方法来完成类的初始化）</li><li>返回创建出来的实例</li></ol><p>为此，Spring 引入了三级缓存来处理这个问题（三级缓存定义在 org.springframework.beans.factory.support.DefaultSingletonBeanRegistry 中），第一级缓存 singletonObjects 用于存放完全初始化好的 Bean，从该缓存中取出的 Bean 可以直接使用，第二级缓存 earlySingletonObjects 用于存放提前暴露的单例对象的缓存，存放原始的 Bean 对象（属性尚未赋值），用于解决循环依赖，第三级缓存 singletonFactories 用于存放单例对象工厂的缓存，存放 Bean 工厂对象，用于解决循环依赖。上述实例使用三级缓存的处理流程如下所示：</p><p><img src="https://i.loli.net/2021/07/17/jPUQ6Sfs8mpBtLg.png" alt="5.png" loading="lazy"></p><p>如果你看过三级缓存的定义源码的话，可能也有这样的疑问：为什么第三级的缓存的要定义成 Map&lt;String, ObjectFactory&lt;?&gt;&gt;，不能直接缓存对象吗？这里不能直接保存对象实例，因为这样就无法对其做增强处理了。详情可见类 org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#doCreateBean 方法部分源码如下：</p><p><img src="https://i.loli.net/2021/07/17/ribwoNKSgs7L3Jn.png" alt="6.png" loading="lazy"></p><h3 id="第-2-种场景——多例-bean-的-setter-注入" tabindex="-1"><a class="header-anchor" href="#第-2-种场景——多例-bean-的-setter-注入" aria-hidden="true">#</a> 第 ② 种场景——多例 Bean 的 setter 注入</h3><p>这种方式平常使用得相对较少，还是使用前文的两个 Service 作为示例，唯一不同的地方是现在都声明为多例了，示例代码如下：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class OrderService {

  @Autowired
  private TradeService tradeService;

  public void testCreateOrder() {
    // omit business logic ...
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class TradeService {

  @Autowired
  private OrderService orderService;

  public void testCreateTrade() { 
    // omit business logic ...
   }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你在 Spring 中运行以上代码，是可以正常启动成功的，原因是在类 org.springframework.beans.factory.support.DefaultListableBeanFactory 的 preInstantiateSingletons() 方法预实例化处理时，过滤掉了多例类型的 Bean，方法部分代码如下：</p><p><img src="https://i.loli.net/2021/07/17/jO3nk4vrZ9yhXSi.png" alt="7.png" loading="lazy"></p><p>但是如果此时有其它单例类型的 Bean 依赖到这些多例类型的 Bean 的时候，就会报如下所示的循环依赖错误了。</p><p><img src="https://i.loli.net/2021/07/17/MDVst5Er2UXCRzm.png" alt="8.png" loading="lazy"></p><h3 id="第-3-种场景——代理对象的-setter-注入" tabindex="-1"><a class="header-anchor" href="#第-3-种场景——代理对象的-setter-注入" aria-hidden="true">#</a> 第 ③ 种场景——代理对象的 setter 注入</h3><p>这种场景也会经常碰到，有时候为了实现异步调用会在 XXXXService 类的方法上添加 @Async 注解，让方法对外部变成异步调用（前提要是要在启用类上添加启用注解哦 @EnableAsync），示例代码如下：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * @author mghio
 * @since 2021-07-17
 */
@EnableAsync
@SpringBootApplication
public class BlogMghioCodeApplication {

  public static void main(String[] args) {
    SpringApplication.run(BlogMghioCodeApplication.class, args);
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class OrderService {

  @Autowired
  private TradeService tradeService;

  @Async
  public void testCreateOrder() {
    // omit business logic ...
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class TradeService {

  @Autowired
  private OrderService orderService;

  public void testCreateTrade() { 
    // omit business logic ...
   }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在标有 @Async 注解的场景下，在添加启用异步注解（@EnableAsync）后，代理对象会通过 AOP 自动生成。以上代码运行会抛出 BeanCurrentlyInCreationException 异常。运行的大致流程如下图所示：</p><p><img src="https://i.loli.net/2021/07/17/UMEi1GCOo3FDmKB.png" alt="9.png" loading="lazy"></p><p>源码在 org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory 类的方法 doCreateBean 中，会判断第二级缓存 earlySingletonObjects 中的对象是否等于原始对象，方法判断部分的源码如下：</p><p><img src="https://i.loli.net/2021/07/17/685tnVsEjD7aqWh.png" alt="10.png" loading="lazy"></p><p>二级缓存存放的对象是 AOP 生成出来的代理对象，和原始对象不相等，所以抛出了循环依赖错误。如果细看源码的话，会发现如果二级缓存是空的话会直接返回（因为比较的对象都没有，根本无法校验了），就不会报循环依赖的错误了，默认情况下，Spring 是按照文件全路径递归搜索，按路径 + 文件名 排序，排序靠前先加载，所以我们只要调整这两个类名称，让方法标有 @Async 注解的类排序在后面即可。</p><h3 id="第-4-种场景——构造器注入" tabindex="-1"><a class="header-anchor" href="#第-4-种场景——构造器注入" aria-hidden="true">#</a> 第 ④ 种场景——构造器注入</h3><p>构造器注入的场景很少，到目前为止我所接触过的公司项目和开源项目中还没遇到使用构造器注入的，虽然用得不多，但是需要知道 Spring 为什么不支持这种场景的循环依赖，构造器注入的示例代码如下：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
public class OrderService {

  private TradeService tradeService;

  public OrderService(TradeService tradeService) {
    this.tradeService = tradeService;
  }

  public void testCreateOrder() {
    // omit business logic ...
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
public class TradeService {

  private OrderService orderService;

  public TradeService(OrderService orderService) {
    this.orderService = orderService;
  }

  public void testCreateTrade() {
    // omit business logic ...
  }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构造器注入无法加入到第三级缓存当中，Spring 框架中的三级缓存在此场景下无用武之地，所以只能抛出异常，整体流程如下（虚线表示无法执行，为了直观也把下一步画出来了）:</p><p><img src="https://i.loli.net/2021/07/17/k3f7VgNIyQjnUwG.png" alt="11.png" loading="lazy"></p><h3 id="第-5-种场景——dependson-循环依赖" tabindex="-1"><a class="header-anchor" href="#第-5-种场景——dependson-循环依赖" aria-hidden="true">#</a> 第 ⑤ 种场景——DependsOn 循环依赖</h3><p>这种 DependsOn 循环依赖场景很少，一般情况下不怎么使用，了解一下会导致循环依赖的问题即可，@DependsOn 注解主要是用来指定实例化顺序的，示例代码如下：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@DependsOn(&quot;tradeService&quot;)
public class OrderService {

  @Autowired
  private TradeService tradeService;

  public void testCreateOrder() {
    // omit business logic ...
  }

}
/**
 * @author mghio
 * @since 2021-07-17
 */
@Service
@DependsOn(&quot;orderService&quot;)
public class TradeService {

  @Autowired
  private OrderService orderService;

  public void testCreateTrade() {
    // omit business logic ...
  }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上文，我们知道，如果这里的类没有标注 @DependsOn 注解的话是可以正常运行的，因为 Spring 支持单例 setter 注入，但是加了示例代码的 @DependsOn 注解后会报循环依赖错误，原因是在类 org.springframework.beans.factory.support.AbstractBeanFactory 的方法 doGetBean() 中检查了 dependsOn 的实例是否有循环依赖，如果有循环依赖则抛出循环依赖异常，方法判断部分代码如下：</p><p><img src="https://i.loli.net/2021/07/17/DdnyNJAe15rpkjZ.png" alt="12.png" loading="lazy"></p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,56),p={href:"https://www.cnblogs.com/mghio/p/15024461.html",target:"_blank",rel:"noopener noreferrer"};function o(u,m){const e=c("ExternalLinkIcon");return i(),a("div",null,[v,n("ul",null,[n("li",null,[n("a",p,[l("Spring 的循环依赖问题"),r(e)])])])])}const g=s(t,[["render",o],["__file","2.3-circular-dependency.html.vue"]]);export{g as default};
