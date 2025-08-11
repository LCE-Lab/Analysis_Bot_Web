<script setup lang="ts">
import { queryWeek, type ITimeLineData } from '@/api/query'
import { useReCaptchaStore } from '@/stores/recaptcha'

const route = useRoute()
const { recaptcha } = useReCaptchaStore()

const isLoading = ref(false)
const isError = ref(false)
const isNoData = ref(false)
const timelineData = ref<ITimeLineData | null>(null)

const id = computed(() => (route.params as { id?: string }).id ?? '')

const getData = async () => {
  isLoading.value = true
  isError.value = false
  isNoData.value = false

  const token = await recaptcha()
  const response = await queryWeek(id.value, token)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err)
      isError.value = true
      isLoading.value = false
      return { data: null }
    })

  if (response) {
    isLoading.value = false
    timelineData.value = response.data
  }
}

onMounted(() => {
  getData().catch(console.error)
})
</script>

<template>
  <div class="d-flex flex-column align-center w-100 ga-8">
    <SearchForm :guildId="id" type="week" />
    <RenderData
      :data="timelineData"
      :isLoading="isLoading"
      :isError="isError"
      :isNoData="isNoData"
    />
  </div>
</template>
