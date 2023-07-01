// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "YWoJmecAxttkwdfOQkA54HkMhc8kcRNL",
  network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(config);

// The token address we want to query for metadata
export const metadata = async (tokenAdd) => {
  const data = await alchemy.core.getTokenMetadata(`${tokenAdd}`);
  //   console.log(data);
  return data.name;
};
