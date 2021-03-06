import env from "./env.json";
import { GraphQLClient } from "graphql-request";

export default async (searchText, forward, id, callback) => {
  const endpoint = "https://api.github.com/graphql";
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `bearer ${env.ghToken}`,
    },
  });

  const take = forward ? "first" : "last";
  const cursor = forward ? "after" : "before";

  const query = `
    query($query_text: String!) {
      search(query: $query_text, type: USER, ${take}: 10, ${cursor}: "${id}") {
        userCount
        pageInfo {
          endCursor
          startCursor
        }
        nodes {
          ... on User {
            login
            name
            avatarUrl(size: 80)
            bio
            location
            url
            company
            organizations(first: 6) {
              nodes {
                ... on Organization {
                  avatarUrl(size: 32)
                  name
                  login
                  isVerified
                  location
                  descriptionHTML
                  url
                  membersWithRole {
                    totalCount
                  }
                }
              }
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
            starredRepositories {
              totalCount
            }
            repositories {
              totalCount
            }
          }
        }
      }
    }
  `;

  const variables = { query_text: searchText };

  const data = await client.request(query, variables);
  callback(data.search);
};
