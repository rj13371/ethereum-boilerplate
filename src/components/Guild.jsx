import { Card, Typography, Button } from "antd";
import React, { useMemo, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import Mint from "utils/smart-contract/Mint";
import CreatePoll from "./CreatePoll";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../constants.js";
import { useParams } from "react-router-dom";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { vote } from "utils/snapshot";

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

export default function Guild() {
  const { Moralis, isWeb3Enabled } = useMoralis();
  const { id } = useParams();
  const [polls, setPolls] = useState([
    { title: "", body: "", end: "", choices: [], id: "" },
  ]);

  const [members, setMembers] = useState([]);

  const submitVote = async (proposalId, choice) => {
    console.log(proposalId, choice);
    const res = await vote(proposalId, choice);
    console.log(res);
  };

  const client = new ApolloClient({
    uri: "https://hub.snapshot.org/graphql",
    cache: new InMemoryCache(),
  });

  const [guild, setGuild] = useState({
    guildMasterAddress: "",
    guildTitle: "",
    guildLogo: "",
  });

  useMemo(() => {
    if (isWeb3Enabled) {
      const getPolls = async () => {
        const res = await client.query({
          query: gql`
            query Proposals {
              proposals(
                first: 20
                skip: 0
                where: { space_in: ["dappchain.eth"], state: "active" }
                orderBy: "created"
                orderDirection: desc
              ) {
                id
                title
                body
                choices
                start
                end
                snapshot
                state
                author
                space {
                  id
                  name
                }
              }
            }
          `,
        });
        setPolls(res.data.proposals);
        console.log(res.data.proposals);
      };
      getPolls();
      const getGuilds = async () => {
        const sendOptions = {
          contractAddress: NFT_CONTRACT_ADDRESS,
          abi: NFT_CONTRACT_ABI,
          functionName: "returnGuilds",
          chain: "rinkeby",
        };
        const transaction = await Moralis.executeFunction(sendOptions);
        console.log(transaction);
        setGuild({
          guildMasterAddress: transaction[id][0],
          guildTitle: transaction[id][1],
          guildLogo: transaction[id][2],
        });
      };
      getGuilds();

      const getMembers = async () => {
        const sendOptions = {
          contractAddress: NFT_CONTRACT_ADDRESS,
          abi: NFT_CONTRACT_ABI,
          functionName: "returnGuildMembers",
          chain: "rinkeby",
          params: {
            guildId: id,
          },
        };
        const transaction = await Moralis.executeFunction(sendOptions);
        console.log(transaction);
        setMembers(transaction);
      };
      getMembers();
    }
  }, [isWeb3Enabled]);

  // useMemo(() => {
  //   if (isWeb3Enabled) {
  //     const getVotingResultes = async () => {
  //       const res = await client.query({
  //         query: gql`
  //           query Votes {
  //             votes(
  //               first: 1000
  //               skip: 0
  //               where: {
  //                 proposal: "QmPvbwguLfcVryzBRrbY4Pb9bCtxURagdv1XjhtFLf3wHj"
  //               }
  //               orderBy: "created"
  //               orderDirection: desc
  //             ) {
  //               id
  //               voter
  //               created
  //               proposal {
  //                 id
  //               }
  //               choice
  //               space {
  //                 id
  //               }
  //             }
  //           }
  //         `,
  //       });
  //       setPolls(res.data.votes);

  //       for (const vote of res.data.votes) {
  //       }
  //     };

  //     getGuilds();
  //   }
  // }, [polls]);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={styles.card}
        hoverable
        title={
          <>
            📝 <Text strong>{guild.guildTitle || ""}</Text>
          </>
        }
        cover={<img alt="guild logo" src={guild.guildLogo || "error"} />}
      >
        <Mint guildId={id} />
        {members.length > 0 && <CreatePoll members={members} />}
      </Card>
      {polls.length > 0 &&
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
              <Button
                id={index + 1}
                type="dashed"
                onClick={() => submitVote(poll.id, index + 1)}
                block
              >
                {choice}
              </Button>
            ))}
          </Card>
        ))}
    </div>
  );
}
