import { lighten } from "polished"
import React from "react"
import styled, { css } from "react-emotion"
import { themeColor } from "./colors"
import { ReminderData } from "./ReminderData"

const resolveReminderActiveStyle = ({ active }: { active?: boolean }) =>
  active && reminderActiveStyle

const reminderActiveStyle = css`
  opacity: 1;
`

const ReminderListItem = styled("li")`
  background: ${lighten(0.1, themeColor)};

  opacity: 0.7;

  display: flex;
  align-items: center;

  > * {
    padding: 0.5rem;
  }

  > :nth-child(1) {
    flex-grow: 1;
  }

  ${resolveReminderActiveStyle};
`

const ReminderAction = styled("button")`
  display: inline-block;

  > i {
    transition: 0.2s;
    opacity: 0.5;
  }

  &:hover > i {
    opacity: 1;
  }
`

export interface ReminderProps {
  reminder: ReminderData
  onMarkSeen: (reminder: ReminderData) => void
  onRemove?: (reminder: ReminderData) => void
  onEdit: (reminder: ReminderData) => void
}

export class Reminder extends React.Component<ReminderProps> {
  render() {
    const { active, text } = this.props.reminder

    const content = active ? (
      <ReminderAction onClick={this.markSeen}>
        <i className="material-icons">done</i> {text}
      </ReminderAction>
    ) : (
      <span>{text}</span>
    )

    return (
      <ReminderListItem active={active}>
        {content}
        <ReminderAction onClick={this.edit}>
          <i className="material-icons">edit</i>
        </ReminderAction>
      </ReminderListItem>
    )
  }

  private markSeen = () => {
    this.props.onMarkSeen(this.props.reminder)
  }

  private edit = () => {
    this.props.onEdit(this.props.reminder)
  }
}
