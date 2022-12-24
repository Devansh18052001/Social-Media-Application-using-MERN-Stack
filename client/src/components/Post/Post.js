import React, { useState } from 'react'
import './Post.css'
import Comment from './../../img/comment.png'
import Share from './../../img/share.png'
import Heart from './../../img/like.png'
import NotLike from './../../img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../API/PostRequest'
const Post = ({data}) => {
  // Current User
  const { user } = useSelector((state) => state.authReducer.authData);
  // If Post is liked or not. if user_id is included in likes array then only 
  const [liked, setLiked]  = useState(data.likes.includes(user._id));
  // If Yes then No. of user liked it
  const [likes, setLikes] = useState(data.likes.length);
  // To Handle click on heart/like icon
  const handleLike = () =>{
    setLiked((prev)=>!prev);
    // sending data Id of Post and Id of user(who liked post) to server
    likePost(data._id, user._id);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1);;
  }
  return (
    <div className='Post'>
        <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image:""} alt=""/>
        <div className='postReact'>
            <img src={liked?Heart:NotLike} alt="Like" style={{cursor: "pointer"}} onClick = {handleLike}/>
            <img src={Comment} alt="Comment"/>
            <img src={Share} alt="Share"/>
        </div>
        <span style={{color:"var(--gray)",fontSize:'14px'}}>{likes} Likes</span>
        <div className='detail'>
            <span><b>{data.name}:- </b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post
