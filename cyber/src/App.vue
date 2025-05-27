<script>
export default {
  name: 'App'
}
</script>

<template>
  <div id="app">
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
:root {
  --color-background: #FFFFFF !important;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--color-background) !important;
  color: var(--color-text);
}

#app {
  min-height: 100vh;
  background-color: var(--color-background) !important;
}
</style>