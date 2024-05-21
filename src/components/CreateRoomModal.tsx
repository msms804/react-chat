import React, { useEffect, useRef, useState } from 'react'
import useMembersData from '../queries/members';
import axios from 'axios';
//import {CheckIcon} from '@heroicons/react';
interface CreateRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
}
/**
 * 1. membersData 어디서 가져와야?(chatrooms or modal)
 * 2. 여기서 가져와도될듯.. ㅇㅇ
 * 3. 렌더링
 * 4. 클릭한것을 state로 저장(ui도 신경써야, 체크표시, circular button)
 * 5. 저장한것을 db로 post요청해서 rooms에 저장
 * 
 */
export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { isLoading: membersLoading, error: membersError, data: membersData } = useMembersData();
    const [selectedMembers, setselectedMembers] = useState<string[]>([]);

    const handleClickOutside = (e: MouseEvent) => {
        console.log("바깥쪽 클릭")
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    }
    const onClickCreate = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/create/room', {
                roomName: "",
                members: selectedMembers,
            })
            console.log(response.data);
            console.log(selectedMembers);
            setselectedMembers([]);
        } catch (error) {
            console.log(error)
        }
        onClose();
    }
    const onClickMember = (email: string) => {
        //만약 username이 selectedMembers에 없으면 state에 추가
        setselectedMembers(prev => {
            if (prev.includes(email)) {
                return prev.filter(friend => friend !== email)
            }
            else {
                return [...prev, email]
            }
        })


    }
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen])
    if (!isOpen) return null;

    return (
        <div
            className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-10'
        >
            <div ref={modalRef} className='bg-white p-8 rounded-sm w-80'>
                <div>친구목록</div>
                {membersData && membersData.map((item: any, key: any) => <div
                    key={key}
                    onClick={() => onClickMember(item.email)}
                    className='flex justify-between items-center cursor-pointer p-2'
                >
                    <div className='flex flex-row items-center'>
                        <img src={item.profileImg} className='w-8 h-8 rounded-full' />
                        <span className='text-sm'>{item.username}</span>
                    </div>
                    {selectedMembers.includes(item.email) ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    }

                </div>)}
                <div className='flex justify-end mt-4'>
                    <button
                        className='p-2 bg-slate-200 text-slate-800 text-sm font-medium rounded-sm'
                        onClick={onClickCreate}
                    >
                        생성
                    </button>
                </div>
            </div>
        </div>
    )
}


