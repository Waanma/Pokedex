export type RootStackParamList = {
    Home: undefined;
    Details: { id: number, pokemonName: string, sprite: string, exp: number, height: number, weight: number, pokemonType: string, abilityName: string, abilityEffect: string }
};
export interface PokemonDetailsParams {
    id: number;
    pokemonId: number;
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
        };
    };
    pokemonType: string;
    abilityName: { pokemon_v2_pokemonabilities: { pokemon_v2_ability: { name: string } } };
    abilityEffect: {
        pokemon_v2_pokemonabilities: { pokemon_v2_ability: { pokemon_v2_abilityeffecttexts: { effect: string } } }
    };
}