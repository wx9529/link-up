import Car from "./Car"
import OnBoarding from "../pages/OnBoarding"
import Dashboard from "../pages/Dashborad"
import { useState } from "react"

const Individual = () => {

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
  )
}

export default Individual