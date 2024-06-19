import React from "react";
import styled from "styled-components/native";
import { StatusBar, ImageBackground } from "react-native";
import Gallery from "../../components/homePage";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
	background-color: #35d4db;
	height: 100%;
`;
const GalleryContainer = styled.View`
	margin-horizontal: 2%;
	border-radius: 35px;
	padding-top: 11%;
`;

const HomePage = () => {
	const navigation = useNavigation();
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
			<StatusBar hidden />
			<GalleryContainer>
				<Gallery navigation={navigation} />
			</GalleryContainer>
		</Container>
	);
};

export default HomePage;
