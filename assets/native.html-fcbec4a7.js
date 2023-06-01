const e=JSON.parse(`{"key":"v-731e1540","path":"/java/jvm/native.html","title":"Native 本地方法区","lang":"zh-CN","frontmatter":{"title":"Native 本地方法区","category":"JVM","date":"2023-05-21T00:00:00.000Z","description":"native 关键字 native 关键字说明其修饰的方法是一个原生态方法，方法对应的实现不是在当前文件，而是在用其他语言（如 C 和 C++）实现的文件中。Java 语言本身不能对操作系统底层进行访问和操作，但是可以通过 JNI 接口调用其他语言来实现对底层的访问。 被 native 修饰的方法会进入本地方法栈（Native Method Stack），执行本地方法时，会调通过本地接口（JNI）调用本地方法库。 JNI 是 Java 本机接口（Java Native Interface），是一个本机编程接口，它是 Java 软件开发工具箱（java Software Development Kit，SDK）的一部分。JNI 允许 Java 代码使用以其他语言编写的代码和代码库。Invocation API（JNI 的一部分）可以用来将 Java 虚拟机（JVM）嵌入到本机应用程序中，从而允许程序员从本机代码内部调用 Java 代码。","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/java/jvm/native.html"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"Native 本地方法区"}],["meta",{"property":"og:description","content":"native 关键字 native 关键字说明其修饰的方法是一个原生态方法，方法对应的实现不是在当前文件，而是在用其他语言（如 C 和 C++）实现的文件中。Java 语言本身不能对操作系统底层进行访问和操作，但是可以通过 JNI 接口调用其他语言来实现对底层的访问。 被 native 修饰的方法会进入本地方法栈（Native Method Stack），执行本地方法时，会调通过本地接口（JNI）调用本地方法库。 JNI 是 Java 本机接口（Java Native Interface），是一个本机编程接口，它是 Java 软件开发工具箱（java Software Development Kit，SDK）的一部分。JNI 允许 Java 代码使用以其他语言编写的代码和代码库。Invocation API（JNI 的一部分）可以用来将 Java 虚拟机（JVM）嵌入到本机应用程序中，从而允许程序员从本机代码内部调用 Java 代码。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-22T12:58:56.000Z"}],["meta",{"property":"article:author","content":"AlexChen"}],["meta",{"property":"article:published_time","content":"2023-05-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-22T12:58:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Native 本地方法区\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-21T00:00:00.000Z\\",\\"dateModified\\":\\"2023-05-22T12:58:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"AlexChen\\",\\"url\\":\\"https://github.com/AlexChen68\\"}]}"]]},"headers":[{"level":2,"title":"native 关键字","slug":"native-关键字","link":"#native-关键字","children":[]},{"level":2,"title":"native 的用法","slug":"native-的用法","link":"#native-的用法","children":[]}],"git":{"createdTime":1684760336000,"updatedTime":1684760336000,"contributors":[{"name":"alexchen68","email":"1274812218@qq.com","commits":1}]},"readingTime":{"minutes":1.18,"words":355},"filePathRelative":"java/jvm/native.md","localizedDate":"2023年5月21日","excerpt":"<h2> native 关键字</h2>\\n<p>native 关键字说明其修饰的方法是一个原生态方法，方法对应的实现不是在当前文件，而是在用其他语言（如 C 和 C++）实现的文件中。Java 语言本身不能对操作系统底层进行访问和操作，但是可以通过 JNI 接口调用其他语言来实现对底层的访问。</p>\\n<p>被 native 修饰的方法会进入<strong>本地方法栈（Native Method Stack）</strong>，执行本地方法时，会调通过本地接口（JNI）调用本地方法库。</p>\\n<p>JNI 是 Java 本机接口（Java Native Interface），是一个本机编程接口，它是 Java 软件开发工具箱（java Software Development Kit，SDK）的一部分。JNI 允许 Java 代码使用以其他语言编写的代码和代码库。Invocation API（JNI 的一部分）可以用来将 Java 虚拟机（JVM）嵌入到本机应用程序中，从而允许程序员从本机代码内部调用 Java 代码。</p>","autoDesc":true}`);export{e as data};