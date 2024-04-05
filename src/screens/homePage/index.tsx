import React from "react";
import styled from "styled-components/native";
import SearchBar from "../../components/searchBar";
import { StatusBar, ImageBackground } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Gallery from "../../components/homeGallery";
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
	margin-horizontal: 5%;
	height: 100%;
	border: 15px solid rgba(0, 0, 0, 1);
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
			<GestureHandlerRootView>
				<SearchBar />
			</GestureHandlerRootView>
			<TitleContainer></TitleContainer>
			<GalleryContainer>
				<Gallery navigation={navigation} />
			</GalleryContainer>
		</Container>
	);
};

export default HomePage;
