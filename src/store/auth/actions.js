import { Notify } from "quasar";

export async function userLogin({ commit }, payload) {
  const rut = payload;
  if (rut === "17238755-1") {
    commit("guardarLogin", rut);
    Notify.create({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Login exitoso"
    });
    localStorage.setItem("login", "1");
    return true;
  }
  return;
}
