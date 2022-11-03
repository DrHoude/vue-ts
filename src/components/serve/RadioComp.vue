<script setup lang="ts">

import { stringifyStyle } from '@vue/shared';
import { ref,watch } from 'vue'

const props = defineProps({
    theme: String,
    option1: String,
    option2: String
})

const picked = ref('');

// watch(picked, ()=> {
//   if (picked.value === "Light") {
//     document.body.style.backgroundColor="aliceblue"
//   } else {
//     document.body.style.backgroundColor="lightgray"
//   }
//  })


</script>

<template>

  <div @change="$emit('radio-click', $event)">

    <div>{{theme}}</div>

    <input type="radio" id="1" v-model = "picked"/>
    <label for="1">{{option1}}</label>

    <input type="radio" id="1" v-model = "picked"/>
    <label for="1">{{option2}}</label>

  </div>


</template>