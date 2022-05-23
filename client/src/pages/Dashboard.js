import TinderCard from "react-tinder-card";
import { useState, useEffect } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from 'react-cookie';
import axios from "axios";

const Dashboard = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [lastDirection, setLastDirection] = useState();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const userId = cookies.UserId;
    useEffect(() => {
        getUser();
    }, [])
    useEffect(() => {
        if (user) {
            getAllUsers();
        }
    }, [user])

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            })
            getAllUsers();
        } catch (error) {
            console.log(error);
        }
    }
    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            })
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users');
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (<>
        {user &&
            <div className="dashboard">
                <ChatContainer user={user} />
                <div className="swiper-container">
                    <div className="card-container">
                        {users?.map((user) => user.cars.map((car) =>
                            <TinderCard
                                className='swipe'
                                key={car.id}
                                onSwipe={(dir) => swiped(dir, user.user_id)}
                                onCardLeftScreen={() => outOfFrame(user.firstname)}>
                                <div style={{ backgroundImage: 'url(' + car.url + ')' }} className='card'>
                                    <h3>{user.firstname}<br /> {car.model} <br />{car.year} {car.price} </h3>
                                </div>
                            </TinderCard>)
                        )}
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection} </p> : <p />}
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
    )
}
export default Dashboard
