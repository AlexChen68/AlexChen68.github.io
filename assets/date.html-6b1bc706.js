const e=JSON.parse(`{"key":"v-691a43d6","path":"/java/basic/date.html","title":"Java 时间工具","lang":"zh-CN","frontmatter":{"title":"Java 时间工具","category":"Java","date":"2023-05-10T00:00:00.000Z","description":"1. Date 和 Calendar java.util.Date 与 java.util.Calendar 是 JDK 早期提供的日期工具，不过由于 API 设计混乱，吐槽的地方太多了。比如： 在易用性方面有着很大的缺陷，年份的起始时间选择是 1900 年，月份是从 0 开始。 toString 方法返回值不直观，带有时区。 很多时间操作都需要 SimpleDateTimeFormat 来格式化。 java.util.Date 与 java.util.Calendar 中的所有属性都是可变的。 SimpleDateTimeFormat 是非线程安全。","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/java/basic/date.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"Java 时间工具"}],["meta",{"property":"og:description","content":"1. Date 和 Calendar java.util.Date 与 java.util.Calendar 是 JDK 早期提供的日期工具，不过由于 API 设计混乱，吐槽的地方太多了。比如： 在易用性方面有着很大的缺陷，年份的起始时间选择是 1900 年，月份是从 0 开始。 toString 方法返回值不直观，带有时区。 很多时间操作都需要 SimpleDateTimeFormat 来格式化。 java.util.Date 与 java.util.Calendar 中的所有属性都是可变的。 SimpleDateTimeFormat 是非线程安全。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-10T11:01:48.000Z"}],["meta",{"property":"article:author","content":"AlexChen"}],["meta",{"property":"article:published_time","content":"2023-05-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-10T11:01:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 时间工具\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-10T00:00:00.000Z\\",\\"dateModified\\":\\"2023-05-10T11:01:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"AlexChen\\",\\"url\\":\\"https://github.com/AlexChen68\\"}]}"]]},"headers":[{"level":2,"title":"1. Date 和 Calendar","slug":"_1-date-和-calendar","link":"#_1-date-和-calendar","children":[]},{"level":2,"title":"2. Java8 时间和日期","slug":"_2-java8-时间和日期","link":"#_2-java8-时间和日期","children":[]}],"git":{"createdTime":1683716508000,"updatedTime":1683716508000,"contributors":[{"name":"alexchen","email":"1274812218@qq.com","commits":1}]},"readingTime":{"minutes":1.3,"words":391},"filePathRelative":"java/basic/date.md","localizedDate":"2023年5月10日","excerpt":"<h2> 1. Date 和 Calendar</h2>\\n<p><code>java.util.Date</code> 与 <code>java.util.Calendar</code> 是 JDK 早期提供的日期工具，不过由于 API 设计混乱，吐槽的地方太多了。比如：</p>\\n<ul>\\n<li>在易用性方面有着很大的缺陷，年份的起始时间选择是 1900 年，月份是从 0 开始。</li>\\n<li>toString 方法返回值不直观，带有时区。</li>\\n<li>很多时间操作都需要 <code>SimpleDateTimeFormat</code> 来格式化。</li>\\n<li><code>java.util.Date</code> 与 <code>java.util.Calendar</code> 中的所有属性都是可变的。</li>\\n<li><code>SimpleDateTimeFormat</code> 是非线程安全。</li>\\n</ul>","autoDesc":true}`);export{e as data};