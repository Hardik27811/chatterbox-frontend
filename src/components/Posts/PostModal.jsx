import React from 'react';
import { X } from 'lucide-react'; // or your SVG icon

const PostModal = ({ post, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-5 right-5 text-white hover:text-gray-300">
        <X size={32} />
      </button>

      {/* Main Modal Container */}
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-3xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE: The Image/Content */}
        <div className="w-full md:w-[60%] h-2/3 md:h-full lg:h-full  bg-black flex items-center justify-center border-r border-gray-100">
          {post.image ? (
            <img 
              src={post.image} 
              className="max-w-full max-h-full object-contain" 
              alt="Post content" 
            />
          ) : (
            <div className="p-10 text-white text-2xl italic text-center">
              {post.content}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: The Interactions (Header, Comments, Action Buttons) */}
        <div className="w-full md:w-[40%] flex flex-col h-full bg-white  overflow-y-auto ">
          {/* We pass your existing PostCard logic into here as children or a specific layout */}
          <div className="flex-1 overflow-y-auto p-6">
             {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;