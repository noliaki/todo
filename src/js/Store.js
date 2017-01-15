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
    this.emit('ADD_NEW_PROJECT')
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

    this.emit('CREEATE_NEW_PROJECT')
  }

  doneProject (id) {
    this.projects.find( project => project.id === id ).done = true
    this.emit('DONE_PROJECT')
  }

  getTasks () {
    return this.tasks
  }

  addNewTask (newTask) {
    this.tasks.push(newTask)
    this.emit('ADD_NEW_TASK')
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

    this.emit('CREEATE_NEW_TASK')
  }

  doneTask (id) {
    this.tasks.find( task => task.id === id ).done = true
    this.emit('DONE_TASK')
  }
}
