import produce from 'immer'
import { AppState, Action } from './index'

// SHAPE
export interface ModalState {
  isOpenDepositAndWithdrawModal: boolean
  isOpenImportAccountModal: boolean
  isOpenLogoutConfirmModal: boolean
  isOpenCancelSwapModal: boolean
  isOpenDemoModal: string
  isOpenChallengeModal: boolean
}

export const initialState: ModalState = {
  isOpenDepositAndWithdrawModal: false,
  isOpenImportAccountModal: false,
  isOpenLogoutConfirmModal: false,
  isOpenCancelSwapModal: false,
  isOpenDemoModal: localStorage.getItem('show_demo_modal') || 'true',
  isOpenChallengeModal: false,
}

// SELECTOR
export const isDepositAndWithdrawModalOpen = (state: AppState) =>
  state.modal.isOpenDepositAndWithdrawModal
export const isOpenImportAccountModal = (state: AppState) => state.modal.isOpenImportAccountModal
export const isOpenLogoutConfirmModal = (state: AppState) => state.modal.isOpenLogoutConfirmModal
export const isOpenCancelSwapModal = (state: AppState) => state.modal.isOpenCancelSwapModal
export const isOpenDemoModal = (state: AppState) => state.modal.isOpenDemoModal
export const isOpenChallengeModal = (state: AppState) => state.modal.isOpenChallengeModal

// ACTION TYPES
const TOGGLE_DEPOSIT_AND_WITHDRAWAL_MODAL = 'TOGGLE_DEPOSIT_AND_WITHDRAWAL_MODAL'
const TOGGLE_IMPORT_ACCOUNT_MODAL = 'TOGGLE_IMPORT_ACCOUNT_MODAL'
const TOGGLE_LOGOUT_CONFIRM_MODAL = 'TOGGLE_LOGOUT_CONFIRM_MODAL'
const TOGGLE_CANCEL_SWAP_MODAL = 'TOGGLE_CANCEL_SWAP_MODAL'
const TOGGLE_DEMO_MODAL = 'TOGGLE_DEMO_MODAL'
const TOGGLE_CHALLENGE_MODAL = 'TOGGLE_CHALLENGE_MODAL'

// ACTION CREATORS
export const toggleDepositAndWidthdrawalModal = (state: boolean): Action => ({
  type: TOGGLE_DEPOSIT_AND_WITHDRAWAL_MODAL,
  payload: state,
})

export const toggleImportAccountModal = (state: boolean): Action => ({
  type: TOGGLE_IMPORT_ACCOUNT_MODAL,
  payload: state,
})

export const toggleLogoutConfirmModal = (state: boolean): Action => ({
  type: TOGGLE_LOGOUT_CONFIRM_MODAL,
  payload: state,
})

export const toggleCancelSwapModal = (state: boolean): Action => ({
  type: TOGGLE_CANCEL_SWAP_MODAL,
  payload: state,
})
export const toggleDemoModal = (state: boolean): Action => ({
  type: TOGGLE_DEMO_MODAL,
  payload: state,
})

export const toggleChallengeModal = (state: boolean): Action => ({
  type: TOGGLE_CHALLENGE_MODAL,
  payload: state,
})

// REDUCER
export default (state: ModalState = initialState, action: Action): ModalState =>
  produce(state, (draft: ModalState) => {
    switch (action.type) {
      case TOGGLE_DEPOSIT_AND_WITHDRAWAL_MODAL:
        draft.isOpenDepositAndWithdrawModal = action.payload
        break
      case TOGGLE_IMPORT_ACCOUNT_MODAL:
        draft.isOpenImportAccountModal = action.payload
        break
      case TOGGLE_LOGOUT_CONFIRM_MODAL:
        draft.isOpenLogoutConfirmModal = action.payload
        break
      case TOGGLE_CANCEL_SWAP_MODAL:
        draft.isOpenCancelSwapModal = action.payload
        break
      case TOGGLE_DEMO_MODAL:
        draft.isOpenDemoModal = action.payload
        break
      case TOGGLE_CHALLENGE_MODAL:
        draft.isOpenChallengeModal = action.payload
        break
    }
  })
