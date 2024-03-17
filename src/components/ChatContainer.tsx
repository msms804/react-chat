import React from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";

const ChatContainer = () => {
    return (<>
        {/*Header */}
        <div className="flex flex-col">
            <div>
                <span>To:</span>
                <span>Minsung</span>
            </div>
            <ChatList />
            <ChatBox />
        </div>
    </>)
}
export default ChatContainer;