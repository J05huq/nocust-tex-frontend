import produce from 'immer'
import BigNumber from 'bignumber.js'
import { Action, GetState } from './index'
import { TransactionType } from './transaction'
import { getHeaderTokensList } from './header'
import { getCurrentHubTokens } from './hub'
import helpers from './transaction/helpers'
import { uniqueArray, isSameHexValue } from '../utils'
import { nocust } from 'nocust-client'

// SHAPE
export interface TradeHistoryTransaction {
  price: BigNumber
  date: Date
  amount: BigNumber
  orderType: TransactionType
}
export interface TradeHistoryState {
  tradeHistoryTransactions: Array<TradeHistoryTransaction>
  isLoading: boolean
  dataLoaded: boolean
  isSortAsc: boolean
  sortField: string
}

export const initialState: TradeHistoryState = {
  tradeHistoryTransactions: [],
  isLoading: false,
  dataLoaded: false,
  isSortAsc: false,
  sortField: 'date',
}

// SELECTORS

// ACTION TYPES
const SET_TRADE_HISTORY_TRANSACTIONS = 'SET_TRADE_HISTORY_TRANSACTIONS'
const SET_LOADING = 'SET_LOADING'
const SET_DATA_LOADED = 'SET_DATA_LOADED'
const SET_TRADE_HISTORY_SORT = 'SET_TRADE_HISTORY_SORT'

// ACTION CREATORS
export const setTradeHistoryTransactions = (data: Array<TradeHistoryTransaction>) => ({
  type: SET_TRADE_HISTORY_TRANSACTIONS,
  payload: data,
})

export const setLoading = (flag: boolean) => ({
  type: SET_LOADING,
  payload: flag,
})

export const setDataLoaded = (flag: boolean) => ({
  type: SET_DATA_LOADED,
  payload: flag,
})

export const setTradeHistorySorting = (string: string) => ({
  type: SET_TRADE_HISTORY_SORT,
  payload: string,
})

// REDUCER
export default (state: TradeHistoryState = initialState, action: Action): TradeHistoryState =>
  produce(state, (draft: TradeHistoryState) => {
    switch (action.type) {
      case SET_TRADE_HISTORY_TRANSACTIONS:
        draft.tradeHistoryTransactions = action.payload
        break
      case SET_LOADING:
        draft.isLoading = action.payload
        break
      case SET_DATA_LOADED:
        draft.dataLoaded = action.payload
        break
      case SET_TRADE_HISTORY_SORT:
        draft.isSortAsc = !state.isSortAsc
        draft.sortField = action.payload
        draft.tradeHistoryTransactions = helpers.sortTransactions(
          action.payload,
          draft.isSortAsc,
          state.tradeHistoryTransactions,
        )
        return draft
    }
  })

// THUNKS
export const fetchTradeHistory = () => async (dispatch, getState: GetState) => {
  dispatch(setLoading(true))
  try {
    const tokenPair = getHeaderTokensList(getState())
    const hubTokens = getCurrentHubTokens(getState())
    const leftTokenAddress = hubTokens[tokenPair[0]]
    const transactionsList = await nocust.getTransfers({
      offset: 0,
      limit: 50,
      ordering: '-time',
      swap: true,
    })

    if (transactionsList.length === 0) return
    const uniqueTransactions = uniqueArray(transactionsList, item => item.txId)
    let tradeHistoryTransactions: TradeHistoryTransaction[] = []
    uniqueTransactions.forEach(transaction => {
      const { amount, amountSwapped, sender, time } = transaction
      const amountBN = new BigNumber(amount).shiftedBy(-18)
      const amountSwappedBN = new BigNumber(amountSwapped).shiftedBy(-18)
      const orderType = isSameHexValue(sender.token, leftTokenAddress)
        ? TransactionType.SELL
        : TransactionType.BUY
      const isBuy = orderType === TransactionType.BUY
      const price = isBuy
        ? amountBN.dividedBy(amountSwappedBN)
        : amountSwappedBN.dividedBy(amountBN)
      const transactionAmount = isBuy ? amountSwappedBN : amountBN
      const date = new Date(new Date(0).setUTCSeconds(time))
      const transactionObj = { price, amount: transactionAmount, date, orderType }
      tradeHistoryTransactions.push(transactionObj)
    })
    tradeHistoryTransactions = helpers.sortTransactions(
      'date',
      getState().tradeHistory.isSortAsc,
      tradeHistoryTransactions,
    )
    dispatch(setTradeHistoryTransactions(tradeHistoryTransactions))
  } catch (error) {
    console.log('TCL: fetchTradeHistory -> error', error)
  } finally {
    dispatch(setDataLoaded(true))
    dispatch(setLoading(false))
  }
}
