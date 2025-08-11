<template>
  <div class="d-flex flex-column align-center w-100 ga-8">
    <v-empty-state
      headline="Whoops, 404"
      title="Page not found"
      text="The page you were looking for does not exist"
      icon="mdi-map-marker-question"
      action-text="Go back home"
      @click:action="$router.push('/')"
    ></v-empty-state>
  </div>
</template>
