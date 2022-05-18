import logo from "../img/example.png"
import { useState } from "react"

const Nav = ({ authToken, setShowModal, showModal, setIsSignUp }) => {

  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }

  return (
    <nav>
      <a class="logo-container" href="http://localhost:3000/">
        <img className="logo" src={logo} />
      </a>

      {!authToken ? <button className="nav-button" onClick={handleClick} disabled={showModal}>
        Log in</button> : <button className="nav-button" onClick={() => { }}>Sign Out</button>}
    </nav>

  )
}
export default Nav