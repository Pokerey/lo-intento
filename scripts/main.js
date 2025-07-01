let datosPokemones = [];
fetch('pokedex/datos-pokedex.json')
  .then(res => res.json())
  .then(pokemones => {
  datosPokemones = pokemones;
    const contenedor = document.getElementById("contenido");
    contenedor.innerHTML = '';

    pokemones.forEach(pokemon => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-pokemon"); // Podés diseñarlo con CSS

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
    const seleccionado = datosPokemones.find(p => p.id === id);
    if (seleccionado) {
      const contenedor = document.getElementById("contenido");
      contenedor.innerHTML = `
        <h2>${seleccionado.nombre} (#${seleccionado.id})</h2>
        <p><strong>Tipo:</strong> ${seleccionado.tipo.join(" / ")}</p>
        <p><strong>Descripción:</strong> ${seleccionado.descripcion}</p>
        <p><strong>Altura:</strong> ${seleccionado.altura}</p>
        <p><strong>Peso:</strong> ${seleccionado.peso}</p>
        <p><strong>Hábitat:</strong> ${seleccionado.habitat}</p>
        <p><strong>Habilidades:</strong> ${seleccionado.habilidades.join(", ")}</p>
        <img src="${seleccionado.imagen}" alt="${seleccionado.nombre}" width="200" />
      `;

      contenedor.scrollIntoView({ behavior: "smooth" });
    }
  }
});

