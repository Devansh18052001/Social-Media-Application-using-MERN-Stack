import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesin: String,
        worksat: String,
        relationship: String,
        country: String,
        followers: [],
        following: []
    },
    // Create at & Update time uniqueness
    {timestamps: true}
)
const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;