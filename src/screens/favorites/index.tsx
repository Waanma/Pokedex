import React from "react";
import styled from "styled-components/native";
import Favorites from "../../components/favorites";
import { useStore } from "../../store/store";

const ScreenContainer = styled.SafeAreaView`
	background-color: #8fa3d6;
`;

const FavoritesScreen: React.FC = () => {
	const { favorites } = useStore();

	return (
		<ScreenContainer>
			<Favorites favorites={favorites} />
		</ScreenContainer>
	);
};

export default FavoritesScreen;
