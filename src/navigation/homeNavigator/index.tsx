import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/homePage/index";
import Details from "../../screens/details";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Home" screenOptions={{}}>
			<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
			<Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

export default HomeNavigator;
