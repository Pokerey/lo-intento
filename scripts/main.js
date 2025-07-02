// 1) Referencias globales
const splash       = document.getElementById("splash");
const mainContent  = document.getElementById("main-content");
const searchInput  = document.getElementById("search-input");
let datosPokemones = [];

// 2) Función para ocultar el splash y mostrar el main
function dismissSplash() {
  splash.classList.add("fade-out");
  splash.addEventListener("transitionend", () => {
    splash.style.display     = "none";
    mainContent.classList.remove("hidden");
  }, { once: true });
}

// 3) Splash: timer + clic  
window.addEventListener("load", () => {
  setTimeout(dismissSplash, 1500);
});
splash.addEventListener("click", dismissSplash);

// 4) Carga y renderizado inicial de Pokémon  
fetch("pokedex/datos-pokedex.json")
  .then(res => res.json())
  .then(pokemones => {
    datosPokemones = pokemones;
    renderizarTarjetas(datosPokemones);
  })
  .catch(err => {
    console.error("Error al cargar datos:", err);
    document.getElementById("contenido")
            .innerText = "Error al cargar los datos del Pokédex.";
  });

// 5) Búsqueda en tiempo real  
searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase().trim();
  const resultados = datosPokemones.filter(poke => {
    return poke.nombre.toLowerCase().includes(q)
        || poke.tipo.some(t => t.toLowerCase().includes(q));
  });
  renderizarTarjetas(resultados);
});

// 6) Función de renderizado unificada  
function renderizarTarjetas(lista) {
  const cont = document.getElementById("contenido");
  cont.innerHTML = lista.length
    ? lista.map(pokemon => `
        <div class="tarjeta-pokemon">
          <h2>${pokemon.nombre} (#${pokemon.id})</h2>
          <p><strong>Tipo:</strong> ${pokemon.tipo.join(" / ")}</p>
          <p>${pokemon.descripcion}</p>
          <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
        </div>
      `).join("")
    : `<p>No se encontraron Pokémon para "${searchInput.value}".</p>`;
}

// 7) Click en línea evolutiva  
document.addEventListener("click", e => {
  const etapa = e.target.closest(".etapa");
  if (!etapa || !etapa.dataset.id) return;

  const id        = +etapa.dataset.id;
  const pokemon   = datosPokemones.find(p => p.id === id);
  if (!pokemon)   return;

  const linea     = etapa.closest(".linea-evolutiva");
  const fichaName = linea.dataset.linea;
  const fichaCont = document
    .querySelector(`.ficha-evolutiva[data-ficha="${fichaName}"]`);

  fichaCont.innerHTML = `
    <div class="tarjeta-pokemon">
      <h2>${pokemon.nombre} (#${pokemon.id})</h2>
      <p><strong>Tipo:</strong> ${pokemon.tipo.join(" / ")}</p>
      <p>${pokemon.descripcion}</p>
      <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
    </div>
  `;
});
