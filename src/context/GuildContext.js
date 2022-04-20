import React, { createContext, useState, useEffect, useMemo } from "react";
import { useMoralis } from "react-moralis";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../constants.js";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { vote, getResults } from "utils/snapshot";
import { useMoralisWeb3Api } from "react-moralis";

export const GuildContext = createContext();

export function GuildProvider(props) {
  const { Moralis, isWeb3Enabled, user } = useMoralis();
  const [id, setId] = useState();

  const _setId = (id) => {
    setId(id);
  };

  const [polls, setPolls] = useState([
    { title: "", body: "", end: "", choices: [], id: "", scores: [] },
  ]);

  const Web3Api = useMoralisWeb3Api();

  const [members, setMembers] = useState([]);

  const [allow, setAllow] = useState(false);

  const submitVote = async (proposalId, choice) => {
    //add popup notification here later
    const res = await vote(proposalId, choice);
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
    if (isWeb3Enabled && id) {
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
                scores
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
        setMembers(transaction);
        //move this to utils folder afterwards
        const timestamp = Math.round(new Date().getTime() / 1000);

        const fetchDateToBlock = async () => {
          const options = { chain: "rinkeby", date: timestamp };
          const date = await Web3Api.native.getDateToBlock(options);
          return date.block;
        };

        const currentBlock = await fetchDateToBlock();

        getResults(currentBlock, transaction);
      };
      getMembers();
    }
  }, [isWeb3Enabled, id]);

  useEffect(() => {
    if (user) {
      console.log(user.attributes.ethAddress, members);
      const isMember = (address) =>
        address.toUpperCase() === user.attributes.ethAddress.toUpperCase();
      if (members.some(isMember)) {
        setAllow(true);
      }
    }
  }, [user, members]);

  return (
    <GuildContext.Provider
      value={{ guild, members, polls, allow, submitVote, _setId }}
    >
      {props.children}
    </GuildContext.Provider>
  );
}
