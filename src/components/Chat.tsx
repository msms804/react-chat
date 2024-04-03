import { useState, useEffect } from "react";
import axios from "axios";

interface ChatProps {
    message: {
        _id: string;
        username: string;
        message: string;
        sendDate: string;
        userId: string;
    }
}

const Chat: React.FC<ChatProps> = ({ message }) => {
    const [myChat, setMyChat] = useState(null);
    const [chatClass, setChatClass] = useState("chat");

    //로그인한 사람의 아이디와 메시지의 userId 같으면 오른쪽, 아니면 왼쪽
    useEffect(() => {//이걸 리액트 쿼리로 만들어서 빼야할듯
        try {
            axios.get('http://localhost:8080/accessToken', { withCredentials: true })
                .then((res) => {
                    setMyChat(res.data.username);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }, [])
    useEffect(() => {
        const newChatClass = (myChat === message.userId) ? "chat chat-end" : "chat chat-start"
        setChatClass(newChatClass);
    }, [myChat, message])

    return (<>
        <div >
            <div className={`chat ${chatClass}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="chat-header">
                    {message.username}
                    <time className="text-xs opacity-50">{message.sendDate}</time>
                </div>
                <div className="chat-bubble">{message.message}</div>
                <div className="chat-footer opacity-50">
                    Delivered
                </div>
            </div>
        </div>
    </>)
}
export default Chat;