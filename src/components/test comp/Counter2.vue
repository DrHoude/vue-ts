<script setup lang="ts">

import { onBeforeMount, ref } from 'vue'

const count = ref(-1);

const props = defineProps({

    initValue: {
            type: Number,
            default: 0
        }
})

onBeforeMount(()=> count.value = props.initValue)



const emit = defineEmits(['update:value'])

function increment() {
    count.value += 1
    emit('update:value', count.value)

}


</script>

<template>
    <button type="button" @click="increment">count is {{ count }}</button>
</template> 