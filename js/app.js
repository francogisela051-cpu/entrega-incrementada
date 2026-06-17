/*
  SEMANA 11 - ENTREGA INCREMENTAL DEL SITIO/PROYECTO
  Archivo completamente corregido de forma sistemática.
*/

const STORAGE_KEY = "semana11_inscripciones_incremento";
let inscripciones = [];

// CORREGIDO: Selectores flexibles con respaldo genérico por si no coinciden los IDs exactos del HTML
const form = document.getElementById("formulario-inscripcion") || document.querySelector("form");
const btnLimpiar = document.getElementById("btn-limpiar") || document.querySelector("button[type='reset']");
const btnBorrarTodo = document.getElementById("btn-borrar-todo");
const mensaje = document.getElementById("mensajes") || document.getElementById("mensaje");
const tabla = document.getElementById("tabla-inscripciones") || document.querySelector("tbody");
const totalInscritos = document.getElementById("total-inscritos");
const totalValidos = document.getElementById("total-validos");
const totalPendientes = document.getElementById("total-pendientes");
const tallerPopular = document.getElementById("taller-popular");

if (document.body.dataset.page !== "tests") {
  document.addEventListener("DOMContentLoaded", iniciarAplicacion);
}

function iniciarAplicacion() {
  inscripciones = cargarInscripciones();
  renderizarTabla();
  actualizarResumen();
  
  // CORREGIDO: Validación de existencia del elemento antes de asignar el escucha
  if (form) {
    form.addEventListener("submit", manejarEnvio);
  }

  // CORREGIDO: Se pasa la función como callback de referencia pura, sin los paréntesis ()
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", limpiarFormulario);
  }

  if (btnBorrarTodo) {
    btnBorrarTodo.addEventListener("click", borrarTodo);
  }
}

function manejarEnvio(evento) {
  // CORREGIDO: Se previene la recarga por defecto de la página para controlar el flujo por JS
  evento.preventDefault();

  const registro = leerFormulario();
  const errores = validarInscripcion(registro);

  // CORREGIDO: Lógica invertida restaurada. Se guarda el registro SOLO si NO hay errores.
  if (errores.length === 0) {
    guardarRegistro(registro);
    mostrarMensaje("Inscripcion guardada correctamente.", "exito");
    if (form) form.reset();
  } else {
    mostrarMensaje(errores.join(" | "), "error");
  }
}

function leerFormulario() {
  // CORREGIDO: Respaldo para ID de teléfono/celular dinámico y controles de nulidad
  const inputTelefono = document.getElementById("telefono") || document.getElementById("celular");
  
  return {
    nombre: document.getElementById("nombre") ? document.getElementById("nombre").value.trim() : "",
    // CORREGIDO: Conversión explícita del valor de edad de string a número entero
    edad: document.getElementById("edad") ? parseInt(document.getElementById("edad").value, 10) || 0 : 0,
    telefono: inputTelefono ? inputTelefono.value.trim() : "",
    correo: document.getElementById("correo") ? document.getElementById("correo").value.trim() : "",
    taller: document.getElementById("taller") ? document.getElementById("taller").value : "",
    jornada: document.getElementById("jornada") ? document.getElementById("jornada").value : "",
    acepta: document.getElementById("acepta") ? document.getElementById("acepta").checked : false
  };
}

function validarInscripcion(registro) {
  const errores = [];

  if (registro.nombre.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
  }

  // CORREGIDO: Condición corregida. Debe fallar si la edad es estrictamente menor a 12.
  if (registro.edad < 12) {
    errores.push("La edad debe ser de 12 anos o mas.");
  }

  // CORREGIDO: Operador lógico cambiado a 'O' (||). Falla si no mide 10 de largo O si tiene caracteres no numéricos.
  if (registro.telefono.length !== 10 || !/^\d+$/.test(registro.telefono)) {
    errores.push("El telefono debe tener exactamente 10 digitos numericos.");
  }

  // CORREGIDO: Operador lógico cambiado a 'O' (||). Falla si le falta el '@' O si le falta el punto '.'.
  if (!registro.correo.includes("@") || !registro.correo.includes(".")) {
    errores.push("El correo electronico debe tener un formato valido.");
  }

  if (registro.taller === "") {
    errores.push("Debe seleccionar un taller.");
  }

  // CORREGIDO: Propiedad corregida para evaluar 'acepta' que es como se define en el objeto retornado.
  if (registro.acepta !== true) {
    errores.push("Debe confirmar que los datos son correctos.");
  }

  return errores;
}

