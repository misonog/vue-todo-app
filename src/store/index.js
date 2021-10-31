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
    },

    deleteTask (state, { id }) {
      const index = state.tasks.findIndex(task => task.id === id)
      state.tasks.splice(index, 1)
    },

    restore (state, { tasks, nextTaskId }) {
      state.tasks = tasks
      state.nextTaskId = nextTaskId
    }
  },

  actions: {
    // ローカルストレージにステートを保存する
    save ({ state }) {
      const data = {
        tasks: state.tasks,
        nextTaskId: state.nextTaskId
      }
      localStorage.setItem('task-app-data', JSON.stringify(data))
    },

    // ローカルストレージからステートを復元する
    restore ({ commit }) {
      const data = localStorage.getItem('task-app-data')
      if (data) {
        commit('restore', JSON.parse(data))
      }
    }
  }
})
