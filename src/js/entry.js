/* globals window */
import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

import Project from './project'
import Task from './task'

import { Store } from './Store'

const storageName = 'todo'

class TodoApp extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      projects: Store.getProjects(),
      tasks: Store.getTasks(),
      searchText: ''
    }
  }

  componentDidMount () {
    const tasks = _.compact(JSON.parse(window.localStorage.getItem(storageName)))
    if (!tasks || !tasks.length) return
    this.setState({
      tasks
    })
  }

  save () {
    window.localStorage.setItem(storageName, JSON.stringify(this.state.tasks))
  }

  addNewTask (newTask) {
    this.state.tasks.push(newTask)
    this.save()
  }

  addNewProject (newProject) {
    this.state.project.push(newProject)
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
    const targetTask = tasks.find(task => task && task.id === id)
    targetTask.done = !targetTask.done
    this.setState({
      tasks
    })
    this.save()
  }

  onDoneProject (id) {
    const projects = this.state.projects
    const targetProject = projects.find(project => project && project.id === id)
    targetProject.done = !targetProject.done
    this.setState({
      projects
    })
    this.save()
  }

  onDeleteTask (id) {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== id)
    })
    this.save()
  }

  onDeleteProject (id) {
    this.setState({
      projects: this.state.projects.filter(project => project.id !== id)
    })
    this.save()
  }

  render () {
    return (
      <div id='todo'>
        <div id='task'>
          <Task
            tasks = { this.state.tasks }
            searchText = { this.state.searchText }
            addNewTask = { (newTask) => this.addNewTask(newTask) }
            onDoneTask = { (id) => this.onDoneTask(id) }
            onDeleteTask = { (id) => this.onDeleteTask(id) }
            projects = { this.state.projects } />
        </div>
        <div id='project'>
          <Project
            projects = { this.state.projects }
            searchText = { this.state.searchText }
            addNewProject = { (newTask) => this.addNewProject(newTask) }
            onDoneProject = { (id) => this.onDoneProject(id) }
            onDeleteProject = { (id) => this.onDeleteProject(id) } />
        </div>
      </div>
    )
  }
}

ReactDOM.render (
  <TodoApp />,
  window.document.getElementById('todo')
)
