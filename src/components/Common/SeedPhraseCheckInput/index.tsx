import React from 'react'
import styled from 'styled-components'
class SeedPhraseCheckInputContainer extends React.Component<Props, State> {
  state: State = {
    error: false,
    value: '',
  }

  render() {
    const { value } = this.state
    return (
      <SeedPhraseInput
        type={'text'}
        className={this.state.error ? 'invalid' : 'valid'}
        value={value}
        onChange={this.onChangeValue}
      />
    )
  }

  private onChangeValue = e => {
    this.setState({ value: e.currentTarget.value }, () => {
      if (this.props.seedWord !== this.state.value) {
        this.setState({ error: true }, () => {
          this.props.onCheckSeedWord(this.props.idx, false)
        })
        return
      }
      this.setState({ error: false }, () => {
        this.props.onCheckSeedWord(this.props.idx, true)
      })
    })
  }
}

interface State {
  error: boolean
  value: string
}

interface Props {
  idx: number
  seedWord: string
  onCheckSeedWord: (idx: number, checkingValue: boolean) => void
}

export default SeedPhraseCheckInputContainer

const SeedPhraseInput = styled.input`
  background: #191436;
  border: 1px solid #9c62e7;
  border-radius: 50px;
  color: #fff;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  &:focus {
    outline: 0;
    &.invalid {
      border-color: #d7484d;
    }
    &.valid {
      border-color: #22ae7f;
    }
  }
`
