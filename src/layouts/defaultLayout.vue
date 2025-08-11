<template>
  <v-app-bar :elevation="1">
    <template v-slot:prepend>
      <v-expand-x-transition>
        <v-btn v-show="$router.currentRoute.value.path !== '/'" to="/" icon="mdi-home" />
      </v-expand-x-transition>
    </template>

    <v-app-bar-title text="Discord Online Analyzer" />

    <template v-slot:append>
      <v-btn to="/about" text="About" />
    </template>
  </v-app-bar>

  <v-main>
    <v-container class="fill-height">
      <router-view />
    </v-container>
  </v-main>

  <AppFooter />
</template>
