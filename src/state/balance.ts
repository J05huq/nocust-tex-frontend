import produce from 'immer'
import { AppState, Action, GetState } from './index'
import { GAS_PRICE } from '../constants'
import { getWalletAddress } from './wallet'
import { getHeaderTokensList } from './header'
import { nocust } from 'nocust-client'
import { blockchain } from 'nocust-client/dist/services/blockchain'
import { store } from 'nocust-client/dist/store'
import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'
import { formatBigNumber, formatBigNumberArray, weiToEth, onChainDepositHelper } from '../utils'
import * as Sentry from '@sentry/browser'
import hubs from '../services/hubs'
import { getCurrentHubTokens, setHubConnectionError } from './hub'
import { web3 } from '../services/nocustManager'

// SHAPE
export interface BalanceState {
  isLoading: boolean
  leftOffChainBalance: string
  rightOffChainBalance: string
  ethBalance: string
  leftNotEnoughEth: boolean
  rightNotEnoughEth: boolean
}

export const initialState: BalanceState = {
  isLoading: false,
  leftOffChainBalance: 'Loading...',
  rightOffChainBalance: 'Loading...',
  ethBalance: '',
  leftNotEnoughEth: false,
  rightNotEnoughEth: false,
}

// SELECTORS
export const isBalanceLoading = (state: AppState) => state.balance.isLoading
export const getOffChainBalance = (state: AppState) => {
  const { leftOffChainBalance, rightOffChainBalance } = state.balance
  return { leftOffChainBalance, rightOffChainBalance }
}

export const getLeftNotEnoughEth = (state: AppState) => state.balance.leftNotEnoughEth
export const getRightNotEnoughEth = (state: AppState) => state.balance.rightNotEnoughEth
export const getEthBalance = (state: AppState) => state.balance.ethBalance

// ACTION TYPES
const SET_BALANCE_LOADING_STATE = 'SET_BALANCE_LOADING_STATE'
const SET_OFF_CHAIN_BALANCE = 'SET_OFF_CHAIN_BALANCE'
const SET_ON_CHAIN_BALANCE = 'SET_ON_CHAIN_BALANCE'
const SET_ETH_BALANCE = 'SET_ETH_BALANCE'

// ACTION CREATORS
export const setBalanceLoadingState = (state: boolean): Action => ({
  type: SET_BALANCE_LOADING_STATE,
  payload: state,
})

export const setOnChainBalance = (index: number, notEnoughEth: boolean): Action => ({
  type: SET_ON_CHAIN_BALANCE,
  payload: { index, notEnoughEth },
})

export const setOffChainBalance = (balance: {
  leftOffChainBalance: string
  rightOffChainBalance: string
}): Action => ({
  type: SET_OFF_CHAIN_BALANCE,
  payload: balance,
})

export const setEthBalance = (ethBalance: string): Action => ({
  type: SET_ETH_BALANCE,
  payload: ethBalance,
})

// REDUCER
export default (state: BalanceState = initialState, action: Action): BalanceState =>
  produce(state, (draft: BalanceState) => {
    switch (action.type) {
      case SET_BALANCE_LOADING_STATE:
        draft.isLoading = action.payload
        break
      case SET_OFF_CHAIN_BALANCE:
        const { leftOffChainBalance, rightOffChainBalance } = action.payload
        draft.leftOffChainBalance = leftOffChainBalance
        draft.rightOffChainBalance = rightOffChainBalance
        break
      case SET_ON_CHAIN_BALANCE:
        const { index, notEnoughEth } = action.payload
        index === 0
          ? (draft.leftNotEnoughEth = notEnoughEth)
          : (draft.rightNotEnoughEth = notEnoughEth)
        break
      case SET_ETH_BALANCE:
        draft.ethBalance = action.payload
        break
    }
  })

