/* eslint-disable indent */
import React, { useCallback, useRef } from "react";
import styled from "styled-components/native";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, ImageBackground, View, Text, Animated } from "react-native";
import { useStore } from "../../store/store";
import { getImageSource } from "../../utils/getImageSource";

//Styled-components
const ScrollContainer = styled.ScrollView``;
const Container = styled.View`
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
	background-color: #db4540;
	border-radius: 10px;
	elevation: 1;
`;
const PokemonContainer = styled.View`
	width: 220px;
	height: 220px;
	border-radius: 150px;
	border: 5px solid #db4540;
	overflow: hidden;
	position: relative;
`;
const HeaderContainer = styled.View`
	width: 100%;
	align-items: center;
`;
const Name = styled.Text`
	color: #edf2fa;
	font-family: "Nunito-Bold";
	font-size: 33px;
	text-shadow-color: rgba(0, 0, 0, 0.45);
	text-shadow-offset: 2px 2px;
	text-shadow-radius: 3px;
`;
const Experience = styled.Text`
	color: #edf2fa;
	font-size: 20px;
`;
const TypeContainer = styled.View`
	width: 80%;
	height: 80px;
	top: -80px;
`;
const TypeContent = styled.View<{ type: string }>`
	width: 90px;
	height: 40px;
	justify-content: center;
	align-items: center;
	border-radius: 7px;
	elevation: 5;
	background-color: ${(props) => {
		switch (props.type.toLowerCase()) {
			case "fire":
				return "#FF5733";
			case "grass":
				return "#6BA546";
			case "water":
				return "#4D90D5";
			case "bug":
				return "#9ACD32";
			case "poison":
				return "#800080";
			case "electric":
				return "#FFF000";
			case "ground":
				return "#8B4513";
			case "fairy":
				return "#FFB6C1";
			case "flying":
				return "#A890F0";
			case "psychic":
				return "#F85888";
			case "rock":
				return "#B8A038";
			case "dragon":
				return "#7038F8";
			case "dark":
				return "#705848";
			case "steel":
				return "#B8B8D0";
			case "ice":
				return "#98D8D8";
			case "fighting":
				return "#C03028";
			case "ghost":
				return "#705898";
			default:
				return "gray";
		}
	}};
`;

const FisicDetails = styled.View`
	gap: 10px;
	flex-direction: row;
	justify-content: space-around;
`;
const Stats = styled.View`
	align-items: center;
	gap: 5px;
	background-color: #35d4db;
	padding-horizontal: 20px;
	padding-vertical: 3px;
	border-radius: 10px;
	elevation: 5;
`;
const StatsContainer = styled.View`
	gap: 10px;
	elevation: 5;
	background-color: #edf2fa;
	padding: 12px;
	border-radius: 10px;
	margin-horizontal: -10px;
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
	background-color: #808080;
	elevation: 5;
`;
const DetailsText = styled.Text<{
	type?: boolean;
	ability?: boolean;
	whiteText?: boolean;
	abilityName?: boolean;
}>`
	font-family: "Nunito-Bold";
	font-size: 15px;
	${(props) =>
		props.type &&
		"color: #ffff; font-size: 20px; font-weight: bold; text-shadow-color: rgba(0, 0, 0, 1); text-shadow-offset: 0.5px 0.5px; text-shadow-radius: 4px;"}
	${(props) => props.ability && "color: #fff; font-size: 18px;"}
	${(props) => props.abilityName && "color: #35d4db; font-size: 22px; font-weight: bold"}
	${(props) => props.whiteText && "color: #ebebeb; font-size: 16px; padding-bottom: 15px;"}
`;

//types
type DetailsRouteParams = {
	id: number;
	pokemonName: string;
	sprite: string;
	base_experience: number;
	weight: number;
	height: number;
	pokemonType: string;
	abilityName: string;
	abilityEffect: string;
	stats: {
		base_stat: number;
		pokemon_v2_stat: {
			name: string;
		};
	}[];
};

