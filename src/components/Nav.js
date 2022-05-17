import logo from "../img/example.png"

const Nav = ({authToken, setShowModal, showModal, setIsSignUp}) => {

  // switch logo picture with minimal
  // const minimal = false
  // src= {minimal ? logo1 : logo2}
  const handleClick = () =>{
    setShowModal(true)
    setIsSignUp(false)
  }

  return (
    <nav>
    <div class="logo-container">
      <img className="logo" src={logo}/>
    </div>
    {!authToken && <button className= "nav-button" onClick={handleClick} disabled={showModal}>
      Log in</button>}
    </nav>
  )
}
export default Nav