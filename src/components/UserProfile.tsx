import axios from "axios"
import { useEffect, useState } from "react"
import useUserData from "../queries/user";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setSelectedMenu } from "../redux/store";


export const UserProfile = () => {
    //const [user, setUser] = useState<User | null>(null);
    const { isLoading, error, data } = useUserData();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu)

    const onClickChangePage = (menu: string) => {
        //navigate('/mypage')
        dispatch(setSelectedMenu(menu))
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            {/* {user ? user.username : <div>로그인하세요</div>} */}
            <div className="text-sm" onClick={() => { onClickChangePage('mypage') }}>{data.username}</div>
        </div>
    )
}
