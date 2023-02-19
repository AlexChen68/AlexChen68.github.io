import{_ as i,W as r,X as l,Y as n,Z as a,$ as e,a1 as t}from"./framework-51d990c7.js";const d={},h=a("h2",{id:"java-具有三大特性-分别是封装、继承和多态。",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#java-具有三大特性-分别是封装、继承和多态。","aria-hidden":"true"},"#"),e(" Java 具有三大特性，分别是"),a("strong",null,"封装"),e("、"),a("strong",null,"继承"),e("和"),a("strong",null,"多态"),e("。")],-1),s=t('<h2 id="java-三大特性" tabindex="-1"><a class="header-anchor" href="#java-三大特性" aria-hidden="true">#</a> Java 三大特性</h2><h3 id="封装" tabindex="-1"><a class="header-anchor" href="#封装" aria-hidden="true">#</a> 封装</h3><p>利用抽象数据类型将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体。数据被保护在抽象数据类型的内部，尽可能地隐藏内部的细节，只保留一些对外接口使之与外部发生联系。用户无需知道对象内部的细节，但可以通过对象对外提供的接口来访问该对象。</p><p>优点:</p><ul><li>减少耦合: 可以独立地开发、测试、优化、使用、理解和修改</li><li>减轻维护的负担: 可以更容易被程序员理解，并且在调试的时候可以不影响其他模块</li><li>有效地调节性能: 可以通过剖析确定哪些模块影响了系统的性能</li><li>提高软件的可重用性</li><li>降低了构建大型系统的风险: 即使整个系统不可用，但是这些独立的模块却有可能是可用的</li></ul><h3 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h3><p>从一个已知的类中派生出一个新的类，新类可以拥有已知类的行为和属性，并且可以通过覆盖/重写来增强已知类的能力。</p><h3 id="多态" tabindex="-1"><a class="header-anchor" href="#多态" aria-hidden="true">#</a> 多态</h3><p>多态分为编译时多态和运行时多态：</p><ul><li>编译时多态主要指方法的重载</li><li>运行时多态指程序中定义的对象引用所指向的具体类型在运行期间才确定</li></ul><p>运行时多态有三个条件:</p><ul><li>继承：在多态中必须存在有继承关系的子类和父类。</li><li>重写：子类对父类中某些方法进行重新定义，在调用这些方法时就会调用子类的方法。</li><li>向上转型：在多态中需要将子类的引用赋给父类对象，只有这样该引用才能够具备技能调用父类的方法和子类的方法。</li></ul><h2 id="关系类图" tabindex="-1"><a class="header-anchor" href="#关系类图" aria-hidden="true">#</a> 关系类图</h2><h3 id="泛化关系-generalization" tabindex="-1"><a class="header-anchor" href="#泛化关系-generalization" aria-hidden="true">#</a> 泛化关系 (Generalization)</h3><p>用来描述继承关系，在 Java 中使用 extends 关键字。</p>',15);function c(o,u){return r(),l("div",null,[h,n(" more "),s])}const p=i(d,[["render",c],["__file","01-feature.html.vue"]]);export{p as default};
