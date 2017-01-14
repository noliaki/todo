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
    dispatcher.on("addNewProject", this.addNewProject.bind(this))
    dispatcher.on("addNewTask", this.addNewTask.bind(this))
  }

  getProjects () {
    return this.projects
  }

  addNewProject (newProject) {
    this.projects.push(newProject)
  }

  createNewProject (newProject) {
    const date = new Date()

    this.newProject = Object.assign({
      id: '',
      name: '',
      description: '',
      createDate: date.getTime(),
      editDate: date.getTime(),
      done: false
    }, newProject)
  }

  doneProject (id) {
    this.projects.find( project => project.id === id ).done = true
  }

  getTasks () {
    return this.tasks
  }

  addNewTask (newTask) {
    this.tasks.push(newTask)
  }

  createNewTask (newTask) {
    const date = new Date()

    this.newTask = Object.assign({
      id: '',
      name: '',
      description: '',
      createDate: date.getTime(),
      editDate: date.getTime(),
      done: false
    }, newTask)
  }

  doneTask (id) {
    this.tasks.find( task => task.id === id ).done = true
  }
}
