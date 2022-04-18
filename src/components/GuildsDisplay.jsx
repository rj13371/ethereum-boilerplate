import { Card, Space } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const { Meta } = Card;

export default function GuildsDisplay(props) {
  const { guilds } = props;
  return (
    <Space
      direction="horizontal"
      style={{ width: "100%", justifyContent: "center" }}
    >
      {guilds.map((guild, index) => (
        <NavLink key={`${guild[1]}`} to={`/guild/${index}`}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                style={{ width: 200, height: 200 }}
                alt={`${guild[1]}'s logo`}
                src={guild[2]}
              />
            }
          >
            <Meta
              title={`${guild[1]}`}
              description={`${Number(guild[4]._hex)} members`}
            />
          </Card>
        </NavLink>
      ))}
    </Space>
  );
}
