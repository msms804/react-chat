import axios from "axios";
import { useEffect, useState } from "react";
//채팅칠때 리렌더링 방지
//https://tecoble.techcourse.co.kr/post/2021-05-15-react-ref/

const ChatBox = ({ chatContainerRef }: { chatContainerRef: React.RefObject<HTMLDivElement> }) => {
    //여기서 db로 post요청 필요,
    /**
     * 1. 입력한 메시지 state에 담는다
     * 2. 그 state변수 태워서 서버로 보낸다
     * 
     */
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);

    //로그인한 유저 정보가져오기
    useEffect(() => {
        axios.get('http://localhost:8080/accessToken', { withCredentials: true })
            .then((response) => {
                setUserId(response.data.id)
                setUsername(response.data.username)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }, [])

    const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }
    //submit 함수
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        const sendDate = new Date();
        // message, sendDate, userId, username, _id(이건 자동생성인가봄)
        axios.post('http://localhost:8080/api/chat', { message, sendDate, userId, username })
            .then((response) => {
                console.log("메시지 전송 성공", response.data)
                console.log("전송시간: ", sendDate);//형식 바꿔야
                console.log("아이디: ", userId)
                console.log("닉네임: ", username)
                setMessage('');
            })
            .catch((error) => {
                console.log("메시지 전송 실패", error)
            })

    }

    return (<>
        <form onSubmit={onSubmit}>
            <div className="flex mt-auto">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M3 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H3Zm.895 3.458C4.142 6.071 4.38 6 4.5 6s.358.07.605.458a.75.75 0 1 0 1.265-.805C5.933 4.966 5.274 4.5 4.5 4.5s-1.433.466-1.87 1.153C2.195 6.336 2 7.187 2 8s.195 1.664.63 2.347c.437.687 1.096 1.153 1.87 1.153s1.433-.466 1.87-1.153a.75.75 0 0 0 .117-.402V8a.75.75 0 0 0-.75-.75H5a.75.75 0 0 0-.013 1.5v.955C4.785 9.95 4.602 10 4.5 10c-.121 0-.358-.07-.605-.458C3.647 9.15 3.5 8.595 3.5 8c0-.595.147-1.15.395-1.542ZM9 5.25a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0v-5.5Zm1 0a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H11.5v1.25h.75a.75.75 0 0 1 0 1.5h-.75v2a.75.75 0 0 1-1.5 0v-5.5Z" clipRule="evenodd" />
                </svg>

                <input type="text" className="input input-bordered flex-grow h-8" placeholder="채팅치는곳" onChange={onChangeMessage} value={message} />
                <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                    <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022 24.89 24.89 0 0 0 11.668-5.115.75.75 0 0 0 0-1.175A24.89 24.89 0 0 0 2.869 2.298Z" />
                </svg>
                </button>
            </div>
        </form>
    </>)
}
export default ChatBox;