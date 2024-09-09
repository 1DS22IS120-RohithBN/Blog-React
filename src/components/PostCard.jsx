import React from 'react'
import service from '../appwrite/configuration'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  const filePreviewUrl = featuredImage ? service.getFilePreview(featuredImage) : '';

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full hover:p-2 bg-[#e4f9ef] p-3 rounded-xl shadow-md shadow-slate-600 border-slate-800">
        <div className='w-full justify-center mb-4'>
          {filePreviewUrl ? (
            <img src={filePreviewUrl} alt={title} className='rounded-xl bg-contain h-32 w-52 ml-9 mt-2 ' />
          ) : (
            <div className='bg-gray-300 rounded-xl w-full h-48 flex items-center justify-center'>
              <span>No Image</span>
            </div>
          )}
        </div>
        <h1 className='text-xl font-bold'>{title}</h1>
      </div>
    </Link>
  )
}

export default PostCard
