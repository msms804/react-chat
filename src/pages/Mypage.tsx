import React, { useEffect, useId, useState } from 'react'
import axios from 'axios'
import useUserData from '../queries/user'
export const Mypage = () => {
    //유저정보 불러오는건 자주 있으니까 리액트 쿼리로 빼도될듯
    //메인페이지에 왼쪽 하단에 있는 유저도 useQuery쓰는 방법으로 바꾸기
    const { isLoading, error, data } = useUserData();
    const [selectedFile, setSelectedFile] = useState(null);

    //머리아프다.. 이미지 업로드부터 해보자
    const handleProfileImgChange = async (e: any) => {
        //axios.put()
        /**
         * 1. 현재 로그인한 나의 정보를 알아야 그 사람의 디비의 사진 변경가능
         * --> data.Id
         * 2. <input>태그에 이미지 올리면
         * 3. 그 이미지 서버로 보냄
         * 4. 이미지 s3에 저장
         * 5. 이미지 url 받아서 디비 저장
         */
        const file = e.target.files[0];//이거도 로그 찍어보자
        setSelectedFile(file);
    }
    const handleUpload = async () => {
        try {
            if (!selectedFile) {
                console.error('파일선택하세요');
                return;
            }
            const formData = new FormData();
            formData.append('profileImg', selectedFile);
            await axios.put('http://localhost:8080/api/change/profileImg', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log(selectedFile);//잘됨
    }, [setSelectedFile])
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    return (
        <div>
            <div className='flex flex-col h-screen'>
                <div className='bg-blue-200 h-1/4' style={{ backgroundImage: `url(${data.backgroundImg})`, backgroundSize: 'cover' }}>
                    <div className='rounded-full bg-orange-100 w-32 h-32 flex items-center justify-center mt-28 ml-10'>
                        <img className="rounded-full" src={data.profileImg} />
                    </div>
                    <div className='ml-12 mt-6 text-2xl font-semibold'>
                        {data.username}
                    </div>
                    <div className='ml-12 mt-6'>comment</div>

                    <div className='rounded-md bg-stone-700 text-white inline-block py-2 px-4 mt-4 ml-4'>chat</div>
                    <div className='rounded-md bg-stone-700 text-white inline-block py-2 px-4 mt-4 ml-4'>프로필 편집</div>
                    {/* <form>
                        <input type='file' name='img1' accept='image/*' onChange={handleProfileImgChange} />
                        <button onClick={handleUpload}>프사 변경</button>
                    </form> */}

                </div>
                <div className=' h-3/4'>
                    {/* 왜 위에 있을땐 않됬음..? 머리 쥰내아픔 */}
                    <input type="file" name="profileImg" accept="image/*" onChange={handleProfileImgChange} />
                    <button onClick={handleUpload}>변경</button>
                </div>
            </div>
        </div>
    )
}
