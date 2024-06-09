import React from "react";
import styled from "styled-components/native";
import Favorites from "../../components/favorites";
import { useStore } from "../../store/store";

const ScreenContainer = styled.SafeAreaView`
`;

const FavoritesScreen: React.FC = () => {
	const { favorites } = useStore();

	return (
		<ScreenContainer>
			<Favorites favorites={favorites} onPressPokeball={() => {}} />
		</ScreenContainer>
	);
};

export default FavoritesScreen;
