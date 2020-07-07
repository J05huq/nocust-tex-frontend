import Button from '../../../ui/Button'
import React from 'react'
import logo from '../../../assets/images/logo.png'

export class TutorialScreenContainer extends React.Component<Props, State> {
  state: State = {
    step: 0,
  }

  render() {
    const { step } = this.state
    return (
      <div className={'introduction-content'}>
        {this.renderStep()}
        <div className={'button-group'}>
          {step !== 0 ? (
            <Button
              title={this.getPrevTitle()}
              onClick={this.setPrevState}
              disabled={this.state.step === 0}
            />
          ) : (
            ''
          )}
          <Button title={this.getNextTitle()} onClick={this.setNextState} />
        </div>
      </div>
    )
  }

  private renderStep = () => {
    const { step } = this.state

    const stepContent = [
      {
        picture: logo,
        text: (
          <p>
            TEX is a trustless exchange operating on the Ethereum Blockchain. Clicking on "Continue"
            means you agree to{' '}
            <a href={'https://liquidity.network'}>Liquidity Network Privacy Notice</a>
          </p>
        ),
      },
      {
        picture: logo,
        text: <p>From the wallet area, create a new wallet or connect one of yours to TEX.</p>,
      },
      {
        picture: logo,
        text: <p>Funds your wallet with ETH. This will unlock deposit of ETH and ERC20s.</p>,
      },
      {
        picture: logo,
        text: (
          <p>
            Deposit ETH on your TEX account using Deposit tab. It will bring them on TEX ecosystem
            ready for trade.
          </p>
        ),
      },
      {
        picture: logo,
        text: (
          <p>
            You're ready to trade{' '}
            <span role="img" aria-label="smile">
              😃
            </span>
          </p>
        ),
      },
    ]

    const content = stepContent[step]
    if (typeof content === 'undefined') {
      return ''
    }
    return (
      <div className={'introduction-centered-div'}>
        {content.picture ? (
          <div className={'introduction-picture'}>
            <img alt="introduction" src={content.picture} />
          </div>
        ) : (
          ''
        )}
        {content.text}
      </div>
    )
  }

  private getPrevTitle = () => {
    return 'introduction_modal_previous_step_title'
  }

  private getNextTitle = () => {
    const { step } = this.state

    const stepTitles = [
      'introduction_modal_continue_title',
      'introduction_modal_next_step_title',
      'introduction_modal_start_trading_title',
    ]
    const index = step !== 0 ? (step === 4 ? 2 : 1) : 0
    return stepTitles[index]
  }

  private setPrevState = () => {
    const { step } = this.state
    if (step === 0) {
      this.props.closeModal()
    }
    this.setState({
      step: step - 1,
    })
  }

  private setNextState = () => {
    const { step } = this.state
    if (step === 4) {
      this.props.closeModal()
    }
    this.setState({
      step: step + 1,
    })
  }
}

export interface Props {
  closeModal: () => void
}

interface State {
  step: number
}
