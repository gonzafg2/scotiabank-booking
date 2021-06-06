export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const logged = localStorage.getItem("login");

    if (to.path === "/" && !logged) next({ name: "Login" });
    else if (to.name === "Login" && logged) next({ name: "Home" });
    else next();
  });
};
