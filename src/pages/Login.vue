<template>
  <div class="q-pa-md login">
    <q-img
      class="login__logo"
      src="~/assets/logo-creasys.png"
      spinner-color="white"
    />

    <q-img class="login__mapa" src="~/assets/map.png" spinner-color="white" />

    <h1 class="login__titulo">
      Agenda tu atención en <br />
      sucursal en linea
    </h1>

    <q-form @submit="Ingresar">
      <label class="login__label">Ingresa tu Usuario</label>
      <q-input
        bg-color="white"
        class="login__input"
        outlined
        maxlength="10"
        placeholder="Ej: 17238755-1"
        v-model="rut"
      />

      <div>
        <q-btn
          class="login__button"
          style="color: #164B7D;"
          icon="login"
          label="Ingresar"
          type="submit"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      rut: "17238755-1"
    };
  },
  methods: {
    async Ingresar() {
      if (!this.rut) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Debes ingresar tu RUT para ingresar al sistema"
        });
        return;
      }

      const req = await this.userLogin(this.rut);

      if (!req) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Usuario no registrado en sistema"
        });
        return;
      }
      this.$router.push("/");
      return;
    },
    ...mapActions("auth", ["userLogin"])
  }
};
</script>

<style lang="scss">
.login {
  height: 100vh;
  background-color: #164b7d;
  background-image: url("~assets/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__logo {
    width: 291px;
    height: 41px;
    margin-bottom: 65px;
  }
  &__mapa {
    width: 40px;
    height: 40px;
    margin-bottom: 25px;
  }
  &__titulo {
    font-weight: 900;
    font-size: 29px;
    line-height: 117%;
    color: white;
    text-align: center;
  }
  &__label {
    font-weight: 600;
    font-size: 17px;
    line-height: 23px;
    display: flex;
    justify-content: center;
    color: white;
    margin-bottom: 11px;
  }
  &__input {
    width: 295px;
    margin-bottom: 50px;
    .q-field__control {
      border-radius: 8px;
    }
  }
  &__button {
    width: 100%;
    height: 56px;
    font-weight: 900;
    font-size: 17px;
    line-height: 23px;
    letter-spacing: 0.42px;
    background-color: white;
    border-radius: 14px;
  }
}
</style>
