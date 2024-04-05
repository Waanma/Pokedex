import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "../tabs";
import HomePage from "../../screens/HomePage";

const Stack = createNativeStackNavigator();

const Navigator = () => {
	return (
		<Stack.Navigator initialRouteName="Tabs">
			<Stack.Screen name="Tabs" component={TabsNavigator} />
			<Stack.Screen name="Home" component={HomePage} />
		</Stack.Navigator>
	);
};

export default Navigator;
