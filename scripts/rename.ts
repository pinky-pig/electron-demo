import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url)
// 获取当前模块所在目录的路径
const __dirname = path.dirname(__filename)

rename('index.cjs', 'index.js', '../main/')
rename('preload.cjs', 'preload.js', '../main/')

function rename(newName: string, oldName: string, folderPath: string) {
  // 重命名文件
  fs.move(
    path.resolve(__dirname, folderPath + oldName),
    path.resolve(__dirname, folderPath + newName),
  )
    .then(() => console.log('File renamed successfully!'))
    .catch((error: any) => console.error('Error renaming file:', error))
}
