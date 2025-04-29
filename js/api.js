// # REQUESTS

// * pokemon
const fetchPokemonList = (apiUrl = "https://pokeapi.co/api/v2/pokemon") => {
  axios
    .get(apiUrl)
    .then(response => {
      // * UPDATE PAGINATION
      pagination.next = response.data.next;
      pagination.previous = response.data.previous;

      // * RENDER LIST
      const pokemonList = response.data.results;
      renderPokemonList(pokemonList);
    })
    .catch(err => {
      console.error("Error retriving pokemon list", err)
    });
}

const fetchPokemonDetail = (apiUrl) => {
  axios
    .get(apiUrl)
    .then(response => {
      const pokemonData = response.data;
      renderPokemonDetail(pokemonData);
    })
    .catch(err => {
      console.error("Error retriving pokemon detail", err)
    });
}

// * types
const fetchTypesList = () => {
  const apiUrl = "https://pokeapi.co/api/v2/type";

  axios
    .get(apiUrl)
    .then(response => {
      availableTypes = response.data.results.map(type => type.name);
    })
    .catch(err => {
      console.error("Error retriving pokemon list", err)
    });
}