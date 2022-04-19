import { Card, Typography } from "antd";
import React from "react";
import CreateGuild from "utils/smart-contract/CreateGuild";

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

export default function CreateGuildPage() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card style={styles.card}>
        <CreateGuild />
      </Card>
    </div>
  );
}
