<script setup lang="ts">
import type { ITimeLineData } from '@/api/query'
import AnalysisTimeline from '@/components/AnalysisTimeline.vue'

const { data, isError, isNoData, isLoading, guildId } = defineProps<{
  data: ITimeLineData | null
  isError: boolean
  isNoData: boolean
  isLoading: boolean
  guildId: string | null
}>()

defineEmits<{
  (e: 'refresh'): void
}>()

const timeline = ref<InstanceType<typeof AnalysisTimeline> | null>(null)

watch(
  () => data,
  (newData) => {
    timeline.value?.destroy()
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
  <v-card
    width="100%"
    :loading="isLoading"
    :title="isError || isNoData || isLoading ? 'Loading...' : 'Voice Online Timeline'"
    :subtitle="isError || isNoData || isLoading || !guildId ? '' : `Guild ID: ${guildId}`"
    min-height="400"
    class="pa-4"
    :class="[
      isError || isNoData || isLoading ? 'd-flex flex-column align-center justify-center' : '',
    ]"
  >
    <template v-slot:append>
      <v-btn
        v-if="!isError && !isLoading && !isNoData"
        icon="mdi-refresh"
        @click="$emit('refresh')"
      />
    </template>
    <AnalysisTimeline ref="timeline" :class="[isError || isNoData || isLoading ? 'd-none' : '']" />
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="primary"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-empty-state
      v-if="isError"
      headline="Whoops, Something went wrong"
      title="Error occurred"
      text="Something went wrong, check your input or contact developer."
      icon="mdi-alert-circle"
      action-text="Try again"
      @click:action="$emit('refresh')"
    ></v-empty-state>
    <v-empty-state
      v-if="isNoData"
      headline="No Data"
      title="Check back later."
      text="No data available in the selected range, try again later or check your input."
      action-text="Refresh"
      @click:action="$emit('refresh')"
    ></v-empty-state>
  </v-card>
</template>
