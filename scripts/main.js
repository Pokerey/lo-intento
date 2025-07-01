fetch('pokedex/datos-pokedex.json')
  .then(res => res.json())
  .then(pokemones => {
    console.log(pokemones);
    // Acá podés agregar código para mostrarlos en pantalla
  })
  .catch(err => {
    console.error("Error al cargar los datos de los Pokémon", err);
  });
  .then(pokemon => {
    const contenedor = document.getElementById("contenido");
    contenedor.innerHTML = `
      <h2>${pokemon.nombre} (#${pokemon.id})</h2>
      <p><strong>Tipo:</strong> ${pokemon.tipo.join(" / ")}</p>
      <p><strong>Descripción:</strong> ${pokemon.descripcion}</p>
      <p><strong>Altura:</strong> ${pokemon.altura}</p>
      <p><strong>Peso:</strong> ${pokemon.peso}</p>
      <p><strong>Hábitat:</strong> ${pokemon.habitat}</p>
      <p><strong>Habilidades:</strong> ${pokemon.habilidades.join(", ")}</p>
      <img src="${pokemon.imagen}" alt="${pokemon.nombre}" width="200" />
    `;
  })
  .catch(error => {
    document.getElementById("contenido").innerText = "Error al cargar los datos del Pokémon.";
    console.error(error);
  });
