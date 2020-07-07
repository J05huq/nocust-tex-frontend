import produce from 'immer'
import { nocust } from 'nocust-client'
import BigNumber from 'bignumber.js'
import { Action, GetState } from '.'
import { getWalletAddress } from './wallet'
import { toast } from 'react-toastify'
import * as Sentry from '@sentry/browser'
import { getCurrentHubTokens } from './hub'

export interface DetailWalletState {
  tokenSelected: string
  withdrawalAddress: string
  activeTab: string
  withdrawLoading: boolean
}

export const initialState: DetailWalletState = {
  tokenSelected: '',
  withdrawalAddress: '',
  activeTab: 'deposit-tab',
  withdrawLoading: false,
}

// ACTION TYPES
const CHANGE_WALLET_TAB = 'CHANGE_WALLET_TAB'
const SET_TOKEN_SELECTED = 'SET_TOKEN_SELECTED'
const SET_WITHDRAWAL_ADDRESS = 'SET_WITHDRAWAL_ADDRESS'
const SET_WITHDRAW_LOADING = 'SET_WITHDRAW_LOADING'

// ACTION CREATORS
export const changeTab = (tab: string) => ({
  type: CHANGE_WALLET_TAB,
  payload: { tab },
})

export const setTokenSelected = (token: string) => ({
  type: SET_TOKEN_SELECTED,
  payload: { token },
})

export const setWithdrawalAddress = (address: string) => ({
  type: SET_WITHDRAWAL_ADDRESS,
  payload: { address },
})

export const setWithdrawLoading = (flag: boolean) => ({
  type: SET_WITHDRAW_LOADING,
  payload: { flag },
})

// REDUCER
export default (state: DetailWalletState = initialState, action: Action): DetailWalletState =>
  produce(state, (draft: DetailWalletState) => {
    switch (action.type) {
      case CHANGE_WALLET_TAB:
        const { tab } = action.payload
        draft.activeTab = tab
        break
      case SET_TOKEN_SELECTED:
        const { token } = action.payload
        draft.tokenSelected = token
        break
      case SET_WITHDRAWAL_ADDRESS:
        const { address } = action.payload
        draft.withdrawalAddress = address
        break
      case SET_WITHDRAW_LOADING:
        const { flag } = action.payload
        draft.withdrawLoading = flag
        break
    }
  })

// THUNKS
export const withdrawToExternalWallet = (
  address: string,
  amount: BigNumber,
  token: string,
) => async (dispatch: Function, getState: GetState) => {
  const walletAddress = getWalletAddress(getState())
  const hubTokens = getCurrentHubTokens(getState())
  try {
    dispatch(setWithdrawLoading(true))
    await nocust.transfer({
      to: address,
      amount,
      from: walletAddress,
      token: hubTokens[token],
    })
    toast.success('Transfer Sent')
  } catch (err) {
    console.log(err)
    console.log('walletAddress', walletAddress)
    toast.error('Transfer failed')
    Sentry.captureException(err)
  } finally {
    dispatch(setWithdrawLoading(false))
  }
}
