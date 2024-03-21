import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigator from "../stackNavigator";

const BottomTab = createBottomTabNavigator();

const TabsNavigator = () => {
	return (
		<BottomTab.Navigator initialRouteName="Home">
			<BottomTab.Screen name="HomeTab" component={StackNavigator} />
		</BottomTab.Navigator>
	);
};

export default TabsNavigator;
