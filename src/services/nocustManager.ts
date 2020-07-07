import { nocust } from 'nocust-client'
import Web3 from 'web3'
import hubs from './hubs'

declare global {
  interface Window {
    nocust: any
    web3: Web3
  }
}

let web3: Web3

class NocustManagerStorageService {
  async get(key: string): Promise<string> {
    return window.localStorage.getItem(key) as string
  }

  async set(key: string, value: string): Promise<boolean> {
    try {
      window.localStorage.setItem(key, value)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      window.localStorage.removeItem(key)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

export const createNocustManager = async () => {
  const hub: any = localStorage.getItem('current_hub') || 'RINKEBY'
  const currentHub = hubs[hub]
  const HUB_API_URL = currentHub.hubApiUrl
  const RPC_URL = currentHub.rpcUrl
  const HUB_CONTRACT_ADDRESS = currentHub.contractAddress

  web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))

  await nocust.init({
    contractAddress: HUB_CONTRACT_ADDRESS,
    operatorUrl: HUB_API_URL,
    rpcUrl: RPC_URL,
    storageEngine: new NocustManagerStorageService(),
  })

  const privateKey = localStorage.getItem('private_key')
  if (privateKey) {
    nocust.addPrivateKey(privateKey)
  }
}

createNocustManager()

export { web3 }
