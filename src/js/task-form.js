import React from "react"
import ReactDOM from "react-dom"

export default class TaskForm extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div className='new-task'>
        <div className='new-task--name'>
          <input type='text'
            className='new-task--input'
            onInput = {event => this.props.onInputNewTaskName(event.currentTarget.value)}
            value={this.props.newTask.name}
            placeholder='title'/>
        </div>
        <div className='new-task--description mt-10'>
          <textarea className='new-task--textarea'
            onInput = {event => this.props.onInputNewTaskDescription(event.currentTarget.value)}
            value={this.props.newTask.description}
            placeholder='leave a comment' />
        </div>
      </div>
    )
  }
}
