import React from 'react'

export default class FormContainer extends React.Component<Props> {
  render() {
    const { onSubmit, children } = this.props

    return (
      <form onSubmit={onSubmit} className={'form-container'}>
        {children}
      </form>
    )
  }
}

interface Props {
  onSubmit?: (event: React.MouseEvent<HTMLFormElement>) => void
  children: any
}
