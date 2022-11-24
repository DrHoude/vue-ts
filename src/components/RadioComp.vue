<script setup lang="ts">



const props = defineProps({
    
    theme: String,
    name: String,
    value: String,
    options: Array,
})


</script>

<template>    
    <div class="radio-wrapper">
     
    
        <div v-for="option in props.options" >
            <input
            :name="name" type="radio" :checked="props.value === option"  @change="$emit('radio-click', $event)" data-test="inpt"/>
            <label>{{option}}</label>
        </div>
    </div>
  
</template>

<style scoped>

.radio-wrapper {
    display: flex;
}
</style>