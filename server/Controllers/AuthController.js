import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Registering a new User
export const registerUser = async(req, res) => {
    // const {username, password, firstname, lastname} = req.body;

    // Amount of encrpting password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const newUser = new UserModel(req.body);
    const {username} = req.body;
    try {
        const oldUser = await UserModel.findOne({username});
        // if username for register already exist in Database
        if(oldUser){
            return res.status(400).json({message : "This Username is already Registered!!"});
        }
        // Saving the user/registering New User
        const user = await newUser.save();

        // Creating jwt Token(Access) for 1 hour only.
        const token = jwt.sign({username: user.username, id: user._id},process.env.ACCESS_KEY,{expiresIn:"1h"});

        // Everything is right
        res.status(200).json({user,token});
    } catch (error) {
        // Error
        res.status(500).json({message: error.message});
    }
}

//  Login User
export const loginUser = async (req, res) => {
    // Username and password from HTTP Request
    const {username, password} = req.body
    try {
        const user = await UserModel.findOne({username: username});
        // If Username is in Database
        if(user){
            // if Password Hash matches with one in database
            const validity = await bcrypt.compare(password,user.password);
            if(validity){
                // Creating jwt Token(Access) for 1 hour only.
                const token = jwt.sign({username: user.username, id: user._id},process.env.ACCESS_KEY,{expiresIn:"1h"});
                //Successfull Login
                res.status(200).json({user,token});
            }
            else{
                // Invalid Password
                res.status(400).json("Password does not match!!");
            }
        }
        else{
            res.status(404).json("User Does not Exist!!");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}