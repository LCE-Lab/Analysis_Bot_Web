<template lang="pug">
.page-root
  .container(:class="loading? 'transparent':''")
    button.refresh-btn.btn(v-if="!loading" @click="refresh()") Refresh
    loading(v-if="loading")
    error(v-if="error")
    noData(v-if="noData")
    div(v-else="loading || error || noData")
      timeline
  how_to_use(v-if="error || noData")
</template>

<script>
import loading from './loading.vue'
import error from './error.vue'
import noData from './noData.vue'
import timeline from './timeline.vue'
import howToUse from './how_to_use.vue'

export default {
  name: 'container',
  components: { loading, error, noData, timeline, how_to_use: howToUse },
  data () {
    return {
      timeData: null,
      loading: false,
      error: false,
      noData: false
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    serverID: {
      type: String,
      required: true
    },
    start: {
      type: String,
      required: false,
      default: ''
    },
    end: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    async get () {
      this.timeData = null
      this.error = false
      this.noData = false
      this.loading = true
      try {
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('container')
        const headers = { 'g-recaptcha-token': token }

        await this.$axios.get(this.type, this.serverID, this.start, this.end, headers).then(result => {
          const timeData = JSON.parse(result)
          if (!timeData.data) {
            this.noData = true
          } else {
            this.timeData = timeData.data
          }
        })
      } catch (e) {
        console.error(e)
        this.error = true
      }
      this.loading = false
      return this.timeData
    },
    refresh () {
      timeline.methods.destory()
      this.get().then(result => {
        if (result == null) return
        timeline.methods.draw(result)
      })
    }
  },
  created () {
    this.loading = true
    this.get().then(timeResult => {
      if (timeResult == null) return
      timeline.methods.draw(timeResult)
    })
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    $route (to, from) {
      this.refresh()
    }
  }
}
</script>

<style lang="sass">
@import "../assets/sass/components/container"
</style>
