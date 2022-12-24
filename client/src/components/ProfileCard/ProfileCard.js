import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cover from './../../img/cover.jpg'
import Profile from './../../img/me.jpg'
import './ProfileCard.css'
const ProfileCard = ({location}) => {
    const {user} = useSelector((state)=>state.authReducer.authData);
    const posts = useSelector((state)=>state.postReducer.posts);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='ProfileCard'>
        <div className='ProfileImages'>
            <img src={user.coverPicture? serverPublic + user.coverPicture: serverPublic + "cover.jpg"} alt="Cover"/>
            <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic + "defaultProfile.png"} alt="Profile"/>
        </div>
        <div className='ProfileName'>
            <span><h2>{user.firstname} {user.lastname}</h2></span>
            <span>@{user.username.split('@')[0]}</span>
            <span>{user.worksat? user.worksat:"Write About Your Job or School"}</span>
        </div>
        <div className='follower'>
            <hr/>
            <div>
                <div className='follow'>
                    <span>{user.followers.length}</span>
                    <span>Followers</span>
                </div>
                <div className='vl'></div>
                <div className='follow'>
                    <span>{user.following.length}</span>
                    <span>Following</span>
                </div>
                {location === "profilePage" && (
                <>
                    <div className='vl'></div>
                    <div className='follow'>
                        <span>{posts.filter((post)=>post.userId === user._id).length}</span>
                        <span>Posts</span>
                    </div>
                </>
        )}
            </div>
            <hr/>
        </div>
        
        {location === "profilePage" ? "" : 
        (<span>
            <Link style={{textDecoration : "none", color: 'inherit'}} to = {`/profile/${user._id}`}>
                My Profile
            </Link>
        </span>)}
    </div>
  )
}

export default ProfileCard
