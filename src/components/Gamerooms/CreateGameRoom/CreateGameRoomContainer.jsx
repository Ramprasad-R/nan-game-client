import React from 'react'
import {connect} from 'react-redux'
import { createGameRoom } from '../../../actions/gameRooms'
import GameRoomForm from './GameRoomForm'
// import {Link} from 'react-router-dom'


class CreateGameRoomFormContainer extends React.Component {
  state = {
    name: '',
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      name: '',
    })
    
    this.props.createGameRoom(this.state)
    this.props.history.push('/')
  }

  render() {
    return (
    <div>
    <GameRoomForm
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      values={this.state}
    />
    {/* <button><Link to={'/'}>Back to the list</Link></button> */}
    </div>
    )
  }
}

export default connect(null, {createGameRoom})(CreateGameRoomFormContainer)