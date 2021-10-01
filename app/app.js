import Vue from 'nativescript-vue'
import YoonitCamera from '@yoonit/nativescript-camera/vue'  
  
Vue.use(YoonitCamera)  

import Home from '@/components/Home'
import Match from '@/components/Match'
import YooCameraExample from '@/components/YooCameraExample'


new Vue({
  render: (h) => h('frame', [h(Match)]),
}).$start()