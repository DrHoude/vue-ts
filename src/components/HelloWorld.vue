<script setup lang="ts">
import { ref, computed } from 'vue'
import Counter from './Counter.vue'

defineProps<{ msg: string }>()

const c1 = ref(0)
const c2 = ref(5)
const c3 = ref(10)
const total = computed(() => c1.value + c2.value + c3.value )
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <Counter :init-value="c1" @update:value="val => c1 = val"/>
    <Counter :init-value="c2" @update:value="val => c2 = val"/>
    <Counter :init-value="c3" @update:value="val => c3 = val"/>
     Sum of counters is: {{ total }}
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

div {
  background-color: pink;
}
</style>
