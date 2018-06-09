import React from "react"
import { Reminder } from "./Reminder"
import { ReminderList } from "./ReminderList"
import { ReminderListSeparator } from "./ReminderListSeparator"
import { Title } from "./Title"

export class App extends React.Component {
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
