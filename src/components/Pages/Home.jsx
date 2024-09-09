import React, { useEffect, useState } from 'react';
import service from '../../appwrite/configuration';
import Container from '../container/Container';
import PostCard from '../PostCard';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    service.getPosts().then((response) => {
      // Ensure the response is valid and contains documents
      if (response && response.documents) {
        setPost(response.documents);
      } else {
        setPost([]); // Fallback to an empty array if there's no data
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className='flex flex-col ml-28'>
            <p className='text-4xl text-center ml-96 mt-16'>No posts available</p>
            <Link to='/login'>
            <p className='mt-16 text-[#16423C] ml-96 text-3xl'><u>Click here to get started</u></p></Link>
            
            </div> // Optional: Handle empty state
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
