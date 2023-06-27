export const IPFS_GATEWAY = "https://lens.infura-ipfs.io/ipfs/";

const getIPFSLink = (hash) => {
  if (!hash) {
    return "";
  }
  const gateway = IPFS_GATEWAY;

  return hash
    .replace(/^Qm[1-9A-Za-z]{44}/gm, `${gateway}${hash}`)
    .replace("https://ipfs.io/ipfs/", gateway)
    .replace("ipfs://", gateway);
};

export default getIPFSLink;
