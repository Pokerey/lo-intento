window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const mainContent = document.getElementById("main-content");

  // Después de 1,5s hacemos fade-out y mostramos el main
  setTimeout(() => {
    splash.classList.add("fade-out");
    splash.addEventListener("transitionend", () => {
      splash.style.display = "none";
      mainContent.classList.remove("hidden");
    });
  }, 1500);
});

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
        <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
      `;
      contenedor.appendChild(tarjeta);
    });
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const resultados = datosPokemones.filter(poke => {
    const nameMatch = poke.nombre.toLowerCase().includes(query);
    const typeMatch = poke.tipo.some(t => t.toLowerCase().includes(query));
    return nameMatch || typeMatch;
  });
  renderizarTarjetas(resultados);
});

function renderizarTarjetas(lista) {
  const cont = document.getElementById("contenido");
  cont.innerHTML = "";
  if (lista.length === 0) {
    cont.innerHTML = `<p>No se encontraron Pokémon para "${searchInput.value}".</p>`;
    return;
  }
  lista.forEach(pokemon => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-pokemon");
    tarjeta.innerHTML = `
      <h2>${pokemon.nombre} (#${pokemon.id})</h2>
      <p><strong>Tipo:</strong> ${pokemon.tipo.join(" / ")}</p>
      <p><strong>Descripción:</strong> ${pokemon.descripcion}</p>
      <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
    `;
    cont.appendChild(tarjeta);
  });
}

  })
  .catch(error => {
    console.error("Error al cargar los datos:", error);
    document.getElementById("contenido")
      .innerText = "Error al cargar los datos del Pokédex.";
  });


document.addEventListener("click", function (e) {
  const etapaClickeada = e.target.closest(".etapa");
  if (!etapaClickeada || !etapaClickeada.dataset.id) return;

  const id = parseInt(etapaClickeada.dataset.id, 10);
  const pokemon = datosPokemones.find(p => p.id === id);
  if (!pokemon) return;

 
  const linea = etapaClickeada.closest(".linea-evolutiva");
  const nombreLinea = linea.dataset.linea;
  const contenedorFicha = document.querySelector(
    `.ficha-evolutiva[data-ficha="${nombreLinea}"]`
  );

  contenedorFicha.innerHTML = `
    <div class="tarjeta-pokemon">
      <h2>${pokemon.nombre} (#${pokemon.id})</h2>
      <p><strong>Tipo:</strong> ${pokemon.tipo.join(" / ")}</p>
      <p><strong>Descripción:</strong> ${pokemon.descripcion}</p>
      <p><strong>Altura:</strong> ${pokemon.altura}</p>
      <p><strong>Peso:</strong> ${pokemon.peso}</p>
      <p><strong>Hábitat:</strong> ${pokemon.habitat}</p>
      <p><strong>Habilidades:</strong> ${pokemon.habilidades.join(", ")}</p>
      <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
    </div>
  `;
});
