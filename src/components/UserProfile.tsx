import axios from "axios"
import { useEffect, useState } from "react"

interface User {
    id: number;
    username: string;
}
export const UserProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {//이걸 리액트 쿼리로 만들어서 빼야할듯
        try {
            axios.get('http://localhost:8080/accessToken', { withCredentials: true })
                .then((res) => {
                    setUser(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }, [])
    useEffect(() => {
        console.log('user: ', user)
    }, [user])
    return (
        <div>
            {user ? user.username : <div>로그인하세요</div>}
        </div>
    )
}
