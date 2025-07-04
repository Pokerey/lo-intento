document.addEventListener("DOMContentLoaded", () => {
  const splash      = document.getElementById("splash");
  const mainContent = document.getElementById("main-content");
  const searchInput = document.getElementById("search-input");
  const abrirBtn = document.getElementById("abrir-btn");
if (abrirBtn) {
  abrirBtn.addEventListener("click", dismissSplash);
}
  function dismissSplash() {
    splash.classList.add("fade-out");
    splash.addEventListener("transitionend", () => {
      splash.style.display = "none";
      mainContent.classList.remove("hidden");
    }, { once: true });
  }
  let datosPokemones = [];
  abrirBtn.addEventListener("click", () => {
  console.log("¡Botón abrir clickeado!");
  dismissSplash();
});

  setTimeout(dismissSplash, 1500);
  splash.addEventListener("click", dismissSplash);

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

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase().trim();
      const resultados = datosPokemones.filter(p => 
        p.nombre.toLowerCase().includes(q) ||
        p.tipo.some(t => t.toLowerCase().includes(q))
      );
      renderizarTarjetas(resultados);
    });
  }

  function renderizarTarjetas(lista) {
    const cont = document.getElementById("contenido");
    cont.innerHTML = "";
    if (!lista.length) {
      cont.innerHTML = `<p>No se encontraron Pokémon para "${searchInput.value}".</p>`;
      return;
    }
    lista.forEach(pokemon => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta-pokemon";
      tarjeta.innerHTML = `
        <h2>${pokemon.nombre} (#${pokemon.id})</h2>
        <p><strong>Tipo:</strong> ${pokemon.tipo.join(" / ")}</p>
        <p>${pokemon.descripcion}</p>
        <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
      `;
      cont.appendChild(tarjeta);
    });
  }

  document.addEventListener("click", e => {
    const etapa = e.target.closest(".etapa");
    if (!etapa) return;
    const id = Number(etapa.dataset.id);
    const poke = datosPokemones.find(p => p.id === id);
    if (!poke) return;

    const linea     = etapa.closest(".linea-evolutiva");
    const fichaName = linea.dataset.linea;
    const fichaCont = document.querySelector(
      `.ficha-evolutiva[data-ficha="${fichaName}"]`
    );

    fichaCont.innerHTML = `
      <div class="tarjeta-pokemon">
        <h2>${poke.nombre} (#${poke.id})</h2>
        <p><strong>Tipo:</strong> ${poke.tipo.join(" / ")}</p>
        <p>${poke.descripcion}</p>
        <img src="${poke.imagen}" alt="${poke.nombre}">
      </div>
    `;
  });
});
