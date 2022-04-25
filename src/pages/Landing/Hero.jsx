import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export default function Hero() {
  return (
    <div>
      <Title strong>Game Guilds DAO</Title>
      <Title level={3}>
        Combining the worlds of DAOs and NFTs for gaming communities
      </Title>
    </div>
  );
}
