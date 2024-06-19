import React, { useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FlatList, Image, ImageBackground, View } from "react-native";
import styled from "styled-components/native";
import { PokemonDetailsParams, RootStackParamList } from "../../types/types";
import { useStore } from "../../store/store";
import Alert from "../alert";

const Container = styled.SafeAreaView`
	width: 100%;
	height: 100%;
	background-color: #35d4db;
`;
const ContentContainer = styled.View`
	padding: 15px;
	border-radius: 15px;
	padding-bottom: 14%;
`;
const TitleContainer = styled.View`
	height: 100px;
	width: 100%;
	align-items: center;
	justify-content: center;
`;
const ClearButton = styled.TouchableOpacity`
	background-color: #14cc89;
	padding: 7px;
	border-radius: 20px;
	border: 0.4px solid black;
	elevation: 4;
`;
const FavoritesContainer = styled.View`
	background-color: #db4540;
	height: 85%;
	padding-top: 10px;
	border-radius: 15px;
	border: 0.7px solid gray;
`;
const Card = styled.TouchableOpacity`
	width: 300px;
	height: 100px;
	border-radius: 25px;
	border: 1px solid black;
	margin-bottom: 20px;
	align-items: center;
	flex-direction: row;
	elevation: 4;
	overflow: hidden;
`;
const Text1 = styled.Text`
	color: #303030;
	font-size: 25px;
	font-family: "Nunito-Regular";
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

const Favorites: React.FC<GalleryProps> = () => {
	const favorites = useStore((state) => state.favorites);
	const [showAlert, setShowAlert] = useState(false);
	const alert = () => {
		setShowAlert(!showAlert);
	};
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	return (
		<Container>
			<ContentContainer>
				<TitleContainer>
					<Text1>trapped pokemons</Text1>
					{favorites.length > 0 && (
						<ClearButton onPress={alert}>
							<Text1>Free all pokemons</Text1>
						</ClearButton>
					)}
					<Alert showAlert={showAlert} hideAlert={alert} />
				</TitleContainer>
				<FavoritesContainer>
					<FlatList
						contentContainerStyle={{ alignItems: "center" }}
						showsVerticalScrollIndicator={false}
						data={favorites}
						renderItem={({ item }) => (
							<Card
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
								<ImageBackground
									source={require("../../../assets/img/background7.jpg")}
									style={{
										width: "100%",
										height: "100%",
										borderRadius: 25,
										justifyContent: "center",
										alignItems: "center",
										position: "absolute",
									}}
									resizeMode="cover"
								/>
								<View style={{ paddingBottom: 25, zIndex: 15 }}>
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
