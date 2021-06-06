<template>
  <div>
    <Banda label="Reserva tu atención" />

    <div class="busqueda">
      <q-img
        style="width: 237px; height: 135px;"
        class="busqueda__sucursal"
        src="~/assets/sucursal.png"
      ></q-img>

      <h2 class="busqueda__titulo">
        Selecciona tu Sucursal <br />
        Scotiabank
      </h2>

      <q-select
        class="busqueda__select"
        clearable
        v-model="region"
        :options="regiones"
        option-label="region"
        label="Región"
      />

      <q-select
        class="busqueda__select"
        clearable
        v-model="model"
        :options="comunas(this.region)"
        option-label="comuna"
        label="Comuna"
      />

      <q-select
        class="busqueda__select"
        clearable
        v-model="model"
        :options="options"
        label="Sucursal"
      />

      <q-btn
        class="busqueda__button"
        clearable
        label="VER DISPONIBILIDAD"
        push
        style="color: white"
        :to="{ name: 'Reservar' }"
      />
    </div>
  </div>
</template>

<script>
import Banda from "../components/Banda.vue";
import { mapGetters } from "vuex";

export default {
  name: "Busqueda",
  data() {
    return {
      model: null,
      region: "",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  components: {
    Banda
  },
  computed: {
    ...mapGetters("data", ["regiones", "comunas"])
  },
};
</script>

<style lang="scss" scoped>
.busqueda {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px;
  &__sucursal {
    margin-bottom: 60px;
  }
  &__titulo {
    font-weight: 900;
    font-size: 29px;
    line-height: 117%;
    text-align: center;
    color: #000000;
  }
  &__select {
    width: 100%;
    max-width: 315px;
    margin-bottom: 10px;
  }
  &__button {
    max-width: 343px;
    width: 100%;
    margin: 32px 0 54px;
    font-weight: 800;
    font-size: 15px;
    line-height: 20px;
    display: flex;
    align-items: flex-end;
    text-align: center;
    letter-spacing: 0.42px;
    background-color: #ec111a;
    color: white;
    border-radius: 14px;
    height: 50px;
  }
}
</style>
