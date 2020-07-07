import { tokenAddressToSymbol } from '../../utils'
import BigNumber from 'bignumber.js'
import { format } from 'date-fns'
import { StoredTransaction } from '.'

const buildTransaction = (tokens: Object, transaction: StoredTransaction) => {
  const {
    txId,
    id,
    time,
    baseTokenAddress,
    quoteTokenAddress,
    amount,
    price,
    status,
    eon,
    type,
    expiry,
  } = transaction

  const date = format(new Date(0).setUTCSeconds(time), 'YYYY/MM/DD, h:mm A')
  const leftToken = tokenAddressToSymbol(baseTokenAddress, tokens)
  const rightToken = tokenAddressToSymbol(quoteTokenAddress, tokens)
  const pair = `${leftToken}/${rightToken}`

  let expiryToDays

  if (expiry) {
    expiryToDays = (expiry * 36) / 24
  }

  return {
    txId,
    time,
    id,
    date,
    pair,
    baseAsset: leftToken,
    quoteAsset: rightToken,
    baseTokenAddress,
    quoteTokenAddress,
    amount: amount.shiftedBy(-18),
    price: price,
    status,
    eon,
    type,
    expiry: expiryToDays,
  }
}

const sortTransactions = (field: string, isAsc: boolean, array: Array<any>) => {
  return [...array].sort((a, b) => {
    const greater = BigNumber.isBigNumber(a[field]) ? a[field].gt(b[field]) : a[field] > b[field]
    if (isAsc && greater) {
      return 1
    } else if (isAsc && !greater) {
      return -1
    } else if (greater) {
      return -1
    }
    return 1
  })
}

export default { buildTransaction, sortTransactions }
