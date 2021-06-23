<template>
  <q-layout class="layout" view="hHh lpR fFf">
    <q-header class="layout__header text-dark">
      <q-toolbar class="layout__toolbar">
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-img
            :to="{ name: 'Busqueda' }"
            class="layout__logo q-ml-xl"
            src="~/assets/logo-blue.png"
          ></q-img>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      left: false
    };
  }
};
</script>

<style lang="scss" scoped>
.layout {
  &__header {
    background-color: white;
  }
  &__toolbar {
    height: 60px;
  }
  &__logo {
    width: 172px;
    height: 24px;
  }
}
</style>
