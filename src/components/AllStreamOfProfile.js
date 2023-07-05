import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import BlockiesSvg from "blockies-react-svg";
import "../styles/allstreamslist.css";
import { metadata } from "./token-metadata-from-sdk";
import { getDate } from "./streamDisplayHelper";

function AllStreamOfProfile({ userAddress }) {
  // const { address } = useAccount();
  const [streamData, setStreamData] = useState({
    incoming: true,
    outgoing: false,
  });
  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai",
    cache: new InMemoryCache(),
  });

  const [incomingData, setIncomingData] = useState([]);
  const [outgoingData, setOutgoingData] = useState([]);

  useEffect(() => {
    if (userAddress) {
      const showData = async () => {
        const tokensQuery_outgoing = await client.query({
          query: gql`
            query MyQuery {
              flowUpdatedEvents(
                where: { sender: "${userAddress}" }
                orderBy: timestamp
                orderDirection: desc
              ) {
                timestamp
                sender
                receiver
                flowRate
                token
                totalAmountStreamedUntilTimestamp
                stream {
                  createdAtTimestamp
                  currentFlowRate
                  updatedAtTimestamp
                }
              }
            }
          `,
        });

        const tokensQuery_incoming = await client.query({
          query: gql`
            query {
              flowUpdatedEvents(
                where: {
                  receiver: "${userAddress}"
                }
                orderBy: timestamp
                orderDirection: desc
              ) {
                timestamp
                sender
                receiver
                flowRate
                totalAmountStreamedUntilTimestamp
                token
                stream {
                  createdAtTimestamp
                  currentFlowRate
                  updatedAtTimestamp
                }
              }
            }
          `,
        });

        const incoming = tokensQuery_incoming.data.flowUpdatedEvents;
        const outgoing = tokensQuery_outgoing.data.flowUpdatedEvents;
        // console.log(incoming);
        // console.log(outgoing);
        setIncomingData(incoming);
        setOutgoingData(outgoing);
      };

      showData();
    }

    return () => {
      setIncomingData([]);
      setOutgoingData([]);
    };
  }, [userAddress]);

  return (
    <div>
      <h3 className="all-streams">
        All Streams Data{" "}
        <span style={{ fontSize: "15px" }}>({userAddress})</span>
      </h3>

      <button
        className={streamData.incoming ? "incoming-btn active" : "incoming-btn"}
        onClick={() => setStreamData({ incoming: true, outgoing: false })}
      >
        Incoming
      </button>
      <button
        className={streamData.outgoing ? "incoming-btn active" : "incoming-btn"}
        onClick={() => setStreamData({ incoming: false, outgoing: true })}
      >
        Outgoing
      </button>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>To</th>
              <th>Flow Rate</th>
              <th>Current Flow Rate</th>
              <th>Total Streamed</th>
              <th>Start Date / End Date</th>
            </tr>
          </thead>
          <tbody>
            {streamData.incoming ? (
              incomingData.length > 0 ? (
                incomingData.map((item, key) => {
                  return (
                    <tr
                      key={key}
                      data-tooltip-id="my-tooltip6"
                      data-tooltip-content={"Click to see the timeline details"}
                    >
                      <td>
                        <div className="reciever-address">
                          <BlockiesSvg
                            address={item.sender}
                            size={8}
                            scale={30}
                            //caseSensitive={false}
                            className="blockies"
                          />
                          {item.sender.slice(0, 6) +
                            "..." +
                            item.sender.slice(
                              item.sender.length - 4,
                              item.sender.length
                            )}
                        </div>
                      </td>
                      <td>{ethers.utils.formatEther(item.flowRate)}</td>
                      <td>
                        {ethers.utils.formatEther(item.stream.currentFlowRate)}
                      </td>
                      <td>
                        {item.stream.currentFlowRate > 0
                          ? "-"
                          : ethers.utils.formatEther(
                              item.totalAmountStreamedUntilTimestamp
                            )}
                      </td>
                      <td>
                        <span className="date-main">
                          <span className="date">
                            {getDate(item.timestamp)}
                          </span>
                          <span className="date">
                            {item.stream.currentFlowRate > 0
                              ? "-"
                              : getDate(item.stream.updatedAtTimestamp)}
                          </span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    style={{ textAlign: "center", fontWeight: "600" }}
                    colSpan={5}
                  >
                    Stream Not Found
                  </td>
                </tr>
              )
            ) : null}
            {streamData.outgoing ? (
              outgoingData.length > 0 ? (
                outgoingData.map((item, key) => {
                  return (
                    <tr
                      key={key}
                      data-tooltip-id="my-tooltip6"
                      data-tooltip-content={"Click to see the timeline details"}
                    >
                      <td>
                        <div className="reciever-address">
                          <BlockiesSvg
                            address={item.receiver}
                            size={8}
                            scale={30}
                            //caseSensitive={false}
                            className="blockies"
                          />
                          {item.sender.slice(0, 6) +
                            "..." +
                            item.sender.slice(
                              item.sender.length - 4,
                              item.sender.length
                            )}
                        </div>
                      </td>
                      <td>{ethers.utils.formatEther(item.flowRate)}</td>
                      <td>
                        {ethers.utils.formatEther(item.stream.currentFlowRate)}
                      </td>
                      <td>
                        {item.stream.currentFlowRate > 0
                          ? "-"
                          : ethers.utils.formatEther(
                              item.totalAmountStreamedUntilTimestamp
                            )}
                      </td>
                      <td>
                        <span className="date-main">
                          <span className="date">
                            {getDate(item.timestamp)}
                          </span>
                          <span className="date">
                            {item.stream.currentFlowRate > 0
                              ? "-"
                              : getDate(item.stream.updatedAtTimestamp)}
                          </span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    style={{ textAlign: "center", fontWeight: "600" }}
                    colSpan={5}
                  >
                    Stream Not Found
                  </td>
                </tr>
              )
            ) : null}
          </tbody>
          {/* <Tooltip id="my-tooltip6" /> */}
        </table>
      </div>
    </div>
  );
  // else
  //   return (
  //     <div className="connect-wallet-parent">
  //       <div className="connect-btn-div">
  //         <p>Connect your wallet to </p>
  //         <ConnectButton />
  //       </div>
  //     </div>
  //   );
}

export default AllStreamOfProfile;
