import { useState } from "react"
import logo from "../images/tinder_logo_white.png"
import { useCookies } from "react-cookie"

const Nav = ({ authToken, setShowModal, showModal, setIsSignUp }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const handleClick = () => {
    if (authToken) {
      removeCookie('UserId', cookies.UserId);
      removeCookie('AuthToken', cookies.AuthToken);
      window.location.reload();
      return
    }
    setShowModal(true);
    setIsSignUp(false);
  }


  return (
    <nav>
      <a class="logo-container" href="http://localhost:3000/">
        <img className="logo" src={logo} />
      </a>

      {!authToken ? <button className="nav-button" onClick={handleClick} disabled={showModal}>
        Log in</button> : <button className="nav-button" onClick={handleClick}>Sign Out</button>}
    </nav>

  )
}
export default Nav