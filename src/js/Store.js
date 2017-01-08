
export default class Store {
  constructor () {
    this.projects = []
    this.tasks = []
  }

  getProjects () {
    return this.projects
  }

  addProject (newProject) {
    this.projects.push(newProject)
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

  doneTask (id) {
    this.tasks.find( task => task.id === id ).done = true
  }
}
