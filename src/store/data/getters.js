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
  return function (payload) {
    const region = payload;
    if (!region) return ["Selecciona una región"];
    const comuna = state.regionesComuna.filter(obj => obj.id === region.id);
    if (!comuna) return ["Selecciona una región"];
    return comuna;
  };
}