function obtenerDescripcionTaller(taller) {
  switch (taller) {
    // CORREGIDO: Soporte para los valores reales de los option del select HTML ("web" y "programacion")
    case "web":
    case "programacion":
      return "Programacion web: HTML, CSS, JavaScript y depuracion.";
    case "huerta":
      return "Huerta digital: registros, formularios y seguimiento.";
    case "finanzas":
      return "Finanzas: control basico para emprendimientos rurales.";
    case "datos":
      return "Datos para la finca: tablas, filtros y reportes.";
    default:
      return "Taller no identificado.";
  }
}

function guardarRegistro(registro) {
  const nuevoRegistro = {
    id: Date.now(),
    ...registro,
    descripcion: obtenerDescripcionTaller(registro.taller),
    fecha: new Date().toLocaleString()
  };

  inscripciones.push(nuevoRegistro);

  // CORREGIDO: Nombre de la variable corregido de 'inscripcion' a 'inscripciones' en el stringify
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inscripciones));

  renderizarTabla();
  actualizarResumen();
}

function cargarInscripciones() {
  const datos = localStorage.getItem(STORAGE_KEY);
  if (!datos) return [];

  try {
    return JSON.parse(datos);
  } catch (error) {
    console.warn("No se pudieron cargar los datos guardados:", error);
    return [];
  }
}

function renderizarTabla() {
  if (!tabla) return;
  tabla.innerHTML = "";

  if (inscripciones.length === 0) {
    tabla.innerHTML = '<tr><td colspan="7" class="empty">Aun no hay registros.</td></tr>';
    return;
  }

  // CORREGIDO: Condicional del ciclo for ajustado a menor estricto (<) para no evaluar un índice desbordado (undefined)
  for (let i = 0; i < inscripciones.length; i++) {
    const item = inscripciones[i];
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.edad}</td>
      <td>${item.telefono}<br><small>${item.correo}</small></td>
      <td><strong>${item.taller}</strong><br><small>${item.descripcion}</small></td>
      <td>${item.jornada}</td>
      <td>${item.fecha}</td>
      <td><button class="button secondary" type="button" onclick="eliminarRegistro(${item.id})">Eliminar</button></td>
    `;
    tabla.appendChild(fila);
  }
}

function actualizarResumen() {
  if (!totalInscritos) return;

  totalInscritos.textContent = inscripciones.length;
  // Muestra las inscripciones que cumplen la condición base de la regla de negocio (edad >= 12)
  totalValidos.textContent = inscripciones.filter((item) => item.edad >= 12).length;
  // CORREGIDO: Define el contador de pendientes según la lógica real requerida por la interfaz
  totalPendientes.textContent = inscripciones.filter((item) => item.nombre === "").length;
  tallerPopular.textContent = obtenerTallerPopular(inscripciones);
}

function obtenerTallerPopular(lista = inscripciones) {
  if (!lista || lista.length === 0) return "Sin datos";

  const conteo = {};
  for (let i = 0; i < lista.length; i++) {
    const taller = lista[i].taller;
    conteo[taller] = (conteo[taller] || 0) + 1;
  }

  let ganador = "Sin datos";
  let maximo = 0;
  for (const taller in conteo) {
    if (conteo[taller] > maximo) {
      ganador = taller;
      maximo = conteo[taller];
    }
  }

  return ganador;
}

function mostrarMensaje(texto, tipo = "info") {
  if (!mensaje) return;
  mensaje.textContent = texto;
  mensaje.className = `message ${tipo}`;
}

function limpiarFormulario() {
  if (form) form.reset();
  mostrarMensaje("Formulario limpio. Continue con una nueva prueba.", "info");
}

function eliminarRegistro(id) {
  inscripciones = inscripciones.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inscripciones));
  renderizarTabla();
  actualizarResumen();
}

function borrarTodo() {
  if (!confirm("Desea borrar todas las inscripciones?")) return;
  inscripciones = [];
  localStorage.removeItem(STORAGE_KEY);
  renderizarTabla();
  actualizarResumen();
  mostrarMensaje("Registros eliminados.", "info");
}

// Exposicion de funciones para tests.html. No eliminar.
window.Semana11Feature = {
  validarInscripcion,
  obtenerDescripcionTaller,
  obtenerTallerPopular,
  cargarInscripciones
};