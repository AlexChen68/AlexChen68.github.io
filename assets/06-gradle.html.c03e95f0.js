import{_ as r}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as t,b as e,d,f as a,e as l,r as n}from"./app.b62ae7a7.js";const s={},c=a('<h2 id="gradle-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#gradle-\u7B80\u4ECB" aria-hidden="true">#</a> Gradle \u7B80\u4ECB</h2><p>Gradle \u662F\u4E00\u4E2A\u57FA\u4E8E Apache Ant \u548C Apache Maven \u6982\u5FF5\u7684\u9879\u76EE\u81EA\u52A8\u5316\u6784\u5EFA\u5F00\u6E90\u5DE5\u5177\u3002\u5B83\u4F7F\u7528\u4E00\u79CD\u57FA\u4E8E Groovy \u7684\u7279\u5B9A\u9886\u57DF\u8BED\u8A00(DSL)\u6765\u58F0\u660E\u9879\u76EE\u8BBE\u7F6E\uFF0C\u4E5F\u589E\u52A0\u4E86\u57FA\u4E8E Kotlin \u8BED\u8A00\u7684 kotlin-based DSL\uFF0C\u629B\u5F03\u4E86\u57FA\u4E8E XML\u7684\u5404\u79CD\u7E41\u7410\u914D\u7F6E\u3002</p><p>\u9762\u5411Java\u5E94\u7528\u4E3A\u4E3B\u3002\u5F53\u524D\u5176\u652F\u6301\u7684\u8BED\u8A00 C++\u3001Java\u3001Groovy\u3001Kotlin\u3001Scala \u548C Swift\uFF0C\u8BA1\u5212\u672A\u6765\u5C06\u652F\u6301\u66F4\u591A\u7684\u8BED\u8A00\u3002</p><p>Gradle \u63D0\u4F9B\u4E86\u4EC0\u4E48:</p><ol><li>\u4E00\u79CD\u53EF\u5207\u6362\u7684\uFF0C\u50CF maven \u4E00\u6837\u7684\u57FA\u4E8E\u7EA6\u5B9A\u7684\u6784\u5EFA\u6846\u67B6\uFF0C\u5374\u53C8\u4ECE\u4E0D\u9501\u4F4F\u4F60\uFF08\u7EA6\u5B9A\u4F18\u4E8E\u914D\u7F6E\uFF09</li><li>\u5F3A\u5927\u7684\u652F\u6301\u591A\u5DE5\u7A0B\u7684\u6784\u5EFA</li><li>\u5F3A\u5927\u7684\u4F9D\u8D56\u7BA1\u7406\uFF08\u57FA\u4E8E Apache Ivy\uFF09\uFF0C\u63D0\u4F9B\u6700\u5927\u7684\u4FBF\u5229\u53BB\u6784\u5EFA\u4F60\u7684\u5DE5\u7A0B</li><li>\u5168\u529B\u652F\u6301\u5DF2\u6709\u7684 Maven \u6216\u8005 Ivy \u4ED3\u5E93\u57FA\u7840\u5EFA\u8BBE</li><li>\u652F\u6301\u4F20\u9012\u6027\u4F9D\u8D56\u7BA1\u7406\uFF0C\u5728\u4E0D\u9700\u8981\u8FDC\u7A0B\u4ED3\u5E93\u548C pom.xml \u548C ivy \u914D\u7F6E\u6587\u4EF6\u7684\u524D\u63D0\u4E0B</li><li>\u57FA\u4E8E groovy \u811A\u672C\u6784\u5EFA\uFF0C\u5176 build \u811A\u672C\u4F7F\u7528 groovy \u8BED\u8A00\u7F16\u5199</li><li>\u5177\u6709\u5E7F\u6CDB\u7684\u9886\u57DF\u6A21\u578B\u652F\u6301\u4F60\u7684\u6784\u5EFA</li></ol><h2 id="\u5B89\u88C5-gradle" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-gradle" aria-hidden="true">#</a> \u5B89\u88C5 Gradle</h2>',6),p=l("\u4ECE Gralde "),h={href:"https://gradle.org/releases/",target:"_blank",rel:"noopener noreferrer"},_=l("\u5B98\u65B9\u7F51\u7AD9"),g=l("\u4E0B\u8F7D Gradle \u7684\u6700\u65B0\u53D1\u884C\u5305\u3002"),v=a(`<p><img src="https://cdn.jsdelivr.net/gh/AlexChen68/images@master/blog/tool/gradle_download.png" alt="\u4E0B\u8F7D Gradle" loading="lazy"></p><ol start="2"><li>\u89E3\u538B\u7F29</li></ol><p>Gradle \u53D1\u884C\u5305\u662F\u4E00\u4E2A ZIP \u6587\u4EF6\u3002\u5B8C\u6574\u7684\u53D1\u884C\u5305\u5305\u62EC\u4EE5\u4E0B\u5185\u5BB9(\u5B98\u65B9\u53D1\u884C\u5305\u6709 full \u5B8C\u6574\u7248\uFF0C\u4E5F\u6709\u4E0D\u5E26\u6E90\u7801\u548C\u6587\u6863\u7684\u7248\u672C\uFF0C\u53EF\u6839\u636E\u9700\u6C42\u4E0B\u8F7D):</p><ul><li>Gradle \u53EF\u6267\u884C\u6587\u4EF6</li><li>\u7528\u6237\u624B\u518C (\u6709 PDF \u548C HTML \u4E24\u79CD\u7248\u672C)</li><li>DSL \u53C2\u8003\u6307\u5357</li><li>API \u624B\u518C(Javadoc \u548C Groovydoc)</li><li>\u6837\u4F8B\uFF0C\u5305\u62EC\u7528\u6237\u624B\u518C\u4E2D\u7684\u4F8B\u5B50\uFF0C\u4E00\u4E9B\u5B8C\u6574\u7684\u6784\u5EFA\u6837\u4F8B\u548C\u66F4\u52A0\u590D\u6742\u7684\u6784\u5EFA\u811A\u672C</li><li>\u6E90\u4EE3\u7801\u3002\u4EC5\u4F9B\u53C2\u8003\u4F7F\u7528,\u5982\u679C\u4F60\u60F3\u8981\u81EA\u5DF1\u6765\u7F16\u8BD1 Gradle \u4F60\u9700\u8981\u4ECE\u6E90\u4EE3\u7801\u4ED3\u5E93\u4E2D\u68C0\u51FA\u53D1\u884C\u7248\u672C\u6E90\u7801\uFF0C\u5177\u4F53\u8BF7\u67E5\u770B Gradle \u5B98\u65B9\u4E3B\u9875\u3002</li></ul><ol start="3"><li>\u914D\u7F6E\u73AF\u5883\u53D8\u91CF</li></ol><p>\u8FD0\u884C gradle \u5FC5\u987B\u5C06\u200B <code>GRADLE_HOME/bin</code> \u200B\u52A0\u5165\u5230\u4F60\u7684 <code>PATH</code> \u73AF\u5883\u53D8\u91CF\u4E2D, GRADLE_HOME \u4E3A\u89E3\u538B\u7F29\u540E\u7684 Gradle \u5305\u3002</p><ol start="4"><li>\u6D4B\u8BD5\u5B89\u88C5</li></ol><p>\u8FD0\u884C\u5982\u4E0B\u547D\u4EE4\u6765\u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F.\u8BE5\u547D\u4EE4\u4F1A\u663E\u793A\u5F53\u524D\u7684 JVM \u7248\u672C\u548C Gradle \u7248\u672C\u3002</p><div class="language-bash ext-sh"><pre class="language-bash"><code>gradle <span class="token parameter variable">-v</span> 
</code></pre></div>`,9);function G(m,f){const o=n("ExternalLinkIcon");return i(),t("div",null,[c,e("ol",null,[e("li",null,[p,e("a",h,[_,d(o)]),g])]),v])}const x=r(s,[["render",G],["__file","06-gradle.html.vue"]]);export{x as default};
