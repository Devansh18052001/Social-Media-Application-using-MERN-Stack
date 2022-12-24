import React, {useState} from 'react'
import './../FollowersCard/FollowersCard.css'
import {useDispatch,useSelector} from 'react-redux'
import "../FollowersCard/FollowersCard"
import { followUser, unFollowUser} from "../../Actions/userAction"
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
const User = ({person}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(person.followers.includes(user._id));
  // To Follow/Unfollow other users
const handleFollow = () => {
  following ? 
  dispatch(unFollowUser(person._id, user)) :
  dispatch(followUser(person._id,user));
  // change state after following
  setFollowing((prev)=>!prev);
};
  return (
    <div className='follower'>
        <div>
            <img src={person.profilePicture? serverPublic + person.profilePicture: serverPublic + "defaultProfile.png"} alt="usericon" className='followerImage'/>
            <div className='name'>
                <span>{person.firstname}</span>
                <span>@{person.username.split("@")[0]}</span>
            </div>
            <button className={following ? 'button fc-button UnfollowButton':'button fc-button'} onClick={handleFollow}>{following? "Unfollow": "Follow"}</button>
        </div>
        
    </div>
  );
};

export default User;
