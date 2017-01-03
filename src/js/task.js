import React from "react"
import ReactDOM from "react-dom"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import _ from 'lodash'

import TaskList from './task-list'
import TaskAction from './task-action'
import TaskForm from './task-form'

export default class Task extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      newTask: null,
      seekWord: '',
      sort: 'newer',
      sortOption: [
        'newer',
        'older'
      ],
      filter: 'no filter',
      filterOption: [
        'no filter',
        'active',
        'done'
      ]
    }
  }

  addNewTask (event) {
    event.preventDefault()
    this.props.addNewTask(this.state.newTask)
    this.setState({
      newTask: null
    })
  }

  cancelNewTask (event) {
    event.preventDefault()
    this.setState({
      newTask: null
    })
  }

  noTask () {
    return !this.props.tasks.length
  }

  createNewTask (event) {
    event.preventDefault()
    const date = new Date()
    const id = this.noTask() ? 0 : _.last(this.props.tasks).id + 1

    this.setState({
      newTask: {
        id,
        name: '',
        description: '',
        createDate: date.getTime(),
        editDate: date.getTime(),
        done: false,
        projects: []
      }
    })
  }

  onInputSeekWord (seekWord) {
    this.setState({
      seekWord: seekWord
    })
  }

  onInputNewTaskName (taskName) {
    this.setState({
      newTask: Object.assign(this.state.newTask, {
        name: taskName
      })
    })
  }

  onInputNewTaskDescription (taskDescription) {
    this.setState({
      newTask: Object.assign(this.state.newTask, {
        description: taskDescription
      })
    })
  }

  isEditing () {
    return this.state.newtask
  }

  canAddNewTask () {
    return this.state.newTask && this.state.newTask.name
  }

  // sort
  newerTasks () {
    return _.sortBy(this.props.tasks, task => -task.createDate)
  }

  olderTasks () {
    return _.sortBy(this.props.tasks, 'createDate')
  }


  sortedTasks () {
    switch (this.state.sort) {
      case 'newer' :
        return this.newerTasks()
      case 'older' :
        return this.olderTasks()
      default:
        return this.newerTasks()
    }
  }

  filterTask (task) {
    switch (this.state.filter) {
      case 'active' :
        return !task.done
      case 'done' :
        return task.done
      default:
        return task
    }
  }

  filteredData () {
    if ( !this.state.seekWord ) {
      return this.sortedTasks().filter(task => this.filterTask(task))
    }

    return this.sortedTasks().filter(task => this.filterTask(task)).filter((task) => {
      return (task.name.indexOf(this.state.seekWord) > -1 || task.description.indexOf(this.state.seekWord) > -1)
    })
  }

  onChangeSort (sortName) {
    this.setState({
      sort: sortName
    })
  }

  onChangeFilter (filterName) {
    this.setState({
      filter: filterName
    })
  }

  render () {

    const taskForm = <TaskForm
        newTask = {this.state.newTask}
        onInputNewTaskName = {(taskName) => this.onInputNewTaskName(taskName)}
        onInputNewTaskDescription = {(taskDescription) => this.onInputNewTaskDescription(taskDescription)}
        projects = { this.props.projects }/>

    return (
      <div className='todo-tasks'>
        <div className='new-container'>
          { this.state.newTask ? taskForm : '' }
          <div className='new-task--action'>
            <a href='#add-new-task'
              className={`btn btn-add is-available`}
              onClick={ (event) => this.canAddNewTask() ? this.addNewTask(event) : this.createNewTask(event) }>
              <i className='fa fa-plus mr-10' aria-hidden='true'></i>
              {this.isEditing() ? 'submit new task' : 'add new task'}
            </a>
            {
              this.isEditing() ?
              <a href='#cancel' className='btn btn-cancel ml-15' onClick={ (event) => this.cancelNewTask(event) }>
                <i className='fa fa-ban mr-10' aria-hidden='true'></i>
                cancel
              </a>
              :
              ''
            }
          </div>
        </div>
        <TaskAction
          currentSort = { this.state.sort }
          sortOption = { this.state.sortOption }
          onChangeSort = { sortName => this.onChangeSort(sortName) }
          currentFilter = { this.state.filter }
          filterOption = { this.state.filterOption }
          onChangeFilter = { filterName => this.onChangeFilter(filterName) }
          seekWord = { this.state.seekWord }
          onInputSeekWord = { seekWord => this.onInputSeekWord(seekWord) }/>
        <ReactCSSTransitionGroup
          component="ul"
          className='list-container'
          transitionName="list"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={500}>
          { this.filteredData().map((task, index) => <TaskList key = {task.id} task = {task} index = {index} deleteTask = {(taskId) => this.props.onDeleteTask(taskId)} onDoneTask = {() => this.onDoneTask()} />) }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
