<script setup lang="ts">
import {ref, watch} from 'vue'

import type { Ref } from 'vue'
import { computed } from '@vue/reactivity';

const count = ref(0)
const title = ref('list of products')
const placeholder = ref('some text')
let inputValue = ref('value')

let arr : Ref<Array<any>> = ref([1,2,3,4,5,6]) 

  const arr2 = computed(()=>{
    return arr.value.filter(item => item % 2 == 0)
    
  })

let obj = ref({
  name: 'john',
  age : 22
})



  
const addListElement = (()=> {
  arr.value.push(inputValue.value)
  inputValue.value = ''
})

function removeEl(index: number) {
  arr.value.splice(index,1)
}

function checkArr() {
  if (arr.value.length != 0) {
    return true
  }
}

function changeText(item: any) {
  return item.toString().toUpperCase()
}


const  multLength = computed(()=> {
  return arr.value.length * 2 
})

watch(() => inputValue.value, value => {
  if(value.length > 5) {
    inputValue.value = ''

  }

})

</script>

<template>
  <div>count {{count}}</div>

  <div><button v-on:click="count++">up</button></div>
  <div><button></button>down</div>

  <h1 :style="{color: 'red'}">Title</h1>

  <div class="from-control">
    <p>{{title}}</p>
    <input type="text" 
        v-bind:placeholder="placeholder" 
        v-model="inputValue"
        v-on:keypress.enter="addListElement">

    <p>{{inputValue}}</p>
  </div>

  <button v-on:click="addListElement">add</button>

  <ul v-if="checkArr()">
    <li class="list" v-for="(el,index) in arr">

    <!--<span :class="arr.length < 2 ? 'first': 'second'">{{changeText(el)}}</span>
    <span :class="{
      'first' : true,
      'second' : arr.length > 5
    }"-->
    <span :class="['first', {'second': arr.length > 5}]">{{changeText(el)}}</span>


    <button class="btn" v-on:click="removeEl(index)"> delete </button>
    </li>
  </ul>

  <div v-else>add some in list</div>

  <p>total : {{arr.length}} multiply 2: {{multLength}}</p>


  <ul class="list">
    <!--<li class="list-item" v-for="(item,i) in arr" @click="arr.splice(i,1)" :key="item"> {{item}}
    <input type="text" @click.stop></li>-->
    <li v-for="item in arr2">{{item}}</li>

  </ul>

  <ul>
   
  </ul>

 

</template>

<style scoped>
.first {
  font-size: 20px;
}

.second {
  font-size: 40px;
}
</style>