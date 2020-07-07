import produce from 'immer'
import BigNumber from 'bignumber.js'

import { Action, AppState, GetState } from './index'
import { NUMBER_OF_DECIMALS } from '../constants'
import { fetchOrderBook } from './orderBook'
import { sleep } from '../utils'
import { TransactionType } from './transaction'
import { getCurrentHubTokens } from './hub'

export interface SwapTransactionType {
  token1: string
  amount: BigNumber
  token2: string
  amountSwapped: BigNumber
  amountPrimary: BigNumber
  totalAmount: BigNumber
  ordersTotalAmountSum: BigNumber
  chance: string
  price: BigNumber
  round: number
  type?: TransactionType
}

// SHAPE
export interface HistoryState {
  isLoading: boolean
  history: SwapTransactionType[]
}

export const initialState: HistoryState = {
  isLoading: false,
  history: [],
}

// SELECTORS
export const isHistoryLoading = (state: AppState) => state.history.isLoading
export const getHistory = (state: AppState) => state.history.history

// ACTION TYPES
const SET_HISTORY_LOADING_STATE = 'SET_HISTORY_LOADING_STATE'
const SUCCESS_FETCH_HISTORY = 'SUCCESS_FETCH_HISTORY'
const FAILED_FETCH_HISTORY = 'FAILED_FETCH_HISTORY'
const NEW_TRADE_MATCHED_HISTORY = 'NEW_TRADE_MATCHED_HISTORY'

// ACTION CREATORS
export const setHistoryLoadingState = (state: boolean): Action => ({
  type: SET_HISTORY_LOADING_STATE,
  payload: state,
})

export const successFetchHistory = data => ({ type: SUCCESS_FETCH_HISTORY, payload: data })

export const failedFetchHistory = error => ({ type: FAILED_FETCH_HISTORY, payload: error })

export const newTradeMatchedHistory = data => ({
  type: NEW_TRADE_MATCHED_HISTORY,
  payload: data,
})

// THUNKS
// TODO This is not connected with changing app state and should be moved to services
const getSwapWebSocket = (
  leftToken: string,
  rightToken: string,
  handler: (t: SwapTransactionType) => void,
): WebSocket => {
  const ws = new WebSocket('wss://rinkeby.liquidity.network/sync/swaps/')
  ws.addEventListener('message', (event: MessageEvent & { data: string }) => {
    const data: any = JSON.parse(event.data).message.data
    data !== undefined &&
      handler({
        token1: leftToken,
        // @ts-ignore
        amount1: new BigNumber(data.amount).shiftedBy(-1 * NUMBER_OF_DECIMALS),
        token2: rightToken,
        amount2: new BigNumber(data.amount_swapped).shiftedBy(-1 * NUMBER_OF_DECIMALS),
        chance: '0',
        // @ts-ignore
        round: data.round,
      })
  })
  ws.addEventListener('open', () =>
    ws.send(
      JSON.stringify({
        action: 'subscribe',
        swaps: [`${leftToken}${rightToken}`],
      }),
    ),
  )
  ws.addEventListener('close', async () => {
    await sleep(500)
    getSwapWebSocket(leftToken, rightToken, handler)
  })
  return ws
}

export const fetchHistory = (leftToken: string, rightToken: string) => async (
  dispatch: Function,
  getState: GetState,
) => {
  dispatch(setHistoryLoadingState(true))
  const hubTokens = getCurrentHubTokens(getState())
  try {
    // TODO: past orders should be fetched, server doesn't have this feature for now

    getSwapWebSocket(hubTokens[leftToken], hubTokens[rightToken], () => dispatch(fetchOrderBook()))
    getSwapWebSocket(hubTokens[rightToken], hubTokens[leftToken], () => dispatch(fetchOrderBook()))
  } catch (error) {
    console.error(error)
    dispatch(failedFetchHistory(error))
  } finally {
    dispatch(setHistoryLoadingState(false))
  }
}

// REDUCER
export default (state: HistoryState = initialState, action: Action): HistoryState =>
  produce(state, (draft: HistoryState) => {
    switch (action.type) {
      case SET_HISTORY_LOADING_STATE:
        draft.isLoading = action.payload
        break

      case SUCCESS_FETCH_HISTORY:
        draft.history = action.payload
        break

      case FAILED_FETCH_HISTORY:
        draft.history = []
        break

      case NEW_TRADE_MATCHED_HISTORY:
        draft.history = [action.payload, ...state.history]
        break
    }
  })
