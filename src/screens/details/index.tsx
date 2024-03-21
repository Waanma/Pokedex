import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
	background-color: #db3c36;
	height: 100%;
`;

const Details = () => {
	return (
		<Container>
			<Text>Details</Text>
		</Container>
	);
};

export default Details;
