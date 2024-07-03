import React, { useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { PokemonDetailsParams, RootStackParamList } from "../../types/types";
import { useStore } from "../../store/store";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Alert from "../alert";

//Styled-components
const Container = styled.SafeAreaView`
	width: 100%;
	height: 100%;
`;
const ContentContainer = styled.View`
	padding-horizontal: 15px;
	border-radius: 15px;
	padding-bottom: 20%;
`;
const ClearButton = styled.TouchableOpacity`
	width: 50px;
	height: 50px;
	background-color: #db3c36;
	padding: 7px;
	border-radius: 60px;
	border: 0.4px solid black;
	elevation: 4;
`;
const FavoritesContainer = styled.View`
	background-color: #ccd2de;
	height: 85%;
	padding-top: 10px;
	border-radius: 15px;
	border: 3px solid rgba(48, 48, 48, 0.5);
`;
const Card = styled.TouchableOpacity<{ pokemonType: string }>`
	width: 300px;
	height: 100px;
	border-radius: 25px;
	border: 3px solid rgba(48, 48, 48, 0.3);
	margin-bottom: 20px;
	align-items: center;
	flex-direction: row;
	elevation: 4;
	overflow: hidden;
	background-color: ${(props) => {
		switch (props.pokemonType.toLowerCase()) {
			case "fire":
				return "#FFB997";
			case "grass":
				return "#9ED08D";
			case "water":
				return "#90C7E3";
			case "bug":
				return "#B6D998";
			case "poison":
				return "#C08AC0";
			case "electric":
				return "#FFFCA8";
			case "ground":
				return "#D4A26E";
			case "fairy":
				return "#FFD7E7";
			case "flying":
				return "#C6B9EE";
			case "psychic":
				return "#F6B5CC";
			case "rock":
				return "#D9CC97";
			case "dragon":
				return "#BAA8F8";
			case "dark":
				return "#A7A2A1";
			case "steel":
				return "#C4C6DC";
			case "ice":
				return "#BFE8E8";
			case "fighting":
				return "#D78B83";
			case "ghost":
				return "#B5A7CE";
			default:
				return "gray";
		}
	}};
`;
const Text1 = styled.Text`
	color: #303030;
	font-size: 25px;
	font-family: "Nunito-Bold";
`;
const TextCard = styled.Text`
	color: #303030;
	font-size: 25px;
	font-family: "Nunito-Bold";
`;
//types
type GalleryProps = {
	favorites: PokemonDetailsParams[];
};
//Component
const Favorites: React.FC<GalleryProps> = () => {
	const favorites = useStore((state) => state.favorites);
	const [showAlert, setShowAlert] = useState(false);
	const alert = () => {
		setShowAlert(!showAlert);
	};
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const goBack = () => {
		navigation.goBack();
	};
	return (
		<Container>
			<ContentContainer>
				<View
					style={{
						width: "100%",
						height: "auto",
						top: 35,
						flexDirection: "row",
						justifyContent: "space-between",
						paddingBottom: "12%",
					}}
				>
					<TouchableOpacity onPress={goBack}>
						<Icon
							onPress={goBack}
							name="backburger"
							size={45}
							color="#303030"
						/>
					</TouchableOpacity>
					{favorites.length > 0 && (
						<ClearButton onPress={alert}>
							<Icon name="close" size={35} color={"black"} />
						</ClearButton>
					)}
				</View>

				<Alert showAlert={showAlert} hideAlert={alert} />

				<Text1 style={{ padding: 5 }}>trapped pokemons:</Text1>
				<FavoritesContainer>
					<FlatList
						contentContainerStyle={{ alignItems: "center" }}
						showsVerticalScrollIndicator={false}
						data={favorites}
						renderItem={({ item }) => (
							<Card
								pokemonType={item.pokemon_v2_pokemontypes.pokemon_v2_type.name}
								onPress={() =>
									navigation.navigate("Details", {
										id: item.id,
										pokemonName: item.name,
										sprite: item.sprites.front_default,
										base_experience: item.base_experience,
										height: item.height,
										weight: item.weight,
										pokemonType: item.pokemonType,
										abilityName:
											item.abilityName.pokemon_v2_pokemonabilities
												.pokemon_v2_ability.name,
										abilityEffect:
											item.abilityEffect.pokemon_v2_pokemonabilities
												.pokemon_v2_ability.pokemon_v2_abilityeffecttexts
												.effect,
										stats: item.stats.map((stat) => ({
											base_stat: stat.base_stat,
											pokemon_v2_stat: {
												name: stat.pokemon_v2_stat.name,
											},
										})),
									})
								}
							>
								<View
									style={{
										zIndex: 15,
										backgroundColor: "rgba(48, 48, 48, 0.3)",
										borderRadius: 120,
										width: 150,
										height: 155,
										right: 5,
									}}
								>
									<Image
										source={{
											uri: item.sprites.front_default,
										}}
										style={{ width: 140, height: 140 }}
									/>
								</View>
								<TextCard>{item.name}</TextCard>
							</Card>
						)}
						keyExtractor={(item) => item.id.toString()}
					/>
				</FavoritesContainer>
			</ContentContainer>
		</Container>
	);
};

export default Favorites;
