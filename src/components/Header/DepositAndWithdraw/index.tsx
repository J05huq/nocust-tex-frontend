import React, { Component } from 'react'
import styled from 'styled-components'
import { Tabs, Tab, TabList, TabPanel } from 'react-web-tabs'
import QRCode from 'qrcode.react'
import { connect } from 'react-redux'
import { Trans } from 'react-i18next'
import { Formik, ErrorMessage } from 'formik'
import Validation from './validation'
import { pairToTokens, fSymbolToMainSymbol } from '../../../utils'
import appleButton from '../../../assets/images/apple_badge.png'
import androidButton from '../../../assets/images/play_badge.png'
import { HubStateType } from '../../../state/hub'
import {
  DetailWalletState,
  changeTab,
  setTokenSelected,
  setWithdrawalAddress,
  withdrawToExternalWallet,
} from '../../../state/detailWallet'
import { AppState } from '../../../state'
import LoadingSpinner from '../../../ui/LoadingSpinner'
import { HeaderState } from '../../../state/header'
import Button from '../../../ui/Button'
import { ErrorMsg } from '../../../globalStyles'
import BigNumber from 'bignumber.js'
import { WalletState } from '../../../state/wallet'
import { BalanceState } from '../../../state/balance'
import { MAIN_COLOR } from '../../../globalStyles'

interface State {
  amount: any
}
class DepositAndWithdraw extends Component<Props & { dispatch }, State> {
  state: State = {
    amount: '',
  }
  componentWillMount() {
    this.props.dispatch(setTokenSelected(this.listAllTokens()[0]))
  }
  private renderTokensDropdown = tokenSelected => (
    <CDropDown className="dropdown">
      <DropDownBtn
        className="btn btn-secondary dropdown-toggle token-dropdown"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {tokenSelected}
      </DropDownBtn>
      <DropDownMenu
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="dropdownMenuButton"
      >
        {this.listAllTokens().map((token, i) => {
          return (
            <DNavItem
              key={token}
              className="dropdown-item"
              href="#"
              onClick={() => this.onTokenSelect(token)}
            >
              {token}
            </DNavItem>
          )
        })}
      </DropDownMenu>
    </CDropDown>
  )

  private listAllTokens = () => {
    const headerPairs = pairToTokens(this.props.headerState.token)
    return headerPairs
  }

  private setMaxAmount = e => {
    e.preventDefault()
    if (this.listAllTokens()[0] === this.props.detailWallet.tokenSelected) {
      this.setState({ amount: this.props.balance.leftOffChainBalance })
    } else {
      this.setState({ amount: this.props.balance.rightOffChainBalance })
    }
  }

