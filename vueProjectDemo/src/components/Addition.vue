<template>
  <div>
      <!-- <h3>当前最新的count值为: {{$store.state.count}}</h3> -->
      <h3>{{$store.getters.showNum}}</h3>
      <button @click="btnHandler1">+1</button>
      <button @click="btnHandler2">+N</button>
      <button @click="btnHandler3">+1 Async</button>
      <button @click="btnHandler4">+N Async</button>


      <!-- 从vuex获取值的方法
      2、this.$store.state.变量名  -->
  </div>
</template>
<script>
// import mapMutations from 'vuex'
 export default{
   data () {
     return {
       
     }
   },
   methods: {
    //  commit的作用就是调用某个mutation中的函数
     btnHandler1() {
      //  this.$store.state.count ++ 不推荐这种方法
      // 使用store中的mutation中定义的方法，通过mutation来改变数据
      this.$store.commit('add') 
      // 可以往mutation中传参
      // addN是函数名，3为多传入的参数值
      // this.$store.commit('addN',3) 
     },
    btnHandler2() {
      // 可以往mutation中传参
      // addN是函数名，3为多传入的参数值
      this.$store.commit('addN',3) 
     },
     // 异步+1
    btnHandler3() {
       //这里的dispatch专门用来触发action
       this.$store.dispatch('addAsync')
     },
    btnHandler4() {
       //这里的dispatch专门用来触发action
       this.$store.dispatch('addNAsync',3)
     }
   }
 }
</script>
<style lang='stylus' rel='stylesheet/stylus'>
</style>