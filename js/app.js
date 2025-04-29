// # SETTINGS
const pagination = {
  next: null,
  previous: null,
};

let availableTypes = []


// # APP INIT
const init = () => {
  fetchTypesList();
  fetchPokemonList();
}

init();