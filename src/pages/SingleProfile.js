import React, { useEffect, useState } from "react";
import Feed from "../components/queries/Feed";
import "../styles/singleprofile.css"; // Import the CSS file for styling
import { useLocation } from "react-router-dom";
import formatNumber from "../components/formatNumber";
import SendStreamPopup from "../components/SendStreamPopup";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import AllStreamOfProfile from "../components/AllStreamOfProfile";
import placeholder from "../assets/profile_placeholder_single_profile.png";

function SingleProfile() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const location = useLocation();
  const [profile, setProfile] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (location.state.profile) {
      setProfile(location.state.profile);
      console.log(location.state.profile);
    }
  }, [location.state?.profile]);

  const [display, setDisplay] = useState("Posts");
  const handleSortCriteriaChange = (item) => {
    setDisplay(item);
  };

  const handleSponsorClick = async () => {
    if (!address) {
      await openConnectModal();
    }
    setIsOpen(true);
  };
  const getProfileImage = (link) => {
    const isIPFSLink = link?.startsWith("ipfs://");
    const imageSource = isIPFSLink
      ? `https://ipfs.io/ipfs/${link?.split("://")[1]}`
      : link;
    if (imageSource) return imageSource;
    else return placeholder;
  };
  if (profile)
    return (
      <div className="single-profile-container">
        <div className="single-profile-cover">
          {profile?.coverPicture?.original?.url && (
            <img
              src={getProfileImage(profile?.coverPicture?.original?.url)}
              alt="Cover"
            />
          )}
        </div>
        <div className="single-profile-first">
          <div className="one">
            <img
              src={getProfileImage(profile.picture?.original?.url)}
              alt={profile.name}
            />
          </div>
          <div className="two">
            <div className="single-profile-info">
              <span className="single-profile-id">{profile.id}</span>
              <span className="single-profile-name">{profile.name}</span>
              <span className="single-profile-handle">@{profile.handle}</span>
            </div>
            <div className="single-profile-stats">
              <div className="list">
                <span className="value">
                  {formatNumber(profile.stats.totalPosts)}
                </span>
                <span className="title">Posts</span>
              </div>
              <div className="list">
                <span className="value">
                  {formatNumber(profile.stats.totalFollowers)}
                </span>
                <span className="title">Followers</span>
              </div>
              <div className="list">
                <span className="value">
                  {formatNumber(profile.stats.totalFollowing)}
                </span>
                <span className="title">Following</span>
              </div>
            </div>
            <div className="single-profile-bio">{profile.bio}</div>
          </div>
          <div className="three">
            <button
              onClick={() => {
                handleSponsorClick();
              }}
            >
              Sponsor
            </button>
          </div>
        </div>
        <div className="single-profile-second">
          <ul>
            <li
              className={display === "Posts" ? "active" : ""}
              onClick={() => handleSortCriteriaChange("Posts")}
            >
              Posts
            </li>
            <li
              className={display === "Streams" ? "active" : ""}
              onClick={() => handleSortCriteriaChange("Streams")}
            >
              Streams
            </li>
          </ul>
          {display === "Posts" && <Feed id={profile.id} />}
          {display === "Streams" && (
            <AllStreamOfProfile userAddress={profile.ownedBy} />
          )}
        </div>
        {isOpen && (
          <SendStreamPopup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            address={profile.ownedBy}
          />
        )}
      </div>
    );
}

export default SingleProfile;
