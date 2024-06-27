import React from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";
import Home from "../../components/homePage";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import useOrientation from "../../utils/useOrientarion";

//Types
type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

//Styled-components
const Container = styled.View`
	background-color: #db3c36;
	height: 100%;
`;
const GalleryContainer = styled.View`
	margin-horizontal: 2%;
	border-radius: 35px;
`;
//Component
const HomePage = () => {
	const navigation = useNavigation<NavigationProp>();
	const { isPortrait } = useOrientation();

	return (
		<Container>
			<StatusBar translucent backgroundColor="transparent" />
			<GalleryContainer
				style={{
					paddingTop: isPortrait ? "11%" : "0%",
				}}
			>
				<Home navigation={navigation} />
			</GalleryContainer>
		</Container>
	);
};

export default HomePage;
