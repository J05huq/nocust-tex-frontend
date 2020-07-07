import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Balance from '../Balance'
import Order from '../Order'
import OrderBook from '../OrderBook'
import Chart from '../Chart'
import Transaction from '../Transaction'
import { DashboardState, fetchPeriodicData } from '../../state/dashboard'
import LoadingOverlay from '../../ui/LoadingOverlay'
import { AppState } from '../../state'
import { toggleImportAccountModal, toggleChallengeModal, ModalState } from '../../state/modal'
import TradeHistory from '../TradeHistory'
import { Trans } from 'react-i18next'
import { HubStateType, HubState } from '../../state/hub'
import { HeaderState } from '../../state/header'

interface Props {
  dashboard: DashboardState
  header: HeaderState
  modal: ModalState
  hub: HubState
}

class DashboardContainer extends React.Component<Props & { dispatch }> {
  componentDidMount() {
    this.props.dispatch(fetchPeriodicData())
  }

  private toggleImportAccountModal = () => this.props.dispatch(toggleImportAccountModal(true))
  render() {
    const { isLoading, loadingText } = this.props.dashboard
    const walletString = localStorage.getItem('wallet_address')
    return (
      <>
        <LoadingOverlay isActive={isLoading} text={loadingText} />
        {this.props.hub.safe === HubStateType.UNSAFE && (
          <HubUnSafe>
            <Trans i18nKey={'hub_safety_bar'} />
            <InitBtn onClick={() => this.props.dispatch(toggleChallengeModal(true))}>
              <Trans i18nKey={'issue_update_state_challenge'} />
            </InitBtn>
            <Trans i18nKey={'secure_funds'} />
          </HubUnSafe>
        )}
        {this.props.header.ticker && (
          <TextCenter>
            <TickerContainer>
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
          </TextCenter>
        )}
        <div className={'exchange-content'}>
          <div className={'vertical-split'}>
            {!walletString ? (
              <Overlay>
                <Container>
                  <Text>
                    <Trans i18nKey={'start_trading_text'} />
                  </Text>
                  <WalletButton onClick={this.toggleImportAccountModal}>
                    <i className="fa fa-wallet" /> <Trans i18nKey={'connect_wallet_btn'} />
                  </WalletButton>
                </Container>
              </Overlay>
            ) : (
              ''
            )}
            <Balance />
            <Order />
          </div>

          <div className={'vertical-split'}>
            <Chart />
            <Transaction />
          </div>

          <div className={'vertical-split'}>
            <OrderBook />
            <TradeHistory />
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state: AppState): Props => ({
  dashboard: state.dashboard,
  header: state.header,
  modal: state.modal,
  hub: state.hub,
})

export default connect(mapStateToProps)(DashboardContainer)

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(31, 27, 62, 0.9);
  z-index: 4;
  height: 100% !important;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 100%;
  text-align: center;
`

const Text = styled.p`
  color: #fff;
  text-align: center;
  font-size: 15px;
`

const WalletButton = styled.button`
  background: #9c62e7;
  color: #fff;
  box-shadow: none !important;
  border: 1px solid #9c62e7;
  outline: none !important;
  border-radius: 50px;
  padding: 12px 15px;
  cursor: pointer;
  &:hover {
    border: 1px solid #9c62e7;
    background: #1e1a3a;
    i {
      color: #9c62e7;
    }
  }
`

const HubUnSafe = styled.div`
  width: 100%;
  position: absolute;
  top: 75px;
  left: 0;
  padding: 7px 0;
  background: #b1363f;
  z-index: 2;
  text-shadow: none;
  font-weight: 300;
  font-size: 12px;
  text-align: center;
`

const InitBtn = styled.button`
  box-shadow: none;
  text-shadow: none;
  text-decoration: underline;
  color: #fff;
  outline: none !important;
  background: none !important;
  border: none;
  cursor: pointer;
`

const TextCenter = styled.div`
  text-align: center;
`
const TickerContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
  display: inline-block;
`
const TickerItem = styled.li`
  display: inline-block;
  vertical-align: middle;
  margin-left: 20px;
  &:first-child {
    margin-left: 0;
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
