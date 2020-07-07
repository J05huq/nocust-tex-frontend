import { Action, GetState } from '../index'
import { getHeaderTokensList } from '../header'
import { nocust } from 'nocust-client'
import helpers from './helpers'
import { getWalletAddress } from '../wallet'
import BigNumber from 'bignumber.js'
import { toggleCancelSwapModal } from '../modal'
import { getCurrentHubTokens } from '../hub'
import { toast } from 'react-toastify'
import { MyOrder } from 'nocust-client/dist/nocust/getMyOrders'

export interface StoredTransaction {
  txId: string
  id: number
  date: string
  pair: string
  time: number
  baseTokenAddress: string
  quoteTokenAddress: string
  amount: BigNumber
  price: BigNumber
  status: string
  eon: number
  type?: string
  expiry?: number
  baseAsset: string
  quoteAsset: string
}

export enum TransactionTabs {
  OPEN_TAB = 'OPEN_TAB',
  CLOSED_TAB = 'CLOSED_TAB',
}
// SHAPE
export interface TransactionState {
  transactionsLoading: boolean
  transactions: StoredTransaction[]
  error: string
  activeTab: TransactionTabs
  fetchPendingTransactionsRunning: boolean
  fetchTransactionsRunning: boolean
  sortField: string
  isSortAsc: boolean
  cancelSwapTxId: number
  cancelSwapLoading: boolean
}

export const initialState: TransactionState = {
  transactionsLoading: true,
  transactions: [],
  error: '',
  fetchPendingTransactionsRunning: false,
  fetchTransactionsRunning: false,
  activeTab: TransactionTabs.OPEN_TAB,
  sortField: 'date',
  isSortAsc: false,
  cancelSwapTxId: 0,
  cancelSwapLoading: false,
}

// ACTION TYPES
const TRANSACTIONS_LOADING = 'TRANSACTIONS_LOADING'
const SET_TRANSACTIONS = 'SET_TRANSACTIONS'
const SYNC_SWAP_RUNNING = 'SYNC_SWAP_RUNNING'
const FETCH_TRANSACTIONS_RUNNING = 'FETCH_TRANSACTIONS_RUNNING'
const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB'
const SORT_TRANSACTIONS_TABLE = 'SORT_TRANSACTIONS_TABLE'
const SET_CANCEL_SWAP_TXID = 'SET_CANCEL_SWAP_TXID'
const SET_CANCEL_SWAP_LOADING = 'SET_CANCEL_SWAP_LOADING'

// ACTION CREATORS
export const istransactionsLoading = () => ({ type: TRANSACTIONS_LOADING })

export const setTransactions = (data: StoredTransaction[]): Action => ({
  type: SET_TRANSACTIONS,
  payload: data,
})

export const setSyncSwapRunning = (flag: boolean): Action => ({
  type: SYNC_SWAP_RUNNING,
  payload: flag,
})

export const setfetchTransactionsRunning = (flag: boolean): Action => ({
  type: FETCH_TRANSACTIONS_RUNNING,
  payload: flag,
})

export const setActiveTab = (tab: TransactionTabs): Action => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
})

export const sortTransactionsTable = (field: string) => ({
  type: SORT_TRANSACTIONS_TABLE,
  payload: field,
})

export const setCancelSwapTxId = (id: number) => ({
  type: SET_CANCEL_SWAP_TXID,
  payload: id,
})

export const setCancelSwapLoading = (flag: boolean) => ({
  type: SET_CANCEL_SWAP_LOADING,
  payload: flag,
})

// REDUCER
export default function reducer(
  state: TransactionState = initialState,
  action: Action,
): TransactionState {
  const newState = { ...state }

  switch (action.type) {
    case TRANSACTIONS_LOADING:
      newState.transactionsLoading = true
      return newState

    case SET_TRANSACTIONS:
      newState.transactions = helpers.sortTransactions(
        state.sortField,
        state.isSortAsc,
        action.payload,
      )
      newState.transactionsLoading = false
      return newState

    case SYNC_SWAP_RUNNING:
      newState.fetchPendingTransactionsRunning = action.payload
      return newState

    case FETCH_TRANSACTIONS_RUNNING:
      newState.fetchTransactionsRunning = action.payload
      return newState

    case SET_ACTIVE_TAB:
      newState.activeTab = action.payload
      return newState

    case SORT_TRANSACTIONS_TABLE:
      newState.isSortAsc = !state.isSortAsc
      newState.sortField = action.payload
      newState.transactions = helpers.sortTransactions(
        action.payload,
        newState.isSortAsc,
        state.transactions,
      )
      return newState

    case SET_CANCEL_SWAP_TXID:
      newState.cancelSwapTxId = action.payload
      return newState

    case SET_CANCEL_SWAP_LOADING:
      newState.cancelSwapLoading = action.payload
      return newState

    default:
      return state
  }
}

export enum TransactionType {
  BUY = 'buy',
  DEPOSIT = 'deposit',
  SELL = 'sell',
  WITHDRAW = 'withdraw',
}

export enum TransactionStateType {
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  OPEN = 'open',
  PENDING = 'pending',
}

// THUNK
export const fetchTransactions = () => {
  return async (dispatch, getState: GetState) => {
    try {
      const hubTokens = getCurrentHubTokens(getState())
      const tokenPair = getHeaderTokensList(getState())
      const leftTokenAddress = hubTokens[tokenPair[0]]
      const rightTokenAddress = hubTokens[tokenPair[1]]

      const walletAddress = getWalletAddress(getState())
      const rawTransferList: MyOrder[] = walletAddress
        ? await nocust.getMyOrders(walletAddress, leftTokenAddress, rightTokenAddress)
        : []

      if (Array.isArray(rawTransferList) && rawTransferList.length > 0) {
        const transactions: StoredTransaction[] = rawTransferList.map((transfer: any) =>
          helpers.buildTransaction(hubTokens, transfer),
        )

        dispatch(setTransactions(transactions))
      } else {
        dispatch(setTransactions([]))
      }
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(setfetchTransactionsRunning(false))
    }
  }
}

export const cancelSwap = () => {
  return async (dispatch, getState: GetState) => {
    dispatch(setCancelSwapLoading(true))
    try {
      const { cancelSwapTxId } = getState().transaction
      const walletAddress = getWalletAddress(getState())
      await nocust.cancelOrder(walletAddress, cancelSwapTxId)
      dispatch(fetchTransactions())
      toast.success('Swap has been canceled successfully')
    } catch (err) {
      console.log('TCL: err', err)
      toast.error('Swap cancellation failed')
    } finally {
      dispatch(setCancelSwapLoading(false))
      dispatch(toggleCancelSwapModal(false))
    }
  }
}
