import { css, injectGlobal } from "react-emotion"
import { textColor, themeColor } from "./colors"

// using a separate css declaration so prettier can format it
const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    background-color: ${themeColor};
    color: ${textColor};
    font: 18px Roboto, sans-serif;
    cursor: default;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 300;
  }
`

export function applyGlobalStyles() {
  injectGlobal`
    ${globalStyles};
  `
}
