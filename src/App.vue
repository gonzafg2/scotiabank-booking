<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions("data", ["getRegionesComuna"])
  },
  created () {
    this.getRegionesComuna();
  },
};
</script>

<style lang="scss">
#q-app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
input.q-field__native {
  padding-left: 28px;
  font-weight: 500;
  font-size: 16px;
  line-height: 212%;
  color: #7f7f83;
}
</style>
