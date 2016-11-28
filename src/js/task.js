import React from "react"
import ReactDOM from "react-dom"

import {weekday} from './utils'

export default class Task extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      newTask: null
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

  insertNewTask (event) {
    event.preventDefault()
    const date = new Date()

    this.setState({
      newTask: {
        id: this.props.tasks.length,
        name: '',
        description: '',
        createDate: date.getTime(),
        editDate: date.getTime(),
        deleteDate: null,
        done: false,
        projects: []
      }
    })
  }

  onInputNewTaskName (event) {
    this.setState({
      newTask: Object.assign(this.state.newTask, {
        name: event.target.value
      })
    })
  }

  onInputNewTaskDescription (event) {
    this.setState({
      newTask: Object.assign(this.state.newTask, {
        description: event.target.value
      })
    })
  }

  hasContent () {
    return this.state.newTask.name
  }

  filteredData () {
    if ( !this.props.searchText ) return this.props.tasks.filter(task => !task.deleteDate)

    return this.props.tasks.filter((task) => {
      return (task.name.indexOf(this.props.searchText) > -1 || task.description.indexOf(this.props.searchText) > -1) && !task.deleteDate
    })
  }

  render () {
    const task = this.filteredData().map((task, index) => {
      const createDate = new Date(task.createDate)
      const editDate = new Date(task.editDate)
      const listClass = [
        'list',
        `list_${index}`,
        `${(index + 1) % 2 === 0? 'even' : ''}`,
        `${task.done ? 'is-done' : ''}`
      ]

      return (
        <li
          className={listClass.filter(item => item).join(' ')}
          key={task.id}
        >
          <div
            className='list--done-toggle'
            onClick={() => this.props.onDoneTask(task.id)}
          >
            { task.done ? <i className='fa fa-check' aria-hidden='true'></i> : '' }
          </div>
          <div className='list--content'>
            <h2 className='list--title'>
              {task.name}
            </h2>
            <div className='list--date'>
              {`${createDate.getFullYear()}/${createDate.getMonth() + 1}/${createDate.getDate()} (${weekday[createDate.getDay()]})`}
              {task.createDate !== task.editDate ? ` | ${editDate.getFullYear()}/${editDate.getMonth() + 1}/${editDate.getDate()} (${weekday[editDate.getDay()]})` : ''}
            </div>
            <p className='list--description'>
              {task.description}
            </p>
          </div>
        </li>
      )
    })

    let newTaskDom = ''

    if (this.state.newTask) {
      newTaskDom = (
        <div className='new-task'>
          <div className='new-task--name'>
            <input type='text'
              className='new-task--input'
              onInput = {(event) => this.onInputNewTaskName(event)}
              value={this.state.newTask.name}
              placeholder='Title'/>
          </div>
          <div className='new-task--description mt-10'>
            <textarea className='new-task--textarea'
              onInput = {(event) => this.onInputNewTaskDescription(event)}
              value={this.state.newTask.description}
              placeholder='leave a comment' />
          </div>
          <div className='new-task--action mt-10'>
            <a href='#add-new-task'
              className={`btn btn-add ${this.hasContent() ? 'is-available' : 'is-disabled'}`}
              onClick={ (event) => this.addNewTask(event) }>
              <i className='fa fa-plus mr-10' aria-hidden='true'></i>
              submit new task
            </a>
            <a href='#cancel' className='btn btn-cancel ml-15' onClick={ (event) => this.cancelNewTask(event) }>
              <i className='fa fa-ban mr-10' aria-hidden='true'></i>
              cancel
            </a>
          </div>
        </div>
      )
    } else {
      newTaskDom = (
        <a href='#add-new-task' className='btn btn-add' onClick={ (event) => this.insertNewTask(event) }>
          <i className='fa fa-plus mr-10' aria-hidden='true'></i>
          add new task
        </a>
      )
    }

    return (
      <div className='todo-tasks'>
        <div className='new-container'>
          { newTaskDom }
        </div>
        <ul className='list-container'>
          {task}
        </ul>
      </div>
    )
  }
}
