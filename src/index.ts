import { app, BrowserWindow, screen, Tray } from "electron"
import { watch } from "fs"
import { resolve } from "path"

const devMode = process.argv.includes("--dev")

let win: BrowserWindow | null
let tray: Tray | null

app.on("ready", () => {
  const windowWidth = 600
  const windowHeight = 400
  const displayBounds = screen.getPrimaryDisplay().workArea

  win = new BrowserWindow({
    frame: false,
    width: windowWidth,
    height: windowHeight,
    x: displayBounds.width - windowWidth - 10,
    y: displayBounds.height - windowHeight - 10,
  })

  win.loadFile(resolve(__dirname, "../assets/index.html"))

  win.on("closed", () => {
    win = null
  })

  win.on("blur", () => {
    if (win) win.hide()
  })

  tray = new Tray(resolve(__dirname, "../assets/icon.png"))

  tray.on("click", () => win && win.show())

  if (devMode) {
    win.webContents.openDevTools()

    const reloadWindow = win.webContents.reload.bind(win.webContents)

    watch(resolve(__dirname, "../assets"), reloadWindow)
    watch(resolve(__dirname, "./renderer"), reloadWindow)
  }
})
