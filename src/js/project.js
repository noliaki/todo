import React from "react"
import ReactDOM from "react-dom"

import {weekday} from './utils'

export default class Project extends React.Component {
  constructor (props) {
    super (props)
  }

  filteredProject () {
    if ( !this.props.searchText ) return this.props.projects

    return this.props.projects.filter((project) => {
      return project.name.indexOf(this.props.searchText) > -1 || project.description.indexOf(this.props.searchText) > -1
    })
  }

  render () {
    const projects = this.filteredProject().map((project, index) => {
      return (
        <li className={`project--list list_${index}`} key={index}>
          <div className='project--list--done-toggle'>
            <i className={`fa ${project.done ? 'fa-check-square-o' : 'fa-square-o'}`} aria-hidden='true'></i>
          </div>
          <div className='project--list--conent'>
            <div className='project--list--date'>
              {`${project.createDate.getFullYear()}/${project.createDate.getMonth() + 1}/${project.createDate.getDate()} (${weekday[project.createDate.getDay()]})`}
              {project.createDate !== project.editDate ? ` | ${project.editDate.getFullYear()}/${project.editDate.getMonth() + 1}/${project.editDate.getDate()} (${weekday[project.editDate.getDay()]})` : ''}
            </div>
            <h2 className='project--list--title'>
              {project.name}
            </h2>
            <p className='project--list--description'>
              {project.description}
            </p>
          </div>
        </li>
      )
    })

    return (
      <ul className='project--lists'>
        {projects}
      </ul>
    )
  }
}
