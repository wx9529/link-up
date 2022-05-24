import { useCookies } from "react-cookie";
import {
  Link
} from "react-router-dom";


const Nav = ({ authToken, setShowModal, showModal, setIsSignUp }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const handleSignOut = () => {
    if (authToken) {
      removeCookie('UserId', cookies.UserId);
      removeCookie('AuthToken', cookies.AuthToken);
      return
    }
    setShowModal(true);
    setIsSignUp(true);
  }
  const handleSignIn = () => {
    setShowModal(true)
    setIsSignUp(false)
  }

  return (
    <nav>
      <a className="logo-container" href="https://auto-deal-app.herokuapp.com">
        <img className="logo" src="https://github.com/wx9529/link-up/blob/client1/client/src/images/logo5-removebg-preview.png?raw=true" alt="logo" />
      </a>
      {!authToken ? <button className="nav-button" onClick={handleSignIn} disabled={showModal}>
        Log in</button> : <Link to="/"><button className="nav-button" onClick={handleSignOut}>Sign Out</button></Link>}
    </nav>
  )
}
export default Nav