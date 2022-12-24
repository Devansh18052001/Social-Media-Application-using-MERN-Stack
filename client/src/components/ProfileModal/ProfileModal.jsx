import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../Actions/userAction';
import { uploadImage } from '../../API/UploadRequest';

function ProfileModal({modalOpened, setModalOpened, data}) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) =>{
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      event.target.name === "profilePicture" ? setProfileImage(img) :setCoverImage(img);
    }
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    let UserData = formData;
    if(profileImage){
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(params.id, UserData));
    setModalOpened(false);
  };
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size = "55%"
      opened = {modalOpened}
      onClose = {()=>setModalOpened(false)}
    >
      {/* Modal content */}
      <form className="infoForm">
        <h3>Personal Info</h3>
        {/* 1st Row */}
        <div>
            <input type="text" className='infoInput' name='firstname' value = {formData.firstname} placeholder='First Name' onChange={handleChange} />
            <input type="text" className='infoInput' name='lastname' value = {formData.lastname} placeholder='Last Name' onChange={handleChange} />
        </div>
        {/* 2nd Row */}
        <div>
            <input type="text" className='infoInput' name='worksat' value = {formData.worksat} placeholder='Works at' onChange={handleChange} />
        </div>
        {/* 3rd Row */}
        <div>           <input type="text" className='infoInput' name='livesin' value = {formData.livesin} placeholder='Lives in' onChange={handleChange} />
            <input type="text" className='infoInput' name='country' value = {formData.country} placeholder='Country' onChange={handleChange} />
        </div>
        {/* 4th Row */}
        <div>
            <input type="text" className='infoInput' name='relationship' value = {formData.relationship} placeholder='Relationship Status' onChange={handleChange} />
        </div>
        {/* 5th Row */}
        <div>
            Profile Image
            <input type="file" name='profilePicture' onChange={onImageChange}/>
            Cover Image
            <input type="file" name='coverPicture' onChange={onImageChange} />
        </div>
        <button className='button infoButton' onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}
export default ProfileModal;