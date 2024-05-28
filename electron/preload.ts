import { contextBridge, ipcRenderer } from 'electron'

declare global {
  interface Window {
    Main: typeof api
    ipcRenderer: typeof ipcRenderer
  }
}

const api = {
  /**
   * 定义一些方法，让渲染进程可以调用 `window.Main.sayHello`
   */
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  /**
   * 软件状态栏的调用函数
   */
  Minimize: () => {
    ipcRenderer.send('minimize')
  },
  Maximize: () => {
    ipcRenderer.send('maximize')
  },
  Close: () => {
    ipcRenderer.send('close')
  },

  /**
   * 提供一个简单的监听回掉函数
   */
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
}
contextBridge.exposeInMainWorld('Main', api)

/**
 * 直接在浏览器中使用ipcRenderer并不真正安全。
 * 所以最好使用 Main/api 的方式 !!
 */
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)
