import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyPosts } from '../redux/postSlice'
import PostCard from '../components/Posts/PostCard'
import { useNavigate } from 'react-router-dom'
import SkeletonPost from '../components/Posts/SkeletonPost'
const Profile = () => {
  const { myPosts, loading } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);
// console.log(myPosts);

  return (
    <div className="flex flex-col items-center w-full max-w-full mx-auto py-8 px-5">
      {/* Profile Header */}
      <div className=" w-full  px-5 flex  mb-8 justify-start space-x-4  max-w-4xl items-start">
        <div className="lg:w-46 lg:h-46 md:h-36 md:w-36 sm:w-30 sm:h-30 h-20 w-20 bg-emerald-100   rounded-full flex items-center border-3 border-emerald-600 justify-center text-emerald-600 text-3xl font-black lg:mb-4 md:mb-4 mb-0">
          {user?.name?.charAt(0)}
        </div>
       <div className='flex flex-col lg:mt-10 md:mt-8 sm:mt-6 mt-3 '>
         <h1 className="lg:text-3xl md:text-lg sm:text-lg text-sm font-black text-gray-800">{user?.name}</h1>
        <p className="text-gray-400 sm:text-md lg:text-lg md:text-sm text-xs">{user?.email}</p>
       </div>
      </div>

      {/* User's Posts Feed */}
      <div className="w-full lg:pl-10 xl:pr-40  ">
        {/* <h2 className="text-lg font-bold text-gray-800 px-4">My Posts</h2> */}
       <div className='grid  md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-1 md:gap-4'>
         {loading && myPosts.length === 0 ? (
          // <p className="text-center text-gray-400">Loading your posts...</p>
          <>
          <SkeletonPost/>
          <SkeletonPost/>
          <SkeletonPost/>
          <SkeletonPost/>
          <SkeletonPost/>
          <SkeletonPost/>
          </>
  
        ) : myPosts.length > 0 ? (
          myPosts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-center text-gray-400">You haven't posted anything yet.</p>
        )}
       </div>
      </div>
    </div>
    
  )
}

export default Profile;