import React from 'react'
import ReactDOM from 'react-dom'
import Project from './project'
import Task from './task'

import {projects, tasks} from './initial-state'

const storageName = 'todo'

class TodoApp extends React.Component {
  constructor (props) {
    super (props)
    // this.onInput = this.onInput.bind(this)
    const date = new Date()
    this.state = {
      projects,
      tasks,
      searchText: ''
    }
  }

  componentDidMount () {
    const tasks = JSON.parse(window.localStorage.getItem(storageName))
    if (!tasks.length) {
      return
    }
    this.setState({
      tasks: tasks
    })
  }

  save () {
    window.localStorage.setItem(storageName, JSON.stringify(this.state.tasks))
  }

  addNewTask (newTask) {
    console.log(newTask)
    this.state.tasks.push(newTask)
    this.save()
    console.log(this.state.tasks)
  }

  onInput (event) {
    event.preventDefault()
    this.setState({
      searchText: event.currentTarget.value
    })
  }

  onDoneTask (id) {
    const tasks = this.state.tasks
    const targetTask = tasks.find(task => task.id === id)
    targetTask.done = !targetTask.done
    this.setState({
      tasks
    })
    this.save()
  }

  render () {
    return (
      <div>
        <input type = 'input'
          onInput = { (event) => this.onInput(event) }
          value = { this.state.searchText }
        />
        <Task tasks = { this.state.tasks }
          searchText = { this.state.searchText }
          addNewTask = {(newTask) => this.addNewTask(newTask)}
          onDoneTask = {(id) => this.onDoneTask(id)}
        />
      </div>
    )
  }
}

ReactDOM.render (
  <TodoApp />,
  document.getElementById('todo')
)
