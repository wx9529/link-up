import { useCookies } from 'react-cookie';

const ChatHeader = ({ user }) => {
    const [cookies, setCookie, removeCookie] = useCookies('user');
    const logout = () => {
        removeCookie('UserId', cookies.UserId);
        removeCookie('AuthToken', cookies.AuthToken);
        window.location.reload();
    }
    return (
        <div className="chat-container-header">
            <div className="profile">
                <h3>{user.firstname}</h3>
            </div>
            <i className='log-out-icon' onClick={logout}>⇦</i>
        </div>
    )
}
export default ChatHeader