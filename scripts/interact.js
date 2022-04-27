const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/Ropsten.sol/Ropsten.json")

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const ropstenContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer)

async function main() {
  const message = await ropstenContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await ropstenContract.update("New Ropsten (v2).")
  await tx.wait()

  const newMessage = await ropstenContract.message()
  console.log("The new message is: " + newMessage)
}
main()
