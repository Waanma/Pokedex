import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "react-native";

const Container = styled.SafeAreaView`
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	background-color: #35d4db;
`;
const BackContainer = styled.TouchableOpacity`
	width: 85%;
	height: 10%;
`;
const CardContainer = styled.View`
	width: 90%;
	height: 85%;
	align-items: center;
	background-color: #fff7eb;
	border-radius: 10px;
`;
const PokemonContainer = styled.View`
	width: 200px;
	height: 200px;
	background-color: #fff;
	border-radius: 150px;
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
const DetailsText = styled.Text``;

//interfaces
interface DetailsRouteParams {
	pokemonName: string;
	sprite: string;
	exp: number;
	weight: number;
	height: number;
	pokemonType: string;
}

const Details = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const { pokemonName, sprite, exp, height, weight, pokemonType } =
		route.params as DetailsRouteParams;
	const goBack = () => {
		navigation.goBack();
	};
	return (
		<Container>
			<BackContainer>
				<Icon onPress={goBack} name="arrow-back-circle-sharp" size={45} color="#db3c36" />
			</BackContainer>
			<CardContainer>
				<PokemonContainer style={{ top: -80 }}>
					<Image source={{ uri: sprite }} style={{ width: 200, height: 200, top: -10 }} />
				</PokemonContainer>
				<Name style={{ top: -80 }}>{pokemonName}</Name>
				<Experience style={{ top: -80 }}>XP {exp}</Experience>
				<DetailsText>{pokemonType}</DetailsText>
				<DetailsText>height: {height}</DetailsText>
				<DetailsText>weight: {weight}</DetailsText>
				
			</CardContainer>
		</Container>
	);
};

export default Details;
