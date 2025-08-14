---
key: Vue
permalink: /pages/vueUseTips
time: '2021-03-08 16:55:23'
---
# vue使用注意事项及原因

## 在此记录一些vue使用注意事项，以及为何如此的原因
## 1、在v-for中禁止使用random（）和作为key绑定元素。尽量不要使用index作为key

​    这样的原因是在vue的diff算法中，因为生成新dom节点的开销是比复用旧dom节点的开销大的，所以在vue中为了尽可能的复用旧节点。其中的一个策略是通过新旧元素的key来判断旧元素中是否存在和新元素key一样的节点。在源码中表现如下，elmToMove节点就是通过key在旧元素中获取到的一个节点，因此如果更新前后中存在key相同的节点，那么能够做到复用旧节点。但是如果使用随机数作为key来进行for循环的话，那么key每次更新都不一样，复用也就无从谈起。这是十分没有效率的做法。

​    但是为什么也尽量别用index来作为key呢？假设我们数组进行了一个删除操作，那么渲染的数目将会改变，但是对于部分元素的index是不变的，如['a','b','c']对应的索引[0,1,2]。如果我们删除掉'a'.则['b','c']对应的索引为[0,1].从这里我们可以看到。b和c本来可以复用的，但是因为使用索引来作为key，因此会对比旧新 元素 '旧a'->'新b','旧b'->'新c'的内容来进行节点更新。这无疑又会增性能开销，复用不完整

```js
 if (sameVnode(elmToMove, newStartVnode)) {
            /*如果新VNode与得到的有相同key的节点是同一个VNode则进行patchVnode*/
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            /*因为已经patchVnode进去了，所以将这个老节点赋值undefined，之后如果还有新节点与该节点key相同可以检测出来提示已有重复的key*/
            oldCh[idxInOld] = undefined
            /*当有标识位canMove实可以直接插入oldStartVnode对应的真实Dom节点前面*/
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          } else {
            // same key but different element. treat as new element
            /*当新的VNode与找到的同样key的VNode不是sameVNode的时候（比如说tag不一样或者是有不一样type的input标签），创建一个新的节点*/
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          }
```

