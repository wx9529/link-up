import { useCookies } from 'react-cookie';

const ChatHeader = ({ user }) => {
    const [cookies, setCookie, removeCookie] = useCookies('user');
    return (
        <div className="chat-container-header">
            <div className="profile">
                <h3>{user.firstname}</h3>
            </div>
        </div>
    )
}
export default ChatHeader