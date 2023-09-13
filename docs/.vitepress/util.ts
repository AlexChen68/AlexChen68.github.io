import fs from 'fs'
import path from 'path'

interface options {
   extension: string
   excludeFiles: string[]
}

const rootPath = path.resolve(__dirname, '../')

export const autoGenerateSidebar = (directoryPath, options: options = {
   extension: '.md',
   excludeFiles: ['index', 'hello']
}) => {
   const fullPath = path.resolve(rootPath, directoryPath);
   let srcs = fs.readdirSync(fullPath)
   if (!srcs) {
      return []
   }
   let files = srcs.filter(item =>
      !(String(item) === '.DS_Store') && !options.excludeFiles.includes(path.basename(item, options.extension))
   )
   const currentSidebarItems = files.map(file => {
      if (String(file).endsWith(options.extension)) {
         // path.basename(file, options.extension) 可以去除文件后缀
         // .replace(/\\/gi, "/") 可以将 \ 变成 /
         // path.resolve 可以拼接目录路径 为 directoryPath/file
         return {
            text: path.basename(file, options.extension),
            link: path.join(directoryPath, path.basename(file, options.extension)).replace(/\\/gi, "/")
         }
      } else {
         // 目录需要递归调用，获取其下级侧边栏
         return {
            text: path.basename(file, options.extension),
            items: autoGenerateSidebar(path.join(directoryPath, file)),
            collapsible: true,
         }
      }
   })
   return currentSidebarItems
}
