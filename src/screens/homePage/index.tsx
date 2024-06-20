import React from "react";
import styled from "styled-components/native";
import { StatusBar, ImageBackground } from "react-native";
import Home from "../../components/homePage";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";

//Types
type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

//Styled-components
const Container = styled.View`
	background-color: #35d4db;
	height: 100%;
`;
const GalleryContainer = styled.View`
	margin-horizontal: 2%;
	border-radius: 35px;
	padding-top: 11%;
`;
//Component
const HomePage = () => {
	const navigation = useNavigation<NavigationProp>();
	return (
		<Container>
			<ImageBackground
				source={require("../../../assets/img/background01.jpeg")}
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
				}}
			/>
			<StatusBar translucent backgroundColor="transparent" />
			<GalleryContainer>
				<Home navigation={navigation} />
			</GalleryContainer>
		</Container>
	);
};

export default HomePage;
