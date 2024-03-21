import React from "react"; // Asegúrate de importar React
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/homePage/index";
import Details from "../../screens/details";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerTitle: "Home",
			}}
		>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Details" component={Details} />
		</Stack.Navigator>
	);
};

export default StackNavigator;
