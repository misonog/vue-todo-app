<template>
  <div>
    <h1>タスク一覧</h1>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input type="checkbox" v-bind:checked="task.done" v-on:change="toggleTaskStatus(task)">
        <span v-if="!task.editable">{{ task.name }}</span>
        <input v-else type="text" v-model="task.name">
        <button v-if="!task.editable" type="button" v-on:click="makeEditable(task)">編集</button>
        <button v-else type="button" v-on:click="updateTask(task)">更新</button>
        <button type="button" v-on:click="deleteTask(task)">削除</button>
      </li>
    </ul>

    <form v-on:submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="新しいタスク">
    </form>

    <h1>保存と復元</h1>
    <button type="button" v-on:click="save">保存</button>
    <button type="button" v-on:click="restore">復元</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      newTaskName: ''
    }
  },

  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  },

  methods: {
    addTask () {
      this.$store.commit('addTask', {
        name: this.newTaskName
      })
      this.newTaskName = ''
    },

    toggleTaskStatus (task) {
      this.$store.commit('toggleTaskStatus', {
        id: task.id
      })
    },

    makeEditable (task) {
      this.$store.commit('makeEditable', {
        id: task.id
      })
    },

    updateTask (task) {
      this.$store.commit('updateTask', {
        task: task
      })
    },

    deleteTask (task) {
      this.$store.commit('deleteTask', {
        id: task.id
      })
    },

    save () {
      this.$store.dispatch('save')
    },

    restore () {
      this.$store.dispatch('restore')
    }
  }
}
</script>
