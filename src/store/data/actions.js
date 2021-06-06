import axios from "axios";

export async function getRegionesComuna({ commit }) {
const url = "/regiones-comunas.json"
try {
  const req = await axios(url);
  commit("guardarRegionesComuna", req.data);
} catch (error) {
  console.log(error);
}
}
