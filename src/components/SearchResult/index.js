import React from "react";
import "./index.css";

const SearchResultField = ({ result, field }) => {
  if (result[field] === undefined || result[field] === null) {
    return null;
  }

  let value = result[field];
  if (value.totalCount !== undefined) {
    value = value.totalCount;
  }

  return <span className={`sr-field sr-${field}`}>{value}</span>;
};

const Organizations = ({ organizations }) => {
  // this happens for some weird results --
  // the first response for "code" is an empty object
  if (organizations && organizations.nodes.length) {
    return (
      <div className="sr-row">
        {organizations.nodes.map((org, idx) => {
          return (
            <img
              alt={`Member of ${org.name}`}
              className="sr-org-avatar"
              src={org.avatarUrl}
              key={idx}
            ></img>
          );
        })}
      </div>
    );
  }

  return null;
};

const SearchResult = ({ result }) => {
  return (
    <a
      className="search-result-container"
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="search-result">
        <img
          className="sr-avatar"
          alt={`Avatar for ${result.name || result.login}`}
          src={result.avatarUrl}
        ></img>
        <div className="sr-content">
          <div className="sr-row">
            <SearchResultField result={result} field="name" />
            <SearchResultField result={result} field="login" />
          </div>
          <div className="sr-row">
            <SearchResultField result={result} field="repositories" />
            <SearchResultField result={result} field="location" />
            <SearchResultField result={result} field="company" />
          </div>
          <Organizations organizations={result.organizations} />
          {result.bio && <SearchResultField result={result} field="bio" />}
          <div className="sr-row">
            Following <SearchResultField result={result} field="following" /> users, followed by{" "}
            <SearchResultField result={result} field="followers" /> users,{" "}
            <SearchResultField result={result} field="starredRepositories" /> starred repos
          </div>
        </div>
      </div>
    </a>
  );
};

export default SearchResult;
