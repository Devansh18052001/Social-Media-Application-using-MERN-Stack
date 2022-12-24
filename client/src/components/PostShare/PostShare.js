import React,{useState,useRef} from 'react'
import ProfileImage from './../../img/me.jpg'
import './PostShare.css'
import {UilScenery,UilPlayCircle,UilLocationPoint,UilSchedule,UilTimes} from '@iconscout/react-unicons'
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../Actions/UploadAction";
const PostShare = () => {
    const {user} = useSelector((state)=>state.authReducer.authData);
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const desc = useRef();
    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.postReducer.uploading);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const onImageChange = (event)=>{
        // Check if any event (Share button pressed) contains any files
        //  If yes then is there image present at 0th index
        if(event.target.files && event.target.files[0]){
            let img = event.target.files[0];
            setImage(img);
        }
    }
    // fuction to rest display of post box after a successful post
    const reset = () => {
        setImage(null);
        desc.current.value="";
    }
    // On Submiting Share Button
    const handleSubmit = (e)=> {
        // Don't Direct to Other Page
        e.preventDefault();
        // Post data from req
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        // We can't store image in MongoDb so store it in LocalStorage of server
        if(image){
            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append("name", filename);
            data.append("file", image);
            newPost.image = filename;
            console.log(newPost);
            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }
        // Post Data contains Imagename, description and userId
        dispatch(uploadPost(newPost));
        reset();
    }
  return (
    // Sharing any Post
    <div className='PostShare'>
        {/* User Image Icon */}
        <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic + "defaultProfile.png"} alt="profile icon"/>
        {/* Search bar/feed search bar */}
        <div>
            <input ref={desc} required type="text" placeholder="What's New?"/>
            {/* All type of Post option ex Image/video etc. */}
            <div className='postOptions'>
                <div className='option' style={{color: "var(--photo)"}} onClick={()=>imageRef.current.click()}>
                    <UilScenery/>
                    Photo
                </div>
                <div className='option' style={{color: "var(--video)"}} onClick={()=>imageRef.current.click()}>
                    <UilPlayCircle/>
                    Video
                </div>
                <div className='option' style={{color: "var(--location)"}} onClick={()=>imageRef.current.click()}>
                    <UilLocationPoint/>
                    Location
                </div>
                <div className='option' style={{color: "var(--shedule)"}} onClick={()=>imageRef.current.click()}>
                    <UilSchedule/>
                    Schedule
                </div>
                <button className='button ps-button' onClick={handleSubmit} disabled={loading}>
                    {loading ? "Uploading....": "Share"}
                </button>
                <div style={{display:"none"}}>
                    <input type="file" name ="myImage" ref={imageRef} onChange={onImageChange}/>
                </div>
            </div>
            {/* Show selected Image */}
            {image && (
            <div className='previewImage'>
                <UilTimes onClick={()=>setImage(null)}/>
                <img src={URL.createObjectURL(image)} alt="" />
            </div>)}
        </div>
    </div>
  )
}

export default PostShare
