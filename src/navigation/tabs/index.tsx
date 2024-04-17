import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
				tabBarActiveTintColor: "black",
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
					tabBarIcon: ({ color, size }) => {
						return <Icon name="pokeball" size={size} color={color} />;
					},
				}}
			/>
			<BottomTab.Screen
				name="Favorites"
				component={Favorites}
				options={{
					tabBarStyle: {
						borderTopWidth: 3,
						borderTopColor: "#35d4db",
						backgroundColor: "#35d4db",
					},
					tabBarIcon: ({ color, size }) => {
						return <Icon name="folder-heart" size={size} color={color} />;
					},
				}}
			/>
		</BottomTab.Navigator>
	);
};

export default TabsNavigator;
