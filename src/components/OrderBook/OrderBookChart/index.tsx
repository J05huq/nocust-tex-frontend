import React from 'react'
import { Tooltip } from 'reactstrap'
import { pairToTokens } from '../../../utils'
import { OrderBook } from '../../../state/orderBook'

import OrderRow from '../OrderRow'
import { TransactionType } from '../../../state/transaction'

class OrderBookChartContainer extends React.Component<Props, State> {
  public orderBookTableElement: React.RefObject<HTMLDivElement> = React.createRef()
  public orderBookTrElement: React.RefObject<HTMLTableRowElement> = React.createRef()

  state: State = {
    isMobile: window.innerWidth < 992,
    tooltipOpen: false,
  }

  public componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions)
    const currentTrElement = this.orderBookTrElement.current
    if (currentTrElement) {
      currentTrElement.scrollIntoView({ block: 'center' })
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  public updateWindowDimensions = () => {
    this.setState({ isMobile: window.innerWidth < 992 }, () => {
      if (this.state.isMobile && this.orderBookTableElement.current) {
        this.orderBookTableElement.current.scrollIntoView({ block: 'start' })
      }
    })
  }
  private toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    })
  }

  render() {
    const { orderBookData, token } = this.props
    const tokenArr = pairToTokens(token)
    return (
      <div className="w100">
        <div className="w100 hasPadding">
          <table>
            <tbody>
              <tr id={'orderBookMid'} className={'mid-header'} ref={this.orderBookTrElement}>
                <th>
                  <span>Price ({tokenArr[1]})</span>
                </th>
                <th>Amount ({tokenArr[0]})</th>
                <th>Total ({tokenArr[1]})</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={'orderBookScroll sellOrderBook'} ref={this.orderBookTableElement}>
          <div className="orderBookSellInner">
            <table className={'table table-condensed table-borderless table-order-book'}>
              <tbody>
                {orderBookData.sellOrders &&
                  orderBookData.sellOrders.map((order, i) => {
                    return (
                      <OrderRow
                        key={i}
                        price={order.price}
                        amount={order.amount}
                        totalAmount={order.totalAmount}
                        ordersTotalAmountSum={order.ordersTotalAmountSum}
                        type={TransactionType.SELL}
                      />
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="order-diff-tr">
          <span id="SpreadTip" className={'order-diff-span'}>
            {this.calculateOrderDifference()}
          </span>
          <Tooltip
            placement="right"
            isOpen={this.state.tooltipOpen}
            target="SpreadTip"
            toggle={this.toggle}
          >
            Spread is the difference between lowest sell and highest buy prices
          </Tooltip>
        </div>
        <div className={'orderBookScroll'} ref={this.orderBookTableElement}>
          <table className={'table table-condensed table-borderless table-order-book'}>
            <tbody>
              {orderBookData.buyOrders &&
                orderBookData.buyOrders.map((order, i) => {
                  return (
                    <OrderRow
                      key={i}
                      price={order.price}
                      amount={order.amount}
                      totalAmount={order.totalAmount}
                      ordersTotalAmountSum={order.ordersTotalAmountSum}
                      type={TransactionType.BUY}
                    />
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  private calculateOrderDifference = (): string => {
    const { sellOrders, buyOrders } = this.props.orderBookData
    if (!sellOrders || !buyOrders) {
      return '--'
    }

    const { length: sellOrdersLength } = sellOrders
    const { length: buyOrdersLength } = buyOrders
    if (sellOrdersLength === 0 || buyOrdersLength === 0) {
      return '--'
    }

    const { price: lowSellPrice } = sellOrders[sellOrdersLength - 1]
    const { price: highBuyPrice } = buyOrders[0]
    return lowSellPrice.minus(highBuyPrice).toFixed(5)
  }
}

export interface Props {
  orderBookData: OrderBook
  token: string
}

interface State {
  isMobile: boolean
  tooltipOpen: boolean
}

export default OrderBookChartContainer
