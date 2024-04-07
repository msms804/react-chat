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
        </p>
    </>)
}
export default ChatList;
