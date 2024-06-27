import React from "react";
import styled from "styled-components/native";
import Favorites from "../../components/favorites";
import { useStore } from "../../store/store";
import { ImageBackground } from "react-native";

const ScreenContainer = styled.SafeAreaView``;

const FavoritesScreen: React.FC = () => {
	const { favorites } = useStore();

	return (
		<ScreenContainer>
			<ImageBackground
				source={require("../../../assets/img/background01.jpeg")}
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
				}}
			/>
			<Favorites favorites={favorites} />
		</ScreenContainer>
	);
};

export default FavoritesScreen;
