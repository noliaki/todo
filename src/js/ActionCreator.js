export default class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher
  }
  // "Emit" event ----> Store
  addNewProject(data) {
    this.dispatcher.emit("addNewProject", data)
  }
  addNewTask(data) {
    this.dispatcher.emit("addNewTask", data)
  }
  createNewProject() {
    this.dispatcher.emit("createNewProject")
  }
  createNewTask() {
    this.dispatcher.emit("createNewTask")
  }
}
