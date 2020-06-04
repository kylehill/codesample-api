import React from "react";
import SearchResult from "components/SearchResult";
import ProgressBar from "components/ProgressBar";

import "./index.css";

const SearchResults = ({ results, loading }) => {
  if (loading) {
    return <ProgressBar />;
  }
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="search-results">
      {results.map((res, idx) => {
        return <SearchResult key={idx} result={res} />;
      })}
    </div>
  );
};

export default SearchResults;
