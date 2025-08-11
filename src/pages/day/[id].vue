<script setup lang="ts">
import { useReCaptchaStore } from '@/stores/recaptcha'
import { queryDay } from '@/api/query'

const route = useRoute()
const { recaptcha } = useReCaptchaStore()

const id = computed(() => (route.params as { id?: string }).id ?? '')

const getData = async () => {
  const token = await recaptcha()
  const response = await queryDay(id.value, token)

  console.info(response)
}

onMounted(() => {
  getData().catch(console.error)
})
</script>

<template>
  <SearchForm :guildId="id" type="day" />
</template>
