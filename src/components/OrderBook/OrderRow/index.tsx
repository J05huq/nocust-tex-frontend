import React from 'react'
import { connect } from 'react-redux'
import { BigNumber } from 'bignumber.js'
import { TransactionType } from '../../../state/transaction'
import {
  changeOrderTab,
  setIncomingOrder,
  OrderType,
  OrderState,
  setFiatPrice,
  setFiatAmount,
} from '../../../state/order'
import { fiatAmount } from '../../../utils'
import { HubState } from '../../../state/hub'
import { AppState } from '../../../state'
import { getHeaderTokensList } from '../../../state/header'
import { OrderBookState } from '../../../state/orderBook'

class OrderRowContainer extends React.Component<IProps> {
  componentDidUpdate() {
    if (this.props.type === TransactionType.BUY) {
      const objDiv: any = document.querySelector('.sellOrderBook')
      objDiv.scrollTop = objDiv.scrollHeight
    }
  }
  render() {
    const { decimals } = this.props.orderBook
    const { price, type, amount, totalAmount, ordersTotalAmountSum } = this.props
    const barPercentage = totalAmount.dividedBy(ordersTotalAmountSum).times(100)

    const tabType = type === 'buy' ? OrderType.SELL : OrderType.BUY

    return (
      <tr
        className={this.getClassName(type)}
        style={{
          backgroundImage: `${this.getLinearColor(
            type,
          )} ${barPercentage}%, rgba(0, 0, 0, 0) ${barPercentage}%)`,
        }}
        onClick={() =>
          this.fillOrder(
            tabType,
            price.toFixed(decimals).slice(0, -1),
            amount.toFixed(decimals).slice(0, -1),
          )
        }
      >
        <td>
          <span>{price.toFixed(decimals).slice(0, -1)}</span>
        </td>
        <td>
          <span>{amount.toFixed(decimals).slice(0, -1)}</span>
        </td>
        <td>
          <span>{totalAmount.toFixed(decimals).slice(0, -1)}</span>
        </td>
      </tr>
    )
  }

  private fillOrder = (type: string, price: string, amount: string) => {
    const tokens = this.props.tokenList
    const metaData = this.props.hub.tokensMetaData
    this.props.dispatch(changeOrderTab(type))
    this.props.dispatch(setIncomingOrder({ price, amount }))
    this.props.dispatch(setFiatPrice(fiatAmount(price, tokens[1], metaData)))
    this.props.dispatch(setFiatAmount(fiatAmount(amount, tokens[0], metaData)))
  }

  private getLinearColor = (type: TransactionType) =>
    type === TransactionType.BUY
      ? 'linear-gradient(to right, rgba(2, 161, 119, 0.45)'
      : 'linear-gradient(to right, rgba(177, 54, 63, 0.45)'

  private getClassName = (type: TransactionType) =>
    type === TransactionType.BUY ? 'buy-row' : 'sell-row'
}

interface Props {
  amount: BigNumber
  totalAmount: BigNumber
  ordersTotalAmountSum: BigNumber
  price: BigNumber
  type: TransactionType
}

interface StateProps {
  order: OrderState
  hub: HubState
  orderBook: OrderBookState
  tokenList: Array<string>
}

const mapStateToProps = (app: AppState): StateProps => ({
  order: app.order,
  hub: app.hub,
  orderBook: app.orderBook,
  tokenList: getHeaderTokensList(app),
})

type IProps = Props & StateProps & { dispatch }

export default connect(mapStateToProps)(OrderRowContainer)
