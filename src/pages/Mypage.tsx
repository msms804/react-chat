import React, { useEffect, useId, useState } from 'react'
import axios from 'axios'
import useUserData from '../queries/user'
import ProfileEditModal from '../components/ProfileEditModal'

export const Mypage = () => {
    //유저정보 불러오는건 자주 있으니까 리액트 쿼리로 빼도될듯
    //메인페이지에 왼쪽 하단에 있는 유저도 useQuery쓰는 방법으로 바꾸기
    const { isLoading, error, data } = useUserData();
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newComment, setNewComment] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openEdit = () => {
        console.log(data)
        setIsEditProfile(true);

        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const handleEditUsername = (e: any) => {
        setNewUsername(e.target.value);
    }
    const handleEditComment = (e: any) => {
        setNewComment(e.target.value);
    }

    const handleProfileImgChange = (e: any) => {
        //axios.put()
        /**
         * 1. 현재 로그인한 나의 정보를 알아야 그 사람의 디비의 사진 변경가능
         * --> data.Id
         */
        const file = e.target.files[0];//이거도 로그 찍어보자
        console.log(file);
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
            console.log([...formData]);
            await axios.put('http://localhost:8080/api/change/profileImg', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-User-Id': data._id,
                    }
                }
            )
            await axios.put('http://localhost:8080/api/change/user', { newUsername, newComment, userId: data._id })
            setNewUsername("");
            setNewComment("");
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(selectedFile);//잘됨
    }, [setSelectedFile])
    //useEffect(() => {}, [])   //수정하고 이름, 코멘트 화면에서 즉시 바꿀라면 어케함;;
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
                    <div className='ml-12 mt-6'>{data.comment}</div>
                </div>
                <div className=' h-3/4'>

                    {/* {isEditProfile && <input type="file" name="profileImg" accept="image/*" onChange={handleProfileImgChange} />}
                    {isEditProfile && <input type='text' name='username' onChange={handleEditUsername} value={newUsername} />}
                    {isEditProfile && <input type='text' name='comment' onChange={handleEditComment} value={newComment} />}
                    <button onClick={handleUpload}>변경</button> */}
                    <br />
                    <div className='rounded-md bg-stone-700 text-white inline-block py-2 px-4 mt-4 ml-4'>chat</div>
                    <div className='rounded-md bg-stone-700 text-white inline-block py-2 px-4 mt-4 ml-4' onClick={openEdit}>프로필 편집</div>
                    <ProfileEditModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        handleProfileImgChange={handleProfileImgChange}
                        handleEditUsername={handleEditUsername}
                        handleEditComment={handleEditComment}
                        handleUpload={handleUpload}
                        newUsername={newUsername}
                        newComment={newComment}
                    />
                </div>
            </div>
        </div>
    )
}
