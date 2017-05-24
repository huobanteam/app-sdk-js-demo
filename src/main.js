import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import App from './App'
import DemoBlock from './components/demo-block'

Vue.use(ElementUI)
Vue.component('demo-block', DemoBlock)

new Vue({ // eslint-disable-line
  render: h => h(App),
  router
}).$mount('#app');
