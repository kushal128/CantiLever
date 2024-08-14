import React, { Component } from 'react'
import loading from './Book.gif'

export class Loader extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={loading} alt="loading" />
      </div>
    )
  }
}

export default Loader
