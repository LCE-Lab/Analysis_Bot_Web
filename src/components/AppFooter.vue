<template>
  <v-footer app height="40">
    <div class="text-caption text-disabled" style="position: absolute; left: 16px">
      &copy; 2020-{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">LCE-Lab</span>
      —
      <a
        class="text-decoration-none on-surface"
        href="https://github.com/LCE-Lab/Analysis_Bot_Web/blob/master/LICENSE"
        rel="noopener noreferrer"
        target="_blank"
      >
        GNU AFFERO GENERAL PUBLIC LICENSE
      </a>
    </div>
  </v-footer>
</template>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
