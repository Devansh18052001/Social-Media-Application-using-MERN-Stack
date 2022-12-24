import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
import mongoose from "mongoose";

// creating a Post

export const createPost = async (req, res) => {
    // Embedding it in postModel
    console.log("CreatePost Called")
  const newPost = new PostModel(req.body);
// try-catch block
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
};

// get a Post

export const getPost = async (req, res) => {
// getting id from HTTP request
  const id = req.params.id;
// Find Post in PostModel database and return it as response
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Updating a Post
export const updatePost = async (req, res) => {
    // getting id from HTTP request
  const postId = req.params.id;
  // Fetch user id from request body
  const { userId } = req.body;
// Find post id that needed to be updated
  try {
    const post = await PostModel.findById(postId);
    // Verify User of Post
    if (post.userId === userId) {
        // function in mongoose
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } 
    else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {}
};

// Delete a post
export const deletePost = async (req, res) => {
    // Fetch id from requst
  const id = req.params.id;
    //   Fetch id from body
  const { userId } = req.body;
    // Find the Post to delete
  try {
    const post = await PostModel.findById(id);
    // Verify user(id) of the Post
    if (post.userId === userId) {
    // deleteOne() is delete function in mongoose
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Like or Dislike a Post
export const likePost = async (req, res) => {
// Fetch id from requst
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    // if Already liked then dislike it.
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Dis-Liked!");
    }
    // Else like it and add it in liked one 
    else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post Liked!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Timeline Posts
export const getTimelinePosts = async (req, res) => {
    // get userId of timeline post
  const userId = req.params.id
  try {
    // Fetch all posts of user(Id)
    const currentUserPosts = await PostModel.find({ userId: userId });
    // Fetch Posts of Followers
    const followingPosts = await UserModel.aggregate([
      { 
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    const jsonData = currentUserPosts
      .concat(...followingPosts[0].followingPosts)
      .sort((a, b) => {
        //Latest (time) post first
        return new Date(b.createdAt) - new Date(a.createdAt);
      })

    res.status(200).json(jsonData);
  } catch (error) {
    res.status(500).json(error);
  }
};