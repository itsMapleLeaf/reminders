import { app, BrowserWindow } from "electron"
import { resolve } from "path"

let win: BrowserWindow | null

app.on("ready", () => {
  win = new BrowserWindow()

  win.loadFile(resolve(__dirname, "../assets/index.html"))

  win.webContents.openDevTools()

  win.on("closed", () => {
    win = null
  })
})
