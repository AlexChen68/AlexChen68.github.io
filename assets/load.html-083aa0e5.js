import{_ as t,W as i,X as n,Z as a,$ as l,a0 as o,a1 as r,C as c}from"./framework-ea95e8eb.js";const s={},h=r('<h2 id="类加载过程" tabindex="-1"><a class="header-anchor" href="#类加载过程" aria-hidden="true">#</a> 类加载过程</h2><p>一个类从被加载到虚拟机内存中开始，到从内存中卸载，整个生命周期需要经过七个阶段：加载（Loading）、验证（Verification）、准备（Preparation）、解析（Resolution）、初始化（Initialization）、使用（Using）和卸载（Unloading），其中验证、准备、解析三个部分统称为连接（Linking）。</p><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/java/类加载过程.jpeg" alt="类加载过程" loading="lazy"></p><p>《Java 虚拟机规范》严格规定了有且只有六种情况必须立即对类进行“初始化”：</p><ul><li>1）遇到 new、getstatic、putstatic 或 invokestatic 这四条字节码指令时，如果类型没有进行过初始化，则需要先触发其初始化阶段。</li><li>2）使用 java.lang.reflect 包的方法对类型进行反射调用的时候，如果类型没有进行过初始化，则需要先触发其初始化。</li><li>3）当初始化类的时候，如果发现其父类还没有进行过初始化，则需要先触发其父类的初始化。</li><li>4）当虚拟机启动时，用户需要指定一个要执行的主类（包含 main() 方法的那个类），虚拟机会先初始化这个主类。</li><li>5）当使用 JDK 7 新加入的动态语言支持时，如果一个 java.lang.invoke.MethodHandle 实例最后的解析结果为 REF_getStatic、REF_putStatic、REF_invokeStatic、REF_newInvokeSpecial 四种类型的方法句柄，并且这个方法句柄对应的类没有进行过初始化，则需要先触发其初始化。</li><li>6）当一个接口中定义了 JDK 8 新加入的默认方法（被 default 关键字修饰的接口方法）时，如果有这个接口的实现类发生了初始化，那该接口要在其之前被初始化。</li></ul><p>这六种场景中的行为称为对一个类型进行主动引用。</p><p>接下来我们来详细学习 Java 虚拟机中类加载的全过程，即加载、验证、准备、解析和初始化。</p><h3 id="加载" tabindex="-1"><a class="header-anchor" href="#加载" aria-hidden="true">#</a> 加载</h3><p>加载是 JVM 加载的起点，具体什么时候开始加载，《Java 虚拟机规范》中并没有进行强制约束，可以交给虚拟机的具体实现来自由把握。</p><p>在加载过程，JVM 要做三件事情：</p><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/java/JVM类加载之加载.webp" alt="JVM 类加载之加载" loading="lazy"></p><h3 id="验证" tabindex="-1"><a class="header-anchor" href="#验证" aria-hidden="true">#</a> 验证</h3><hr><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>',14),d={href:"https://zhuanlan.zhihu.com/p/375698188",target:"_blank",rel:"noopener noreferrer"};function p(_,g){const e=c("ExternalLinkIcon");return i(),n("div",null,[h,a("ul",null,[a("li",null,[a("a",d,[l("【JVM 进阶之路】之：类加载过程"),o(e)])])])])}const m=t(s,[["render",p],["__file","load.html.vue"]]);export{m as default};