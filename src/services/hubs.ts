const hubs: any = {
  RINKEBY: {
    hubApiUrl: process.env.REACT_APP_HUB_URL_RINKEBY,
    networkId: process.env.REACT_APP_NETWORK_ID_RINKEBY
      ? parseInt(process.env.REACT_APP_NETWORK_ID_RINKEBY)
      : 4,
    rpcUrl: process.env.REACT_APP_RPC_URL_RINKEBY,
    contractAddress: process.env.REACT_APP_HUB_CONTRACT_ADDRESS_RINKEBY,
    availablePairs: process.env.REACT_APP_HUB_SUPPORTED_PAIRS_RINKEBY
      ? process.env.REACT_APP_HUB_SUPPORTED_PAIRS_RINKEBY.split(',')
      : ['fLQD-fETH'],
    tradingDataUrl: process.env.REACT_APP_DATA_FEED_URL_RINKEBY,
  },
  MAINNET: {
    hubApiUrl: process.env.REACT_APP_HUB_URL_MAINNET,
    networkId: process.env.REACT_APP_NETWORK_ID_MAINNET
      ? parseInt(process.env.REACT_APP_NETWORK_ID_MAINNET)
      : 1,
    rpcUrl: process.env.REACT_APP_RPC_URL_MAINNET,
    contractAddress: process.env.REACT_APP_HUB_CONTRACT_ADDRESS_MAINNET,
    availablePairs: process.env.REACT_APP_HUB_SUPPORTED_PAIRS_MAINNET
      ? process.env.REACT_APP_HUB_SUPPORTED_PAIRS_MAINNET.split(',')
      : ['fLQD-fETH'],
    tradingDataUrl: process.env.REACT_APP_DATA_FEED_URL_MAINNET,
    mainnetPassword: '$2a$10$wZWdGe9uYVc.OmhL8W6sEuFRSZLAphXDYMaDr9nId9wRbFGGaxP3y',
  },
  LIMBO: {
    hubApiUrl: process.env.REACT_APP_HUB_URL_LIMBO,
    networkId: process.env.REACT_APP_NETWORK_ID_LIMBO
      ? parseInt(process.env.REACT_APP_NETWORK_ID_LIMBO)
      : null,
    rpcUrl: process.env.REACT_APP_RPC_URL_LIMBO,
    contractAddress: process.env.REACT_APP_HUB_CONTRACT_ADDRESS_LIMBO,
    availablePairs: process.env.REACT_APP_HUB_SUPPORTED_PAIRS_LIMBO
      ? process.env.REACT_APP_HUB_SUPPORTED_PAIRS_LIMBO.split(',')
      : ['fLQD-fETH'],
    tradingDataUrl: process.env.REACT_APP_DATA_FEED_URL_LIMBO,
  },

  LOCAL: {
    hubApiUrl: process.env.REACT_APP_TEST_HUB_URL,
    networkId: null,
    rpcUrl: process.env.REACT_APP_TEST_RPC_URL,
    contractAddress: process.env.REACT_APP_TEST_HUB_CONTRACT_ADDRESS,
    availablePairs: process.env.REACT_APP_HUB_SUPPORTED_PAIRS_LIMBO
      ? process.env.REACT_APP_HUB_SUPPORTED_PAIRS_LIMBO.split(',')
      : ['fLQD-fETH'],
  },
}

export default hubs
