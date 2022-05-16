import logo from "../img/example.png"

const Nav = ({minimal, authToken, setShowModal}) => {

  // switch logo picture with minimal
  // const minimal = false
  // src= {minimal ? logo1 : logo2}
  const handleClick = () =>{
    setShowModal(true)
  }

  return (
    <nav>
    <div class="logo-container">
      <img className="logo" src={logo}/>
    </div>
    {!authToken && !minimal && <button className= "nav-button" onClick={handleClick}>
      Log in</button>}
    </nav>
  )
}
export default Nav