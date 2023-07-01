import React, { useEffect, useState } from "react";
import "../../styles/leaderboardapi.css";
import { LensClient, development, production } from "@lens-protocol/client";
import { useNavigate } from "react-router-dom";
import placeholder from "../../assets/profile_placeholder.png";

function LeaderboardApi({ sortCriteria }) {
  const navigate = useNavigate();
  const lensClient = new LensClient({
    environment: production,
  });

  const [profiles, setProfiles] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await lensClient.explore.profiles({
          sortCriteria,
        });

        setProfiles(response.items);
        console.log(response.items);
        setNextPageToken(response.pageInfo.next);
        setPrevPageToken(response.pageInfo.prev);
      } catch (error) {
        console.error("Error fetching explore profiles:", error);
      }
    };

    fetchData();
  }, [sortCriteria]);

  const handleNextPage = async () => {
    if (nextPageToken) {
      try {
        const response = await lensClient.explore.profiles({
          sortCriteria,
          cursor: nextPageToken,
        });

        setProfiles(response.items);
        setNextPageToken(response.pageInfo.next);
        setPrevPageToken(response.pageInfo.prev);
      } catch (error) {
        console.error("Error fetching next page:", error);
      }
    }
  };

  const handlePrevPage = async () => {
    if (prevPageToken) {
      try {
        const response = await lensClient.explore.profiles({
          sortCriteria,
          cursor: prevPageToken,
        });

        setProfiles(response.items);
        setNextPageToken(response.pageInfo.next);
        setPrevPageToken(response.pageInfo.prev);
      } catch (error) {
        console.error("Error fetching previous page:", error);
      }
    }
  };
  const getProfileImage = (link) => {
    const isIPFSLink = link?.startsWith("ipfs://");
    const imageSource = isIPFSLink
      ? `https://ipfs.io/ipfs/${link?.split("://")[1]}`
      : link;
    if (imageSource) return imageSource;
    else return placeholder;
  };
  return (
    <div>
      <div className="grid-container">
        {profiles.map((profile) => (
          <div
            className="grid-item"
            key={profile.id}
            onClick={() => navigate("/user", { state: { profile: profile } })}
          >
            <div className="grid-item-top">
              <div className="profile-image">
                <img
                  src={getProfileImage(profile.picture?.original?.url)}
                  alt={profile.name}
                />
              </div>
              <div className="profile-info">
                <span className="profile-id">{profile.id}</span>
                <span className="profile-name">{profile.name}</span>
                <span className="profile-handle">@{profile.handle}</span>
              </div>
            </div>
            <div className="grid-item-bottom">
              <div>
                <p className="value">{profile.stats.totalPosts}</p>
                <p className="title">Posts</p>
              </div>
              <div>
                <p className="value">{profile.stats.totalFollowers}</p>
                <p className="title">Followers</p>
              </div>

              <div>
                <p className="value">{profile.stats.totalFollowing}</p>
                <p className="title">Following</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handlePrevPage} disabled={!prevPageToken}>
        Previous Page
      </button>
      <button onClick={handleNextPage} disabled={!nextPageToken}>
        Next Page
      </button>
    </div>
  );
}

export default LeaderboardApi;
