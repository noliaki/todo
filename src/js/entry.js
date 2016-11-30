import React from 'react'
import ReactDOM from 'react-dom'
import Project from './project'
import Task from './task'

import {projects, tasks} from './initial-state'

const storageName = 'todo'

class TodoApp extends React.Component {
  constructor (props) {
    super (props)
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
    this.state.tasks.push(newTask)
    this.save()
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

  onDeleteTask (id) {
    const tasks = this.state.tasks
    const targetTask = tasks.find(task => task.id === id)
    targetTask.deleteDate = new Date().getTime()
    this.setState({
      tasks
    })
    this.save()
  }

  render () {
    return (
      <Task tasks = { this.state.tasks }
        searchText = { this.state.searchText }
        addNewTask = { (newTask) => this.addNewTask(newTask) }
        onDoneTask = { (id) => this.onDoneTask(id) }
        onDeleteTask = { (id) => this.onDeleteTask(id) }
      />
    )
  }
}

ReactDOM.render (
  <TodoApp />,
  document.getElementById('todo')
)
