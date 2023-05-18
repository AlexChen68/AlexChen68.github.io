import{_ as l,W as d,X as a,Y as n,Z as t,$ as s,a0 as i,a1 as r,C as y}from"./framework-ea95e8eb.js";const g={},f=t("p",null,"本文介绍 Mysql 常用的数据类型与应用场景。",-1),x=r('<h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2><p>主要包括以下五大类：</p><ul><li>整数类型：BIT、BOOL、TINYINT、SMALLINT、MEDIUMINT、INT、BIGINT</li><li>浮点数类型：FLOAT、DOUBLE、DECIMAL</li><li>字符串类型：CHAR、VARCHAR、TINY TEXT、TEXT、MEDIUM TEXT、LONGTEXT、TINY BLOB、BLOB、MEDIUM BLOB、LONG BLOB</li><li>日期类型：Date、DateTime、TimeStamp、Time、Year</li><li>其他数据类型：BINARY、VARBINARY、ENUM、SET、Geometry、Point、MultiPoint、LineString、MultiLineString、Polygon、GeometryCollection 等</li></ul><h3 id="数值类型" tabindex="-1"><a class="header-anchor" href="#数值类型" aria-hidden="true">#</a> 数值类型</h3><p>数值类型的数据范围对比：</p><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">大小</th><th style="text-align:left;">范围（有符号）</th><th style="text-align:left;">范围（无符号）</th><th style="text-align:left;">用途</th></tr></thead><tbody><tr><td style="text-align:left;">TINYINT</td><td style="text-align:left;">1 Bytes</td><td style="text-align:left;">(-128，127)</td><td style="text-align:left;">(0，255)</td><td style="text-align:left;">小整数值</td></tr><tr><td style="text-align:left;">SMALLINT</td><td style="text-align:left;">2 Bytes</td><td style="text-align:left;">(-32 768，32 767)</td><td style="text-align:left;">(0，65 535)</td><td style="text-align:left;">大整数值</td></tr><tr><td style="text-align:left;">MEDIUMINT</td><td style="text-align:left;">3 Bytes</td><td style="text-align:left;">(-8 388 608，8 388 607)</td><td style="text-align:left;">(0，16 777 215)</td><td style="text-align:left;">大整数值</td></tr><tr><td style="text-align:left;">INT 或 INTEGER</td><td style="text-align:left;">4 Bytes</td><td style="text-align:left;">(-2 147 483 648，2 147 483 647)</td><td style="text-align:left;">(0，4 294 967 295)</td><td style="text-align:left;">大整数值</td></tr><tr><td style="text-align:left;">BIGINT</td><td style="text-align:left;">8 Bytes</td><td style="text-align:left;">(-9,223,372,036,854,775,808，9 223 372 036 854 775 807)</td><td style="text-align:left;">(0，18 446 744 073 709 551 615)</td><td style="text-align:left;">极大整数值</td></tr><tr><td style="text-align:left;">FLOAT</td><td style="text-align:left;">4 Bytes</td><td style="text-align:left;">(-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38)</td><td style="text-align:left;">0，(1.175 494 351 E-38，3.402 823 466 E+38)</td><td style="text-align:left;">单精度 浮点数值</td></tr><tr><td style="text-align:left;">DOUBLE</td><td style="text-align:left;">8 Bytes</td><td style="text-align:left;">(-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308)</td><td style="text-align:left;">0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308)</td><td style="text-align:left;">双精度 浮点数值</td></tr><tr><td style="text-align:left;">DECIMAL</td><td style="text-align:left;">对 DECIMAL(M,D) ，如果 M&gt;D，为 M+2 否则为 D+2</td><td style="text-align:left;">依赖于 M 和 D 的值</td><td style="text-align:left;">依赖于 M 和 D 的值</td><td style="text-align:left;">小数值</td></tr></tbody></table><h3 id="日期类型" tabindex="-1"><a class="header-anchor" href="#日期类型" aria-hidden="true">#</a> 日期类型</h3><p>日期类型对比：</p><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">大小 ( bytes)</th><th style="text-align:left;">范围</th><th style="text-align:left;">格式</th><th style="text-align:left;">用途</th></tr></thead><tbody><tr><td style="text-align:left;">DATE</td><td style="text-align:left;">3</td><td style="text-align:left;">1000-01-01/9999-12-31</td><td style="text-align:left;">YYYY-MM-DD</td><td style="text-align:left;">日期值</td></tr><tr><td style="text-align:left;">TIME</td><td style="text-align:left;">3</td><td style="text-align:left;">&#39;-838:59:59&#39;/&#39;838:59:59&#39;</td><td style="text-align:left;">HH:MM:SS</td><td style="text-align:left;">时间值或持续时间</td></tr><tr><td style="text-align:left;">YEAR</td><td style="text-align:left;">1</td><td style="text-align:left;">1901/2155</td><td style="text-align:left;">YYYY</td><td style="text-align:left;">年份值</td></tr><tr><td style="text-align:left;">DATETIME</td><td style="text-align:left;">8</td><td style="text-align:left;">&#39;1000-01-01 00:00:00&#39; 到 &#39;9999-12-31 23:59:59&#39;</td><td style="text-align:left;">YYYY-MM-DD hh:mm:ss</td><td style="text-align:left;">混合日期和时间值</td></tr><tr><td style="text-align:left;">TIMESTAMP</td><td style="text-align:left;">4</td><td style="text-align:left;">&#39;1970-01-01 00:00:01&#39; UTC 到 &#39;2038-01-19 03:14:07&#39; UTC 结束时间是第 <strong>2147483647</strong> 秒，北京时间 <strong>2038-1-19 11:14:07</strong>，格林尼治时间 2038 年 1 月 19 日 凌晨 03:14:07</td><td style="text-align:left;">YYYY-MM-DD hh:mm:ss</td><td style="text-align:left;">混合日期和时间值，时间戳</td></tr></tbody></table><h3 id="字符串类型" tabindex="-1"><a class="header-anchor" href="#字符串类型" aria-hidden="true">#</a> 字符串类型</h3><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">大小</th><th style="text-align:left;">用途</th></tr></thead><tbody><tr><td style="text-align:left;">CHAR</td><td style="text-align:left;">0-255 bytes</td><td style="text-align:left;">定长字符串</td></tr><tr><td style="text-align:left;">VARCHAR</td><td style="text-align:left;">0-65535 bytes</td><td style="text-align:left;">变长字符串</td></tr><tr><td style="text-align:left;">TINYBLOB</td><td style="text-align:left;">0-255 bytes</td><td style="text-align:left;">不超过 255 个字符的二进制字符串</td></tr><tr><td style="text-align:left;">TINYTEXT</td><td style="text-align:left;">0-255 bytes</td><td style="text-align:left;">短文本字符串</td></tr><tr><td style="text-align:left;">BLOB</td><td style="text-align:left;">0-65 535 bytes</td><td style="text-align:left;">二进制形式的长文本数据</td></tr><tr><td style="text-align:left;">TEXT</td><td style="text-align:left;">0-65 535 bytes</td><td style="text-align:left;">长文本数据</td></tr><tr><td style="text-align:left;">MEDIUMBLOB</td><td style="text-align:left;">0-16 777 215 bytes</td><td style="text-align:left;">二进制形式的中等长度文本数据</td></tr><tr><td style="text-align:left;">MEDIUMTEXT</td><td style="text-align:left;">0-16 777 215 bytes</td><td style="text-align:left;">中等长度文本数据</td></tr><tr><td style="text-align:left;">LONGBLOB</td><td style="text-align:left;">0-4 294 967 295 bytes</td><td style="text-align:left;">二进制形式的极大文本数据</td></tr><tr><td style="text-align:left;">LONGTEXT</td><td style="text-align:left;">0-4 294 967 295 bytes</td><td style="text-align:left;">极大文本数据</td></tr></tbody></table><p>char 是固定长度，varchar 长度可变：</p><p>char(n) 和 varchar(n) 中括号中 n 代表字符的个数，并不代表字节个数，比如 CHAR(30) 就可以存储 30 个字符。</p><p>存储时，前者不管实际存储数据的长度，直接按 char 规定的长度分配存储空间；而后者会根据实际存储的数据分配最终的存储空间</p><p><strong>相同点</strong>：</p><ol><li>char(n)，varchar(n) 中的 n 都代表字符的个数</li><li>超过 char，varchar 最大长度 n 的限制后，字符串会被截断。</li></ol><p><strong>不同点</strong>：</p><ol><li>char 不论实际存储的字符数都会占用 n 个字符的空间，而 varchar 只会占用实际字符应该占用的字节空间加 1（实际长度 length，0&lt;=length&lt;255）或加 2（length&gt;255）。因为 varchar 保存数据时除了要保存字符串之外还会加一个字节来记录长度（如果列声明长度大于 255 则使用两个字节来保存长度）。</li><li>能存储的最大空间限制不一样：char 的存储上限为 255 字节。</li><li>char 在存储时会截断尾部的空格，而 varchar 不会。</li></ol><p>char 是适合存储很短的、一般固定长度的字符串。例如，char 非常适合存储密码的 MD5 值，因为这是一个定长的值。对于非常短的列，char 比 varchar 在存储空间上也更有效率。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>',20),h={href:"https://www.runoob.com/mysql/mysql-data-types.html",target:"_blank",rel:"noopener noreferrer"};function o(c,T){const e=y("ExternalLinkIcon");return d(),a("div",null,[f,n(" more "),x,t("ul",null,[t("li",null,[t("a",h,[s("MySQL 数据类型 | 菜鸟教程"),i(e)])])])])}const M=l(g,[["render",o],["__file","2.1-datatype.html.vue"]]);export{M as default};
