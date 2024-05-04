/* eslint-disable indent */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PokemonDetailsParams } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Store {
    favorites: PokemonDetailsParams[];
    addToFavorites: (pokemon: PokemonDetailsParams & { name: string, sprite: string }) => void;
    removeFromFavorites: (pokemonId: number) => void;
}
const initialState: Store = {
    favorites: [],
    addToFavorites: () => { },
    removeFromFavorites: () => { },
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
                }))
        }),
        {
            name: "pokemonStore",
            storage: createJSONStorage(() => AsyncStorage),
        }
    ));