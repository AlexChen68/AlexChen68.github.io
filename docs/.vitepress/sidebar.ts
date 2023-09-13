import { generateSidebar } from 'vitepress-sidebar';

export const sidebar = generateSidebar([
   {
      documentRootPath: '/docs',
      resolvePath: '/advance/',
      scanStartPath: 'advance',
      rootGroupLink: '/advance/',
      rootGroupText: '编程内功',
      useTitleFromFrontmatter: true,
      useIndexFileForFolderMenuInfo: true,
      excludeFolders: ['LeetCode']
   },
   {
      documentRootPath: '/docs',
      resolvePath: '/java/',
      scanStartPath: 'java',
      rootGroupLink: '/java/',
      rootGroupText: 'Java 核心',
      useTitleFromFrontmatter: true,
      useIndexFileForFolderMenuInfo: true
   },
   {
      documentRootPath: '/docs',
      resolvePath: '/spring/',
      scanStartPath: 'spring',
      rootGroupLink: '/spring/',
      rootGroupText: 'Spring',
      useTitleFromFrontmatter: true,
      useIndexFileForFolderMenuInfo: true
   },
   {
      documentRootPath: '/docs',
      resolvePath: '/database/',
      scanStartPath: 'database',
      rootGroupLink: '/database/',
      rootGroupText: '数据库',
      useTitleFromFrontmatter: true,
      useIndexFileForFolderMenuInfo: true
   },
   {
      documentRootPath: '/docs',
      resolvePath: '/devops/',
      scanStartPath: 'devops',
      rootGroupLink: '/devops/',
      rootGroupText: 'Devops',
      useTitleFromFrontmatter: true,
      useIndexFileForFolderMenuInfo: true
   },
   {
      documentRootPath: '/docs',
      resolvePath: '/distributed/',
      scanStartPath: 'distributed',
      rootGroupLink: '/distributed/',
      rootGroupText: '分布式',
      useTitleFromFrontmatter: true,
      useIndexFileForFolderMenuInfo: true
   },
   {
      documentRootPath: '/docs',
      resolvePath: '/frontend/',
      scanStartPath: 'frontend',
      rootGroupLink: '/frontend/',
      rootGroupText: '前端技术',
      useTitleFromFrontmatter: true,
      useIndexFileForFolderMenuInfo: true
   },
   {
      documentRootPath: '/docs',
      resolvePath: '/resource/',
      scanStartPath: 'resource',
      rootGroupLink: '/resource/',
      rootGroupText: '编程资源',
      useTitleFromFrontmatter: true,
      useIndexFileForFolderMenuInfo: true
   }
])


