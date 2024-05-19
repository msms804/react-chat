import axios from "axios";
import useUserData from '../queries/user'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Room {
    _id: string;
    roomName: string;
    members: Array<string>;
}
const ChatRooms = () => {
    //!! 로그인한 사람이 들어가있는 방만 보내줘야!! --> 추후 고치셈.. 
    /*알고리즘
    1. 클릭하면 상세 채팅방으로 들어가게
    2. 클릭한 채팅방의 id를 url로 넣어서
    3. http://localhost:8080/api/:roomId/chats/list
    ex ) http://localhost:8080/api/660ada5f964d07b31f9411fa/chats/list

    1. 일단 onClick 메소드 만들어서 -- o 
    2. 채팅방 누르면 id 로그 찍어보자
    3. 채팅방 목록을 미리 리액트쿼리로 빼오는게 낫나?
    4. 그 id를 chatList컴포넌트로 넘겨주기
    5. http://localhost:8080/api/rooms/list 이것도 url안에 사용자의 id? 가 들어가게 바꾸는게 낫지않나
    */
    const [room, setRoom] = useState<Room[]>([]);
    const { isLoading, error, data } = useUserData();//data._id 이걸로 비교해야
    const navigate = useNavigate();


    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/rooms/list", {
                params: { userId: data.email }
            });
            console.log("대구리아파", res);
            const rooms = res.data.map((item: any) => item);
            setRoom(rooms);
        } catch (error) {
            console.log(error);
        }
    };
    const onClickRoom = (room: Room) => {
        navigate(`/chats/${room._id}`)

    }
    useEffect(() => {
        if (data) {
            fetchData();
        }
    }, [data]);
    if (isLoading) return <div>loading...</div>
    return (<>
        <div>
            <div className="font-bold">Chats</div>
            {room.map((item, index) =>
                <div key={index} onClick={() => onClickRoom(item)} className="border-b-2 pb-2 pt-2 grid grid-cols-5">
                    <div className="col-span-1">이미지</div>
                    <div className="col-span-3">
                        <div className="font-semibold">{item.roomName}</div>
                        <div className="text-sm">마지막으로 보낸 메시지</div>
                    </div>
                    <div className="text-sm font-light col-span-1">날짜</div>
                </div>)}
        </div>
    </>)
}
export default ChatRooms;