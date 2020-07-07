import { nocust } from 'nocust-client'

export const registerWalletWithTokens = (walletAddress: string, tokens: Object) => {
  const tokenAddresses = Object.keys(tokens).map(key => tokens[key])
  return Promise.all(
    tokenAddresses.map(async token => await nocust.registerWallet(walletAddress, token)),
  )
}
