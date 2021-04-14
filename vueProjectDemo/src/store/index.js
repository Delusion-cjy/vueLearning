import { createStore } from 'vuex'

export default createStore({
  // 注意要点
  // 1、state和gutters在作为组件引入的时候，展开放置在computed中，除非使用 this.$store.state.变量名/this.$store.gutters.变量名
  // 2、只有mutations可以改变state中的数据，actions通过调用mutations中的方法异步改变数据
  // 3、mutations中的方法可以直接用this.$store.commit('方法名',传入参数)调用，也可以用组件方式引入，然后在methods中用展开符展开
  // 4、actions中的方法可以直接用this.$store.dispatch('方法名',传入参数)调用，也可以用组件方式引入，然后在methods中用展开符展开
  // 5、异步方法需要放到actions中调用

  // 相当于公共的数据仓库，存储公共数据
  state: {
    count:0,
    data1:'',
    data2:'',
    data3:'',
    data4:'',
  },

  //相当于在仓库中的操作臂，用来修改仓库中的数据
  // 只有mutations中定义的函数才能修改state中的数据
  mutations: {
    add(state) {
      // 变更状态
      state.count++;
    },
    addN(state,step) {
      state.count += step;
    },
    sub(state) {
      state.count --;
    },
    subN(state , step) {
      state.count -= step;
    }
  },
  
  // 通过异步操作机械臂来改变store中的数据
  actions: {
    //context 可以看做store实例对象
    addAsync(context) {
      setTimeout(() => {
        // 在action中不能直接修改state中的数据，
        // 必须通过context.commit()触发某个mutations才行
        context.commit('add')
      },1000);
    },
    addNAsync(context , step) {
      setTimeout(() => {
        // 在action中不能直接修改state中的数据，
        // 必须通过context.commit()触发某个mutations才行
        context.commit('addN',step)
      },1000);
    },
    subAsync(context) {
      setTimeout(() => {
        // 在action中不能直接修改state中的数据，
        // 必须通过context.commit()触发某个mutations才行
        context.commit('sub')
      },1000);
    },
    subNAsync(context,step) {
      setTimeout(() => {
        context.commit('subN',step)
      },1000);
    },
  },

  // 将state中的数据进行加工后形成的新的数据，state中的数据改变了getters中的数据也会改变
  getters: {
    showNum(state) {
      return '当前最新的数量是 【' + state.count + '】';
    }
  },
  modules: {
  }
})
