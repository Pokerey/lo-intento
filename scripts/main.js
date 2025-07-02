let datosPokemones = []; 
fetch('pokedex/datos-pokedex.json')
  .then(res => res.json())
  .then(pokemones => {
    datosPokemones = pokemones;
    const contenedor = document.getElementById("contenido");
    contenedor.innerHTML = ''; 
    pokemones.forEach(pokemon => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-pokemon");
      tarjeta.innerHTML = `
        <h2>${pokemon.nombre} (#${pokemon.id})</h2>
        <p><strong>Tipo:</strong> ${pokemon.tipo.join(" / ")}</p>
        <p><strong>Descripción:</strong> ${pokemon.descripcion}</p>
        <p><strong>Altura:</strong> ${pokemon.altura}</p>
        <p><strong>Peso:</strong> ${pokemon.peso}</p>
        <p><strong>Hábitat:</strong> ${pokemon.habitat}</p>
        <p><strong>Habilidades:</strong> ${pokemon.habilidades.join(", ")}</p>
        <img src="${pokemon.imagen}" alt="${pokemon.nombre}" width="200" />
      `;
      contenedor.appendChild(tarjeta);
       });
    })
  .catch(error => {
    console.error("Error al cargar los datos de los Pokémon:", error);
    document.getElementById("contenido").innerText = "Error al cargar los datos del Pokédex.";
  });
document.addEventListener("click", function (e) {
  const etapaClickeada = e.target.closest(".etapa");
  if (etapaClickeada && etapaClickeada.dataset.id) {
    const id = parseInt(etapaClickeada.dataset.id);
    const pokemon = datosPokemones.find(p => p.id === id);

    if (pokemon) {
      const linea = etapaClickeada.closest(".linea-evolutiva");
      const nombreLinea = linea.dataset.linea;
      const contenedorFicha = document.querySelector(`.ficha-evolutiva[data-ficha="${nombreLinea}"]`);

      contenedorFicha.innerHTML = `
        <div class="tarjeta-pokemon">
          <h2>${pokemon.nombre} (#${pokemon.id})</h2>
          <p><strong>Tipo:</strong> ${pokemon.tipo.join(" / ")}</p>
          <p><strong>Descripción:</strong> ${pokemon.descripcion}</p>
          <p><strong>Altura:</strong> ${pokemon.altura}</p>
          <p><strong>Peso:</strong> ${pokemon.peso}</p>
          <p><strong>Hábitat:</strong> ${pokemon.habitat}</p>
          <p><strong>Habilidades:</strong> ${pokemon.habilidades.join(", ")}</p>
          <img src="${pokemon.imagen}" alt="${pokemon.nombre}" width="200" />
        </div>
      `;
    }
  }
});

