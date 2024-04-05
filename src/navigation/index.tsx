import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./tabs";

const Navigation = () => {
	return (
		<NavigationContainer>
			<TabsNavigator />
		</NavigationContainer>
	);
};

export default Navigation;
