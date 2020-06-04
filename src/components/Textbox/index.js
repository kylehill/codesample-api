import React from "react";

import "./index.css";

const Textbox = ({ sendQuery }) => {
  const [searchText, setSearchText] = React.useState("");

  return (
    <form
      className="textbox"
      onSubmit={(e) => {
        sendQuery(searchText);
        e.preventDefault();
      }}
    >
      <input
        className="tb-text"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className="tb-button">Search</button>
    </form>
  );
};

export default Textbox;
