import{_ as s,W as t,X as o,a2 as c,Y as a,a0 as e,Z as d,a1 as r,C as i}from"./framework-d3200c61.js";const l={},p=a("p",null,"介绍各种 JDK 的安装和配置。",-1),h=a("h2",{id:"windows-安装-jdk8",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#windows-安装-jdk8","aria-hidden":"true"},"#"),e(" windows 安装 JDK8")],-1),u=a("h3",{id:"下载-jdk8",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#下载-jdk8","aria-hidden":"true"},"#"),e(" 下载 JDK8")],-1),_={href:"https://www.oracle.com/java/technologies/downloads/#java8-windows",target:"_blank",rel:"noopener noreferrer"},k=r(`<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><p>点击下载好的安装包进行安装，安装路径最好不要有中文或者特殊符号如空格等；</p><p>安装时可以取消勾选安装 JRE，因为 JDK 已经自带了。</p><h3 id="配置环境变量" tabindex="-1"><a class="header-anchor" href="#配置环境变量" aria-hidden="true">#</a> 配置环境变量</h3><p>点开系统环境变量设置，增加如下设置：</p><ol><li>增加一个系统变量</li></ol><div class="language-text" data-ext="text"><pre class="language-text"><code>变量名:JAVA_HOME
变量值:JDK的安装目录，按照实际情况修改
</code></pre></div><ol start="2"><li>添加如下路径到 PATH 变量中</li></ol><div class="language-text" data-ext="text"><pre class="language-text"><code>.;%JAVA_HOME%\\bin;%JAVA_HOME%\\jre\\bin
</code></pre></div><h3 id="查看是否安装成功" tabindex="-1"><a class="header-anchor" href="#查看是否安装成功" aria-hidden="true">#</a> 查看是否安装成功</h3><p>打开系统终端，输入：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-version</span>
</code></pre></div><p>出现 JDK 的版本信息表示安装成功</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">java</span> version <span class="token string">&quot;1.8.0_351&quot;</span>
Java<span class="token punctuation">(</span>TM<span class="token punctuation">)</span> SE Runtime Environment <span class="token punctuation">(</span>build <span class="token number">1.8</span>.0_351-b10<span class="token punctuation">)</span>
Java HotSpot<span class="token punctuation">(</span>TM<span class="token punctuation">)</span> <span class="token number">64</span>-Bit Server VM <span class="token punctuation">(</span>build <span class="token number">25.351</span>-b10, mixed mode<span class="token punctuation">)</span>
</code></pre></div>`,14);function v(x,m){const n=i("ExternalLinkIcon");return t(),o("div",null,[p,c(" more "),h,u,a("p",null,[e("JDK 下载地址："),a("a",_,[e("https://www.oracle.com/java/technologies/downloads/#java8-windows"),d(n)])]),k])}const g=s(l,[["render",v],["__file","01-jdk.html.vue"]]);export{g as default};