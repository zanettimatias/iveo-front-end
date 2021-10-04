import Vue from 'nativescript-vue'
import YoonitCamera from '@yoonit/nativescript-camera/vue'  
  
Vue.use(YoonitCamera)  

import Home from '@/components/Home'
import Match from '@/components/Match'
import AddNewCamera from '@/components/AddNewCamera'
import YooCameraExample from '@/components/YooCameraExample'

import UploadFileTest from '@/components/UploadFileTest'


new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()