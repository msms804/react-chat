import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
export const Mypage = () => {
    //유저정보 불러오는건 자주 있으니까 리액트 쿼리로 빼도될듯
    //메인페이지에 왼쪽 하단에 있는 유저도 useQuery쓰는 방법으로 바꾸기

    return (
        <div>
            <div className='flex flex-col h-screen'>
                <div className='bg-blue-200 h-1/4'>
                    <div className='rounded-full bg-orange-100 w-32 h-32 flex items-center justify-center mt-28 ml-10'>profile img</div>
                    <div className='ml-12 mt-6 text-2xl font-semibold'>권민성</div>
                    <div>comment</div>
                    <div className='rounded-md bg-stone-700 text-white inline-block py-2 px-4 mt-4 ml-4'>chat</div>
                </div>
                <div className=' h-3/4'></div>
            </div>
            {/* <div>프사</div>
            <div>chat</div>
            <div>comment</div> */}
        </div>
    )
}
