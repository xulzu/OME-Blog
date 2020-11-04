---
time: '2020-11-02 23:35:55'
---

#  Vue中使用v-model指令与.sync修饰符在组件间进行数据的“双向绑定”

## 摘要
> &nbsp;&nbsp;&nbsp;&nbsp;在组件间进行数据的双向绑定能够使得被绑定的数据在某一个组件发生变化时，在其他组件能够同步反映出来。这样不仅能有助于代码的阅读和理解，同时还能使得书写代码用更少的语句。据本人目前的使用经验，存在两种方式可以方便进行组件间的数据进行“双向绑定”。一是使用`v-model`指令搭配上组件内的model属性。二是在调用子组件时使用`.sync`修饰符。这两种方式都是一种**语法糖**。可以理解为这两种方式都是在子组件内绑定的数据发生变化时在子组件中使用`this.$emit('eventName',newVal)`回调了父组件上的`eventName`方法来对父组件中的数据进行修改。  

## 关键词

> v-model, .sync修饰符,双向绑定
## v-model的使用

> &nbsp;&nbsp;&nbsp;&nbsp;在vue中，input,checkbox,select等元素可以使用v-model进行数据的双向绑定。如在`<input>`标签上使用v-model标签。
>
> ```html
> <input type="text" v-model="name"> //v-model形式
> <input type="text" :value="name" @input="name=$event.target.value">//与之等价
> ```
>
> &nbsp;&nbsp;&nbsp;&nbsp;从上面的代码中我们可以看出，v-model指令可以从某种程度上认为和使用两个指令`v-bind`和`v-on` 时是等价的。在使用两个指令时，在所绑定的数据发生变化时，内部通过`this.$emit()`的方式来调用外部的方法对数据进行双向的更改。   在`input`标签中，内部触发的是`this.$emit('input',newval)` 。在不同标签v-model所触发的方法有所差别。借鉴于此，我们可以在组件之间使用v-model，**默认时，v-model会使用组件中的value值和派发组件中input事件**，观察上面使用v-bind和v-on来实现v-model的例子。不难发现子组件中需要通过props接受一个来自父组件的数据进行绑定。同时需要`this.$emit()`来派发某个事件。借助vue组件的[model属性](https://cn.vuejs.org/v2/api/#model) 。可以自定义组件中v-model所绑定的属性以及所要派发的事件。   
>
> 在子组件中
>
> ```js
> //--Son.vue
> model: {
> 		prop: "myval",
> 		event: "modelclick",
> 	   },
> props: { myval: String },
> methods: {
> 		btnClick() {
>            		 //注意这里派发的事件要和model.event一致
> 				this.$emit("modelclick", this.myval);
> 				},
> 	   },
> 
> ```
>
> 这样设置以后，当我们在父组件引用了子组件后。子组件就能够借助`this.$emit("modelclick", this.myval);`同步修改父组件中的v-model所绑定的数据。
>
> ```js
> //Father.vue
> <Son v-model='name' />  //此时父组件中的name就会被双向绑定。
> ```

## .sync 修饰符的使用

> .sync修饰符的理解和v-model类似。不同的地方在于v-model会默认派发‘input’事件。假设在父组件中使用了   `<son  :dialogVisible.sync='dialogVisible'  >`    那么.sync修饰符所派发的是`update:dialogVisible`**("update:"加上v-bind绑定的数据名)**事件 。具体示例如下  ：
>
> ```js
> //father.vue
> <son  :dialogVisible.sync='visible'/>
> <son  :dialogVisible='value'  @update:dialogVisible='v=>dialogVisible=v'/> //与上面等价
> ```
>
> 观察父组件中的.sync修饰符的展开。需要在子组件中通过`this.$emit('update:dialogVisible'，newValue)`派发事件以同步修改修改父组件中的值 .这里我列举一个我常常在使用element-ui时，当子组件中是一个el-dialog时的例子。我普遍用在当点击某个按钮时弹出某个自定义弹窗的场景。
>
> ```vue
> //son.vue
> <template>
> 	<el-dialog
> 		:visible.sync="visible"
> 		width="670px"
> 	>
> 	</el-dialog>
> </template>
> <script>
> export default {
> 	props: {
> 		dialogVisible: {
> 			type: Boolean,
> 			default: false
> 		}
> 	},
> 	computed: {
> 		visible: {
> 			get() {
> 				return this.dialogVisible;
> 			},
> 			set(newval) {
> 				this.$emit("update:dialogVisible", newval);
> 			}
> 		}
> 	}
> }
> ```
>
> 注意到子组件中关于dialogVisible的使用。由于computed中可以设置get和set。因此这里借助get和set将父组件中的dialogVisible和子组件中用来控制dialog显隐的visible进行一个双向绑定。这样我们就不用在父组件上重新定义一个事件来进行派发。 因此当子组件中的弹窗被关闭时，因为visible的改变会触发set。最后触发`				this.$emit("update:dialogVisible", newval);` 来更新父组件上的用来控制子组件显示隐藏的dialogVisible。

