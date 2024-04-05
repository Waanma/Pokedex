export type RootStackParamList = {
    Home: undefined;
    Details: { pokemonName: string, sprite: string, exp: number, height: number, weight: number, pokemonType: string }
};
export interface PokemonDetailsParams {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    base_experience: number;
    pokemon_v2_pokemontypes: {
        pokemon_v2_type: {
            name: string;
        }
    }
    pokemonType: string;
}