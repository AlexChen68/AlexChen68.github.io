const e=JSON.parse(`{"key":"v-bbca7094","path":"/devops/docker/","title":"Docker 简介","lang":"zh-CN","frontmatter":{"title":"Docker 简介","category":"Docker","date":"2023-01-28T00:00:00.000Z","description":"Docker 介绍 Docker 是一个开源的应用容器引擎，它让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到安装了任何 Linux 发行版本的机器上。Docker 基于 LXC 来实现类似 VM 的功能，可以在更有限的硬件资源上提供给用户更多的计算资源。与同 VM 等虚拟化的方式不同，LXC 不属于全虚拟化、部分虚拟化或半虚拟化中的任何一个分类，而是一个操作系统级虚拟化。 Docker 是直接运行在宿主操作系统之上的一个容器，使用沙箱机制完全虚拟出一个完整的操作，容器之间不会有任何接口，从而让容器与宿主机之间、容器与容器之间隔离的更加彻底。每个容器会有自己的权限管理，独立的网络与存储栈，及自己的资源管理能，使同一台宿主机上可以友好的共存多个容器。","head":[["meta",{"property":"og:url","content":"https://github.com/AlexChen68/AlexChen68.github.io/devops/docker/"}],["meta",{"property":"og:site_name","content":"AlexChen's Blog"}],["meta",{"property":"og:title","content":"Docker 简介"}],["meta",{"property":"og:description","content":"Docker 介绍 Docker 是一个开源的应用容器引擎，它让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到安装了任何 Linux 发行版本的机器上。Docker 基于 LXC 来实现类似 VM 的功能，可以在更有限的硬件资源上提供给用户更多的计算资源。与同 VM 等虚拟化的方式不同，LXC 不属于全虚拟化、部分虚拟化或半虚拟化中的任何一个分类，而是一个操作系统级虚拟化。 Docker 是直接运行在宿主操作系统之上的一个容器，使用沙箱机制完全虚拟出一个完整的操作，容器之间不会有任何接口，从而让容器与宿主机之间、容器与容器之间隔离的更加彻底。每个容器会有自己的权限管理，独立的网络与存储栈，及自己的资源管理能，使同一台宿主机上可以友好的共存多个容器。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-17T08:36:34.000Z"}],["meta",{"property":"article:author","content":"AlexChen"}],["meta",{"property":"article:published_time","content":"2023-01-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-17T08:36:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker 简介\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-28T00:00:00.000Z\\",\\"dateModified\\":\\"2023-04-17T08:36:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"AlexChen\\",\\"url\\":\\"https://github.com/AlexChen68\\"}]}"]]},"headers":[{"level":2,"title":"Docker 介绍","slug":"docker-介绍","link":"#docker-介绍","children":[]},{"level":2,"title":"应用场景","slug":"应用场景","link":"#应用场景","children":[]},{"level":2,"title":"优势","slug":"优势","link":"#优势","children":[]},{"level":2,"title":"虚拟化技术","slug":"虚拟化技术","link":"#虚拟化技术","children":[{"level":3,"title":"虚拟化技术分类","slug":"虚拟化技术分类","link":"#虚拟化技术分类","children":[]},{"level":3,"title":"几种虚拟化技术","slug":"几种虚拟化技术","link":"#几种虚拟化技术","children":[]}]},{"level":2,"title":"Docker 与虚拟机的区别","slug":"docker-与虚拟机的区别","link":"#docker-与虚拟机的区别","children":[{"level":3,"title":"构造对比","slug":"构造对比","link":"#构造对比","children":[]},{"level":3,"title":"虚拟技术对比","slug":"虚拟技术对比","link":"#虚拟技术对比","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1680340044000,"updatedTime":1681720594000,"contributors":[{"name":"alexchen","email":"1274812218@qq.com","commits":1},{"name":"alexchen68","email":"1274812218@qq.com","commits":1}]},"readingTime":{"minutes":15.64,"words":4692},"filePathRelative":"devops/docker/README.md","localizedDate":"2023年1月28日","excerpt":"<h2> Docker 介绍</h2>\\n<p>Docker 是一个开源的应用容器引擎，它让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到安装了任何 Linux 发行版本的机器上。Docker 基于 LXC 来实现类似 VM 的功能，可以在更有限的硬件资源上提供给用户更多的计算资源。与同 VM 等虚拟化的方式不同，LXC 不属于全虚拟化、部分虚拟化或半虚拟化中的任何一个分类，而是一个操作系统级虚拟化。</p>\\n<p>Docker 是直接运行在宿主操作系统之上的一个容器，使用沙箱机制完全虚拟出一个完整的操作，容器之间不会有任何接口，从而让容器与宿主机之间、容器与容器之间隔离的更加彻底。每个容器会有自己的权限管理，独立的网络与存储栈，及自己的资源管理能，使同一台宿主机上可以友好的共存多个容器。</p>","autoDesc":true}`);export{e as data};