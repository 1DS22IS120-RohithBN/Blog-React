import React from 'react'
import service from '../appwrite/configuration'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  const filePreviewUrl = featuredImage ? service.getFilePreview(featuredImage) : '';

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 p-4 rounded-xl">
        <div className='w-full justify-center mb-4'>
          {filePreviewUrl ? (
            <img src={filePreviewUrl} alt={title} className='rounded-xl' />
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
