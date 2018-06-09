import React from "react"
import { Reminder } from "./Reminder"
import { ReminderData } from "./ReminderData"
import { ReminderList } from "./ReminderList"
import { ReminderListSeparator } from "./ReminderListSeparator"
import { Title } from "./Title"

interface AppState {
  reminders: ReminderData[]
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    reminders: [
      { id: 1, text: "do the thing", active: true },
      { id: 2, text: "do the other thing", active: true },
      { id: 3, text: "do the best thing", active: true },
    ],
  }

  render() {
    const { reminders } = this.state

    const activeReminders = reminders
      .filter((r) => r.active)
      .map(this.renderReminder)

    const inactiveReminders = reminders
      .filter((r) => !r.active)
      .map(this.renderReminder)

    return (
      <>
        <Title>Reminders</Title>
        <ReminderList>
          {activeReminders}
          <ReminderListSeparator />
          {inactiveReminders}
        </ReminderList>
      </>
    )
  }

  private renderReminder = (reminder: ReminderData) => (
    <Reminder
      key={reminder.id}
      reminder={reminder}
      onMarkSeen={this.markReminderSeen}
    />
  )

  private markReminderSeen = (reminder: ReminderData) => {
    this.setState((state) => {
      const reminders = state.reminders.map((other) => {
        return other === reminder ? { ...other, active: false } : other
      })
      return { reminders }
    })
  }
}