//Component
const Details = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const {
		id,
		pokemonName,
		sprite,
		base_experience,
		height,
		weight,
		pokemonType,
		abilityName,
		abilityEffect,
		stats,
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
				base_experience: base_experience,
				name: pokemonName,
				height: height,
				weight: weight,
				sprites: {
					front_default: sprite,
				},
				pokemon_v2_pokemontypes: {
					pokemon_v2_type: {
						name: pokemonType,
					},
				},
				pokemonType,
				abilityName: {
					pokemon_v2_pokemonabilities: {
						pokemon_v2_ability: {
							name: abilityName,
						},
					},
				},
				abilityEffect: {
					pokemon_v2_pokemonabilities: {
						pokemon_v2_ability: {
							pokemon_v2_abilityeffecttexts: {
								effect: abilityEffect,
							},
						},
					},
				},
				stats: stats.map((stat) => ({
					base_stat: stat.base_stat,
					pokemon_v2_stat: {
						name: stat.pokemon_v2_stat.name,
					},
				})),
			});
		}

		animatePokeball();
	}, [addToFavorites, removeFromFavorites, id, pokemonName, isFavorite]);

	const pokeballScale = useRef(new Animated.Value(1)).current;

	const animatePokeball = () => {
		Animated.sequence([
			Animated.timing(pokeballScale, {
				toValue: 1.2,
				duration: 150,
				useNativeDriver: true,
			}),
			Animated.timing(pokeballScale, {
				toValue: 1,
				duration: 150,
				useNativeDriver: true,
			}),
		]).start();
	};
	return (
		<ScrollContainer nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
			<Container>
				<BackContainer>
					<Icon onPress={goBack} name="backburger" size={45} color="#db3c36" />
					<Pokeball onPress={handleToggleFavorite}>
						<Animated.View style={{ transform: [{ scale: pokeballScale }] }}>
							<Image
								source={
									isFavorite
										? require("../../../assets/img/closePokeball.png")
										: require("../../../assets/img/openPokeball.png")
								}
								style={{ width: 50, height: 50, top: -10 }}
								resizeMode="contain"
							/>
						</Animated.View>
					</Pokeball>
				</BackContainer>
				<CardContainer>
					<HeaderContainer>
						<PokemonContainer style={{ top: -80 }}>
							<ImageBackground
								source={getImageSource(pokemonType)}
								style={{ borderRadius: 150, flex: 1 }}
							>
								<Image
									source={{ uri: sprite }}
									style={{ width: 200, height: 200, top: -10 }}
								/>
							</ImageBackground>
						</PokemonContainer>
						<Name style={{ top: -80 }}>{pokemonName}</Name>
						<Experience style={{ top: -80 }}>XP {base_experience}</Experience>
					</HeaderContainer>
					<TypeContainer>
						<TypeContent type={pokemonType}>
							<DetailsText type>{pokemonType}</DetailsText>
						</TypeContent>
					</TypeContainer>
					<DetailsContainer>
						<FisicDetails>
							<Stats>
								<Text style={{ color: "#301030" }}>Height</Text>
								<DetailsText style={{ color: "green" }}>{height}</DetailsText>
							</Stats>
							<Stats>
								<Text style={{ color: "#301030" }}>Weight</Text>
								<DetailsText style={{ color: "red" }}>{weight}</DetailsText>
							</Stats>
						</FisicDetails>
						<View style={{ height: 170, gap: 5 }}>
							<DetailsText ability>Ability:</DetailsText>
							<AbilityContainer
								showsVerticalScrollIndicator={true}
								nestedScrollEnabled={true}
							>
								<DetailsText abilityName>{abilityName}</DetailsText>
								<DetailsText whiteText>{abilityEffect}</DetailsText>
							</AbilityContainer>
						</View>
						<StatsContainer>
							{stats.map((stat, index) => (
								<View
									key={index}
									style={{
										flexDirection: "row",
										gap: 10,
									}}
								>
									<View style={{ width: "45%" }}>
										<Text
											style={{
												color: "#301030",
												fontFamily: "Nunito-Bold",
											}}
										>
											{stat.pokemon_v2_stat.name}
										</Text>
									</View>
									<View style={{ width: "40%" }}>
										<ProgressBar
											styleAttr="Horizontal"
											indeterminate={false}
											progress={stat.base_stat / 200}
											animating={true}
											color="#35d4db"
										/>
									</View>
									<View>
										<Text
											style={{
												color: "#301030",
												fontFamily: "Nunito-Bold",
											}}
										>
											{stat.base_stat}
										</Text>
									</View>
								</View>
							))}
						</StatsContainer>
					</DetailsContainer>
				</CardContainer>
			</Container>
		</ScrollContainer>
	);
};

export default Details;
