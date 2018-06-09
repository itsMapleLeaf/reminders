import { app, BrowserWindow } from "electron"
import { watch } from "fs"
import { resolve } from "path"

const devMode = process.argv.includes("--dev")

let win: BrowserWindow | null

app.on("ready", () => {
  win = new BrowserWindow()

  win.loadFile(resolve(__dirname, "../assets/index.html"))

  win.on("closed", () => {
    win = null
  })

  if (devMode) {
    win.webContents.openDevTools()

    const reloadWindow = win.webContents.reload.bind(win.webContents)

    watch(resolve(__dirname, "../assets"), reloadWindow)
    watch(resolve(__dirname, "./renderer"), reloadWindow)
  }
})
