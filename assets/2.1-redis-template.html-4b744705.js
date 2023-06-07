import{_ as s,W as n,X as a,a1 as t}from"./framework-ea95e8eb.js";const p={},e=t(`<h2 id="spring-boot-starter-data-redis" tabindex="-1"><a class="header-anchor" href="#spring-boot-starter-data-redis" aria-hidden="true">#</a> spring-boot-starter-data-redis</h2><p><code>spring-boot-starter-data-redis</code> 是 SpringBoot 针对 Redis 提供的自动配置模块，其依赖为：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code>spring-boot-starter-data-redis</code> 的自动配置，SpringBoot 会自动识别 Redis 连接客户端的类型，进行相应的配置。</p><p>其默认的 Redis 客户端为 <code>Lettuce</code>，可以通过排除 Lettuce 的依赖，同时引入其他 Redis 客户端来替换为其他客户端，示例：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code> <span class="token comment">&lt;!-- Spring Data Redis （排除 lettuce，使用 Jedis） --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">&gt;</span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.lettuce<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>lettuce-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- 引入 Jedis 的依赖，这样 Spring Boot 实现对 Jedis 的自动化配置 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>redis.clients<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>jedis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="redis-配置文件" tabindex="-1"><a class="header-anchor" href="#redis-配置文件" aria-hidden="true">#</a> Redis 配置文件</h2><p>在 <code>application.yml</code> 中，可以对 Redis 进行配置，例如：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment"># 对应 RedisProperties 类</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> 127.0.0.1
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token comment"># Redis 服务器密码，默认为空。生产中，一定要设置 Redis 密码！</span>
    <span class="token key atrule">database</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token comment"># Redis 数据库号，默认为 0。</span>
    <span class="token key atrule">timeout</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token comment"># Redis 连接超时时间，单位：毫秒。</span>
    <span class="token comment"># 对应 RedisProperties.Jedis 内部类</span>
    <span class="token key atrule">jedis</span><span class="token punctuation">:</span>
      <span class="token key atrule">pool</span><span class="token punctuation">:</span>
        <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">8</span> <span class="token comment"># 连接池最大连接数，默认为 8。使用负数表示没有限制。</span>
        <span class="token key atrule">max-idle</span><span class="token punctuation">:</span> <span class="token number">8</span> <span class="token comment"># 默认连接数最小空闲的连接数，默认为 8。使用负数表示没有限制。</span>
        <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token comment"># 默认连接池最小空闲的连接数，默认为 0。允许设置 0 和 正数。</span>
        <span class="token key atrule">max-wait</span><span class="token punctuation">:</span> <span class="token number">-1</span> <span class="token comment"># 连接池最大阻塞等待时间，单位：毫秒。默认为 -1，表示不限制。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其对应的属性文件为 <code>org.springframework.data.redis.support.collections.RedisProperties</code>。</p><h2 id="redistemplate" tabindex="-1"><a class="header-anchor" href="#redistemplate" aria-hidden="true">#</a> RedisTemplate</h2><p><code>RedisTemplate</code> 是 Spring 抽离出的 Redis 操作模板方法，这样不需要关心 Redis 客户端实现，使用一套方法即可不同客户端操作 Redis。</p><p><code>RedisTemplate</code> 的主要属性：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">extends</span> <span class="token class-name">RedisAccessor</span> <span class="token keyword">implements</span> <span class="token class-name">RedisOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span> <span class="token class-name">BeanClassLoaderAware</span> <span class="token punctuation">{</span>

   <span class="token comment">// 用于指定不同 key 和 value 的序列化和反序列化的方式</span>
	<span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;rawtypes&quot;</span><span class="token punctuation">)</span> <span class="token keyword">private</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">RedisSerializer</span> keySerializer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;rawtypes&quot;</span><span class="token punctuation">)</span> <span class="token keyword">private</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">RedisSerializer</span> valueSerializer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;rawtypes&quot;</span><span class="token punctuation">)</span> <span class="token keyword">private</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">RedisSerializer</span> hashKeySerializer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;rawtypes&quot;</span><span class="token punctuation">)</span> <span class="token keyword">private</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">RedisSerializer</span> hashValueSerializer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token class-name">RedisSerializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> stringSerializer <span class="token operator">=</span> <span class="token class-name">RedisSerializer</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token comment">//  Lua 脚本执行器</span>
	<span class="token keyword">private</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">ScriptExecutor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">&gt;</span></span> scriptExecutor<span class="token punctuation">;</span>

   <span class="token comment">// 各种具体数据结构的操作类</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ValueOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> valueOps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultValueOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ListOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> listOps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultListOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">SetOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> setOps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultSetOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">StreamOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span> streamOps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultStreamOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>
			<span class="token class-name">ObjectHashMapper</span><span class="token punctuation">.</span><span class="token function">getSharedInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ZSetOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> zSetOps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultZSetOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">GeoOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> geoOps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultGeoOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">HyperLogLogOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> hllOps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultHyperLogLogOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ClusterOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> clusterOps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultClusterOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>RedisTemplate</code> 的主要属性中，前面四个 <code>RedisSerializer</code> 类型的属性用于指定不同 key 和 value 的序列化和反序列化的方式；<code>scriptExecutor</code> 是一个 Lua 脚本执行器；其他 <code>xxxOperations&lt;K, V&gt;</code> 类型的属性是针对 Redis 不同数据结构而设计的操作接口实现类，比如 <code>SetOperations</code> 定义了操作 Redis Set 数据类型的操作方法，而 <code>DefaultSetOperations</code> 是它的默认实现类。</p><p>需要注意的是，<code>RedisTemplate</code> 本身还具有操作 Redis 的通用操作方法，这些 <code>Operations</code> 通常是用来操作具体的数据结构时才使用。</p><h2 id="序列化" tabindex="-1"><a class="header-anchor" href="#序列化" aria-hidden="true">#</a> 序列化</h2><p>Redis 的 key 和 value 在写入到 Redis 和从 Redis 读取的时候，都需要先序列化成二进制数组，然后再反序列化为原来的数据结构，这个序列化和序列化都需要序列化器（RedisSerializer）去实现。</p><p>SpringDataRedis 中的 <code>RedisSerializer&lt;T&gt;</code> 就是序列化器的接口，</p>`,19),o=[e];function c(l,i){return n(),a("div",null,o)}const k=s(p,[["render",c],["__file","2.1-redis-template.html.vue"]]);export{k as default};
