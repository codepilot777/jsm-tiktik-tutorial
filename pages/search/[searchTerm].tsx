import React, { useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import { BASE_URL } from '../../utils'
import useAuthStore from '../../store/authStore';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';


const Search = ({ videos } : { videos: Video[]}) => {
  const { allUsers } = useAuthStore();
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const [isAccounts, setIsAccounts] = useState(false)

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'

  const searchAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-full">
      <div className="flex w-full gap-10 mt-10 mb-10 bg-white border-b-2 border-gray-200">
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>
          Accounts
        </p>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccounts(false)}>
          Videos
        </p>
      </div>      
        {
          isAccounts ? (
            <div className="md:mt-16">
              {
                searchAccounts.length > 0 ? (
                  searchAccounts.map((user: IUser, idx) => (<Link href={`/profile/${user._id}`} key={idx}>
                  <div className="flex gap-3 p-2 font-semibold border-b-2 border-gray-200 rounded cursor-pointer ">
                    <div className="w-8 h-8">
                      <Image 
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user profile"
                      layout="responsive" />
                    </div>
                    <div className="hidden xl:block">
                      <p className="flex items-center gap-1 font-bold lowercase text-md text-primary">
                        {user.userName.replace(' ','')}
                        <GoVerified className="text-blue-400" />
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </Link>
                ))) : <NoResults text="No Accounts" />
              }
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 md:mt-16 md:justify-start">
              {
                videos.length ? (
                  videos.map((video: Video, idx:number) => (
                    <VideoCard post={video} key={idx} />
                  ))
                ) : <NoResults text={`No video results for ${searchTerm}`} />
              }
            </div>
          )
        }
    </div>
  )
}

export const getServerSideProps = async ({ params: {searchTerm}}: { params: {searchTerm:string}}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

  return {
    props : {
      videos: res.data,
    }
  }  
}

export default Search