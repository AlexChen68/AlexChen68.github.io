import { generateSidebar } from 'vitepress-sidebar';

// https://github.com/jooy2/vitepress-sidebar
const withDefaultOption = (path: string, text: string, excludeFolders?: string[], excludeFiles?: string[]) => {
  return {
    // doc 文件夹根路径
    documentRootPath: '/docs',
    // 对应请求路径前缀，需要以 / 结尾
    scanStartPath: path,
    resolvePath: path,
    rootGroupText: text,
    collapseDepth: 2,
    useTitleFromFileHeading: false,
    useTitleFromFrontmatter: true,
    sortMenusByFrontmatterOrder: true,
    usefoldertitlefromindexfile: true,
    useIndexFileForFolderMenuInfo: true,
    withIndex: false,
    excludeFolders,
    excludeFiles
  }
}

export const sidebar = generateSidebar([
  withDefaultOption('/advance/', '编程内功', ['LeetCode']),
  withDefaultOption('/java/', 'Java 核心'),
  withDefaultOption('/spring/', 'Spring 核心'),
  withDefaultOption('/database/', '数据库'),
  withDefaultOption('/devops/', 'Devops'),
  withDefaultOption('/distributed/', '分布式'),
  withDefaultOption('/bigdata/', '大数据'),
  withDefaultOption('/frontend/', '前端技术'),
  withDefaultOption('/resource/', '编程资源'),
])


