import React from 'react'
import ReactPasswordStrength from 'react-password-strength'
import styled from 'styled-components'
import { Trans } from 'react-i18next'
import Button from '../../../../ui/Button'
import zxcvbn from 'zxcvbn'
import { createRandomThree } from '../../../../utils'
import SeedPhraseCheckInput from '../../../../components/Common/SeedPhraseCheckInput'
import { ErrorMsg, MAIN_COLOR } from '../../../../globalStyles'
import CustomCheckBox from '../../../Common/CustomCheckBox'
import { connect } from 'react-redux'
import { AppState } from '../../../../state'
import { HeaderState, setDisabledMenu, changeSelectedAccountType } from '../../../../state/header'
import { HubStateType } from '../../../../state/hub'
import { WalletState, createWallet } from '../../../../state/wallet'
import { ModalState, toggleImportAccountModal } from '../../../../state/modal'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import BeatLoader from 'react-spinners/BeatLoader'

class CreateWalletContainer extends React.Component<Props & { dispatch }, State> {
  state: State = {
    step: 0,
    passLength: 0,
    mainPass: '',
    confirmPass: '',
    isValid: false,
    checkPass: false,
    comparePass: false,
    checked: false,
    seedWordCheckArr: [],
    checkMnemonicIdx: [],
    suggestions: [],
    copySuccess: false,
  }

  componentDidMount() {
    this.makeThreeEmptyInputs()
  }

  render() {
    return (
      <CreateContainer className="create-wallet-relation-content">
        {this.renderSteps()}
        <BtnGroup>
          <Button
            title={
              this.state.step === 0 ? 'wallet_modal_cancel_title' : 'wallet_modal_previous_title'
            }
            onClick={this.isPrev}
          />
          <Button
            title={
              this.state.step === 4 ? 'wallet_modal_start_trading_title' : 'wallet_modal_next_title'
            }
            onClick={this.isNext}
            disabled={this.nextButtonDisabled()}
          />
        </BtnGroup>
      </CreateContainer>
    )
  }

  private makeThreeEmptyInputs = () => {
    let tempArr: any[]
    tempArr = []
    const indexArr = createRandomThree()
    indexArr.forEach((item: number) => {
      const arrItem = { [item]: false }
      tempArr.push(arrItem)
    })
    this.setState({ seedWordCheckArr: tempArr, checkMnemonicIdx: indexArr })
  }

