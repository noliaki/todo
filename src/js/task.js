import React from "react"
import ReactDOM from "react-dom"

import {weekday} from './utils'

export default class Task extends React.Component {
  constructor (props) {
    super (props)
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
            <i className={`fa ${task.done ? 'fa-check-square-o' : 'fa-square-o'}`} aria-hidden='true'></i>
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
      <ul className='task--lists'>
        {task}
      </ul>
    )
  }
}
