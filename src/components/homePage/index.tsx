import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
	background-color: red;
	flex: 1;
`;
const TextContent = styled.Text`
	color: blue;
`;

const HomePage = () => {
	return (
		<Container>
			<TextContent>Hellow</TextContent>
		</Container>
	);
};

export default HomePage;
