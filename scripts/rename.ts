import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url)
// 获取当前模块所在目录的路径
const __dirname = path.dirname(__filename)

// 旧文件路径
const oldFilePath = path.resolve(__dirname, '../main/index.js')
// 新文件路径
const newFilePath = path.resolve(__dirname, '../main/index.cjs')

// 重命名文件
fs.move(oldFilePath, newFilePath)
  .then(() => console.log('File renamed successfully!'))
  .catch((error: any) => console.error('Error renaming file:', error))
