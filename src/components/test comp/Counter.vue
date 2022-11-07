<template> 
    <button type="button" @click="increment">count is {{ count }}</button>
</template>
<script lang="ts">
export default {
    props: {
        initValue: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {count: -1 }
    },
    beforeMount() {
        this.count = this.initValue
    },
    emits: ['update:value'],
    methods: {
        increment() {
            this.count += 2
            this.$emit('update:value', this.count)
        }
    }
}
</script>
