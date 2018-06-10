import React from "react"
import styled from "react-emotion"
import { ReminderData } from "../../ReminderData"
import { Button } from "../ui/Button"
import { Intent } from "../ui/Intent"
import { Modal } from "../ui/Modal"

const ModalBodySection = styled("p")`
  margin: 0.5rem;
`

export interface ReminderDeleteModalProps {
  reminder: ReminderData
  onConfirm: (reminder: ReminderData) => void
  onCancel: () => void
}

export class ReminderDeleteModal extends React.Component<
  ReminderDeleteModalProps
> {
  render() {
    const { reminder, onConfirm, onCancel } = this.props

    return (
      <Modal onShadeClick={onCancel}>
        <ModalBodySection>
          Are you sure you want to delete "{reminder.text}"?
        </ModalBodySection>
        <ModalBodySection>
          <Button intent={Intent.danger} onClick={this.confirm}>
            Delete
          </Button>{" "}
          <Button autoFocus onClick={onCancel}>
            Cancel
          </Button>
        </ModalBodySection>
      </Modal>
    )
  }

  private confirm = () => {
    this.props.onConfirm(this.props.reminder)
  }
}
