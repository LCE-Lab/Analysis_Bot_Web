<script setup lang="ts">
import { Timeline } from 'vis-timeline/peer'
import { DataSet } from 'vis-data/peer'
import type { ITimeLineData } from '@/api/query'

const visualization = ref<HTMLElement | null>(null)
const chart = ref<Timeline | null>(null)

const draw = (data: ITimeLineData) => {
  const container = visualization.value

  if (!container) return

  const groups = new DataSet(data.groups)
  const items = new DataSet(data.dataSets)

  const options = {
    max: data.properties.endTime,
    min: data.properties.startTime,
    tooltip: {
      followMouse: true,
    },
    stack: false,
    locale: 'en_US',
  }

  chart.value = new Timeline(container, items, groups, options)
}
const destroy = () => {
  if (chart.value) {
    chart.value.destroy()
    chart.value = null
  }
}

defineExpose({
  draw,
  destroy,
})
</script>

<template>
  <div ref="visualization" id="visualization" />
</template>

<style lang="sass">
@use "../../styles/vis_timeline/vis_timeline_graph2d"
@use "../../styles/vis_timeline/vis_items"
</style>
