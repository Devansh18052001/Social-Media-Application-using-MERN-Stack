import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/Untitled.png'
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from '../../Actions/AuthAction'
const Auth = () => {
    // For Swapping between Login and Sign Up Page
    const [isSignUp, setIsSignUp] = useState(false);
    const [data, setData] = useState({username:"",firstname:"",lastname:"",password:"",confirmpass:""});
    // Making a dispatch
    const dispatch  = useDispatch();
    // Take loading varaible from useSelector() i.e. hook of react-redux tp fetch global state
    const loading = useSelector((state)=>state.authReducer.loading)
    // Check Password and confirm password
    const [confirmPass,setConfirmPass] = useState(true);
    // takes event as input
    const handleChange = (e) => (
        // Using this convention so that every inputs will captured here
        setData({...data, [e.target.name]: e.target.value})
    );
    // On submit button handle data
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            data.password === data.confirmpass ? dispatch(signUp(data)):setConfirmPass(false);
        }
        else{
            dispatch(logIn(data));
        }
    };
    // Reset Form
    const resetForm = () => {
        setData({username:"",firstname:"",lastname:"",password:"",confirmpass:""});
        setConfirmPass(true);
  };
  return (
    <div className='Auth'>
        {/* Left Side */}
        <div className='a-left'>
            <img src={Logo} alt="Logo"/>
            <div className='AppName'>
                <h1>Social Media</h1>
                <h4>Explore the World</h4>
            </div>
        </div>
        {/* Right Side */}
        <div className='a-right'>
            <form className='infoForm authForm'>
                <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
                {/* 1st Row */}
                {isSignUp && 
                <div>
                    <input type="text" placeholder='First Name' className='infoInput' name='firstname' onChange={handleChange} value={data.firstname}/>
                    <input type="text" placeholder='Last Name' className='infoInput' name='lastname' onChange={handleChange} value={data.lastname}/>
                </div>
                }
                {/* 2nd Row */}
                <div>
                    <input type="text" placeholder='User Name' className='infoInput' name='username' onChange={handleChange} value={data.username}/>
                </div>
                {/* 3rd Row */}
                <div>
                    <input type="password" placeholder='Password' className='infoInput' name='password' onChange={handleChange} value={data.password}/>
                    {isSignUp && <input type="password" placeholder='Confirm Password' className='infoInput' name='confirmpass' onChange={handleChange} value={data.confirmpass}/>}
                </div>
                <span style={{display: confirmPass?"none":"block",color:"red",fontSize: "12px",alignSelf:"flex-end",marginRight:"5px"}}>*Confirm Password is not Same*</span>
                {/* Button and text */}
                <div>
                    <span style={{fontSize:"14px",cursor:"pointer"}} onClick={()=>{setIsSignUp((prev)=>!prev);resetForm()}}>{isSignUp ? "Already have an account ?  Login" : "Don't Have an Account? Register Now"}</span>
                </div>
                <button className='button infoButton' type='submit' onClick={handleSubmit} disabled={loading}>
                    {loading ? "Loading...." : isSignUp ?"Sign Up" : "Log In"}
                </button>
            </form>
        </div>
    </div>
  )
}
// Sign Up Form
// function SignUp(){
//     return(
        
//     )
// }
// // Login Form
// function LogIn() {
//     return (
//         <div className='a-right'>
//             <form className='infoForm authForm'>
//                 <h2>Log In</h2>
//                 {/* 1st Row */}
//                 <div>
//                     <input type="text" placeholder='User Name' className='infoInput' name="username"/>
//                 </div>
//                 {/* 2nd Row */}
//                 <div>
//                     <input type="password" placeholder='Password' className='infoInput' name='password'/>
//                 </div>
//                 {/* Button and text */}
//                 <div>
//                     <span style={{fontSize:"14px"}}>Don't have an account ?  Sign Up</span>
//                 </div>
//                 <button className='button infoButton' type='submit'>Log In</button>
//             </form>
//         </div>
//     )
// }
export default Auth
