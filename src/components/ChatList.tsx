import { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
const ChatList = () => {
    //이거 chat컴포넌트에서 짜야하나..?
    //사용자 정보도 보내줘야함
    //내 메시지--> 오른쪽 / 상대방 --> 왼쪽
    const [messages, setMessages] = useState();

    useEffect(() => {
        axios.get('http://localhost:8080/api/chats/list')
            .then((res) => {
                setMessages(res.data);
            }).catch((error: any) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        console.log("messages : ", messages);
    }, [messages])


    return (<>
        <p className="mb-auto">

            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="chat-header">
                    Obi-Wan Kenobi
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer opacity-50">
                    Delivered
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="chat-header">
                    Anakin
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer opacity-50">
                    Seen at 12:46
                </div>
            </div>
        </p>
    </>)
}
export default ChatList;
