/* eslint-disable indent */
export const getImageSource = (type: string) => {
	switch (type) {
		case "water":
			return require("../../../assets/img/water.jpg");
		case "poison":
		case "ground":
		case "rock":
			return require("../../../assets/img/rock.jpg");
		case "psychic":
			return require("../../../assets/img/desert.jpg");
		case "ghost":
			return require("../../../assets/img/ghost.jpg");
		default:
			return require("../../../assets/img/normal.jpg");
	}
};
