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

  addNewTask () {
    this.props.addNewTask(this.state.newTask)
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
        createDate: date,
        editDate: date,
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

  filteredData () {
    if ( !this.props.searchText ) return this.props.tasks.filter(task => !task.deleteDate)

    return this.props.tasks.filter((task) => {
      return (task.name.indexOf(this.props.searchText) > -1 || task.description.indexOf(this.props.searchText) > -1) && !task.deleteDate
    })
  }

  render () {
    const task = this.filteredData().map((task, index) => {
      return (
        <li className={`task--list list_${index} ${(index + 1) % 2 === 0? 'even' : ''}`} key={task.id}>
          <div className='task--list--done-toggle'>

            {/* <i className={`fa ${task.done ? 'fa-check-square-o' : 'fa-square-o'}`} aria-hidden='true'></i> */}
          </div>
          <div className='task--list--conent'>
            <h2 className='task--list--title'>
              {task.name}
            </h2>
            <div className='task--list--date'>
              {`${task.createDate.getFullYear()}/${task.createDate.getMonth() + 1}/${task.createDate.getDate()} (${weekday[task.createDate.getDay()]})`}
              {task.createDate !== task.editDate ? ` | ${task.editDate.getFullYear()}/${task.editDate.getMonth() + 1}/${task.editDate.getDate()} (${weekday[task.editDate.getDay()]})` : ''}
            </div>
            <p className='task--list--description'>
              {task.description}
            </p>
          </div>
        </li>
      )
    })

    return (
      <div className='todo-tasks'>
        {
          this.state.newTask ?
            <div className='new-task'>
              <div className='new-task--name'><input type='text' onInput = {(event) => this.onInputNewTaskName(event)} value={this.state.newTask.name} /></div>
              <div className='new-task--description'><input type='text' onInput = {(event) => this.onInputNewTaskDescription(event)} value={this.state.newTask.description} /></div>
              <a href='#add-new-task' onClick={ (event) => this.addNewTask(event) }>add new task</a>
            </div>
            :
            <a href='#add-new-task' onClick={ (event) => this.insertNewTask(event) }>Add New Task</a>
        }
        <ul className='task--lists'>
          {task}
        </ul>
      </div>
    )
  }
}
