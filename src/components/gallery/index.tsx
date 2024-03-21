import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Image, ImageBackground } from "react-native";
import styled from "styled-components/native";

const ContainerScroll = styled.ScrollView`
	padding-bottom: 5%;
`;
const Container = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
	padding-vertical: 25px;
`;
const Item = styled.TouchableOpacity<{ sprites?: string }>`
	background-color: black;
	border: 1px solid white;
	border-radius: 5px;
	height: 90px;
	width: 90px;
	align-items: center;
`;
const Text1 = styled.Text`
	color: white;
	font-family: "Nunito-Bold";
`;

// QUERY
const QUERY = gql`
	query getPokemons {
		pokemon_v2_pokemon(limit: 50) {
			id
			name
			base_experience
			pokemon_v2_pokemonsprites {
				sprites
			}
		}
	}
`;

// interfaces
interface isPokemon {
	height: number;
	id: number;
	name: string;
	base_experience: number;
	pokemon_v2_pokemonsprites: { sprites: { other: { home: { front_default: string } } } }[];
}

//COMPONENT GALLERY
const Gallery = () => {
	const { data } = useQuery(QUERY);
	if (!data || !data.pokemon_v2_pokemon) {
		return <Text1>Loading...</Text1>;
	}

	return (
		<ContainerScroll showsVerticalScrollIndicator={false}>
			<ImageBackground
				source={require("../../../assets/img/Fondo1.png")}
				style={{ flex: 1, borderRadius: 4 }}
			>
				<Container>
					{data.pokemon_v2_pokemon.map((pokemon: isPokemon) => (
						<Item key={pokemon.id}>
							<Image
								source={{
									uri: pokemon.pokemon_v2_pokemonsprites[0].sprites.other.home
										.front_default,
								}}
								style={{ width: 50, height: 50 }}
							/>
							<Text1>{pokemon.name}</Text1>
							<Text1>exp: {pokemon.base_experience}</Text1>
						</Item>
					))}
				</Container>
			</ImageBackground>
		</ContainerScroll>
	);
};

export default Gallery;
