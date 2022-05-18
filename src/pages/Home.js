import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal';
import { useState } from 'react';


const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)

  const authToken = true;

  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(true)
  }


  return (
    <div className="overlay">
      <Nav authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">

        <div className="home-page"><h1 className="primary-title">Swipe Right</h1>
          <button className="primary-button" onClick={handleClick}>
            Create Account
          </button>
          {showModal && (
            <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
          )} </div> 


        </div>
        </div>
        )}
        export default Home