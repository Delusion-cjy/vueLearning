// compile.js
class Compile {
    constructor(el, vm) {
      // 判断是否是元素节点，是=》取该元素 否=》取文本
      //如果是元素节点，则isElementNode(el)返回1并赋值给el
      this.el = this.isElementNode(el) ? el:document.querySelector(el)
      //将传入的vm赋值给该类的vm
      this.vm = vm
      // 如果这个元素能获取到 我们才开始编译
      if(this.el) {
        // 1. 先把真实DOM移入到内存中 fragment
        let fragment = this.node2fragment(this.el)
        // 2. 编译 =》 在fragment中提取想要的元素节点 v-model 和文本节点
        this.compile(fragment)
        // 3. 把编译好的fragment在放回到页面中
        this.el.appendChild(fragment)
      }
    }
    // 判断是否是元素节点
    isElementNode(node) {
      return node.nodeType === 1
    }
    // 判断name属性中是否包含v-字段，即判断是否是v-指令
    isDirective(name) {
      return name.includes('v-')
    }
    // 将el中的内容全部放到内存中
    node2fragment(el) {
    //createDocumentFragment()方法创建了一虚拟的节点对象，节点对象包含所有的属性和方法
    //let关键字使得变量只在块域中能被访问
      let fragment = document.createDocumentFragment()
      let firstChild
      // 遍历取出firstChild，直到firstChild为空
      //firstChild为el的第一节点
      while (firstChild = el.firstChild) {
      //appendChild()方法将firstChild添加到fragment的末尾
        fragment.appendChild(firstChild)
      }
      return fragment // 内存中的节点
    }
    //编译 =》 提取想要的元素节点 v-model 和文本节点
    compile(fragment) {
      // 需要递归
      //childNodes为该元素子节点的集合
      let childNodes = fragment.childNodes
      //from() 方法用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组
      //我理解为将传入值返回成一个数组
      //forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数
      //即 对数组中的每个元素都调用一次函数
      Array.from(childNodes).forEach(node => {
        // 是元素节点 直接调用文本编译方法 还需要深入递归检查
        //如果childNodes中的节点是元素节点，todo
        if(this.isElementNode(node)) {
          this.compileElement(node)
          // 递归深入查找子节点
          this.compile(node)
        // 是文本节点 直接调用文本编译方法
        } else {
          this.compileText(node)
        }
      })
    }
    // 编译元素方法
    compileElement(node) {
    //将传入的节点属性赋值给attrs
      let attrs = node.attributes
    //把attrs转化成数组，对每个数组元素调用一次箭头函数
      Array.from(attrs).forEach(attr => {
    //对数组中的每个元素都将name属性赋值给attrName变量
        let attrName = attr.name
        // 判断属性名是否包含 v-指令
        //如果属性名中包含v-则返回ture，否则返回false
        if(this.isDirective(attrName)) {
          // 取到v-指令属性中的值（这个就是对应data中的key）
          let expr = attr.value
          // 获取指令类型
          //split()方法通过-把attrName分隔开
          let [,type] = attrName.split('-')
          // node vm.$data expr
          compileUtil[type](node, this.vm, expr)
        }
      })
    }
    // 这里需要编译文本
    compileText(node) {
      //取文本节点中的文本
      let expr = node.textContent
      let reg = /\{\{([^}]+)\}\}/g
      if(reg.test(expr)) {
        // node this.vm.$data text
        compileUtil['text'](node, this.vm, expr)
      }
    }
  }
  // 解析不同指令或者文本编译集合
  const compileUtil = {
    text(node, vm, expr) { // 文本
      let updater = this.updater['textUpdate']
      updater && updater(node, getTextValue(vm, expr))
    },
    model(node, vm, expr){ // 输入框
      let updater = this.updater['modelUpdate']
      updater && updater(node, getValue(vm, expr))
    },
    // 更新函数
    updater: {
      // 文本赋值
      textUpdate(node, value) {
        node.textContent = value
      },
      // 输入框value赋值
      modelUpdate(node, value) {
        node.value = value
      }
    }
  }
  // 辅助 工具 函数
  // 绑定key上对应的值，从vm.$data中取到
  const getValue = (vm, expr) => {
    expr = expr.split('.') // [message, a, b, c]
    return expr.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  }
  // 获取文本编译后的对应的数据
  const getTextValue = (vm, expr) => {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      return getValue(vm, arguments[1])
    })
  }