import{_ as r,o as e,c as o,Q as i}from"./chunks/framework.419948d5.js";const g=JSON.parse('{"title":"Docker 简介","description":"","frontmatter":{"title":"Docker 简介","date":"2023-01-28T00:00:00.000Z"},"headers":[],"relativePath":"devops/docker/index.md","filePath":"devops/docker/index.md","lastUpdated":1694772353000}'),a={name:"devops/docker/index.md"},t=i('<h2 id="docker-介绍" tabindex="-1">Docker 介绍 <a class="header-anchor" href="#docker-介绍" aria-label="Permalink to &quot;Docker 介绍&quot;">​</a></h2><p>Docker 是一个开源的应用容器引擎，它让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到安装了任何 Linux 发行版本的机器上。Docker 基于 LXC 来实现类似 VM 的功能，可以在更有限的硬件资源上提供给用户更多的计算资源。与同 VM 等虚拟化的方式不同，LXC 不属于全虚拟化、部分虚拟化或半虚拟化中的任何一个分类，而是一个操作系统级虚拟化。</p><p>Docker 是直接运行在宿主操作系统之上的一个容器，使用沙箱机制完全虚拟出一个完整的操作，容器之间不会有任何接口，从而让容器与宿主机之间、容器与容器之间隔离的更加彻底。每个容器会有自己的权限管理，独立的网络与存储栈，及自己的资源管理能，使同一台宿主机上可以友好的共存多个容器。</p><p>Docker 借助 Linux 的内核特性，如：控制组（Control Group）、命名空间（Namespace）等，并直接调用操作系统的系统调用接口。从而降低每个容器的系统开销，并实现降低容器复杂度、启动快、资源占用小等特征。</p><h2 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景&quot;">​</a></h2><ul><li>Web 应用的自动化打包和发布。</li><li>自动化测试和持续集成、发布。</li><li>在服务型环境中部署和调整数据库或其他的后台应用。</li><li>从头编译或者扩展现有的 OpenShift 或 Cloud Foundry 平台来搭建自己的 PaaS 环境。</li></ul><h2 id="优势" tabindex="-1">优势 <a class="header-anchor" href="#优势" aria-label="Permalink to &quot;优势&quot;">​</a></h2><ul><li><p><strong>更高效的利用系统资源</strong></p><p>由于容器不需要进行硬件虚拟以及运行完整操作系统等额外开销，<code>Docker</code> 对系统资源的利用率更高。无论是应用执行速度、内存损耗或者文件存储速度，都要比传统虚拟机技术更高效。因此，相比虚拟机技术，一个相同配置的主机，往往可以运行更多数量的应用。</p></li><li><p>更快速的启动时间</p><p>传统的虚拟机技术启动应用服务往往需要数分钟，而 <code>Docker</code> 容器应用，由于直接运行于宿主内核，无需启动完整的操作系统，因此可以做到秒级、甚至毫秒级的启动时间。大大的节约了开发、测试、部署的时间。</p></li><li><p>一致的运行环境</p><p>开发过程中一个常见的问题是环境一致性问题。由于开发环境、测试环境、生产环境不一致，导致有些 bug 并未在开发过程中被发现。而 <code>Docker</code> 的镜像提供了除内核外完整的运行时环境，确保了应用运行环境一致性，从而不会再出现 <em>「这段代码在我机器上没问题啊」</em> 这类问题。</p></li><li><p>持续交付和部署</p><p>对开发和运维（DevOps）人员来说，最希望的就是一次创建或配置，可以在任意地方正常运行。</p><p>使用 Docker 可以通过定制应用镜像来实现持续集成、持续交付、部署。开发人员可以通过 Dockerfile 来进行镜像构建，并结合 持续集成 (Continuous Integration) 系统进行集成测试，而运维人员则可以直接在生产环境中快速部署该镜像，甚至结合 持续部署 (Continuous Delivery/Deployment) 系统进行自动部署。</p><p>而且使用 Dockerfile 使镜像构建透明化，不仅仅开发团队可以理解应用运行环境，也方便运维团队理解应用运行所需条件，帮助更好的生产环境中部署该镜像。</p></li><li><p>更轻松的迁移</p><p>由于 <code>Docker</code> 确保了执行环境的一致性，使得应用的迁移更加容易。<code>Docker</code> 可以在很多平台上运行，无论是物理机、虚拟机、公有云、私有云，甚至是笔记本，其运行结果是一致的。因此用户可以很轻易的将在一个平台上运行的应用，迁移到另一个平台上，而不用担心运行环境的变化导致应用无法正常运行的情况。</p></li><li><p>更轻松的维护和扩展</p><p>Docker 使用的分层存储以及镜像的技术，使得应用重复部分的复用更为容易，也使得应用的维护更新更加简单，基于基础镜像进一步扩展镜像也变得非常简单。此外，Docker 团队同各个开源项目团队一起维护了一大批高质量的官方镜像，既可以直接在生产环境使用，又可以作为基础进一步定制，大大的降低了应用服务的镜像制作成本。</p></li></ul><h2 id="虚拟化技术" tabindex="-1">虚拟化技术 <a class="header-anchor" href="#虚拟化技术" aria-label="Permalink to &quot;虚拟化技术&quot;">​</a></h2><blockquote><p>虚拟化技术是一种资源管理技术，是将计算机的各种实体资源（CPU、内存、磁盘空间、网络适配器等），予以抽象、转换后呈现出来并可供分割、组合为一个或多个电脑配置环境。由此，打破实体结构间的不可切割的障碍，使用户可以比原本的配置更好的方式来应用这些电脑硬件资源。这些资源的新虚拟部分是不受现有资源的架设方式，地域或物理配置所限制。一般所指的虚拟化资源包括计算能力和数据存储。</p></blockquote><h3 id="虚拟化技术分类" tabindex="-1">虚拟化技术分类 <a class="header-anchor" href="#虚拟化技术分类" aria-label="Permalink to &quot;虚拟化技术分类&quot;">​</a></h3><p>从实现形式来分，虚拟化技术可分为基于硬件的虚拟化和基于软件的虚拟化。</p><h4 id="硬件虚拟化" tabindex="-1">硬件虚拟化 <a class="header-anchor" href="#硬件虚拟化" aria-label="Permalink to &quot;硬件虚拟化&quot;">​</a></h4><p>硬件虚拟化就是硬件物理平台本身提供了对特殊指令的截获和重定向的支持。支持虚拟化的硬件，也是一些基于硬件实现软件虚拟化技术的关键。在基于硬件实现软件虚拟化的技术中，在硬件是实现虚拟化的基础，硬件 (主要是 CPU) 会为虚拟化软件提供支持，从而实现硬件资源的虚拟化。</p><p>支持虚拟化的硬件有：</p><ul><li><strong>Intel-VT-(Intel Virtualization Technology)</strong>，Intel 公司为解决纯软件虚拟化解决方案在可靠性、安全性和性能上的不足而引进的技术。它可以让一个 CPU 工作起来像多个 CPU 在并行运行，从而使得在一部电脑内同时运行多个操作系统成为可能</li><li><strong>AMD-V-(AMD Virtualization)</strong>，是 AMD 公司的虚拟化技术。它是对 x86 处理器系统架构的一组硬件扩展和硬件辅助虚拟化技术，可以简化纯软件的虚拟化解决方案，改进 VMM（虚拟机监视器）的设计，更充分地利用硬件资源，提高服务器和数据中心的虚拟化效率</li></ul><h4 id="软件虚拟化" tabindex="-1">软件虚拟化 <a class="header-anchor" href="#软件虚拟化" aria-label="Permalink to &quot;软件虚拟化&quot;">​</a></h4><p>软件虚拟化就是利用软件技术，在现有的物理平台上实现对物理平台访问的截获和模拟。在软件虚拟化技术中，有些技术不需要硬件支持，如：QEMU；而有些软件虚拟化技术，则依赖硬件支持，如：VMware、KVM。</p><p>对软件虚拟化进行细分，又可以分为以下几类：</p><ul><li><strong>完全虚拟化</strong>：（Full Virtualization）虚拟机模拟完整的底层硬件环境和特权指令的执行过程，使客户机操作系统可以独立运行。支持完全虚拟化的软件有：Parallels Workstation、VirtualBox、Virtual Iron、Oracle VM、Virtual PC、Virtual Server、Hyper-V、VMware Workstation、QEMU 等</li><li><strong>硬件辅助虚拟化</strong>：（Hardware-assisted Virtualization）是指通过硬件辅助支持模拟运行环境，使客户机操作系统可以独立运行，实现完全虚拟化的功能。支持硬件辅助虚拟化的软件有：Linux KVM、VMware Workstation、VMware Fusion、Virtual PC、Xen、VirtualBox、Parallels Workstation 等</li><li><strong>部分虚拟化</strong>：（Partial Virtualization）只针对部分硬件资源进行虚拟化，虚拟机模拟部分底层硬件环境，特别是地址空间。这样的环境支持资源共享和线程独立，但是不允许建立独立的客户机操作系统。</li><li><strong>平行虚拟化</strong>：（Para-Virtualization）虚拟机不需要模拟硬件，而是将部分硬件接口以软件的形式提供给客户机操作系统。如：早期的 Xen。</li><li><strong>操作系统层虚拟化</strong>：（OS-level virtualization）这种技术将操作系统内核虚拟化，可以允许使用者空间软件实例被分割成几个独立的单元，在内核中运行，而不是只有一个单一实例运行。这个软件实例，也被称为是一个容器（containers）、虚拟引擎（Virtualization engine）、虚拟专用服务器（virtual private servers）。每个容器的进程是独立的，对于使用者来说，就像是在使用自己的专用服务器。Docker 容器技术就是属于操作系统层虚拟化的范畴。</li></ul><h3 id="几种虚拟化技术" tabindex="-1">几种虚拟化技术 <a class="header-anchor" href="#几种虚拟化技术" aria-label="Permalink to &quot;几种虚拟化技术&quot;">​</a></h3><p>虚拟化是通过软件的方式模拟实体服务器，其初衷是为了解决“一种应用占用一台服务器”模式所带来的服务器数量剧增的问题，从而降低数据中心复杂度，简化管理难度。在虚拟化的发展过程中，出现过以下主要虚拟化技术或产品：</p><ul><li>Xen - 由剑桥大学开发的，一款开源的虚拟机监视器。采用 ICA 协议，它通过一种叫做准虚拟化的技术来获取高性能，甚至在一些与传统虚拟技术极度不友好的架构上（如：x86），Xen 也有极佳的表现。Xen 属于半虚拟化的技术，所以其性能损失非常小。Xen 没有指令翻译，其或者使用使能理解和翻译虚拟操作系统发出的未修改指令的 CPU（即：完全虚拟化）；或者修改操作系统，使它发出的指令最优化，便于在虚拟化环境中执行（即：准虚拟化）。</li><li><strong>KVM</strong> - <strong>KVM 是一个 Linux kernel 模块，可以使用 modprobe 来加载 KVM，加载后还需要通过其他工具创建虚拟机。KVM 是一个全虚拟化的解决方案，但需要 CPU 支持虚拟化功能。相比 Xen 来说，KVM 可以更加方便的整合进 Linux 内核，但它还需要其它虚拟化软件（如：QEMU）才能实现虚拟化功能</strong>。</li><li><strong>LXC</strong> - 即：<strong>Linux Container，Linux 容器，是一种轻量级的虚拟化的手段。它可以提供轻量级的虚拟化，以隔离进程和资源，而且不需要提供指令解释机制以及全虚拟化的其他复杂性。容器会有效地将由单个操作系统管理的资源划分到孤立的组中，以更好地在孤立的组之间平衡有冲突的资源使用需求。</strong></li><li><strong>OpenVZ</strong> - 是 SWsoft 公司开发的开源软件，是该公司 Virtuozzo 软件的基础产品，是基于 Linux 平台的操作系统级服务器虚拟化解决方案。通过 OpenVZ，可以在单个物理服务器上创建多个相互隔离的虚拟专用服务器 (VPS) 并以最大的效率共享硬件和管理资源。其上运行虚拟服务器被称为 VPS（Virtual Private Serve），每个 VPS 的运行环境和独立服务器完全一致。OpenVZ 基于 Linux 系统内核及作业系统提供操作系统级虚拟化，在虚拟化过程中资源消耗非常小，官方宣称约 1-2%。</li><li><strong>Hyper-V</strong> - <strong>是微软件推出的一种虚拟化技术，可以采用半虚拟化或全虚拟的方式创建虚拟机。虽然它可以创建 Windows 或 Linux 操作系统，但其本身只能运行在 Windows 系统下，使用范围较为有限</strong>。</li><li><strong>Oracle VM</strong> - Oracle 推出的服务器虚拟化软件，基于开源的 Xen 技术，包括 Oracle VM Server 和 Oracle VM Manager 两部分。</li><li><strong>VMWare</strong> - 是一家非常出名虚拟化软件公司，其产品涵盖服务器、桌面等各种虚拟化领域，如：<strong>VMware Workstation</strong> - 是一款桌面虚拟机软件，可以在一台实体机器上模拟完整的网络环境，并可运行多个 Windows、DOS、Linux 或 Mac 系统，是非常好的开发、测试、部署解决方案。从技术角度来说，VMware Workstation 是一款完全虚拟化产品，可借助硬件辅助在不修改用户操作系统的情况下完整虚拟化操作系统。</li><li><strong>VMware ESX Server</strong> - 是一款适用于任何系统环境的企业级的虚拟机软件，可以认为是 VMware Server 的升级版。相比 VMware Workstation 来说，其功能更加强大，可以用于构建高伸缩和高可靠企业级服务器，并可实现远程管理、高级资源管理控制等高级功能。</li></ul><h2 id="docker-与虚拟机的区别" tabindex="-1">Docker 与虚拟机的区别 <a class="header-anchor" href="#docker-与虚拟机的区别" aria-label="Permalink to &quot;Docker 与虚拟机的区别&quot;">​</a></h2><blockquote><p>虚拟机 Virtual Machine 与容器化技术（代表 Docker）都是虚拟化技术，两者的区别在于虚拟化的程度不同。</p></blockquote><h3 id="构造对比" tabindex="-1">构造对比 <a class="header-anchor" href="#构造对比" aria-label="Permalink to &quot;构造对比&quot;">​</a></h3><ul><li>虚拟机 <ul><li>基础设施（Infrastructure）。它可以是你的个人电脑，数据中心的服务器，或者是云主机。</li><li>主操作系统（Host Operating System）。你的个人电脑之上，运行的可能是 MacOS，Windows 或者某个 Linux 发行版。</li><li>虚拟机管理系统（Hypervisor）。利用 Hypervisor，可以在主操作系统之上运行多个不同的从操作系统。类型 1 的 Hypervisor 有支持 MacOS 的 HyperKit，支持 Windows 的 Hyper-V 以及支持 Linux 的 KVM。类型 2 的 Hypervisor 有 VirtualBox 和 VMWare。</li><li>操作系统（Guest Operating System）。假设你需要运行 3 个相互隔离的应用，则需要使用 Hypervisor 启动 3 个从操作系统，也就是 3 个虚拟机。这些虚拟机都非常大，也许有 700MB，这就意味着它们将占用 2.1GB 的磁盘空间。更糟糕的是，它们还会消耗很多 CPU 和内存。</li><li>各种依赖。每一个从操作系统都需要安装许多依赖。如果你的的应用需要连接 PostgreSQL 的话，则需要安装 libpq-dev；如果你使用 Ruby 的话，应该需要安装 gems；如果使用其他编程语言，比如 Python 或者 Node.js，都会需要安装对应的依赖库。</li></ul></li><li>Docker 容器 <ul><li>主操作系统（Host Operating System）。所有主流的 Linux 发行版都可以运行 Docker。对于 MacOS 和 Windows，也有一些办法&quot;运行&quot;Docker。</li><li>Docker 守护进程（Docker Daemon）。Docker 守护进程取代了 Hypervisor，它是运行在操作系统之上的后台进程，负责管理 Docker 容器。</li><li>各种依赖。对于 Docker，应用的所有依赖都打包在 Docker 镜像中，Docker 容器是基于 Docker 镜像创建的。</li><li>应用。应用的源代码与它的依赖都打包在 Docker 镜像中，不同的应用需要不同的 Docker 镜像。不同的应用运行在不同的 Docker 容器中，它们是相互隔离的。</li></ul></li></ul><p>虚拟机是在物理资源层面实现的隔离，相对于虚拟机，Docker 是你 APP 层面实现的隔离，并且省去了虚拟机操作系统（Guest OS）），从而节省了一部分的系统资源；Docker 守护进程可以直接与主操作系统进行通信，为各个 Docker 容器分配资源；它还可以将容器与主操作系统隔离，并将各个容器互相隔离。虚拟机启动需要数分钟，而 Docker 容器可以在数毫秒内启动。由于没有臃肿的从操作系统，Docker 可以节省大量的磁盘空间以及其他系统资源。</p><p>虚拟机与容器 docker 的区别，在于<strong>vm 多了一层 guest OS，虚拟机的 Hypervisor 会对硬件资源也进行虚拟化，而容器 Docker 会直接使用宿主机的硬件资源</strong>。</p><p>下面我们采用形象的比喻区分两者的<strong>隔离级别</strong>：</p><ul><li><strong>服务器</strong>：比作一个大型的仓管基地，包含场地与零散的货物——相当于各种服务器资源。</li><li><strong>虚拟机技术</strong>：比作仓库，拥有独立的空间堆放各种货物或集装箱，仓库之间完全独立——仓库相当于各种系统，独立的应用系统和操作系统。</li><li><strong>Docker</strong>：比作集装箱，操作各种货物的打包——将各种应用程序和他们所依赖的运行环境打包成标准的容器，容器之间隔离。</li></ul><h3 id="虚拟技术对比" tabindex="-1">虚拟技术对比 <a class="header-anchor" href="#虚拟技术对比" aria-label="Permalink to &quot;虚拟技术对比&quot;">​</a></h3><ul><li><strong>隔离性</strong></li></ul><p>在于隔离性上面，由于 vm 对操作系统也进行了虚拟化，隔离的更加彻底。而 Docker 共享宿主机的操作系统，隔离性较差。</p><ul><li><strong>运行效率</strong></li></ul><p>由于 vm 的隔离操作，导致生成虚拟机的速率大大低于容器 Docker 生成的速度，因为 Docker 直接利用宿主机的系统内核。比如 openstack 能够以 10 台/min 的速度创建虚拟机，而 docker 可以做到在几秒钟之内创建大量容器，它们的启动速度是在数量级上的差距。</p><p>因为虚拟机增加了一层虚拟硬件层，运行在虚拟机上的应用程序在进行数值计算时是运行在 Hypervisor 虚拟的 CPU 上的；另外一方面是由于计算程序本身的特性导致的差异。虚拟机虚拟的 cpu 架构不同于实际 cpu 架构，数值计算程序一般针对特定的 cpu 架构有一定的优化措施，虚拟化使这些措施作废，甚至起到反效果。</p><ul><li><strong>资源利用率</strong></li></ul><p>在资源利用率上虚拟机由于隔离更彻底，因此利用率也会相对较低。</p><p>因为虚拟机增加了一层虚拟硬件层，运行在虚拟机上的应用程序在进行数值计算时是运行在 Hypervisor 虚拟的 CPU 上的；另外一方面是由于计算程序本身的特性导致的差异。虚拟机虚拟的 cpu 架构不同于实际 cpu 架构，数值计算程序一般针对特定的 cpu 架构有一定的优化措施，虚拟化使这些措施作废，甚至起到反效果。比如对于本次实验的平台，实际的 CPU 架构是 2 块物理 CPU。</p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><p><a href="https://pdai.tech/md/devops/docker/docker-01-docker-vm.html" target="_blank" rel="noreferrer">Java 全栈知识体系-Docker 部分</a></p><p><a href="https://www.bilibili.com/video/BV1og4y1q7M4" target="_blank" rel="noreferrer">遇见狂神说</a></p><p><a href="https://blog.csdn.net/Mr_YanMingXin/article/details/119504925" target="_blank" rel="noreferrer">霸气小闫-Docker 快速入门总结笔记</a></p><p><a href="https://vuepress.mirror.docker-practice.com/" target="_blank" rel="noreferrer">Docker 从入门到实践</a></p>',45),l=[t];function n(s,c,p,u,d,k){return e(),o("div",null,l)}const D=r(a,[["render",n]]);export{g as __pageData,D as default};
