import { lighten, saturate } from "polished"
import React from "react"
import styled from "react-emotion"
import { dangerColor } from "./colors"

const Label = styled("label")`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 16px;
`

const TextInput = styled("input")`
  display: block;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.3rem 0.6rem;
  width: 100%;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.6);
    outline: none;
  }
`

const ErrorText = styled("div")`
  margin-top: 0.3rem;
  color: ${lighten(0.05, saturate(0.2, dangerColor))};
  font-size: 16px;
`

export interface TextFieldProps {
  label?: string
  placeholder?: string
  value?: string
  autoFocus?: boolean
  error?: string
  onChange?: (text: string) => void
  onBlur?: () => void
}

export class TextField extends React.Component<TextFieldProps> {
  render() {
    const { label, onChange, error, ...inputProps } = this.props
    return (
      <>
        {label && <Label>{label}</Label>}
        <TextInput {...inputProps} type="text" onChange={this.handleChange} />
        {error && <ErrorText>{error}</ErrorText>}
      </>
    )
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(event.currentTarget.value)
    }
  }
}
