import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import Cookies from "js-cookie";

const httpLink = new HttpLink({
  uri: graphqlbaseUrl,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("localtoken");
  console.log("Token from authMiddleware:", token); // Debug line
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
