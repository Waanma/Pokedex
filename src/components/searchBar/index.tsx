import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import {
	PanGestureHandler,
	State,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Animated } from "react-native";

const Container = styled.View`
	padding: 10px;
	padding-top: 25px;
	flex-direction: row;
	align-items: center;
`;

const SvgTouchContainer = styled.TouchableOpacity`
`;
const ImageContainer = styled.Image`
	width: 100px;
	height: 100px;
`;
const SearchContainer = styled.View`
	flex-direction: row;
`;
const Search = styled.TextInput`
	width: 150px;
	height: 50px;
	background-color: #fff;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
`;
const SearchButton = styled.TouchableOpacity`
	background-color: #fff;
	height: 50px;
	width: 50px;
	border-top-right-radius: 25px;
	border-bottom-right-radius: 25px;
	color: black;
`;

const SearchBar = () => {
	const [searchVisible, setSearchVisible] = useState(false);
	const translateX = useRef(new Animated.Value(0)).current;
	const initialX = useRef(0);

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
	return (
		<Container>
			<Animated.View
				style={{
					transform: [{ translateX }],
					overflow: "visible",
					marginLeft: 10,
				}}
			>
				{searchVisible && (
					<SearchContainer>
						<Search
							placeholder="Search"
							onFocus={() => setSearchVisible(true)}
							onBlur={() => setSearchVisible(false)}
						/>
						<SearchButton />
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
