// SkeletonPost.jsx
import React from 'react';

const SkeletonPost = () => {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 w-full animate-pulse mb-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-2 w-16 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-[90%] bg-gray-200 rounded"></div>
      </div>

      {/* Image Skeleton */}
      <div className="w-full aspect-video bg-gray-100 rounded-2xl mb-4"></div>

      {/* Actions Skeleton */}
      <div className="flex items-center space-x-6 border-t border-gray-50 pt-4">
        <div className="h-4 w-12 bg-gray-100 rounded"></div>
        <div className="h-4 w-12 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonPost;