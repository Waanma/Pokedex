import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "../homeNavigator";
import Favorites from "../../screens/favorites";

const BottomTab = createBottomTabNavigator();

const TabsNavigator = () => {
	return (
		<BottomTab.Navigator
			initialRouteName="All"
			screenOptions={{
				headerShown: false,
				tabBarInactiveBackgroundColor: "#db3c36",
				tabBarActiveBackgroundColor: "#35d4db",
				tabBarActiveTintColor: "gray",
				tabBarInactiveTintColor: "black",
			}}
		>
			<BottomTab.Screen
				name="All"
				component={HomeNavigator}
				options={{
					tabBarStyle: {
						borderTopWidth: 3,
						borderTopColor: "#35d4db",
						backgroundColor: "#35d4db",
					},
				}}
			/>
			<BottomTab.Screen
				name="Favorites"
				component={Favorites}
				options={{
					tabBarStyle: {
						borderTopWidth: 3, // Grosor del borde superior
						borderTopColor: "#35d4db", // Color del borde superior
						backgroundColor: "#35d4db", // Color de fondo del tab bar
					},
				}}
			/>
		</BottomTab.Navigator>
	);
};

export default TabsNavigator;
