import { Card, Typography, Collapse } from "antd";
import React from "react";

const { Panel } = Collapse;

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
    width: "500px",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

const textA = `
  You need a crypto wallet to join a guild and participate in a community, but you can still see them without logging in.
`;

const textB = `
  You will need to pay gas fees to mint your Guild Membership NFT but to participate in the community does not cost any tx fees.
`;

const textC = `
  Game Guilds DAO uses the standard ERC721 contract and is safe to use.
`;

export default function QuickStart() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={styles.card}
        title={
          <>
            <h1>Welcome to Game Guilds DAO</h1>
            <p>Please connect your wallet to continue</p>
          </>
        }
      >
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Do I need a wallet to use Game Guilds DAO?" key="1">
            <p>{textA}</p>
          </Panel>
          <Panel header="Does it cost money to join Game Guilds DAO?" key="2">
            <p>{textB}</p>
          </Panel>
          <Panel header="Is it safe to use?" key="3">
            <p>{textC}</p>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
}
