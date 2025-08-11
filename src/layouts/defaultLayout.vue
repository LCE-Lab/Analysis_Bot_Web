<template>
  <v-app-bar :elevation="1">
    <v-app-bar-title text="Discord Online Analyzer" />

    <template v-slot:append>
      <v-btn to="/" text="Home" />
      <v-btn to="/about" text="About" />
    </template>
  </v-app-bar>

  <v-main>
    <v-container class="fill-height" max-width="900">
      <router-view />
    </v-container>
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
//
</script>
