import React from "react";
import searchQuery from "./searchQuery";
import paginateQuery from "./paginateQuery";
import { reducer, initReducer } from "./reducer";
import SearchResults from "components/SearchResults";
import Textbox from "components/Textbox";
import Pagination from "components/Pagination";

import "./index.css";

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {}, initReducer);

  const sendQuery = (searchText) => {
    if (searchText) {
      dispatch({ type: "loading_start" });
      searchQuery(searchText, (res) => {
        dispatch({
          type: "search_response",
          text: searchText,
          data: res,
        });
      });
    }
  };

  const changePage = (direction, id) => {
    dispatch({ type: "loading_start" });
    paginateQuery(state.searchText, direction, id, (res) => {
      const pageDelta = direction ? 1 : -1;
      dispatch({
        type: "pagination_response",
        data: res,
        pageDelta,
      });
    });
  };

  return (
    <div class="container">
      <Textbox sendQuery={sendQuery} />
      <Pagination
        loading={state.loading}
        count={state.count}
        page={state.page}
        cursor={state.cursor}
        changePage={changePage}
      />
      <SearchResults loading={state.loading} results={state.searchResults} />
    </div>
  );
};

export default App;
