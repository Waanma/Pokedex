/* eslint-disable indent */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PokemonDetailsParams } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Store {
    favorites: PokemonDetailsParams[];
    addToFavorites: (pokemon: PokemonDetailsParams & { name: string, sprite: string }) => void;
    removeFromFavorites: (pokemonId: number) => void;
    clearFavorites: () => void;
}
const initialState: Store = {
    favorites: [],
    addToFavorites: () => { },
    removeFromFavorites: () => { },
    clearFavorites: () => { },
};

export const useStore = create<Store>(
    // @ts-expect-error -> "this works correctly"
    persist(
        (set) => ({
            ...initialState,
            addToFavorites: (pokemon) =>
                set((state) => ({
                    favorites: [...state.favorites, { ...pokemon, name: pokemon.name, sprite: pokemon.sprites.front_default }],
                })),
            removeFromFavorites: (pokemonId) =>
                set((state) => ({
                    favorites: state.favorites.filter((pokemon) => pokemon.id !== pokemonId),
                })),
            clearFavorites: async () => {
                try {
                    await AsyncStorage.removeItem("pokemonStore");
                    console.log("Pokemons are free");
                    set({ favorites: [] });
                } catch (error) {
                    console.error("Error: ", error);
                }
            }
        }),
        {
            name: "pokemonStore",
            storage: createJSONStorage(() => AsyncStorage),
        }
    ));