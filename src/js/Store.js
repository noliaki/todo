import dispatcher from './EventEmitter'

export default class Store extends dispatcher {
  constructor () {
    super()
    
    this.projects = []
    this.tasks = []
  }

  getProjects () {
    return this.projects
  }

  addProject (newProject) {
    this.projects.push(newProject)
  }

  newProject () {
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

  addTask (newTask) {
    this.tasks.push(newTask)
  }

  newTask () {
    const date = new Date()

    return {
      id: '',
      name: '',
      description: '',
      createDate: date.getTime(),
      editDate: date.getTime(),
      done: false,
      projects: []
    }
  }

  doneTask (id) {
    this.tasks.find( task => task.id === id ).done = true
  }
}
