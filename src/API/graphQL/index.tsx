import { gql } from "@apollo/client";

export const QUERY = gql`
	query getPokemons {
		pokemon_v2_pokemon(limit: 250) {
			id
			name
			base_experience
			height
			weight
			pokemon_v2_pokemonsprites {
				sprites
			}
			pokemon_v2_pokemontypes {
				pokemon_v2_type {
					name
				}
			}
			pokemon_v2_pokemonabilities {
				pokemon_v2_pokemon {
					pokemon_v2_pokemonstats {
						base_stat
						pokemon_v2_stat {
							name
						}
					}
				}
				pokemon_v2_ability {
					name
					pokemon_v2_abilityeffecttexts {
						effect
					}
				}
			}
		}
	}
`;
