<template>
  <div>
    <Banda label="Reserva tu atención" />

    <div class="busqueda">
      <q-img
        style="width: 249px; height: 175px;"
        class="busqueda__sucursal"
        src="~/assets/suc.png"
      ></q-img>

      <h2 class="busqueda__titulo">
        Selecciona tu Sucursal <br />
        del Banco
      </h2>

      <q-select
        class="busqueda__select"
        clearable
        v-model="regionSeleccionada"
        :options="regiones"
        option-label="region"
        label="Región"
      />

      <q-select
        class="busqueda__select"
        clearable
        v-model="comunaSeleccionada"
        :options="comunas"
        option-label="nombre"
        label="Comuna"
        :disable="!regionSeleccionada"
      />

      <q-select
        class="busqueda__select"
        clearable
        v-model="sucursalSeleccionada"
        :options="sucursales"
        option-label="nombre"
        label="Sucursal"
        :disable="!comunaSeleccionada"
      />

      <q-btn
        class="busqueda__button"
        clearable
        label="VER DISPONIBILIDAD"
        push
        style="color: white"
        :disable="!verDisponibilidad"
        :to="{ name: 'Reservar' }"
      />
    </div>
  </div>
</template>

<script>
import Banda from "../components/Banda.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Busqueda",
  data() {
    return {
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  components: {
    Banda
  },
  computed: {
    ...mapState("data", ["region", "comuna", "sucursal"]),
    ...mapGetters("data", [
      "regiones",
      "comunas",
      "sucursales",
      "verDisponibilidad"
    ]),
    regionSeleccionada: {
      get() {
        return this.region;
      },
      set(val) {
        this.setearRegion(val);
      }
    },
    comunaSeleccionada: {
      get() {
        return this.comuna;
      },
      set(val) {
        this.setearComuna(val);
      }
    },
    sucursalSeleccionada: {
      get() {
        return this.sucursal;
      },
      set(val) {
        this.setearSucursal(val);
      }
    }
  },
  methods: {
    ...mapMutations("data", ["setearRegion", "setearComuna", "setearSucursal"])
  }
};
</script>

<style lang="scss" scoped>
.busqueda {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px;
  &__sucursal {
    margin-bottom: 0;
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
    justify-content: center;
    align-items: center;
    text-align: center;
    letter-spacing: 0.42px;
    background-color: #164b7d;
    color: white;
    border-radius: 14px;
    height: 50px;
  }
}
</style>
