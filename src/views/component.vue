<template>
  <component :is="currentView" :applicationId="applicationId" :envData="envData" :client="client"></component>
</template>

<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

import DemoBlock from '../components/demo-block'
import NotFound from '../components/not-found'
import navConfig from '../nav.config.json'

const ComponentsMapping = {
  NotFound,
  DemoBlock
}

let navs = navConfig[0].children.concat(navConfig[1])
navConfig[2].groups.map(group => group.list).forEach(list => {
  navs = navs.concat(list)
})

navs.forEach(nav => {
  if (nav.path && !nav.disabled) {
    const path = nav.path.split('#')[0]
    const component = nav.isComp ? require(`../views${path}.vue`) : require(`../docs${path}.md`)
    ComponentsMapping[path.substring(1)] = component.default || component
  }
})

export default {
  name: 'component',
  components: ComponentsMapping,
  data() {
    return {
      applicationId: 110001,
      envData: null,
      client: null
    }
  },
  computed: {
    currentView() {
      if (this.$route.params.name && ComponentsMapping[this.$route.params.name]) {
        return this.$route.params.name
      }
      return 'not-found'
    }
  },
  watch: {
    '$route.params.name'(val, oldVal) {
      localStorage.setItem('component', val)
    }
  },
  beforeRouteEnter(to, from, next) {
    next()
  },
  beforeRouteLeave(to, from, next) {
    // debugger
  },
  mounted() {
    this.client = HuobanAppSDK.client()
    this.client.init(this.applicationId)
      .then(data => {
        this.envData = data
      }).catch(err => {
        // console.log('非宿主环境, 屏蔽demo演示', err.message)
      })
  },
  updated() {
    this.$el.querySelectorAll('.header-anchor').forEach(a => {
      a.setAttribute('href', a.origin + a.pathname + a.hash)
    })
  }
}
</script>
