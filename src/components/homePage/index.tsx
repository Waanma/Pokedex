import { useQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { Dimensions, FlatList, Image, ImageBackground, View } from "react-native";
import styled from "styled-components/native";
import { RootStackParamList, PokemonDetailsParams } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { QUERY } from "../../API/graphQL";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchBar from "../searchBar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useOrientation from "../../utils/useOrientarion";

const { width } = Dimensions.get("window");

//Styled-components
const TitleContainer = styled.View`
	height: 50px;
	width: 100%;
`;
const Title = styled.Text`
	font-family: "Nunito-Bold";
	font-size: 38px;
	color: white;
	top: -15px;
`;
const Container = styled.View<{ isPortrait: boolean }>`
	padding-bottom: 20%;
	height: 100%;
	align-items: center;
	width: ${({ isPortrait }) => (isPortrait ? "100%" : width + 230 + "px")};
`;
const Item = styled.TouchableOpacity<{ sprites?: string; isPortrait: boolean }>`
	display: grid;
	align-items: center;
	justify-content: space-around;
	border: 1px solid black;
	border-radius: 10px;
	width: ${({ isPortrait }) => (isPortrait ? "48%" : "20%")};
	margin: ${({ isPortrait }) => (isPortrait ? "1%" : "2.5%")};
	margin: 1%;
	elevation: 5;
	z-index: 15;
`;
const Text1 = styled.Text`
	color: #303030;
	font-family: "Nunito-Bold";
	font-size: 22px;
	text-shadow-color: white;
	text-shadow-offset: 1px 1px;
	text-shadow-radius: 3px;
`;
const TextNotFound = styled.Text`
	font-size: 22px;
	font-family: "Nunito-Bold";
`;
const Loading = styled.View`
	height: 100%;
	width: 100%;
	align-items: center;
	justify-content: center;
`;
const RefreshButton = styled.TouchableOpacity`
	background-color: #35d4db;
	padding: 5px;
	border-radius: 13px;
	border: 0.5px solid #db3c36;
`;
const ClearButton = styled.TouchableOpacity`
	position: absolute;
	bottom: 20%;
	right: 20px;
	background-color: #fff;
	height: 50px;
	width: 50px;
	align-items: center;
	justify-content: center;
	border-radius: 25px;
	elevation: 5;
	z-index: 1000;
`;

// types
export type isPokemon = {
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
		pokemon_v2_pokemon: {
			pokemon_v2_pokemonstats: {
				base_stat: number;
				pokemon_v2_stat: {
					name: string;
				};
			}[];
		};
		pokemon_v2_ability: {
			name: string;
			pokemon_v2_abilityeffecttexts: { effect: string }[];
		};
	}[];
	stats: {
		base_stat: number;
		pokemon_v2_stat: {
			name: string;
		};
	}[];
};
interface GalleryProps {
	navigation: StackNavigationProp<RootStackParamList, "Home">;
}

//Component
const Home = ({ navigation }: GalleryProps) => {
	//Functions
	const [searchTerm, setSearchTerm] = useState("");
	const { isPortrait } = useOrientation();

	const navigateDetails = (pokemon: PokemonDetailsParams) => {
		navigation.navigate("Details", {
			id: pokemon.id,
			pokemonName: pokemon.name,
			pokemonType: pokemon.pokemon_v2_pokemontypes.pokemon_v2_type.name,
			sprite: pokemon.sprites.front_default,
			base_experience: pokemon.base_experience,
			height: pokemon.height,
			weight: pokemon.weight,
			abilityName: pokemon.abilityName.pokemon_v2_pokemonabilities.pokemon_v2_ability.name,
			abilityEffect:
				pokemon.abilityEffect.pokemon_v2_pokemonabilities.pokemon_v2_ability
					.pokemon_v2_abilityeffecttexts.effect || "",
			stats: pokemon.stats.map((stat) => ({
				base_stat: stat.base_stat,
				pokemon_v2_stat: {
					name: stat.pokemon_v2_stat.name,
				},
			})),
		});
	};

	const handlePress = (pokemon: isPokemon) => {
		navigateDetails({
			id: pokemon.id,
			name: pokemon.name,
			base_experience: pokemon.base_experience,
			height: pokemon.height,
			weight: pokemon.weight,
			sprites: {
				front_default:
					pokemon.pokemon_v2_pokemonsprites[0].sprites.other.home.front_default,
			},
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
			stats: pokemon.pokemon_v2_pokemonabilities[0]?.pokemon_v2_pokemon.pokemon_v2_pokemonstats.map(
				(stat) => ({
					base_stat: stat.base_stat,
					pokemon_v2_stat: {
						name: stat.pokemon_v2_stat.name,
					},
				})
			),
		});
	};

	const handleClear = () => {
		setSearchTerm("");
	};

	// Query
	const { data, refetch } = useQuery(QUERY);

	try {
		const refetchData = useCallback(() => {
			refetch();
		}, [refetch]);

		//Loading data
		if (!data || !data.pokemon_v2_pokemon) {
			return (
				<Loading>
					<View style={{ width: 70, height: 70 }}>
						<ProgressBar color="#35d4db" styleAttr="Large" />
					</View>
					<RefreshButton onPress={refetchData}>
						<Text1>Refresh</Text1>
					</RefreshButton>
				</Loading>
			);
		}

		const filteredPokemon = searchTerm
			? data.pokemon_v2_pokemon.filter((pokemon: isPokemon) =>
				pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
			  )
			: data.pokemon_v2_pokemon;

		return (
			<GestureHandlerRootView style={{ height: "87%" }}>
				<SearchBar onSearch={setSearchTerm} />
				{isPortrait ? (
					<TitleContainer>
						<Title>PokedeX</Title>
					</TitleContainer>
				) : (
					<></>
				)}
				<Container isPortrait={isPortrait}>
					{filteredPokemon == "" && (
						<View>
							<TextNotFound>Pokemon Not Found</TextNotFound>
						</View>
					)}
					{searchTerm.length > 0 && (
						<ClearButton onPress={handleClear}>
							<Icon name="close" size={40} color={"black"} />
						</ClearButton>
					)}
					<FlatList
						data={filteredPokemon}
						key={isPortrait ? "portrait" : "landScape"}
						keyExtractor={(pokemon: isPokemon) => pokemon.id.toString()}
						showsVerticalScrollIndicator={false}
						initialNumToRender={15}
						contentContainerStyle={{ paddingBottom: 25, gap: 15 }}
						numColumns={isPortrait ? 2 : 3}
						renderItem={({ item }: { item: isPokemon }) => (
							<Item onPress={() => handlePress(item)} isPortrait={isPortrait}>
								<ImageBackground
									source={require("../../../assets/img/background7.jpg")}
									resizeMode="cover"
									style={{
										width: "100%",
										alignItems: "center",
									}}
									borderRadius={9}
								>
									<Image
										source={{
											uri: item.pokemon_v2_pokemonsprites[0].sprites.other
												.home.front_default,
										}}
										style={{ width: 100, height: 100, top: -5 }}
									/>
									<View style={{ gap: 10 }}>
										<Text1>{item.name}</Text1>
									</View>
								</ImageBackground>
							</Item>
						)}
					/>
				</Container>
			</GestureHandlerRootView>
		);
	} catch (e) {
		<View style={{ alignItems: "center", justifyContent: "center" }}>
			<Text1>Data not found</Text1>;
		</View>;
	}
};

export default Home;
