const Login = () => {

    return (<>
        <div className="flex flex-col items-center justify-center h-screen">
            <header className="text-3xl font-bold mb-8">Open Chat</header>
            <form className="w-80">
                <label className="block mb-4">
                    <span>이메일 주소</span>
                    <input type="email" id="email" name="email" className="input w-full mt-1 border border-gray-300 rounded-md" />
                </label>
                <label className="block mb-4">
                    <span>비밀번호</span>
                    <input type="password" id="password" name="password" className="input w-full mt-1 border border-gray-300 rounded-md" />
                </label>
                <button type="submit" className="btn btn-primary w-full">로그인</button>
            </form>
            <div className="mt-4">
                아직 회원이 아니신가요?&nbsp;
                <a href="#" className="text-blue-500">회원가입 하러가기</a>
            </div>
        </div>
    </>)
}
export default Login;