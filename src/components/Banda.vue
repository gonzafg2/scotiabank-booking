<template>
  <div class="banda">
    <div class="banda__label">{{ label }}</div>
    <q-icon name="event" size="sm" />
  </div>
</template>

<script>
export default {
  name: "Banda",
  props: {
    label: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss">
.banda {
  color: white;
  background-color: #164b7d;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  width: 100%;
  margin-bottom: 29px;
  &__label {
    font-weight: 900;
    font-size: 19px;
    line-height: 179%;
  }
}
</style>
