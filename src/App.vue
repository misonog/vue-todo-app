<template>
  <div>
    <h1>タスク一覧</h1>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input type="checkbox" v-bind:checked="task.done">
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  }
}
</script>
