import { Card, Space, Spin, Col, Row, Image } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    width: 320,
    height: 400,
  };

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {guilds.map((guild, index) => (
          <>
            <Col>
              <NavLink key={`${guild[1]}`} to={`/guild/${index}`}>
                <Card style={style} hoverable>
                  <Image
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                    }}
                    preview={false}
                    alt={`${guild[1]}'s logo`}
                    src={guild[2]}
                  />

                  <Meta
                    title={`${guild[1]}`}
                    description={`${Number(guild[4]._hex)} members`}
                  />
                </Card>
              </NavLink>
            </Col>
          </>
        ))}
      </Row>
    </>
  );
}
