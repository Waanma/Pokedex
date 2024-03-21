import React from "react";
import styled from "styled-components/native";
import SearchBar from "../../components/searchBar";
import { StatusBar, ImageBackground } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Gallery from "../../components/gallery";

const Container = styled.View`
	background-color: #db3c36;
	height: 100%;
`;
const TitleContainer = styled.View`
	height: 100px;
`;
const GalleryContainer = styled.View`
	border: 7px solid gray;
	border-radius: 2px;
	margin-horizontal: 5%;
	padding-bottom: 15%;
	height: 100%;
`;

const HomePage = () => {
	return (
		<Container>
			<ImageBackground
				source={require("../../../assets/img/pokeballPokedex.png")}
				style={{
					position: "absolute",
					right: 15,
					width: 230,
					height: 230,
				}}
			/>
			<StatusBar hidden />
			<GestureHandlerRootView>
				<SearchBar />
			</GestureHandlerRootView>
			<TitleContainer></TitleContainer>
			<GalleryContainer>
				<Gallery />
			</GalleryContainer>
		</Container>
	);
};

export default HomePage;
