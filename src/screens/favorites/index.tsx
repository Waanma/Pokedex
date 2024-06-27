import React from "react";
import styled from "styled-components/native";
import Favorites from "../../components/favorites";
import { useStore } from "../../store/store";

const ScreenContainer = styled.SafeAreaView`
	background-color: #db3c36;
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
