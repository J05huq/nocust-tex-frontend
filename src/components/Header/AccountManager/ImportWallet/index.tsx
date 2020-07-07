import React from 'react'
import ReactPasswordStrength from 'react-password-strength'
import styled, { css } from 'styled-components'
import Button from '../../../../ui/Button'
import { ErrorMsg } from '../../../../globalStyles'
import zxcvbn from 'zxcvbn'
import { Trans } from 'react-i18next'
import { connect } from 'react-redux'
import { AppState } from '../../../../state'
import {
  HeaderState,
  changeSelectedAccountType,
  changeSeedPhrase,
  getHeaderTokensList,
} from '../../../../state/header'
import { HubStateType } from '../../../../state/hub'
import { WalletState, importWallet } from '../../../../state/wallet'
import { ModalState, toggleImportAccountModal } from '../../../../state/modal'

class ImportWalletContainer extends React.Component<Props & { dispatch }, State> {
  state: State = {
    step: 0,
    passLength: 0,
    passScore: 0,
    mainPass: '',
    confirmPass: '',
    isValid: false,
    checkPass: false,
    comparePass: false,
    suggestions: [],
  }

  render() {
    return (
      <div className={'import-wallet-relation-content'}>
        {this.renderSteps()}
        <BtnGroup>
          <Button
            title={
              this.state.step === 0 ? 'wallet_modal_cancel_title' : 'wallet_modal_previous_title'
            }
            onClick={() =>
              this.state.step === 0
                ? this.props.dispatch(
                    toggleImportAccountModal(!this.props.modal.isOpenImportAccountModal),
                  )
                : this.isPrev
            }
          />
          <Button title={'wallet_modal_next_title'} onClick={this.isNext} />
        </BtnGroup>
      </div>
    )
  }

  private renderSteps = () => {
    const inputProps = {
      placeholder: 'Type a preferably strong password...',
      autoFocus: true,
      className: 'another-input-prop-class-name',
    }
    switch (this.state.step) {
      case 0:
        return (
          <div className={'step-0'}>
            <CTitle>
              <Trans i18nKey={'import_wallet_step0_title'} />
            </CTitle>
            <CTextarea
              value={this.props.header.seedPhrase}
              onChange={e => this.changeSeedPhraseFun(e.currentTarget.value)}
            />
            <CTitle>
              <Trans i18nKey={'wallet_modal_password'} />
            </CTitle>
            <FInput
              className="password-checker"
              minLength={5}
              minScore={2}
              scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
              changeCallback={this.changeCallback}
              inputProps={{ ...inputProps, id: 'inputPassword2' }}
            />
            {this.state.suggestions.length > 0 && <ErrorMsg>{this.state.suggestions[0]}</ErrorMsg>}
            <CTitle>
              <Trans i18nKey={'wallet_modal_confirm_password'} />
            </CTitle>
            <CInput
              type={'password'}
              id={'confirm_password_2'}
              value={this.state.confirmPass}
              onChange={this.onChangeConfirmPass}
              placeholder={'Confirm password'}
            />
            {this.state.comparePass && (
              <ErrorMsg>
                <Trans i18nKey={'Wallet_modal_confirm_invalid_message'} />
              </ErrorMsg>
            )}

            <CDescription>
              <Trans i18nKey={'onchain_import_disclaimer'} />
            </CDescription>
          </div>
        )
      case 1:
        const privateKey = localStorage.getItem('wallet_address')
        return (
          <div className={'step-1'}>
            <CTitle>
              <Trans i18nKey={'create_wallet_step4_title'} />
            </CTitle>
            <CInput
              type={'text'}
              id="public_key_step_1"
              value={privateKey || ''}
              disabled
              placeholder={'0x...'}
            />
          </div>
        )
      default:
        return ''
    }
  }

  private changeCallback = state => {
    this.setState(
      {
        passLength: state.password.length,
        isValid: state.isValid,
        mainPass: state.password,
      },
      () => {
        const result = zxcvbn(this.state.mainPass)
        if (this.state.mainPass === '') {
          this.setState({ suggestions: [] })
        }
        this.setState({ suggestions: result.feedback.suggestions })
      },
    )
  }

