import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeNavigator from "../homeNavigator";
import Favorites from "../../screens/favorites";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useOrientation from "../../utils/useOrientarion";

const BottomTab = createBottomTabNavigator();

const TabsNavigator = () => {
	const { isPortrait } = useOrientation();

	return (
		<SafeAreaProvider>
			<View style={{ flex: 1 }}>
				<BottomTab.Navigator
					initialRouteName="All"
					screenOptions={{
						headerShown: false,
						tabBarShowLabel: false,
						tabBarStyle: {
							position: "absolute",
							bottom: 12,
							left: isPortrait ? 20 : 50,
							right: isPortrait ? 20 : 50,
							backgroundColor: "#35d4db",
							borderRadius: 20,
							height: 50,
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 10 },
							shadowOpacity: 0.25,
							shadowRadius: 3.5,
							elevation: 5,
							overflow: "hidden",
						},
						tabBarInactiveBackgroundColor: "#e0e0e0",
						tabBarActiveBackgroundColor: "#fff",
						tabBarActiveTintColor: "black",
					}}
				>
					<BottomTab.Screen
						name="All"
						component={HomeNavigator}
						options={{
							tabBarIcon: ({ color, size }) => {
								return <Icon name="pokeball" size={size} color={color} />;
							},
						}}
					/>
					<BottomTab.Screen
						name="Favorites"
						component={Favorites}
						options={{
							tabBarIcon: ({ color, size }) => {
								return <Icon name="folder-heart" size={size} color={color} />;
							},
						}}
					/>
				</BottomTab.Navigator>
			</View>
		</SafeAreaProvider>
	);
};

export default TabsNavigator;
