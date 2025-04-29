// #  DOM REFERENCES
const pokemonList = document.querySelector(".right-container__screen");
const previousButton = document.querySelector(".left-button");
const nextButton = document.querySelector(".right-button");
const pokemonDetailMainScreen = document.querySelector(".main-screen");
const pokemonDetailName = document.querySelector(".poke-name");
const pokemonDetailId = document.querySelector(".poke-id");
const pokemonDetailWeight = document.querySelector(".poke-weight");
const pokemonDetailHeight = document.querySelector(".poke-height");
const pokemonDetailType1 = document.querySelector(".poke-type-one");
const pokemonDetailType2 = document.querySelector(".poke-type-two");
const pokemonDetailImageFront = document.querySelector(".poke-front-image");
const pokemonDetailImageBack = document.querySelector(".poke-back-image");

// # DOM RENDERING
const resetScreen = () => {
  availableTypes.forEach(type => {
    if (pokemonDetailMainScreen.classList.contains(type)) {
      pokemonDetailMainScreen.classList.remove(type);
    }

    if (pokemonDetailType1.classList.contains(type)) {
      pokemonDetailType1.classList.remove(type);
    }

    if (pokemonDetailType2.classList.contains(type)) {
      pokemonDetailType2.classList.remove(type);
    }
  });

  pokemonDetailType2.classList.remove("hide");
  pokemonDetailType1.innerText = "";
  pokemonDetailType2.innerText = "";
}

const renderPokemonList = (pokemons) => {
  pokemonList.innerHTML = "";

  pokemons.forEach((pokemon) => {
    const { name, url } = pokemon;
    const item = document.createElement("div");
    item.classList.add("list-item");
    item.innerText = UCFirst(name);
    item.addEventListener("click", () => {
      fetchPokemonDetail(url);
    });

    pokemonList.append(item);
  });
}

const renderPokemonDetail = (pokemon) => {
  console.log(pokemon);
  resetScreen();

  const pokemonType1 = pokemon.types[0].type.name;
  const pokemonType2 = pokemon.types[1]?.type.name; // potentially undefined

  console.log(pokemonType1, pokemonType2);

  // * textual content
  pokemonDetailName.innerText = UCFirst(pokemon.name);

  let pokemonId = pokemon.id;
  if (pokemonId < 10) {
    pokemonId = "00" + pokemonId;
  } else if (pokemonId < 100) {
    pokemonId = "0" + pokemonId;
  }

  pokemonDetailId.innerText = "#" + pokemonId;
  pokemonDetailWeight.innerText = (pokemon.weight / 10) + " KG";
  pokemonDetailHeight.innerText = (pokemon.height / 10).toFixed(2) + " M";

  // * images
  pokemonDetailImageFront.src = pokemon.sprites.front_default
  pokemonDetailImageBack.src = pokemon.sprites.back_default

  // * type colors
  pokemonDetailMainScreen.classList.add(pokemonType1);
  pokemonDetailType1.classList.add(pokemonType1);
  pokemonDetailType2.classList.add(pokemonType2 ? pokemonType2 : "hide");
  pokemonDetailType1.innerText = UCFirst(pokemonType1);
  pokemonDetailType2.innerText = pokemonType2 ? UCFirst(pokemonType2) : "hide";

  pokemonDetailMainScreen.classList.remove("hide");


  // * audio
  const pokemonBattlecry = new Audio(pokemon.cries.legacy);
  pokemonBattlecry
    .play()
    .then(() => {
      console.log("Sound reprodiced successfully 🥳");
    })
    .catch(err => {
      console.error("Error reproducing sound 😢", err);
    })
}

// # DOM EVENTS
nextButton.addEventListener("click", () => {
  if (!pagination.next) return;
  fetchPokemonList(pagination.next);
})

previousButton.addEventListener("click", () => {
  if (!pagination.previous) return;
  fetchPokemonList(pagination.previous);
})

// # UTILS
const UCFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();