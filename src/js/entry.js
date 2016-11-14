import React from 'react'
import ReactDOM from 'react-dom'
import Project from './project'
import Task from './task'

import {projects, tasks} from './initial-state'

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

  onInput (event) {
    event.preventDefault()
    this.setState({
      searchText: event.currentTarget.value
    })
  }

  render () {
    return (
      <div>
        <input type = 'input' onInput = { (event) => this.onInput(event) } value = { this.state.searchText } />
        <Task tasks = { this.state.tasks } searchText = { this.state.searchText } />
      </div>
    )
  }
}

ReactDOM.render (
  <TodoApp />,
  document.getElementById('todo')
)
