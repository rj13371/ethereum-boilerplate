import { Card, Typography, Button, Spin, Image } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import Mint from "utils/smart-contract/Mint";
import CreatePoll from "../../components/CreatePoll";
import { useParams } from "react-router-dom";
import { GuildContext } from "context/GuildContext";

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
  logo: {
    alignSelf: "flex-start",
    width: "200px",
    height: "200px",
  },
};

export default function Guild() {
  const { user } = useMoralis();
  const { id } = useParams();

  const { guild, polls, members, allow, submitVote, _setId } =
    useContext(GuildContext);

  useEffect(() => {
    _setId(id);
  }, []);

  if (!user) {
    return <Spin />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        gap: "10px",
      }}
    >
      <Card
        style={styles.card}
        hoverable
        title={
          <>
            <Text strong>{guild.guildTitle || ""}</Text>
          </>
        }
      >
        <Image
          preview={false}
          placeholder={
            <Image
              preview={false}
              src={`${guild.guildLogo}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
              width={200}
            />
          }
          style={styles.logo}
          alt="guild logo"
          src={guild.guildLogo || "error"}
        />
        <br />
        <br />
        <Text strong>{`${members.length + 1} guild members` || ""}</Text>
        {allow === false && <Mint guildId={id} />}

        {members.length > 0 && <CreatePoll members={members} />}
      </Card>
      {polls.length > 0 &&
        allow === true &&
        polls.map((poll) => (
          <Card
            id={poll.id}
            title={
              <>
                <Text strong>{poll.title || ""}</Text>
              </>
            }
            hoverable
            style={{ width: "500px" }}
          >
            <Text strong>{poll.body || ""}</Text>
            {poll.choices.map((choice, index) => (
              <>
                <Button
                  id={index + 1}
                  type="dashed"
                  onClick={() => submitVote(poll.id, index + 1)}
                  block
                >
                  {choice}
                </Button>
              </>
            ))}

            <Card hoverable style={{ width: "300px" }}>
              Results:
              <br />
              {poll.choices.map((choice, index) => (
                <span key={choice}>
                  <br />
                  {choice} {poll.scores[index]}
                </span>
              ))}
            </Card>
          </Card>
        ))}
    </div>
  );
}
