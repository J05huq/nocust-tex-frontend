import { Action, GetState, AppState } from './index'
import Axios from 'axios'
import { nocust } from 'nocust-client'
import { createNocustManager } from '../services/nocustManager'
import { setIsRegistered, getWalletAddress } from './wallet'
import { setDashboardLoading, fetchPeriodicData } from './dashboard'
import hubs from '../services/hubs'
import history from '../services/history'
import { getHeaderTokenPair, setToken, getHeaderTokensList } from './header'
import { clearIntervals } from '../utils'
// import { GAS_PRICE, CHALLENGE_GAS_LIMIT } from '../constants'
// import { toggleChallengeModal } from './modal'

export enum HubStateType {
  LOADING = 'loading',
  SAFE = 'safe',
  UNSAFE = 'unsafe',
}

export enum HubNamesType {
  MAINNET = 'MAINNET',
  RINKEBY = 'RINKEBY',
  LIMBO = 'LIMBO',
}

export const HubNames = {
  MAINNET: 'Private TEX',
  RINKEBY: 'Rinkeby Test Network',
  LIMBO: 'Limbo Test Network',
}

// SHAPE
export interface HubState {
  safe: HubStateType
  tokens: Object
  currentHub: string
  hubName: string
  availablePairs: string[]
  connectionError: string | null
  isUpdateChallengeLoading: boolean
  integrityError: {
    walletAddress: string
    tokenAddress: string
  }

  tokensMetaData: { [token: string]: { fiatPrice: number } }
}

export const initialState: HubState = {
  safe: HubStateType.LOADING,
  tokens: {},
  currentHub: localStorage.getItem('current_hub') || HubNamesType.RINKEBY,
  hubName: localStorage.getItem('hub_name') || HubNames.RINKEBY,
  availablePairs: [],
  connectionError: null,
  isUpdateChallengeLoading: false,
  tokensMetaData: {},
  integrityError: {
    walletAddress: '',
    tokenAddress: '',
  },
}

// ACTION TYPES
const LOADING = 'LOADING_HUB_STATE'
const FETCH_HUB_STATE = 'FETCH_HUB_STATE'
const SET_TOKENS_ADDRESS = 'SET_TOKENS_ADDRESS'
const SET_CURRENT_HUB = 'SET_CURRENT_HUB'
const SET_AVAILABLE_PAIRS = 'SET_AVAILABLE_PAIRS'
const SET_CONNECTION_ERROR = 'SET_CONNECTION_ERROR'
const SET_UPDATE_CHALLENGE_LOADING = 'SET_UPDATE_CHALLENGE_LOADING'
const SET_STATE_INTEGRITY_ERROR = 'SET_STATE_INTEGRITY_ERROR'
const SET_TOKENS_META_DATA = 'SET_TOKENS_META_DATA'

// SELECTORS

export const getCurrentHubTokens = (state: AppState) => state.hub.tokens
export const getCurrentHub = (state: AppState) => state.hub.currentHub
export const getAvailablePairs = (state: AppState) => state.hub.availablePairs
export const getConnectionError = (state: AppState) => state.hub.connectionError
export const getIsUpdateChallengeLoading = (state: AppState) => state.hub.isUpdateChallengeLoading
export const getStateIntegrityError = (state: AppState) => state.hub.integrityError
export const getTokensMetaData = (state: AppState) => state.hub.tokensMetaData

// ACTION CREATORS
export const isLoading = () => ({ type: LOADING })

export const fetchHubState = (data: string): Action => ({
  type: FETCH_HUB_STATE,
  payload: data,
})

export const setHubTokens = (tokens: Object): Action => ({
  type: SET_TOKENS_ADDRESS,
  payload: tokens,
})

export const setCurrentHub = (hub: string): Action => ({
  type: SET_CURRENT_HUB,
  payload: hub,
})

export const setAvailablePairs = (pairs: string[]): Action => ({
  type: SET_AVAILABLE_PAIRS,
  payload: pairs,
})

export const setHubConnectionError = (flag: boolean): Action => ({
  type: SET_CONNECTION_ERROR,
  payload: flag,
})

export const setIsUpdateChallengeLoading = (flag: boolean): Action => ({
  type: SET_UPDATE_CHALLENGE_LOADING,
  payload: flag,
})

export const setStateIntegrityError = (data: Object): Action => ({
  type: SET_UPDATE_CHALLENGE_LOADING,
  payload: data,
})

export const setTokensMetaData = (data: Object): Action => ({
  type: SET_TOKENS_META_DATA,
  payload: data,
})

// REDUCER
export default function reducer(state: HubState = initialState, action: Action): HubState {
  const newState = { ...state }

  switch (action.type) {
    case LOADING:
      newState.safe = HubStateType.LOADING
      return newState
    case FETCH_HUB_STATE:
      newState.safe = action.payload
      return newState
    case SET_TOKENS_ADDRESS:
      newState.tokens = action.payload
      return newState
    case SET_CURRENT_HUB:
      newState.currentHub = action.payload
      newState.hubName = HubNames[action.payload]
      localStorage.setItem('current_hub', action.payload)
      localStorage.setItem('hub_name', HubNames[action.payload])
      return newState
    case SET_AVAILABLE_PAIRS:
      newState.availablePairs = action.payload
      return newState
    case SET_CONNECTION_ERROR:
      newState.connectionError = action.payload
      return newState
    case SET_UPDATE_CHALLENGE_LOADING:
      newState.isUpdateChallengeLoading = action.payload
      return newState
    case SET_STATE_INTEGRITY_ERROR:
      newState.integrityError = {
        walletAddress: action.payload.walletAddress,
        tokenAddress: action.payload.tokenAddress,
      }
      return newState
    case SET_TOKENS_META_DATA:
      newState.tokensMetaData = action.payload
      return newState
    default:
      return state
  }
}