  private renderWithdrawTab = () => {
    const { withdrawalAddress, tokenSelected, withdrawLoading } = this.props.detailWallet

    return (
      <TabPanel tabId="withdraw-tab">
        <Formik
          initialValues={{ withdrawal_amount: this.state.amount }}
          enableReinitialize={true}
          onSubmit={this.withdraw}
          validationSchema={Validation.withdrawForm}
        >
          {props => {
            const { handleChange, values, handleSubmit, handleBlur } = props

            return (
              <form onSubmit={handleSubmit}>
                <div className={'address-field'}>
                  <div>
                    <CTitle>Withdrawal amount</CTitle>
                    <MaxBtn onClick={e => this.setMaxAmount(e)}>Max</MaxBtn>
                    <div className="clearfix"></div>
                  </div>
                  <InputField>
                    <DropDownInput
                      id={'withdrawal_amount'}
                      type={'number'}
                      step={'any'}
                      placeholder={'0.000'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // @ts-ignore
                      value={values.withdrawal_amount}
                    />
                    {this.renderTokensDropdown(tokenSelected)}
                  </InputField>
                  <ErrorMessage
                    name={'withdrawal_amount'}
                    render={msg => <ErrorMsg>{msg}</ErrorMsg>}
                  />
                </div>
                <div className={'address-field'}>
                  <CTitle>Withdraw to address</CTitle>
                  <CInput
                    type={'text'}
                    id={'withdraw_to'}
                    onChange={this.onWithdrawalAddressChange}
                    value={withdrawalAddress}
                    placeholder={'Enter wallet address'}
                  />
                </div>

                <Button
                  id={'widthdraw_btn'}
                  title={`balance_tab_withdraw`}
                  type={'submit'}
                  disabled={withdrawLoading}
                />
                {withdrawLoading ? <LoadingSpinner /> : ''}
              </form>
            )
          }}
        </Formik>
      </TabPanel>
    )
  }

  private renderDepositTab = () => {
    return (
      <TabPanel tabId="deposit-tab">
        <div className={'address-field'}>
          <CDescription>
            <Trans i18nKey={'onchain_deposit_disclaimer'} />
          </CDescription>
          <CTitle>Wallet address</CTitle>
          <CInput
            type={'text'}
            id={'deposit_walletstring'}
            value={this.props.walletAddress}
            disabled
          />
          <ErrorMessage name={'deposit_amount'} render={msg => <ErrorMsg>{msg}</ErrorMsg>} />
          <div className="container">
            <DContainer className={'text-center'}>
              <PTitle>Scan QR Code</PTitle>
              <DQRCode value={this.props.walletAddress} size={150} className={'qrcode'} />
            </DContainer>

            <DContainer className="row align-items-center text-center">
              <PTitle>Download the Liquidity App from here</PTitle>
              <div className="col-6">
                <a href="http://onelink.to/nfkuv5" target="_blank" rel="noopener noreferrer">
                  <FigureImg>
                    <img alt="Get it on App Store" className={'app-button'} src={appleButton} />
                  </FigureImg>
                </a>
              </div>
              <div className="col-6">
                <a href="http://onelink.to/nfkuv5" target="_blank" rel="noopener noreferrer">
                  <FigureImg>
                    <img alt="Get it on Google Play" className={'app-button'} src={androidButton} />
                  </FigureImg>
                </a>
              </div>
            </DContainer>
          </div>
        </div>
      </TabPanel>
    )
  }
  public render = () => {
    const { activeTab } = this.props.detailWallet

    return (
      <div>
        <Tabs defaultTab={activeTab} onChange={this.onTabChange}>
          <StyledTabs className={'tabs-header'}>
            <TabButton tabFor="deposit-tab" className={activeTab === 'deposit-tab' ? 'active' : ''}>
              Deposit
            </TabButton>
            <TabButton
              tabFor="withdraw-tab"
              className={activeTab === 'withdraw-tab' ? 'active' : ''}
            >
              Withdraw
            </TabButton>
          </StyledTabs>
          {this.renderWithdrawTab()}
          {this.renderDepositTab()}
        </Tabs>
      </div>
    )
  }

  private onTabChange = (tabId: string) => {
    const { dispatch } = this.props
    dispatch(changeTab(tabId))
  }

  private onWithdrawalAddressChange = event => {
    const { dispatch } = this.props
    const address = event.target.value
    dispatch(setWithdrawalAddress(address))
  }

  private onTokenSelect = token => {
    const { dispatch } = this.props
    dispatch(setTokenSelected(token))
  }

  private withdraw = (values, { setSubmitting }) => {
    const { dispatch } = this.props
    const { withdrawalAddress, tokenSelected } = this.props.detailWallet

    dispatch(
      withdrawToExternalWallet(
        withdrawalAddress,
        new BigNumber(values.withdrawal_amount),
        fSymbolToMainSymbol(tokenSelected),
      ),
    )
    setSubmitting(false)
  }
}

interface Props {
  walletAddress: string
  walletStatus: HubStateType
  detailWallet: DetailWalletState
  headerState: HeaderState
  wallet: WalletState
  balance: BalanceState
}

const mapStateToProps = (app: AppState): Props => ({
  detailWallet: app.detailWallet,
  walletAddress: app.wallet.walletAddress,
  walletStatus: app.hub.safe,
  headerState: app.header,
  wallet: app.wallet,
  balance: app.balance,
})

export default connect(mapStateToProps)(DepositAndWithdraw)

const StyledTabs = styled(TabList)`
  margin-bottom: 20px;
  background-color: #161231;
  border-radius: 50px;
  padding: 4px;
  display: flex;
  flex-direction: row;
  border: none;
  border-image: none !important;
`

const TabButton = styled(Tab)`
  border-radius: 50px;
  padding: 0.5rem 0;
  flex: 0 0 50%;
  background: transparent;
  color: #525e80 !important;
  border: 0;
  cursor: pointer;
  &.active {
    background-color: #201b43;
    color: #9c62e7 !important;
    border: 0;
    border-radius: 50px;
    outline: none;
    box-shadow: none;
  }
`

const InputField = styled.div`
  display: flex;
`

const CTitle = styled.p`
  font-size: 13px;
  float: left;
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
  font-size: 15px;
`

const DropDownInput = styled(CInput)`
  border-radius: 50px 0 0 50px;
`

const CDropDown = styled.div`
  height: 34px;
  margin-left: 10px;
`

const DropDownBtn = styled.button`
  width: 100%;
  border-radius: 0 50px 50px 0;
  border: 1px solid #9c62e7;
  color: #fff;
  background: #191436;
  &:after {
    color: #9c62e7;
  }

  &:hover,
  &:focus {
    background: #9c62e7 !important;
    border-color: #9c62e7 !important;
    box-shadow: none !important;
    &:after {
      color: #fff;
    }
  }
`

const DropDownMenu = styled.div`
  background-color: #13102b !important;
`

const DNavItem = styled.a`
  &:hover {
    background: #9c62e7 !important;
  }
`

const DContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`

const PTitle = styled.p`
  font-size: 14px;
  width: 100%;
  text-align: center;
`

const DQRCode = styled(QRCode)`
  border: 5px solid #9c62e7;
  box-shadow: 9px 3px 13px rgba(0, 0, 0, 0.4);
`

const FigureImg = styled.figure`
  img {
    width: 130px;
    height: 43px;
  }
`

const CDescription = styled.p`
  font-size: 11px;
  color: #afb9ca;
  margin-top: 18px;
  text-align: center;
`

const MaxBtn = styled.button`
  background: ${MAIN_COLOR};
  box-shadow: none;
  padding: 2px 10px;
  border-radius: 25px;
  border: 0;
  text-shadow: none;
  font-size: 13px;
  color: #fff;
  float: right;
  cursor: pointer;
  outline: none !important;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`
