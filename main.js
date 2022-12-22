const ethers = require("ethers");
const {  FlashbotsBundleProvider, } = require("@flashbots/ethers-provider-bundle");
const provider = new ethers.providers.JsonRpcProvider({  url: "https://mainnet.infura.io/v3/${INFURA-API}", });


const main = async () => {
const authSigner = new ethers.Wallet(
  "0x2000020000000000000000000000000000000000000000000000000000000000"
);

const accOneSigner = new ethers.Wallet("${ACC-ONE-SIGNER}")
const accOneAddress = "${ACC-ONE-ADDRESS}"
const accTwoSIgner = new ethers.Wallet("${ACC-TWO-SIGNER}")
const accTwoAddress = "${ACC-TWO-ADDRESS}"
const ensContract = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85"

const firstTrasaction =  {
  to: accTwoAddress,
  gasLimit: 21000,
  chainId: 1,
  type: 2,
  maxFeePerGas: ethers.utils.parseUnits('50', 'gwei'),
  maxPriorityFeePerGas: ethers.utils.parseUnits('30', 'gwei'),
  value: ethers.utils.parseEther('0.008'),
  nonce: 303
}
const secondTrasaction =  {
  to: ensContract,
  maxFeePerGas: ethers.utils.parseUnits('50', 'gwei'),
  maxPriorityFeePerGas: ethers.utils.parseUnits('30', 'gwei'),
  gasLimit: 125144,
  chainId: 1,
type: 2,
  nonce: 6,
  data: "0x42842e0e00000000000...."
}


const blockNumber = await provider.getBlockNumber()
const targetBlock =  blockNumber + 10;

const flashbotsProvider = await FlashbotsBundleProvider.create(
  provider,
  authSigner
);

const signedBundle = await flashbotsProvider.signBundle([
    {
        signer: accOneSigner,
        transaction: firstTrasaction,
    },
    {
        signer: accTwoSIgner,
        transaction: secondTrasaction,
    },
]);

const simulation = await flashbotsProvider.simulate(signedBundle, targetBlock)
if ('error' in simulation) {
  console.warn(`Simulation Error: ${simulation.error.message}`)
  process.exit(1)
} else {
  console.log(`Simulation Success: ${JSON.stringify(simulation, null, 2)}`)
}
const bundleReceipt = await flashbotsProvider.sendRawBundle(
  signedBundle,
  targetBlock
);

if ('error' in bundleReceipt) {
    console.warn(bundleReceipt.error.message)
    return
    }
}
main();
