import { generateSidebar } from 'vitepress-sidebar';

const withDefaultOption = (path: string, text: string) => {
   return {
      // doc 文件夹根路径
      documentRootPath: '/docs',
      // 对应请求路径前缀，需要以 / 结尾
      resolvePath: path,
      scanStartPath: path,
      rootGroupLink: path,
      rootGroupText: text,
      useTitleFromFrontmatter: true,
      sortMenusByFrontmatterOrder: true,
      useIndexFileForFolderMenuInfo: true
   }
}

export const sidebar = generateSidebar([
   {
      ...withDefaultOption('/advance/', '编程内功'),
      excludeFolders: ['LeetCode']
   },
   withDefaultOption('/java/', 'Java 核心'),
   withDefaultOption('/spring/', 'Spring 核心'),
   withDefaultOption('/database/', '数据库'),
   withDefaultOption('/devops/', 'Devops'),
   withDefaultOption('/distributed/', '分布式'),
   withDefaultOption('/frontend/', '前端技术'),
   withDefaultOption('/resource/', '编程资源'),
])


