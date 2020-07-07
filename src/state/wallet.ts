import produce from 'immer'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import HDKey from 'ethereumjs-wallet/hdkey'
import { Action, GetState, AppState } from './index'
import { web3 } from '../services/nocustManager'
import { setSeedPhrase } from './header'
import { initialDerivedPath, clearIntervals } from '../utils'
import { fetchPeriodicData } from './dashboard'
import * as Sentry from '@sentry/browser'
import { getCurrentHubTokens } from './hub'
import { nocust } from 'nocust-client'

// SHAPE
export interface WalletState {
  walletAddress: string
  privateKey: string
  syncAndRegisterRunning: boolean
  isRegistered: boolean
  loadingSeedPhrase: boolean
}

export const initialState: WalletState = {
  walletAddress: localStorage.getItem('wallet_address') || '',
  privateKey: localStorage.getItem('private_key') || '',
  syncAndRegisterRunning: false,
  isRegistered: Boolean(localStorage.getItem('is_registered')) || false,
  loadingSeedPhrase: false,
}

// ACTION TYPES
const SET_KEY_PAIR = 'SET_KEY_PAIR'
const SET_SYNC_REG_RUNNING = 'SET_SYNC_REG_RUNNING'
const SET_IS_REGISTERED = 'SET_IS_REGISTERED'
const SET_LOADING_SEED_PHRASE = 'SET_LOADING_SEED_PHRASE'

//  ACTION SELECTORS
export const getWalletAddress = (state: AppState) => state.wallet.walletAddress
export const getIsRegistered = (state: AppState) => state.wallet.isRegistered
export const getLoadingSeedPhrase = (state: AppState) => state.wallet.loadingSeedPhrase
export const getSyncRegisterRunning = (state: AppState) => state.wallet.syncAndRegisterRunning

// ACTION CREATORS
export const setKeyPair = (data: { walletAddress: string; privateKey: string }) => dispatch => {
  localStorage.setItem('private_key', data.privateKey)
  localStorage.setItem('wallet_address', data.walletAddress)
  web3.eth.accounts.wallet.clear()
  web3.eth.accounts.wallet.add(data.privateKey)
  dispatch({ type: SET_KEY_PAIR, payload: data })
}

export const setSyncRegisterRunning = (flag: boolean): Action => ({
  type: SET_SYNC_REG_RUNNING,
  payload: flag,
})

export const setIsRegistered = (flag: boolean): Action => ({
  type: SET_IS_REGISTERED,
  payload: flag,
})

export const setLoadingSeedPhrase = (flag: boolean): Action => ({
  type: SET_LOADING_SEED_PHRASE,
  payload: flag,
})

// REDUCER
export default (state: WalletState = initialState, action: Action): WalletState =>
  produce(state, (draft: WalletState) => {
    switch (action.type) {
      case SET_KEY_PAIR:
        const { walletAddress, privateKey } = action.payload
        draft.walletAddress = walletAddress
        draft.privateKey = privateKey
        break
      case SET_SYNC_REG_RUNNING:
        draft.syncAndRegisterRunning = action.payload
        break
      case SET_IS_REGISTERED:
        draft.isRegistered = action.payload
        localStorage.setItem('is_registered', action.payload)
        break
      case SET_LOADING_SEED_PHRASE:
        draft.loadingSeedPhrase = action.payload
    }
  })

// Thunks
export const createWallet = (password: string) => {
  return async (dispatch, getState: GetState) => {
    const seedPhrase = generateMnemonic()
    const secretKey = mnemonicToSeed(seedPhrase, password)
    const HDWallet = HDKey.fromMasterSeed(secretKey)
    const hdWallet = HDWallet.derivePath(initialDerivedPath(0)).getWallet()
    const privateKey = hdWallet.getPrivateKeyString()
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    const { address: walletAddress } = account
    web3.eth.accounts.wallet.clear()
    web3.eth.accounts.wallet.add(account)
    try {
      clearIntervals()
      dispatch(setLoadingSeedPhrase(true))
      dispatch(setIsRegistered(false))
      dispatch(registerWalletWithHub(walletAddress, privateKey))
      dispatch(setLoadingSeedPhrase(false))
      localStorage.setItem('private_key', privateKey)
      localStorage.setItem('wallet_address', walletAddress)
      dispatch(setKeyPair({ walletAddress, privateKey }))
      dispatch(setSeedPhrase(seedPhrase))
    } catch (err) {
      console.error(err)
      console.log('walletAddress', walletAddress)
      Sentry.captureException(err)
    }
  }
}

export const importWallet = (seedPhrase: string, mainPass: string) => async (
  dispatch: Function,
) => {
  const secretKey = mnemonicToSeed(seedPhrase, mainPass)
  const HDWallet = HDKey.fromMasterSeed(secretKey)
  const wallet = HDWallet.derivePath(initialDerivedPath(0)).getWallet()
  const privateKey = wallet.getPrivateKeyString()
  const publicKey = wallet.getAddressString()
  const walletAddress = web3.utils.toChecksumAddress(publicKey)
  dispatch(setKeyPair({ walletAddress, privateKey }))
  dispatch(setSeedPhrase(seedPhrase))
  dispatch(registerWalletWithHub(walletAddress, privateKey))
}

export const registerWalletWithHub = (walletAddress: string, privateKey: string) => async (
  dispatch: Function,
  getState: GetState,
) => {
  clearIntervals()
  nocust.addPrivateKey(privateKey)
  const tokens = getCurrentHubTokens(getState())
  const tokenAddresses = Object.keys(tokens).map(key => tokens[key])
  await Promise.all(
    tokenAddresses.map(async token => {
      const isRegistered = await nocust.isWalletRegistered(walletAddress, token)
      if (!isRegistered) {
        await nocust.registerWallet(walletAddress, token)
      }
    }),
  )
  dispatch(setIsRegistered(true))
  dispatch(fetchPeriodicData())
}
