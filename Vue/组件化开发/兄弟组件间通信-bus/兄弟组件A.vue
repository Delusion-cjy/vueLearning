<template>
  <div>
    这是一个B组件
  </div>
</template>

<script>
import bus from './bus'
export default {
  data () {
    return {}
  },
  methods:{
    showMsg (msg) {　
　　　　console.log('msg', msg)
　　}
  },
  created () {
    bus.$on('getMessage', this.showMsg ) 
  },
  beforDestory () {
　　this.$off('getMessage', this.showMsg)
  }
} 

</script>