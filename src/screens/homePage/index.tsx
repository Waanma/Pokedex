import React from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";
import Home from "../../components/homePage";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import useOrientation from "../../utils/useOrientarion";
import LinearGradient from "react-native-linear-gradient";

//Types
type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

//Styled-components
const Container = styled.View`
	height: 100%;
`;
const GalleryContainer = styled.View`
	margin-horizontal: 2%;
	border-radius: 35px;
`;
const StyledLinearGradient = styled(LinearGradient)`
	flex: 1;
`;
//Component
const HomePage = () => {
	const navigation = useNavigation<NavigationProp>();
	const { isPortrait } = useOrientation();

	return (
		<Container>
			<StyledLinearGradient
				start={{ x: 0, y: 1 }}
				end={{ x: 1, y: 0 }}
				colors={["#8fa3d6", "#4c669f"]}
			>
				<StatusBar translucent backgroundColor="transparent" />
				<GalleryContainer
					style={{
						paddingTop: isPortrait ? "11%" : "0%",
					}}
				>
					<Home navigation={navigation} />
				</GalleryContainer>
			</StyledLinearGradient>
		</Container>
	);
};

export default HomePage;
