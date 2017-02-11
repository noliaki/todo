import React from "react"
import ReactDOM from "react-dom"

export default class TaskAction extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div className='list--action'>
        <div className='list-seek list--action--item'>
          <span className='form-tag'>
            <i className="fa fa-sort" aria-hidden="true"></i>
          </span>
          <select className='list--action--select' name='sort' value={ this.props.currentSort } onChange={ (event) => this.props.onChangeSort(event.currentTarget.value) }>
            { this.props.sortOption.map( option => <option value={ option } key={ option }>{ option }</option> ) }
          </select>
        </div>
        <div className='list-seek list--action--item'>
          <span className='form-tag'>
            <i className="fa fa-filter" aria-hidden="true"></i>
          </span>
          <select className='list--action--select' name='filter' value={ this.props.currentFilter } onChange={ (event) => this.props.onChangeFilter(event.currentTarget.value) }>
            { this.props.filterOption.map( option => <option value={ option } key={ option }>{ option }</option> ) }
          </select>
        </div>
        <div className='list-seek list--action--item'>
          <span className='form-tag'>
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
          <input className='list-seek--input' type='input' value={this.props.seekWord} onInput={(event) => this.props.onInputSeekWord(event.currentTarget.value)} />
        </div>
      </div>
    )
  }
}
