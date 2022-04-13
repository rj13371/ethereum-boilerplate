import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import GuildsDisplay from "./GuildsDisplay";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../constants.js";

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function GuildsPage() {
  const { Moralis, isWeb3Enabled } = useMoralis();
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    if (isWeb3Enabled) {
      const getGuilds = async () => {
        const sendOptions = {
          contractAddress: NFT_CONTRACT_ADDRESS,
          abi: NFT_CONTRACT_ABI,
          functionName: "returnGuilds",
          chain: "rinkeby",
        };
        const transaction = await Moralis.executeFunction(sendOptions);

        setGuilds(transaction);
      };
      getGuilds();
    }
  }, [isWeb3Enabled]);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card style={styles.card}>
        {guilds.length > 0 && <GuildsDisplay guilds={guilds} />}
      </Card>
    </div>
  );
}
