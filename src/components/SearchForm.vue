<script setup lang="ts">
const guildId = ref('')
const searchToggle = ref('today')
const dateRange = shallowRef<Date[] | null>(null)

const rules = {
  required: (value: string) => !!value || 'Field is required',
  dateRange: (value: Date[] | null) =>
    searchToggle.value === 'custom' && (!value || value.length === 0)
      ? 'You selected custom, date range is required'
      : true,
}

const onSubmit = () => {
  if (guildId.value) {
    console.info('Searching for guild:', guildId.value, 'with filters:', searchToggle.value)
    if (searchToggle.value === 'custom' && dateRange.value) {
      const finalRange = [...dateRange.value].sort((a: Date, b: Date) => a.getTime() - b.getTime())
      console.info(
        'Custom date range:',
        Math.floor(finalRange[0].getTime() / 1000),
        'to',
        Math.floor(finalRange[finalRange.length - 1].getTime() / 1000),
      )
    }
  }
}
</script>

<template>
  <v-form @submit.prevent @submit="onSubmit" class="d-flex flex-column align-center ga-4 w-100">
    <v-text-field
      v-model="guildId"
      :rules="[rules.required]"
      label="Guild Id"
      class="w-100"
      clearable
    ></v-text-field>
    <v-btn-toggle v-model="searchToggle" mandatory>
      <v-btn value="today" prepend-icon="mdi-calendar-today"> Today </v-btn>
      <v-btn value="this_week" prepend-icon="mdi-calendar-week"> This Week </v-btn>
      <v-btn value="custom" prepend-icon="mdi-calendar-range"> Custom </v-btn>
    </v-btn-toggle>
    <v-date-input
      v-model="dateRange"
      :disabled="searchToggle !== 'custom'"
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
        (searchToggle === 'custom' && (dateRange === null || dateRange.length === 0))
      "
      prepend-icon="mdi-magnify"
      class="mt-2"
      type="submit"
      >Search</v-btn
    >
  </v-form>
</template>
