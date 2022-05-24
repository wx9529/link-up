import axios from "axios";
import { useEffect, useState } from "react";

const Chat = ({ descendingOrderMessages, user }) => {
    // const url = 'http://localhost:8000/message';
    // const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     axios.get(url).then(res => {
    //         setMessages(res.data.message);
    //     })
    // }, [])

    return (
        <>
            <div className="chat-display">
                {descendingOrderMessages.map((message, _index) => (
                    <div key={_index}>
                        <div className="chat-message-header">
                            {message.name === user.firstname && <div className="send-message">
                                <p>{message.name}</p>
                                <div className="send-container">
                                <p>{message.message}</p>
                                </div>
                            </div>}
                            {message.name !== user.firstname && <div className="receive-message">
                                <p>{message.name}</p>
                                <div className="receive-container">
                                    <p>{message.message}</p>
                                </div>
                            </div>}
                        </div>
                    </div>
                ))}
            </div>
        </>)
}

export default Chat