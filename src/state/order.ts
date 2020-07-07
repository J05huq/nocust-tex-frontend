import produce from 'immer'
import { nocust } from 'nocust-client'
import { toast } from 'react-toastify'
import { Action, GetState } from './index'
import { getWalletAddress } from './wallet'
import { setDashboardLoading } from './dashboard'
import { fetchOrderBook } from './orderBook'
import { fetchTransactions } from './transaction'
import * as Sentry from '@sentry/browser'
import { BigNumber } from 'bignumber.js'
import { getCurrentHubTokens } from './hub'
import { getHeaderTokensList } from './header'

export enum OrderType {
  BUY = 'buy_order',
  SELL = 'sell_order',
}

export enum swapType {
  BUY = 'BUY',
  SELL = 'SELL',
}

// SHAPE
export interface OrderState {
  incomingOrder: {
    price: string
    amount: string
  }
  fiatPrice: string
  fiatAmount: string
  currentTabId: string
}

export const initialState: OrderState = {
  incomingOrder: { price: '', amount: '' },
  fiatPrice: '0',
  fiatAmount: '0',
  currentTabId: OrderType.BUY,
}

// SELECTORS

// ACTION TYPES
const CHANGE_TAB = 'CHANGE_TAB'
const SET_INCOMING_ORDER = 'SET_INCOMING_ORDER'
const SET_FIAT_PRICE = 'SET_FIAT_PRICE'
const SET_FIAT_AMOUNT = 'SET_FIAT_AMOUNT'
// ACTION CREATORS
export const changeOrderTab = (data: string) => ({ type: CHANGE_TAB, payload: data })
export const setIncomingOrder = (data: { price: string; amount: string }) => ({
  type: SET_INCOMING_ORDER,
  payload: data,
})

export const setFiatPrice = (fiatPrice: string) => ({
  type: SET_FIAT_PRICE,
  payload: fiatPrice,
})

export const setFiatAmount = (fiatAmount: string) => ({
  type: SET_FIAT_AMOUNT,
  payload: fiatAmount,
})

// REDUCER
export default (state: OrderState = initialState, action: Action): OrderState =>
  produce(state, (draft: OrderState) => {
    switch (action.type) {
      case CHANGE_TAB:
        draft.currentTabId = action.payload
        break
      case SET_INCOMING_ORDER:
        draft.incomingOrder = action.payload
        break
      case SET_FIAT_PRICE:
        draft.fiatPrice = action.payload
        break
      case SET_FIAT_AMOUNT:
        draft.fiatAmount = action.payload
        break
    }
  })

// THUNKS
export const sendSwap = (amount: BigNumber, price: BigNumber, orderType: swapType) => async (
  dispatch: Function,
  getState: GetState,
) => {
  const walletAddress = getWalletAddress(getState())
  const hubTokens = getCurrentHubTokens(getState())
  const tokenPair = getHeaderTokensList(getState())
  try {
    dispatch(setDashboardLoading(true, 'Your Swap is in  progress...'))
    await nocust.addOrder({
      address: walletAddress,
      baseTokenAddress: hubTokens[tokenPair[0]],
      quoteTokenAddress: hubTokens[tokenPair[1]],
      amount,
      price,
      orderType,
    })
    toast.success('Swap added successfully')
    dispatch(fetchOrderBook())
    dispatch(fetchTransactions())
  } catch (err) {
    if (err.code === 'SWAP_LIMIT_REACHED_ERROR') {
      toast.error('Swap limit reached, you can have only 5 pending swaps')
    }
    console.log('walletAddress', walletAddress)
    console.log(err)
    Sentry.captureException(err)
  } finally {
    dispatch(setDashboardLoading(false))
  }
}
