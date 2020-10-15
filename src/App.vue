<template>
  <div id="app">
      <q-form-test />
  </div>
</template>

<script>
import QFormTest from "./components/QFormTest/index";

export default {
  name: 'App',
  components: {
    QFormTest
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
