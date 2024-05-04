import React from "react";
import { FlatList, Image } from "react-native";
import styled from "styled-components/native";
import { PokemonDetailsParams } from "../../types/types";

const Container = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: white;
`;
const Card = styled.TouchableOpacity`
	width: 90%;
	height: 200px;
	background-color: blue;
`;
const Text1 = styled.Text`
	color: black;
	font-size: 20px;
`;
//interfaces
interface GalleryProps {
	favorites: PokemonDetailsParams[];
	onPressPokeball: (pokemon: PokemonDetailsParams) => void;
}

const Favorites: React.FC<GalleryProps> = ({ favorites, onPressPokeball }) => {
	return (
		<Container>
			<FlatList
				data={favorites}
				renderItem={({ item }) => (
					<Card onPress={() => onPressPokeball(item)}>
						<Text1>{item.name}</Text1>
						<Image
							source={{
								uri: item.sprites.front_default
							}}
							style={{ width: 100, height: 100 }}
						/>
					</Card>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
		</Container>
	);
};

export default Favorites;
