const e=JSON.parse(`{"key":"v-08def6da","path":"/md/advance/design/creational/02-factory.html","title":"工厂模式","lang":"zh-CN","frontmatter":{"title":"工厂模式","category":"设计模式","date":"2023-03-03T00:00:00.000Z","description":"简单工厂模式（Simple Factory） 定义一个工厂类，可以根据传入的参数不同创建不同类实例，被创建的实例通常都有相同的父类。简单工厂模式在 java 中得到了大量的使用，它属于创建型的设计模式，但是它不属于 GOF23 设计模式中的一种。 工厂模式提供公共的接口，客户端直接使用公共接口来创建对象，客户端这边不关心对象是怎么创建的，其中包含 3 个角色：工厂角色，抽象产品角色，具体产品角色。 工厂角色是简单工厂模式的核心，负责产品实例的内部逻辑； 抽象产品角色是所有具体产品角色的父类，封装了公共的方法； 具体产品角色是工厂角色创建的目标对象。","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/md/advance/design/creational/02-factory.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"工厂模式"}],["meta",{"property":"og:description","content":"简单工厂模式（Simple Factory） 定义一个工厂类，可以根据传入的参数不同创建不同类实例，被创建的实例通常都有相同的父类。简单工厂模式在 java 中得到了大量的使用，它属于创建型的设计模式，但是它不属于 GOF23 设计模式中的一种。 工厂模式提供公共的接口，客户端直接使用公共接口来创建对象，客户端这边不关心对象是怎么创建的，其中包含 3 个角色：工厂角色，抽象产品角色，具体产品角色。 工厂角色是简单工厂模式的核心，负责产品实例的内部逻辑； 抽象产品角色是所有具体产品角色的父类，封装了公共的方法； 具体产品角色是工厂角色创建的目标对象。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-04T07:58:47.000Z"}],["meta",{"property":"article:published_time","content":"2023-03-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-04T07:58:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"工厂模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-03T00:00:00.000Z\\",\\"dateModified\\":\\"2023-03-04T07:58:47.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"简单工厂模式（Simple Factory）","slug":"简单工厂模式-simple-factory","link":"#简单工厂模式-simple-factory","children":[{"level":3,"title":"伪代码","slug":"伪代码","link":"#伪代码","children":[]},{"level":3,"title":"小结","slug":"小结","link":"#小结","children":[]}]},{"level":2,"title":"工厂方法模式 (Factory Method)","slug":"工厂方法模式-factory-method","link":"#工厂方法模式-factory-method","children":[{"level":3,"title":"伪代码","slug":"伪代码-1","link":"#伪代码-1","children":[]},{"level":3,"title":"小结","slug":"小结-1","link":"#小结-1","children":[]}]},{"level":2,"title":"抽象工厂 (Abstract Factory)","slug":"抽象工厂-abstract-factory","link":"#抽象工厂-abstract-factory","children":[{"level":3,"title":"伪代码","slug":"伪代码-2","link":"#伪代码-2","children":[]},{"level":3,"title":"小结","slug":"小结-2","link":"#小结-2","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1677916727000,"updatedTime":1677916727000,"contributors":[{"name":"AlexChen","email":"1274812218@qq.com","commits":1}]},"readingTime":{"minutes":4.92,"words":1476},"filePathRelative":"md/advance/design/creational/02-factory.md","localizedDate":"2023年3月3日","excerpt":"<h2> 简单工厂模式（Simple Factory）</h2>\\n<p>定义一个工厂类，可以根据传入的参数不同创建不同类实例，被创建的实例通常都有相同的父类。简单工厂模式在 java 中得到了大量的使用，它属于创建型的设计模式，但是它不属于 GOF23 设计模式中的一种。</p>\\n<p>工厂模式提供公共的接口，客户端直接使用公共接口来创建对象，客户端这边不关心对象是怎么创建的，其中包含 3 个角色：<strong>工厂角色，抽象产品角色，具体产品角色</strong>。</p>\\n<ul>\\n<li>工厂角色是简单工厂模式的核心，负责产品实例的内部逻辑；</li>\\n<li>抽象产品角色是所有具体产品角色的父类，封装了公共的方法；</li>\\n<li>具体产品角色是工厂角色创建的目标对象。</li>\\n</ul>","autoDesc":true}`);export{e as data};
