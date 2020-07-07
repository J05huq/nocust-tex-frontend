import BigNumber from 'bignumber.js'
import { createInvoice, encodeInvoice } from 'liquidity-invoice-generation'
import { depositOnChainToOffChain } from './state/balance'
import hubs from './services/hubs'
import { HubNamesType } from './state/hub'
import { GAS_LIMIT } from './constants'

const hub = localStorage.getItem('current_hub') || HubNamesType.RINKEBY
const HUB_CONTRACT_ADDRESS = hubs[hub].HUB_CONTRACT_ADDRESS
const NETWORK_ID = hubs[hub].NETWORK_ID
const TEN_MINUS_EIGHTEEN = new BigNumber(10).pow(-18)
const TEN_PLUS_EIGHTEEN = new BigNumber(10).pow(18)
let interval: number

export let intervals: number[] = []

export const createRandomThree = () => {
  let result
  result = []
  for (let i = 0; i < 100; i++) {
    const randNum = Math.floor(Math.random() * 12)
    if (result.indexOf(randNum) === -1) {
      result.push(randNum)
    }
    if (result.length === 3) {
      break
    }
  }
  return result
}

export const pairToTokens = (tokenPair: string): string[] => tokenPair.split('-')

export const fSymbolToMainSymbol = (symbol: string): string => symbol.slice(1)

export const getRoutePairs = () => {
  const tokenPair = new RegExp(/\/(f[A-Z]{3}-f[A-Z]{3})/).exec(window.location.href)
  const token = !tokenPair ? 'fLQD-fETH' : tokenPair[1]
  return token
}

export const tokenAddressToSymbol = (tokenAddress: string, tokens: Object): string =>
  Object.keys(tokens).find(key => tokens[key] === tokenAddress) || '???'

export const mainSymbolTofSymbol = (symbol: string): string => `f${symbol}`

export const formatBigNumber = (n: BigNumber): string =>
  n.lt(0.0001) ? (n.eq(0) ? n.toFixed(0) : n.toExponential(2)) : n.toFixed(4)

export const sleep = (timeout: number): Promise<void> =>
  new Promise(resolve => window.setTimeout(resolve, timeout))

export const setIntervalImmediate = (func: Function, timeout: Number) => {
  func()
  interval = setInterval(func, timeout)
  intervals.push(interval)
}

export const clearIntervals = () => {
  if (intervals.length > 0) {
    for (const singleInterval of intervals) {
      clearInterval(singleInterval)
    }
  }
}

export const roundBN = (value: BigNumber, decimals = 3): string =>
  value
    .toFixed(decimals)
    .replace(/0+$/, '')
    .replace(/\.$/, '')

export const initialDerivedPath = (num: number): string => `m/44'/60'/0'/0/${num}`

export const generateInvoice = (amount, token, tokens) => {
  const amountBigNumber = new BigNumber(amount)
  const amountString =
    amountBigNumber.isNaN() || amountBigNumber.isLessThan(0)
      ? '0'
      : amountBigNumber.shiftedBy(18).toString()
  try {
    const invoice = createInvoice({
      network: NETWORK_ID,
      publicKey: localStorage.getItem('wallet_address') || '',
      contractAddress: HUB_CONTRACT_ADDRESS,
      amount: amountString,
      tokenAddress: tokens[token],
      generateId: true,
    })

    return encodeInvoice(invoice)
  } catch (err) {
    return ''
  }
}

export const formatTokenWithUnit = (value: string, token = 'Eth'): Array<String> => {
  const valueBN = new BigNumber(value)
  if (valueBN.isGreaterThanOrEqualTo(100000000000000)) {
    return [weiToEth(valueBN, 4), ` ${token}`]
  } else if (valueBN.isGreaterThanOrEqualTo(1000000000)) {
    return [roundStripZeros(valueBN.times(new BigNumber(10).pow(-9))), ' gWei']
  } else if (valueBN.isGreaterThanOrEqualTo(1000000)) {
    return [roundStripZeros(valueBN.times(new BigNumber(10).pow(-6))), ' mWei']
  } else if (valueBN.isGreaterThanOrEqualTo(1000)) {
    return [roundStripZeros(valueBN.times(new BigNumber(10).pow(-3))), ' kWei']
  } else if (valueBN.isGreaterThanOrEqualTo(1)) {
    return [valueBN.toString(), ' Wei']
  } else {
    return ['0', '']
  }
}

