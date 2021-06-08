export function guardarRegionesComuna(state, payload) {
  state.regionesComuna = payload;
}

export function setearRegion(state, payload) {
  state.region = payload;
}

export function setearComuna(state, payload) {
  state.comuna = payload;
}

export function setearSucursal(state, payload) {
  state.sucursal = payload;
}
export function limpiarReserva(state) {
  state.region = null;
  state.comuna = null;
  state.sucursal = null;
  state.verDisponibilidad = false;
}
