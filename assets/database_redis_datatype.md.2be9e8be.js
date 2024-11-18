import{_ as e,o as r,c as a,Q as t}from"./chunks/framework.01af844e.js";const g=JSON.parse('{"title":"Redis 数据类型","description":"","frontmatter":{"title":"Redis 数据类型","date":"2023-02-12T00:00:00.000Z","order":101},"headers":[],"relativePath":"database/redis/datatype.md","filePath":"database/redis/datatype.md","lastUpdated":1731900098000}'),s={name:"database/redis/datatype.md"},o=t('<h1 id="redis-数据类型" tabindex="-1">Redis 数据类型 <a class="header-anchor" href="#redis-数据类型" aria-label="Permalink to &quot;Redis 数据类型&quot;">​</a></h1><h2 id="数据类型" tabindex="-1">数据类型 <a class="header-anchor" href="#数据类型" aria-label="Permalink to &quot;数据类型&quot;">​</a></h2><p>Redis 所有的 key（键）都是字符串。我们在谈基础数据结构时，讨论的是存储值的数据类型，主要包括常见的 5 种数据类型，分别是：</p><ul><li><strong>String</strong></li><li><strong>List</strong></li><li><strong>Set</strong></li><li><strong>Zset</strong></li><li><strong>Hash</strong></li></ul><p>此外，还有三种特殊的数据类型，分别是 <strong>HyperLogLogs</strong>（基数统计）， <strong>Bitmaps</strong> (位图) 和 <strong>geospatial</strong> （地理位置）。</p><p>Redis5.0 中还增加了一个数据类型 Stream，它借鉴了 Kafka 的设计，是一个新的强大的支持多播的可持久化的消息队列</p><h3 id="string" tabindex="-1">String <a class="header-anchor" href="#string" aria-label="Permalink to &quot;String&quot;">​</a></h3><p>Redis 字符串存储字节序列，包括文本、序列化对象和二进制数组。</p><p>因此，字符串是最基本的 Redis 数据类型。</p><p>它们通常用于缓存，但它们支持额外的功能，也可以实现计数器并执行按位操作。</p><p>默认情况下，单个 Redis 字符串最大为 512 MB。</p><p><strong>基本命令：</strong></p><ul><li><a href="https://redis.io/commands/set" target="_blank" rel="noreferrer"><code>SET</code></a> 存储字符串值。</li><li>仅当字符串值尚不存在时，<a href="https://redis.io/commands/setnx" target="_blank" rel="noreferrer"><code>SETNX</code></a> 才会存储该值。对于实现锁很有用。</li><li><a href="https://redis.io/commands/get" target="_blank" rel="noreferrer"><code>GET</code></a> 检索字符串值。</li><li><a href="https://redis.io/commands/mget" target="_blank" rel="noreferrer"><code>MGET</code></a> 在单个操作中检索多个字符串值。</li><li><a href="https://redis.io/commands/incrby" target="_blank" rel="noreferrer"><code>INCRBY</code></a>以原子方式递增（并在传递负数时递减）存储在给定键上的计数器。</li></ul><p>官方文档：<a href="https://redis.io/docs/data-types/strings/" target="_blank" rel="noreferrer">Redis Strings | Redis</a></p><p>String 完整命令列表：<a href="https://redis.io/commands/?group=string" target="_blank" rel="noreferrer">Commands | Redis</a></p><h3 id="list" tabindex="-1">List <a class="header-anchor" href="#list" aria-label="Permalink to &quot;List&quot;">​</a></h3><p>Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。</p><p>一个列表最多可以包含 2^32 - 1 个元素 (4294967295, 每个列表超过 40 亿个元素)。</p><p><strong>基本命令：</strong></p><ul><li><a href="https://redis.io/commands/lpush" target="_blank" rel="noreferrer"><code>LPUSH</code></a> 在列表的头部添加一个新元素;<a href="https://redis.io/commands/rpush" target="_blank" rel="noreferrer"><code>RPUSH</code></a>添加到尾部。</li><li><a href="https://redis.io/commands/lpop" target="_blank" rel="noreferrer"><code>LPOP</code></a> 从列表的头部删除并返回一个元素;<a href="https://redis.io/commands/rpop" target="_blank" rel="noreferrer"><code>RPOP</code></a> 执行相同的操作，但从列表的尾部。</li><li><a href="https://redis.io/commands/llen" target="_blank" rel="noreferrer"><code>LLEN</code></a> 返回列表的长度。</li><li><a href="https://redis.io/commands/lmove" target="_blank" rel="noreferrer"><code>LMOVE</code></a> 以原子方式将元素从一个列表移动到另一个列表。</li><li><a href="https://redis.io/commands/ltrim" target="_blank" rel="noreferrer"><code>LTRIM</code></a> 将列表缩减到指定的元素范围。</li><li><a href="https://redis.io/commands/blpop" target="_blank" rel="noreferrer"><code>BLPOP</code></a> 从列表的头部删除并返回一个元素。如果列表为空，则该命令将一直阻止，直到元素可用或达到指定的超时。</li><li><a href="https://redis.io/commands/blmove" target="_blank" rel="noreferrer"><code>BLMOVE</code></a> 以原子方式将元素从源列表移动到目标列表。如果源列表为空，则该命令将阻塞，直到新元素可用。</li></ul><p>官方文档：<a href="https://redis.io/docs/data-types/lists/" target="_blank" rel="noreferrer">Redis lists | Redis</a></p><p>List 完整命令列表：<a href="https://redis.io/commands/?group=list" target="_blank" rel="noreferrer">Commands | Redis</a></p><h3 id="set" tabindex="-1">Set <a class="header-anchor" href="#set" aria-label="Permalink to &quot;Set&quot;">​</a></h3><p>Redis Set 是唯一字符串（成员）的无序集合。您可以使用 Redis 集有效地：</p><ul><li>跟踪唯一项目（例如，跟踪访问给定博客文章的所有唯一 IP 地址）。</li><li>表示关系（例如，具有给定角色的所有用户的集合）。</li><li>执行常见的集合操作，例如交集、并集和差分。</li></ul><p><strong>基本命令：</strong></p><ul><li><a href="https://redis.io/commands/sadd" target="_blank" rel="noreferrer"><code>SADD</code></a> 将新成员添加到集合中。</li><li><a href="https://redis.io/commands/srem" target="_blank" rel="noreferrer"><code>SREM</code></a>从集合中删除指定的成员。</li><li><a href="https://redis.io/commands/sismember" target="_blank" rel="noreferrer"><code>SISMEMBER</code></a>测试字符串的集合成员资格。</li><li><a href="https://redis.io/commands/sinter" target="_blank" rel="noreferrer"><code>SINTER</code></a> 返回两个或多个集合共有的成员集（即交集）。</li><li><a href="https://redis.io/commands/scard" target="_blank" rel="noreferrer"><code>SCARD</code></a> 返回集合的大小（也称为基数）。</li></ul><p>官方文档：<a href="https://redis.io/docs/data-types/sets/" target="_blank" rel="noreferrer">Redis sets | Redis</a></p><p>Set 完整命令列表：<a href="https://redis.io/commands/?group=set" target="_blank" rel="noreferrer">Commands | Redis</a></p><h3 id="sorted-set" tabindex="-1">Sorted Set <a class="header-anchor" href="#sorted-set" aria-label="Permalink to &quot;Sorted Set&quot;">​</a></h3><p>Redis sorted set 和 set 一样也是 string 类型元素的集合，且不允许重复的成员。</p><p>不同的是每个元素都会关联一个 double 类型的分数。redis 正是通过分数来为集合中的成员进行从小到大的排序。</p><p>有序集合的成员是唯一的，但分数 (score) 却可以重复。</p><p>集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。集合中最大的成员数为 232 - 1 (4294967295, 每个集合可存储 40 多亿个成员)。</p><p>Redis sorted set(排序集) 是按关联分数排序的唯一字符串（成员）的集合。当多个字符串具有相同的分数时，字符串按字典顺序排列。排序集的一些用例包括：</p><ul><li>排行榜。例如，您可以使用排序集轻松维护大型在线游戏中最高分的有序列表。</li><li>速率限制器。特别是，您可以使用排序集来构建滑动窗口速率限制器，以防止过多的 API 请求。</li></ul><p><strong>基本命令：</strong></p><ul><li><a href="https://redis.io/commands/zadd" target="_blank" rel="noreferrer"><code>ZADD</code></a>将新成员和关联的分数添加到已排序的集合中。如果该成员已经存在，则更新分数。</li><li><a href="https://redis.io/commands/zrange" target="_blank" rel="noreferrer"><code>ZRANGE</code></a>返回在给定范围内排序的有序集合的成员。</li><li><a href="https://redis.io/commands/zrank" target="_blank" rel="noreferrer"><code>ZRANK</code></a>返回所提供成员的排名，假设排序是按升序排列。</li><li><a href="https://redis.io/commands/zrevrank" target="_blank" rel="noreferrer"><code>ZREVRANK</code></a>返回所提供成员的排名，假设排序集按降序排列。</li></ul><p>官方文档：<a href="https://redis.io/docs/data-types/sorted-sets/#" target="_blank" rel="noreferrer">Redis sorted sets | Redis</a></p><p>Zset 完整命令列表：<a href="https://redis.io/commands/?group=sorted-set" target="_blank" rel="noreferrer">Commands | Redis</a></p><h3 id="hash" tabindex="-1">Hash <a class="header-anchor" href="#hash" aria-label="Permalink to &quot;Hash&quot;">​</a></h3><p>Redis hash 是一个 string 类型的 field（字段）和 value（值）的映射表，hash 特别适合用于存储对象。</p><p>Redis 中每个 hash 可以存储 232 - 1 键值对（40 多亿）。</p><p><strong>基本命令：</strong></p><ul><li><a href="https://redis.io/commands/hset" target="_blank" rel="noreferrer"><code>HSET</code></a> 在哈希上设置一个或多个字段的值。</li><li><a href="https://redis.io/commands/hget" target="_blank" rel="noreferrer"><code>HGET</code></a> 返回给定字段的值。</li><li><a href="https://redis.io/commands/hmget" target="_blank" rel="noreferrer"><code>HMGET</code></a> 返回一个或多个给定字段的值。</li><li><a href="https://redis.io/commands/hincrby" target="_blank" rel="noreferrer"><code>HINCRBY</code></a> 将给定字段的值按提供的整数递增。</li></ul><p>官方文档：<a href="https://redis.io/docs/data-types/hashes/" target="_blank" rel="noreferrer">Redis hashes | Redis</a></p><p>Hash 完整命令列表：<a href="https://redis.io/commands/?group=hash" target="_blank" rel="noreferrer">Commands | Redis</a></p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://redis.io/docs/" target="_blank" rel="noreferrer">Redis 官方文档</a></li><li><a href="https://www.runoob.com/redis/redis-tutorial.html" target="_blank" rel="noreferrer">Redis 教程｜菜鸟教程</a></li></ul>',49),i=[o];function d(l,n,h,p,c,m){return r(),a("div",null,i)}const _=e(s,[["render",d]]);export{g as __pageData,_ as default};