import { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
const ChatList = () => {
    //이거 chat컴포넌트에서 짜야하나..?
    //사용자 정보도 보내줘야함
    //내 메시지--> 오른쪽 / 상대방 --> 왼쪽
    const [messages, setMessages] = useState([]);

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
            {/* {messages?.map((item: any) => (<div key={item._id}>{item.message}</div>))} */}
            {messages?.map((item: any) => (<Chat message={item} />))}
            {/** 
             * 1. 아.. 요걸 chat컴포넌트로 옮겨야할듯.. --> o
             * 2. 로그인한 사용자명 왼쪽하단에 박기 --> o
             * 3. 로그인한사람의 채팅 오른쪽 에 오도록 --> o
             * 4. db스키마 슬슬 확실히 정할것
             * --------
             * 5. 채팅창 방 누르면 디테일페이지로 전환되도록 라우팅
            */}
            {/* <Chat /> */}
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
            {/** */}
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
