import React from "react";
import styled from "styled-components/native";
import PokemonDetails from "../../components/details/index";

const Container = styled.View`
	height: 100%;
`;

const DetailsScreen = () => {
	return (
		<Container>
			<PokemonDetails />
		</Container>
	);
};

export default DetailsScreen;
