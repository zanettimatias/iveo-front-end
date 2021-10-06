import Vue from 'nativescript-vue'
import YoonitCamera from '@yoonit/nativescript-camera/vue'

Vue.use(YoonitCamera)
import SignIn from "@/components/SignIn"
import Store from "@/utils/Store"

new Vue({
  render: (h) => h('frame', [h(SignIn)]),
  store: Store
}).$start()