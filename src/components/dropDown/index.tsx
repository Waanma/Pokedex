import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type DataType = { label: string; value: string }[];
type TypeValuesType = Record<string, string>;

const data: DataType = [
	{ label: "All", value: "1" },
	{ label: "normal", value: "2" },
	{ label: "water", value: "3" },
	{ label: "rock", value: "4" },
	{ label: "electric", value: "5" },
	{ label: "poison", value: "6" },
	{ label: "fire", value: "7" },
	{ label: "grass", value: "8" },
	{ label: "bug", value: "9" },
	{ label: "ground", value: "10" },
	{ label: "fairy", value: "11" },
	{ label: "flying", value: "12" },
	{ label: "psychic", value: "13" },
	{ label: "dragon", value: "14" },
	{ label: "dark", value: "15" },
	{ label: "steel", value: "16" },
	{ label: "ice", value: "17" },
	{ label: "fighting", value: "18" },
	{ label: "ghost", value: "19" },
];
const typeValues: TypeValuesType = {
	"1": "All",
	"2": "normal",
	"3": "water",
	"4": "Asrockia",
	"5": "electric",
	"6": "poison",
	"7": "fire",
	"8": "grass",
	"9": "bug",
	"10": "ground",
	"11": "fairy",
	"12": "flying",
	"13": "psychic",
	"14": "dragon",
	"15": "dark",
	"16": "steel",
	"17": "ice",
	"18": "fighting",
	"19": "ghost",
};

interface DropdownChangeEvent {
	value: string;
}

const DropdownComponent = ({ setSelectedType }: { setSelectedType: (type: string) => void }) => {
	const [value, setValue] = useState<string | null>(null);
	const [isFocus, setIsFocus] = useState(false);

	return (
		<View style={styles.container}>
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: "green" }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={data}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? "Filter by type" : "..."}
				fontFamily="Nunito-Bold"
				searchPlaceholder="Search..."
				itemTextStyle={{ color: "black" }}
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item: DropdownChangeEvent) => {
					setValue(item.value);
					setIsFocus(false);
					setSelectedType(typeValues[item.value]);
				}}
				renderLeftIcon={() => <Icon name="pokeball" size={35} color={"#35d4db"} />}
			/>
		</View>
	);
};

export default DropdownComponent;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "transparent",
		paddingHorizontal: 16,
	},
	dropdown: {
		height: 50,
		borderColor: "gray",
		borderWidth: 0.5,
		borderRadius: 10,
		paddingHorizontal: 8,
		backgroundColor: "#fff",
		fontFamily: "QuicksandMedium",
	},
	icon: {
		marginRight: 5,
	},
	placeholderStyle: {
		fontSize: 16,
		fontFamily: "QuicksandMedium",
		color: "black",
		margin: 5,
	},
	selectedTextStyle: {
		fontSize: 16,
		color: "black",
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
