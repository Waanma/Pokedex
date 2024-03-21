import React from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { App } from "./src";

const client = new ApolloClient({
	uri: "https://beta.pokeapi.co/graphql/v1beta",
	cache: new InMemoryCache(),
});

const AppMain = () => {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	);
};

AppRegistry.registerComponent(appName, () => AppMain);
