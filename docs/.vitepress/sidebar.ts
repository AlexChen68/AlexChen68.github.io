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
      rootGroupLink: path + '/',
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
      ...groupSidebar('/database/elasticsearch', "Elasticsearch")
   ],
   '/architecture/': [
      ...groupSidebar('/architecture/micro-service', "微服务"),
      ...groupSidebar('/architecture/distributed', "分布式"),
      ...groupSidebar('/architecture/bigdata', "大数据")
   ],
   '/devops/': [
      ...groupSidebar('/devops/tool', "开发工具"),
      ...groupSidebar('/devops/test', "测试工具"),
      ...groupSidebar('/devops/network', "网络")
   ],
   '/deploy/': [
      ...groupSidebar('/deploy/standalone', "单体部署"),
      ...groupSidebar('/deploy/cluster', "集群部署"),
      ...groupSidebar('/deploy/docker', "Docker")
   ],
   '/frontend/': [
      ...groupSidebar('/frontend/basic', "Html Js Css"),
      ...groupSidebar('/frontend/es6', "ECMAScript 6"),
      ...groupSidebar('/frontend/node', "Node.js")
   ],
   '/advance/': [
      ...groupSidebar('/advance/ds', "数据结构"),
      ...groupSidebar('/advance/algo', "基础算法"),
      ...groupSidebar('/advance/design', "设计模式")
   ],
   '/resource/': [
      ...groupSidebar('/resource', "")
   ],
}

export default sidebar