import produce from 'immer'

import { Action, GetState } from './index'
import { fetchBalance, fetchOnChainBalance } from './balance'
import { setIntervalImmediate, clearIntervals } from '../utils'
import { fetchOrderBook } from './orderBook'
import { fetchTransactions } from './transaction'
import { fetchTradeHistory } from './tradeHistory'
import { getWalletAddress, getIsRegistered } from './wallet'
import { fetchTickers } from './header'
import { getTokenList, routeChecker, setupTrading } from './hub'
import { createNocustManager } from '../services/nocustManager'

export interface DashboardState {
  isLoading: Boolean
  loadingText: String
  chartTab: ChartTab
}

export enum ChartTab {
  DEPTH_CHART_TAB = 'DEPTH_CHART_TAB',
  PRICE_CHART_TAB = 'PRICE_CHART_TAB',
}

export const initialState: DashboardState = {
  isLoading: false,
  loadingText: 'Loading...',
  chartTab: ChartTab.PRICE_CHART_TAB,
}

// ACTION TYPES
const SET_DASHBOARD_LOADING = 'SET_DASHBOARD_LOADING'
const SET_CHART_TAB = 'SET_CHART_TAB'

// ACTION CREATORS
export const setDashboardLoading = (isActive: Boolean, text?: String): Action => ({
  type: SET_DASHBOARD_LOADING,
  payload: { isActive, text },
})

export const setChartTab = (chartTab: ChartTab): Action => ({
  type: SET_CHART_TAB,
  payload: chartTab,
})

// REDUCER
export default (state: DashboardState = initialState, action: Action): DashboardState =>
  produce(state, (draft: DashboardState) => {
    switch (action.type) {
      case SET_DASHBOARD_LOADING:
        const { isActive, text } = action.payload
        draft.isLoading = isActive
        draft.loadingText = text || draft.loadingText
        break
      case SET_CHART_TAB:
        draft.chartTab = action.payload
        break
    }
  })

// THUNKS
export const fetchPeriodicData = () => {
  return async (dispatch: Function, getState: GetState) => {
    createNocustManager()
    const walletAddress = getWalletAddress(getState())
    const tokens = await dispatch(getTokenList())
    const isRegistered = getIsRegistered(getState())
    if (tokens) {
      dispatch(routeChecker())
      try {
        clearIntervals()
        setIntervalImmediate(() => dispatch(fetchTickers()), 5 * 1000)
        setIntervalImmediate(() => dispatch(fetchOrderBook()), 5 * 1000)
        setIntervalImmediate(() => dispatch(fetchTradeHistory()), 3 * 1000)
        setIntervalImmediate(() => dispatch(fetchTransactions()), 5 * 1000)
        if (isRegistered && walletAddress) {
          dispatch(setupTrading())
          setIntervalImmediate(() => dispatch(fetchBalance()), 5 * 1000)
          setIntervalImmediate(() => dispatch(fetchOnChainBalance()), 100 * 1000)
        }
      } catch (err) {
        console.log('err', err)
      }
    }
  }
}