export const weiToEth = (value, decimal = 10) =>
  roundStripZeros(value.times(TEN_MINUS_EIGHTEEN), decimal)

export const ethToWei = (value: string, tokenDecimals: number): BigNumber =>
  new BigNumber(value).times(
    tokenDecimals === 18 ? TEN_PLUS_EIGHTEEN : new BigNumber(10).pow(tokenDecimals),
  )

export const roundStripZeros = (value, decimal = 3) => parseFloat(value.toFixed(decimal)).toString()

export const normaliseComma = (val: string) => val.replace(',', '.')

export const listenToTransfers = (
  walletAddress: string,
  tokensList: Array<string>,
  tokens: Object,
) => {
  if (walletAddress) {
    // tokensList.forEach(token =>
    //   nocustManager.subscribeToIncomingTransfer(
    //     walletAddress,
    //     tx => {
    //       const [amount, tokenUnit] = formatTokenWithUnit(tx.amount, token)
    //       toast(`💰Received ${amount} ${tokenUnit}`)
    //     },
    //     tokens[token],
    //   ),
    // )
  }
}

export const isBalanceGreaterThanGasFee = (
  token: string,
  gasFees: number,
  eth_Balance: number,
  onBalance: number,
) => {
  if (token !== 'ETH') {
    return eth_Balance >= gasFees && onBalance !== 0 ? true : false
  }
  return eth_Balance > gasFees && onBalance !== 0 ? true : false
}

export const formatBigNumberArray = (balances: any[]) => {
  const formattedBalance: string[] = []
  for (let balance of balances) {
    const balanceToBN = balance.isNaN() ? new BigNumber(0) : balance.shiftedBy(-18)
    const bigNumberFormatted = formatBigNumber(balanceToBN)
    formattedBalance.push(bigNumberFormatted)
  }
  return formattedBalance
}

export const amountToFiat = (amount: BigNumber, fiatPrice: number, fixed: number = 5): string =>
  amount.times(fiatPrice).toFixed(fixed)

export const onChainDepositHelper = async (
  onChainBalances: string[],
  balance: BigNumber[],
  tokens: string[],
  maxFeeInEth: number,
  dispatch: Function,
  ethBalance: number,
  tokensAddresses: Object,
) => {
  for await (const [i, onBalance] of onChainBalances.entries()) {
    console.log(onBalance)
    const totalGas = maxFeeInEth * GAS_LIMIT
    const checkForEth = isBalanceGreaterThanGasFee(
      tokens[i],
      totalGas,
      ethBalance,
      Number(balance[i]),
    )
    if (checkForEth) {
      const amount = tokens[i] === 'ETH' ? balance[i].minus(totalGas) : balance[i].toFixed(0)
      const amountToBigNumber = new BigNumber(amount)
      await dispatch(
        depositOnChainToOffChain(amountToBigNumber, tokensAddresses[tokens[i]], tokens[i]),
      )
    }
  }
}

export const fiatAmount = (amount: any, token: string, metaData: Object): string => {
  let fiatRes = '0'
  const tokenData = metaData[token]
  if (tokenData) {
    const { fiatPrice } = tokenData
    const amountBN = new BigNumber(amount)
    const fiatResult = amountToFiat(amountBN, fiatPrice)
    fiatRes = fiatResult === 'NaN' ? '0' : fiatResult
    return fiatRes
  }
  return fiatRes
}

export const uniqueArray = (a: Array<any>, key: any) => {
  let seen = new Set()
  return a.filter(item => {
    let k = key(item)
    return seen.has(k) ? false : seen.add(k)
  })
}

export const isSameHexValue = (token1, token2) => {
  if (token1.toLowerCase() === token2.toLowerCase()) {
    return true
  }
  return false
}
