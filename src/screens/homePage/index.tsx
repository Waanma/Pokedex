import React from "react";
import styled from "styled-components/native";
import SearchBar from "../../components/searchBar";
import { StatusBar, ImageBackground } from "react-native";
import Gallery from "../../components/homePage";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
	background-color: #35d4db;
	height: 100%;
	padding-bottom: 250px;
`;
const TitleContainer = styled.View`
	height: 100px;
`;
const GalleryContainer = styled.View`
	padding-top: 30%;
	margin-horizontal: 2%;
	border-radius: 35px;
`;

const HomePage = () => {
	const navigation = useNavigation();
	return (
		<Container>
			<ImageBackground
				source={require("../../../assets/img/pokeballPokedex.png")}
				style={{
					position: "absolute",
					width: "100%",
					height: 350,
				}}
			/>
			<StatusBar hidden />
			<TitleContainer />
			<GalleryContainer>
				<Gallery navigation={navigation} />
			</GalleryContainer>
		</Container>
	);
};

export default HomePage;
