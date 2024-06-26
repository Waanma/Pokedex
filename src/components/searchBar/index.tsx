import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import {
	PanGestureHandler,
	State,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useOrientation from "../../utils/useOrientarion";

//Styled-components
const Container = styled.View<{ isPortrait: boolean }>`
	flex-direction: row;
	align-items: center;
	padding-bottom: ${({ isPortrait }) => (isPortrait ? null : "10px")};
`;
const SvgTouchContainer = styled.TouchableOpacity``;
const ImageContainer = styled.Image`
	width: 100px;
	height: 100px;
`;
const SearchContainer = styled.View`
	flex-direction: row;
	border: 1px solid rgba(0, 0, 0, 1);
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	border-top-right-radius: 25px;
	border-bottom-right-radius: 25px;
	elevation: 5;
`;
const Search = styled.TextInput`
	width: 150px;
	height: 50px;
	background-color: #fff;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	border: 2px solid #cccccc;
`;
const SearchButton = styled.TouchableOpacity`
	background-color: #fff;
	height: 50px;
	width: 50px;
	align-items: center;
	justify-content: center;
	border-top-right-radius: 25px;
	border-bottom-right-radius: 25px;
	color: #808080;
	border: 1px solid #9c9c9c;
`;

interface SearchBarProps {
	onSearch: (term: string) => void;
}

//Component
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchVisible, setSearchVisible] = useState(false);
	const [searchText, setSearchText] = useState("");
	const translateX = useRef(new Animated.Value(0)).current;
	const initialX = useRef(0);
	const { isPortrait } = useOrientation();

	const handleGestureEvent = ({ nativeEvent }: PanGestureHandlerGestureEvent) => {
		const { state, translationX } = nativeEvent;
		if (state === State.ACTIVE) {
			if (!searchVisible) {
				initialX.current = translationX;
			}
			translateX.setValue(Math.max(translationX - initialX.current, -150));
		}
		if (state === State.END) {
			if (translationX < -75) {
				Animated.timing(translateX, {
					toValue: -150,
					duration: 200,
					useNativeDriver: true,
				}).start(() => setSearchVisible(false));
			} else {
				Animated.timing(translateX, {
					toValue: 0,
					duration: 200,
					useNativeDriver: true,
				}).start(() => setSearchVisible(true));
			}
		}
	};

	const handleSearch = () => {
		onSearch(searchText);
	};
	return (
		<Container isPortrait={isPortrait}>
			<Animated.View
				style={{
					transform: [{ translateX }],
					overflow: "visible",
				}}
			>
				{searchVisible && (
					<SearchContainer>
						<Search
							onChangeText={setSearchText}
							placeholder="Search pokemon"
							onFocus={() => setSearchVisible(true)}
							onBlur={() => setSearchVisible(false)}
						/>
						<SearchButton onPress={handleSearch}>
							<Icon name="magnify" size={40} color={"black"} />
						</SearchButton>
					</SearchContainer>
				)}
			</Animated.View>
			<PanGestureHandler
				onGestureEvent={handleGestureEvent}
				onHandlerStateChange={handleGestureEvent}
			>
				<SvgTouchContainer
					onPress={() => {
						setSearchVisible(!searchVisible);
						if (!searchVisible) {
							Animated.timing(translateX, {
								toValue: 0,
								duration: 200,
								useNativeDriver: true,
							}).start();
						} else {
							Animated.timing(translateX, {
								toValue: -150,
								duration: 200,
								useNativeDriver: true,
							}).start();
						}
					}}
				>
					<ImageContainer source={require("../../../assets/img/lupaPokedex_1.png")} />
				</SvgTouchContainer>
			</PanGestureHandler>
		</Container>
	);
};

export default SearchBar;
