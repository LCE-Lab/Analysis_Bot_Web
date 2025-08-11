<script setup lang="ts">
import { queryCustom } from '@/api/query'
import { useReCaptchaStore } from '@/stores/recaptcha'

const route = useRoute()
const { recaptcha } = useReCaptchaStore()

const id = computed(() => (route.params as { id?: string }).id ?? '')
const start = computed(() => route.query.start as string)
const end = computed(() => route.query.end as string)

const getData = async () => {
  const token = await recaptcha()
  const response = await queryCustom(id.value, start.value, end.value, token)

  console.info(response)
}

onMounted(() => {
  getData().catch(console.error)
})
</script>

<template>
  <SearchForm :guildId="id" type="custom" :start="start" :end="end" />
</template>
