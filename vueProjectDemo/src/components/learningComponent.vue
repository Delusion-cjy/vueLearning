<template>
  <div>
    <h1>
        store用来存储全局数据
    </h1>
    <div>
    从vuex取值有两种方法
       1、
        a>导入mapState组件
            import {mapState} from 'vuex'
        b>用展开运算符在computed中展开要获取的变量
                computed: {
                    ...mapState(['count'])
                }
                count为要获取的数据
        c>可以直接使用count变量 
        2、
        this.$store.state.变量名 
    </div>
    <h1>
        Mutation 用于变更store中的数据
    </h1>
    <div>
        1、 只能通过mutation变更store数据，不可以直接操作store中的数据
            this.$store.state.count ++ 这种方式不推荐，是错误的
        2、通过mutation变更数据虽然繁琐，但是可以集中监控所有数据的变化
           在store下的index文件中的mutation中定义一个函数，
             mutations: {
                add(state) {
                // 变更状态
                state.count++;
                }
            },
            再在需要用到的地方调用
                 btnHandler1() {
                    // 使用store中的mutation中定义的方法，通过mutation来改变数据
                    this.$store.commit('add') 
                    }
        3、
    //  commit的作用就是调用某个mutation中的函数
    this.$store.commit()是触发mutations的第一种方式

            // 可以往mutation中传参
            // addN是函数名，3为多传入的参数值
            this.$store.commit('addN',3) 

            mutation中的函数声明
            addN(state,step) {
            state.count += step;
            }
        4、
        第二种是在vuex中引入mapMutations
        import {mapMutations} from 'vuex'
        在methods中映射

        methods: {
        ...mapMutations(['sub','subN']),
        btnHandler1() {
            this.sub()
        },
        btnHandler2() {
            <!-- 3是传值 -->
            this.subN(3)
        }      
        }

        5、
            mutations中不能写异步代码
        </div>
        <h1>Action 用于处理异步任务</h1>
        <div>
           1、 如果异步变更数据，就需要用action，在action中触发mutation的方式间接变更数据
            Action不能直接修改state中的数据。需要在action中调用mutations的函数
                addAsync(context) {
                    setTimeout(() => {
                        // 在action中不能直接修改state中的数据，
                        // 必须通过context.commit()触发某个mutations才行
                        context.commit('add')
                    },1000)
                    }
            同时用this.$store.dispatch('方法名')在组件中调用
                 btnHandler3() {
                    //这里的dispatch专门用来触发action
                    this.$store.dispatch('addAsync')
                    }

                也可以引入mapActions进行调用
                在methods中
                ...mapActions(['subAsync','subNAsync']),
                引入后可以直接调用函数

                调用方法1
                this.$store.dispatch('方法名')
                调用方法2
                import {mapActions} from 'vuex'

                methods:{
                  ...mapActions(['subAsync','subNAsync']),
                }
        </div>
        <h1>Gutter</h1>
        <div>
            对store中的数据进行加工形成新的数据
            类似计算属性
            store中的数据变化，getters的数据也变化，且getters不会改变store中的数据

            调用方法
        1、
        a>导入mapGutters组件
            import {mapGutters} from 'vuex'
        b>用展开运算符在computed中展开要获取的变量
                computed: {
                    ...mapGutters(['showNum'])
                }
                showNum为要获取的数据
        c>可以直接使用showNum变量 
        2、
        this.$store.getters.变量名 
        </div>
  </div>
</template>
<script>
 export default{}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
</style>