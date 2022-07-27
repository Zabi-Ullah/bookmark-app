import React from "react";
import Client from "./client";
import { ApolloProvider } from "@apollo/client";

export const wrapRootElement = ({ element }) => {
  return (<ApolloProvider client={Client}>{element}</ApolloProvider>)
};
