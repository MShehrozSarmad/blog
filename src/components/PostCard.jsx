import React from 'react'
import dbService from '../appwrite/config'
import { Link } from 'react-router-dom'

const PostCard = ({
    $id,
    title, 
    featuredImage
}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="w-full justify-center mb-4">
                <img src={dbService.previewFile} alt="" className='rounded-xl'/>
            </div>
        </div>
        <h2 className="rounded-xl font-bold">
            {title}
        </h2>
    </Link>
  )
}

export default PostCard