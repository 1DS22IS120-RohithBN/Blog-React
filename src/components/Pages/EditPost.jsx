import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Container from '../container/Container'
import PostForm from '../PostForm/PostForm'
import service from '../../appwrite/configuration'

function EditPost() {
    const [post, setPost] = useState([])
    const {slug}=useParams()
    const navigate=useNavigate()

    useEffect(() => {
        if(slug){
            service.getPost(slug)
            .then((post)=>{
            if(post){
                setPost(post)
                console.log(post)
            }
        else{
            navigate('/')
        }})
        
        }
      
    }, [slug,navigate])
    
  return post?(
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>

    </div>

  ):null
}

export default EditPost
