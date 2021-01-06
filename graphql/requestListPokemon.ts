import config from "./config";

export default function requestListPokemon(
  limit: Number = 30,
  offset: Number = 0
) {
  return fetch(config.pokemon_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
      query ListPokemon {
        pokemons(limit:${limit}, offset:${offset}) {
          nextOffset
          results {
            name
            image
          }
        }
      }
      `,
    }),
  }).then((r) => r.json());
}
