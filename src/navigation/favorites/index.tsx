import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorites from "../../screens/favorites";

const Stack = createNativeStackNavigator();

const FavoritesNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Favorites" screenOptions={{}}>
			<Stack.Screen name="Favorites" component={Favorites} />
		</Stack.Navigator>
	);
};

export default FavoritesNavigator;
