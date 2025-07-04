document.addEventListener("DOMContentLoaded", () => {
  const splash      = document.getElementById("splash");
  const mainContent = document.getElementById("main-content");
  const abrirBtn    = document.getElementById("abrir-btn");
  console.log("¿Encontró el botón?:", abrirBtn);
  const searchInput = document.getElementById("search-input");
  let datosPokemones = [];

  // Función para ocultar splash y mostrar contenido
  function dismissSplash() {
    splash.classList.add("fade-out");
    setTimeout(() => {
      splash.style.display = "none";
      mainContent.classList.remove("hidden");
    }, 800);
  }

  // Listener para el botón "Abrir Pokédex"
  if (abrirBtn) {
    abrirBtn.addEventListener("click", dismissSplash);
  }

  // Auto-dismiss tras 1.5s
  setTimeout(dismissSplash, 1500);

  // Carga de datos y renderizado
  fetch("pokedex/datos-pokedex.json")
    .then(res => res.json())
    .then(data => {
      datosPokemones = data;
      renderizarTarjetas(datosPokemones);
    })
    .catch(() => {
      document.getElementById("contenido")
              .innerText = "Error al cargar los datos del Pokédex.";
    });

  // Filtrado de búsqueda
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

  // Renderiza las tarjetas en #contenido
  function renderizarTarjetas(lista) {
    const cont = document.getElementById("contenido");
    cont.innerHTML = "";
    if (!lista.length) {
      cont.innerHTML = `<p>No se encontraron Pokémon para "${searchInput.value}".</p>`;
      return;
    }
    lista.forEach(poke => {
      const { id, nombre, tipo, descripcion, imagen } = poke;
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta-pokemon";
      tarjeta.innerHTML = `
        <h2>${nombre} (#${id})</h2>
        <p><strong>Tipo:</strong> ${tipo.join(" / ")}</p>
        <p>${descripcion}</p>
        <img src="${imagen}" alt="${nombre}">
      `;
      cont.appendChild(tarjeta);
    });
  }

  // Maneja clics en evoluciones
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
        <p>${poke.descripcion}</p>
        <img src="${poke.imagen}" alt="${poke.nombre}">
      </div>
    `;
  });
});
