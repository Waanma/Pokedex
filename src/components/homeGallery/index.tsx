import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import { RootStackParamList, PokemonDetailsParams } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";

const ContainerScroll = styled.ScrollView``;
const Container = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	gap: 15px;
	justify-content: center;
	padding-vertical: 25px;
	border-radius: 15px;
`;
const Item = styled.TouchableOpacity<{ sprites?: string }>`
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	background-color: black;
	border: 1px solid white;
	border-radius: 5px;
	height: 90px;
	width: 90%;
`;
const Text1 = styled.Text`
	color: white;
	font-family: "Nunito-Bold";
	font-size: 20px;
`;
const Loading = styled.View`
	height: 100%;
	width: 100%;
	background-color: #db3c36;
`;

// graphQL
const QUERY = gql`
	query getPokemons {
		pokemon_v2_pokemon(limit: 50) {
			id
			name
			base_experience
			height
			weight
			pokemon_v2_pokemonsprites {
				sprites
			}
			pokemon_v2_pokemontypes {
				pokemon_v2_type {
					name
				}
			}
			pokemon_v2_pokemonabilities {
				pokemon_v2_ability {
					name
					pokemon_v2_abilityeffecttexts {
						effect
					}
				}
			}
		}
	}
`;

// interfaces
export interface isPokemon {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	weight: number;
	sprites: {
		front_default: string;
	};
	pokemon_v2_pokemonsprites: { sprites: { other: { home: { front_default: string } } } }[];
	pokemon_v2_pokemontypes: { pokemon_v2_type: { name: string } }[];
	pokemon_v2_pokemonabilities: {
		pokemon_v2_ability: {
			name: string;
			pokemon_v2_abilityeffecttexts: { effect: string }[];
		};
	}[];
}
interface GalleryProps {
	navigation: StackNavigationProp<RootStackParamList, "Details">;
}

//COMPONENT GALLERY
const Gallery = ({ navigation }: GalleryProps) => {
	const navigateDetails = (pokemon: PokemonDetailsParams) => {
		navigation.navigate("Details", {
			id: pokemon.id,
			pokemonName: pokemon.name,
			pokemonType: pokemon.pokemon_v2_pokemontypes.pokemon_v2_type.name,
			sprite: pokemon.sprites.front_default,
			exp: pokemon.base_experience,
			height: pokemon.height,
			weight: pokemon.weight,
			abilityName: pokemon.abilityName.pokemon_v2_pokemonabilities.pokemon_v2_ability.name,
			abilityEffect:
				pokemon.abilityEffect.pokemon_v2_pokemonabilities.pokemon_v2_ability
					.pokemon_v2_abilityeffecttexts.effect,
		});
	};
	const handlePress = (pokemon: isPokemon) => {
		navigateDetails({
			id: pokemon.id,
			pokemonId: pokemon.id,
			name: pokemon.name,
			height: pokemon.height,
			weight: pokemon.weight,
			sprites: {
				front_default:
					pokemon.pokemon_v2_pokemonsprites[0].sprites.other.home.front_default,
			},
			base_experience: pokemon.base_experience,
			pokemon_v2_pokemontypes: {
				pokemon_v2_type: {
					name: pokemon.pokemon_v2_pokemontypes[0]?.pokemon_v2_type?.name,
				},
			},
			pokemonType: pokemon.pokemon_v2_pokemontypes[0]?.pokemon_v2_type?.name,
			abilityName: {
				pokemon_v2_pokemonabilities: {
					pokemon_v2_ability: {
						name: pokemon.pokemon_v2_pokemonabilities[0]?.pokemon_v2_ability?.name,
					},
				},
			},
			abilityEffect: {
				pokemon_v2_pokemonabilities: {
					pokemon_v2_ability: {
						pokemon_v2_abilityeffecttexts: {
							effect: pokemon.pokemon_v2_pokemonabilities[0]?.pokemon_v2_ability
								.pokemon_v2_abilityeffecttexts[1]?.effect,
						},
					},
				},
			},
		});
	};

	// Query
	const { data } = useQuery(QUERY);
	if (!data || !data.pokemon_v2_pokemon) {
		return (
			<Loading>
				<Text1>Loading...</Text1>
			</Loading>
		);
	}

	return (
		<ContainerScroll showsVerticalScrollIndicator={false}>
			<Container>
				{data.pokemon_v2_pokemon.map((pokemon: isPokemon) => (
					<Item key={pokemon.id} onPress={() => handlePress(pokemon)}>
						<Image
							source={{
								uri: pokemon.pokemon_v2_pokemonsprites[0].sprites.other.home
									.front_default,
							}}
							style={{ width: 100, height: 100, top: -5 }}
						/>
						<View style={{ gap: 10 }}>
							<Text1>{pokemon.name}</Text1>
							<Text1>exp: {pokemon.base_experience}</Text1>
						</View>
					</Item>
				))}
			</Container>
		</ContainerScroll>
	);
};

export default Gallery;
