export default class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  // "Emit" event ----> Store
  addNewProjext(data) {
    this.dispatcher.emit("addNewProjext", data);
  }
  addNewTask(data) {
    this.dispatcher.emit("addNewTask", data);
  }
}
