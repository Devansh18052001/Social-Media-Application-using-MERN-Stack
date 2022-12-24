import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../Post/Post'
// import { PostsData } from '../../Data/PostsData'
import {useDispatch,useSelector} from 'react-redux'
import { getTimelinePosts } from '../../Actions/postAction'
import { useParams } from 'react-router-dom'
// Single Post in vertical list of Posts
const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();
  // To Fetch Posts when application starts
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  if(!posts) return "No Posts!";
  if(AudioParam.id) posts = posts.filter((post)=>post.userId === params.id);
  return (
    <div className='Posts'>
        {loading? "Fetching Posts for You ...":
        posts.map((post, id)=>{
            return <Post key={id} data={post} id={id}/>;
        })}
    </div>
  )
}

export default Posts
