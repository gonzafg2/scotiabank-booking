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
            <p v-if="sucursal" class="reservar__nombre">
              {{ sucursal.nombre }}
            </p>
            <p v-else class="reservar__nombre">Nombre Sucursal</p>
            <p v-if="sucursal" class="reservar__direccion">
              {{ sucursal.direccion }}
            </p>
            <p v-else class="reservar__direccion">Dirección</p>
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
          <!-- <div class="reservar__horario">{{ bloque.hora }}</div> -->
          <q-btn
            @click="horarioClick(bloque, i)"
            class="q-mb-md"
            :class="seleccionado == i ? 'reservar__seleccionado' : ''"
            :push="seleccionado !== i"
            rounded
            color="white"
            text-color="dark"
            :label="bloque.hora"
          />
        </div>
      </div>

      <q-btn
        v-if="ejecutivo"
        :disabled="!horarioSeleccionado"
        class="reservar__button"
        label="AGENDAR HORA"
        push
        style="color: white"
        @click="confirmarHora"
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

      <q-dialog v-model="confirmar" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="event" color="red" text-color="white" />
            <span class="q-ml-sm">¿Estás seguro de agendar?.</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="negative" v-close-popup />
            <q-btn
              @click="confirmado = true"
              flat
              label="Si, estoy seguro"
              color="positive"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="confirmado">
        <q-card>
          <q-card-section>
            <div class="text-h6">Reserva de Hora Exitosa</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Su hora ha sido tomada
          </q-card-section>

          <q-card-actions align="right">
            <q-btn @click="confirmadoHora()" flat label="OK" color="positive" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import Banda from "../components/Banda.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Reservar",
  data() {
    return {
      model: null,
      ejecutivo: "",
      fecha: "07-06-2021",
      confirmar: false,
      confirmado: false,
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
      ],
      seleccionado: null,
      horarioSeleccionado: null
    };
  },
  components: {
    Banda
  },
  computed: {
    ...mapState("data", ["region", "comuna", "sucursal"])
  },
  methods: {
    irBusqueda() {
      this.$router.push({ name: "Busqueda" });
    },
    horarioClick(bloque, index) {
      if (this.horarioSeleccionado === bloque) {
        this.horarioSeleccionado = null;
      } else {
        this.horarioSeleccionado = bloque;
      }
      if (this.seleccionado === index) {
        this.seleccionado = null;
        return;
      }
      this.seleccionado = index;
    },
    confirmarHora() {
      this.confirmar = true;
    },
    confirmadoHora() {
      this.horarioSeleccionado = null;
      this.horarioSeleccionado = null;
      this.limpiarReserva();
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    ...mapMutations("data", ["limpiarReserva"])
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
  &__seleccionado.q-btn {
    background-color: #ec111a !important;
    color: white !important;
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
