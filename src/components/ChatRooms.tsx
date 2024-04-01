import axios from "axios";
import { useEffect, useState } from "react";

const ChatRooms = () => {
    //!! 로그인한 사람이 들어가있는 방만 보내줘야!! --> 추후 고치셈.. 
    const [roomName, setRoomName] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/rooms/list", { withCredentials: true })
            .then((res) => {
                const roomNames = res.data.map((item: any) => item.roomName)
                setRoomName(roomNames)

            }).catch(() => {

            })
    }, [])

    return (<>
        <div>
            <strong>Chats</strong>
            {roomName.map((item) => <div className="border-b-2 pb-4">{item}</div>)}
        </div>
    </>)
}
export default ChatRooms;