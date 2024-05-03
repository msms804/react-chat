import React from "react";
import { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

// 사용할 Chat 데이터 타입 정의
interface ChatData {
    _id: string;
    username: string;
    message: string;
    sendDate: string;
    userId: string;
}
/*
    1. intersection observer react? 라이브러리로 쓰자
    2. getNextPageParam으로 해도될듯..? previous말고
    3. 마지막페이지일때 어떻게 처리할건지
    4. state갱신 --> 2차원배열을 아마 1차원으로 바꾸려면 flat함수 써야할듯
    5. 그리고 렌더링할때 아마 또 리버스로 렌더링해야할지도?
*/
const ChatList = () => {
    const [messages, setMessages] = useState<ChatData[]>([]); // 채팅 메시지를 담을 상태
    const observer = useRef<IntersectionObserver | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // 무한 스크롤을 위한 데이터 가져오기 함수
    const fetchChats = async (pageParam: number) => {
        try {//이건 그.. 모냐.. 다른파일로 연습하구..
            console.log("pageParam 찍어봄", pageParam)
            const response = await axios.get(`http://localhost:8080/api/chats/list?page=${pageParam}&pageSize=10`);
            const data = response.data;
            //요기서 데이터(state) 갱신해야할듯

            return data; // 페이지 형식으로 반환
        } catch (error) {
            console.log("Error fetching chats", error);
            throw error;
        }
    };//오.. 된다 근데 이거 어케고쳐 씨발
    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<ChatData[], Error>({
        queryKey: ['chats'],
        queryFn: ({ pageParam }) => fetchChats(pageParam as number),
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
        //getPreviousPageParam: (firstPage) => firstPage.at(0)?.messagdId,
        initialPageParam: 1,
    })


    useEffect(() => {
        const fetchInitialMessages = () => {
            try {
                // const response = await axios.get('http://localhost:8080/api/chats/list?page=1&pageSize=20');
                // setMessages(response.data);

                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchInitialMessages();//왜 끼발 밑에 고정안돼 ;;

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
    const forTest = () => {
        console.log(data?.pages[0].reverse());
    }
    const flatData = data?.pages?.flat().reverse();
    return (
        <div ref={chatContainerRef} className="mb-auto overflow-auto">
            <p id="observer">옵저버</p>
            {/* messages 상태에 있는 데이터로 Chat 컴포넌트 렌더링 */}
            {/* {messages && messages.length > 0 && messages.map((item: ChatData) => <Chat key={item._id} message={item} />)} */}
            {/* {data?.pages?.map((page: any) => (
                <React.Fragment>
                    {page.reverse().map((item: any) => (
                        <Chat key={item._id} message={item} />
                    ))}
                </React.Fragment>
            ))} */}
            {flatData?.map((item: any) => (
                <Chat key={item._id} message={item}></Chat>
            ))}
            <button onClick={forTest}>테스트용</button>

        </div>
    );
};

export default ChatList;
