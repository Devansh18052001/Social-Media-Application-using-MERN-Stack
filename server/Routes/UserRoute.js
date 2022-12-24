import express from "express";
import { getAllUser, deleteUser, followUser, getUser, unfollowUser, updateUser } from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();
router.get('/', getAllUser);
// Not sending any data in body of request but id of user in url of request so get and not post
router.get('/:id',getUser);
// put is used when we need to update
router.put('/:id' ,updateUser);
// delete is used when we need to delete
router.delete('/:id',deleteUser);
// put is used when we need to update/follower and following array(push)
router.put('/:id/follow',followUser);
// put is used when we need to update/follower and following array(pull)
router.put('/:id/unfollow',unfollowUser);
export default router;