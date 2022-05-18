import logo from "../img/example.png"
import { useState } from "react"
import Home from "../pages/Home"

const Nav = ({authToken, setShowModal, showModal, setIsSignUp}) => {

  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }
  const logOutClick = () => {
    authToken = false
  }
  
  return (
    <nav>
    <div class="logo-container">
      <img className="logo" src={logo}/>
    </div>

    {!authToken? <button className= "nav-button" onClick={handleClick} disabled={showModal}>
        Log in</button> : <button className="nav-button" onClick={logOutClick}>Sign Out</button>}
    </nav>

  )
}
export default Nav