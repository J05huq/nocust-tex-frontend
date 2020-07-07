import produce from 'immer'
import Axios from 'axios'
import { AppState, Action, GetState } from './index'
import { fSymbolToMainSymbol, pairToTokens } from '../utils'
import hubs from '../services/hubs'

interface Ticker {
  marketId: string
  price: string
  volume: string
  bid: string
  ask: string
  low: string
  high: string
  updatedAt: number
}

// SHAPE
export interface HeaderState {
  isLoading: boolean
  language: string
  seedPhrase: string
  selectedAccountType: string
  token: string
  disabledMenu: boolean
  ticker: null | Ticker
}

export const initialState: HeaderState = {
  isLoading: false,
  language: 'en',
  selectedAccountType: 'create_wallet',
  seedPhrase: localStorage.getItem('seed_phrase') || '',
  token: localStorage.getItem('current_pair') || 'fLQD-fETH',
  disabledMenu: false,
  ticker: null,
}

// SELECTORS
export const isHeaderLoading = (state: AppState) => state.header.isLoading
export const getHeaderTokenPair = (state: AppState) => state.header.token
export const getHeaderTokensList = (state: AppState) => {
  const { token } = state.header
  const fTokens = pairToTokens(token)
  return fTokens.map(fToken => fSymbolToMainSymbol(fToken))
}

export const isMenuDisabled = (state: AppState) => state.header.disabledMenu

// ACTION TYPES
const SET_HEADER_LOADING_STATE = 'SET_HEADER_LOADING_STATE'
const SET_LANGUAGE = 'SET_LANGUAGE'
const SET_SEED_PHRASE = 'SET_SEED_PHRASE'
const SET_SELECTED_ACCOUNT_TYPE = 'SET_SELECTED_ACCOUNT_TYPE'
const CHANGE_SEED_PHRASE = 'CHANGE_SEED_PHRASE'
const SET_TOKEN = 'SET_TOKEN'
const SET_DISABLED_MENU = 'SET_DISABLED_MENU'
const SET_TICKER = 'SET_TICKERS'

// ACTION CREATORS
export const setHeaderLoadingState = (state: boolean): Action => ({
  type: SET_HEADER_LOADING_STATE,
  payload: state,
})

export const setDisabledMenu = (state: boolean): Action => ({
  type: SET_DISABLED_MENU,
  payload: state,
})

export const setLanguage = (language: string) => ({ type: SET_LANGUAGE, payload: language })

export const setSeedPhrase = (seedPhrase: string) => ({
  type: SET_SEED_PHRASE,
  payload: seedPhrase,
})

export const changeSelectedAccountType = (accountType: string) => ({
  type: SET_SELECTED_ACCOUNT_TYPE,
  payload: accountType,
})

export const changeSeedPhrase = (seedPhrase: string) => ({
  type: CHANGE_SEED_PHRASE,
  payload: seedPhrase,
})

export const setToken = (token: string): Action => ({ type: SET_TOKEN, payload: token })

export const setTicker = (data: Ticker): Action => ({ type: SET_TICKER, payload: data })

// REDUCER
export default (state: HeaderState = initialState, action: Action): HeaderState =>
  produce(state, (draft: HeaderState) => {
    switch (action.type) {
      case SET_HEADER_LOADING_STATE:
        draft.isLoading = action.payload
        break

      case SET_LANGUAGE:
        draft.language = action.payload
        break

      case SET_SEED_PHRASE:
        draft.seedPhrase = action.payload
        localStorage.setItem('seed_phrase', action.payload)
        break

      case SET_SELECTED_ACCOUNT_TYPE:
        draft.selectedAccountType = action.payload
        break

      case CHANGE_SEED_PHRASE:
        draft.seedPhrase = action.payload
        break

      case SET_TOKEN:
        draft.token = action.payload
        localStorage.setItem('current_pair', action.payload)
        break
      case SET_DISABLED_MENU:
        draft.disabledMenu = action.payload
        break
      case SET_TICKER:
        draft.ticker = action.payload
        break
    }
  })

export const fetchTickers = () => async (dispatch: Function, getState: GetState) => {
  try {
    const { currentHub } = getState().hub
    const { token } = getState().header
    const tickersURL = `${hubs[currentHub].tradingDataUrl}/tickers`
    const tickersResponse = await Axios.get(tickersURL)
    const tickersData = tickersResponse.data
    const ticker = tickersData.find((ticker: Ticker) => ticker.marketId === token)
    dispatch(setTicker(ticker))
  } catch (error) {
    console.log(error)
  }
}
