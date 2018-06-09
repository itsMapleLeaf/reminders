import { lighten } from "polished"
import React from "react"
import ReactDOM from "react-dom"
import styled, { css, injectGlobal } from "react-emotion"

const themeColor = "rgb(44, 62, 80)"
const textColor = "rgb(236, 240, 241)"
const successColor = "rgb(46, 204, 113)"

injectGlobal`
  *, *::before, *::after {
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

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 300;
  }
`

const Title = styled("h1")`
  padding: 0.5rem 0.5rem 0;
`

const ReminderList = styled("ul")`
  padding: 0.5rem;

  > *:not(:first-child) {
    margin-top: 0.5rem;
  }
`

const ReminderListSeparator = styled("li")`
  height: 0;
  border: none;
  border-bottom: 1px solid ${lighten(0.05, themeColor)};
`

const resolveReminderActiveStyle = ({ active }: { active?: boolean }) =>
  active && reminderActiveStyle

const Reminder = styled("li")`
  background: ${lighten(0.1, themeColor)};
  padding: 0.5rem;

  opacity: 0.7;

  ${resolveReminderActiveStyle};
`

const reminderActiveStyle = css`
  opacity: 1;
`

class App extends React.Component {
  render() {
    return (
      <>
        <Title>Reminders</Title>
        <ReminderList>
          <Reminder active>do the thing</Reminder>
          <ReminderListSeparator />
          <Reminder>do the thing</Reminder>
          <Reminder>do the thing</Reminder>
        </ReminderList>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
