import axios from "axios";
import { useEffect, useState } from "react";

const Chat = ({ descendingOrderMessages, user }) => {
    return (
        <>
            <div className="chat-display">
                {descendingOrderMessages.map((message, _index) => (
                    <div key={_index}>
                        <div className="chat-message-header">
                            {message.name === user.firstname && <div className="send-message">
                                <div className="sender">
                                    <p>{message.name}</p>
                                </div>
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