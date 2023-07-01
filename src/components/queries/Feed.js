import React, { useEffect, useState } from "react";
import { LensClient, development, production } from "@lens-protocol/client";
import getPublicationThumbnail from "../getPublicationThumbnail";
import { Link } from "react-router-dom";
import placeholder from "../../assets/placeholder.jpg";

const lensClient = new LensClient({
  environment: production,
});

function Feed({ id }) {
  const [feedData, setFeedData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const result = await lensClient.publication.fetchAll({
        profileId: `${id}`,
        publicationTypes: ["POST"],
      });
      console.log(result);
      setFeedData(result.items);
      setNextPageToken(result.pageInfo.next);
      setPrevPageToken(result.pageInfo.prev);
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  const handleNext = async () => {
    if (nextPageToken) {
      try {
        const response = await lensClient.publication.fetchAll({
          profileId: "0x1b",

          cursor: nextPageToken,
        });

        setFeedData(response.items);
        setNextPageToken(response.pageInfo.next);
        setPrevPageToken(response.pageInfo.prev);
      } catch (error) {
        console.error("Error fetching next page:", error);
      }
    }
  };

  const handlePrevious = async () => {
    if (nextPageToken) {
      try {
        const response = await lensClient.publication.fetchAll({
          profileId: "0x1b",

          cursor: prevPageToken,
        });

        setFeedData(response.items);
        setNextPageToken(response.pageInfo.next);
        setPrevPageToken(response.pageInfo.prev);
      } catch (error) {
        console.error("Error fetching next page:", error);
      }
    }
  };

  const renderGrid = () => {
    const MAX_LINES = 2;

    const truncateText = (text, maxLines) => {
      if (text) {
        const lines = text.split("\n");
        if (lines.length > maxLines) {
          const truncatedLines = lines.slice(0, maxLines);
          return truncatedLines.join("\n") + "...";
        }
        return text;
      } else return "";
    };
    return (
      <div className="flex_container_posts">
        {feedData.length > 0 &&
          feedData.map((post, index) => (
            <Link
              className="flex_item_post"
              key={index}
              to={`https://lenster.xyz/posts/${post.id}`}
              target="_blank"
            >
              <div className="post-thumbnail">
                {post && post?.metadata?.image ? (
                  <img src={getPublicationThumbnail(post)} alt={post.id} />
                ) : (
                  <img src={placeholder} alt={post.id} />
                )}
              </div>
              <div className="post-info">
                {/* <p className="post-description">
                  {truncateText(post.metadata?.description, MAX_LINES)}
                </p> */}
                <p className="post-content">
                  {truncateText(post.metadata?.content, MAX_LINES)}
                  {}
                </p>
                <p className="post-name">{post.metadata?.name}</p>
              </div>
              <div className="like-dislikes-post">
                <div>
                  <span className="vote-value">{post.stats.totalUpvotes}</span>
                  <span className="upvote-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 0 24 24"
                      width="18px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
                      <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" />
                    </svg>
                  </span>
                </div>
                <div>
                  <span className="vote-value">
                    {post.stats.totalDownvotes}
                  </span>
                  <span className="downvote-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 0 24 24"
                      width="18px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
                      <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm0 12-4.34 4.34L12 14H3v-2l3-7h9v10zm4-12h4v12h-4z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="posts-stats">
                <div>
                  <span className="stats-value mirrors">
                    {post.stats.totalAmountOfMirrors}
                  </span>
                  <span className="stats-title mirrors">Mirros</span>
                </div>
                <div>
                  <span className="stats-value comments">
                    {post.stats.totalAmountOfComments}
                  </span>
                  <span className="stats-title comments">Comments</span>
                </div>
                <div>
                  <span className="stats-value collects">
                    {post.stats.totalAmountOfCollects}
                  </span>
                  <span className="stats-title collects">Collects</span>
                </div>
              </div>
              {/* Add more elements as needed */}
            </Link>
          ))}
      </div>
    );
  };

  return (
    <div>
      {feedData.length > 0 ? (
        <>
          {renderGrid()}
          <div className="pagination">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </>
      ) : (
        <p>
          {feedData.length === 0 ? "Loading feed..." : "No posts available."}
        </p>
      )}
    </div>
  );
}

export default Feed;
