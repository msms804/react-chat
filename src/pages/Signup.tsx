import axios from "axios";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }
    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        //console.log(email, username, password)
        //디비에 저장해야할것 : 이름 이멜 비번 생성일(은 굳이?) 
        //그리고 프로필이미지, 상메는 null? --> 이건 기본이미지로 세팅해야
        //axios.post
        axios.post('http://localhost:8080/api/signup', { email, password, username })
            .then((response) => {
                console.log(response);
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                navigate('/login');
            })
            .catch((error) => console.log(error))

    }
    return (<>
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <header className="text-3xl font-bold mb-8">Open Chat</header>
                <form className="w-80" onSubmit={onSubmit}>
                    <label>
                        <span>이름</span>
                        <input
                            type="name"
                            id="name"
                            name="name"
                            className="input w-full mt-1 border border-gray-300 rounded-md"
                            value={username}
                            onChange={onChangeName}
                        />
                    </label>
                    <label className="block mb-4">
                        <span>이메일 주소</span>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="input w-full mt-1 border border-gray-300 rounded-md"
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </label>
                    <label className="block mb-4">
                        <span>비밀번호</span>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="input w-full mt-1 border border-gray-300 rounded-md"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </label>
                    <label className="block mb-4">
                        <span>비밀번호 확인</span>
                        <input
                            type="password"
                            id="password"
                            name="password-check"
                            className="input w-full mt-1 border border-gray-300 rounded-md"
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                        />
                        {<div className="text-sm">비밀번호가 일치하지 않습니다.</div>}
                        {<div className="text-sm">닉네임을 입력해주세요.</div>}
                        {<div className="text-sm">이미 가입된 이메일입니다.</div>}
                        {<div className="text-sm">회원가입되었습니다! 로그인해주세요</div>}
                    </label>
                    <button type="submit" className="btn btn-primary w-full">회원가입</button>
                </form>
                <div className="mt-4">
                    이미 회원이신가요?&nbsp;
                    {/* <a href="#" className="text-blue-500">로그인 하러가기</a> */}
                    <Link to='/login'>로그인 하러가기</Link>
                </div>
            </div>
        </>
    </>)
}
export default SignUp;