import React from "react"
import ReactDOM from "react-dom"

export default class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []// { name, date, id, description }
    }
  }

  filteredProject (text = '') {
    return this.state.projects.filter((project) => {
      return project.name.indexOf(text) > -1 || project.description.indexOf(text) > -1
    })
  }

  render() {
    return (
      <li>

      </li>
    )
  }
}
