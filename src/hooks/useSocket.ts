import { io } from "socket.io-client";
import { useCallback } from "react";

const backurl = 'http://localhost:8080';

//소켓io에도 계층이 있음
// namespace(슬랙의 workspace)와 room(슬랙의 channel)이 있음
//나는 워크스페이스가 아니라 그냥 채팅방인데
const useSocket = (workspace?: string) => {//파라미터에 workspace url 적어줌
    //소켓 통해 서버와 소통
    const socket = io(`${backurl}/ws-${workspace}`);//워크스페이스의 url 적어줌
    socket.emit('hello', 'world');  // 서버에 hello라는 이벤트이름으로 world라는 데이터 보냄
    socket.on('message', (data) => {//서버->클라로 데이터보내면. 데이터 받는 콜백함수
        console.log(data);  //이벤트 이름이 일치할때만 받음
    })
    socket.disconnect(); //한번맺었던 연결 끊음
}
export default useSocket;
//12분~