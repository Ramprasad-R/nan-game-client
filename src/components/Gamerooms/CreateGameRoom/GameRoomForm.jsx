import React from 'react'

export default (props) => (
    <form onSubmit={props.onSubmit}>

        <label>Create a new Game room: </label>
        <input 
            name="name" 
            type="text" 
            value={props.name} 
            onChange={props.onChange}></input>

        <input type="submit"></input>
    </form>
)