import config from "./config";

export default function requestListPokemon(name: string) {
  return fetch(config.pokemon_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetPokemonDetail{
        pokemon(name: "${name}") {
          abilities {
            ability {
              name
            }
          }
          base_experience
          height
          id
          moves{
            move{
               name
            }
          }
          name
          sprites{
            back_default
            back_female
            back_shiny
            back_shiny_female
             front_default
            front_female
            front_shiny
            front_shiny_female
            
          }
          stats{
            base_stat
            effort
            stat{
              name
            }
          }
        }
      }
      `,
    }),
  }).then((r) => r.json());
}
