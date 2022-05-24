import axios from "axios";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

const ChatDisplay = ({ user, clickedUser }) => {
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;
    const [userMessages, setUsersMessages] = useState(null);
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

    const getUsersMessages = async () => {
        try {
            const response = await axios.get('https://auto-deal-api.herokuapp.com/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId }
            })
            setUsersMessages(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('https://auto-deal-api.herokuapp.com/messages', {
                params: { userId: clickedUserId, correspondingUserId: userId }
            })
            setClickedUsersMessages(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsersMessages();
        getClickedUsersMessages();
    }, [userMessages, clickedUsersMessages])

    const messages = [];

    userMessages?.forEach(message => {
        const formattedMessage = {};
        formattedMessage['name'] = user?.firstname;
        formattedMessage['message'] = message.message;
        formattedMessage['timestamp'] = message.timestamp;
        messages.push(formattedMessage);
    })
    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {};
        formattedMessage['name'] = clickedUser?.firstname;
        formattedMessage['message'] = message.message;
        formattedMessage['timestamp'] = message.timestamp;
        messages.push(formattedMessage);
    })
    const descendingOrderMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    return (
        <>
            <Chat descendingOrderMessages={descendingOrderMessages} user={user} />
            <ChatInput
                user={user}
                clickedUser={clickedUser}
                getUsersMessages={getUsersMessages}
                getClickedUsersMessages={getClickedUsersMessages}
            />
        </>
    )
}

export default ChatDisplay