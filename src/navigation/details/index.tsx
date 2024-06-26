import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "../../components/details";

const Stack = createNativeStackNavigator();

const DetailsNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitle: "Detailsssss",
				headerShown: true,
			}}
		>
			<Stack.Screen
				name="Details"
				component={Details}
				options={{ headerTintColor: "#24A8BC" }}
			/>
		</Stack.Navigator>
	);
};

export default DetailsNavigator;
