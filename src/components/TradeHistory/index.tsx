import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../../state'
import { Trans } from 'react-i18next'
import { TradeHistoryState } from '../../state/tradeHistory'
import { TransactionType } from '../../state/transaction'
import { format } from 'date-fns'
import Loading from '../../ui/LoadingSpinner'

interface Props {
  state: AppState
  tradeHistoryState: TradeHistoryState
}

interface PriceTDType {
  sell?: boolean
}

class TradeHistoryContainer extends React.Component<Props & { dispatch }, {}> {
  render() {
    const { tradeHistoryTransactions, isLoading, dataLoaded } = this.props.tradeHistoryState
    const dates: string[] = []
    return (
      <Container>
        <Title>
          <Trans i18nKey={'trade_history'} />
        </Title>
        {isLoading && !dataLoaded ? (
          <LoaderContainer>
            <Loading />
          </LoaderContainer>
        ) : (
          <>
            <TableDiv>
              <Table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
              </Table>
            </TableDiv>
            <TableDiv>
              <Table>
                <tbody>
                  {tradeHistoryTransactions.map((transaction, index) => {
                    const date: any = format(transaction.date, 'MM/DD')
                    if (dates.includes(date)) {
                      return (
                        <tr key={index}>
                          <DateTD>{format(transaction.date, 'h:mm A')}</DateTD>
                          <PriceTD sell={transaction.orderType === TransactionType.SELL}>
                            {transaction.orderType === TransactionType.SELL ? (
                              <React.Fragment>
                                {transaction.price.toFixed(5)} <i className="fa fa-arrow-up"></i>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                {transaction.price.toFixed(5)} <i className="fa fa-arrow-down"></i>
                              </React.Fragment>
                            )}
                          </PriceTD>
                          <Amount>{transaction.amount.toFixed(7)}</Amount>
                        </tr>
                      )
                    } else {
                      dates.push(date)
                      return (
                        <React.Fragment key={index}>
                          <tr>
                            <DateFullRow colSpan={3}>
                              {format(transaction.date, 'MMMM DD, YYYY')}
                            </DateFullRow>
                          </tr>
                          <tr>
                            <DateTD>{format(transaction.date, 'h:mm A')}</DateTD>
                            <PriceTD sell={transaction.orderType === TransactionType.SELL}>
                              {transaction.orderType === TransactionType.SELL ? (
                                <React.Fragment>
                                  {transaction.price.toFixed(5)} <i className="fa fa-arrow-up"></i>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  {transaction.price.toFixed(5)}{' '}
                                  <i className="fa fa-arrow-down"></i>
                                </React.Fragment>
                              )}
                            </PriceTD>
                            <Amount>{transaction.amount.toPrecision(3)}</Amount>
                          </tr>
                        </React.Fragment>
                      )
                    }
                  })}
                </tbody>
              </Table>
            </TableDiv>
          </>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (app: AppState): Props => ({
  state: app,
  tradeHistoryState: app.tradeHistory,
})

export default connect(mapStateToProps)(TradeHistoryContainer)

const Container = styled.div`
  position: relative;
  background-color: #1e1a3a;
`

const Title = styled.div`
  padding: 10px 12px 0px;
`

const TableDiv = styled.div`
  width: 100%;
  max-height: calc(100% - 70px);
  overflow: auto;
  padding: 10px 0px 0px 10px;

  thead {
    th {
      color: #adbbcd;
      font-size: 13px;
    }
    th:nth-child(1) {
      width: 40% !important;
    }
    th:nth-child(2) {
      width: 30% !important;
      text-align: center;
    }
    th:nth-child(3) {
      width: 30% !important;
      text-align: right;
      padding-right: 10px;
    }
  }

  tbody {
    color: #adbbcd;
    tr {
      &:hover {
        background: #252046;
      }
      td {
        font-size: 12px;
      }
      td:nth-child(1) {
        width: 40% !important;
      }
      td:nth-child(2) {
        width: 30% !important;
        text-align: center;
      }
      td:nth-child(3) {
        width: 30% !important;
        text-align: right;
      }
    }
  }
`
const Table = styled.table`
  width: 100%;
`

const PriceTD = styled.td<PriceTDType>`
  color: ${props => (props.sell ? '#02a177' : '#ae3d43')};
  i.rotate {
    transform: rotate('180deg');
  }
`

const DateTD = styled.td`
  font-size: 11px;
`

const LoaderContainer = styled.div`
  position: relative;
  top: 35%;
`
const Amount = styled.td`
  font-size: 11px;
`

const DateFullRow = styled.td`
  font-size: 12px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #525e80;
`
