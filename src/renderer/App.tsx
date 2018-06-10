import React from "react"
import { ReminderData } from "../ReminderData"
import { Reminder } from "./reminder/Reminder"
import { ReminderDeleteModal } from "./reminder/ReminderDeleteModal"
import { ReminderEditModal } from "./reminder/ReminderEditModal"
import { ReminderList, ReminderListSeparator } from "./reminder/ReminderList"
import { Title } from "./ui/Title"

interface AppState {
  reminders: ReminderData[]
  editingReminder?: ReminderData
  confirmDelete?: ReminderData
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
    const { reminders, editingReminder, confirmDelete } = this.state

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

        {confirmDelete && (
          <ReminderDeleteModal
            reminder={confirmDelete}
            onConfirm={this.deleteReminder}
            onCancel={this.closeConfirmDeleteModal}
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
      onDelete={this.handleDelete}
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

  private handleDelete = (reminder: ReminderData) => {
    this.setState({ confirmDelete: reminder })
  }

  private deleteReminder = (reminder: ReminderData) => {
    this.setState((state) => {
      return {
        reminders: state.reminders.filter((r) => r.id !== reminder.id),
      }
    })
    this.closeConfirmDeleteModal()
  }

  private closeConfirmDeleteModal = () => {
    this.setState({ confirmDelete: undefined })
  }
}
