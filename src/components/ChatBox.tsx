import React from "react";

const ChatBox = () => {
    return (<>
        <form>
            <div>
                <input
                    type="text"
                    placeholder="메시지 치는곳"
                />
                <button type="submit">
                    전송
                </button>
            </div>
        </form>
    </>)
}
export default ChatBox;