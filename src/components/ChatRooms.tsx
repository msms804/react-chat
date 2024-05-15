import axios from "axios";
import useUserData from '../queries/user'
import { useEffect, useState } from "react";

const ChatRooms = () => {
    //!! 로그인한 사람이 들어가있는 방만 보내줘야!! --> 추후 고치셈.. 
    /*알고리즘
    0. 실험데이터 넣고시작
    1. 일단 리액트쿼리로 유저데이터 가져온다,
    2. 내 아이디가 있는 채팅방만 가져온다.
    3. 렌더링한다.
    */
    const [roomName, setRoomName] = useState([]);
    const { isLoading, error, data } = useUserData();//data._id 이걸로 비교해야

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/rooms/list", {
                params: { userId: data.email }
            });
            console.log("대구리아파", data.email);
            const roomNames = res.data.map((item: any) => item.roomName);
            setRoomName(roomNames);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (data) {
            fetchData();
        }
    }, [data]);
    if (isLoading) return <div>loading...</div>
    return (<>
        <div>
            <div className="font-bold">Chats</div>
            {roomName.map((item, index) =>
                <div key={index} className="border-b-2 pb-2 pt-2 grid grid-cols-5">
                    <div className="col-span-1">이미지</div>
                    <div className="col-span-3">
                        <div className="font-semibold">{item}</div>
                        <div className="text-sm">마지막으로 보낸 메시지</div>
                    </div>
                    <div className="text-sm font-light col-span-1">날짜</div>
                </div>)}
        </div>
    </>)
}
export default ChatRooms;