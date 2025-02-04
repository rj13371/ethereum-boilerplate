import React, { useState } from "react";
import { Popup } from "components/Popup";
import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import { Button } from "antd";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../../constants";

export default function MintNFT(props) {
  const { account } = useMoralis();
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  const ethers = Moralis.web3Library;

  const mintNFT = async () => {
    setShow(false);
    const web3Provider = await Moralis.enableWeb3();
    await web3Provider.send("eth_requestAccounts", [0]);
    let signer = web3Provider.getSigner();

    const contract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      web3Provider,
    );

    let signedContract = contract.connect(signer);

    const mint = async () => {
      let mintTx = await signedContract
        .mintNFT(account, props.guildId, {
          gasPrice: signer.getGasPrice(),
          gasLimit: 300000,
        })
        .catch((e) => window.alert(e.message));

      const res = await mintTx.wait();
      if (res) {
        setContent("Transaction sent! Membership NFT mint pending...");
        setShow(true);
      }
    };

    mint();
  };

  return (
    <>
      <Popup show={show} content={content} />
      <Button onClick={() => mintNFT()} type="primary">
        {" "}
        Mint Guild Membership{" "}
      </Button>
    </>
  );
}
