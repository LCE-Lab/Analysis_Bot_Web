<script setup lang="ts">
import { queryCustom, type ITimeLineData } from '@/api/query'
import { useReCaptchaStore } from '@/stores/recaptcha'

const route = useRoute()
const { recaptcha } = useReCaptchaStore()

const isLoading = ref(false)
const isError = ref(false)
const isNoData = ref(false)
const timelineData = ref<ITimeLineData | null>(null)

const id = computed(() => (route.params as { id?: string }).id ?? '')
const start = computed(() => route.query.start as string)
const end = computed(() => route.query.end as string)

const getData = async () => {
  // Reset State
  timelineData.value = null

  isLoading.value = true
  isError.value = false
  isNoData.value = false

  const token = await recaptcha()
  const response = await queryCustom(id.value, start.value, end.value, token)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err)
      isError.value = true
      isLoading.value = false
      return { data: null }
    })

  if (response) {
    isLoading.value = false
    if (response.data == null || response.data.length === 0) {
      isNoData.value = true
    } else {
      timelineData.value = response.data
    }
  }
}

watch(
  () => [id.value, start.value, end.value],
  () => {
    getData()
  },
  { immediate: true },
)

onMounted(() => {
  getData().catch(console.error)
})
</script>

<template>
  <div class="d-flex flex-column align-center w-100 ga-8">
    <SearchForm :guildId="id" type="custom" :start="start" :end="end" collapsed />
    <RenderData
      :data="timelineData"
      :isLoading="isLoading"
      :isError="isError"
      :isNoData="isNoData"
      :guildId="id"
      @refresh="getData"
    />
  </div>
</template>
