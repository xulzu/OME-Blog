<template>
    <div>
        组件测试{{nowtime}}
        <div>
            插槽测试
            <Content  slot-key='slottest'></Content>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            nowtime:Date.now()
        }
    }
}
</script>