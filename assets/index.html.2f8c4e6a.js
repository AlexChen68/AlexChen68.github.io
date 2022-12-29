import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as o,b as a,d as t,f as r,e as n,r as p}from"./app.b62ae7a7.js";const l={},c=r(`<h1 id="java\u96C6\u5408\u6846\u67B6" tabindex="-1"><a class="header-anchor" href="#java\u96C6\u5408\u6846\u67B6" aria-hidden="true">#</a> Java\u96C6\u5408\u6846\u67B6</h1><p>\u5BB9\u5668\uFF0C\u5C31\u662F\u53EF\u4EE5\u5BB9\u7EB3\u5176\u4ED6Java\u5BF9\u8C61\u7684\u5BF9\u8C61\u3002<em>Java Collections Framework(JCF)</em> \u4E3AJava\u5F00\u53D1\u8005\u63D0\u4F9B\u4E86\u901A\u7528\u7684\u5BB9\u5668\uFF0C\u5176\u59CB\u4E8EJDK 1.2\uFF0C\u4F18\u70B9\u662F:</p><ul><li><p>\u964D\u4F4E\u7F16\u7A0B\u96BE\u5EA6</p></li><li><p>\u63D0\u9AD8\u7A0B\u5E8F\u6027\u80FD</p></li><li><p>\u63D0\u9AD8API\u95F4\u7684\u4E92\u64CD\u4F5C\u6027</p></li><li><p>\u964D\u4F4E\u5B66\u4E60\u96BE\u5EA6</p></li><li><p>\u964D\u4F4E\u8BBE\u8BA1\u548C\u5B9E\u73B0\u76F8\u5173API\u7684\u96BE\u5EA6</p></li><li><p>\u589E\u52A0\u7A0B\u5E8F\u7684\u91CD\u7528\u6027</p></li></ul><p>Java\u5BB9\u5668\u91CC\u53EA\u80FD\u653E\u5BF9\u8C61\uFF0C\u5BF9\u4E8E\u57FA\u672C\u7C7B\u578B(int, long, float, double\u7B49)\uFF0C\u9700\u8981\u5C06\u5176\u5305\u88C5\u6210\u5BF9\u8C61\u7C7B\u578B\u540E(Integer, Long, Float, Double \u7B49)\u624D\u80FD\u653E\u5230\u5BB9\u5668\u91CC\u3002\u5F88\u591A\u65F6\u5019\u62C6\u5305\u88C5\u548C\u89E3\u5305\u88C5\u80FD\u591F\u81EA\u52A8\u5B8C\u6210\u3002\u8FD9\u867D\u7136\u4F1A\u5BFC\u81F4\u989D\u5916\u7684\u6027\u80FD\u548C\u7A7A\u95F4\u5F00\u9500\uFF0C\u4F46\u7B80\u5316\u4E86\u8BBE\u8BA1\u548C\u7F16\u7A0B\u3002</p><p>Java\u5BB9\u5668\u4E3B\u8981\u5305\u62EC Collection \u548C Map \u4E24\u79CD\uFF0CCollection \u5B58\u50A8\u7740\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u800C Map \u5B58\u50A8\u7740\u952E\u503C\u5BF9(\u4E24\u4E2A\u5BF9\u8C61)\u7684\u6620\u5C04\u8868\uFF1A</p><ol><li>Collection\uFF1A\u4E3B\u8981\u7531 List\u3001Set\u3001Queue \u7EC4\u6210\u3002 <ul><li>List \u4EE3\u8868\u6709\u5E8F\u3001\u53EF\u91CD\u590D\u7684\u96C6\u5408\uFF0C\u5178\u578B\u4EE3\u8868\u5C31\u662F\u5C01\u88C5\u4E86\u52A8\u6001\u6570\u7EC4\u7684 ArrayList \u548C\u5C01\u88C5\u4E86\u94FE\u8868\u7684 LinkedList\uFF1B</li><li>Set \u4EE3\u8868\u65E0\u5E8F\u3001\u4E0D\u53EF\u91CD\u590D\u7684\u96C6\u5408\uFF0C\u5178\u578B\u4EE3\u8868\u5C31\u662F HashSet \u548C TreeSet\uFF1B</li><li>Queue \u4EE3\u8868\u961F\u5217\uFF0C\u5178\u578B\u4EE3\u8868\u5C31\u662F\u53CC\u7AEF\u961F\u5217 ArrayDeque\uFF0C\u4EE5\u53CA\u4F18\u5148\u7EA7\u961F\u5217 PriorityQue\u3002</li></ul></li><li>Map\uFF1A\u4EE3\u8868\u952E\u503C\u5BF9\u7684\u96C6\u5408\uFF0C\u5178\u578B\u4EE3\u8868\u5C31\u662F HashMap\u3002</li></ol><p><img src="https://cdn.jsdelivr.net/gh/alexchen68/images@master/blog/java/collection_framework.png" alt="Java\u96C6\u5408\u6846\u67B6" title=":size=80%" loading="lazy"></p><h2 id="collection-\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#collection-\u63A5\u53E3" aria-hidden="true">#</a> Collection \u63A5\u53E3</h2><p><code>Collection</code> \u662F\u6240\u6709\u5E8F\u5217\u96C6\u5408\u5171\u6709\u7684\u6839\u63A5\u53E3\u3002\u96C6\u5408\u8868\u793A\u4E00\u7EC4\u5BF9\u8C61\uFF0C\u79F0\u4E3A\u5176\u5143\u7D20\u3002\u4E00\u4E9B\u96C6\u5408\u5141\u8BB8\u91CD\u590D\u5143\u7D20\uFF0C\u800C\u53E6\u4E00\u4E9B\u5219\u4E0D\u5141\u8BB8\u3002\u6709\u4E9B\u662F\u6709\u5E8F\u7684\uFF0C\u6709\u4E9B\u662F\u65E0\u5E8F\u7684\u3002 JDK \u4E0D\u63D0\u4F9B\u6B64\u63A5\u53E3\u7684\u4EFB\u4F55\u76F4\u63A5\u5B9E\u73B0\uFF1A\u5B83\u63D0\u4F9B\u66F4\u5177\u4F53\u7684\u5B50\u63A5\u53E3\uFF08\u5982 Set \u548C List\uFF09\u7684\u5B9E\u73B0\u3002\u6B64\u63A5\u53E3\u901A\u5E38\u7528\u4E8E\u4F20\u9012\u96C6\u5408\u5E76\u5728\u9700\u8981\u6700\u5927\u901A\u7528\u6027\u7684\u5730\u65B9\u64CD\u4F5C\u5B83\u4EEC\u3002</p><p><code>Collection</code>\u63A5\u53E3\u7EE7\u627F\u4E86 <code>Iterable</code>\u63A5\u53E3\uFF0C\u5B9E\u73B0 <code>Collection</code> \u5C31\u610F\u5473\u7740\u9700\u8981\u63D0\u4F9B <code>iterator()</code> \u65B9\u6CD5</p><p><code>java.util.AbstractCollection</code> \u7C7B\u63D0\u4F9B\u4E86 <code>Collection</code> \u7C7B\u7684\u9ED8\u8BA4\u5B9E\u73B0\uFF0C\u4F7F\u5F97\u4F60\u53EF\u4EE5\u521B\u5EFA <code>AbstractCollection</code> \u7684\u5B50\u7C7B\u578B\uFF0C\u800C\u5176\u4E2D\u6CA1\u6709\u4E0D\u5FC5\u8981\u7684\u4EE3\u7801\u91CD\u590D\u3002</p><p>Java\u8BBF\u95EE\u96C6\u5408\u603B\u662F\u901A\u8FC7\u7EDF\u4E00\u7684\u65B9\u5F0F\u2014\u2014\u8FED\u4EE3\u5668\uFF08Iterator\uFF09\u6765\u5B9E\u73B0\uFF0C\u5B83\u6700\u660E\u663E\u7684\u597D\u5904\u5728\u4E8E\u65E0\u9700\u77E5\u9053\u96C6\u5408\u5185\u90E8\u5143\u7D20\u662F\u6309\u4EC0\u4E48\u65B9\u5F0F\u5B58\u50A8\u7684\u3002</p><h3 id="list-\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#list-\u63A5\u53E3" aria-hidden="true">#</a> List \u63A5\u53E3</h3><blockquote><p>java.util.List\u63A5\u53E3\u7EE7\u627F\u81EACollection\u63A5\u53E3\uFF0C\u662F\u5355\u5217\u96C6\u5408\u7684\u4E00\u4E2A\u91CD\u8981\u5206\u652F\uFF0C\u4E60\u60EF\u6027\u5730\u4F1A\u5C06\u5B9E\u73B0\u4E86List\u63A5\u53E3\u7684\u5BF9\u8C61\u79F0\u4E3AList\u96C6\u5408\u3002</p><p>\u5728List\u96C6\u5408\u4E2D\u5141\u8BB8\u51FA\u73B0\u91CD\u590D\u7684\u5143\u7D20\uFF0C\u6240\u6709\u7684\u5143\u7D20\u662F\u4EE5\u4E00\u79CD\u7EBF\u6027\u65B9\u5F0F\u8FDB\u884C\u5B58\u50A8\u7684\uFF0C\u5728\u7A0B\u5E8F\u4E2D\u53EF\u4EE5\u901A\u8FC7\u7D22\u5F15\u6765\u8BBF\u95EE\u96C6\u5408\u4E2D\u7684\u6307\u5B9A\u5143\u7D20\u3002</p><p>\u53E6\u5916\uFF0CList\u96C6\u5408\u8FD8\u6709\u4E00\u4E2A\u7279\u70B9\u5C31\u662F\u5143\u7D20\u6709\u5E8F\uFF0C\u5373\u5143\u7D20\u7684\u5B58\u5165\u987A\u5E8F\u548C\u53D6\u51FA\u987A\u5E8F\u4E00\u81F4\u3002</p></blockquote><h4 id="arraylist" tabindex="-1"><a class="header-anchor" href="#arraylist" aria-hidden="true">#</a> ArrayList</h4><p><code>ArrayList</code> \u5E95\u5C42\u662F\u7531\u6570\u7EC4\u5B9E\u73B0\u7684\uFF0C\u652F\u6301\u968F\u673A\u5B58\u53D6\uFF0C\u4E5F\u5C31\u662F\u53EF\u4EE5\u901A\u8FC7\u4E0B\u6807\u76F4\u63A5\u5B58\u53D6\u5143\u7D20\uFF1B</p><p>\u5982\u679C\u5185\u90E8\u6570\u7EC4\u7684\u5BB9\u91CF\u4E0D\u8DB3\u65F6\u4F1A\u81EA\u52A8\u6269\u5BB9\uFF0C\u56E0\u6B64\u5F53\u5143\u7D20\u975E\u5E38\u5E9E\u5927\u7684\u65F6\u5019\uFF0C\u6548\u7387\u4F1A\u6BD4\u8F83\u4F4E\u3002</p><p>\u6240\u4EE5 ArrayList \u7684\u7279\u70B9\u662F\u5143\u7D20\u589E\u5220\u6162\uFF0C\u67E5\u627E\u5FEB\u3002</p><h4 id="linkedlist" tabindex="-1"><a class="header-anchor" href="#linkedlist" aria-hidden="true">#</a> LinkedList</h4><p><code>LinkedList</code> \u662F\u7531\u53CC\u5411\u94FE\u8868\u5B9E\u73B0\u7684\uFF0C\u4E0D\u652F\u6301\u968F\u673A\u5B58\u53D6\uFF0C\u53EA\u80FD\u4ECE\u4E00\u7AEF\u5F00\u59CB\u904D\u5386\uFF0C\u76F4\u5230\u627E\u5230\u9700\u8981\u7684\u5143\u7D20\u540E\u8FD4\u56DE\uFF1B</p><p>\u4EFB\u610F\u4F4D\u7F6E\u63D2\u5165\u548C\u5220\u9664\u5143\u7D20\u90FD\u5F88\u65B9\u4FBF\uFF0C\u56E0\u4E3A\u53EA\u9700\u8981\u6539\u53D8\u524D\u4E00\u4E2A\u8282\u70B9\u548C\u540E\u4E00\u4E2A\u8282\u70B9\u7684\u5F15\u7528\u5373\u53EF\uFF0C\u4E0D\u50CF ArrayList \u90A3\u6837\u9700\u8981\u590D\u5236\u548C\u79FB\u52A8\u6570\u7EC4\u5143\u7D20\uFF1B</p><p>\u56E0\u4E3A\u6BCF\u4E2A\u5143\u7D20\u90FD\u5B58\u50A8\u4E86\u524D\u4E00\u4E2A\u548C\u540E\u4E00\u4E2A\u8282\u70B9\u7684\u5F15\u7528\uFF0C\u6240\u4EE5\u76F8\u5BF9\u6765\u8BF4\uFF0C\u5360\u7528\u7684\u5185\u5B58\u7A7A\u95F4\u4F1A\u6BD4 ArrayList \u591A\u4E00\u4E9B\u3002</p><h4 id="vector" tabindex="-1"><a class="header-anchor" href="#vector" aria-hidden="true">#</a> Vector</h4><p>\u548C ArrayList \u7C7B\u4F3C\uFF0C\u4F46\u5B83\u662F\u7EBF\u7A0B\u5B89\u5168\u7684\uFF0C\u4E00\u4E9B\u65B9\u6CD5\u90FD\u52A0\u4E86 <code>synchronized</code>\u5173\u952E\u5B57\uFF0C\u6267\u884C\u6548\u7387\u4F1A\u6BD4\u8F83\u4F4E\uFF0C\u5F88\u5C11\u4F7F\u7528\u3002</p><h4 id="stack" tabindex="-1"><a class="header-anchor" href="#stack" aria-hidden="true">#</a> Stack</h4><p><code>Stack</code> \u7EE7\u627F\u4E86 <code>Vector</code>\uFF0C\u5728\u5176\u57FA\u7840\u4E0A\u5B9E\u73B0\u4E86\u6808\u5148\u8FDB\u5148\u51FA\u7684\u529F\u80FD\uFF08push\u3001pop\u3001peek\u7B49\u65B9\u6CD5\uFF09\uFF0C\u65B9\u6CD5\u4E0A\u540C\u6837\u6DFB\u52A0\u4E86 <code>synchronized</code> \u5173\u952E\u5B57\uFF0C\u5B98\u65B9\u63A8\u8350\u4F7F\u7528\u53CC\u7AEF\u961F\u5217 <code>ArrayDeque</code>\u3002</p><h3 id="queue-\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#queue-\u63A5\u53E3" aria-hidden="true">#</a> Queue \u63A5\u53E3</h3><blockquote><p>Queue \u63A5\u53E3\u7EE7\u627F\u4E86Collection\uFF0C\u88AB\u8BBE\u8BA1\u7528\u4E8E\u5904\u7406\u4E4B\u524D\u4E34\u65F6\u4FDD\u5B58\u5728\u67D0\u5904\u7684\u5143\u7D20\u3002</p><p>\u9664\u4E86\u57FA\u672C\u7684Collection\u64CD\u4F5C\u4E4B\u5916\uFF0C\u961F\u5217\u8FD8\u63D0\u4F9B\u4E86\u989D\u5916\u7684\u63D2\u5165\u3001\u63D0\u53D6\u548C\u68C0\u67E5\u64CD\u4F5C\u3002\u6BCF\u4E00\u79CD\u64CD\u4F5C\u90FD\u6709\u4E24\u79CD\u5F62\u5F0F\uFF1A\u5982\u679C\u64CD\u4F5C\u5931\u8D25\uFF0C\u5219\u629B\u51FA\u4E00\u4E2A\u5F02\u5E38\uFF1B\u5982\u679C\u64CD\u4F5C\u5931\u8D25\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u7279\u6B8A\u503C\uFF08null\u6216false\uFF0C\u53D6\u51B3\u4E8E\u662F\u4EC0\u4E48\u64CD\u4F5C\uFF09\u3002</p></blockquote><h4 id="arraydeque" tabindex="-1"><a class="header-anchor" href="#arraydeque" aria-hidden="true">#</a> ArrayDeque</h4><p><code>ArrayDeque</code> \u662F\u4E00\u4E2A\u57FA\u4E8E\u6570\u7EC4\u5B9E\u73B0\u7684\u53CC\u7AEF\u961F\u5217\uFF0C\u5B83\u4F7F\u7528\u4E00\u4E2A\u5934\u6307\u9488 <code>head</code> \u6307\u5411\u961F\u9996\u7684\u7B2C\u4E00\u4E2A\u6709\u6548\u7684\u5143\u7D20\u548C\u4E00\u4E2A\u5C3E\u6307\u9488 <code>tail </code>\u6307\u5411\u961F\u5C3E\u7B2C\u4E00\u4E2A\u53EF\u4EE5\u63D2\u5165\u5143\u7D20\u7684\u7A7A\u4F4D\u6784\u6210\u4E00\u4E2A\u5FAA\u73AF\u6570\u7EC4\u3002</p><h4 id="linkedlist-1" tabindex="-1"><a class="header-anchor" href="#linkedlist-1" aria-hidden="true">#</a> LinkedList</h4><p>LinkedList \u4E5F\u5B9E\u73B0\u4E86 Deque \u63A5\u53E3\uFF0C\u7531\u4E8E\u5176\u5185\u90E8\u53CC\u5411\u94FE\u8868\u7684\u7279\u6027\uFF0C\u4E5F\u53EF\u4EE5\u4F5C\u4E3A\u94FE\u8868\u5B9E\u73B0\u7684\u53CC\u5411\u961F\u5217\u4F7F\u7528\u3002</p><h4 id="priorityqueue" tabindex="-1"><a class="header-anchor" href="#priorityqueue" aria-hidden="true">#</a> PriorityQueue</h4><p>PriorityQueue \u662F\u4E00\u79CD\u4F18\u5148\u7EA7\u961F\u5217\uFF0C\u5B83\u7684\u51FA\u961F\u987A\u5E8F\u4E0E\u5143\u7D20\u7684\u4F18\u5148\u7EA7\u6709\u5173\uFF0C\u6267\u884C remove \u6216\u8005 poll \u65B9\u6CD5\uFF0C\u8FD4\u56DE\u7684\u603B\u662F\u4F18\u5148\u7EA7\u6700\u9AD8\u7684\u5143\u7D20\u3002</p><p>\u8981\u60F3\u6709\u4F18\u5148\u7EA7\uFF0C\u5143\u7D20\u5C31\u9700\u8981\u5B9E\u73B0 Comparable \u63A5\u53E3\u6216\u8005 Comparator \u63A5\u53E3</p><h3 id="set-\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#set-\u63A5\u53E3" aria-hidden="true">#</a> Set \u63A5\u53E3</h3><blockquote><p>Set \u7684\u7279\u70B9\u662F\u5B58\u53D6\u65E0\u5E8F\uFF0C\u4E0D\u53EF\u4EE5\u5B58\u653E\u91CD\u590D\u7684\u5143\u7D20\uFF0C\u4E0D\u53EF\u4EE5\u7528\u4E0B\u6807\u5BF9\u5143\u7D20\u8FDB\u884C\u64CD\u4F5C\uFF0C\u548C List \u6709\u5F88\u591A\u4E0D\u540C\u3002</p><p>Set \u7684\u5B50\u7C7B\u5927\u591A\u4F7F\u7528 Map \u7684\u5B50\u7C7B\u7684 key \u5B58\u50A8\u6570\u636E\uFF0C\u5229\u7528\u4E86 Map \u952E\u4E0D\u5141\u8BB8\u91CD\u590D\u3001\u65E0\u5E8F\u7684\u7279\u6027\u3002</p></blockquote><h4 id="hashset" tabindex="-1"><a class="header-anchor" href="#hashset" aria-hidden="true">#</a> HashSet</h4><p>HashSet \u5185\u90E8\u662F\u7531 HashMap \u5B9E\u73B0\u7684\uFF0C\u53EA\u4E0D\u8FC7\u503C\u7531\u4E00\u4E2A\u56FA\u5B9A\u7684 Object \u5BF9\u8C61\u586B\u5145\uFF0C\u800C\u952E\u7528\u4E8E\u64CD\u4F5C\u3002</p><h4 id="linkedhashset" tabindex="-1"><a class="header-anchor" href="#linkedhashset" aria-hidden="true">#</a> LinkedHashSet</h4><p>LinkedHashSet \u7EE7\u627F\u81EA HashSet\uFF0C\u5176\u5B9E\u662F\u7531 LinkedHashMap \u5B9E\u73B0\u7684\uFF0CLinkedHashSet \u7684\u6784\u9020\u65B9\u6CD5\u8C03\u7528\u4E86 HashSet \u7684\u4E00\u4E2A\u7279\u6B8A\u7684\u6784\u9020\u65B9\u6CD5\uFF1A</p><div class="language-java ext-java"><pre class="language-java"><code><span class="token class-name">HashSet</span><span class="token punctuation">(</span><span class="token keyword">int</span> initialCapacity<span class="token punctuation">,</span> <span class="token keyword">float</span> loadFactor<span class="token punctuation">,</span> <span class="token keyword">boolean</span> dummy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>initialCapacity<span class="token punctuation">,</span> loadFactor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="treeset" tabindex="-1"><a class="header-anchor" href="#treeset" aria-hidden="true">#</a> TreeSet</h4><p>TreeSet \u5185\u90E8\u4F7F\u7528 TreeMap \u5B9E\u73B0\uFF0C\u540C\u6837\u503C\u7531\u56FA\u5B9A\u7684 Object \u5BF9\u8C61\u586B\u5145\uFF0C\u952E\u7528\u4E8E\u64CD\u4F5C\u3002</p><h2 id="map-\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#map-\u63A5\u53E3" aria-hidden="true">#</a> Map \u63A5\u53E3</h2><blockquote><p>Map \u4FDD\u5B58\u7684\u662F\u952E\u503C\u5BF9\uFF0C\u952E\u8981\u6C42\u4FDD\u6301\u552F\u4E00\u6027\uFF0C\u503C\u53EF\u4EE5\u91CD\u590D\u3002</p></blockquote><h3 id="hashmap" tabindex="-1"><a class="header-anchor" href="#hashmap" aria-hidden="true">#</a> HashMap</h3><p>HashMap \u5B9E\u73B0\u4E86 Map \u63A5\u53E3\uFF0C\u6839\u636E\u952E\u7684 HashCode \u503C\u6765\u5B58\u50A8\u6570\u636E\uFF0C\u5177\u6709\u5F88\u5FEB\u7684\u8BBF\u95EE\u901F\u5EA6\uFF0C\u6700\u591A\u5141\u8BB8\u4E00\u4E2A null \u952E\u3002</p><p>HashMap \u4E0D\u8BBA\u662F\u5728\u5B66\u4E60\u8FD8\u662F\u5DE5\u4F5C\u5F53\u4E2D\uFF0C\u4F7F\u7528\u9891\u7387\u90FD\u662F\u76F8\u5F53\u9AD8\u7684\u3002\u968F\u7740 JDK \u7248\u672C\u7684\u4E0D\u65AD\u66F4\u65B0\uFF0CHashMap \u7684\u5E95\u5C42\u4E5F\u4F18\u5316\u4E86\u5F88\u591A\u6B21\uFF0CJDK 8 \u7684\u65F6\u5019\u5F15\u5165\u4E86\u7EA2\u9ED1\u6811\u3002</p><p>\u4E00\u65E6 HashMap \u53D1\u751F\u54C8\u5E0C\u51B2\u7A81\uFF0C\u5C31\u628A\u76F8\u540C\u952E\u4F4D\u7684\u5730\u65B9\u6539\u6210\u94FE\u8868\uFF0C\u5982\u679C\u94FE\u8868\u7684\u957F\u5EA6\u8D85\u8FC7 8\uFF0C\u5C31\u8BE5\u7528\u7EA2\u9ED1\u6811\u3002</p><h3 id="linkedhashmap" tabindex="-1"><a class="header-anchor" href="#linkedhashmap" aria-hidden="true">#</a> LinkedHashMap</h3><p>LinkedHashMap \u662F HashMap \u7684\u5B50\u7C7B\uFF0C\u5185\u90E8\u4F7F\u7528\u94FE\u8868\u6765\u8BB0\u5F55\u63D2\u5165/\u8BBF\u95EE\u5143\u7D20\u7684\u987A\u5E8F\u3002</p><p>LinkedHashMap \u53EF\u4EE5\u770B\u4F5C\u662F HashMap + LinkedList \u7684\u5408\u4F53\uFF0C\u5B83\u4F7F\u7528\u4E86 \u54C8\u5E0C\u8868\u6765\u5B58\u50A8\u6570\u636E\uFF0C\u53C8\u7528\u4E86\u53CC\u5411\u94FE\u8868\u6765\u7EF4\u6301\u987A\u5E8F\u3002</p><h3 id="treemap" tabindex="-1"><a class="header-anchor" href="#treemap" aria-hidden="true">#</a> TreeMap</h3><p>HashMap \u662F\u65E0\u5E8F\u7684\uFF0C\u6240\u4EE5\u904D\u5386\u7684\u65F6\u5019\u5143\u7D20\u7684\u987A\u5E8F\u4E5F\u662F\u4E0D\u53EF\u6D4B\u7684\u3002TreeMap \u662F\u6709\u5E8F\u7684\uFF0C\u5B83\u5728\u5185\u90E8\u4F1A\u5BF9\u952E\u8FDB\u884C\u6392\u5E8F\uFF0C\u6240\u4EE5\u904D\u5386\u7684\u65F6\u5019\u5C31\u53EF\u4EE5\u5F97\u5230\u9884\u671F\u7684\u987A\u5E8F\u3002</p><p>\u4E3A\u4E86\u4FDD\u8BC1\u987A\u5E8F\uFF0CTreeMap \u7684\u952E\u5FC5\u987B\u8981\u5B9E\u73B0 Comparable \u63A5\u53E3\u6216\u8005 Comparator \u63A5\u53E3\u3002</p><h2 id="\u53C2\u8003\u8D44\u6599" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u8D44\u6599" aria-hidden="true">#</a> \u53C2\u8003\u8D44\u6599</h2>`,57),d={href:"https://tobebetterjavaer.com/collection/gailan.html",target:"_blank",rel:"noopener noreferrer"},h=n("Java \u7A0B\u5E8F\u5458\u8FDB\u9636\u4E4B\u8DEF"),u={href:"https://pdai.tech/md/java/collection/java-collection-all.html",target:"_blank",rel:"noopener noreferrer"},k=n("Java\u5168\u6808\u77E5\u8BC6\u4F53\u7CFB");function b(L,m){const e=p("ExternalLinkIcon");return i(),o("div",null,[c,a("ul",null,[a("li",null,[a("a",d,[h,t(e)])]),a("li",null,[a("a",u,[k,t(e)])])])])}const v=s(l,[["render",b],["__file","index.html.vue"]]);export{v as default};
