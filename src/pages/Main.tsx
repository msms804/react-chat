import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import ChatRooms from "../components/ChatRooms";
import { UserProfile } from "../components/UserProfile";
import { useRef, useState } from "react";
import { Mypage } from "./Mypage";
import { useSelector, useDispatch } from "react-redux";
//import { RootState } from "@reduxjs/toolkit/";
import { RootState } from "../redux/store";
import { Outlet, Route, Routes } from "react-router-dom";
import { Empty } from "../components/Empty";
import Login from "./Login";
const Main = () => {
    const chatContainerRef = useRef(null);
    // const [selectedMenu, setSelectedMenu] = useState('mypage');
    const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
    const dispatch = useDispatch();
    return (<>
        <div className="flex h-screen">
            {/* <Sidebar /> */}
            <div className="w-1/6 bg-stone-800 text-white flex flex-col">
                <div className="mb-auto  ">
                    <div className="flex items-center border-b border-white-500 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path d="M8.543 2.232a.75.75 0 0 0-1.085 0l-5.25 5.5A.75.75 0 0 0 2.75 9H4v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h1.25a.75.75 0 0 0 .543-1.268l-5.25-5.5Z" />
                        </svg>

                        <div className="p-2">HOME</div>
                    </div>
                    <div className="flex items-center p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M1 8c0-3.43 3.262-6 7-6s7 2.57 7 6-3.262 6-7 6c-.423 0-.838-.032-1.241-.094-.9.574-1.941.948-3.06 1.06a.75.75 0 0 1-.713-1.14c.232-.378.395-.804.469-1.26C1.979 11.486 1 9.86 1 8Z" clipRule="evenodd" />
                        </svg>
                        <div className="p-2">chats</div>
                    </div>
                    <div className="flex items-center p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path d="M8 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.156 11.763c.16-.629.44-1.21.813-1.72a2.5 2.5 0 0 0-2.725 1.377c-.136.287.102.58.418.58h1.449c.01-.077.025-.156.045-.237ZM12.847 11.763c.02.08.036.16.046.237h1.446c.316 0 .554-.293.417-.579a2.5 2.5 0 0 0-2.722-1.378c.374.51.653 1.09.813 1.72ZM14 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM3.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 13c-.552 0-1.013-.455-.876-.99a4.002 4.002 0 0 1 7.753 0c.136.535-.324.99-.877.99H5Z" />
                        </svg>
                        <div className="p-2">contacts</div>
                    </div>
                    <div className="flex items-center p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                        </svg>
                        <div className="p-2">documents</div>
                    </div>
                    <div className="flex items-center p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M6.955 1.45A.5.5 0 0 1 7.452 1h1.096a.5.5 0 0 1 .497.45l.17 1.699c.484.12.94.312 1.356.562l1.321-1.081a.5.5 0 0 1 .67.033l.774.775a.5.5 0 0 1 .034.67l-1.08 1.32c.25.417.44.873.561 1.357l1.699.17a.5.5 0 0 1 .45.497v1.096a.5.5 0 0 1-.45.497l-1.699.17c-.12.484-.312.94-.562 1.356l1.082 1.322a.5.5 0 0 1-.034.67l-.774.774a.5.5 0 0 1-.67.033l-1.322-1.08c-.416.25-.872.44-1.356.561l-.17 1.699a.5.5 0 0 1-.497.45H7.452a.5.5 0 0 1-.497-.45l-.17-1.699a4.973 4.973 0 0 1-1.356-.562L4.108 13.37a.5.5 0 0 1-.67-.033l-.774-.775a.5.5 0 0 1-.034-.67l1.08-1.32a4.971 4.971 0 0 1-.561-1.357l-1.699-.17A.5.5 0 0 1 1 8.548V7.452a.5.5 0 0 1 .45-.497l1.699-.17c.12-.484.312-.94.562-1.356L2.629 4.107a.5.5 0 0 1 .034-.67l.774-.774a.5.5 0 0 1 .67-.033L5.43 3.71a4.97 4.97 0 0 1 1.356-.561l.17-1.699ZM6 8c0 .538.212 1.026.558 1.385l.057.057a2 2 0 0 0 2.828-2.828l-.058-.056A2 2 0 0 0 6 8Z" clipRule="evenodd" />
                        </svg>
                        <div className="p-2">settings</div>
                    </div>
                </div>
                <div className="mt-auto flex items-center p-2 m-2">
                    <div className="avatar">
                        <div className="w-7 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div className="ml-2"><UserProfile /></div>
                </div>

            </div>
            <div className="w-1/5 space-y-4">
                <ChatRooms />
            </div>
            {/**chatDetail.tsx?  */}
            {selectedMenu === 'chat' && (
                <div className="w-2/3 bg-zinc-100 flex flex-col">
                    <div className="bg-white">to: JHwan</div>
                    <Outlet />
                    {/* <Routes>
                        <Route path="/chats/empty" element={<Empty />} />
                        <Route path="/chats/:roomId" element={<ChatList forwardedRef={chatContainerRef} />} />
                    </Routes> */}
                    {/* <ChatList forwardedRef={chatContainerRef} />
                    <ChatBox chatContainerRef={chatContainerRef} /> */}
                    <ChatBox chatContainerRef={chatContainerRef} />
                </div>
            )}

            {selectedMenu === 'mypage' && (
                <div className="w-2/3 bg-zinc-100 flex flex-col">
                    <Mypage />
                </div>
            )}
            {//안되잖아 썅
                // <div className="w-2/3 bg-zinc-100 flex flex-col">
                //     <Route path='/mypage' element={<Mypage />} />
                //     <Route path="/login" element={<Login />} />
                // </div>
            }
        </div>
    </>)
}
export default Main;