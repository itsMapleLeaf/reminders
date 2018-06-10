import React from "react"
import styled from "react-emotion"
import { ReminderData } from "../../ReminderData"
import { Button } from "../ui/Button"
import { Intent } from "../ui/Intent"
import { Modal } from "../ui/Modal"
import { TextField } from "../ui/TextField"
import { Title } from "../ui/Title"

const Form = styled("form")`
  padding: 0.5rem;

  > :not(:first-child) {
    margin-top: 0.8rem;
  }
`

export interface ReminderEditModalProps {
  reminder: ReminderData
  onSubmit: (newData: ReminderData) => void
  onClose: () => void
}

interface FormValues {
  text: string
}

interface ReminderEditModalState {
  values: FormValues
  errors: { [K in keyof FormValues]?: string }
}

export class ReminderEditModal extends React.Component<
  ReminderEditModalProps,
  ReminderEditModalState
> {
  state: ReminderEditModalState = {
    values: { text: this.props.reminder.text },
    errors: {},
  }

  render() {
    return (
      <Modal>
        <Title>Edit Reminder</Title>

        <Form onSubmit={this.submit}>
          <fieldset>
            <TextField
              label="What should I remind you about?"
              placeholder="do the thing lol"
              value={this.state.values.text}
              onChange={this.updateText}
              error={this.state.errors.text}
              autoFocus
            />
          </fieldset>

          <fieldset>
            <Button type="submit" intent={Intent.success}>
              Create
            </Button>{" "}
            <Button type="button" onClick={this.props.onClose}>
              Cancel
            </Button>
          </fieldset>
        </Form>
      </Modal>
    )
  }

  private updateText = (text: string) => {
    this.setState({ values: { ...this.state.values, text } })
    this.validate()
  }

  private validate = () => {
    return new Promise((resolve) => {
      this.setState((state) => {
        const errors: Partial<FormValues> = {}

        if (state.values.text.trim() === "") {
          errors.text = "Please enter a value"
        }

        return { errors }
      }, resolve)
    })
  }

  private get isValid() {
    return Object.values(this.state.errors).length === 0
  }

  private submit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    await this.validate()

    if (this.isValid) {
      this.props.onSubmit({ ...this.props.reminder, ...this.state.values })
    }
  }
}
