import Dispatcher from './EventEmitter'

class Store extends Dispatcher {
  constructor () {
    super()

    this.projects = []
    this.tasks = []
  }

  getProjects () {
    return this.projects
  }

  addNewProject (newProject) {
    newProject.id = Math.max(...(this.projects.map(project => {
      return project.id
    }))) + 1
    this.projects.push(newProject)
  }

  createNewProject () {
    const date = new Date()

    return {
      id: '',
      name: '',
      description: '',
      createDate: date.getTime(),
      editDate: date.getTime(),
      done: false
    }
  }

  doneProject (id) {
    this.projects.find( project => project.id === id ).done = true
  }

  getTasks () {
    return this.tasks
  }

  addNewTask (newTask) {
    newTask.id = Math.max(...(this.tasks.map(task => {
      return task.id
    }))) + 1
    this.tasks.push(newTask)
    this.emit('onChangeTasks')
  }

  createNewTask () {
    const date = new Date()

    return {
      id: '',
      name: '',
      description: '',
      createDate: date.getTime(),
      editDate: date.getTime(),
      done: false
    }
  }

  doneTask (id) {
    this.tasks.find( task => task.id === id ).done = true
  }
}

export default new Store()
