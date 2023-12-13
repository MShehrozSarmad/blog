import React, {useEffect, useState} from 'react'
import { Container, PostForm } from '../components/index'
import dbService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'


const EditPost = () => {

    const [post, setPost] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            dbService.getPost(slug).then((posst) => {
                posst ? setPost(posst) : null
            })
        }else{
            navigate('/')
        }
    } ,[slug, navigate])

  return post ? (
    <div className="py-8">
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null;
}

export default EditPost