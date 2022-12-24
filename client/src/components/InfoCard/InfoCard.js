import React, { useEffect, useState } from 'react'
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../API/UserRequest.js'
import { logout } from '../../Actions/AuthAction';
const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  
  const { user } = useSelector((state) => state.authReducer.authData);
  const profileUserId = params.id;
  console.log(user)
  const [profileUser, setProfileUser] = useState({});
  const handleLogOut = ()=> {
    dispatch(logout())
  };
  useEffect(() => {
    const fetchProfileUser = async() => {
      // If user clicks on its own profile card
      if(profileUserId === user._id){
        setProfileUser(user);
      }
      // if user clicks on other's profile card
      else{
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    }
    fetchProfileUser();
  },[user]);
  
  return (
    <div className='InfoCard'>
      <div className='infoHead'>
        <h3>Profile Information</h3>
        {user._id  === profileUserId ?(
        <div>
          <UilPen width="2rem" height="1.2rem" onClick={()=>setModalOpened(true)}/>
          <ProfileModal modalOpened ={modalOpened} setModalOpened={setModalOpened} data = {user}/>
        </div>
        ):("")}
      </div>

      {/* 1st Info head */}
      <div className='info'>
        <span>
          <b>Status : </b>
        </span>
        <span>
          {profileUser.relationship}
        </span>
      </div>
      {/* 2nd Info */}
      <div className='info'>
        <span>
          <b>Lives in : </b>
        </span>
        <span>
        {profileUser.livesin}
        </span>
      </div>
      {/* 3rd Info */}
      <div className='info'>
        <span>
          <b>Works At : </b>
        </span>
        <span>
        {profileUser.worksat}
        </span>
      </div>
      {/* Log out */}
      <button className='button logout-button' onClick={handleLogOut}>Log out</button>
    </div>
  )
}

export default InfoCard
