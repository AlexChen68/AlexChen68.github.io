import{_ as s,W as a,X as n,a1 as e}from"./framework-ea95e8eb.js";const l={},i=e(`<h2 id="什么是-mysql-主从复制" tabindex="-1"><a class="header-anchor" href="#什么是-mysql-主从复制" aria-hidden="true">#</a> 什么是 Mysql 主从复制</h2><h2 id="什么是读写分离" tabindex="-1"><a class="header-anchor" href="#什么是读写分离" aria-hidden="true">#</a> 什么是读写分离</h2><h2 id="配置-mysql-主从" tabindex="-1"><a class="header-anchor" href="#配置-mysql-主从" aria-hidden="true">#</a> 配置 Mysql 主从</h2><ol><li>启动两个 mysql 实例，一台主服务器，一台从服务器</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建网络</span>
<span class="token function">docker</span> network create mysql

<span class="token comment"># 启动主节点</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--name</span> mysql-master <span class="token parameter variable">--net</span> mysql <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token parameter variable">-v</span> D:/Docker/mysql-slave/conf:/etc/mysql/conf.d <span class="token parameter variable">-v</span> D:/Docker/mysql-slave/data:/var/lib/mysql <span class="token parameter variable">-v</span> D:/Docker/mysql-slave/logs:/var/log/mysql <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>root <span class="token parameter variable">-d</span> mysql

<span class="token comment"># 启动从节点</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--name</span> mysql-slave <span class="token parameter variable">--net</span> mysql <span class="token parameter variable">-p</span> <span class="token number">13306</span>:3306 <span class="token parameter variable">-v</span> D:/Docker/mysql-slave/conf:/etc/mysql/conf.d <span class="token parameter variable">-v</span> D:/Docker/mysql-slave/data:/var/lib/mysql <span class="token parameter variable">-v</span> D:/Docker/mysql-slave/logs:/var/log/mysql <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>root <span class="token parameter variable">-d</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>增加主服务器配置 <code>/etc/mysql/conf.d/my.cnf</code>，然后重启数据库</li></ol><div class="language-cnf line-numbers-mode" data-ext="cnf"><pre class="language-cnf"><code>[mysqld]
server-id = 1        # 节点ID，确保唯一
# log config
log-bin = mysql-bin     #开启mysql的binlog日志功能，binlog日志位置
sync_binlog = 1         #控制数据库的binlog刷到磁盘上去 , 0 不控制，性能最好，1每次事物提交都会刷到日志文件中，性能最差，最安全
binlog_format = mixed   #binlog日志格式，mysql默认采用statement，建议使用mixed
expire_logs_days = 7                           #binlog过期清理时间
max_binlog_size = 100m                    #binlog每个日志文件大小
binlog_cache_size = 4m                        #binlog缓存大小

binlog-do-db=daydayup #需要同步的数据库
max_binlog_cache_size= 512m              #最大binlog缓存大
binlog-ignore-db=mysql #不生成日志文件的数据库，多个忽略数据库可以用逗号拼接，或者复制这句话，写多行

auto-increment-offset = 1     # 自增值的偏移量
auto-increment-increment = 1  # 自增值的自增量
replica_skip_errors = all #跳过从库错误
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>增加从服务器配置 <code>/etc/mysql/conf.d/my.cnf</code>，然后重启数据库</li></ol><div class="language-cnf line-numbers-mode" data-ext="cnf"><pre class="language-cnf"><code>[mysqld]
server-id=2
log-bin=mysql-bin # 如果从数据库，不需要再往其他数据库同步，可以注释掉
relay-log=slave-relay-bin # 必须开启，从主数据库同步的binlog会写入到该目录下
relay-log-index=slave-relay-bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>（可选）在主服务器创建一个用户，专门用来同步数据</li></ol><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">#如果使用navicate创建用户，需要修改加密方式</span>
<span class="token keyword">alter</span> <span class="token keyword">user</span> xxx identified <span class="token keyword">with</span> mysql_native_password <span class="token keyword">by</span> <span class="token string">&#39;password&#39;</span>
<span class="token comment">#修改host改为所有ip</span>
<span class="token keyword">update</span> <span class="token keyword">user</span> <span class="token keyword">set</span> host<span class="token operator">=</span><span class="token string">&#39;%&#39;</span> <span class="token keyword">where</span> <span class="token keyword">user</span><span class="token operator">=</span><span class="token string">&#39;xxx&#39;</span>
<span class="token comment">#授权不需要加密码</span>
<span class="token keyword">grant</span> <span class="token keyword">replication</span> SLAVE <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> <span class="token string">&#39;xxx&#39;</span><span class="token variable">@&#39;%&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>登录主服务器，查看主服务器 master 状态</li></ol><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">show</span> master <span class="token keyword">status</span><span class="token punctuation">;</span>
</code></pre></div><p>记录下 <code>file</code> 和 <code>position</code> 属性</p><ol start="6"><li>登录从服务器，设置 slave 信息</li></ol><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 先停止 slave 服务</span>
stop slave<span class="token punctuation">;</span>

<span class="token comment"># 设置 master 同步信息，修改信息为实际信息，后两项为上面从主服务器获取的 \`file\` 和 \`position\` 属性</span>
change master <span class="token keyword">to</span> master_host<span class="token operator">=</span><span class="token string">&#39;172.18.0.2&#39;</span><span class="token punctuation">,</span> master_port<span class="token operator">=</span><span class="token number">3306</span><span class="token punctuation">,</span>master_user<span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span> master_password<span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span>master_log_file<span class="token operator">=</span><span class="token string">&#39;mysql-bin.000004&#39;</span><span class="token punctuation">,</span>master_log_pos<span class="token operator">=</span><span class="token number">5018</span><span class="token punctuation">;</span>

<span class="token comment"># 启动 slave 服务</span>
<span class="token keyword">start</span> slave<span class="token punctuation">;</span>

<span class="token comment"># 查看 slave 状态，观察到如下图所示启动成功</span>
<span class="token keyword">show</span> slave <span class="token keyword">status</span> \\G<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://cdn.staticaly.com/gh/AlexChen68/OSS@master/images/1686762625238.png" alt="" width="400" height="500" loading="lazy"></p><ol start="7"><li>在主服务器增加数据，自动同步数据到从数据库相应数据库即设置成功（同步哪些数据库由上述的配置文件设定）</li></ol><h2 id="shardingsphere-实现读写分离" tabindex="-1"><a class="header-anchor" href="#shardingsphere-实现读写分离" aria-hidden="true">#</a> ShardingSphere 实现读写分离</h2>`,19),r=[i];function o(t,c){return a(),n("div",null,r)}const d=s(l,[["render",o],["__file","3.4-master-slave.html.vue"]]);export{d as default};
