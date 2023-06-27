import React, { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { useAccount } from "wagmi";

function AllStreamOfProfile() {
  const { address } = useAccount();

  const client = new ApolloClient({
    uri: "https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-mumbai",
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    client
      .query({
        query: gql`
          query MyQuery {
            streams(
              where: { receiver: "0x619058cc41ab48e0ac3d86b09c7bfe68b8b0dcbe" }
            ) {
              currentFlowRate
              token {
                symbol
              }
              sender {
                id
              }
              receiver {
                id
              }
            }
          }
        `,
      })
      .then((result) => console.log(result));
  }, [address]);
  return <div>AllStreamOfProfile</div>;
}

export default AllStreamOfProfile;
