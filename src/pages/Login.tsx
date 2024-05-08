import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
    username: string;
}
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const onChangeUsername = (e: any) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e: any) => {
        setPassword(e.target.value);
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/login',
            { email, password },
            { withCredentials: true },
        ).then(() => {
            console.log("서버로 정보보냄")
            //여기 리다이렉트 코드 짜야 
            navigate('/');
        }).catch((err) => {
            console.log("로그인 실패?", err)
        })
    }
    const accessToken = () => {
        axios.get('http://localhost:8080/accesstoken', { withCredentials: true })
    }
    const refreshtoken = () => {
        axios.get('http://localhost:8080/refreshtoken', { withCredentials: true })
    }
    const logout = () => {
        axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true }
        ).then((result) => {
            if (result.status === 200) {
                console.log("로그아웃완료, 리다이렉트 해야")
                // 로그아웃이 성공했을 때 클라이언트에서 쿠키를 제거합니다.
                //document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                setIsLogin(false);
                setUser(null);
            }
        }).catch((error) => {
            console.log("로그아웃 실패?", error)
        });
    }
    const loginSuccess = () => {
        axios.get('http://localhost:8080/api/login/success', { withCredentials: true }
        ).then((result) => {
            if (result.data) {
                setIsLogin(true);
                setUser(result.data)
                //이거 누르면 메인페이지로 리다이렉트
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }
    // useEffect(() => {
    //     try {
    //         axios.get('http://localhost:8080/api/login/success', { withCredentials: true }
    //         ).then((result) => {
    //             if (result.data) {
    //                 console.log("tlqkf", result);
    //                 setIsLogin(true);
    //                 setUser(result.data)
    //             }
    //         }).catch((error: any) => {
    //             console.log(error)
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     console.log("대구리아파", isLogin, user)
    // }, [username, password])
    return (<>
        <div className="flex flex-col items-center justify-center h-screen">
            <header className="text-3xl font-bold mb-8">Open Chat</header>
            <form className="w-80" onSubmit={onSubmit}>
                <label className="block mb-4">
                    <span>이메일 주소</span>
                    <input type="username" id="username" name="username" value={email} onChange={onChangeUsername} className="input w-full mt-1 border border-gray-300 rounded-md" />
                </label>
                <label className="block mb-4">
                    <span>비밀번호</span>
                    <input type="password" id="password" name="password" value={password} onChange={onChangePassword} className="input w-full mt-1 border border-gray-300 rounded-md" />
                </label>
                <button type="submit" className="btn btn-primary w-full">로그인</button>
            </form>
            <div className="mt-4">
                아직 회원이 아니신가요?&nbsp;
                <a href="#" className="text-blue-500">회원가입 하러가기</a>
            </div>
            <div onClick={accessToken}>access token</div>
            <div onClick={refreshtoken}>refresh token</div>
            <div onClick={loginSuccess}>login success</div>
            {isLogin ? <div>
                <h3>{user?.username} 님이 로그인했습니다</h3>
            </div> : <div></div>}
            <div onClick={logout}>LogOut</div>

        </div>
    </>)
}
export default Login;