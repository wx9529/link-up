import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ChatHeader = () => {
  return (
    <div className="chat-container-header">
      <div className="profile">
      <div className="img-container">
        <img src=""/>
      </div>
      <h3>userName</h3>
    </div>
      <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="log-out-icon" />
    </div>
    )
}
export default ChatHeader