import React from 'react'
import ProfileCard from './../../components/ProfileCard/ProfileCard'
import PostSide from './../../components/PostSide/PostSide'
import ProfileLeftSide from '../../components/ProfileLeftSide/ProfileLeftSide'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
const Profile = () => {
  return (
    <div className='Profile'>
      {/* 1st Part */}
      <ProfileLeftSide/>
      {/* 2nd Part */}
      <div className="Profile-center">
        <ProfileCard location = 'profilePage'/>
        <PostSide/>
      </div>
      {/* 3rd Part (trend card) */}
      <RightSide/>
    </div>
  )
}

export default Profile
