import { Card, Timeline, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import CreateGuild from "utils/smart-contract/CreateGuild";
import Mint from "utils/smart-contract/Mint";
import CreatePoll from "./CreatePoll";
import GuildsDisplay from "./GuildsDisplay";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../constants.js";

const { Text } = Typography;

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

export default function QuickStart() {
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

        console.log(transaction);
        setGuilds(transaction);
      };
      getGuilds();
    }
  }, [isWeb3Enabled]);
  console.log(guilds);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={styles.card}
        title={
          <>
            📝 <Text strong>To-Do List</Text>
          </>
        }
      >
        <CreateGuild />
        <Mint guildId={1} />
        <CreatePoll />
        {guilds.length > 0 && <GuildsDisplay guilds={guilds} />}
      </Card>
    </div>
  );
}
