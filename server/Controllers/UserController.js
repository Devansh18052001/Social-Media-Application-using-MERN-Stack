import UserModel from "../Models/userModel.js";
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Getting all user for recommended following people;
export const getAllUser = async (req, res) =>{
  try {
    // First 20 user in database
    let users = await UserModel.find();
    users = users.map(
      (user) => {
        const {password,...otherDetails} = user._doc;
        return otherDetails;
    });
    console.log("other: ",users)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//  Get user from database
export const getUser = async(req, res)=>{
    const id = req.params.id;
    
    try {
        const user = await UserModel.findById(id);  
        if(user){
            // We don need to send critcal info/attributes such as password
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json("No Such User Exist!!");
        }
    } catch (error) {
        //Bad Server
        res.status(500).json(error);
    }
};

//  Update a User
export const updateUser = async(req, res) => {
    // Id of user to be update
    const id = req.params.id
    // currentUserId: user_id who is performing updation.(may be same or not)
    const { _id, currentUserAdminStatus, password} = req.body;
    // if user him/her self is updating or admin user is updating
    if(id === _id){
        try {
            //find user in database and update info with new info and returns new/updated user.
            if(password){
                const salt = await bcyrpt.genSalt(10);
                req.body.password = await bcyrpt.hash(password, salt);
            }
            const user = await UserModel.findByIdAndUpdate(id,req.body,{new:true});
            const token = jwt.sign(
              {username: user.username, id: user,_id},
              process.env.ACCESS_KEY,
              {expiresIn: "1h"}
            );
            res.status(200).json({user,token});
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
      console.log("_id: ",req.body," id :",id);
        res.status(403).json("Access Denied!!");
    }
};
// Delete a user
export const deleteUser = async (req, res) => {
    // Id of user to be Delete
    const id = req.params.id;
    // currentUserId: user_id who is performing Deletation.(may be same or not)
    const { currentUserId, currentUserAdmin } = req.body;
    // if user him/her self is Deletation or admin user is updating
    if (currentUserId == id || currentUserAdmin) {
      try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json("User Deleted Successfully!");
      } catch (error) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Access Denied!");
    }
  };

//  Follow User
  export const followUser = async (req, res) => {
    console.log('follow is called');
    // Id of user to be followed
    const id = req.params.id;
    console.log("req.body",req.body);
    const { _id } = req.body;
    
    if (_id == id) {
    // Cant follow itself
      res.status(403).json("Action Forbidden");
    } else {
      try {
        const followUser = await UserModel.findById(id);
        const followingUser = await UserModel.findById(_id);
        console.log(followUser);
        console.log("_id",_id);
        // if Not Already Following that user (id)
        if (!followUser.followers.includes(_id)) {
        // Update followers attribue of user that is followed
          await followUser.updateOne({ $push: { followers: _id } });
        // Update following attribue of user that is following
          await followingUser.updateOne({ $push: { following: id } });
          res.status(200).json("User Followed !!");
        }
        else {
          res.status(403).json("Already Following this User !!");
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  };

// Unfollow a User
export const unfollowUser = async (req, res) => {
    console.log('unfollow is called');
    // Id of user to be followed
    const id = req.params.id;
    const { _id } = req.body;
  // Cant follow itself
    if(_id === id)
    {
      res.status(403).json("Action Forbidden")
    }
    else{
      try {
        const unFollowUser = await UserModel.findById(id)
        const unFollowingUser = await UserModel.findById(_id)
        // if Already in Following that user (id)
        if (unFollowUser.followers.includes(_id))
        {
        // Remove|Pull from following array of user|id
          await unFollowUser.updateOne({$pull : {followers: _id}});
        // Remove|Pull from follower array of other|_id
          await unFollowingUser.updateOne({$pull : {following: id}})
          res.status(200).json("Unfollowed Successfully!")
        }
        // If not not following already
        else{
          res.status(403).json("You are not following this User")
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error)
      }
    }
  };