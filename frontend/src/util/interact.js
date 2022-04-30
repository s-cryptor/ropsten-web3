require('dotenv').config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require('../contract-abi.json')
const contractAddress = '0xE4ed9957B957CE98f16B87A3Bee1401b5603c225'

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      const obj = {
        status: '👆🏽 Write a message in the text-field above.',
        address: addressArray[0]
      }
      return obj
    } catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message
      }
    }
  } else {
    return {
      address: '',
      status: `${' '} 🦊${' '} You must install Metamask, a virtual Ethereum wallet, in your browser.`
    }
  }
}

export const getCurrentWalletConnected = async () => {}

export const updateMessage = async (address, message) => {}
