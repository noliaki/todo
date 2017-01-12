import dispatcher from './EventEmitter'

export default class Store extends dispatcher {
  constructor (dispatcher) {
    super()

    this.projects = []
    this.tasks = []
    this.newProject = null
    this.newTask = null

    dispatcher.on("createNewProject", this.createNewProject.bind(this))
    dispatcher.on("createNewTask", this.createNewProject.bind(this))
  }

  getProjects () {
    return this.projects
  }

  addProject (newProject) {
    this.projects.push(newProject)
  }

  createNewProject () {
    const date = new Date()

    this.newProject = {
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

  createNewTask () {
    const date = new Date()

    this.newTask = {
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
