import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [
      {
        id: 1,
        name: '牛乳を買う',
        done: false
      },
      {
        id: 2,
        name: 'Vue.jsの本を買う',
        done: true
      }
    ],

    // 次に追加するタスクのID
    nextTaskId: 3
  },

  mutations: {
    addTask (state, { name }) {
      state.tasks.push({
        id: state.nextTaskId,
        name,
        done: false
      })

      state.nextTaskId++
    },

    toggleTaskStatus (state, { id }) {
      const filtered = state.tasks.filter(task => {
        return task.id === id
      })

      filtered.forEach(task => {
        task.done = !task.done
      })
    }
  }
})
