import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Trans } from 'react-i18next'
import styled, { keyframes } from 'styled-components'
import { AppState } from '../../state'
import { changeSelectedAccountType, HeaderState } from '../../state/header'
import {
  ModalState,
  toggleDepositAndWidthdrawalModal,
  toggleImportAccountModal,
  toggleLogoutConfirmModal,
  toggleDemoModal,
  toggleChallengeModal,
} from '../../state/modal'
import {
  Collapse,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import Modal from '../Common/Modal'
import DepositAndWithdraw from './DepositAndWithdraw'
import AccountManager from './AccountManager/AccountManager'
import {
  HubState,
  HubNames,
  HubNamesType,
  switchHubs,
  tokenSwitching,
  HubStateType,
} from '../../state/hub'
import { TutorialScreenContainer } from './TutorialScreen'
import { WalletState } from '../../state/wallet'
import Logo from '../../assets/images/tex-new-logo.svg'
import CoinStack from '../../assets/images/coin-stack.svg'
import LogoutModalContainer from './LogoutModal'
import DemoModal from './DemoModal'
import UpdateChallenge from './UpdateChallenge'
import hubs from '../../services/hubs'
import * as bcrypt from 'bcryptjs'

interface Props {
  header: HeaderState
  wallet: WalletState
  modal: ModalState
  hub: HubState
  hubNames: Object
}

interface State {
  isOpen: boolean
  isOpenIntroductionModal: boolean
}

class HeaderContainer extends React.Component<RouteComponentProps & Props & { dispatch }, State> {
  state: State = {
    isOpen: false,
    isOpenIntroductionModal: false, // this.props.header.walletAddress === '',
  }

  componentDidMount() {
    const currentPairs = localStorage.getItem('current_pair') || 'fLQD-fETH'
    const { pathname } = this.props.history.location
    const token = pathname.split('/').pop()
    if (currentPairs !== token) {
      this.props.history.push(`/exchange/trade/${currentPairs}`)
    }
  }

  render() {
    const { isOpen, isOpenIntroductionModal } = this.state
    const { walletAddress } = this.props.wallet

    return (
      <Container className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Brand href={'https://tex.liquidity.network'}>
          <BrandImg src={Logo} />
          <BrandText>&nbsp;powered by Liquidity Network</BrandText>
        </Brand>

        <Modal
          isModalOpen={isOpenIntroductionModal}
          title={'introduction_modal_title'}
          toggleModal={this.closeIntroductionModal}
        >
          <TutorialScreenContainer closeModal={this.closeIntroductionModal} />
        </Modal>

        <Modal
          isModalOpen={this.props.modal.isOpenDepositAndWithdrawModal}
          title={'deposit_and_withdraw_modal_title'}
          toggleModal={this.closeDepositAndWithdrawModal}
        >
          <DepositAndWithdraw />
        </Modal>

        <Modal
          isModalOpen={this.props.modal.isOpenLogoutConfirmModal}
          title={''}
          toggleModal={this.closeLogoutConfirmation}
        >
          <LogoutModalContainer logout={this.logout} cancel={this.closeLogoutConfirmation} />
        </Modal>

        <Modal
          isModalOpen={this.props.modal.isOpenDemoModal === 'true' ? true : false}
          title={''}
          toggleModal={this.closeDemoModal}
        >
          <DemoModal close={this.closeDemoModal} dontShowAgain={this.dontShowDemoModal} />
        </Modal>

        <Modal
          isModalOpen={this.props.modal.isOpenChallengeModal}
          title={'issue_update_state_challenge'}
          toggleModal={this.closeChallengeModal}
        >
          <UpdateChallenge close={this.closeChallengeModal} />
        </Modal>

        <CNavbarToggler onClick={this.toggle} />

        <Collapse isOpen={isOpen} navbar>
          {this.props.header.ticker && (
            <TickerContainer className="desktopTicker">
              <TickerItem>
                <ItemName>Last Price</ItemName>
                <ItemValue>{this.props.header.ticker.price}</ItemValue>
              </TickerItem>
              <TickerItem>
                <ItemName>24h Low</ItemName>
                <ItemValue>{this.props.header.ticker.low}</ItemValue>
              </TickerItem>
              <TickerItem>
                <ItemName>24h High</ItemName>
                <ItemValue>{this.props.header.ticker.high}</ItemValue>
              </TickerItem>
              <TickerItem>
                <ItemName>24h Volume</ItemName>
                <ItemValue>{this.props.header.ticker.volume}</ItemValue>
              </TickerItem>
            </TickerContainer>
          )}
          <Nav className="navbar-right" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DDToggle nav caret>
                <img src={CoinStack} alt="" />
                <span>{this.props.header.token}</span>
              </DDToggle>
              <CustomDropDown className={'token-list'} right>
                {this.props.hub.availablePairs.map(pair => {
                  return (
                    <DropdownItem key={pair}>
                      <NavLink onClick={() => this.switchToken(pair, this.props.history)}>
                        <span>{pair}</span>
                      </NavLink>
                    </DropdownItem>
                  )
                })}
              </CustomDropDown>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DDToggle nav caret>
                <span>{this.renderCircle(this.props.hub.currentHub)}</span>
                <span>{this.props.hub.hubName}</span>
              </DDToggle>
              <CustomDropDown right>
                {Object.keys(this.props.hubNames).map(hub => {
                  return (
                    <DropdownItem key={hub}>
                      <NavLink onClick={() => this.setHub(hub)}>
                        <span>{this.renderCircle(hub)}</span>
                        <span>{this.props.hubNames[hub]}</span>
                      </NavLink>
                    </DropdownItem>
                  )
                })}
              </CustomDropDown>
            </UncontrolledDropdown>
            <NavItem>
              <span className={'nav-link'}>
                {walletAddress ? (
                  <span className="block-item" onClick={this.isOpenImportAccountModal}>
                    <i className="fa fa-user-circle" />
                    <span>{`${walletAddress.slice(0, 4 + 2)}...${walletAddress.slice(-4)}`}</span>{' '}
                    {this.getWalletStatusIcon()}
                  </span>
                ) : (
                  <span className="no-account block-item" onClick={this.isOpenImportAccountModal}>
                    <i className="fa fa-exclamation-circle warning">
                      <Circle />
                    </i>
                    <span>
                      <Trans i18nKey={'header_wallet_address_placeholder'} />
                    </span>
                  </span>
                )}
              </span>
            </NavItem>

            <Modal
              buttonTitle={'Confirm'}
              isModalOpen={this.props.modal.isOpenImportAccountModal}
              title={'wallet_modal_title'}
              toggleModal={this.isOpenImportAccountModal}
              modalWidth={'600px'}
            >
              <AccountManager />
            </Modal>

            <NavItem>
              <span className={'nav-link'}>
                {walletAddress && (
                  <span className="block-item" id="logout_nav" onClick={this.logoutRequest}>
                    <i className="fa fa-sign-out-alt" />
                    Logout
                  </span>
                )}
              </span>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    )
  }

  private renderCircle = hub => {
    if (hub === HubNamesType.RINKEBY) {
      return <HubCircle color={'orange'} />
    } else if (hub === HubNamesType.MAINNET) {
      return <HubCircle color={'green'} />
    } else {
      return <HubCircle color={'yellow'} />
    }
  }

  private getWalletStatusIcon = () => {
    let icon = ''
    let color = ''
    if (this.props.hub.safe === HubStateType.SAFE) {
      icon = 'fa-check-circle'
      color = '#02a177'
    } else if (this.props.hub.safe === HubStateType.UNSAFE) {
      icon = 'fa-exclamation-circle'
      color = '#b1363f'
    }
    return <StatusIcon className={`fas ${icon}`} color={color} />
  }

  private switchToken = (pair: string, history: any) => {
    this.props.dispatch(tokenSwitching(pair, history))
  }

  private toggle = () => this.setState({ isOpen: !this.state.isOpen })

  private closeIntroductionModal = () =>
    this.setState(Object.assign(this.state, { isOpenIntroductionModal: false }))

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

  private closeLogoutConfirmation = () => {
    this.props.dispatch(toggleLogoutConfirmModal(false))
  }
  private closeDepositAndWithdrawModal = () => {
    this.props.dispatch(toggleDepositAndWidthdrawalModal(false))
    return false
  }

  private logoutRequest = () => {
    this.props.dispatch(toggleLogoutConfirmModal(true))
  }

  private logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  private dontShowDemoModal = () => {
    localStorage.setItem('show_demo_modal', 'false')
    this.props.dispatch(toggleDemoModal(false))
  }

  private closeDemoModal = () => {
    this.props.dispatch(toggleDemoModal(false))
  }

  private closeChallengeModal = () => {
    this.props.dispatch(toggleChallengeModal(false))
  }

  private setHub = async (hub: string) => {
    if (hub === HubNamesType.MAINNET) {
      const password = prompt('Please enter mainnet password', 'password goes here')
      const hashedPassword = hubs[hub].mainnetPassword

      if (password != null) {
        const hashPassword = async () => {
          const isSamePassword = await bcrypt.compare(password, hashedPassword)
          if (isSamePassword) {
            this.props.dispatch(switchHubs(hub))
          }
        }
        hashPassword()
      }
      return
    }
    this.props.dispatch(switchHubs(hub))
  }
}

const mapStateToProps = (state: AppState): Props => ({
  header: state.header,
  wallet: state.wallet,
  modal: state.modal,
  hub: state.hub,
  hubNames: HubNames,
})

export default withRouter(connect(mapStateToProps)(HeaderContainer))

const Container = styled.div`
  background-color: #1e1a3a !important;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  z-index: 2;
  padding: 1rem;
`

const Brand = styled(NavbarBrand)`
  padding-right: 0.35rem;
  color: #fff;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
  text-decoration: none;
`

const BrandImg = styled.img`
  max-width: 60px;
`
const BrandText = styled.span`
  color: #fff;
  font-size: 12px;
  position: relative;
  top: 10px;
  left: 5px;
`

const CNavbarToggler = styled(NavbarToggler)`
  border: none !important;
  span {
    background-color: transparent !important;
  }
`

const Infinite = keyframes`

    0% {
      box-shadow: 0 0 0 0 hsla(0, 0%, 100%, 0.4);
    }

    70% {
      box-shadow: 0 0 0 20px hsla(0, 0%, 100%, 0);
    }

    to {
      box-shadow: 0 0 0 0 hsla(0, 0%, 100%, 0);
    }
  
`

const Circle = styled.div`
  cursor: pointer;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #ff0;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
  animation: ${Infinite} 2s infinite;
  position: absolute;
  top: 1px;
  left: 1px;
  z-index: -1;
`

const CustomDropDown = styled(DropdownMenu)`
  background-color: #1e1a3a !important;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  button {
    background-color: #1e1a3a !important;
    color: #fff !important;
    &:hover {
      background-color: #9c62e7 !important;
      color: #fff !important;
      a {
        background-color: #9c62e7 !important;
        color: #fff !important;
      }
    }

    span {
      &:first-child {
        margin-left: 0 !important;
      }
    }
  }
`

const DDToggle = styled(DropdownToggle)`
  border: 1px solid #9c62e7;
  border-radius: 25px;
  font-size: 13px;
  padding: 8px 20px !important;
  @media (min-width: 991px) {
    margin-right: 20px;
  }
  img {
    width: 15px;
  }
  &:after {
    margin-left: 10px;
  }
  span {
    &:last-child {
      margin-left: 10px;
    }
  }
`

const HubCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.color};
  display: inline-block;
`

const StatusIcon = styled.i`
  color: ${props => props.color} !important;
`

const TickerContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 5px 5rem 0 0;
  float: right;
  &.desktopTicker {
    @media (max-width: 1400px) {
      margin-right: 3rem;
    }

    @media (max-width: 1200px) {
      display: none;
    }
  }
`
const TickerItem = styled.li`
  display: inline-block;
  vertical-align: middle;
  margin-left: 40px;
  &:first-child {
    margin-left: 0;
  }

  @media (max-width: 1400px) {
    margin-left: 20px;
  }
`
const ItemName = styled.p`
  font-size: 12px;
  margin-bottom: 0px;
  color: #adbbcd;
`
const ItemValue = styled.p`
  margin-bottom: 0;
  font-size: 13px;
`
