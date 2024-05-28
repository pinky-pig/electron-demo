// Native
import { join } from 'node:path'

// Packages
import {
  BrowserWindow,
  type IpcMainEvent,
  app,
  ipcMain,
  screen,
} from 'electron'
import isDev from 'electron-is-dev'

// electron 准备好后调用的，初始化创建窗口
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // macOS 点击 dock 的图标可能回重新创建窗口，这里判断一下
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 窗口关闭的时候退出。但是 macOS 除外，macOS 默认行为是保持程序运行，直到用户使用 Cmd + Q 显式退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 监听
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
})

/**
 * 创建窗口
 */
function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  /****************/
  /*    窗口配置   */
  /****************/
  const winCfg = {
    // icon: GlobalConfig.APP_LOGO, // 图标
    // title: GlobalConfig.getAppTitle(), // 如果由 loadURL() 加载的 HTML 文件中含有标签 <title>，此属性将被忽略
    width: width * 0.3,
    height: height * 0.9,
    show: false, // 是否在创建时显示, 默认值为 true
    frame: false, // 是否有边框
    center: true, // 是否在屏幕居中
    hasShadow: true, // 窗口是否有阴影. 默认值为 true
    resizable: true, // 是否允许拉伸大小
    fullscreenable: true, // 是否允许全屏，为 false 则插件 screenfull 不起作用
    autoHideMenuBar: true, // 自动隐藏菜单栏, 除非按了 Alt 键, 默认值为 false
    backgroundColor: '#fff', // 背景颜色
    titleBarStyle: 'hidden', // 隐藏原有的标题样式
    trafficLightPosition: { x: 20, y: 20 }, // mac下窗口操作按钮
    webPreferences: {
      preload: join(__dirname, 'preload.js'), // 预加载脚本
      spellcheck: false, // 禁用拼写检查器
      disableBlinkFeatures: 'SourceMap', // 以 "," 分隔的禁用特性列表
      devTools: true, // 是否开启 DevTools, 如果设置为 false（默认值为 true）, 则无法使用 BrowserWindow.webContents.openDevTools()
      webSecurity: false, // 当设置为 false, 将禁用同源策略
      nodeIntegration: true, // 是否启用 Node 集成
      contextIsolation: true, // 是否在独立 JavaScript 环境中运行 Electron API 和指定的 preload 脚本，默认为 true
      preload: path.join(__dirname, '../preload/index.js'), // 需要引用js文件
      backgroundThrottling: false, // 是否在页面成为背景时限制动画和计时器，默认值为 true
      nodeIntegrationInWorker: true, // 是否在 Web 工作器中启用了 Node 集成
      webviewTag: true, // 是否开启webview
    },
  }

  // 创建窗口
  const window = new BrowserWindow(winCfg)

  const port = process.env.PORT || 3000
  const url = isDev
    ? `http://localhost:${port}`
    : join(__dirname, '../src/out/index.html')

  // 加载 HTML 入口文件
  if (isDev) {
    window?.loadURL(url)
  } else {
    window?.loadFile(url)
  }

  // 打开控制台
  // window.webContents.openDevTools();

  // 顶部状态栏
  ipcMain.on('minimize', () => {
    window.isMinimized() ? window.restore() : window.minimize()
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  })
  ipcMain.on('maximize', () => {
    window.isMaximized() ? window.restore() : window.maximize()
  })

  ipcMain.on('close', () => {
    window.close()
  })
}
