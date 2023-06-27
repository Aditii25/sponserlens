import getIPFSLink from "./getIPFSLink";

/**
 *
 * @param publication - Publication object
 * @returns publication image url
 */
const getPublicationThumbnail = (publication) => {
  if (!publication?.metadata?.image) {
    return "";
  }

  const isIPFSLink = publication?.metadata?.image?.startsWith("ipfs://");
  const imageSource = isIPFSLink
    ? `https://ipfs.io/ipfs/${publication?.metadata?.image?.split("://")[1]}`
    : publication?.metadata?.image;

  return imageSource;
};

export default getPublicationThumbnail;
