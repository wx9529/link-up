import TinderCard from "react-tinder-card"
import { useState } from "react"
import ChatContainer from "../components/ChatContainer"
 
const db = [
  {
    name: 'Richard Hendricks',
    year: '2021',
    make: 'audi',
    model: 'R8',
    url: 'https://images.unsplash.com/photo-1612468008274-9445bd56161e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGNhcnxlbnwwfHwwfHw%3D&w=1000&q=80'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    name: 'Monica Hall',
    url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnN8ZW58MHx8MHx8&w=1000&q=80'
  },
  {
    name: 'Jared Dunn',
    url: 'https://www.cnet.com/a/img/resize/b5bad9fc09bf6d76cf8b5db6bca7d68fc49cdcac/2016/12/14/8ea41d9d-2a76-4f35-9d9d-1ef472f7d9dc/car-photography-how-to.jpg?auto=webp&fit=crop&height=675&width=1200'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?fit=crop&format=jpg&crop=4560,2565,x790,y784,safe'
  }
]

const Dashboard = () => {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swiper-container">
        <div className="card-container">
          {characters.map((character) =>
          <TinderCard 
          className='swipe' 
          key={character.name} 
          onSwipe={(dir) => swiped(dir, character.name)} 
          onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                <h3>{character.name} <br /> {character.year} <br />{character.make} {character.model} </h3>
            </div>
          </TinderCard>
          )}
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection} </p> : <p/>}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard