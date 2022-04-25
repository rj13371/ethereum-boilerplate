import { Card, Spin, Col, Row, Image, Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const { Meta } = Card;

export default function GuildsDisplay(props) {
  const { guilds } = props;

  if (guilds.length === 0) {
    return <Spin />;
  }

  const style = {
    padding: "10%",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
    width: 180,
    height: 230,
  };

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {guilds.map((guild) => (
          <>
            <Col>
              <NavLink key={`${guild[1]}`} to={`/guild/${guild.index}`}>
                <Card style={style} hoverable>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                    }}
                    preview={false}
                    alt={`${guild[1]}'s logo`}
                    src={guild[2]}
                  />

                  <Meta
                    title={`${guild[1]}`}
                    description={`${Number(guild[4].hex)} members`}
                  />

                  <Button
                    style={{ marginTop: "10px" }}
                    type="ghost"
                    shape="round"
                    size={"large"}
                  >
                    Join
                  </Button>
                </Card>
              </NavLink>
            </Col>
          </>
        ))}
      </Row>
    </>
  );
}
