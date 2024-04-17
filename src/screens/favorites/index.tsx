import React from "react";
import styled from "styled-components/native";
import { useFavorites } from "../../components/favorites";

const Container = styled.View`
	background-color: #db3c36;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const ListItem = styled.Text`
	color: white;
	font-size: 18px;
	margin-bottom: 10px;
`;

const Favorites = () => {
	const { favorites } = useFavorites();

	return (
		<Container>
			{favorites.map((pokemon) => (
				<ListItem key={pokemon.id}>{pokemon.name}</ListItem>
			))}
		</Container>
	);
};

export default Favorites;
