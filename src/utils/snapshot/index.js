import snapshot from "@snapshot-labs/snapshot.js";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import { getAddress } from "@ethersproject/address";

const hub = "https://hub.snapshot.org"; // or https://testnet.snapshot.org for testnet
const client = new snapshot.Client712(hub);

const web3Modal = new Web3Modal({
  network: "rinkeby",
  cacheProvider: false,
});

const web3 = new Web3Provider(window.ethereum);
web3Modal.clearCachedProvider();

export async function createProposal(
  title,
  body,
  date,
  choices,
  currentBlock,
  address,
) {
  const provider_ = await web3Modal.connect();
  const account = provider_.accounts?.[0] || provider_.selectedAddress;
  const timestamp = Math.round(new Date().getTime() / 1000);

  let toTimestamp = Date.parse(date._d);
  console.log(title, body, date, choices, currentBlock, address);
  const end = toTimestamp / 1000;
  const start = timestamp;

  const receipt = await client.proposal(web3, getAddress(account), {
    space: "dappchain.eth",
    type: "single-choice",
    title: title,
    body: `\t${body}\t\t`,
    choices: choices,
    start,
    end,
    timestamp,
    snapshot: currentBlock,
    network: "4",
    strategies: `[{"name":"contract-call","network":"4","params":{"address":"0x676cEf263a2954DB6829383aa9d683c9cBc6B67c","symbol":"GGD","decimals":0,"methodABI":{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}}}]`,
    plugins: JSON.stringify({}),
    metadata: JSON.stringify({}),
  });

  console.log(receipt);
}

export async function vote(proposalId, choice) {
  const provider_ = await web3Modal.connect();
  const account = provider_.accounts?.[0] || provider_.selectedAddress;

  const receipt = await client.vote(web3, getAddress(account), {
    space: "dappchain.eth",
    proposal: proposalId,
    type: "single-choice",
    choice: choice,
    metadata: JSON.stringify({}),
  });

  console.log(receipt);
}

// export async function getResults(currentBlock, address)

// const space = 'dappchain.eth';
// const strategies = [
//   {
//     name: 'erc20-balance-of',
//     params: {
//       address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//       symbol: 'GGD',
//       decimals: 0
//     }
//   }
// ];
// const network = '4';
// const voters = address;

// const blockNumber = 11437846;

// snapshot.utils.getScores(
//   space,
//   strategies,
//   network,
//   voters,
//   blockNumber
// ).then(scores => {
//   console.log('Scores', scores);
// });