  private renderSteps = () => {
    const seedPhraseArr = this.props.header.seedPhrase.split(' ')

    switch (this.state.step) {
      case 0:
        const inputProps = {
          placeholder: 'Enter password',
          autoFocus: true,
          className: 'another-input-prop-class-name',
        }
        return (
          <div className={'step-0'}>
            <CTitle>
              <Trans i18nKey={'wallet_modal_password'} />
            </CTitle>
            <FInput
              className="password-checker"
              minLength={5}
              minScore={2}
              scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
              changeCallback={this.changeCallback}
              inputProps={{ ...inputProps, id: 'inputPassword1' }}
            />
            {this.state.suggestions.length > 0 && <ErrorMsg>{this.state.suggestions[0]}</ErrorMsg>}
            <CTitle>
              <Trans i18nKey={'wallet_modal_confirm_password'} />
            </CTitle>
            <CInput
              type={'password'}
              id={'confirm_password_1'}
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
              <Trans i18nKey={'wallet_modal_description'} />
            </CDescription>
          </div>
        )
      case 1:
        return (
          <div className={'step-1'}>
            <CTitle>
              <Trans i18nKey={'create_wallet_step1_title'} />
              <CopyToClipboard text={this.props.header.seedPhrase} onCopy={this.onCopySeedPhrase}>
                {this.state.copySuccess ? (
                  <SuccessCopy>
                    <i className="fa fa-copy"></i> Copied!
                  </SuccessCopy>
                ) : (
                  <CopyToClipBoardBtn>
                    <i className="fa fa-copy"></i> Copy
                  </CopyToClipBoardBtn>
                )}
              </CopyToClipboard>
            </CTitle>
            {this.props.wallet.loadingSeedPhrase ? (
              <SeedPhraseLoading>
                <BeatLoader loading size={13} css={LoaderCSS} color={'#FFFFE4'} />
                <span>Creating your Seedphrase</span>
              </SeedPhraseLoading>
            ) : (
              <SeedContainer>
                <SeedListArray>
                  {seedPhraseArr.map((item, i) => {
                    return (
                      <SeedListItem key={i} className={'word'}>
                        {item}
                      </SeedListItem>
                    )
                  })}
                </SeedListArray>
              </SeedContainer>
            )}

            <CDescription>
              <Trans i18nKey={'create_wallet_step1_description'} />
            </CDescription>
          </div>
        )
      case 2:
        return (
          <div className={'step-2'}>
            <CTitle>
              <Trans i18nKey={'create_wallet_step1_title'} />
            </CTitle>
            <SeedContainer>
              <SeedListArray>
                {seedPhraseArr.map((item, i) => {
                  if (this.state.checkMnemonicIdx.indexOf(i) !== -1) {
                    return (
                      <SeedListItem key={i} className={'word'}>
                        <SeedPhraseCheckInput
                          idx={i}
                          seedWord={item}
                          onCheckSeedWord={this.onCheckSeedWord}
                        />
                      </SeedListItem>
                    )
                  } else {
                    return (
                      <SeedListItem key={i} className={'word'}>
                        {item}
                      </SeedListItem>
                    )
                  }
                })}
              </SeedListArray>
            </SeedContainer>
            <CDescription>
              <Trans i18nKey={'create_wallet_step2_description'} />
            </CDescription>
          </div>
        )
      case 3:
        return (
          <div className={'step-3'}>
            <CheckContainer>
              <TermsContinaer>
                <ul>
                  <li>
                    <i className="fa fa-circle"></i> <Trans i18nKey={'create_wallet_step3_text1'} />
                  </li>
                  <li>
                    <i className="fa fa-circle"></i> <Trans i18nKey={'create_wallet_step3_text2'} />
                  </li>
                  <li>
                    <i className="fa fa-circle"></i> <Trans i18nKey={'create_wallet_step3_text3'} />
                  </li>
                  <li>
                    <i className="fa fa-circle"></i> <Trans i18nKey={'create_wallet_step3_text4'} />
                  </li>
                  <li>
                    <i className="fa fa-circle"></i> <Trans i18nKey={'create_wallet_step3_text5'} />
                  </li>
                </ul>
              </TermsContinaer>
              <CustomCheckBox checked={this.state.checked} onChange={() => this.onChangeCheck()} />
              <Trans i18nKey={'create_wallet_step3_text6'} />{' '}
              <a
                href="https://liquidity-network.github.io/terms/tos"
                rel="noopener noreferrer"
                target="_blank"
              >
                Terms of Service
              </a>
            </CheckContainer>
          </div>
        )
      case 4:
        return (
          <div className={'step-4'}>
            <CTitle>
              <Trans i18nKey={'create_wallet_step4_title'} />
            </CTitle>
            <CInput
              type={'text'}
              value={this.props.wallet.walletAddress}
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
      this.setState({ comparePass: false, checkPass: false }, async () => {
        this.props.dispatch(createWallet(this.state.mainPass))
        this.props.dispatch(setDisabledMenu(true))
        this.setState({ step: 1 })
      })
    } else if (this.state.step === 1) {
      this.setState({ step: 2 })
    } else if (this.state.step === 2) {
      if (this.nextButtonDisabled()) {
        return
      }
      this.setState({ step: 3 })
    } else if (this.state.step === 3) {
      if (this.nextButtonDisabled()) {
        return
      }
      this.setState({ step: 4 }, () => {
        localStorage.setItem('wallet_address', this.props.wallet.walletAddress)
      })
    } else if (this.state.step === 4) {
      this.isOpenImportAccountModal()
    }
  }

  private isPrev = () => {
    if (this.state.step === 0) {
      this.isOpenImportAccountModal()
      return
    }
    if (this.state.step === 1) {
      this.setState({ step: 0, confirmPass: '' })
    }
    if (this.state.step === 2) {
      this.setState({ step: 1 })
    }
    if (this.state.step === 3) {
      this.setState({ step: 2 })
    }
    if (this.state.step === 4) {
      this.setState({ step: 3 })
    }
  }

  private nextButtonDisabled = () => {
    return (
      (this.state.step === 2 &&
        !this.state.seedWordCheckArr.every(item => item[Object.keys(item)[0]])) ||
      (this.state.step === 3 && !this.state.checked)
    )
  }

  private onChangeCheck = () => {
    this.setState({ checked: !this.state.checked })
  }

  private onCheckSeedWord = (idx: number, checkingValue: boolean) => {
    const copyArr = this.state.seedWordCheckArr
    const relevantObj = copyArr.find(item => Object.keys(item)[0] === idx.toString())
    relevantObj[idx] = checkingValue
    this.setState({ seedWordCheckArr: copyArr })
  }

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

  private onCopySeedPhrase = () => {
    this.setState({ copySuccess: true })
    setTimeout(() => {
      this.setState({ copySuccess: false })
    }, 1000)
  }
}

interface State {
  step: number
  passLength: number
  mainPass: string
  confirmPass: string
  isValid: boolean
  checkPass: boolean
  comparePass: boolean
  checked: boolean
  seedWordCheckArr: any[]
  checkMnemonicIdx: number[]
  suggestions: string[]
  copySuccess: boolean
}

interface Props {
  header: HeaderState
  walletStatus: HubStateType
  wallet: WalletState
  modal: ModalState
}

const mapStateToProps = (state: AppState): Props => ({
  header: state.header,
  walletStatus: state.hub.safe,
  wallet: state.wallet,
  modal: state.modal,
})

export default connect(mapStateToProps)(CreateWalletContainer)

const CreateContainer = styled.div`
  margin-top: 30px;
`

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
const CTitle = styled.p`
  font-size: 13px;
`

const CInput = styled.input`
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

const CheckContainer = styled.label`
  font-size: 13px;
  input {
    margin-right: 10px;
  }
`

const SeedContainer = styled.div`
  background: #13102b;
  border: 1px solid #9c62e7;
  border-radius: 5px;
  padding-top: 15px;
`

const SeedListArray = styled.ol`
  display: grid;
  font-size: 14px;
  color: #fff;
  border-radius: 2px;
  grid-auto-flow: row;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (min-width: 414px) and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 414px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const SeedListItem = styled.li`
  line-height: 30px;
  text-align: left;
  width: 80px;
`

const CopyToClipBoardBtn = styled.button`
  color: #fff;
  float: right;
  font-size: 12px;
  background: none;
  box-shadow: none !important;
  border: none;
  outline: none !important;
  color: #afb9ca;
  cursor: pointer;
  i {
    margin-right: 5px;
    color: #afb9ca;
  }

  &:hover {
    color: #fff;
    i {
      color: ${MAIN_COLOR};
    }
  }
`

const SuccessCopy = styled.span`
  i {
    color: #02a177;
  }
  color: #02a177;
  float: right;
  cursor: pointer;
`

const SeedPhraseLoading = styled.div`
  text-align: center;
  padding: 30px 0;
  font-size: 12px;
`

const LoaderCSS = { 'z-index': 2, position: 'relative', marginBottom: '10px' }

const TermsContinaer = styled.div`
  max-height: 200px;
  background: #13102b;
  border: 1px solid #9c62e7;
  border-radius: 5px;
  padding: 15px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 15px;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      margin-bottom: 10px;
      i {
        color: #9c62e7;
        font-size: 10px;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`
