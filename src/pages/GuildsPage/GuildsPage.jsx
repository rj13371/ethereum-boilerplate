import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import GuildsDisplay from "../../components/GuildsDisplay";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../../constants.js";

const { Search } = Input;

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

  const getGuilds = async () => {
    const sendOptions = {
      contractAddress: NFT_CONTRACT_ADDRESS,
      abi: NFT_CONTRACT_ABI,
      functionName: "returnGuilds",
      chain: "rinkeby",
    };
    const transaction = await Moralis.executeFunction(sendOptions);

    let copy = JSON.parse(JSON.stringify(transaction));

    copy.forEach((item, index) => {
      item.index = index;
    });

    setGuilds(copy);
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      getGuilds();
    }
  }, [isWeb3Enabled]);

  const onSearch = (value) => {
    const foundGuild = guilds.filter(
      (guild) => guild[1].toLowerCase() === value.toLowerCase(),
    );

    if (foundGuild.length === 0) {
      return;
    } else {
      setGuilds([foundGuild[0]]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={styles.card}>
        <Search
          placeholder="Guild name"
          onSearch={onSearch}
          style={{ width: 250, margin: "50px" }}
        />
        {guilds.length > 0 && <GuildsDisplay guilds={guilds} />}
      </Card>
    </div>
  );
}
