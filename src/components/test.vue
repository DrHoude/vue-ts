<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0,
      message: 'mess on hover',
      seen: false,
      todos: [
        {text: 'first item'},
        {text: 'second item'},
        {text: 'third item'}
      ],
      text: 'text for button',
      msg: '',
      obj: {
        title: 'Title',
        style: {
            width: '100px'
        }
      }
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event listeners in templates.
  methods: {
    increment() {
      this.count++
    },
    changeText() {
        this.text = 'text'
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button v-on:click="increment">Count is: {{ count }}</button>

  <div :title="message" style="width: '100px'"> hover</div>
  <div :title="obj.title" :style="obj.title"> hover</div>
  <div v-bind="obj"> hover</div>

  <div v-if = "seen">seen msg</div>

  <div v-for="todo in todos">{{todo.text}}</div>

  <div>
    <p>{{text}}</p>
    <button @click="changeText">click for change text</button>
  </div>


  <div>
    <p>{{msg}}</p>
    <input v-model="msg">
  </div>
  
</template>