  private onChangeConfirmPass = e => this.setState({ confirmPass: e.currentTarget.value })

  private isNext = () => {
    if (this.state.step === 0) {
      if (this.state.mainPass !== this.state.confirmPass) {
        if (!this.state.isValid) {
          this.setState({ comparePass: true, checkPass: true })
        } else {
          this.setState({ comparePass: true, checkPass: false })
        }
        return
      }
      if (!this.state.isValid && (this.state.mainPass !== '' || this.state.confirmPass !== '')) {
        if (this.state.mainPass !== this.state.confirmPass) {
          this.setState({ comparePass: true, checkPass: true })
        } else {
          this.setState({ comparePass: false, checkPass: true })
        }
        return
      }
      this.setState({ comparePass: false, checkPass: false }, () => {
        this.checkIsWalletRegistered(this.props.header.seedPhrase, this.state.mainPass)

        this.setState({ step: 1 })
      })
    } else if (this.state.step === 1) {
      this.isOpenImportAccountModal()
    }
  }

  private isPrev = () => {
    if (this.state.step === 0) {
      return
    }
    if (this.state.step === 1) {
      this.isOpenImportAccountModal()
    }
  }

  private changeSeedPhraseFun = e => {
    this.props.dispatch(changeSeedPhrase(e))
  }

  private checkIsWalletRegistered = (seedPhrase: string, mainPass: string) =>
    this.props.dispatch(importWallet(seedPhrase, mainPass))

  private isOpenImportAccountModal = () => {
    this.props.dispatch(toggleImportAccountModal(!this.props.modal.isOpenImportAccountModal))
    if (this.props.wallet.walletAddress) {
      this.props.dispatch(changeSelectedAccountType('details_wallet'))
    }
    if (this.props.header.selectedAccountType === 'create_wallet') {
      localStorage.setItem('seed_phrase', this.props.header.seedPhrase)
    }

    return false
  }
}

interface State {
  step: number
  passLength: number
  passScore: number
  mainPass: string
  confirmPass: string
  isValid: boolean
  checkPass: boolean
  comparePass: boolean
  suggestions: string[]
}

interface Props {
  header: HeaderState
  walletStatus: HubStateType
  wallet: WalletState
  modal: ModalState
  tokensList: Array<string>
}

const mapStateToProps = (state: AppState): Props => ({
  header: state.header,
  walletStatus: state.hub.safe,
  wallet: state.wallet,
  modal: state.modal,
  tokensList: getHeaderTokensList(state),
})

export default connect(mapStateToProps)(ImportWalletContainer)

const BtnGroup = styled.div`
  display: flex;
  margin-top: 30px;
  button:first-child {
    margin-right: 10px;
    background-color: #191436;
    border: 1px solid #9c62e7;
    color: #fff !important;

    &:hover {
      background-color: #9c62e7 !important;
      border-color: #9c62e7 !important;
      div {
        background: #9c62e7;
      }
    }
  }

  button:last-child {
    margin-left: 10px;
  }
`
const CustomCss = css`
  width: 100%;
  height: 34px;
  color: #fff;
  background: #191436;
  border: 1px solid #9c62e7;
  border-radius: 50px;
  padding: 18px;
  margin-bottom: 20px;
  box-shadow: none;
  outline: none;
  font-size: 13px;
`
const CTitle = styled.p`
  font-size: 13px;
`

const CInput = styled.input`
  ${CustomCss}
`

const CTextarea = styled.textarea`
  ${CustomCss};
  border-radius: 5px;
  min-height: 80px;
`

const FInput = styled(ReactPasswordStrength)`
  width: 100%;
  height: 40px;
  color: #fff;
  background: #191436;
  border: 1px solid #9c62e7 !important;
  border-radius: 50px;
  margin-bottom: 20px;
  box-shadow: none;
  outline: none;
  input {
    height: 100%;
    background: #191436 !important;
    border-radius: 50px;
    color: #fff;
    font-size: 13px;
  }
`

const CDescription = styled.p`
  font-size: 11px;
  color: #afb9ca;
  margin-top: 18px;
  text-align: center;
`
