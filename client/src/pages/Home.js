import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal"
import { useState } from 'react'
import { useCookies } from "react-cookie"
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const authToken = cookies.AuthToken;

    let navigate = useNavigate();

    const navigateToUser = () => {
        navigate('/individual')
    }

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId);
            removeCookie('AuthToken', cookies.AuthToken);
            window.location.reload();
            return
        }
        setShowModal(true);
        setIsSignUp(true);
    }
    return (
        <div className="overlay">
            <Nav
                authToken={authToken}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />
            <div className="home">
                <h1 className="primary-title">AUTO DEAL®</h1>
                <div className="home-button">
                {authToken && <button className="primary-button" id="discover" onClick={navigateToUser}>Discover</button>}
                <button className="primary-button" id="sign-out" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>
                </div>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
                )}
            </div>

        </div>
    )
}
export default Home