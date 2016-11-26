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
    console.log(tasks)
    if (!tasks.length) {
      return
    }
    console.log('run')
    tasks.forEach((task) => {
      task.createDate = new Date(Date.parse(task.createDate))
      task.editDate = new Date(Date.parse(task.editDate))
      task.deleteDate = task.deleteDate ? new Date(Date.parse(task.deleteDate)) : null
    })
    this.setState({
      tasks: tasks
    })
  }

  addNewTask (newTask) {
    this.state.tasks.push(newTask)
    console.log(this.state.tasks)
    window.localStorage.setItem(storageName, JSON.stringify(this.state.tasks))
  }

  onInput (event) {
    event.preventDefault()
    this.setState({
      searchText: event.currentTarget.value
    })
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
        />
      </div>
    )
  }
}

ReactDOM.render (
  <TodoApp />,
  document.getElementById('todo')
)
