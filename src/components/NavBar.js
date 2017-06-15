import React from 'react'
import { Link } from 'react-router-dom'

var links = () => {
  if(!!localStorage.id){
    return <li><Link to="/logout">Log Out</Link></li>
  } else {
    return (
      <div className="nav navbar-nav">
        <li><Link to="/login">Log In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </div>
    )
  }
}

function NavBar(props){
  const colors = {
    black: 'navbar-inverse',
    white: 'navbar-default'
  }

  return (
    <nav className={`navbar ${colors[props.color]}`}>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <a className='navbar-brand'>
            { props.title }
          </a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/game">Game</Link></li>
            {links()}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
