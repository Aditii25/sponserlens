import React, { useState, useEffect } from "react";

import "../../styles/search.css";
import { LensClient, production, development } from "@lens-protocol/client";

const lensClient = new LensClient({
  environment: production,
});

function Search(props) {
  useEffect(() => {
    const delay = 500; // Adjust the delay duration (in milliseconds) as needed
    let timeoutId = null;

    const fetchData = async () => {
      try {
        props.setSearchOver("searching");

        const result = await lensClient.search.profiles({
          query: props.searchQuery,
          limit: 12,
        });
        console.log(result.items);
        if (result.items.length > 0) {
          props.setSearchOver("found");
        } else {
          props.setSearchOver("not-found");
        }
        props.setSearchResults(result.items);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const handleInputChange = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        fetchData();
      }, delay);
    };

    handleInputChange();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [props.searchQuery]);

  const handleChange = (event) => {
    props.setSearchQuery(event.target.value);
  };

  return (
    <div className="search-text-container">
      <div className="search-input-container">
        <svg
          className="search-icon"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          ></path>
        </svg>

        <input
          type="text"
          className="search-input"
          placeholder="Search Lens Account"
          value={props.searchQuery}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Search;
