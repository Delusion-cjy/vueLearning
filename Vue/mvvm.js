class MVVM {
    constructor(options) {
      this.$el = options.el
      this.$data = options.data
      // 如果有要编译的模板 =>编译
      if(this.$el) {
        // 将文本+元素模板进行编译
        new Compile(this.$el, this)
      }
    }
  }
  /*创建一个MVVM类
    constructor 是一种用于创建和初始化class创建的对象的特殊方法。
    用constructor方法创建和初始化MVVM类创建的对象
    在对象中传入options并将el和data属性赋值给mvvm的私有变量中
    如果私有变量不为false
    则将el和mvvm传入，创建一个Compile对象   
  */