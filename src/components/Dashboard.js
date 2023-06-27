import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import LeaderboardApi from "./queries/LeaderboardApi";
import Search from "./queries/Search";

const Dashboard = () => {
  const [sortCriteria, setSortCriteria] = useState(
    localStorage.getItem("sortCriteria") || "MOST_FOLLOWERS"
  );
  const [searchResults, setSearchResults] = useState([1]);
  const [searchOver, setSearchOver] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortCriteriaChange = (criteria) => {
    setSortCriteria(criteria);
    localStorage.setItem("sortCriteria", criteria);
  };

  useEffect(() => {
    const storedSortCriteria = localStorage.getItem("sortCriteria");
    if (storedSortCriteria) {
      setSortCriteria(storedSortCriteria);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="search-container">
        <h1 className="search-title">Search Lens Account</h1>
        <div className="search-input">
          <Search
            setSearchResults={setSearchResults}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSearchOver={setSearchOver}
          />
        </div>
      </div>
      {searchQuery ? (
        <div className="content">
          {/* Search results  */}
          {<h2 className="search-result-h2">Search Results</h2>}

          {searchResults.length > 0 && searchOver === "found" && (
            <>
              <div className="grid-container">
                {searchResults.map((profile, index) => (
                  <div className="grid-item" key={index}>
                    <div className="grid-item-top">
                      <div className="profile-image">
                        <img
                          src={profile.picture?.original?.url}
                          alt={profile.name}
                        />
                      </div>
                      <div className="profile-info">
                        <span className="profile-id">{profile.id}</span>
                        <span className="profile-name">{profile.name}</span>
                        <span className="profile-handle">{profile.handle}</span>
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
              <hr />
            </>
          )}
          {searchOver && searchOver === "searching" && (
            <>
              <div className="search-animation">
                <div className="searching-circle"></div>
                <p className="searching-text">Searching...</p>
              </div>
            </>
          )}

          {searchOver && searchOver === "not-found" && (
            <>
              <div className="grid-container">
                <div className="grid-item not-found">
                  <h3 style={{ textAlign: "center" }}>Profile Not Found</h3>
                  <p>Sorry, we couldn't find the profile you're looking for.</p>
                  <p>Try to search by Wallet Address / Handle</p>
                </div>
              </div>
              <hr />
            </>
          )}
        </div>
      ) : (
        ""
      )}

      <h2 className="leaderboard">Leaderboard</h2>
      <div className="top-navigation">
        <ul>
          <li
            className={sortCriteria === "MOST_FOLLOWERS" ? "active" : ""}
            onClick={() => handleSortCriteriaChange("MOST_FOLLOWERS")}
          >
            Most Followers
          </li>
          <li
            className={sortCriteria === "MOST_MIRRORS" ? "active" : ""}
            onClick={() => handleSortCriteriaChange("MOST_MIRRORS")}
          >
            Most Mirrors
          </li>
          <li
            className={sortCriteria === "MOST_POSTS" ? "active" : ""}
            onClick={() => handleSortCriteriaChange("MOST_POSTS")}
          >
            Most Posts
          </li>
          <li
            className={sortCriteria === "MOST_COMMENTS" ? "active" : ""}
            onClick={() => handleSortCriteriaChange("MOST_COMMENTS")}
          >
            Most Comments
          </li>
          <li
            className={sortCriteria === "MOST_PUBLICATION" ? "active" : ""}
            onClick={() => handleSortCriteriaChange("MOST_PUBLICATION")}
          >
            Most Publication
          </li>
          <li
            className={sortCriteria === "MOST_COLLECTS" ? "active" : ""}
            onClick={() => handleSortCriteriaChange("MOST_COLLECTS")}
          >
            Most Collects
          </li>
          <li
            className={sortCriteria === "CREATED_ON" ? "active" : ""}
            onClick={() => handleSortCriteriaChange("CREATED_ON")}
          >
            Create On
          </li>
          <li
            className={sortCriteria === "LATEST_CREATED" ? "active" : ""}
            onClick={() => handleSortCriteriaChange("LATEST_CREATED")}
          >
            Latest Created
          </li>
        </ul>
      </div>

      <div className="content">
        {/* Render content based on activeContent */}

        <LeaderboardApi sortCriteria={sortCriteria} />
      </div>
    </div>
  );
};

export default Dashboard;
