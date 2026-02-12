import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {fetchAllPosts} from '../redux/postSlice';
import PostCard from '../components/Posts/PostCard';
import NotFound from '../pages/NotFound';
import SkeletonPost from './Posts/SkeletonPost';


const Feed = () => {
    const dispatch = useDispatch();
    const {loading ,posts , error} = useSelector((state)=>state.posts);
    useEffect(()=>{
         dispatch(fetchAllPosts());
    },[dispatch])
    if(loading){
        // return <div className="text-center mt-10 text-emerald-600 font-bold">Loading Feed...</div>;
    }
    if(error){
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }
  return (
    <div className='flex flex-col items-center justify-center  w-full max-w-3xl  mx-auto space-y-6'>
        {loading && posts.length === 0 ? (
            <>
            <SkeletonPost/>
            <SkeletonPost/>
            <SkeletonPost/>

            </>
        ):(posts && posts.length >0 ? (
            posts.map((post)=> (
                <PostCard key={post._id} post={post}/>
            ))
        ) :(<p className="text-gray-500 text-center">No posts yet. Be the first to share something!</p>))}
    </div>
  )
}

export default Feed