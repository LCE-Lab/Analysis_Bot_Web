<script setup lang="ts">
import type { ITimeLineData } from '@/api/query'
import AnalysisTimeline from '@/components/AnalysisTimeline.vue'

const { data, isError, isNoData, isLoading } = defineProps<{
  data: ITimeLineData | null
  isError: boolean
  isNoData: boolean
  isLoading: boolean
}>()

const timeline = ref<InstanceType<typeof AnalysisTimeline> | null>(null)

watch(
  () => data,
  (newData) => {
    if (newData && timeline.value) {
      timeline.value.draw(newData)
    }
  },
)

onMounted(() => {
  if (data && timeline.value) {
    timeline.value.draw(data)
  }
})
</script>

<template>
  <v-card width="100%" min-height="400" class="pa-4">
    <AnalysisTimeline ref="timeline" :class="[isError || isNoData || isLoading ? 'd-none' : '']" />
  </v-card>
</template>
