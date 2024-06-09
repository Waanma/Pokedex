import React, { useState } from "react";
import { FlatList, Image } from "react-native";
import styled from "styled-components/native";
import { PokemonDetailsParams } from "../../types/types";
import { useStore } from "../../store/store";
import Alert from "../alert";

const Container = styled.SafeAreaView`
	width: 100%;
	height: 100%;
	background-color: white;
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
	border: 0.7px solid black;
`;
const FavoritesContainer = styled.View`
	background-color: white;
	height: 85%;
`;
const Card = styled.TouchableOpacity`
	width: 300px;
	height: 100px;
	background-color: #e8dcb9;
	border-radius: 30px;
	margin-bottom: 10px;
	align-items: center;
	flex-direction: row;
	justify-content: space-around;
`;
const Text1 = styled.Text`
	color: black;
	font-size: 25px;
	font-family: "Nunito-Regular";
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
	return (
		<Container>
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
						<Card>
							<Image
								source={{
									uri: item.sprites.front_default,
								}}
								style={{ width: 100, height: 100 }}
							/>
							<Text1>{item.name}</Text1>
						</Card>
					)}
					keyExtractor={(item) => item.id.toString()}
				/>
			</FavoritesContainer>
		</Container>
	);
};

export default Favorites;
