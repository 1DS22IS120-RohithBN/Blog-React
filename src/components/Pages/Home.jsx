import React, { useEffect, useState } from 'react';
import service from '../../appwrite/configuration';
import Container from '../container/Container';
import PostCard from '../PostCard';

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
            <p>No posts available</p> // Optional: Handle empty state
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
