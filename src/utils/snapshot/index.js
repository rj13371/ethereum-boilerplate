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

export async function createProposal(title, body, date, choices, currentBlock) {
  const provider_ = await web3Modal.connect();
  const account = provider_.accounts?.[0] || provider_.selectedAddress;
  const timestamp = Math.round(new Date().getTime() / 1000);

  let toTimestamp = Date.parse(date._d);
  console.log(title, body, date, choices, currentBlock);
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
    strategies:
      '[{"name":"erc721","network":"4","params":{"symbol":"GGD","address":"0x85214a5621c0EeE716bdC87748D865c197D2Cf0a"}}]',
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
