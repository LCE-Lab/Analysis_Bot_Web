<script setup lang="ts">
const {
  guildId: existingGuildId,
  type: existingSearchType,
  start: existingStart,
  end: existingEnd,
} = defineProps<{
  guildId?: string | null
  type?: string | null
  start?: string | null
  end?: string | null
}>()

const router = useRouter()

const guildId = ref(existingGuildId ?? '')
const searchType = ref(existingSearchType ?? 'today')

const existingDateRange = () => {
  if (existingStart && existingEnd) {
    // Fill with dates between start and end
    const dates: Date[] = []
    for (
      let d = new Date(parseInt(existingStart) * 1000);
      d <= new Date(parseInt(existingEnd) * 1000);
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(new Date(d))
    }
    dates.push(new Date(parseInt(existingEnd) * 1000))
    return dates
  }
  return null
}

const getFinalRange = () => {
  if (dateRange.value && dateRange.value.length > 0) {
    const finalRange = [...dateRange.value].sort((a: Date, b: Date) => a.getTime() - b.getTime())
    return {
      start: Math.floor(finalRange[0].getTime() / 1000).toString(),
      end: Math.floor(finalRange[finalRange.length - 1].getTime() / 1000).toString(),
    }
  }
  return null
}

const isDirty = computed(() => {
  const finalRange = getFinalRange()
  return (
    guildId.value !== existingGuildId ||
    searchType.value !== existingSearchType ||
    (finalRange &&
      existingStart &&
      existingEnd &&
      (finalRange.start !== existingStart || finalRange.end !== existingEnd))
  )
})

const dateRange = shallowRef<Date[] | null>(existingDateRange() ?? null)
const helpDialog = ref(false)

const rules = {
  required: (value: string) => !!value || 'Field is required',
  dateRange: (value: Date[] | null) =>
    searchType.value === 'custom' && (!value || value.length === 0)
      ? 'You selected custom, date range is required'
      : true,
}

const onSubmit = () => {
  if (guildId.value) {
    switch (searchType.value) {
      case 'day':
        router.push({ name: '/day/[id]', params: { id: guildId.value } })
        break
      case 'week':
        router.push({ name: '/week/[id]', params: { id: guildId.value } })
        break
      case 'custom':
        const finalRange = getFinalRange()
        if (finalRange) {
          router.push({
            name: '/custom/[id]',
            params: { id: guildId.value },
            query: {
              start: finalRange.start,
              end: finalRange.end,
            },
          })
        }
        break
    }
  }
}
</script>

<template>
  <v-form
    @submit.prevent
    @submit="onSubmit"
    class="d-flex flex-column align-center ga-4 w-100"
    style="max-width: 900px"
  >
    <v-text-field
      v-model="guildId"
      :rules="[rules.required]"
      append-inner-icon="mdi-help-circle-outline"
      @click:append-inner="helpDialog = true"
      label="Server ID"
      class="w-100"
      clearable
    ></v-text-field>
    <v-btn-toggle v-model="searchType" mandatory>
      <v-btn value="day" prepend-icon="mdi-calendar-today"> Today </v-btn>
      <v-btn value="week" prepend-icon="mdi-calendar-week"> This Week </v-btn>
      <v-btn value="custom" prepend-icon="mdi-calendar-range"> Custom </v-btn>
    </v-btn-toggle>
    <v-date-input
      v-model="dateRange"
      :disabled="searchType !== 'custom'"
      :rules="[rules.dateRange]"
      label="Select range"
      prepend-icon=""
      prepend-inner-icon="$calendar"
      multiple="range"
      input-format="yyyy/mm/dd"
      :max="new Date()"
      mobile-breakpoint="md"
      class="w-100"
      clearable
    ></v-date-input>
    <v-btn
      :disabled="
        (guildId ?? '').length === 0 ||
        !isDirty ||
        (searchType === 'custom' && (dateRange === null || dateRange.length === 0))
      "
      prepend-icon="mdi-magnify"
      class="mt-2"
      type="submit"
      >Search</v-btn
    >
  </v-form>
  <v-dialog v-model="helpDialog" max-width="1440">
    <v-card prepend-icon="mdi-help-circle-outline" title="How to get the Server ID">
      <div class="px-4">
        <HelpDialog />
      </div>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Close" @click="helpDialog = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
