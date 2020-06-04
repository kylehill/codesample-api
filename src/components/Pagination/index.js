import React from "react";

import "./index.css";

const Pagination = ({ count, page, cursor, changePage, loading }) => {
  if (count === null || loading) {
    return null;
  }

  if (count === 0) {
    return <div className="pagination">No matching users found.</div>;
  }

  if (count <= 10) {
    return <div className="pagination">Showing all {count} users.</div>;
  }

  const displayFirst = page * 10 + 1;
  const displayLast = Math.min(page * 10 + 10, count);
  const displayText = `Showing ${displayFirst}-${displayLast} of ${count.toLocaleString()} users.`;

  const clickBack = () => changePage(false, cursor.startCursor);
  const clickNext = () => changePage(true, cursor.endCursor);

  return (
    <div className="pagination">
      <div className="pg-text">{displayText}</div>
      {page > 0 && (
        <button className="pg-button" onClick={clickBack}>
          Back
        </button>
      )}
      {displayLast < count && (
        <button className="pg-button" onClick={clickNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
