// 🌟 Variable global con los datos del Pokédex
let datosPokemones = [];

// 🚀 Cargar datos desde el JSON
fetch('pokedex/datos-pokedex.json')
  .then(res => res.json())
  .then(pokemones => {
    datosPokemones = pokemones;

    // Mensaje inicial o pantalla limpia
    const contenedor = document.getElementById("contenido");
    contenedor.innerHTML = "<p>Seleccioná una línea evolutiva para ver su ficha.</p>";
  })
  .catch(error => {
    console.error("Error al cargar los datos de los Pokémon:", error);
    document.getElementById("contenido").innerText = "Error al cargar los datos del Pokédex.";
  });

// 🔁 Evento: clic sobre etapa evolutiva
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

// 🧾 Mostrar ficha del Pokémon seleccionado
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
