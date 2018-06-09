import React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
import { applyGlobalStyles } from "./globalStyles"

applyGlobalStyles()
ReactDOM.render(<App />, document.getElementById("root"))
