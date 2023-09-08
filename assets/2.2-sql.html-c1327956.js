import{_ as p,W as e,X as o,Z as n,$ as s,a0 as t,a1 as c,C as l}from"./framework-ea95e8eb.js";const u={},i=c(`<h2 id="_1-数据库操作" tabindex="-1"><a class="header-anchor" href="#_1-数据库操作" aria-hidden="true">#</a> 1. 数据库操作</h2><ul><li>创建数据库</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token punctuation">[</span>DATABASE_NAME<span class="token punctuation">]</span> 
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">set</span> <span class="token punctuation">[</span>CHARACTER_TYPE<span class="token punctuation">]</span> 
  <span class="token keyword">COLLATE</span> <span class="token punctuation">[</span>CHARACTER_COLLATE_TYPE<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><div class="hint-container tip"><p class="hint-container-title">解释</p><p>DATABASE_NAME: 数据库名称</p><p>CHARACTER_TYPE: 数据库中表的默认编码规则（可以省略 <code>DEFAULT CHARACTER set [CHARACTER_TYPE]</code> 部分）</p><p>CHARACTER_COLLATE_TYPE: 数据库中表的默认排序规则（可以省略 <code>COLLATE [CHARACTER_COLLATE_TYPE]</code> 部分）</p></div><p>示例：</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token identifier"><span class="token punctuation">\`</span>daydayup<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token identifier"><span class="token punctuation">\`</span>daydayup<span class="token punctuation">\`</span></span> <span class="token keyword">default</span> <span class="token keyword">character</span> <span class="token keyword">set</span> utf8mb4 <span class="token keyword">collate</span> utf8mb4_general_ci<span class="token punctuation">;</span>
</code></pre></div><ul><li>查看数据库列表</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> <span class="token keyword">DATABASES</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>使用数据库</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">USE</span> <span class="token punctuation">[</span>DATABASE_NAME<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>查看当前使用的数据库</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token keyword">DATABASE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>删除数据库</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">DATABASE</span> <span class="token punctuation">[</span>DATABASE_NAME<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="_2-表操作" tabindex="-1"><a class="header-anchor" href="#_2-表操作" aria-hidden="true">#</a> 2. 表操作</h2><h3 id="_2-1-创建和查看表" tabindex="-1"><a class="header-anchor" href="#_2-1-创建和查看表" aria-hidden="true">#</a> 2.1 创建和查看表</h3><ul><li>查看表列表</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> <span class="token keyword">TABLES</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>创建数据表</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token punctuation">[</span>COLUMN_NAME<span class="token punctuation">]</span> <span class="token punctuation">[</span>DATA_TYPE<span class="token punctuation">]</span> <span class="token punctuation">[</span>LIMITERS<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="hint-container tip"><p class="hint-container-title">解释</p><p>TABLE_NAME: 表名称</p><p>COLUMN_NAME: 字段名称</p><p>DATA_TYPE: 字段数据类型</p><p>LIMITERS: 其他限定条件，比如非空、默认值等等</p></div><ul><li>查看表结构</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DESCRIBE</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span>
</code></pre></div><h3 id="_2-2-修改表结构" tabindex="-1"><a class="header-anchor" href="#_2-2-修改表结构" aria-hidden="true">#</a> 2.2 修改表结构</h3><ul><li>添加列</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span> <span class="token keyword">ADD</span> <span class="token punctuation">[</span>COLUMN_NAME<span class="token punctuation">]</span> <span class="token punctuation">[</span>DATA_TYPE<span class="token punctuation">]</span> <span class="token punctuation">[</span>LIMITERS<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>修改列和属性</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span> CHANGE <span class="token punctuation">[</span>OLD_COLUMN_NAME<span class="token punctuation">]</span> <span class="token punctuation">[</span>NEW_COLUMN_NAME<span class="token punctuation">]</span> <span class="token punctuation">[</span>DATA_TYPE<span class="token punctuation">]</span> <span class="token punctuation">[</span>LIMITERS<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>删除列</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span> <span class="token keyword">DROP</span> <span class="token keyword">COLUMN</span> <span class="token punctuation">[</span>COLUMN_NAME<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="_2-3-删除表" tabindex="-1"><a class="header-anchor" href="#_2-3-删除表" aria-hidden="true">#</a> 2.3 删除表</h3><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="_3-数据操作" tabindex="-1"><a class="header-anchor" href="#_3-数据操作" aria-hidden="true">#</a> 3. 数据操作</h2><h3 id="_3-1-插入数据" tabindex="-1"><a class="header-anchor" href="#_3-1-插入数据" aria-hidden="true">#</a> 3.1 插入数据</h3><ul><li>普通插入</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">[</span>COLUMN_NAME1<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>COLUMN_NAME2<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token punctuation">[</span>VALUE1<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>VALUE2<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>插入查询出来的数据</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">[</span>COLUMN_NAME1<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>COLUMN_NAME2<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> <span class="token punctuation">[</span>COLUMN_NAME1<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>COLUMN_NAME2<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">FROM</span> <span class="token punctuation">[</span>OTHER_TABLE_NAME<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>复制一个表的数据到一个新表</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token punctuation">[</span>NEW_TABLE_NAME<span class="token punctuation">]</span> <span class="token keyword">AS</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="_3-2-更新数据" tabindex="-1"><a class="header-anchor" href="#_3-2-更新数据" aria-hidden="true">#</a> 3.2 更新数据</h3><ul><li>条件更新</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">UPDATE</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span>
<span class="token keyword">SET</span> <span class="token punctuation">[</span>COLUMN_NAME<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">VALUE</span><span class="token punctuation">]</span>
<span class="token keyword">WHERE</span> <span class="token punctuation">[</span>COLUMN_NAME<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">VALUE</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="_3-3-删除数据" tabindex="-1"><a class="header-anchor" href="#_3-3-删除数据" aria-hidden="true">#</a> 3.3 删除数据</h3><ul><li>条件删除</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span>
<span class="token keyword">WHERE</span> <span class="token punctuation">[</span>COLUMN_NAME<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">VALUE</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>清空表</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">TRUNCATE</span> <span class="token keyword">TABLE</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><div class="hint-container warning"><p class="hint-container-title">注意事项</p><p>使用<strong>更新</strong>和<strong>删除</strong>操作时一定要用 <code>WHERE</code> 子句，不然会把整张表的数据都破坏!!!</p><p>可以先用 <code>SELECT</code> 语句进行测试，防止错误删除。</p></div><h3 id="_3-4-查询数据" tabindex="-1"><a class="header-anchor" href="#_3-4-查询数据" aria-hidden="true">#</a> 3.4 查询数据</h3><ul><li>普通查询</li></ul><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token punctuation">[</span>COLUMN_NAME1<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>COLUMN_NAME2<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">FROM</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>DISTINCT</li></ul><p>使用 <code>DISTINCT</code> 可以去除结果的重复项，相同的结果只出现一次；它作用于所有列，也就是说所有列的值都相同才算相同。</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span>  <span class="token punctuation">[</span>COLUMN_NAME1<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>COLUMN_NAME2<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">FROM</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>LIMIT</li></ul><p>限制返回的行数。可以有两个参数，第一个参数为起始行，从 0 开始；第二个参数为返回的总行数。</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token punctuation">[</span>COLUMN_NAME1<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>COLUMN_NAME2<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">FROM</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span> <span class="token keyword">LIMIT</span> <span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="_3-5-排序" tabindex="-1"><a class="header-anchor" href="#_3-5-排序" aria-hidden="true">#</a> 3.5 排序</h3><ul><li>ASC : 升序 (默认)</li><li>DESC : 降序</li></ul><p>可以按多个列进行排序，并且为每个列指定不同的排序方式：</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token punctuation">[</span>COLUMN_NAME1<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>COLUMN_NAME2<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">FROM</span> <span class="token punctuation">[</span>TABLE_NAME<span class="token punctuation">]</span> <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token punctuation">[</span>COLUMN_NAME1<span class="token punctuation">]</span> <span class="token keyword">DESC</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="_3-6-条件过滤" tabindex="-1"><a class="header-anchor" href="#_3-6-条件过滤" aria-hidden="true">#</a> 3.6 条件过滤</h3><p>使用 <code>WHERE</code> 关键字可以过滤掉不符合指定条件的数据行，可用的操作符列表如下：</p><table><thead><tr><th style="text-align:center;">操作符</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">=</td><td style="text-align:center;">等于</td></tr><tr><td style="text-align:center;">&lt;</td><td style="text-align:center;">小于</td></tr><tr><td style="text-align:center;">&gt;</td><td style="text-align:center;">大于</td></tr><tr><td style="text-align:center;">&lt;&gt; 或者 !=</td><td style="text-align:center;">不等于</td></tr><tr><td style="text-align:center;">&lt;= 或者 !&gt;</td><td style="text-align:center;">小于等于</td></tr><tr><td style="text-align:center;">&gt;= 或者 !&lt;</td><td style="text-align:center;">大于等于</td></tr><tr><td style="text-align:center;">BETWEEN</td><td style="text-align:center;">在两个值之间</td></tr><tr><td style="text-align:center;">IS NULL</td><td style="text-align:center;">为 NULL 值</td></tr></tbody></table><p><strong>AND 和 OR</strong> 用于连接多个过滤条件。优先处理 AND，当一个过滤表达式涉及到多个 AND 和 OR 时，可以使用 () 来决定优先级，使得优先级关系更清晰。</p><p><strong>IN</strong> 操作符用于匹配一组值，其后也可以接一个 SELECT 子句，从而匹配子查询得到的一组值。</p><p><strong>NOT</strong> 操作符用于否定一个条件。</p><h3 id="_3-7-通配符" tabindex="-1"><a class="header-anchor" href="#_3-7-通配符" aria-hidden="true">#</a> 3.7 通配符</h3><p>通配符也是用在过滤语句中，但它只能用于文本字段。</p><ul><li><strong>%</strong> 匹配 &gt;=0 个任意字符；</li><li><strong>_</strong> 匹配 ==1 个任意字符；</li><li><strong>[ ]</strong> 可以匹配集合内的字符，例如 [ab] 将匹配字符 a 或者 b。用脱字符 ^ 可以对其进行否定，也就是不匹配集合内的字符。</li></ul><p>使用 Like 来进行通配符匹配。</p><h3 id="_3-8-别名和拼接" tabindex="-1"><a class="header-anchor" href="#_3-8-别名和拼接" aria-hidden="true">#</a> 3.8 别名和拼接</h3><p>计算字段通常需要使用 <strong>AS</strong> 来取别名，否则输出的时候字段名为计算表达式。</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> col1 <span class="token operator">*</span> col2 <span class="token keyword">AS</span> alias
<span class="token keyword">FROM</span> mytable<span class="token punctuation">;</span>
</code></pre></div><p><strong>CONCAT()</strong> 用于连接两个字段。许多数据库会使用空格把一个值填充为列宽，因此连接的结果会出现一些不必要的空格，使用 <strong>TRIM()</strong> 可以去除首尾空格。</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> CONCAT<span class="token punctuation">(</span>TRIM<span class="token punctuation">(</span>col1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;(&#39;</span><span class="token punctuation">,</span> TRIM<span class="token punctuation">(</span>col2<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;)&#39;</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> concat_col
<span class="token keyword">FROM</span> mytable<span class="token punctuation">;</span>
</code></pre></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,78),k={href:"https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html",target:"_blank",rel:"noopener noreferrer"},d={href:"https://pdai.tech/md/db/sql-lan/sql-lan.html",target:"_blank",rel:"noopener noreferrer"};function r(E,A){const a=l("ExternalLinkIcon");return e(),o("div",null,[i,n("ul",null,[n("li",null,[n("a",k,[s("Mysql 8.0 官方手册 - SQL 语句"),t(a)])]),n("li",null,[n("a",d,[s("SQL 语言 - SQL 语法基础"),t(a)])])])])}const _=p(u,[["render",r],["__file","2.2-sql.html.vue"]]);export{_ as default};