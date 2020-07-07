import produce from 'immer'
import { nocust } from 'nocust-client'
import { Action, AppState, GetState } from './index'
import { SwapTransactionType } from './history'
import { getHeaderTokensList } from './header'
import { mapOrders } from '../services/orderBook'
import { getCurrentHubTokens, fetchHubState, HubStateType } from './hub'

// SHAPE
export interface OrderBookState {
  isLoading: boolean
  orderBookData: any
  error: string
  decimals: number
}

export const initialState: OrderBookState = {
  isLoading: false,
  orderBookData: {},
  error: '',
  decimals: 6,
}

// SELECTORS
export const isOrderBookLoading = (state: AppState) => state.orderBook.isLoading

// ACTION TYPES
const SET_ORDERBOOK_LOADING_STATE = 'SET_ORDERBOOK_LOADING_STATE'
const SUCCESS_FETCH_ORDER_BOOK_DATA = 'SUCCESS_FETCH_ORDER_BOOK_DATA'
const FAILED_FETCH_ORDER_BOOK_DATA = 'FAILED_FETCH_ORDER_BOOK_DATA'
const SET_NUMBER_OF_DECIMALS = 'SET_NUMBER_OF_DECIMALS'

// ACTION CREATORS
export const setOrderBookLoadingState = (value: boolean): Action => ({
  type: SET_ORDERBOOK_LOADING_STATE,
  payload: value,
})

export const successFetchOrderBookData = (data): Action => ({
  type: SUCCESS_FETCH_ORDER_BOOK_DATA,
  payload: data,
})

export const failedFetchOrderBookData = (error): Action => ({
  type: FAILED_FETCH_ORDER_BOOK_DATA,
  payload: error,
})

export const setNumberOfDecimals = (number: number): Action => ({
  type: SET_NUMBER_OF_DECIMALS,
  payload: number,
})

// REDUCER
export default (state: OrderBookState = initialState, action: Action): OrderBookState =>
  produce(state, (draft: OrderBookState) => {
    switch (action.type) {
      case SET_ORDERBOOK_LOADING_STATE:
        draft.isLoading = action.payload
        break

      case SUCCESS_FETCH_ORDER_BOOK_DATA:
        draft.orderBookData = action.payload
        break

      case FAILED_FETCH_ORDER_BOOK_DATA:
        draft.error = action.payload
        break

      case SET_NUMBER_OF_DECIMALS:
        draft.decimals = action.payload
        break
    }
  })

// THUNKS
export const fetchOrderBook = () => async (dispatch, getState: GetState) => {
  dispatch(setOrderBookLoadingState(true))
  try {
    const [leftToken, rightToken] = getHeaderTokensList(getState())
    const hubTokens = getCurrentHubTokens(getState())
    // eslint-disable-next-line
    const { buyOrders, sellOrders } = await nocust.getOrderBook(
      hubTokens[leftToken],
      hubTokens[rightToken],
    )
    dispatch(fetchHubState(HubStateType.SAFE))
    const mappedBuyOrders = mapOrders(buyOrders)
    const mappedSellOrders = mapOrders(sellOrders)

    dispatch(
      successFetchOrderBookData({ buyOrders: mappedBuyOrders, sellOrders: mappedSellOrders }),
    )
  } catch (error) {
    dispatch(failedFetchOrderBookData(error))
    console.log('orderbook', error)
  } finally {
    dispatch(setOrderBookLoadingState(false))
  }
}

export interface OrderBook {
  buyOrders: Array<SwapTransactionType>
  sellOrders: Array<SwapTransactionType>
}
