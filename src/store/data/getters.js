export function regiones(state) {
  const regionesComuna = state.regionesComuna;

  const regiones = regionesComuna
    .map(obj => {
      return {
        id: obj.id_region,
        region: obj.region
      };
    })
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
    .sort((a, b) => b.region - a.region);
  return regiones;
}
export function comunas(state) {
  const regiones = state.regionesComuna;
  const region = state.region;

  if (!regiones || !region) return [];
  const comuna = regiones
    .filter(fil => fil.id_region === region.id)
    .map(obj => {
      return {
        id: obj.id_comuna,
        nombre: obj.comuna
      };
    })
    .sort((a, b) => a.nombre - b.nombre);
  if (!comuna) return [];
  return comuna;
}
export function sucursales(state) {
  const regiones = state.regionesComuna;
  const comuna = state.comuna;

  if (!regiones || !comuna) return [];
  const sucursal = regiones
    .filter(fil => fil.id_comuna === comuna.id)
    .map(obj => {
      return {
        id: obj.id_sucursal,
        nombre: obj.sucursal,
        direccion: obj.direccion
      };
    })
    .sort((a, b) => a.nombre - b.nombre);
  if (!sucursal) return [];
  return sucursal;
}
export function verDisponibilidad(state) {
  const region = state.region;
  const comuna = state.comuna;
  const sucursal = state.sucursal;
  if (!region || !comuna || !sucursal) return false;
  return true;
}
