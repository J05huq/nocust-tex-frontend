import React from 'react'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Table } from 'reactstrap'
import { Trans } from 'react-i18next'
import CanceBtn from '../../assets/images/x-button.svg'
import { TransactionStateType, StoredTransaction } from '../../state/transaction'

interface Props {
  transactions: Array<StoredTransaction>
  sortTransactions: (field: string) => void
  requestCancelSwap: (flag: boolean, id: number) => void
  sortField: string
  type: string
}

interface State {
  sortColumn: string
  sortDir: string[]
  transactionArr: any
}

export default class TransactionTableContainer extends React.Component<Props, State> {
  private columns = ['Date', 'Type', 'State', 'Expiry', 'Pair', 'Amount', 'Price']
  state: State = {
    sortColumn: '',
    sortDir: [],
    transactionArr: this.props.transactions,
  }
  public render() {
    const { transactions } = this.props
    let columnHeads = this.columns
    if (this.props.type === 'closed') {
      columnHeads = columnHeads.filter(head => head !== 'Expiry')
    }
    return (
      <div className={'transaction-table-container'}>
        {transactions !== undefined && transactions.length > 0 ? (
          <>
            <Table className={this.props.type === 'closed' ? 'closed-tbale' : ''}>
              <thead>
                <tr>
                  {transactions !== undefined &&
                    transactions.length > 0 &&
                    columnHeads.map((column, index) => {
                      return (
                        <th
                          key={index}
                          onClick={() => this.props.sortTransactions(column.toLowerCase())}
                        >
                          {column.charAt(0).toUpperCase() + column.slice(1)}{' '}
                          {this.props.sortField === column.toLowerCase() && this.dirIcon(index)}
                        </th>
                      )
                    })}
                </tr>
              </thead>
            </Table>
            <Overflow>
              <Table striped className={this.props.type === 'closed' ? 'closed-tbale' : ''}>
                <tbody>
                  <TransitionGroup component={null}>
                    {transactions.length !== 0 &&
                      transactions.map(row => {
                        const trClassName =
                          row.type && row.type.toLowerCase() === 'buy' ? 'buy' : 'sell'

                        return (
                          <CSSTransition
                            key={row.id}
                            timeout={{ enter: 500, exit: 150 }}
                            classNames={'fade'}
                          >
                            <tr key={row.id} className={trClassName}>
                              <td>{row.date}</td>
                              <td>{row.type ? row.type : 'unknown'}</td>
                              {<td style={{ textTransform: 'capitalize' }}>{row.status}</td>}
                              {row.status === 'pending' && <td>{row.expiry + ' days'}</td>}
                              <td>{row.pair}</td>
                              <td>{`${row.amount.toFixed(5)} ${row.baseAsset}`}</td>
                              <td>
                                {`${row.price.toFixed(5)} ${row.quoteAsset}`}
                                {row.status === TransactionStateType.PENDING ? (
                                  <CancelButton
                                    onClick={() => this.props.requestCancelSwap(true, row.id)}
                                  >
                                    <img src={CanceBtn} alt="" />
                                  </CancelButton>
                                ) : (
                                  ''
                                )}
                              </td>
                            </tr>
                          </CSSTransition>
                        )
                      })}
                  </TransitionGroup>
                </tbody>
              </Table>
            </Overflow>
          </>
        ) : (
          <div className={'no-matching-text'}>
            <i className="fas fa-history" />
            {this.props.type === 'open' ? (
              <span>
                <Trans i18nKey={'transactions_no_order_open'} />
              </span>
            ) : (
              <span>
                <Trans i18nKey={'transactions_no_order_closed'} />
              </span>
            )}
          </div>
        )}
      </div>
    )
  }

  private dirIcon = (index): any => {
    if (this.state.sortDir[index] === undefined) {
      return <i className="fa fa-sort" aria-hidden="true" />
    } else if (this.state.sortDir[index] === 'asc') {
      return <i className="fa fa-sort-up" aria-hidden="true" />
    } else if (this.state.sortDir[index] === 'desc') {
      return <i className="fa fa-sort-down" aria-hidden="true" />
    }
  }
}

const Overflow = styled.div`
  max-height: calc(100% - 20px);
  overflow-y: auto;
  overflow-x: hidden;
`

const CancelButton = styled.button`
  float: right;
  background: none;
  box-shadow: none;
  outline: none !important;
  border: 0;
  cursor: pointer;
  img {
    width: 18px;
  }
`
