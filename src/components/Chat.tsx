import { useState, useEffect } from "react";
import axios from "axios";
import useUserData from '../queries/user'
import { useParams } from "react-router-dom";
interface ChatProps {
    message: {
        _id: string;
        username: string;
        message: string;
        sendDate: string;
        userId: string;
        roomId: string;
    }
}
/**
 * 현재 로그인한 사람과 이메일? 아이디 같으면 오른쪽, 아니면 왼쪽 --> 완
 * 보낸시간에서 날짜 빼고 보내야 --> 완
 * 제로초는 dayjs 왜썻지?
 * 
 * 상대방 이미지어떻게?
 * 0. useParams로 찾아야겟는데?
 * 0.5. roomId로 찾은거 axios요청으로 불러옴
 * 1. 방에 있는사람 목록 가져온다. rooms에 배열로 있음
 * 2. 그목록의 users정보 가져옴. users에 있음
 * 3. profileImg 뿌린다
 */
const Chat: React.FC<ChatProps> = ({ message }) => {
    const [chatClass, setChatClass] = useState("chat");
    const { isLoading, error, data } = useUserData();
    const roomId = useParams().roomId;
    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/room/${roomId}/members`)
            console.log("씻기전에..", response.data[0].members);
            setMembers(response.data[0].members);
        } catch (error) {
            console.error("멤버 fetch에러", error)
        }
    }
    const fetchImgs = () => {
        /**
         * 1. members state를 다시 서버로 get요청해야 
         * 2. users 오브젝트? 에서 해당 members의 정보 가져와야
         * 3. 이미지 추출해서 박아넣기
         *  members info는 redux로 관리하는게 나을지도...
         *  아님 members가 속한 방같은거 따로..? 이래서 rdb하는구나...
         */
        try {

        } catch (error) {

        }
    }
    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    useEffect(() => {
        fetchMembers();
    }, [])
    useEffect(() => {
        console.log(members);
        //여기서 또 페칭해야할듯..
    }, [members])
    useEffect(() => {//이거도 필요없는디
        const newChatClass = (data.email === message.userId) ? "chat chat-end" : "chat chat-start"
        setChatClass(newChatClass);
    }, [message])


    return (<>
        <div >
            {/* <div className={`chat ${chatClass}`}>
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
            </div> */}
            {
                (data.email !== message.userId) ? (
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img src="your-image-source.jpg" alt="img" className="w-12 h-12 rounded-full" /></div>
                        <div className="ml-4">
                            <div className="font-semibold text-xs">{message.username}</div>
                            <div className="bg-white inline-block rounded-lg p-2 text-sm">{message.message}</div>
                            <div className="text-gray-500 text-xs">{formatTime(message.sendDate)}</div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-end">
                        <div className="bg-slate-200 inline-block rounded-lg m-2 p-2 text-sm">{message.message}</div>
                        <div className="text-gray-500 text-xs">{formatTime(message.sendDate)}</div>
                    </div>
                )
            }


        </div>
    </>)
}
export default Chat;