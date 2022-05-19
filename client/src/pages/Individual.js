import Car from "../components/Car";
import OnBoarding from "./OnBoarding";
import Dashboard from "./Dashboard";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Nav from "../components/Nav";

const Individual = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const authToken = cookies.AuthToken;

  const [showCarList, setShowCarList] = useState(false)
  const [postCar, setPostCar] = useState(false)
  const [discover, setDiscover] = useState(false)
  const listClick = () => {
    setShowCarList(true)
    setPostCar(false)
    setDiscover(false)
  }
  const postClick = () => {
    setShowCarList(false)
    setPostCar(true)
    setDiscover(false)
  }
  const discoverClick = () => {
    setShowCarList(false)
    setPostCar(false)
    setDiscover(true)
  }


  return (
    <div className="overlay">
      <Nav
        authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="individual">
        <button className="primary-button" onClick={listClick}>Car List</button>
        <button className="primary-button" onClick={postClick}>Post a New Car</button>
        <button className="primary-button" onClick={discoverClick}>Discover</button>
        {showCarList && <div className="car-container">
          <Car />
        </div>}
        {postCar && <div className="post-car">
          <OnBoarding />
        </div>}
        {discover && <div className="discover">
          <Dashboard />
        </div>}
        {!showCarList && !postCar && !discover && <div className="welcome-page">
          <h1>Welcome</h1>
        </div>
        }
      </div>
    </div>
  )
}

export default Individual