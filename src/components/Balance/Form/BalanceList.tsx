import React from 'react'
import { pairToTokens, amountToFiat } from '../../../utils'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../../../state'
import { getHeaderTokenPair } from '../../../state/header'
import {
  getOffChainBalance,
  getLeftNotEnoughEth,
  getRightNotEnoughEth,
  BalanceState,
} from '../../../state/balance'
import { Tooltip } from 'reactstrap'
import { Trans } from 'react-i18next'
import { HubState } from '../../../state/hub'
import BigNumber from 'bignumber.js'

class BalanceList extends React.Component<Props, {}, State> {
  state: State = {
    toggleTip: [false, false],
  }

  render() {
    const { tokenPair } = this.props
    const tokenArr = pairToTokens(tokenPair)

    const { leftOffChainBalance, rightOffChainBalance } = this.props.offChainBalance

    return (
      <tbody>
        {this.tokenBalanceRow(tokenArr[0], leftOffChainBalance, this.props.leftNotEnoughEth, 0)}
        {this.tokenBalanceRow(tokenArr[1], rightOffChainBalance, this.props.rightNotEnoughEth, 1)}
      </tbody>
    )
  }

  tokenBalanceRow = (token: string, balance: string, notEnoughEth: boolean, index: number) => (
    <tr key={token} data-key={token}>
      <td>
        <span>{token}</span>
      </td>
      <td>
        <span>{`${balance} ($${this.fiatAmount(balance, token)})`}</span>
      </td>
      <td>
        <span>
          {notEnoughEth ? (
            <>
              <Circle id={token} />
              <Tooltip
                placement={'bottom'}
                isOpen={this.state.toggleTip[index]}
                autohide={false}
                target={token}
                delay={{ show: 0, hide: 250 }}
                toggle={() => {
                  this.triggerTip(index)
                }}
              >
                <span style={{ fontSize: '12px' }}>
                  <Trans i18nKey={'insufficient_eth'} />
                </span>
              </Tooltip>
            </>
          ) : (
            ''
          )}
        </span>
      </td>
    </tr>
  )

  private fiatAmount = (balance, token) => {
    let fiat: any = 0
    const baseToken = token.slice(1)
    const tokenData = this.props.hub.tokensMetaData[baseToken]
    if (tokenData && !this.props.balance.isLoading) {
      const { fiatPrice } = tokenData
      let amountBN = new BigNumber(balance)
      amountBN = amountBN.isNaN() ? new BigNumber(0) : amountBN
      fiat = amountToFiat(amountBN, fiatPrice, 2)
    }

    return fiat
  }

  private triggerTip = index => {
    const { toggleTip } = this.state
    toggleTip[index] = !this.state.toggleTip[index]
    this.setState({
      toggleTip,
    })
  }
}

interface State {
  toggleTip: boolean[]
}

interface Props {
  tokenPair: string
  offChainBalance: { leftOffChainBalance: string; rightOffChainBalance: string }
  leftNotEnoughEth: boolean
  rightNotEnoughEth: boolean
  balance: BalanceState
  hub: HubState
}

const mapStateToProps = (state: AppState): Props => ({
  tokenPair: getHeaderTokenPair(state),
  offChainBalance: getOffChainBalance(state),
  leftNotEnoughEth: getLeftNotEnoughEth(state),
  rightNotEnoughEth: getRightNotEnoughEth(state),
  balance: state.balance,
  hub: state.hub,
})

export default connect(mapStateToProps)(BalanceList)

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: orange;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.6);
`
