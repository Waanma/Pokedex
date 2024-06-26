import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import { DetailsScreen, HomePage, FavoritesScreen } from "../../screens";

enableScreens();

const Stack = createNativeStackNavigator();

const Navigator = () => {
	return (
		<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={HomePage} />
			<Stack.Screen name="Favorites" component={FavoritesScreen} />
			<Stack.Screen name="Details" component={DetailsScreen} />
		</Stack.Navigator>
	);
};

export default Navigator;
