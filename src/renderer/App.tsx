import React from "react"
import { Reminder } from "./Reminder"
import { ReminderData } from "./ReminderData"
import { ReminderEditModal } from "./ReminderEditModal"
import { ReminderList } from "./ReminderList"
import { ReminderListSeparator } from "./ReminderListSeparator"
import { Title } from "./Title"

interface AppState {
  reminders: ReminderData[]
  editingReminder?: ReminderData
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    reminders: [
      { id: 1, text: "do the thing", active: true },
      { id: 2, text: "do the other thing", active: true },
      { id: 3, text: "do the best thing", active: true },
    ],
    editingReminder: { id: 1, text: "do the thing", active: true },
  }

  render() {
    const { reminders, editingReminder } = this.state

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

        {editingReminder && (
          <ReminderEditModal
            reminder={editingReminder}
            onClose={this.handleEditModalClose}
            onSubmit={this.handleEditSubmit}
          />
        )}
      </>
    )
  }

  private renderReminder = (reminder: ReminderData) => (
    <Reminder
      key={reminder.id}
      reminder={reminder}
      onMarkSeen={this.markReminderSeen}
      onEdit={this.handleEdit}
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

  private handleEdit = (reminder: ReminderData) => {
    this.setState({ editingReminder: reminder })
  }

  private handleEditModalClose = () => {
    this.setState({ editingReminder: undefined })
  }

  private handleEditSubmit = (reminder: ReminderData) => {
    this.setState((state) => {
      const reminders = state.reminders.map((other) => {
        return other.id === reminder.id ? reminder : other
      })
      return { reminders, editingReminder: undefined }
    })
  }
}
