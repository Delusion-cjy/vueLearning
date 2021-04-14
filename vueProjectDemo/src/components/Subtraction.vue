<template>
  <div>
      <!-- <h3>当前最新的count值为: {{count}}</!--> -->
      <h3>{{showNum}}</h3>
      <button @click="btnHandler1">-</button>
      <button @click="btnHandler2">-N</button>
      <button @click="subAsync">-1 Async</button>
      <button @click="subNAsync(3)">-N Async</button>
      <!-- 从vuex取值有两种方法 -->
      <!--
         1、
        a>导入mapState组件
            import {mapState} from 'vuex'
        b>用展开运算符在computed中展开要获取的变量
               computed: {
                  ...mapState(['count'])
                }
                count为要获取的数据
        c>可以直接使用count变量 
        2、this.$store.state.变量名 
         -->
  </div>
</template>
<script>
// import { computed } from 'vue'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
 export default{
   data () {
     return {
       
     }
   },
   computed: {
       ...mapState(['count']),
       ...mapGetters(['showNum'])
     },
    methods: {
      ...mapMutations(['sub','subN']),
      // 将全局的subAsync映射到组件中的subAsync函数，可以直接调用
      ...mapActions(['subAsync','subNAsync']),
      btnHandler1() {
        this.sub()
      },
      btnHandler2() {
        this.subN(3)
      },
      // btnHandler3() {
      //   this.subAsync()
      // }    
    }
 }
</script>
