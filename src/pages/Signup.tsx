const SignUp = () => {

    return (<>
        <>
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
                    <label className="block mb-4">
                        <span>비밀번호 확인</span>
                        <input type="password" id="password" name="password-check" className="input w-full mt-1 border border-gray-300 rounded-md" />
                        {<div className="text-sm">비밀번호가 일치하지 않습니다.</div>}
                        {<div className="text-sm">닉네임을 입력해주세요.</div>}
                        {<div className="text-sm">이미 가입된 이메일입니다.</div>}
                        {<div className="text-sm">회원가입되었습니다! 로그인해주세요</div>}
                    </label>
                    <button type="submit" className="btn btn-primary w-full">회원가입</button>
                </form>
                <div className="mt-4">
                    이미 회원이신가요?&nbsp;
                    <a href="#" className="text-blue-500">로그인 하러가기</a>
                </div>
            </div>
        </>
    </>)
}
export default SignUp;