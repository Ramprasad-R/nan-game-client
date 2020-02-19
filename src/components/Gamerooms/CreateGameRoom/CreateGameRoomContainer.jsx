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
    this.props.createGameRoom(this.state)
    this.setState({
      name: '',
    })
    // this.props.createGameRoom(this.state)
    // this.props.history.push('/gamerooms')
  }

  render() {
    return (
    <div>
    <GameRoomForm
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      name={this.state.name}
    />
    {/* <button><Link to={'/'}>Back to the list</Link></button> */}
    </div>
    )
  }
}

export default connect(null, {createGameRoom})(CreateGameRoomFormContainer)