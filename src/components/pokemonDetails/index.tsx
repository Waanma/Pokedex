import React, { useCallback } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, ImageBackground, View } from "react-native";
import { useStore } from "../../store/store";

const Container = styled.SafeAreaView`
	height: 100%;
	width: 100%;
	padding-top: 20px;
	justify-content: center;
	align-items: center;
	background-color: #35d4db;
`;
const BackContainer = styled.View`
	width: 85%;
	flex-direction: row;
	justify-content: space-between;
`;
const Pokeball = styled.TouchableOpacity``;
const CardContainer = styled.View`
	width: 90%;
	height: 85%;
	align-items: center;
	background-color: #fff7eb;
	border-radius: 10px;
`;
const PokemonContainer = styled.View`
	width: 220px;
	height: 220px;
	border-radius: 150px;
	border: 5px solid #fff7eb;
	overflow: hidden;
`;
const HeaderContainer = styled.View`
	width: 100%;
	align-items: center;
`;
const Name = styled.Text`
	color: #303030;
	font-family: "Nunito-Bold";
	font-size: 33px;
`;
const Experience = styled.Text`
	color: gray;
	font-size: 20px;
`;
const TypeContainer = styled.View`
	width: 80%;
	height: 80px;
	top: -80px;
`;
const TypeContent = styled.View`
	width: 90px;
	height: 40px;
	background-color: #35d4db;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
`;

const FisicDetails = styled.View`
	gap: 10px;
	flex-direction: row;
	justify-content: space-around;
`;
const Stats = styled.View`
	align-items: center;
	gap: 5px;
	background-color: #e1f2f4;
	padding-horizontal: 20px;
	padding-vertical: 3px;
	border-radius: 10px;
`;
const DetailsContainer = styled.View`
	width: 80%;
	top: -100px;
	gap: 25px;
`;
const AbilityContainer = styled.ScrollView`
	gap: 15px;
	border: 2px solid #97d2d8;
	border-radius: 10px;
	padding-horizontal: 10px;
	padding-top: 10px;
`;
const DetailsText = styled.Text<{ type?: boolean; ability?: boolean }>`
	font-family: "Nunito-Bold";
	font-size: 15px;
	${(props) => props.type && "color: #1B1C1E; font-size: 18px;"}
	${(props) => props.ability && "color: #1B1C1E; font-size: 18px;"}
`;

//interfaces
interface DetailsRouteParams {
	id: number;
	pokemonName: string;
	sprite: string;
	exp: number;
	weight: number;
	height: number;
	pokemonType: string;
	abilityName: string;
	abilityEffect: string;
	pokemonId: number;
}

const Details = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const {
		id,
		pokemonName,
		sprite,
		exp,
		height,
		weight,
		pokemonType,
		abilityName,
		abilityEffect,
	} = route.params as DetailsRouteParams;
	const goBack = () => {
		navigation.goBack();
	};
	const { addToFavorites, removeFromFavorites, favorites } = useStore();
	const isFavorite = favorites.some((pokemon) => pokemon.id === id);

	const handleToggleFavorite = useCallback(() => {
		if (isFavorite) {
			removeFromFavorites(id);
		} else {
			addToFavorites({
				id,
				sprite,
				name: pokemonName,
				pokemonId: 0,
				height: 0,
				weight: 0,
				sprites: {
					front_default: sprite,
				},
				base_experience: 0,
				pokemon_v2_pokemontypes: {
					pokemon_v2_type: {
						name: "",
					},
				},
				pokemonType: "",
				abilityName: {
					pokemon_v2_pokemonabilities: {
						pokemon_v2_ability: {
							name: "",
						},
					},
				},
				abilityEffect: {
					pokemon_v2_pokemonabilities: {
						pokemon_v2_ability: {
							pokemon_v2_abilityeffecttexts: {
								effect: "",
							},
						},
					},
				},
			});
		}
	}, [addToFavorites, removeFromFavorites, id, pokemonName, isFavorite]);
	return (
		<Container>
			<BackContainer>
				<Icon onPress={goBack} name="backburger" size={45} color="#db3c36" />
				<Pokeball onPress={handleToggleFavorite}>
					<Image
						source={
							isFavorite
								? require("../../../assets/img/closePokeball.png")
								: require("../../../assets/img/openPokeball.png")
						}
						style={{ width: 50, height: 50, top: -10 }}
						resizeMode="contain"
					/>
				</Pokeball>
			</BackContainer>
			<CardContainer>
				<HeaderContainer>
					<PokemonContainer style={{ top: -80 }}>
						<ImageBackground
							source={require("../../../assets/img/pokemons2.jpg")}
							style={{ borderRadius: 150, flex: 1 }}
						>
							<Image
								source={{ uri: sprite }}
								style={{ width: 200, height: 200, top: -10 }}
							/>
						</ImageBackground>
					</PokemonContainer>

					<Name style={{ top: -80 }}>{pokemonName}</Name>
					<Experience style={{ top: -80 }}>XP {exp}</Experience>
				</HeaderContainer>
				<TypeContainer>
					<TypeContent>
						<DetailsText type>{pokemonType}</DetailsText>
					</TypeContent>
				</TypeContainer>
				<DetailsContainer>
					<FisicDetails>
						<Stats>
							<DetailsText type>Height</DetailsText>
							<DetailsText style={{ color: "green" }}>{height}</DetailsText>
						</Stats>
						<Stats>
							<DetailsText type>Weight</DetailsText>
							<DetailsText style={{ color: "#99130A" }}>{weight}</DetailsText>
						</Stats>
					</FisicDetails>
					<View style={{ height: 170, gap: 5 }}>
						<DetailsText ability>Ability:</DetailsText>
						<AbilityContainer showsVerticalScrollIndicator={true}>
							<DetailsText ability>{abilityName}</DetailsText>
							<DetailsText style={{ color: "#3D3D3D" }}>{abilityEffect}</DetailsText>
						</AbilityContainer>
					</View>
				</DetailsContainer>
			</CardContainer>
		</Container>
	);
};

export default Details;
