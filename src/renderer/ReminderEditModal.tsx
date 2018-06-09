import React from "react"
import styled from "react-emotion"
import { Button } from "./Button"
import { themeColor } from "./colors"
import { Intent } from "./Intent"
import { ReminderData } from "./ReminderData"
import { TextField } from "./TextField"
import { Title } from "./Title"

const Shade = styled("div")`
  background: rgba(0, 0, 0, 0.5);

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;

  > * {
    margin: auto;
  }
`

const Panel = styled("div")`
  background: ${themeColor};
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.5);

  width: 20rem;
  max-width: calc(100vw - 4rem);
`

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
  errors: Partial<FormValues>
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
      <Shade onClick={this.close}>
        <Panel>
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
              <Button type="button" onClick={this.close}>
                Cancel
              </Button>
            </fieldset>
          </Form>
        </Panel>
      </Shade>
    )
  }

  private updateText = (text: string) => {
    this.setState({ values: { ...this.state.values, text } })
    this.validate()
  }

  private validate = () => {
    this.setState((state) => {
      const errors: Partial<FormValues> = {}

      if (state.values.text.trim() === "") {
        errors.text = "Please enter a value"
      }

      return { errors }
    })
  }

  private get isValid() {
    return Object.values(this.state.errors).length === 0
  }

  private submit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    this.validate()

    if (this.isValid) {
      this.props.onSubmit({ ...this.props.reminder, ...this.state.values })
    }
  }

  private close = (event: React.SyntheticEvent) => {
    if (event.target === event.currentTarget) {
      this.props.onClose()
    }
  }
}
