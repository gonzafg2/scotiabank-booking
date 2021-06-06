<template>
  <div>
    <Banda label="Agendar hora atención" />

    <div class="reservar">
      <div class="reservar__sucursal">
        <div class="flex items-center">
          <q-icon
            class="reservar__map"
            style="color: #ec111a;"
            name="place"
            size="lg"
          />
          <div class="flex column items-left">
            <p class="reservar__nombre">Nombre Sucursal</p>
            <p class="reservar__direccion">Dirección</p>
          </div>
        </div>

        <div @click="irBusqueda" class="reservar__cambiar">
          <q-icon style="color: #ec111a;" name="history" size="sm" />
          <p class="reservar__atras">
            Cambiar <br />
            Sucursal
          </p>
        </div>
      </div>

      <q-input
        class="reservar__busqueda"
        dense
        rounded
        outlined
        v-model="fecha"
        label="Buscar fecha"
        :rules="['fecha']"
      >
        <template v-if="false" v-slot:after>
          <q-btn push round dense flat icon="search" />
        </template>

        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date mask="DD-MM-YYYY" v-model="fecha">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-select
        class="reservar__select"
        clearable
        label="Ejecutivo"
        v-model="ejecutivo"
        :options="ejecutivos"
        option-label="nombre"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-select>

      <template v-if="ejecutivo">
        <h3 class="reservar__dia">Lunes</h3>
        <h4 class="reservar__fecha">07 Junio 2021</h4>
      </template>

      <div v-if="horario && ejecutivo" class="row justify-between">
        <div v-for="(bloque, i) in horario" :key="i" class="col-4">
          <div class="reservar__horario">{{ bloque.hora }}</div>
        </div>
      </div>

      <q-btn
        v-if="ejecutivo"
        class="reservar__button"
        label="AGENDAR HORA"
        push
        style="color: white"
      />

      <template v-if="!ejecutivo">
        <q-img
          v-if="!ejecutivo"
          style="width: 237px; height: 135px;"
          class="reservar__suc-logo"
          src="~/assets/sucursal.png"
        ></q-img>
        <div class="reservar__mensaje">
          Selecciona una fecha y luego <br />
          un ejecutivo
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Banda from "../components/Banda.vue";

export default {
  name: "Reservar",
  data() {
    return {
      model: null,
      ejecutivo: "",
      fecha: "07-06-2021",
      ejecutivos: [
        {
          id: "1",
          nombre: "Juan Pérez"
        },
        {
          id: "2",
          nombre: "Felipe Zúñiga"
        },
        {
          id: "3",
          nombre: "Pedro Piedra"
        }
      ],
      horario: [
        {
          id: "1",
          nombre: "Bloque 1",
          hora: "09:00 am"
        },
        {
          id: "2",
          nombre: "Bloque 2",
          hora: "10:00 am"
        },
        {
          id: "3",
          nombre: "Bloque 3",
          hora: "11:00 am"
        },
        {
          id: "4",
          nombre: "Bloque 4",
          hora: "12:00 am"
        },
        {
          id: "5",
          nombre: "Bloque 5",
          hora: "13:00 pm"
        },
        {
          id: "6",
          nombre: "Bloque 6",
          hora: "14:00 pm"
        },
        {
          id: "7",
          nombre: "Bloque 7",
          hora: "15:00 pm"
        },
        {
          id: "8",
          nombre: "Bloque 8",
          hora: "16:00 pm"
        },
        {
          id: "9",
          nombre: "Bloque 9",
          hora: "17:00 pm"
        }
      ]
    };
  },
  components: {
    Banda
  },
  methods: {
    irBusqueda() {
      this.$router.push({ name: "Busqueda" });
    }
  }
};
</script>

<style lang="scss" scoped>
.reservar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 26px;
  &__atras {
    font-weight: 800;
    font-size: 10px;
    line-height: 100%;
    margin: 5px 0 0;
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
  &__busqueda {
    margin-bottom: 10px;
    width: 100%;
  }
  &__cambiar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__dia {
    font-weight: 800;
    font-size: 17px;
    line-height: 200%;
    color: black;
    margin: 0;
    align-self: flex-start;
  }
  &__direccion {
    font-weight: 900;
    font-size: 16px;
    line-height: 212%;
    color: #000000;
    margin-bottom: 0;
  }
  &__fecha {
    font-weight: 900;
    font-size: 19px;
    line-height: 179%;
    color: black;
    margin: 0 0 26px;
    align-self: flex-start;
  }
  &__horario {
    background-color: rgba(255, 255, 255, 0.4);
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    margin-right: 30px;
    height: 38px;
  }
  &__map {
    margin-right: 10px;
  }
  &__mensaje {
    font-weight: 900;
    font-size: 20px;
    line-height: 150%;
    color: #ec111a;
    margin-bottom: 100px;
  }
  &__nombre {
    font-weight: 800;
    font-size: 17px;
    line-height: 200%;
    color: #000000;
    margin-bottom: 0;
  }
  &__suc-logo {
    margin: 40px 0 20px;
  }
  &__select {
    width: 100%;
    margin-bottom: 10px;
  }
  &__sucursal {
    align-self: flex-start;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>
