<template>
  <div>
    这是一个A组件
    <button @click="clickEve">点击</button>
  </div>
</template>

<script>
import bus from './bus'
export default {
  data () {
    return {}
  },
  methods: {
    clickEve () {
      bus.$emit('getMessage', 'qqqq')
    }
  }
}
</script>