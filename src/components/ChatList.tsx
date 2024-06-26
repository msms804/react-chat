import React from "react";
import { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import { QueryClient, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
// 사용할 Chat 데이터 타입 정의
interface ChatData {
    _id: string;
    username: string;
    message: string;
    sendDate: string;
    userId: string;
    roomId: string;
}
/*
    1. intersection observer react? 라이브러리로 쓰자
    2. getNextPageParam으로 해도될듯..? previous말고
    3. 마지막페이지일때 어떻게 처리할건지
    4. state갱신 --> 2차원배열을 아마 1차원으로 바꾸려면 flat함수 써야할듯
    5. 그리고 렌더링할때 아마 또 리버스로 렌더링해야할지도?
*/
const ChatList = ({ forwardedRef }: { forwardedRef: React.RefObject<HTMLDivElement> }) => {
    const [messages, setMessages] = useState<ChatData[]>([]); // 채팅 메시지를 담을 상태
    const observer = useRef<IntersectionObserver | null>(null);
    //const chatContainerRef = useRef<HTMLDivElement>(null);
    const [chatScroll, setChatScroll] = useState<number | undefined>();
    const { roomId } = useParams<{ roomId: string }>();
    const queryClient = useQueryClient();
    /**
     * 채팅 실시간으로 받기 수도코드
     * 0. 여기서도 소켓연결해서 chatbox에 있던 msg 콘솔로 찍어보자
     * 1. broadcast로 받은 msg를 state에 배열로 저장
     * 2. flatData에 추가?
    * 근데 생각해보니가 msg만 저장하면 안되잖음.. 메세지, 날짜, 보낸사람 이름까지
    */
    //무한 스크롤을 위한 데이터 가져오기 함수
    const fetchChats = async (pageParam: number, roomId?: string) => {
        try {
            console.log("roomId", roomId);
            console.log("pageParam 찍어봄", pageParam)
            const response = await axios.get(`http://localhost:8080/api/${roomId}/chats/list?page=${pageParam}&pageSize=10`);
            //http://localhost:8080/api/chats/list?page=${pageParam}&pageSize=10`
            const data = response.data;
            //요기서 데이터(state) 갱신해야할듯

            return data; // 페이지 형식으로 반환
        } catch (error) {
            console.log("Error fetching chats", error);
            throw error;
        }
    };
    const { data, fetchNextPage, hasNextPage, refetch, } = useInfiniteQuery<ChatData[], Error>({
        queryKey: ['chats', roomId],
        queryFn: ({ pageParam }) => fetchChats(pageParam as number, roomId),
        getNextPageParam: (lastPage, allPages) => {
            console.log("lastPAge: ", lastPage);
            if (lastPage && lastPage.length > 0) {
                const nextPage = allPages.length + 1;
                console.log("nextPage: ", nextPage);
                return nextPage;
                //return lastPage[lastPage.length - 1]._id; // 마지막 요소의 id를 다음 페이지의 pageParam으로 사용
            }
            return undefined; // 다음 페이지 없음
        },
        initialPageParam: 1,
        enabled: !!roomId,
    })

    //소켓 초기화 및 메시지 수신 
    useEffect(() => {
        const socket = io('http://localhost:8080', {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd",
            }
        });
        socket.emit('joinRoom', roomId);
        console.log(`Joining room: ${roomId}`);

        socket.on('broadcast', (msg) => {
            console.log("message received:", msg)
            setMessages((prevMessages) => [...prevMessages, msg])
        })

        return () => {
            socket.disconnect();
        }

    }, [roomId])
    useEffect(() => {
        console.log("내힘들다.....", messages)
    }, [messages])
    useEffect(() => {
        if (roomId) {
            queryClient.invalidateQueries({ queryKey: ['chats', roomId] });  // 수정된 부분    
        }
    }, [roomId, queryClient])

    //scrollTop === 0 && !hasNextPage일때(스크롤바 맨위에있을때) 
    //ref.current.scrollTop(ref.current.getScrollHeight() - values.scrollHeight)
    useEffect(() => {
        //console.log("새로 불러왔을때의 스크롤 높이", forwardedRef.current?.scrollHeight)
        setChatScroll(forwardedRef.current?.scrollHeight)
        // console.log("불러오기전의 스크롤 높이", chatScroll)
        // if (forwardedRef.current && typeof chatScroll !== 'undefined') {
        //     console.log("구하려는 차", forwardedRef.current.scrollHeight - chatScroll);
        // }

        if (data && data.pages && data.pages.length > 1 && forwardedRef.current && typeof chatScroll !== 'undefined') {//잘되는거 맞겠지?
            forwardedRef.current.scrollTop = forwardedRef.current.scrollHeight - chatScroll
        }//왜 밑에서는 data?.pages.length === 1해도 에러 안뜨는데 여기선 생겨 ㅡㅡ


    }, [data])//여기서 deps에 data가 들어가는게 맞을까?
    useEffect(() => {
        if (data?.pages.length === 1 && forwardedRef.current) {
            forwardedRef.current.scrollTop = forwardedRef.current.scrollHeight;
        }
    }, [data])

    useEffect(() => {//아.. 데이터부터 가져와야겟구만..
        const fetchInitialMessages = () => {
            try {
                if (forwardedRef.current) {
                    fetchNextPage(); //async await 쓰면 어떻게 달라지는거지?
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchInitialMessages();
        //data를 불러오고 스크롤 조정해야하는데 이게 첫번째만 렌더링 되다보니까 이 스크롤 조정코드가 작동안함
        // if (data && chatContainerRef.current) {
        //     console.log("1: scrollTop ", chatContainerRef.current.scrollTop);
        //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        //     console.log("2: scrollHeight", chatContainerRef.current.scrollHeight);
        //     console.log("3: scrollTop ", chatContainerRef.current.scrollTop);

        // }

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observerElement = document.querySelector('#observer');
        if (observerElement) {
            observer.current = new IntersectionObserver(handleObserver, options);
            observer.current.observe(observerElement);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []); // 최초 한 번만 실행

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];

        if (target.isIntersecting) {
            // 감지되면 다음 페이지 데이터 로드
            fetchNextPage();
            console.log("새로운 데이터 로드");
        }
    };
    const flatData = data?.pages?.flat().reverse();
    const combinedMessages = [...flatData || [], ...messages]
    return (
        <div ref={forwardedRef} className="mb-auto overflow-auto">
            <p id="observer">옵저버</p>
            {/* {data?.pages?.reverse().map((page: any) => (
                <React.Fragment>
                    {page.reverse().map((item: any) => (
                        <Chat key={item._id} message={item} />
                    ))}
                </React.Fragment>
            ))} */}
            {/*hasNextPage && */ combinedMessages?.map((item: any) => (
                <Chat key={item._id} message={item}></Chat>
            ))}
        </div>
    );
};

export default ChatList;
