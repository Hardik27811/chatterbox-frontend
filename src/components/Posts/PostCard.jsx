import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeUnlikeUserPost, addUserComment, deleteUserComment, deleteUserPost, updateUserPost, editUserComment } from '../../redux/postSlice';
import PostModal from './PostModal';
import SkeletonPost from './SkeletonPost';


const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.post)
  const currentUserName = user?.name;
  const currentUserId = user?._id || user?.id;


  const [comment, setComment] = useState('');

  const handleLike = (e) => {
     e.preventDefault();
    dispatch(likeUnlikeUserPost(post._id));
  }
  const handleDelete = (e) => {
     e.preventDefault();
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deleteUserPost(post._id));
    }
  }
  const isLiked = post.likes?.some((like) => {
    if (typeof like === "string") return like === currentUserId;
    if (typeof like === "object") return like._id === currentUserId;
    return false;
  });

  const handleComment = async (e) => {
     e.preventDefault();
    if (!comment.trim()) {
      return alert('Add Comment')
    }
    const res = await dispatch(addUserComment({ postId: post._id, text: comment }))
    if (addUserComment.fulfilled.match(res)) {
      setComment('');
    }
  };
  const handleDeleteComment = async (e,commentId) => {
     e.preventDefault();
    if (window.confirm("Are you want to delete this comment?")) {
      dispatch(deleteUserComment({ postId: post._id, commentId: commentId }));
    }
  }

  const [editingCommentId, setEditingCommentId] = useState(null); // Tracks WHICH comment is being edited
  const [editValue, setEditValue] = useState('');
  const startEditing = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditValue(currentText);
  };
  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditValue('');
  };


  const handleSaveEdit = async (e,commentId) => {
    e.preventDefault();
    if (!editValue.trim()) return;

    const res = await dispatch(editUserComment({
      postId: post._id,
      commentId: commentId,
      text: editValue
    }));

    if (editUserComment.fulfilled.match(res)) {
      setEditingCommentId(null); // Close the input on success
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(()=>{
    if(isModalOpen){
      document.body.style.overflow = 'hidden' //Disable scroll
    }
    else {
      // Re-enable scroll when modal closes
      document.body.style.overflow = 'unset';
    }
  },[isModalOpen])

  // console.log(post);
  if(loading){
    <SkeletonPost/>
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
      {/* Header: User Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
            {post.author?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h4 className="font-bold text-gray-800">{post.author?.name}</h4>
            <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Delete button only for owner */}
        {currentUserId === post.author?._id && (
          <button onClick={(e)=>handleDelete(e)} className="text-gray-500 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
      {post.image && (
        <div className="w-full bg-gray-50 flex items-center justify-center overflow-hidden border-y border-gray-50">
          {/* aspect-video: ensures a 16:9 ratio. You can use aspect-square for 1:1.
              bg-black: this fills the "extra space" you mentioned.
          */}
          <div className="w-full aspect-video bg-black/90 flex items-center justify-center">
            <img 
              src={post.image} 
              alt="Post content" 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        </div>
      )}

      {/* Actions: Like & Comment */}
      <div className="flex items-center space-x-6 border-t border-gray-50 pt-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 transition-colors ${isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="font-bold text-sm">{post.likes?.length || 0}</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-400 hover:text-emerald-500 transition-colors"
         onClick={() => setIsModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="font-bold text-sm">{post.comments?.length || 0}</span>
        </button>
        
      </div>


      {isModalOpen && (
        <PostModal post={post} onClose={() => setIsModalOpen(false)}>
        <div className="mt-4 pt-4  border-t border-gray-50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">

          {/* Comment Input Box */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={comment}
              placeholder="Write a comment..."
              className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button
              disabled={loading || !comment.trim()}
              onClick={(e)=>handleComment(e)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${!comment.trim()
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95'
                }`}
            >
              {loading ? '...' : 'Post'}
            </button>
          </div>

          {/* Comments List */}
          <div className="max-h-[400px] overflow-y-auto space-y-3 border-t border-gray-50 pt-4 pr-2 custom-scrollbar">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment._id} className="flex space-start space-x-3 group/comment">
                  {/* Small Avatar */}
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">
                    {comment.user?.name?.charAt(0) || 'U'}
                  </div>

                  {/* Comment Bubble */}
                  {/* <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-2 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-gray-800">{comment.user?.name}</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                     <div className='flex justify-between gap-1.5'>
                       <p className="text-sm text-gray-600 mt-0.5">{comment.text}</p>
                     <div className='text-sm text-gray-600 mt-0.5 flex justify-end-safe gap-1.5 ' > 
                      <button onClick={()=>handleEditComment(comment._id)} className='hover:text-yellow-400'>Edit</button>
                      <button onClick={()=>handleDeleteComment(comment._id)} className='hover:text-red-500'>Delete</button></div>
                    </div>
                     </div> */}
                  <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-2 flex-1 transition-colors hover:bg-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-gray-800">{comment.user?.name}</span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {editingCommentId === comment._id ? (
                      // --- EDIT MODE ---
                      <div className="mt-2 space-y-2">
                        <input
                          type="text"
                          value={editValue}
                          required
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full bg-white border border-emerald-300 rounded-lg px-2 py-1 text-sm outline-none"
                          autoFocus
                        />
                        <div className="flex space-x-2 text-xs font-bold">
                          <button onClick={(e) => handleSaveEdit(e,comment._id)} className="text-emerald-600 hover:underline">SAVE</button>
                          <button onClick={cancelEdit} className="text-gray-400 hover:underline">CANCEL</button>
                        </div>
                      </div>
                    ) : (
                      // --- VIEW MODE ---
                      <div className="flex justify-between gap-1.5">
                        <p className="text-sm text-gray-600 mt-0.5">{comment.text}</p>

                        {/* Show Edit/Delete ONLY if it's the user's comment or post owner */}
                    
                      <div className="text-sm text-gray-400 mt-0.5 flex gap-1.5 items-end">
                         {currentUserId === (comment.user?._id || comment.user) && (
                        <button
                          onClick={() => startEditing(comment._id, comment.text)}
                          className="hover:text-emerald-500"
                        >
                          Edit
                        </button>
                        )}
                       {(currentUserId === (comment.user?._id ) || currentUserId === post.author?._id)&&
                        (<button
                          onClick={(e) => handleDeleteComment(e,comment._id)}
                          className="hover:text-red-500"
                        >
                          Delete
                        </button>)
                       }
                      </div>


                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-gray-400 py-2">No comments yet. Be the first!</p>
            )}
          </div>

        </div>
        </PostModal>
      )}
      {/* {dropDown && <div>hello</div>} */}

    </div>
  )
}

export default PostCard