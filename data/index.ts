import { ApolloClient, InMemoryCache } from "@apollo/client";

export * as Crystalize from "./crystalize";
export * as Internal from "./internal";
export * as CMS from "./cms";

export const appolloClient = new ApolloClient({
  uri: "https://api.crystallize.com/leo-carlton/catalogue",
  cache: new InMemoryCache(),
});
