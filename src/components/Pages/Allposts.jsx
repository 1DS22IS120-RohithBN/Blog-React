import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard'
import Container from '../container/Container'
import service from '../../appwrite/configuration'

function Allposts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    service.getPosts().then((response) => {
      if (response && response.documents) {
        setPosts(response.documents)
      }
    }).catch(error => {
      console.error("Error fetching posts:", error)
    });
  }, [])

  return (
    <div className='py-8 w-full'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Allposts
