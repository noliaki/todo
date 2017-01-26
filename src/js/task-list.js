import React from "react"
import ReactDOM from "react-dom"
import Store from './Store'
import { weekday } from './utils'

export default class TaskList extends React.Component {
  constructor (props) {
    super (props)
  }

  onDoneTask (event) {
    event.preventDefault()
    Store.doneTask(this.props.task.id)
  }

  render () {
    const createDate = new Date(this.props.task.createDate)
    const editDate = new Date(this.props.task.editDate)
    const listClass = [
      'list',
      `list_${this.props.index}`,
      `${(this.props.index + 1) % 2 === 0 ? 'even' : ''}`,
      `${this.props.done ? 'is-done' : ''}`
    ]

    const deleteBtn = (
      <a href='#delete-task' className='list--delete' onClick={(event) => this.props.onDeleteTask(this.props.task.id)} >
        <i className="fa fa-times" aria-hidden="true"></i>
      </a>
    )

    return (
      <li className={listClass.filter(item => item).join(' ')} key={this.props.task.id}>
        <div className='list--done-toggle' onClick={(event) => this.onDoneTask(event)}>
          { this.props.task.done ? <i className='fa fa-check' aria-hidden='true'></i> : '' }
        </div>
        <div className='list--content'>
          <div className='list--date'>
            {`${createDate.getFullYear()}/${createDate.getMonth() + 1}/${createDate.getDate()} (${weekday[createDate.getDay()]})`}
            {this.props.task.createDate !== this.props.task.editDate ? ` | ${editDate.getFullYear()}/${editDate.getMonth() + 1}/${editDate.getDate()} (${weekday[editDate.getDay()]})` : ''}
          </div>
          <h2 className='list--title'>
            {this.props.task.name}
          </h2>
          <p className='list--description'>
            {this.props.task.description}
          </p>
        </div>
        { this.props.task.done ? deleteBtn : ''}
      </li>
    )
  }
}