// THUNKS
export const fetchBalance = () => {
  return async (dispatch, getState: GetState) => {
    const walletAddress = getWalletAddress(getState())
    if (!walletAddress) {
      dispatch(setOffChainBalance({ leftOffChainBalance: '0', rightOffChainBalance: '0' }))
      return
    }
    const tokens = getHeaderTokensList(getState())
    const hubTokens = getCurrentHubTokens(getState())
    try {
      const balances = await Promise.all(
        tokens.map(async token => await nocust.getBalance(walletAddress, hubTokens[token])),
      )
      const leftOffChainBalanceBN: any = balances[0].isNaN()
        ? new BigNumber(0)
        : balances[0].shiftedBy(-18)
      const rightOffChainBalanceBN: any = balances[1].isNaN()
        ? new BigNumber(0)
        : balances[1].shiftedBy(-18)
      const leftOffChainBalance = formatBigNumber(leftOffChainBalanceBN)
      const rightOffChainBalance = formatBigNumber(rightOffChainBalanceBN)
      dispatch(setOffChainBalance({ leftOffChainBalance, rightOffChainBalance }))
    } catch (error) {
      console.log('balance error', error)
      dispatch(setHubConnectionError(error.message || 'ERROR'))
      dispatch(setOffChainBalance({ leftOffChainBalance: '0', rightOffChainBalance: '0' }))
    }
  }
}

export const depositOnChainToOffChain = (
  amount: BigNumber,
  tokenAddress: string,
  token: string,
) => {
  return async (dispatch, getState: GetState) => {
    const walletAddress = getWalletAddress(getState())

    try {
      if (token !== 'ETH') {
        let currentNonce = await web3.eth.getTransactionCount(walletAddress, 'pending')
        const allowance = await blockchain.callERC20Method(tokenAddress, 'allowance', [
          walletAddress,
          store.contractAddress,
        ])
        console.log(allowance, amount, new BigNumber(allowance).isLessThan(amount))
        const data = {
          address: walletAddress,
          amount: amount,
          gasPrice: GAS_PRICE,
          token: tokenAddress,
          nonce: currentNonce,
        }
        if (new BigNumber(allowance).isLessThan(amount)) {
          await nocust.approveDeposits({
            address: walletAddress,
            gasPrice: GAS_PRICE,
            token: tokenAddress,
          })
          currentNonce += 1
        }
        const id = await nocust.deposit(data)
        console.log('txId', id)
      } else {
        const id = await nocust.deposit({
          address: walletAddress,
          amount: amount,
          gasPrice: GAS_PRICE,
          token: tokenAddress,
        })
        console.log('txId', id)
      }

      toast(`💰You've incoming '${Number(weiToEth(amount, 4))} ${token}' off-chain transaction`)
    } catch (error) {
      console.log('deposit error', error)
      console.log('walletAddress', walletAddress)
      Sentry.captureException(error)
      return ''
    }
  }
}

export const fetchOnChainBalance = () => {
  return async (dispatch, getState: GetState) => {
    const walletAddress = getWalletAddress(getState())
    if (!walletAddress) return
    const tokens = getHeaderTokensList(getState())
    const gasPrice = GAS_PRICE
    const maxFeeInEth = Number(gasPrice)
    const hubTokens = getCurrentHubTokens(getState())
    try {
      const ethBalanceBN = await getEthOnChainBalance(dispatch, getState)
      const balance: any = await Promise.all(
        tokens.map(async token =>
          token === 'ETH'
            ? ethBalanceBN
            : await nocust.getParentChainBalance(walletAddress, hubTokens[token]),
        ),
      )

      const ethBalance = Number(ethBalanceBN)
      const formattedOnChainBalances = formatBigNumberArray(balance)
      onChainDepositHelper(
        formattedOnChainBalances,
        balance,
        tokens,
        maxFeeInEth,
        dispatch,
        ethBalance,
        hubTokens,
      )
    } catch (error) {
      console.log('walletAddress', walletAddress)
      Sentry.captureException(error)
      console.log('fetch onChainBalance', error)
    }
  }
}

export const getEthOnChainBalance = async (dispatch: Function, getState: GetState) => {
  try {
    const walletAddress = getWalletAddress(getState())
    const hub: any = localStorage.getItem('current_hub') || process.env.REACT_APP_SELECTED_HUB
    const ethTokenAddress = hubs[hub].contractAddress
    const ethBalance = await nocust.getParentChainBalance(walletAddress, ethTokenAddress)
    const ethBalanceBN: any = ethBalance.isNaN() ? new BigNumber(0) : ethBalance.shiftedBy(-18)
    const ethBalanceFormatted = formatBigNumber(ethBalanceBN)
    dispatch(setEthBalance(ethBalanceFormatted))
    return Promise.resolve(ethBalance)
  } catch (error) {
    console.log('getEthOnChainBalance', error)
  }
}
