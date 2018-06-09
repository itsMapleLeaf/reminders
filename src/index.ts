import { app, BrowserWindow, Menu, screen, Tray } from "electron"
import { watch } from "fs"
import { resolve } from "path"

const devMode = process.argv.includes("--dev")

function createWindow() {
  const windowWidth = 600
  const windowHeight = 400
  const displayBounds = screen.getPrimaryDisplay().workArea

  const win = new BrowserWindow({
    frame: false,
    width: windowWidth,
    height: windowHeight,
    x: displayBounds.width - windowWidth - 10,
    y: displayBounds.height - windowHeight - 10,
  })

  win.loadFile(resolve(__dirname, "../assets/index.html"))

  win.on("blur", () => {
    win.hide()
  })

  return win
}

function createTray(win: BrowserWindow) {
  const menu = Menu.buildFromTemplate([
    { label: "Show", click: () => win.show() },
    { role: "quit" },
  ])

  const tray = new Tray(resolve(__dirname, "../assets/icon.png"))
  tray.on("click", () => win.show())
  tray.setContextMenu(menu)
  return tray
}

function initDevMode(win: BrowserWindow) {
  win.webContents.openDevTools()
  const reloadWindow = win.webContents.reload.bind(win.webContents)
  watch(resolve(__dirname, "../assets"), reloadWindow)
  watch(resolve(__dirname, "./renderer"), reloadWindow)
}

function ready() {
  const win = createWindow()

  createTray(win)

  if (devMode) {
    initDevMode(win)
  }
}

app.on("ready", ready)
