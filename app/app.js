import Vue from 'nativescript-vue'
import YoonitCamera from '@yoonit/nativescript-camera/vue'  
  
Vue.use(YoonitCamera)  

import Home from '@/components/Home'
import Match from '@/components/Match'

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()
