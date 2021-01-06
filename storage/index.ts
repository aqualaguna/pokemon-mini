export function getOwnedPokemon() {
  let data = localStorage.getItem("owned_pokemon");
  if (typeof data == "string") {
    return JSON.parse(data);
  } else {
    localStorage.setItem("owned_pokemon", "[]");
    return [];
  }
}
export function addOwnedPokemon(payload: any) {
  let data = getOwnedPokemon();
  if (data.find((t) => t.name == payload.name))
    throw "Nickname Already Exists!";
  data.push(payload);
  localStorage.setItem("owned_pokemon", JSON.stringify(data));
}

export function deleteOwnedPokemon(name: string) {
  let data = getOwnedPokemon();
  let index = data.findIndex((t) => t.name == name);
  if (index != -1) data.splice(index, 1);
  localStorage.setItem("owned_pokemon", JSON.stringify(data));
}
