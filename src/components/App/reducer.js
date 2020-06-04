export const reducer = (state, action) => {
  switch (action.type) {
    case "loading_start":
      return {
        ...state,
        loading: true,
      };

    case "search_response":
      return {
        ...state,
        searchText: action.text,
        searchResults: action.data.nodes,
        cursor: action.data.pageInfo,
        count: action.data.userCount,
        page: 0,
        loading: false,
      };

    case "pagination_response":
      return {
        ...state,
        searchResults: action.data.nodes,
        cursor: action.data.pageInfo,
        count: action.data.userCount,
        page: action.pageDelta + state.page,
        loading: false,
      };

    default:
      return state;
  }
};

export const initReducer = () => ({
  searchText: "",
  searchResults: [],
  count: null,
  page: null,
  cursor: null,
  loading: false,
});
