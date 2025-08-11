<script setup lang="ts">
import { queryWeek } from '@/api/query'
import { useReCaptchaStore } from '@/stores/recaptcha'

const route = useRoute()
const { recaptcha } = useReCaptchaStore()

const id = computed(() => (route.params as { id?: string }).id ?? '')

const getData = async () => {
  const token = await recaptcha()
  const response = await queryWeek(id.value, token)

  console.info(response)
}

onMounted(() => {
  getData().catch(console.error)
})
</script>

<template>
  <SearchForm :guildId="id" type="week" />
</template>
