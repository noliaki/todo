import React from "react"
import ReactDOM from "react-dom"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {weekday} from './utils'

export default class Task extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      newTask: null,
      seekWord: '',
      sort: 'newer',
      sortOption: [
        'no sort',
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
        done: false,
        projects: []
      }
    })
  }

  onInputSeekWord (event) {
    this.setState({
      seekWord: event.currentTarget.value
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

  // sort
  newerTasks () {
    return this.props.tasks.sort((a, b) => {
      return b.createDate - a.createDate
    })
  }

  olderTasks () {
    return this.props.tasks.sort((a, b) => {
      return a.createDate - b.createDate
    })
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

  defaultOrderedTasks () {
    return this.sortedTasks().filter(task => this.filterTask(task))
  }

  defaultFilteredTasks () {
    return this.props.tasks.filter(task => task).sort((a, b) => {
      return b.createDate - a.createDate
    })
  }

  filteredData () {
    if ( !this.state.seekWord ) return this.defaultFilteredTasks().filter(task => this.filterTask(task))

    return this.defaultFilteredTasks().filter((task) => {
      return (task.name.indexOf(this.state.seekWord) > -1 || task.description.indexOf(this.state.seekWord) > -1)
    })
  }

  onChangeSort (event) {
    this.setState({
      sort: event.currentTarget.value
    })
  }

  onChangeFilter (event) {
    this.setState({
      filter: event.currentTarget.value
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

      const deleteBtn = (
        <a href='#delete-task' className='list--delete' onClick={(event) => this.props.onDeleteTask(task.id)} >
          <i className="fa fa-times" aria-hidden="true"></i>
        </a>
      )

      return (
          <li className={listClass.filter(item => item).join(' ')} key={task.id}>

            <div className='list--done-toggle' onClick={() => this.props.onDoneTask(task.id)}>
              { task.done ? <i className='fa fa-check' aria-hidden='true'></i> : '' }
            </div>
            <div className='list--content'>
              <div className='list--date'>
                {`${createDate.getFullYear()}/${createDate.getMonth() + 1}/${createDate.getDate()} (${weekday[createDate.getDay()]})`}
                {task.createDate !== task.editDate ? ` | ${editDate.getFullYear()}/${editDate.getMonth() + 1}/${editDate.getDate()} (${weekday[editDate.getDay()]})` : ''}
              </div>
              <h2 className='list--title'>
                {task.name}
              </h2>
              <p className='list--description'>
                {task.description}
              </p>
            </div>
            { task.done ? deleteBtn : ''}
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

    const sortOption = this.state.sortOption.map((item) => {
      return (
        <option value={ item } key={ item }>
          { item }
        </option>
      )
    })

    const filterOption = this.state.filterOption.map((item) => {
      return (
        <option value={ item } key={ item }>
          { item }
        </option>
      )
    })

    return (
      <div className='todo-tasks'>
        <div className='new-container'>
          { newTaskDom }
        </div>
        <div className='list--action'>
          <div className='list-seek'>
            <span className='form-tag'>sort</span>
            <select className='list--action--select' name='sort' value={ this.state.sort } onChange={ (event) => this.onChangeSort(event) }>
              { sortOption }
            </select>
          </div>
          <div className='list-seek'>
            <span className='form-tag'>filter</span>
            <select className='list--action--select' name='filter' value={ this.state.filter } onChange={ (event) => this.onChangeFilter(event) }>
              { filterOption }
            </select>
          </div>
          <div className='list-seek'>
            <span className='form-tag'>seek word</span>
            <input className='list-seek--input' type='input' value={this.state.seekWord} onInput={(event) => this.onInputSeekWord(event)} />
          </div>
        </div>
        <ReactCSSTransitionGroup
          component="ul"
          className='list-container'
          transitionName="list"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={500}>
          {task}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
