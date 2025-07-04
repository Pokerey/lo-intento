document.addEventListener("DOMContentLoaded", () => {
  const splash      = document.getElementById("splash");
  const mainContent = document.getElementById("main-content");
  const abrirBtn    = document.getElementById("abrir-btn");
  const searchInput = document.getElementById("search-input");
  let datosPokemones = [];

  function dismissSplash() {
    console.log("▶ dismissSplash ejecutado");
    splash.classList.add("fade-out");
    setTimeout(() => {
      splash.style.display = "none";
      mainContent.classList.remove("hidden");
    }, 800);
  }

  if (abrirBtn) {
    abrirBtn.addEventListener("click", () => {
      console.log("✅ Botón clickeado");
      dismissSplash();
    });
  }

  fetch("pokedex/datos-pokedex.json")
    .then(res => res.json())
    .then(data => {
      datosPokemones = data;
      renderizarTarjetas(datosPokemones);
    })
    .catch(() => {
      document.getElementById("contenido").innerText =
        "Error al cargar los datos del Pokédex.";
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
        <p><strong>Altura:</strong> ${pokemon.altura}</p>
        <p><strong>Peso:</strong> ${pokemon.peso}</p>
        <p><strong>Hábitat:</strong> ${pokemon.habitat}</p>
        <p><strong>Habilidades:</strong> ${pokemon.habilidades.join(" / ")}</p>
        <p><strong>Evolución:</strong> ${pokemon.evolucion ? pokemon.evolucion : "Ninguna"}</p>
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

    const fichaName = etapa.closest(".linea-evolutiva").dataset.linea;
    const fichaCont = document.querySelector(
      `.ficha-evolutiva[data-ficha="${fichaName}"]`
    );

    fichaCont.innerHTML = `
      <div class="tarjeta-pokemon">
        <h2>${poke.nombre} (#${poke.id})</h2>
        <p><strong>Tipo:</strong> ${poke.tipo.join(" / ")}</p>
        <p><strong>Altura:</strong> ${poke.altura}</p>
        <p><strong>Peso:</strong> ${poke.peso}</p>
        <p><strong>Hábitat:</strong> ${poke.habitat}</p>
        <p><strong>Habilidades:</strong> ${poke.habilidades.join(" / ")}</p>
        <p><strong>Evolución:</strong> ${poke.evolucion ? poke.evolucion : "Ninguna"}</p>
        <p>${poke.descripcion}</p>
        <img src="${poke.imagen}" alt="${poke.nombre}">
      </div>
    `;
  });
});
