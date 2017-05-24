import Vue from 'vue'
import VueRouter from 'vue-router'
import ComponentView from './views/component'

Vue.use(VueRouter)

const lastComponent = localStorage.getItem('component') || 'install'
const routes = [
  { path: '/', redirect: `/component/${lastComponent}` },
  { path: '/component', component: ComponentView,
    children: [
      { path: '', redirect: 'install' },
      { path: ':name', component: ComponentView }
    ]
  },
  { path: '*', redirect: '/' }
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    if (to.hash) {
      position.selector = to.hash
    } else {
      position = { x: 0, y: 0 }
    }
    // console.log('scrollBehavior', to, position)
    return position
  }
}

const router = new VueRouter({
  base: '/',
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('beforeEach', from, to)
  next()
})
router.afterEach(route => {
  // console.log('afterEach', route)
})

export default router
