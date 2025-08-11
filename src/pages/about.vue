<script setup lang="ts">
const items = [
  {
    title: 'WoodMan',
    avatar: `/images/woodman.png`,
    role: 'Owner',
    info: 'Web Developer, Backend Developer',
  },
  {
    title: 'jimchen5209',
    avatar: `/images/jimchen5209.png`,
    role: 'Owner',
    info: 'Web Developer, Backend Developer',
  },
  {
    title: 'bill96012',
    avatar: `/images/bill96012.png`,
    role: 'Contributor',
    info: 'UI/UX',
  },
  {
    title: 'james58899',
    avatar: `/images/james58899.png`,
    role: 'Mouth Gun',
    info: 'Sunrise Sunset',
  },
]

const repos = [
  {
    name: 'Analysis Bot Web',
    description: 'Web application',
    url: 'https://github.com/LCE-Lab/Analysis_Bot_Web',
  },
  {
    name: 'Analysis Bot',
    description: 'Backend',
    url: 'https://github.com/LCE-Lab/Analysis_Bot',
  },
]
</script>

<template>
  <div class="d-flex flex-column w-100 ga-4">
    <h1>Discord Online Analyzer</h1>
    <p>
      Developed by <a href="https://github.com/OKTW-Network">OKTW</a> and
      <a href="https://github.com/LCE-Lab">LCE-Lab</a>, this web application allows you to analyze
      Discord online status for voice channel.
    </p>

    <h1>GitHub Repositories</h1>
    <v-row align="center" justify="center" dense>
      <v-col v-for="(repo, index) in repos" :key="index" cols="12" md="6">
        <v-card
          :title="repo.name"
          :subtitle="repo.description"
          :href="repo.url"
          target="_blank"
          prepend-icon="mdi-github"
          append-icon="mdi-open-in-new"
          link
        />
      </v-col>
    </v-row>

    <h1>Developers</h1>
    <v-row align="center" justify="center" dense>
      <v-col v-for="(item, index) in items" :key="index" cols="12" md="6">
        <v-card
          class="mx-auto"
          :prepend-avatar="item.avatar"
          :subtitle="item.role"
          :title="item.title"
        >
          <v-card-text>{{ item.info }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
