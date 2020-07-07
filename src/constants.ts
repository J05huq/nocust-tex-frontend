import BigNumber from 'bignumber.js'
export const NUMBER_OF_DECIMALS = 18
export const CHALLENGE_GAS_LIMIT = 400000
export const GAS_LIMIT = 300000
export const GAS_PRICE = '20000000000'
export const getMaxFee = (gasPrice, gasLimit) => new BigNumber(gasPrice).times(gasLimit)
