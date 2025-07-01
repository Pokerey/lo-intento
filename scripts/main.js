// 🌟 Variable global para guardar los Pokémon
let datosPokemones = [];

// 🚀 1. Cargar el JSON con los datos
fetch('pokedex/datos-pokedex.json')
  .then(res => res.json())
  .then(pokemones => {
    datosPokemones = pokemones;

    // 🖼️ Mostrar contenido inicial de bienvenida
    const contenedor = document.getElementById("contenido");
    contenedor.innerHTML = `
      <div class="mensaje-inicial">
        <p>Seleccioná una línea evolutiva para ver su ficha completa.</p>
      </div>
    `;
  })
  .catch(error => {
    console.error("Error al cargar los datos de los Pokémon:", error);
    document.getElementById("contenido").innerText = "Error al cargar los datos del Pokédex.";
  });

// 🖱️ 2. Detectar clic en etapa evolutiva (línea)
document.addEventListener("click", function (e) {
  const etapaClickeada = e.target.closest(".etapa");
  if (etapaClickeada && etapaClickeada.dataset.id) {
    const id = parseInt(etapaClickeada.dataset.id);
    const seleccionado = datosPokemones.find(p => p.id === id);
    if (seleccionado) {
      mostrarFicha(seleccionado);
    }
  }
});

// 🧾 3. Función para mostrar la ficha del Pokémon elegido
function mostrarFicha(pokemon) {
  const contenedor = document.getElementById("contenido");
  contenedor.innerHTML = `
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

  contenedor.scrollIntoView({ behavior: "smooth" });
}
