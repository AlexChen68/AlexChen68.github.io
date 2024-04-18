import { generateSidebar } from 'vitepress-sidebar';

/**
 * https://github.com/jooy2/vitepress-sidebar
 * 
 * documentRootPath：doc 文件夹根路径
 * scanStartPath：文件夹相对 documentRootPath 的路径
 * resolvePath: 对应请求路径前缀
 */
function groupSidebar(path: string, text: string, options?: any) {
   const sidebar = generateSidebar({
      documentRootPath: '/docs',   
      scanStartPath: path,         
      resolvePath: path,
      rootGroupText: text,
      useTitleFromFrontmatter: true,
      useIndexFileForFolderMenuInfo: true,
      sortMenusByFrontmatterOrder: true,
      ...options
    })[path]
   return sidebar;
}

const sidebar = {
   '/java/': [
      ...groupSidebar('/java/basic', "Java 基础"),
      ...groupSidebar('/java/collection', "Java 集合"),
      ...groupSidebar('/java/concurrency', "Java 并发"),
      ...groupSidebar('/java/jvm', "JVM")
   ],
   '/spring/': [
      ...groupSidebar('/spring/spring', "Spring"),
      ...groupSidebar('/spring/springboot', "Springboot"),
      ...groupSidebar('/spring/springcloud', "Springcloud"),
      ...groupSidebar('/spring/springsecurity', "Springsecurity")
   ],
   '/database/': [
      ...groupSidebar('/database/mysql', "Mysql"),
      ...groupSidebar('/database/redis', "Redis"),
      ...groupSidebar('/database/elasticsearch', "Elasticsearch"),
      ...groupSidebar('/database/dm', "达梦数据库"),
   ],
   '/architecture/': [
      ...groupSidebar('/architecture/micro-service', "微服务"),
      ...groupSidebar('/architecture/distributed', "分布式"),
      ...groupSidebar('/architecture/bigdata', "大数据")
   ],
   '/devops/': [
      ...groupSidebar('/devops/deploy', "部署工具"),
      ...groupSidebar('/devops/docker', "Docker 容器"),
      ...groupSidebar('/devops/os', "操作系统"),
      ...groupSidebar('/devops/code', "开发工具"),
      ...groupSidebar('/devops/build', "构建工具"),
      ...groupSidebar('/devops/test', "测试工具"),
      ...groupSidebar('/devops/doc', "文档工具"),
   ],
   'business': [
      ...groupSidebar('/business', "业务", {rootGroupText: false}),
   ],
   '/frontend/': [
      ...groupSidebar('/frontend/basic', "基础"),
      ...groupSidebar('/frontend/es6', "ECMAScript 6"),
      ...groupSidebar('/frontend/node', "Node.js")
   ],
   '/advance/': [
      ...groupSidebar('/advance/ds', "数据结构"),
      ...groupSidebar('/advance/algo', "基础算法"),
      ...groupSidebar('/advance/design', "设计模式")
   ]
}

export default sidebar