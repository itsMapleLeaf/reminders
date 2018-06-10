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
            onClose={this.hideEditModal}
            onSubmit={this.handleEditSubmit}
          />
        )}

        {confirmDelete && (
          <ReminderDeleteModal
            reminder={confirmDelete}
            onCancel={this.hideConfirmDeleteModal}
            onConfirm={this.handleConfirmDelete}
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
      onEdit={this.showEditModal}
      onDelete={this.showConfirmDeleteModal}
    />
  )

  private handleConfirmDelete = (reminder: ReminderData) => {
    this.deleteReminder(reminder)
    this.hideConfirmDeleteModal()
  }

  private handleEditSubmit = (reminder: ReminderData) => {
    this.updateReminder(reminder)
    this.hideEditModal()
  }

  private deleteReminder = (reminder: ReminderData) => {
    this.setState((state) => {
      return {
        reminders: state.reminders.filter((r) => r.id !== reminder.id),
      }
    })
  }

  private markReminderSeen = (reminder: ReminderData) => {
    this.setState((state) => {
      const reminders = state.reminders.map((other) => {
        return other === reminder ? { ...other, active: false } : other
      })
      return { reminders }
    })
  }

  private updateReminder = (reminder: ReminderData) => {
    this.setState((state) => {
      const reminders = state.reminders.map((other) => {
        return other.id === reminder.id ? reminder : other
      })
      return { reminders }
    })
  }

  private showEditModal = (reminder: ReminderData) => {
    this.setState({ editingReminder: reminder })
  }

  private hideEditModal = () => {
    this.setState({ editingReminder: undefined })
  }

  private showConfirmDeleteModal = (reminder: ReminderData) => {
    this.setState({ confirmDelete: reminder })
  }

  private hideConfirmDeleteModal = () => {
    this.setState({ confirmDelete: undefined })
  }
}
