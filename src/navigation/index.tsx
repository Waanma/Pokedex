import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./tabs";
import { FavoritesProvider } from "../components/favorites";

const Navigation = () => {
	return (
		<FavoritesProvider>
			<NavigationContainer>
				<TabsNavigator />
			</NavigationContainer>
		</FavoritesProvider>
	);
};

export default Navigation;
