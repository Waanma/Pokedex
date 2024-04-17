import React, { createContext, useContext, useState } from "react";

//interfaces
interface Pokemon {
	id: number;
	name: string;
}
interface FavoritesContextType {
	favorites: Pokemon[];
	addToFavorites: (id: Pokemon) => void;
	removeFromFavorites: (id: number) => void;
}
const FavoritesContext = createContext<FavoritesContextType>({
	favorites: [],
	addToFavorites: () => {},
	removeFromFavorites: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [favorites, setFavorites] = useState<Pokemon[]>([]);

	const addToFavorites = (id: Pokemon) => {
		if (!favorites.some((favPokemon) => favPokemon.id === id.id)) {
			setFavorites((prevFavorites) => [...prevFavorites, id]);
		} else {
			console.warn("Ya fue agregado");
		}
	};

	const removeFromFavorites = (id: number) => {
		setFavorites((prevFavorites) => prevFavorites.filter((pokemon) => pokemon.id !== id));
	};

	return (
		<FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
			{children}
		</FavoritesContext.Provider>
	);
};