// THUNKS

export const checkHubConnection = () => {
  return async (dispatch: Function, getState: GetState) => {}
}

export const getHubTokens = async () => {
  try {
    const tokens = await nocust.getSupportedTokens()
    return tokens
  } catch (err) {
    console.log(err)
  }
}

export const getTokenList = () => {
  return async (dispatch: Function, getState: GetState) => {
    const supportedTokens = await getHubTokens()
    if (!supportedTokens) return
    const { token } = getState().header
    const { currentHub } = getState().hub

    const tokenList = getHeaderTokensList(getState())

    if (hubs[currentHub].tradingDataUrl) {
      const marketsURL = `${hubs[currentHub].tradingDataUrl}/markets`
      const marketsResponse = await Axios.get(marketsURL)
      const marketsData = marketsResponse.data
      const market = marketsData.find((market: any) => market.id === token)
      const tokensData = {
        [market.baseAsset]: { fiatPrice: market.baseAssetFiatPrice },
        [market.quoteAsset]: { fiatPrice: market.quoteAssetFiatPrice },
      }
      dispatch(setTokensMetaData(tokensData))
    }
    const pairData: any = await Promise.all(
      tokenList.map((token: string) =>
        supportedTokens.find((item: any) => item.shortName === token),
      ),
    )

    const tokensObj = {
      [tokenList[0]]: pairData[0].address,
      [tokenList[1]]: pairData[1].address,
    }
    dispatch(setHubTokens(tokensObj))
    return tokensObj
  }
}

export const routeChecker = () => {
  return async (dispatch: Function, getState: GetState) => {
    const currentPair = getHeaderTokenPair(getState())
    const availablePairs = hubs[getCurrentHub(getState())].availablePairs
    dispatch(setAvailablePairs(availablePairs))
    if (!availablePairs.includes(currentPair)) {
      history.push('/exchange/trade/fLQD-fETH')
      dispatch(setToken(availablePairs[0]))
    }
  }
}

export const setupTrading = () => {
  return async (dispatch: Function, getState: GetState) => {
    try {
      console.log('dispatching setupTrading')
      const walletAddress = getWalletAddress(getState())
      const tokenPair = getHeaderTokensList(getState())
      const tokens = getCurrentHubTokens(getState())
      const baseTokenAddress = tokens[tokenPair[0]]
      const quoteTokenAddress = tokens[tokenPair[1]]
      await nocust.setupTrading(walletAddress, baseTokenAddress, quoteTokenAddress)
      console.log('setupTrading dispatched')
    } catch (error) {
      dispatch(setupTrading())
      console.log('error setup trading', error)
    }
  }
}

export const switchHubs = (hub: string) => {
  return async (dispatch: Function, getState: GetState) => {
    try {
      dispatch(setIsRegistered(false))
      clearIntervals()
      nocust.shutdown()
      dispatch(setDashboardLoading(true, 'Switching hub...'))
      localStorage.removeItem('is_registered')
      dispatch(setCurrentHub(hub))
      createNocustManager()
      dispatch(routeChecker())
      await dispatch(getTokenList())
    } catch (err) {
      console.log('hub switching!!', err)
    } finally {
      dispatch(fetchPeriodicData())
      dispatch(setDashboardLoading(false))
    }
  }
}

export const tokenSwitching = (pair: string, history: any) => {
  return async (dispatch: Function, getState: GetState) => {
    clearIntervals()
    dispatch(setToken(pair))
    history.push(`/exchange/trade/${pair}`)
    dispatch(switchHubs(getCurrentHub(getState())))
  }
}

// export const stateUpdateChallenge = () => {
//   return async (dispatch: Function, getState: GetState) => {
//     const gasPrice = GAS_PRICE
//     const intergiryError = getStateIntegrityError(getState())
//     if (!intergiryError.tokenAddress || !intergiryError.walletAddress) {
//       console.log(
//         'Cannot initiate update state challenge, no intergiryError tokenAddress, or walletAddress',
//       )
//       toast.error('Update challenge failed!')
//       dispatch(toggleChallengeModal(false))
//       return
//     }
//     try {
//       dispatch(setIsUpdateChallengeLoading(true))
//       await nocust.issueStateUpdateChallenge(
//         intergiryError.walletAddress,
//         new BigNumber(gasPrice),
//         CHALLENGE_GAS_LIMIT,
//         intergiryError.tokenAddress,
//       )
//       toast.success('Update Challenge has been sumitted successfully')
//     } catch (error) {
//       toast.error('Update challenge failed!')
//       return Promise.reject(error)
//     } finally {
//       dispatch(toggleChallengeModal(false))
//       dispatch(setIsUpdateChallengeLoading(false))
//     }
//   }
// }
